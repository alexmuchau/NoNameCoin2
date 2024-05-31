import createServer from "./server";
import { validateMe } from "./validateMe";

async function initValidator(address:string, port:number) {
    const ok = await validateMe(address, port.toString())
    
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

const port = 4101
const address = 'noName0x7fc92d55080045dfae5082ffe8106000'
initValidator(address, port)