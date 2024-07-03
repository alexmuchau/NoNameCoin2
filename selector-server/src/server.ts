import Fastify from 'fastify'
import { routes } from './routes/routes';

export default function createServer(){
    const fastify = Fastify({logger: {
        level: 'error'
    }})
    fastify.register(routes)
    
    return fastify;
}