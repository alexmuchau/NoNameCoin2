import { checkClock } from "./controllers/check/clockCheck";
import createServer from "./server";
import { printInit } from "./tools/printFunctions";
import { validateMe } from "./validateMe";

export const HOST = process.env.HOST;

if (!HOST) {
  console.log("Cant read env file");
  process.exit(0);
}

export let MY_TIME = new Date();

setInterval(async () => {
  MY_TIME = await checkClock();
}, 60000);

async function checkValidator(host: string) {
  setTimeout(async () => {
    const ok = await validateMe(host);

    if (!ok) {
      shutdownServer();
      console.log("Validador não está no modelo perfeito!");
    } else {
      initValidator();
      console.log("Validador está no modelo perfeito!");
    }
  }, 20000);
}

async function initValidator() {
  printInit("INICIANDO VALIDADOR -> HOST:" + HOST)
  
  const app = createServer();
  app.listen({ host: "0.0.0.0", port: 4101 }, (err) => {
    if (err) {
      console.log(err);
    }
  });
  MY_TIME = await checkClock();
  return app;
}

export function shutdownServer() {
  process.exit(0);
}

checkValidator(HOST);
