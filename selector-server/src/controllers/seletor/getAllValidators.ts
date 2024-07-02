import { prisma } from "../../../prisma/prisma";

export async function getAllValidators(req: any, res: any) {
  const validators = await prisma.validator.findMany({
    where: {
      flag: {
        lt: 3,
      },
    },
  });

  res.send(validators);
}
