export interface AlertHistoryModel
{
    id: number,
    tenantId: number,
    activeAlertId: number,
    referenceId: number,
    referenceType: string,
    alertType: string,
    alertTypeId: number,
    alertSeverityId: number,
    severityName: string,
    message: string,
    flowCode: string,
    flowName: string,
    flowId: number,
    isFlowDeleted: boolean,
    endpointCode: string,
    endpointName: string,
    endpointId: number,
    isEndpointDeleted: boolean,
    organizationCode: string,
    organizationName: string,
    organizationId: number,
    isOrganizationDeleted: boolean,
    createdDate?: string,
    acknowledgedDate?: string,
    acknowledgedBy?: number,
    clearedDate?: string
    clearedBy?: number,
    state: string
}