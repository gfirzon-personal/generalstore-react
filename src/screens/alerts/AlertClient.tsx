import { AlertFilterRequestModel } from "../../types/AlertFilterRequestModel"
import vanillaClient from "../../utils/AxiosClient"
import { AlertHistoryModel } from "../../types/AlertHistoryModel"

const _alerts = "/alerts"

const getAlertHistoryList = async (body: AlertFilterRequestModel) => {
  return vanillaClient<AlertHistoryModel[]>(`${_alerts}/getAlertHistoryList`, {
    method: "POST",
    body: body,
  })
}

const getActiveAlertList = async (body: AlertFilterRequestModel) => {
  return vanillaClient<AlertHistoryModel[]>(`${_alerts}/getActiveAlertsList`, {
    method: "POST",
    body: body,
  })
}

const getAlertHistory = async (historyId: number) => {
  return vanillaClient<any>(`${_alerts}/getAlertHistory`, {
    alertHistoryId: historyId,
  })
}

const acknowledgeAlertHistory = (alertId: number) => {
  return vanillaClient<any>(`${_alerts}/acknowledgeAlertHistory`, { method: "POST", alertId: alertId })
}

const clearAlertHistory = (alertId: number) => {
  return vanillaClient<any>(`${_alerts}/clearAlertHistory`, { method: "POST", alertId: alertId })
}

export { getAlertHistoryList, getAlertHistory, getActiveAlertList, acknowledgeAlertHistory, clearAlertHistory }
