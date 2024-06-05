import { FastifyInstance } from "fastify";
import { validateTransaction } from "../controllers/validation/validateTransaction";

export async function validationRoutes(fastify: FastifyInstance){
    fastify.post('/trans', validateTransaction)
}