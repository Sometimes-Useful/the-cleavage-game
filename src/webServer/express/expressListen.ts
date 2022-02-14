import type { Express } from 'express'

export function expressListen (app: Express, sheme:string, fqdn:string, port?: string) {
    const listenCallback = (): () => void => () => console.log(`⚡️[server]: Server is running at ${sheme}://${fqdn}${port ? `:${port}` : ''}`)
    app.listen(port, listenCallback())
}
