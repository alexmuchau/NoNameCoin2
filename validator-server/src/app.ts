import createServer from "./server";
import { validateMe } from "./validateMe";

async function initValidator(validator_id:string, port:number) {
    const ok = await validateMe(validator_id, port.toString())
    
    if (ok) {
        const app = createServer()
        app.listen({port}, (err)=>{
            if(err){
                console.log(err); 
            }
        })
        
        return
    }
    
    console.log('Validador não está no modelo perfeito!')
}

const port = 4104
const validator_id = 'noName0x9da23f8e01f64b1fbb8dfaadb189939b'
export let MY_TIME = new Date()
try {
    initValidator(validator_id, port)
} catch (error) {
    console.log(error)
}