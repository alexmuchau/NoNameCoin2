import { prisma } from "../../../prisma/prisma"

export async function checkValidator(req:any, res:any) {
    const { address, port } = req.body
    
    // Acha no banco
    const validator = await prisma.validator.findFirst({
        where: {
            address: {
                address: address
            }
        }
    })
    
    // Caso validador não esteja cadastrado, ERRO
    if (!validator) {
        res.status(500).send({ ok: false })
        
        console.log('--------------------')
        console.log("Validador nao existe no banco")
        console.log('--------------------')
        return
    }
    
    // Acha no banco, algum validador que esteja com a mesma PORT
    const portValidator = await prisma.validator.findFirst({
        where: {
            host: {
                contains: port
            }
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
            host: port
        }
    })
    
    console.log('--------------------')
    console.log("Sucesso validador checked!")
    console.log('--------------------')
    
    res.status(200).send({ ok: true })
}