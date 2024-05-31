import createServer from "./server";

const port = 4100;
const app = createServer()

app.listen({port}, (err)=>{
    if(err){
        console.log(err); 
    }
})