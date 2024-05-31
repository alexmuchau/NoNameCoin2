import { FastifyInstance } from "fastify";
import { createTransaction } from "../controllers/transaction/createTransaction";
import { getTransactions } from "../controllers/transaction/getTransactions";

export async function transactionsRoutes(fastify: FastifyInstance){
    fastify.post('/trans', createTransaction)
    fastify.get('/trans', getTransactions)
}