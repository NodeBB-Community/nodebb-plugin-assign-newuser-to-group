const winston = require.main.require('winston');
const groups = require.main.require('./src/groups');
const Meta = require.main.require('./src/meta');

const AssignNewUser = module.exports;
let userGroup = null;

AssignNewUser.init = async function(params) {
	function render(req, res, next) {
		res.render('admin/plugins/assign-newuser-to-group', {});
	}

    const settings = await Meta.settings.get('assign-newuser-to-group');
	if (settings && settings.userGroup) {
		userGroup = settings.userGroup;
	} else {
		winston.error('[plugins/assign-newuser-to-group] User group not set!');
	}

	params.router.get('/admin/plugins/assign-newuser-to-group', params.middleware.admin.buildHeader, render);
	params.router.get('/api/admin/plugins/assign-newuser-to-group', render);
};

AssignNewUser.assignUserToGroup = async function (hookData) {
    if (userGroup != null && hookData && hookData.user) {
        await groups.join(userGroup, hookData.user.uid);
    }
};

AssignNewUser.admin = {
	menu: async function(header) {
		header.plugins.push({
			"route": '/plugins/assign-newuser-to-group',
			"icon": 'fa-check',
			"name": 'Assign new user to group'
		});
		return header;
	}
};
