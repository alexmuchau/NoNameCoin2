import { exec } from "child_process";

export async function checkHour() {
  const selectorTime = Date.now();

  const bankTimeResponse = await fetch("http://bank:3000/banco/hora");
  const bankTimeData = await bankTimeResponse.json();
  const bankTime = new Date(bankTimeData.date).getTime();

  const offset = bankTime - selectorTime;

  const adjustedSelectorTime = new Date(selectorTime + offset);

  console.log(`Horário ajustado do seletor: ${adjustedSelectorTime}`);

  const command = `date -s "${adjustedSelectorTime.toISOString()}"`;
  exec(command);
}
