export interface AdminSessionModel {
  id: number
  userId: number
  ipAddress: string
  userAgent: string
  lastAction: string
  created: string
  isLoggedOut: boolean
  isTimedOut: boolean
  terminated: boolean
}
