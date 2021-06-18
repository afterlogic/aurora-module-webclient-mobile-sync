import settings from '../../MobileSyncWebclient/vue/settings'

export default {
  moduleName: 'MobileSyncWebclient',

  requiredModules: ['Dav'],

  init (appData) {
    settings.init(appData)
  },

  getAdminSystemTabs () {
    return [
      {
        tabName: 'mobilesync',
        title: 'MOBILESYNCWEBCLIENT.LABEL_SETTINGS_TAB',
        component () {
          return import('src/../../../MobileSyncWebclient/vue/components/MobileSyncAdminSettings')
        },
      },
    ]
  },
}
