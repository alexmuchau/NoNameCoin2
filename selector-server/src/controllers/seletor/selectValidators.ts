import { prisma } from "../../../prisma/prisma"

export interface ReducedValidatorsType {
    validatorId: string,
    coinsInStack: number,
    host: string
}

function getWeights(validators:ReducedValidatorsType[], sum_stacked_coins:number) {
    let diff = 0
    let numDiff = 0
    let qtdNum = validators.length
    let sumWeights = 0
    
    const weights = validators.map((validator) => {
        let weight = ((validator.coinsInStack / sum_stacked_coins) * 100)+numDiff
                
        if (weight > 20) {
            diff += weight - 20
            
            qtdNum -= 1
            numDiff = diff/qtdNum
            
            diff -= numDiff
            
            sumWeights += 20
            return {
                validatorId: validator.validatorId,
                weight: 20,
                coinsInStack: validator.coinsInStack,
                host: validator.host
            }
        }
        
        sumWeights += weight
        return {
            validatorId: validator.validatorId,
            weight: weight,
            coinsInStack: validator.coinsInStack,
            host: validator.host
        }
    })
    
    console.log(weights.length)
    console.log(sumWeights)
    console.log('')
    return {weights: weights, sumWeights: sumWeights}
}

export async function selectValidators() {
    const freeValidators = await prisma.validator.findMany({
        where: {
            validator_state: "FREE"
        },
        include: {
            address: {
                select: {
                    coins_in_stack: true
                }
            }
        },
        orderBy: {
            address: {
                coins_in_stack: "desc"
            }
        }
    })
    
    if (freeValidators.length >= 3) {
        var sum_stacked_coins = 0
        let reducedValidators:ReducedValidatorsType[] = freeValidators.map((validator) => {
            sum_stacked_coins += validator.address.coins_in_stack
            
            return {
                validatorId: validator.validator_id,
                coinsInStack: validator.address.coins_in_stack,
                host: validator.host!
            }
        })
        
        var {weights, sumWeights} = getWeights(reducedValidators, sum_stacked_coins)
        
        var validators = []
        for (let numValidator = 0; numValidator < 5; numValidator++) {
            const randomInt = Math.random() * sumWeights
            console.log('Numero sorteado: ' + randomInt)
            
            let sumRandom = 0
            console.log('Encontrando numero em weights.length: ' + weights.length)
            for (const weight of weights) {
                const diff = randomInt - (weight.weight + sumRandom)
                if (diff < 0) {
                    sumRandom += weight.weight
                    continue
                }
                
                validators.push(reducedValidators.find((el) => el.validatorId == weight.validatorId)!)
                
                sum_stacked_coins = sum_stacked_coins - weight.coinsInStack
                var {weights, sumWeights} = getWeights(weights.filter((i) => i.validatorId != weight.validatorId), sum_stacked_coins)
                break
            }
        }
        
        return validators
    }
    
    return []
}

export async function showSelectValidators(req: any, res: any) {
    const validators = await selectValidators()
    
    res.send(validators)
}