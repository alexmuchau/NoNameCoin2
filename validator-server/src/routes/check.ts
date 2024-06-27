import { FastifyInstance } from "fastify";
import { checkMe } from "../controllers/check/checkMe";

export async function checkRoutes(fastify: FastifyInstance){
    fastify.get('/validator/check', checkMe)
}