import type { Express } from 'express'

export function expressListen (app: Express, fqdn:string, port: number) {
    const listenCallback = (): () => void => () => console.log(`⚡️[server]: Server is running at http://${fqdn}:${port}`)
    app.listen(port, listenCallback())
}
