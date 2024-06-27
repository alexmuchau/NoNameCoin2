import { FastifyInstance } from "fastify";
import { createValidator } from "../controllers/validator/createValidator";
import { checkValidator } from "../controllers/validator/checkValidator";
import { stackValue } from "../controllers/validator/stackValue";
import { disconnectValidator } from "../controllers/validator/disconnectValidator";
import { deleteValidators } from "../controllers/validator/deleteValidators";

export async function validatorRoutes(fastify: FastifyInstance){
    fastify.post('/validator', createValidator)
    fastify.post('/validador/check', checkValidator)
    fastify.put('/validator', stackValue)
    fastify.put('/validator/disconnect', disconnectValidator)
    fastify.delete('/validator', deleteValidators)
}