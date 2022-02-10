import type { Express } from 'express'

export function expressListen (app: Express, port: number) {
    const listenCallback = (): () => void => () => console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
    app.listen(port, listenCallback())
}
