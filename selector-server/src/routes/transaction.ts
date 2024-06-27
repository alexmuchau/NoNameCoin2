import { FastifyInstance } from "fastify";
import { createTransaction } from "../controllers/transaction/createTransaction";
import { getTransactions } from "../controllers/transaction/getTransactions";
import { deleteTransactions } from "../controllers/transaction/deleteTransactions";

export async function transactionsRoutes(fastify: FastifyInstance){
    fastify.post('/trans', createTransaction)
    fastify.get('/trans', getTransactions)
    fastify.delete('/trans', deleteTransactions)
}