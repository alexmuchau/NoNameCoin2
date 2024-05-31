import { FastifyInstance } from "fastify";
import { checkRoutes } from "./check";
import { validationRoutes } from "./validateTransaction";

export async function routes(fastify: FastifyInstance){
    fastify.register(checkRoutes);
    fastify.register(validationRoutes);
}