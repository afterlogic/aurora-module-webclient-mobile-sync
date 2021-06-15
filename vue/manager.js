import settings from "../../MobileSyncWebclient/vue/settings";
export default {
    name: 'mobileSyncWebclient',
    init (appData) {
        settings.init(appData)
    },
    getAdminSystemTabs () {
        return [
            {
                name: 'mobilesync',
                title: 'MOBILESYNCWEBCLIENT.LABEL_SETTINGS_TAB',
                component () {
                    return import('src/../../../MobileSyncWebclient/vue/components/MobileSyncAdminSettings')
                },
            },
        ]
    },
}
