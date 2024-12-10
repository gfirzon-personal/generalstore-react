export interface JwtInfoModel {
    PrivilegeCodes: string
    TenantId: string
    UserId: string
    UserName: string
    CustomerName: string
    aud: string
    ctx: string
    exp: number
    ["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]: string
    iss: string
}