import { prisma } from "../../../prisma/prisma";
import {
  ReducedValidatorsType,
  selectValidators,
} from "../seletor/selectValidators";
import { finishTransaction } from "./finishTransaction";

async function validateTransaction(
  transaction: any,
  validators: ReducedValidatorsType[],
  senderTransactionsCount: number
) {
  // let validations: { APPROVED: string[]; DENIED: string[] } = {
  //   APPROVED: [],
  //   DENIED: [],
  // };
  
  await prisma.validator.updateMany({
    where: {
      validator_id: {
        in: validators.map((validator) => validator.validatorId),
      },
    },
    data: {
      validator_state: "VALIDATING",
    }
  })
  
  for (const validator of validators) {
    try {
      fetch(`http://${validator.host}/trans`, {
        method: "POST",
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
          transaction: transaction,
          validatorId: validator.validatorId,
          senderTransactionsCount: senderTransactionsCount,
        }),
      })
    } catch (error) {
      console.log(`Error when sending transaction to validator ${validator.host}`)
      
      await prisma.validatorTransaction.update({
        where: {
          trans_id_validator_id: {
            trans_id: transaction.trans_id,
            validator_id: validator.validatorId,
          }
        },
        data: {
          validation: "FAILED"
        }
      })
    }
  }
  
  setTimeout(() => {
    
  }, 60000)
}

async function createValidatorTransactions(
  validators: ReducedValidatorsType[],
  transId: string
) {
  const validatorTransactions = await prisma.validatorTransaction.createMany({
    data: validators.map((validator) => ({
      trans_id: transId,
      validator_id: validator.validatorId,
    })),
  });

  return validatorTransactions;
}

export async function createTransaction(req: any, res: any) {
  const { remetente, recebedor, valor, horario } = req.body;

  const trans_tax = valor * 0.015;
  const trans_timestamp = new Date(horario);

  const sender = await prisma.address.findUnique({
    where: {
      address: remetente,
    },
  });

  if (!sender) {
    res.status(500).send({ error: "Sender doesnt exist" });
    return;
  }

  const receiver = await prisma.address.findUnique({
    where: {
      address: remetente,
    },
  });

  if (!receiver) {
    res.status(500).send({ error: "Receiver doesnt exist" });
    return;
  }
  
  const transaction = await prisma.transaction.create({
    data: {
      sender_address: remetente,
      receiver_address: recebedor,
      trans_coins: valor,
      trans_tax: trans_tax,
      trans_timestamp: trans_timestamp,
      trans_state: "NOT_STARTED",
    },
    include: {
      receiver: true,
      sender: true,
    },
  });
  
  const validators = await selectValidators();
  if (validators.length == 0) {
    await prisma.transaction.update({
      where: {
        trans_id: transaction.trans_id
      },
      data: {
        trans_state: "DENIED"
      }
    })
    res.status(500).send({ error: "Error when select validators" });
    return;
  }

  const now = Date.now();

  const senderTransactionsCount = await prisma.address.count({
    where: {
      address: remetente,
      sender_transactions: {
        every: {
          trans_timestamp: {
            gte: new Date(now - 1 * 60000),
          },
          AND: {
            trans_timestamp: {
              lte: new Date(now),
            },
          },
        },
      },
    },
  });

  const validatorTransactions = await createValidatorTransactions(
    validators,
    transaction.trans_id
  );
  if (validatorTransactions.count < 3) {
    res.status(500).send({ error: "Error when creating relations" });
    return;
  }

  await prisma.transaction.update({
    where: {
      trans_id: transaction.trans_id,
    },
    data: {
      trans_state: "VALIDATING",
    },
  });

  validateTransaction(transaction, validators, senderTransactionsCount);

  res.send({
    message: `Validating transaction! Validators: ${validators}`,
    transaction: transaction,
  });
}
