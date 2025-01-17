import { prisma } from "../../../prisma/prisma";
import { checkValidator } from "./checkValidators";

export interface ReducedValidatorsType {
  validatorId: string;
  coinsInStack: number;
  host: string;
}

function getWeights(
  validators: ReducedValidatorsType[],
  sum_stacked_coins: number
) {
  let diff = 0;
  let numDiff = 0;
  let qtdNum = validators.length;
  let sumWeights = 0;

  const weights = validators.map((validator) => {
    let weight = (validator.coinsInStack / sum_stacked_coins) * 100 + numDiff;

    if (weight > 20) {
      diff += weight - 20;

      qtdNum -= 1;
      numDiff = diff / qtdNum;

      diff -= numDiff;

      sumWeights += 20;
      return {
        validatorId: validator.validatorId,
        weight: 20,
        coinsInStack: validator.coinsInStack,
        host: validator.host,
      };
    }

    sumWeights += weight;
    return {
      validatorId: validator.validatorId,
      weight: weight,
      coinsInStack: validator.coinsInStack,
      host: validator.host,
    };
  });

  return { weights: weights, sumWeights: sumWeights };
}

async function _selectValidators(freeValidators: any) {
  var sum_stacked_coins = 0;
    let reducedValidators: ReducedValidatorsType[] = freeValidators.map(
      (validator: any) => {
        if (validator.flag == 1) {
          validator.coins_in_stack = validator.coins_in_stack * 0.5;
        }
        if (validator.flag == 2) {
          validator.coins_in_stack = validator.coins_in_stack * 0.25;
        }

        sum_stacked_coins += validator.coins_in_stack;

        return {
          validatorId: validator.validator_id,
          coinsInStack: validator.coins_in_stack,
          host: validator.host!,
        };
      }
    );

    var { weights, sumWeights } = getWeights(
      reducedValidators,
      sum_stacked_coins
    );

    var validators = [];
    for (let numValidator = 0; numValidator < 5; numValidator++) {
      const randomInt = Math.random() * sumWeights;

      let sumRandom = 0;
      for (const weight of weights) {
        const diff = randomInt - (weight.weight + sumRandom);
        if (diff >= 0) {
          sumRandom += weight.weight;
          continue;
        }
        
        // Check if validator is online
        const isOnline = await checkValidator(weight.host);
        if (isOnline) {
          validators.push(
            reducedValidators.find((el) => el.validatorId == weight.validatorId)!
          );
        }
        
        sum_stacked_coins = sum_stacked_coins - weight.coinsInStack;
        var { weights, sumWeights } = getWeights(
          weights.filter((i) => i.validatorId != weight.validatorId),
          sum_stacked_coins
        );
        
        break;
      }
    }

    return validators;
}

export async function selectValidators(): Promise<ReducedValidatorsType[]> {
  async function waitForValidators(attemptsLeft: number = 6): Promise<ReducedValidatorsType[]> {
    // Attempt to find validators
    let freeValidators = await prisma.validator.findMany({
      where: {
        validator_state: "FREE",
        AND: {
          flag: {
            lt: 3,
          },
        },
      },
      orderBy: {
        coins_in_stack: "desc",
      },
    });
    
    if (attemptsLeft <= 0) {
      return []
    }

    // If enough validators are found or no attempts left, return them
    if (freeValidators.length >= 3) {
      // Process and return validators
      return await _selectValidators(freeValidators)
    } else {
      // Wait for a bit before trying again
      await new Promise(resolve => setTimeout(resolve, 10000)); // 10 seconds delay
      return waitForValidators(attemptsLeft - 1); // Try again
    }
  }

  return waitForValidators(); // Start the recursive waiting process
}

export async function showSelectValidators(req: any, res: any) {
  const validators = await selectValidators();

  res.send(validators);
}
