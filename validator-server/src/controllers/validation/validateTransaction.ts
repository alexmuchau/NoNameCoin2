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
    await fetch('http://selector_server:4100/trans/validate', {
        method: 'POST',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({
            transId: trans_id,
            validatorId: validator_id,
            validation: validation
        })
    })
}

export async function validateTransaction(req: any, res: any) {
  const transaction: TransactionProps = req.body.transaction;
  const validatorId: string = req.body.validatorId;
  const senderTransactionsCount: number = req.body.senderTransactionsCount;

  const timeout = 3000000000 * 2;
  let i = 0
  
  printHeader(`Validando transação ${transaction.trans_id}... ${timeout}`);
  
  const before = Date.now()
  while (i < timeout) {
    i++
  }
  const after = Date.now()
  console.log((after - before)/1000)
  
  if (senderTransactionsCount > 1000) {
    await sendValidation(transaction.trans_id, validatorId, "DENIED")
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
    await sendValidation(transaction.trans_id, validatorId, "DENIED")
    res.send({
      validation: "DENIED",
      transId: transaction.trans_id,
      validatorId: validatorId,
    });
    printFooter("Erro na validação: saldo insuficiente");
    return;
  }

  if (transaction.trans_timestamp > MY_TIME) {
    await sendValidation(transaction.trans_id, validatorId, "DENIED")
    res.send({
      validation: "DENIED",
      transId: transaction.trans_id,
      validatorId: validatorId,
    });
    printFooter("Erro na validação: transação com data inválida");
    return;
  }

  printFooter("Transação validada com sucesso!");
  await sendValidation(transaction.trans_id, validatorId, "APPROVED")
  res.send({
    validation: "APPROVED",
    transId: transaction.trans_id,
    validatorId: validatorId,
  });
}
