import { exec } from "child_process";

export async function checkClock() {
  const selectorTime = Date.now() - 30 * 60 * 1000;

  const bankTimeResponse = await fetch("http://bank:3000/banco/hora");
  const bankTimeData = await bankTimeResponse.json();
  const bankTime = new Date(bankTimeData.date).getTime();

  const offset = bankTime - selectorTime;

  const adjustedSelectorTime = new Date(selectorTime + offset);

  console.log(`Horário ajustado no validador!`);
  console.log(`Horário validador: ${new Date(selectorTime).toISOString()} -> Horário ajustado: ${adjustedSelectorTime.toISOString()}\n`);

  const command = `date -s "${adjustedSelectorTime.toISOString()}"`;
  exec(command);
  return adjustedSelectorTime;
}
