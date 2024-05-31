import { FastifyInstance } from "fastify";
import { createValidator } from "../controllers/validator/createValidator";

export async function validatorRoutes(fastify: FastifyInstance){
    fastify.post('/validator', createValidator)
}