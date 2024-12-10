import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query"
import TextInputLabel from "../../components/form/TextInputLabel"
import { ThruFormProvider } from "../../contexts/ThruFormContext"
import { getAlertHistoryList, acknowledgeAlertHistory, clearAlertHistory } from "../alerts/AlertClient"
import { AlertFilterRequestModel } from "../../types/AlertFilterRequestModel"
import SelectInputLabel from "../../components/form/SelectInputLabel"
import { useLoader } from "../../contexts/LoaderContext"
import { toast } from "react-toastify"
import { showToast } from "../../utils/ErrorUtils"
import { AlertHistoryModel } from "../../types/AlertHistoryModel"
import SearchableTable, { compareDates, formatDate } from "../../components/searchable-table/SearchableTable"
import AlertModal from "./AlertModal"
import BadgeCheck from "../../components/icons/BadgeCheck"
import TimesCircle from "../../components/icons/TimesCircle"

const inputs = {
  ALERT_TYPE: "alertType",
  FLOW_CODE: "flowCode",
  ENDPOINT_CODE: "endpointCode",
  ORGANIZATION_CODE: "organizationCode",
  FROM_DATE: "fromDate",
  TO_DATE: "toDate",
  ALERT_STATE: "alertState",
}

const AlertsList: React.FC<IAlertsList> = () => {
  const form = useForm()
  const { setLoading } = useLoader()
  const [alerts, setAlerts] = useState<AlertHistoryModel[] | undefined>()
  const [selectedAlert, setSelectedAlert] = useState<AlertHistoryModel>()
  const queryClient = useQueryClient()

  const getAlertHistory = useMutation(
    (model: AlertFilterRequestModel) => {
      return getAlertHistoryList(model)
    },
    {
      onMutate: async (alert) => {
        setLoading(true)
      },
      onError: (err, context: any) => {
        showToast("Failed to get the alert history.", err)
      },
      onSuccess: (alertHistoryData: AlertHistoryModel[], context) => {
        setAlerts(alertHistoryData)
      },
      onSettled: (data, error, variables, context) => {
        setLoading(false)
      },
    }
  )

  useEffect(() => {
    getAlertHistory.mutate({ state: "Active" })
  }, [])

  const onSubmit = async (data: any) => {
    const alertRequest: AlertFilterRequestModel = {
      alertType: data[inputs.ALERT_TYPE],
      endpointCode: data[inputs.ENDPOINT_CODE],
      flowCode: data[inputs.FLOW_CODE],
      organizationCode: data[inputs.ORGANIZATION_CODE],
      fromDate: data[inputs.FROM_DATE],
      toDate: data[inputs.TO_DATE],
      state: data[inputs.ALERT_STATE],
    }

    getAlertHistory.mutate(alertRequest)
  }

  const resetFilter = () => {
    form.setValue(inputs.ALERT_TYPE, 0)
    form.setValue(inputs.ENDPOINT_CODE, "")
    form.setValue(inputs.FLOW_CODE, "")
    form.setValue(inputs.ORGANIZATION_CODE, "")
    form.setValue(inputs.FROM_DATE, null)
    form.setValue(inputs.TO_DATE, null)
    form.setValue(inputs.ALERT_STATE, "Active")
    getAlertHistory.mutate({ state: "Active" })
  }

  const header = [
    {
      title: "Flow",
      getValue: (data: AlertHistoryModel) => data.flowName,
      //to: (data: AlertHistoryModel) => `/flows/${data.flowId}`,
      to: (data: AlertHistoryModel) => (data.isFlowDeleted ? undefined : `/flows/${data.flowId}`),
    },
    {
      title: "Alert Type",
      getValue: (data: AlertHistoryModel) => data.alertType,
    },
    { title: "Created", getValue: (data: AlertHistoryModel) => formatDate(data.createdDate), compare: compareDates },
    {
      title: "Severity",
      getValue: (data: AlertHistoryModel) =>
        data.severityName === "Critical" ? (
          <p className="alert-critical mb-0">Critical</p>
        ) : (
          <p className="alert-caution mb-0">{data.severityName}</p>
        ),
    },
    {
      title: "Alert ID",
      getValue: (data: AlertHistoryModel) => data.id,
    },
    {
      title: "Organization",
      getValue: (data: AlertHistoryModel) => data.organizationName,
      //to: (data: AlertHistoryModel) => `/organizations/${data.organizationId}`,
      to: (data: AlertHistoryModel) =>
        data.isOrganizationDeleted ? undefined : `/organizations/${data.organizationId}`,
    },
    { title: "State", getValue: (data: AlertHistoryModel) => data.state },
    {
      title: "Details",
      getValue: (data: AlertHistoryModel) => (
        <button
          id="btnViewDetails"
          type="button"
          className="btn btn-viewChanges"
          onClick={async () => {
            setSelectedAlert(data)
            document.getElementById("alert-open-modal")?.click()
          }}
        >
          <i className="fad fa-eye" />
        </button>
      ),
    },
  ]

  const actions = (data: AlertHistoryModel) => [
    ...(data.state === "Active"
      ? [
          {
            title: "Acknowledge Alert",
            icon: <BadgeCheck />,
            onClick: (data: AlertHistoryModel) => {
              if (data.state === "Acknowledged" || data.state == "Cleared") {
                return true
              }
              setLoading(true)
              acknowledgeAlertHistory(data.id)
                .then((res) => {
                  console.log({ res: res })
                  setAlerts((alerts) =>
                    alerts?.map((alert) => {
                      if (alert.id === data.id) {
                        return { ...alert, state: "Acknowledged" }
                      }
                      return alert
                    })
                  )
                  queryClient.invalidateQueries(["alert-count"])
                  toast.success(`Successfully acknowledged alert ${data.id}`)
                })
                .catch((e: any) => {
                  console.log(e)
                  showToast(`Failed to acknowledge alert ${data.id}`, e)
                })
                .finally(() => {
                  setLoading(false)
                })
            },
          },
        ]
      : []),
    ...(data.state === "Cleared"
      ? []
      : [
          {
            title: "Clear Alert",
            icon: <TimesCircle />,
            onClick: (data: AlertHistoryModel) => {
              setLoading(true)
              clearAlertHistory(data.id)
                .then((res) => {
                  setAlerts((alerts) =>
                    alerts?.map((alert) => {
                      if (alert.id === data.id) {
                        return { ...alert, state: "Cleared" }
                      }
                      return alert
                    })
                  )
                  queryClient.invalidateQueries(["alert-count"])
                  toast.success(`Successfully cleared alert ${data.id}`)
                })
                .catch((e: any) => {
                  showToast(`Failed to clear alert ${data.id}`, e)
                })
                .finally(() => {
                  setLoading(false)
                })
            },
          },
        ]),
  ]

  return (
    <div className="wrapper mt-4 px-5">
      <AlertModal data={selectedAlert} />
      <div className="d-flex mb-4 row ml-3 pl-4">
        <h3 className="thruTitle">Alerts</h3>
        <span className="ml-2 mr-2 pt-3 thruSubtitle-breadcrumb-separator" />
        <span className="thruSubtitle subtitle-alter">recent and historical activity</span>
      </div>
      <div className="collapse" id="collapseExample">
        <div className="act-filter-wrapper">
          <div className="row justify-content-center mb-5 flowFilter">
            <div className="filterOutline col pt-3">
              <ThruFormProvider loading={false} customForm={form} onSubmit={onSubmit}>
                <h4 className="text-center mb-3">Alert Filter</h4>
                <div className="border-top" />
                <div>
                  <div className="row mt-3 d-flex justify-content-center">
                    <div className="form-group col-2">
                      <SelectInputLabel label="Alert Type" name={inputs.ALERT_TYPE} valueAsNumber defaultValue={0}>
                        <option key="0" value={0}>
                          All
                        </option>
                        <option key="1" value="1">
                          Transfer Error
                        </option>
                        <option key="2" value="2">
                          Connection Error
                        </option>
                        <option key="3" value="3">
                          Queue Depth Exceeding
                        </option>
                        <option key="4" value="4">
                          Transfer Inactivity
                        </option>
                      </SelectInputLabel>
                    </div>
                    <div className="form-group col-2 ">
                      <TextInputLabel
                        label="Endpoint Code"
                        name={inputs.ENDPOINT_CODE}
                        defaultValue=""
                        maxLength={50}
                        placeholder="Enter endpoint code... "
                      />
                    </div>
                    <div className="form-group col-2">
                      <TextInputLabel
                        label="Flow Code"
                        name={inputs.FLOW_CODE}
                        defaultValue=""
                        maxLength={50}
                        placeholder="Enter flow code... "
                      />
                    </div>
                    <div className="form-group col-2">
                      <TextInputLabel
                        label="Organization Code"
                        name={inputs.ORGANIZATION_CODE}
                        defaultValue=""
                        maxLength={50}
                        placeholder="Enter organization code... "
                      />
                    </div>
                  </div>
                  <div className="row mb-4 d-flex justify-content-center">
                    <div className="form-group col-3">
                      <label htmlFor="fromDate">From</label>
                      <input
                        type="date"
                        id="fromDate"
                        ref={form.register}
                        name="fromDate"
                        className="form-control subFilter"
                      />
                    </div>
                    <div className="form-group col-3">
                      <label htmlFor="fromDate">To</label>
                      <input
                        type="date"
                        id="toDate"
                        ref={form.register}
                        name="toDate"
                        className="form-control subFilter"
                      />
                    </div>
                    <div className="form-group col-2">
                      <SelectInputLabel label="Alert State" name={inputs.ALERT_STATE} defaultValue={"Active"}>
                        <option key="All" value={""}>
                          All
                        </option>
                        <option key="Active" value="Active">
                          Active
                        </option>
                        <option key="Acknowledged" value="Acknowledged">
                          Acknowledged
                        </option>
                        <option key="Cleared" value="Cleared">
                          Cleared
                        </option>
                      </SelectInputLabel>
                    </div>
                  </div>
                </div>

                <div className="border-top" />
                <div className="mt-3">
                  <button id="btnApplyAlertFilter" type="submit" className="btn btn-Save btn-thru-lg mr-3">
                    Apply
                  </button>
                  <button
                    id="btnClearAlertFilter"
                    type="button"
                    onClick={() => resetFilter()}
                    className="btn btn-Cancel btn-thru-lg"
                  >
                    Clear All Filters
                  </button>
                </div>
              </ThruFormProvider>
            </div>
          </div>
        </div>
      </div>{" "}
      {/* end of filter section */}
      {/* Start Alerts Table */}
      <div className="thruCardContainer alertTable">
        <div className="thruCardHead">
          <SearchableTable
            defaultSortColumn={-1}
            getSearchableContent={(data: AlertHistoryModel) => [
              data.flowName,
              data.organizationName,
              data.alertType,
              data.state,
              data.id.toString(),
              data.severityName,
            ]}
            getSearchableContentExact={(data: AlertHistoryModel) => [
              data.organizationCode,
              data.flowCode,
              data.endpointCode,
            ]}
            getRowId={(data: any) => data.id}
            header={header}
            pageSize={100}
            data={alerts}
            customTableClass="alert"
            actions={actions}
            filterButton={
              <div className="d-flex alert-search-tweak">
                <button
                  className="btn btn-filter btn-thru-lg"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                  style={{ width: "100%", whiteSpace: "nowrap", marginLeft: "1rem" }}
                >
                  <i className="fad fa-sliders-h mr-3" />
                  Filter
                </button>
              </div>
            }
          />
        </div>
      </div>
    </div>
  )
}

interface IAlertsList {}

export default AlertsList
