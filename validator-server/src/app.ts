import createServer from "./server";
import { validateMe } from "./validateMe";

export const PORT = 4104
export const VALIDATOR_ID = '9f064b9b-3c32-498b-931a-4f0df8e2834e'
export let MY_TIME = new Date()

async function checkValidator(validatorId:string, port:number) {
    const ok = await validateMe(validatorId, port.toString())
    
    if (!ok) {
        shutdownServer()
        console.log('Validador não está no modelo perfeito!')
    }
}

function initValidator() {
    const app = createServer()
    app.listen({port: PORT}, (err)=>{
        if(err){
            console.log(err); 
        }
    })
    
    return app
}

export function shutdownServer() {
    app.close(() => {
        console.log('Closing server')
        process.exit(0)
    })
}

export const app = initValidator()
checkValidator(VALIDATOR_ID, PORT)