import { exec } from "child_process";

export async function checkHour() {
  const selectorTime = Date.now() - 10 * 60 * 1000;

  const bankTimeResponse = await fetch("http://bank:3000/banco/hora");
  const bankTimeData = await bankTimeResponse.json();
  const bankTime = new Date(bankTimeData.date).getTime();

  const offset = bankTime - selectorTime;

  const adjustedSelectorTime = new Date(selectorTime + offset);

  console.log(`Horário ajustado no seletor!`);
  console.log(`Horário seletor: ${new Date(selectorTime).toISOString()} -> Horário ajustado: ${adjustedSelectorTime.toISOString()}`);

  const command = `date -s "${adjustedSelectorTime.toISOString()}"`;
  exec(command);
}
