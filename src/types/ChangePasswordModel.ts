export interface ChangePasswordModel {
    userId: number,
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
}