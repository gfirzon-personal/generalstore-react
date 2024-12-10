import { useCallback, useMemo, useState } from "react"
import { UseFormMethods } from "react-hook-form"

function useAddRemoveTable<T>(assigned: T[], unassigned: T[], getKey: (data: T) => any) {
  const [toAdd, setToAdd] = useState<T[]>([])
  const [toRemove, setToRemove] = useState<T[]>([])

  const handleUserAdd = useCallback(
    (data: any, form: UseFormMethods<Record<string, any>>, mainCheckbox: string, checkboxPrefix: string) => {
      if (!assigned || !unassigned) {
        return
      }

      const itemsToAdd = Object.entries(data)
        .filter(([key, value]) => value && !key.startsWith(mainCheckbox))
        .map(([key, value]) => {
          const selectedUnGrp = [...assigned, ...unassigned]?.find(
            (u: T) => getKey(u) === +key.replace(checkboxPrefix, "")
          )
          if (selectedUnGrp && value) {
            return selectedUnGrp
          }
        })
        .filter((item) => item !== undefined) as T[]

      setToRemove(toRemove.filter((item) => !itemsToAdd.some((curr) => getKey(curr) === getKey(item))))
      setToAdd((perms) => [
        ...perms,
        ...itemsToAdd.filter((item) => !assigned.some((curr) => getKey(item) === getKey(curr))),
      ])

      Object.entries(form.getValues()).forEach(([key, value]) => {
        if (key.includes("checkbox") && value) {
          form.setValue(key, false)
        }
      })
    },
    [assigned, unassigned, setToAdd, setToRemove, getKey]
  )

  const handleUserRemove = useCallback(
    (data: any, form: UseFormMethods<Record<string, any>>, mainCheckbox: string, checkboxPrefix: string) => {
      if (!assigned || !unassigned) {
        return
      }
      const itemsToRemove = Object.entries(data)
        .filter(([key, value]) => value && !key.startsWith(mainCheckbox))
        .map(([key, value]) => {
          const selectedUnGrp = [...assigned, ...unassigned]?.find((u: T) => {
            return getKey(u) === +key.replace(checkboxPrefix, "")
          })
          if (selectedUnGrp) {
            return selectedUnGrp
          }
        })
        .filter((item) => item !== undefined) as T[]

      setToAdd((toAdd) => toAdd.filter((item) => !itemsToRemove.some((curr) => getKey(item) === getKey(curr))))
      setToRemove((perms) => [
        ...perms,
        ...itemsToRemove.filter((item) => !unassigned.some((curr) => getKey(item) === getKey(curr))),
      ])

      Object.entries(form.getValues()).forEach(([key, value]) => {
        if (key.includes("checkbox") && value) {
          form.setValue(key, false)
        }
      })
    },
    [assigned, unassigned, setToAdd, setToRemove, getKey]
  )

  const clear = useCallback(() => {
    setToAdd([])
    setToRemove([])
  }, [setToAdd, setToRemove])

  const stagingAssigned = useMemo(
    () => [...toAdd, ...(assigned?.filter((item) => !toRemove.some((curr) => getKey(curr) === getKey(item))) ?? [])],
    [assigned, toAdd, toRemove, getKey]
  )

  const stagingUnassigned = useMemo(
    () => [...toRemove, ...(unassigned?.filter((item) => !toAdd.some((curr) => getKey(curr) === getKey(item))) ?? [])],
    [assigned, toAdd, toRemove, getKey]
  )

  return { toAdd, toRemove, clear, handleUserAdd, handleUserRemove, stagingAssigned, stagingUnassigned }
}

export default useAddRemoveTable
