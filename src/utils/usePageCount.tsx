import { useEffect, useState, useCallback } from "react"

function usePageCount<T>(
  sourceData: T[] | undefined,
  search: string,
  pageSize: number,
  sortFn: ((one: T, two: T) => number) | undefined,
  getSearchableContent = (dataItem: T) => [(dataItem as any).name],
  getSearchableContentExact = (dataItem: T) => [] as string[]
) {
  const [currentPage, setCurrentPage] = useState(0)
  const data = sortFn ? sourceData?.sort(sortFn) : sourceData
  const [filteredItems, setFilteredItems] = useState<T[]>(data ?? [])

  useEffect(() => {
    const filterItems = () => {
      return (
        data?.filter((dataItem) => {
          const searchableContent = getSearchableContent(dataItem)
          const searchableContentExact = getSearchableContentExact(dataItem)

          if (searchableContent.length === 0 && searchableContentExact.length === 0) {
            return true
          }

          return (
            searchableContent.some(
              (content: string | undefined) =>
                content?.toLowerCase().startsWith(search.toLowerCase()) ||
                content?.toLowerCase().includes(search.toLowerCase())
            ) ||
            searchableContentExact.some(
              (content: string | undefined) => content?.toLowerCase() === search.toLowerCase()
            )
          )
        }) ?? []
      )
    }

    setFilteredItems(filterItems())
  }, [data, search, sortFn])

  const itemCount = filteredItems?.length ?? 1
  const getPageCount = useCallback(() => Math.ceil(Math.max(1, itemCount / pageSize)), [itemCount, pageSize])
  const [pages, setPages] = useState(getPageCount())
  const slicedItems = filteredItems?.slice(currentPage * pageSize, (currentPage + 1) * pageSize)

  useEffect(() => {
    setPages(getPageCount())
  }, [setPages, getPageCount])

  useEffect(() => {
    if (currentPage >= pages) {
      setCurrentPage(pages - 1)
    }
  }, [currentPage, pageSize, setCurrentPage, pages])

  return {
    pages: pages,
    currentPage: currentPage,
    setCurrentPage: setCurrentPage,
    filteredItems: filteredItems,
    pageItems: slicedItems,
    // setFilteredItems: setSlicedItems
  }
}

export default usePageCount
