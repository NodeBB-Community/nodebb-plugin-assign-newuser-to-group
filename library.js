const winston = nodebb.require('winston');
const groups = nodebb.require('./src/groups');
const Meta = nodebb.require('./src/meta');
const routeHelpers = nodebb.require('./src/routes/helpers');

const AssignNewUser = module.exports;
let userGroup = null;

AssignNewUser.init = async function(params) {
	const { router } = params;
    const settings = await Meta.settings.get('assign-newuser-to-group');
	if (settings && settings.userGroup) {
		userGroup = settings.userGroup;
	} else {
		winston.error('[plugins/assign-newuser-to-group] User group not set!');
	}

	routeHelpers.setupAdminPageRoute(router, '/admin/plugins/assign-newuser-to-group', function (req, res, next) {
		res.render('admin/plugins/assign-newuser-to-group', {
			title:  'Assign new user to group',
		});
	});
};

AssignNewUser.assignUserToGroup = async function (hookData) {
    if (userGroup != null && hookData && hookData.user) {
		const exists = await groups.exists(userGroup);
		if (!exists) {
			winston.error(`[plugins/assign-newuser-to-group] User group "${userGroup}" does not exist!`);
			return;
		}
        await groups.join(userGroup, hookData.user.uid);
    }
};

AssignNewUser.admin = {
	menu: async function(header) {
		header.plugins.push({
			route: '/plugins/assign-newuser-to-group',
			icon: 'fa-check',
			name: 'Assign new user to group'
		});
		return header;
	}
};
