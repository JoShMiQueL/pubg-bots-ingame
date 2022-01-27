import fs from 'fs'

export function getConfig () {
  const path = process.env.NODE_ENV === 'development' ? 'public/config.json' : 'config.json'
  const config = JSON.parse(fs.readFileSync(path, 'utf8'))
  return config
}
