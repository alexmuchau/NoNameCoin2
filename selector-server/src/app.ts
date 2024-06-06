import createServer from "./server";

const port = 4100;
const app = createServer()

app.listen({host: '0.0.0.0', port}, (err)=>{
    if(err){
        console.log(err); 
    }
})