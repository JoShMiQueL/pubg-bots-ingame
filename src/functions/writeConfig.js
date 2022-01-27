import fs from 'fs'

export function writeConfig (json) {
  const path = process.env.ENVIRONMENT === 'production' ? 'config.json' : 'public/config.json'
  fs.writeFileSync(path, JSON.stringify(json, null, 2))
}
