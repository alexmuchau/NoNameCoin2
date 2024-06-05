import { FastifyInstance } from "fastify";
import { createAddress } from "../controllers/address/createAddress";
import { getAddress } from "../controllers/address/getAddress";
import { stackValue } from "../controllers/validator/stackValue";
import { addValue } from "../controllers/address/updateValue";

export async function addressRoutes(fastify: FastifyInstance){
    fastify.post('/address', createAddress)
    fastify.put('/address', addValue)
    fastify.get('/address', getAddress)
}