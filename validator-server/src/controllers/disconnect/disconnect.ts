import { HOST, shutdownServer } from "../../app"

export async function disconnectValidator(req: any, res: any) {
    await fetch(`http://localhost:4100/validator/disconnect?host=${HOST}`, {
        method: 'PUT'
    })
    
    shutdownServer()
}