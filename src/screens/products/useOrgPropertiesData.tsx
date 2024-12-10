import { useMutation, useQuery, useQueryClient } from "react-query"
import { useHistory } from "react-router"
import { toast } from "react-toastify"
import { useLoader } from "../../contexts/LoaderContext"
import { ProductModel } from "../../types/ProductModel"
import { showToast } from "../../utils/ErrorUtils"
import { getProduct, createProduct, updateProduct, deleteProduct } from '../../utils/ProductsClient'
//import useOrgDelete from "../useOrgDelete"

const inputs = {
  NAME: "name",
  DESCRIPTION: "description",
  PRICE: "price",
  ENABLED: "enabled"
}

function useProductPropertiesData(productId: number) {
  const { setLoading } = useLoader()
  const history = useHistory()

  const queryClient = useQueryClient()
  const { data: properties, error } = useQuery(
    ["organization", productId],
    () => getProduct(productId),
    {
      enabled: productId > 0,
    }
  )
  const saveProductProperties = useMutation(
    (body: ProductModel) => {
      return (productId === -1 ? createProduct : updateProduct)(body)
    },
    {
      onMutate: async (newOrg) => {
        setLoading(true)
      },
      onError: (err, newOrg, context: any) => {
        showToast(`Failed to ${productId === -1 ? "create" : "update"} product.`, err)
      },
      onSuccess: (data, variables, context) => {
        const newOrgId = data.id

        toast.success(productId > 0 ? "Product updated." : "Product created.")
        queryClient.setQueryData(["product", newOrgId], (old: any) => data)
        queryClient.setQueryData<ProductModel[]>(["list-product"], (old) => {
          if (!old) {
            return [data]
          }

          if (!old.find((currentOrg) => currentOrg.id === data.id)) {
            return [...old, data]
          }

          return old.map((currentOrg) => {
            if (currentOrg.id === data.id) {
              return data
            }
            return currentOrg
          })
        })

        history.push(`/organizations`)
      },
      onSettled: (data, error, variables, context) => {
        setLoading(false)
      },
    }
  )

  //const deleteOrg = useOrgDelete()

  const submitData = async (data: any) => {
    const org: ProductModel = {
      id: productId === -1 ? 0 : productId,
      productName: data.productName,
      //enabled: data[inputs.ENABLED] == '1' ? true : false,
      description: data.description,
      price: data.price
    }

    saveProductProperties.mutate(org)
  }

  return {
    properties: properties,
    submitData: submitData,
    loading: !properties && productId > 0,
    deleteProduct: deleteProduct,
    inputs: inputs,
    error: error,
  }
}

export { useProductPropertiesData }
