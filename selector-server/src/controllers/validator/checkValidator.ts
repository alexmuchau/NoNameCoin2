import { prisma } from "../../../prisma/prisma"
import { createValidatorGen } from "./createValidator"

export async function checkValidator(req:any, res:any) {
    const { host } = req.body
    
    // Acha no banco
    const validator = await prisma.validator.findFirst({
        where: {
            host: host
        }
    })
    
    // Caso validador não esteja cadastrado, ERRO
    if (!validator) {
        console.log('--------------------')
        console.log("Validador nao existe no banco, criando...")
        console.log('--------------------')
        
        const validator = await createValidatorGen(host, 50, "FREE")
        
        res.status(200).send(validator)
        return
    }
    
    // Acha no banco, algum validador que esteja com o mesmo HOST
    const portValidator = await prisma.validator.findFirst({
        where: {
            host: host
        }
    })
    
    if (portValidator) {
        // Caso o validador com a mesma PORT esteja ativo, ERRO
        if (portValidator.validator_state != "INACTIVE") {
            res.status(500).send({ ok:false })
            
            console.log('--------------------')
            console.log("Validador existe no banco, porém ja existe um validador ativo com a mesma porta")
            console.log('--------------------')
            return
        }
        
        // Caso os validadores sejam diferentes no banco, atualiza a porta do inativo para null
        if (portValidator.validator_id != validator.validator_id) {
            await prisma.validator.update({
                where: {
                    validator_id: portValidator.validator_id,
                },
                data: {
                    host: null
                }
            })
        }    
    }
    
    // Finalmente, atualiza o validador com a porta desejada
    await prisma.validator.update({
        where: {
            validator_id: validator.validator_id
        },
        data: {
            validator_state: "FREE"
        }
    })
    
    console.log('--------------------')
    console.log("Sucesso validador checked!")
    console.log('--------------------')
    
    res.status(200).send({ ok: true })
}