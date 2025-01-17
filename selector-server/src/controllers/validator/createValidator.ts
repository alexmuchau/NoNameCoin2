import { prisma } from "../../../prisma/prisma";

export async function createValidator(req: any, res: any) {
    const { host, stackedValue } = req.body
    
    const validator = createValidatorGen(host, stackedValue)
    
    res.send(validator)
}

export async function createValidatorGen(host:string, stackedValue:number, validatorState: "FREE" | "INACTIVE" | "VALIDATING" = "INACTIVE") {
    const validator = await prisma.validator.create({
        data: {
            coins_in_stack: stackedValue,
            host: host,
            flag: 0,
            validator_state: validatorState
        }
    })
    
    return validator
}