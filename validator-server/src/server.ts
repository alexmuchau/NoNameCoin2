import Fastify from 'fastify'
import { allRoutes } from './routes/allRoutes';
import fastifyCors from '@fastify/cors';

export default function createServer(){
    const fastify = Fastify({logger: true})
    fastify.register(allRoutes)
    fastify.register(fastifyCors, {
    origin: '*',
    methods: ['GET', 'PUT', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })

    return fastify;
}