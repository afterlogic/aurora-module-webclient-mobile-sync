<template>
  <div class="q-pa-lg" data-test-id="settings-mobile-sync">
    <a
      v-if="showIosProfileAction"
      class="text-primary"
      data-test-id="settings-mobile-sync-get-ios-profile"
      :href="iosProfileUrl"
    >
      {{ $t('MOBILESYNCWEBCLIENT.ACTION_GET_IOS_PROFILE') }}
    </a>
  </div>
</template>

<script>
import { getApiHost } from 'src/api/helpers'

import settings from '../settings'
import isIosDevice from '../utils/is-ios-device'

export default {
  name: 'MobileSyncSettings',

  data: () => ({
    showIosProfileAction: settings.getSetting('allowIosProfile') === true && isIosDevice(),
    iosProfileUrl: getApiHost() + '?Profile',
  }),
}
</script>
