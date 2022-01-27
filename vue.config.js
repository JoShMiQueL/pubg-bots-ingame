module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        appId: 'me.joshmiquel.pubg-bots-ingame',
        productName: 'PUBG Bots Checker',
        copyright: 'Copyright © 2022 JoShMiQueL',
        win: {
          icon: 'public/icons/icon.png'
        },
        extraFiles: [
          { from: 'public/config.json', to: 'config.json' }
        ]
      }
    }
  }
}
