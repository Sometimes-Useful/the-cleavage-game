import express, { Express } from 'express'
import * as path from 'path'

export function expressStaticFrontEnd (app: Express) {
    const publicFolderPath = path.join(__dirname, '..', '..', '..', 'public')
    const indexHtmlFilePath = path.join(publicFolderPath, 'index.html')
    app.get('/', express.static(indexHtmlFilePath))
    app.use('/', express.static(publicFolderPath))
}
