var	fs = require('fs'),
    groups = module.parent.require('./groups'),
	winston = module.parent.require('winston'),
	Meta = module.parent.require('./meta'),

	AssignNewUser = {},
    userGroup = null;

AssignNewUser.init = function(params, callback) {
	function render(req, res, next) {
		res.render('admin/plugins/assign-newuser-to-group', {});
	}

    Meta.settings.get('assign-newuser-to-group', function(err, settings) {
		if (!err && settings && settings.userGroup) {
			userGroup = settings.userGroup;
		} else {
			winston.error('[plugins/assign-newuser-to-group] User group not set!');
		}
	});
    
	params.router.get('/admin/plugins/assign-newuser-to-group', params.middleware.admin.buildHeader, render);
	params.router.get('/api/admin/plugins/assign-newuser-to-group', render);
    
	callback();
};

AssignNewUser.assignUserToGroup = function(userData) {
    if (userGroup != null) {
        groups.join(userGroup, userData.uid);
    }
};

AssignNewUser.admin = {
	menu: function(custom_header, callback) {
		custom_header.plugins.push({
			"route": '/plugins/assign-newuser-to-group',
			"icon": 'fa-check',
			"name": 'Assign new user to group'
		});

		callback(null, custom_header);
	}
};

module.exports = AssignNewUser;