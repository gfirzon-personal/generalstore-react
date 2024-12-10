import React from "react"
import { Route, Switch } from "react-router-dom"
import AdminAccess from "../admin-access/AdminAccess"
import AdminAlerts from "../admin-alerts/AdminAlerts"
import AdminConnectors from "../admin-connectors/AdminConnectors"
import AdminEmailSettings from "../admin-email-settings/AdminEmailSettings"
import AdminGeneralSettings from "../admin-general-settings/AdminGeneralSettings"
import AdminManageInstanceEdit from "../admin-manage-instances/AdminManageInstanceEdit"
import AdminManageInstances from "../admin-manage-instances/AdminManageInstances"
import AdminRetention from "../admin-retention/AdminRetention"
import AdminRetentionEdit from "../admin-retention/AdminRetentionEdit"
import AdminUserList from "../admin-user-list/AdminUserList"
import AdminUserEdit from "../admin-user-list/AdminUserEdit"
import AdminGroupList from "../admin-group-list/AdminGroupList"
import AdminGroupEdit from "../admin-group-list/AdminGroupEdit"
import AdminPermissionList from "../admin-permission-list/AdminPermissionList"
import AdminUserGroup from "../admin-user-list/AdminUserGroup"
import AdminUserSessionsList from "../admin-user-list/AdminUserSessionsList"
import AdminUserPermission from "../admin-user-list/AdminUserPermission"
import AdminGroupUser from "../admin-group-list/AdminGroupUser"
import AdminGroupPermission from "../admin-group-list/AdminGroupPermission"
import AdminPermissionUser from "../admin-permission-list/AdminPermissionUser"
import AdminPermissionGroup from "../admin-permission-list/AdmingPermissionGroup"

const AdminRoutes = () => {
  return (
    <Switch>
      <Route exact path="/admin/general" render={(routerProps) => <AdminGeneralSettings />} />
      <Route exact path="/admin/alerts" render={(routerProps) => <AdminAlerts />} />
      <Route exact path="/admin/connectors" render={(routerProps) => <AdminConnectors />} />
      <Route
        path="/admin/retention/:retentionId"
        render={(routerProps) => <AdminRetentionEdit retentionId={+routerProps.match.params.retentionId} />}
      />
      <Route exact path="/admin/retention" render={(routerProps) => <AdminRetention />} />
      <Route exact path="/admin/access" render={(routerProps) => <AdminAccess />} />
      <Route exact path="/admin/email-settings" render={(routerProps) => <AdminEmailSettings />} />
      <Route
        path="/admin/manage-instances/:instanceId"
        render={(routerProps) => <AdminManageInstanceEdit instanceId={+routerProps.match.params.instanceId} />}
      />
      <Route exact path="/admin/manage-instances" render={(routerProps) => <AdminManageInstances />} />
      <Route
        path="/admin/:id/user-groups/"
        render={(routerProps) => <AdminUserGroup uId={+routerProps.match.params.id} />}
      />
      <Route
        exact
        path="/admin/user-sessions/:id"
        render={(routerProps) => <AdminUserSessionsList uId={+routerProps.match.params.id} />}
      />
      <Route
        exact
        path="/admin/:id/user-permissions"
        render={(routerProps) => <AdminUserPermission uId={+routerProps.match.params.id} />}
      />
      <Route
        exact
        path="/admin/users/:id"
        render={(routerProps) => <AdminUserEdit userId={+routerProps.match.params.id} />}
      />
      <Route exact path="/admin/users" render={(routerProps) => <AdminUserList />} />
      <Route
        exact
        path="/admin/groups/:id"
        render={(routerProps) => <AdminGroupEdit groupId={+routerProps.match.params.id} />}
      />
      <Route
        exact
        path="/admin/permissions/:id/permission-groups"
        render={(routerProps) => <AdminPermissionGroup permId={+routerProps.match.params.id} />}
      />
      <Route
        exact
        path="/admin/permissions/:id/permission-users"
        render={(routerProps) => <AdminPermissionUser permId={+routerProps.match.params.id} />}
      />
      <Route
        exact
        path="/admin/groups/:id/group-users"
        render={(routerProps) => <AdminGroupUser grpId={+routerProps.match.params.id} />}
      />
      <Route
        exact
        path="/admin/groups/:id/group-permissions"
        render={(routerProps) => <AdminGroupPermission grpId={+routerProps.match.params.id} />}
      />
      <Route exact path="/admin/groups" render={(routerProps) => <AdminGroupList />} />
      <Route exact path="/admin/permissions" render={(routerProps) => <AdminPermissionList />} />
    </Switch>
  )
}

export default AdminRoutes
