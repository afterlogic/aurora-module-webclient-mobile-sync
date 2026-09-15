import _ from 'lodash'

import eventBus from 'src/event-bus'

import { i18n } from '../../CoreMobileWebclient/vue-mobile/src/boot/i18n'

import settings from './settings'
import isIosDevice from './utils/is-ios-device'

const SETTINGS_PATH = '/settings/mobile-sync'

const _isIosProfileTabAllowed = () => settings.getSetting('allowIosProfile') === true && isIosDevice()

const _getSettingsTabs = params => {
  if (!_isIosProfileTabAllowed()) {
    return
  }
  if (!_.isArray(params.settingsTabs)) {
    params.settingsTabs = []
  }
  params.settingsTabs = params.settingsTabs.concat([
    {
      routerPath: SETTINGS_PATH,
      tabNameLangConst: 'MOBILESYNCWEBCLIENT.LABEL_SETTINGS_TAB',
      getIconComponent: () => import('./components/icons/MobileSyncIcon'),
    },
  ])
}

const _getSettingsPageChildren = params => {
  if (!_isIosProfileTabAllowed()) {
    return
  }
  if (!_.isArray(params.settingsPageChildren)) {
    params.settingsPageChildren = []
  }
  params.settingsPageChildren = params.settingsPageChildren.concat([
    {
      path: SETTINGS_PATH,
      component: () => import('./pages/MobileSyncSettings'),
    },
  ])
}

const _getSettingsHeaderTitles = params => {
  if (!_isIosProfileTabAllowed()) {
    return
  }
  if (!_.isArray(params.settingsHeaderTitles)) {
    params.settingsHeaderTitles = []
  }
  params.settingsHeaderTitles = params.settingsHeaderTitles.concat([
    {
      settingsPath: SETTINGS_PATH,
      settingsTitle: i18n.global.t('MOBILESYNCWEBCLIENT.HEADING_SETTINGS_TAB'),
    },
  ])
}

export default {
  moduleName: 'MobileSyncWebclient',

  requiredModules: [],

  init(appdata) {
    settings.init(appdata)
  },

  initSubscriptions() {
    eventBus.$off('SettingsMobileWebclient::GetSettingsTabs', _getSettingsTabs)
    eventBus.$on('SettingsMobileWebclient::GetSettingsTabs', _getSettingsTabs)

    eventBus.$off('SettingsMobileWebclient::GetSettingsPageChildren', _getSettingsPageChildren)
    eventBus.$on('SettingsMobileWebclient::GetSettingsPageChildren', _getSettingsPageChildren)

    eventBus.$off('SettingsMobileWebclient::GetSettingsHeaderTitles', _getSettingsHeaderTitles)
    eventBus.$on('SettingsMobileWebclient::GetSettingsHeaderTitles', _getSettingsHeaderTitles)

    eventBus.$emit('CoreMobileWebclient::InitSubscription')
  },
}
