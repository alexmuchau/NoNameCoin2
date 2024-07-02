import { prisma } from "../../../prisma/prisma";

export async function checkValidator(host: string) {
    try {
        const check = await fetch(`http://${host}/validator/check`)
        
        if (check.status != 200) {
            console.log(`Validador: ${host} -> ERRO!`)
            return false
        }
        
        console.log(`Validador: ${host} -> Tudo OK!`)
        return true
    } catch (error) {
        console.log(`Validador: ${host} -> OFFLINE!`)
        
        return false
    }
}

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
        const isOnline = await checkValidator(validator.host!)
        !isOnline && toUpdateValidators.push(validator.validator_id)
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