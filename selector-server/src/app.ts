import { checkHour } from "./checkHour";
import { checkValidators } from "./controllers/seletor/checkValidators";
import createServer from "./server";

const port = 4100;
const app = createServer();

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
