import type { Express } from 'express'

export function expressListen (app: Express, sheme:string, fqdn:string, port: number) {
    const listenCallback = (): () => void => () => console.log(`⚡️[server]: Server is running at ${sheme}://${fqdn}:${port}`)
    app.listen(port, listenCallback())
}
