import { FastifyInstance } from "fastify";
import { showSelectValidators } from "../controllers/seletor/selectValidators";

export async function selectorRoutes(fastify: FastifyInstance){
    fastify.get('/seletor', showSelectValidators)
}