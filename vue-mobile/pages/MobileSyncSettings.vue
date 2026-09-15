<template>
  <div class="q-pa-lg" data-test-id="settings-mobile-sync">
    <AppButton
      v-if="showIosProfileAction"
      data-test-id="settings-mobile-sync-get-ios-profile"
      :label="$t('MOBILESYNCWEBCLIENT.ACTION_GET_IOS_PROFILE')"
      @click="onGetIosProfileClick"
    />
  </div>
</template>

<script>
import { getApiHost } from 'src/api/helpers'

import AppButton from 'src/components/common/AppButton'

import settings from '../settings'
import isIosDevice from '../utils/is-ios-device'

export default {
  name: 'MobileSyncSettings',

  components: {
    AppButton,
  },

  data: () => ({
    showIosProfileAction: settings.getSetting('allowIosProfile') === true && isIosDevice(),
  }),

  methods: {
    onGetIosProfileClick() {
      window.location.href = getApiHost() + '?Profile'
    },
  },
}
</script>
