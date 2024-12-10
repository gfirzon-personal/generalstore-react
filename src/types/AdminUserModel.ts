export interface AdminUserModel {
    id: number,
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    isEnabled: boolean,
    isActive: boolean,
    isLogSession: boolean,
    isAdmin?: boolean,
    created: string,
    customerId?: number,
    customerName?: string
}