<div class="row">
    <div class="col-lg-9">
        <div class="panel panel-default">
            <div class="panel-heading"><i class="fa fa-check"></i> Assign new user to group</div>
            <div class="panel-body">
                <p>Enter a group name</p>
                <form role="form" class="assign-newuser-to-group-settings">
                    <div class="form-group col-xs-6">
						<label for="userGroup">Group Name</label>
						<input type="text" id="userGroup" name="userGroup" title="Group Name" class="form-control" placeholder="group name">
					</div>
                </form>
            </div>
        </div>
    </div>
    <div class="col-lg-3">
		<div class="panel panel-default">
			<div class="panel-heading">Control Panel</div>
			<div class="panel-body">
				<button class="btn btn-primary" id="save">Save Settings</button>
			</div>
		</div>
	</div>
</div>


<script type="text/javascript">
	require(['settings'], function(Settings) {
    Settings.load('assign-newuser-to-group', $('.assign-newuser-to-group-settings'));

    $('#save').on('click', function() {
        Settings.save('assign-newuser-to-group', $('.assign-newuser-to-group-settings'), function() {
            app.alert({
                type: 'success',
                alert_id: 'assign-newuser-to-group-saved',
                title: 'Settings Saved',
                message: 'Click here to reload NodeBB',
                timeout: 2500,
                clickfn: function() {
                    socket.emit('admin.reload');
                }
            });
        });
    });
});
</script>