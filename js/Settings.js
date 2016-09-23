'use strict';

var Types = require('%PathToCoreWebclientModule%/js/utils/Types.js');

module.exports = {
	ServerModuleName: 'MobileSync',
	HashModuleName: 'mobilesync',
	ServerDavModuleName: 'Dav',
	
	ExternalHostNameOfDAVServer: '',
	
	init: function (oAppDataSection)
	{
		this.ExternalHostNameOfDAVServer = Types.pString(oAppDataSection.ExternalHostNameOfDAVServer);
	},
	
	update: function (sExternalHostNameOfDAVServer)
	{
		this.ExternalHostNameOfDAVServer = sExternalHostNameOfDAVServer;
	}
};
