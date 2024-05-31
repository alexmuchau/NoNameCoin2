import { FastifyInstance } from "fastify";
import { validateTransaction, validateTransactionLight } from "../controllers/validation/validateTransaction";

export async function validationRoutes(fastify: FastifyInstance){
    fastify.post('/trans', validateTransaction)
    fastify.get('/trans', validateTransactionLight)
}