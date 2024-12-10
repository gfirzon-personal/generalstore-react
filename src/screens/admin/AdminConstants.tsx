const getUserAssignedPermissionsKey = (userId: number) => {
  return ["list-user-assigned-permissions", userId]
}

const getStaticUserPermissionsKey = (userId: number) => {
  return ["list-static-user-assigned-permissions", userId]
}
const getUserUnassignedPermissionsKey = (userId: number) => {
  return ["list-user-unassigned-permissions", userId]
}

const getUserAssignedGroupsKey = (userId: number) => {
  return ["list-user-assigned-groups", userId]
}

const getStaticUserGroupsKey = (userId: number) => {
  return ["list-static-user-assigned-groups", userId]
}

const getUserUnassignedGroupsKey = (userId: number) => {
  return ["list-user-unassigned-groups", userId]
}

const getAdminGroupsKey = () => {
  return ["list-user-unassigned-groups"]
}

const getGroupAssignedUsersKey = (groupId: number) => {
  return ["list-group-assigned-users", groupId]
}

const getStaticGroupUsersKey = (groupId: number) => {
  return ["list-static-group-assigned-users", groupId]
}

const getGroupUnassignedUsersKey = (groupId: number) => {
  return ["list-group-unassigned-users", groupId]
}

const getGroupAssignedPermissionsKey = (groupId: number) => {
  return ["list-group-assigned-permissions", groupId]
}

const getStaticGroupPermissionsKey = (groupId: number) => {
  return ["list-static-group-assigned-permissions", groupId]
}

const getGroupUnassignedPermissionsKey = (groupId: number) => {
  return ["list-group-unassigned-permissions", groupId]
}

const getPermissionAssignedUsersKey = (permissionId: number) => {
  return ["list-permission-assigned-users", permissionId]
}

const getStaticPermissionUsersKey = (permissionId: number) => {
  return ["list-static-permission-assigned-users", permissionId]
}

const getPermissionUnassignedUsersKey = (permissionId: number) => {
  return ["list-permission-unassigned-users", permissionId]
}

const getPermissionAssignedGroupsKey = (permissionId: number) => {
  return ["list-permission-assigned-groups", permissionId]
}

const getStaticPermissionGroupsKey = (permissionId: number) => {
  return ["list-static-permission-assigned-groups", permissionId]
}

const getPermissionUnassignedGroupsKey = (permissionId: number) => {
  return ["list-permission-unassigned-groups", permissionId]
}

const getUserSessionsKey = (userId: number) => {
  return ["list-user-sessions", userId]
}

export {
  getUserAssignedPermissionsKey,
  getStaticUserPermissionsKey,
  getUserUnassignedPermissionsKey,
  getUserAssignedGroupsKey,
  getStaticUserGroupsKey,
  getUserUnassignedGroupsKey,
  getGroupAssignedUsersKey,
  getStaticGroupUsersKey,
  getGroupUnassignedUsersKey,
  getAdminGroupsKey,
  getGroupAssignedPermissionsKey,
  getStaticGroupPermissionsKey,
  getGroupUnassignedPermissionsKey,
  getPermissionAssignedUsersKey,
  getStaticPermissionUsersKey,
  getPermissionUnassignedUsersKey,
  getPermissionAssignedGroupsKey,
  getStaticPermissionGroupsKey,
  getPermissionUnassignedGroupsKey,
  getUserSessionsKey,
}
