import { FastifyInstance } from "fastify";
import { createValidator } from "../controllers/validator/createValidator";
import { checkValidator } from "../controllers/validator/checkValidator";
import { stackValue } from "../controllers/validator/stackValue";

export async function validatorRoutes(fastify: FastifyInstance){
    fastify.post('/validator', createValidator)
    fastify.post('/validador/check', checkValidator)
    fastify.put('/validator', stackValue)
}