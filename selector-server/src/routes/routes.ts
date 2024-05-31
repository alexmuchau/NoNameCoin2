import { FastifyInstance } from "fastify";
import { addressRoutes } from "./address";
import { transactionsRoutes } from "./transaction";
import { validatorRoutes } from "./validator";
import { selectorRoutes } from "./seletor";

export async function routes(fastify: FastifyInstance){
    fastify.register(addressRoutes);
    fastify.register(transactionsRoutes);
    fastify.register(validatorRoutes)
    fastify.register(selectorRoutes)
    
    fastify.get('/', () => {
        console.log('Connected')
    })
}