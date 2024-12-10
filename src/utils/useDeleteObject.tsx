import { MutationFunction, useMutation, useQueryClient } from "react-query"
import { toast } from "react-toastify"
import { useLoader } from "../contexts/LoaderContext"
import { showToast } from "./ErrorUtils"

interface Variables {
  id: number
  name: string
  onSuccess?: () => any
}

function useDeleteObject<T>(
  mutationFn: MutationFunction<any, Variables>,
  entityName: string,
  getKey: (data: Variables) => any,
  getListKey: (data: Variables) => any
) {
  const { setLoading } = useLoader()
  const queryClient = useQueryClient()

  const deleteObj = useMutation(mutationFn, {
    onMutate: async () => {
      setLoading(true)
    },
    onError: (err, inputData, context: any) => {
      showToast(`Failed to delete ${entityName}.`, err)
    },
    onSuccess: (data, inputData, context) => {
      toast.success(`Successfully deleted ${entityName} '${inputData.name}'`)
      queryClient.removeQueries(getKey(inputData))
      queryClient.setQueryData<T[]>(getListKey(inputData), (old) => {
        return old?.filter((currentKey: any) => currentKey.id !== inputData.id) ?? []
      })
      if (inputData.onSuccess) {
        inputData.onSuccess()
      }
    },
    onSettled: (data, error, variables, context) => {
      setLoading(false)
    },
  })

  return async (vars: Variables) => await deleteObj.mutateAsync(vars)
}

export default useDeleteObject
