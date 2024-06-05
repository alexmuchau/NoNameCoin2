import { shutdownServer, VALIDATOR_ID } from "../../app"

export async function disconnectValidator(req: any, res: any) {
    await fetch(`http://localhost:4100/validator/disconnect?validatorId=${VALIDATOR_ID}`, {
        method: 'PUT'
    })
    
    shutdownServer()
}