import { AdminGroupModel } from "../types/AdminGroupModel"
import { AdminUserModel } from "../types/AdminUserModel"
import { AdminPermissionModel } from "../types/AdminPermissionModel"
import { AdminAssignModel } from "../types/AdminAssignModel"
import client from "./ApiClient"
import vanillaClient from "./AxiosClient"
import { AdminSessionModel } from "../types/AdminSessionModel"

const _adminUser = "/AdminUsers"
const _adminGroup = "/AdminGroups"
const _adminPermission = "/AdminPermissions"
const _adminGroupUsers = "/AdminGroupUsers"
const _adminUserPermissions = "/AdminUserPermissions"
const _adminGroupPermissions = "/AdminGroupPermissions"

const getAdminUserList = (customerId: number) => {
  return vanillaClient<AdminUserModel[]>(`${_adminUser}/getUsersListByCustomerId`, { customerId: customerId })
}

const getAdminUser = (userId: number) => {
  return vanillaClient<any>(`${_adminUser}/${userId}`)
}

const deleteAdminUser = (userId: number) => {
  return vanillaClient<AdminUserModel>(`${_adminUser}/${userId}`, { method: "DELETE" })
}

const createAdminUser = (user: AdminUserModel) => {
  return client(`${_adminUser}`, { method: "POST", body: user })
}

const updateAdminUser = (user: AdminUserModel) => {
  return client(`${_adminUser}`, { method: "PUT", body: user })
}

const getAdminGroupList = () => {
  return vanillaClient<AdminGroupModel[]>(`${_adminGroup}/getGroupsList`)
}

const getAdminGroup = (groupId: number) => {
  return vanillaClient<AdminGroupModel>(`${_adminGroup}/${groupId}`)
}

const deleteAdminGroup = (groupId: number) => {
  return vanillaClient<AdminGroupModel>(`${_adminGroup}/${groupId}`, { method: "DELETE" })
}

const createAdminGroup = (group: AdminGroupModel) => {
  return client(`${_adminGroup}`, { method: "POST", body: group })
}

const updateAdminGroup = (group: AdminGroupModel) => {
  return client(`${_adminGroup}`, { method: "PUT", body: group })
}

const getAdminPermissionList = () => {
  return client<AdminPermissionModel[]>(`${_adminPermission}/getAdminPermissionsList`)
}

const createAdminPermissionUser = (assignModel: AdminAssignModel) => {
  return client(`${_adminUserPermissions}`, { method: "POST", body: assignModel })
}

const deleteAdminPermissionUser = (permissionId: number, userId: number) => {
  return client(`${_adminUserPermissions}/deleteByAssociation/${permissionId}/${userId}`, { method: "DELETE" })
}

const getAdminUserAssignedGroupList = async (userId: number) => {
  return vanillaClient<AdminGroupModel[]>(`${_adminUser}/getAssignedGroups/${userId}`)
}

const getAdminUserUnassignedGroupList = async (userId: number) => {
  return vanillaClient<AdminGroupModel[]>(`${_adminUser}/getUnassignedGroups/${userId}`)
}

const createAdminGroupUser = (assignModel: AdminAssignModel) => {
  return client(`${_adminGroupUsers}`, { method: "POST", body: assignModel })
}

const deleteAdminGroupUser = (groupId: number, userId: number) => {
  return client(`${_adminGroupUsers}/deleteByAssociation/${groupId}/${userId}`, { method: "DELETE" })
}

const getAdminUserSessions = (userId: number) => {
  return vanillaClient<AdminSessionModel[]>(`${_adminUser}/getUserSessionsList/${userId}`)
}

const getAdminUserAssignedPermissionList = async (userId: number) => {
  return vanillaClient<AdminGroupModel[]>(`${_adminUser}/getAssignedPermissions/${userId}`)
}

const getAdminUserUnassignedPermissionList = async (userId: number) => {
  return vanillaClient<AdminGroupModel[]>(`${_adminUser}/getUnassignedPermissions/${userId}`)
}

const getAdminGroupAssignedUserList = async (groupId: number) => {
  return vanillaClient<AdminUserModel[]>(`${_adminGroup}/getAssignedUsers/${groupId}`)
}

const getAdminGroupUnassignedUserList = async (groupId: number) => {
  return vanillaClient<AdminUserModel[]>(`${_adminGroup}/getUnassignedUsers/${groupId}`)
}

const getAdminGroupAssignedPermissionList = async (groupId: number) => {
  return vanillaClient<AdminGroupModel[]>(`${_adminGroup}/getAssignedPermissions/${groupId}`)
}

const getAdminGroupUnassignedPermissionList = async (groupId: number) => {
  return vanillaClient<AdminGroupModel[]>(`${_adminGroup}/getUnassignedPermissions/${groupId}`)
}

const createAdminGroupPermission = (assignModel: AdminAssignModel) => {
  return client(`${_adminGroupPermissions}`, { method: "POST", body: assignModel })
}

const deleteAdminGroupPermission = (groupId: number, permissionId: number) => {
  return client(`${_adminGroupPermissions}/deleteByAssociation/${groupId}/${permissionId}`, { method: "DELETE" })
}

const getAdminPermissionAssignedUserList = async (permissionId: number) => {
  return vanillaClient<AdminUserModel[]>(`${_adminPermission}/getAssignedUsers`, { permissionId: permissionId })
}

const getAdminPermissionUnassignedUserList = async (permissionId: number) => {
  return await vanillaClient<AdminUserModel[]>(`${_adminPermission}/getUnassignedUsers`, { permissionId: permissionId })
}

const getAdminPermissionAssignedGroupList = async (permissionId: number) => {
  return vanillaClient<AdminGroupModel[]>(`${_adminPermission}/getAssignedGroups`, { permissionId: permissionId })
}

const getAdminPermissionUnassignedGroupList = async (permissionId: number) => {
  return await vanillaClient<AdminGroupModel[]>(`${_adminPermission}/getUnassignedGroups`, {
    permissionId: permissionId,
  })
}

export {
  getAdminUserList,
  getAdminUser,
  deleteAdminUser,
  createAdminUser,
  updateAdminUser,
  getAdminGroupList,
  getAdminGroup,
  deleteAdminGroup,
  createAdminGroup,
  updateAdminGroup,
  getAdminPermissionList,
  createAdminPermissionUser,
  deleteAdminPermissionUser,
  getAdminUserAssignedGroupList,
  getAdminUserUnassignedGroupList,
  createAdminGroupUser,
  deleteAdminGroupUser,
  getAdminUserSessions,
  getAdminUserAssignedPermissionList,
  getAdminUserUnassignedPermissionList,
  getAdminGroupAssignedUserList,
  getAdminGroupUnassignedUserList,
  getAdminGroupAssignedPermissionList,
  getAdminGroupUnassignedPermissionList,
  createAdminGroupPermission,
  deleteAdminGroupPermission,
  getAdminPermissionAssignedUserList,
  getAdminPermissionUnassignedUserList,
  getAdminPermissionAssignedGroupList,
  getAdminPermissionUnassignedGroupList,
}
