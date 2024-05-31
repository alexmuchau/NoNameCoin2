import { FastifyInstance } from "fastify";
import { userRoutes } from "./userRoutes";
import { dataRoutes } from "./dataRoutes";

export async function allRoutes(fastify: FastifyInstance){
    fastify.register(userRoutes);
    fastify.register(dataRoutes);
}