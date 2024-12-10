import { JwtInfoModel } from "../types/JwtInfoModel"
import { CURRENT_USER } from "../utils/constants"

const PRIVILEGE_CODE = {
  ADMIN_MENU: 100,
  GENERAL_SETTINGS: 101,
  ALERT_SETTINGS: 102,
  DEFAULT_RETENTION: 103,
  ACCESS_AND_USER_SECURITY: 104,
  CONNECTOR_SETTINGS: 105,
  EMAIL_SETTINGS: 106,
  MANAGE_INSTANCES: 107,
  ROUTING_AND_RENAMING: 108,
  USERS: 109,
  USER_GROUPS: 110,
  USER_INVITATIONS: 111,
  REGISTRATION_APPROVALS: 112,
  PERMISSIONS: 113,
  THRU_OPS_ADMIN_MENU: 1000,
  THRU_OPS_OPERATIONS_DASHBOARD: 1001,
  THRU_OPS_APPLICATION_SETTINGS: 1002,
  THRU_OPS_MANAGE_CUSTOMERS: 1003,
  THRU_OPS_MANAGE_CLIENTS: 1004,
  THRU_OPS_EMAIL_TEMPLATES: 1005,
  THRU_OPS_USER_INVITATIONS: 1006,
  THRU_OPS_REGISTRATION_APPROVALS: 1007,
  THRU_OPS_USERS: 1008,
  THRU_OPS_GROUPS: 1009,
  THRU_OPS_PERMISSIONS: 1010,
}

function useJwtInfo() {
  const t = window.localStorage.getItem(CURRENT_USER)

  if (!t) {
    return
  }

  const tt = atob(t)
  const payload: any = JSON.parse(tt)

  const base64Url = payload.token.split(".")[1]
  const decodedValue: JwtInfoModel = JSON.parse(window.atob(base64Url))

  //   decodedValue.PrivilegeCodes =
  //     PRIVILEGE_CODE.ADMIN_MENU +
  //     "," +
  //     PRIVILEGE_CODE.USERS +
  //     "," +
  //     PRIVILEGE_CODE.USER_GROUPS +
  //     "," +
  //     PRIVILEGE_CODE.PERMISSIONS +
  //     "," +
  //     PRIVILEGE_CODE.THRU_OPS_EMAIL_TEMPLATES +
  //     "," +
  //     PRIVILEGE_CODE.THRU_OPS_MANAGE_CUSTOMERS +
  //     "," +
  //     PRIVILEGE_CODE.THRU_OPS_APPLICATION_SETTINGS +
  //     "," +
  //     PRIVILEGE_CODE.THRU_OPS_ADMIN_MENU +
  //     "," +
  //     PRIVILEGE_CODE.THRU_OPS_USERS +
  //     "," +
  //     PRIVILEGE_CODE.THRU_OPS_GROUPS +
  //     "," +
  //     PRIVILEGE_CODE.THRU_OPS_PERMISSIONS

  const hasPrivilege = (priviledge: number) =>
    decodedValue.PrivilegeCodes?.split(",")
      .map((code) => parseInt(code))
      .includes(priviledge)

  return { data: decodedValue, hasPrivilege }
}

export { useJwtInfo, PRIVILEGE_CODE }
