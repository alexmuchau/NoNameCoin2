import { prisma } from "../../../prisma/prisma";

export async function checkValidators() {
    console.log('--------------------')
    console.log("Checando validadores...\n")
    const validators = await prisma.validator.findMany({
        where: {
            validator_state: "FREE"
        }
    })
    
    let toUpdateValidators = []
    
    for (const validator of validators) {
        try {
            const check = await fetch(`http://${validator.host}/validator/check`)
            
            if (check.status != 200) {
                toUpdateValidators.push(validator.validator_id)
            }
        } catch (error) {
            console.log(error)
            
            toUpdateValidators.push(validator.validator_id)
        }
    }
    
    if (toUpdateValidators.length > 0) {
        await prisma.validator.updateMany({
            where: {
                validator_id: {
                    in: toUpdateValidators
                }
            },
            data: {
                validator_state: "INACTIVE"
            }
        })
    }
    
    console.log("\nChecagem de validadores concluída!")
    console.log('--------------------\n\n')
}