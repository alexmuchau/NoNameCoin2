import { checkHour } from "./checkHour";
import { checkValidators } from "./controllers/seletor/checkValidators";
import createServer from "./server";
import { printInit } from "./tools/printFunctions";

const port = 4100;
const app = createServer();

printInit("INICIANDO SELETOR DE VALIDADORES")

setInterval(() => {
  checkValidators();
  checkHour();
}, 60000);

app.listen({ host: "0.0.0.0", port }, (err: Error) => {
  checkValidators();
  checkHour();

  if (err) {
    console.log(err);
  }
});
