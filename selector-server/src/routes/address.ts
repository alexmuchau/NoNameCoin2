import { FastifyInstance } from "fastify";
import { createAddress } from "../controllers/address/createAddress";
import { getAddress } from "../controllers/address/getAddress";
import { stackValue } from "../controllers/validator/stackValue";

export async function addressRoutes(fastify: FastifyInstance){
    fastify.post('/address', createAddress)
    fastify.get('/address', getAddress)
}