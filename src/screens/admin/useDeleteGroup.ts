import { deleteAdminGroup } from "../../utils/AdminClient"
import useDeleteObject from "../../utils/useDeleteObject"


function useGroupDelete() {
    return useDeleteObject(
      ({ id, name }) => deleteAdminGroup(id),
      "group",
      ({ id }) => ["admin-group", id],
      () => ["admin-groups"]
    )
  }
  
  export {useGroupDelete}