export interface AlertFilterRequestModel
{
    alertType?: number,
    state?: string,
    flowCode?: string,
    endpointCode?: string,
    organizationCode?: string,
    fromDate?: string,
    toDate?: string
}