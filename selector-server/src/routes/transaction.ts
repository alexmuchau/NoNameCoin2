import { FastifyInstance } from "fastify";
import { createTransaction } from "../controllers/transaction/createTransaction";
import { getTransactions } from "../controllers/transaction/getTransactions";
import { validateTransaction } from "../controllers/transaction/validateTransaction";

export async function transactionsRoutes(fastify: FastifyInstance){
    fastify.post('/trans', createTransaction)
    fastify.get('/trans', getTransactions)
    fastify.post('/trans/validation', validateTransaction)
}