import { FastifyInstance } from "fastify";
import { showSelectValidators } from "../controllers/seletor/selectValidators";
import { getAllValidators } from "../controllers/seletor/getAllValidators";

export async function selectorRoutes(fastify: FastifyInstance){
    fastify.get('/seletor', showSelectValidators)
    fastify.get('/seletor/validadores', getAllValidators)
}