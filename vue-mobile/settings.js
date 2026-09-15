import types from 'src/utils/types'

class MobileSyncSettings {
  constructor(appData) {
    const iosData = types.pObject(appData.Ios)
    this.allowIosProfile = types.pBool(iosData.AllowIosProfile)
  }
}

let settings = null

export default {
  init(appData) {
    settings = new MobileSyncSettings(appData)
  },

  getSetting(settingName) {
    return settings ? settings[settingName] : null
  },
}
