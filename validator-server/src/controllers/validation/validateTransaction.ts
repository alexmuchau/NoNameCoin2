import { MY_TIME } from "../../app";
import { printFooter, printHeader } from "../../tools/printFunctions";
import { checkClock } from "../check/clockCheck";

export interface TransactionProps {
  trans_id: string;
  sender_address: string;
  receiver_address: string;
  trans_coins: number;
  trans_tax: number;
  trans_timestamp: Date;
  trans_state: "NOT STARTED" | "VALIDATING" | "DENIED" | "APPROVED";

  sender: AddressProps;
  receiver: AddressProps;
}

interface AddressProps {
  address: string;
  coins_in_stock: number;
}

export async function sendValidation(trans_id:string, validator_id:string, validation: 'APPROVED' | 'DENIED') {
    await fetch('http://selector_server:4100/trans/validation', {
        method: 'POST',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({
            trans_id: trans_id,
            validator_id: validator_id,
            validation: validation
        })
    })
}

export async function validateTransaction(req: any, res: any) {
  const transaction: TransactionProps = req.body.transaction;
  const validatorId: string = req.body.validatorId;
  const senderTransactionsCount: number = req.body.senderTransactionsCount;

  const randomTimeout = Math.random() * 150000000000;
  let i = 0
  
  printHeader(`Validando transação ${transaction.trans_id}... ${randomTimeout}`);
  
  // while (i < randomTimeout) {
  //   i++
  // }
  
  if (senderTransactionsCount > 1000) {
    // await sendValidation(transaction.trans_id, validatorId, "DENIED")
    res.send({
      validation: "DENIED",
      transId: transaction.trans_id,
      validatorId: validatorId,
    });
    printFooter("Erro na validação: limite de transações excedido");
    return;
  }

  if (
    transaction.trans_coins + transaction.trans_tax >
    transaction.sender.coins_in_stock
  ) {
    // await sendValidation(transaction.trans_id, validatorId, "DENIED")
    res.send({
      validation: "DENIED",
      transId: transaction.trans_id,
      validatorId: validatorId,
    });
    printFooter("Erro na validação: saldo insuficiente");
    return;
  }

  if (transaction.trans_timestamp > MY_TIME) {
    // await sendValidation(transaction.trans_id, validatorId, "DENIED")
    res.send({
      validation: "DENIED",
      transId: transaction.trans_id,
      validatorId: validatorId,
    });
    printFooter("Erro na validação: transação com data inválida");
    return;
  }

  printFooter("Transação validada com sucesso!");
  res.send({
    validation: "APPROVED",
    transId: transaction.trans_id,
    validatorId: validatorId,
  });

  // await sendValidation(transaction.trans_id, validatorId, "APPROVED")
}
