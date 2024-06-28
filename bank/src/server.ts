import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.get('/banco/hora', (req: Request, res: Response) => {
  const currentDateTime = new Date();
  res.send({date: currentDateTime});
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
