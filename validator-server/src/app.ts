import createServer from "./server";
import { validateMe } from "./validateMe";

export const HOST = process.env.HOST

if (!HOST) {
    console.log('Cant read env file')
    process.exit(0)
}

export let MY_TIME = new Date()

async function checkValidator(host:string) {
    setTimeout(async () => {
        const ok = await validateMe(host)
        
        if (!ok) {
            shutdownServer()
            console.log('Validador não está no modelo perfeito!')
        } else {
            initValidator()
            console.log('Validador está no modelo perfeito!')
        }
    }, 20000)
}

function initValidator() {
    const app = createServer()
    app.listen({host: '0.0.0.0', port: 4101}, (err)=>{
        if(err){
            console.log(err); 
        }
    })
    
    return app
}

export function shutdownServer() {
    process.exit(0)
}

checkValidator(HOST)