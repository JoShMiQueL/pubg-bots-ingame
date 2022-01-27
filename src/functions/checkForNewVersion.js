import axios from 'axios'

export async function checkForNewVersionTest () {
  const proxy = 'https://jsonp.afeld.me/?url='
  try {
    const gitHubRes = await axios.get('https://gist.githubusercontent.com/JoShMiQueL/cb8ac3a70b28bd420746275f58cc73aa/raw/27d587b258a4deda1762e0aa5861d6865a1cfc94/PUBG%2520Bots%2520Checker%2520Version')
    const gitHubData = gitHubRes.data
    const versionRes = await axios.get(`${proxy}${gitHubData}`)
    const versionData = versionRes.data
    return versionData
  } catch (error) {
    throw new Error(error)
  }
}

export async function checkForNewVersion () {
  try {
    const gitHubRes = await axios.get('https://raw.githubusercontent.com/JoShMiQueL/pubg-bots-ingame/master/package.json')
    const gitHubData = gitHubRes.data
    return gitHubData.version
  } catch (error) {
    throw new Error(error)
  }
}
