import Fastify from 'fastify'
import { routes } from './routes/routes';

export default function createServer(){
    const fastify = Fastify({logger: true})
    fastify.register(routes)
    
    return fastify;
}