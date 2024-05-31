import { FastifyInstance } from "fastify";
import { createAddress } from "../controllers/address/createAddress";
import { getAddress } from "../controllers/address/getAddress";
import { stackValue } from "../controllers/address/stackValue";

export async function addressRoutes(fastify: FastifyInstance){
    fastify.post('/address', createAddress)
    fastify.get('/address', getAddress)
    fastify.put('/address', stackValue)
}