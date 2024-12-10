import { useMutation, UseMutationOptions, useQueryClient } from "react-query"
import { toast } from "react-toastify"
import { useLoader } from "../../contexts/LoaderContext"
import { AdminUserModel } from "../../types/AdminUserModel"
import { showWarning } from "../../utils/ErrorUtils"
import { deleteAdminUser } from "../../utils/AdminClient"
import { useHistory } from "react-router"

interface IAdminUserDelete {
  customerId: number
  userId: number
}

export function useAdminUserDelete<TError = unknown, TContext = unknown>(
  options: UseMutationOptions<AdminUserModel, TError, IAdminUserDelete, TContext> = {}
) {
  const queryClient = useQueryClient()
  const { setLoading } = useLoader()
const history = useHistory()

  const mutateCertificate = useMutation((variables: IAdminUserDelete) => deleteAdminUser(variables.userId), {
    onMutate: (variables) => {
      setLoading(true)
      options?.onMutate?.(variables)
    },
    onSuccess: (data, variables, context) => {
      toast.success("Successfully deleted user.")
      queryClient.invalidateQueries(["admin-user-list"])
      options?.onSuccess?.(data, variables, context as any)
      history.push(`/admin/users`)
    },
    onSettled: (data, error, variables, context) => {
      setLoading(false)
      options?.onSettled?.(data, error as any, variables, context as any)
    },
    onError: (error, variables, context) => {
      showWarning("Failed to delete user.")
      options?.onError?.(error as any, variables, context as any)
    },
  })

  const doDelete = (deleteVariables: IAdminUserDelete) => {
    mutateCertificate.mutate(deleteVariables)
  }

  return doDelete
}
