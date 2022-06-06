import * as path from 'path'
const repositoryBaseFolder = path.join(__dirname, '..', '..', '..')
console.log(repositoryBaseFolder)
export const publicFolderPath = path.join(repositoryBaseFolder, 'public')
export const indexHtmlFilePath = path.join(publicFolderPath, 'index.html')
