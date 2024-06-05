import { FastifyInstance } from "fastify";
import { disconnectValidator } from "../controllers/disconnect/disconnect";

export async function disconnectRoutes(fastify: FastifyInstance){
    fastify.put('/disconnect', disconnectValidator)
}