'use strict';

define('admin/plugins/assign-newuser-to-group', ['settings'], function (Settings) {
	var ACP = {};

	ACP.init = function () {
		Settings.load('assign-newuser-to-group', $('.assign-newuser-to-group-settings'));

		$('#save').on('click', function () {
			Settings.save('assign-newuser-to-group', $('.assign-newuser-to-group-settings'));
		});
	};

	return ACP;
});
