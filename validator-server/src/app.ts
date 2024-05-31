import { connectDB } from "../../selector-server/src/db/dbConn";
import createServer from "./server";

const port = 4100;
const app = createServer()

connectDB();

app.listen({port}, (err)=>{
    if(err){
        console.log(err); 
    }
})