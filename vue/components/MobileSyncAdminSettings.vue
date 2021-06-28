<template>
  <q-scroll-area class="full-height full-width">
    <div class="q-pa-lg">
      <div class="row q-mb-md">
        <div class="col text-h5">{{ $t('MOBILESYNCWEBCLIENT.HEADING_SETTINGS_TAB') }}</div>
      </div>
      <q-card flat bordered class="card-edit-settings">
        <q-card-section>
          <div class="row">
            <div class="col-2 q-my-sm" v-t="'MOBILESYNCWEBCLIENT.LABEL_DAV_SERVER'"></div>
            <div class="col-5">
              <q-input outlined dense class="bg-white" v-model="externalHostNameOfDAVServer"/>
            </div>
          </div>
        </q-card-section>
      </q-card>
      <div class="q-pt-md text-right">
        <q-btn unelevated no-caps dense class="q-px-sm" :ripple="false" color="primary" @click="save"
               :label="saving ? $t('COREWEBCLIENT.ACTION_SAVE_IN_PROGRESS') : $t('COREWEBCLIENT.ACTION_SAVE')">
        </q-btn>
      </div>
    </div>
    <UnsavedChangesDialog ref="unsavedChangesDialog"/>
  </q-scroll-area>
</template>

<script>
import settings from '../../../MobileSyncWebclient/vue/settings'
import UnsavedChangesDialog from 'src/components/UnsavedChangesDialog'
import webApi from 'src/utils/web-api'
import notification from 'src/utils/notification'
import errors from 'src/utils/errors'
import _ from 'lodash'

export default {
  name: 'MobileSyncAdminSettings',
  data () {
    return {
      saving: false,
      externalHostNameOfDAVServer: ''
    }
  },
  components: {
    UnsavedChangesDialog
  },
  mounted () {
    this.populate()
  },
  beforeRouteLeave (to, from, next) {
    if (this.hasChanges() && _.isFunction(this?.$refs?.unsavedChangesDialog?.openConfirmDiscardChangesDialog)) {
      this.$refs.unsavedChangesDialog.openConfirmDiscardChangesDialog(next)
    } else {
      next()
    }
  },
  methods: {
    hasChanges () {
      const data = settings.getMobileSyncSettings()
      return this.externalHostNameOfDAVServer !== data.ExternalHostNameOfDAVServer
    },
    populate () {
      const data = settings.getMobileSyncSettings()
      this.externalHostNameOfDAVServer = data.ExternalHostNameOfDAVServer
    },
    save () {
      if (!this.saving) {
        this.saving = true
        const parameters = {
          ExternalHostNameOfDAVServer: this.externalHostNameOfDAVServer,
        }
        webApi.sendRequest({
          moduleName: 'Dav',
          methodName: 'UpdateSettings',
          parameters,
        }).then(result => {
          this.saving = false
          if (result === true) {
            settings.saveMobileSyncSettings(parameters)
            this.populate()
            notification.showReport(this.$t('COREWEBCLIENT.REPORT_SETTINGS_UPDATE_SUCCESS'))
          } else {
            notification.showError(this.$t('COREWEBCLIENT.ERROR_SAVING_SETTINGS_FAILED'))
          }
        }, response => {
          this.saving = false
          notification.showError(errors.getTextFromResponse(response, this.$t('COREWEBCLIENT.ERROR_SAVING_SETTINGS_FAILED')))
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
