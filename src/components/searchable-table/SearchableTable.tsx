import React, { ReactElement, ReactNode, useCallback, useEffect, useMemo, useState } from "react"
import { useForm, useWatch } from "react-hook-form"
import Skeleton from "react-loading-skeleton"
import { Link } from "react-router-dom"
import { ThruFormProvider } from "../../contexts/ThruFormContext"
import usePageCount from "../../utils/usePageCount"
import Fade from "../fade/Fade"
import TextInput from "../form/TextInput"
import ListCancelButton from "../list-cancel-button/ListCancelButton"
import Pagination from "../pagination/Pagination"
import RowActions from "../row-options/RowActions"
import { ActionItem } from "../row-options/RowActions"
import RefreshIcon from "../../components/icons/RefreshIcon"

interface IColumn<T> {
  title: ReactNode | number | null
  to?: (data: T) => string | undefined
  getValue: (data: T) => ReactNode | number | null
  getSortValue?: (data: T) => string
  compare?: (val1: string, val2: string, ascending: boolean) => number
  registerOnForm?: boolean
  watchName?: string
  disableSorting?: boolean
}

type ISearchableTable<T> = {
  header: IColumn<T>[]
  getRowId: (rowData: T) => number
  createButton?: ReactNode | ReactNode[]
  cancelButton?: string
  filterButton?: ReactNode | ReactNode[]
  actions?: ((data: T) => ActionItem<T>[]) | ActionItem<T>[]
  refresh?: () => void
  data?: T[]
  pageSize?: number
  getSearchableContent?: (data: T) => string[]
  getSearchableContentExact?: (data: T) => string[]
  label?: ReactNode
  customClass?: string
  customTableClass?: string
  onFormSubmit?: (data: any) => void
  customForm?: any
  idPrefix?: string
  isFetching?: boolean
  mainCheckbox?: string
  defaultSortDirection?: string
  defaultSortColumn?: number
}

function isFunction(functionToCheck: any) {
  return functionToCheck && {}.toString.call(functionToCheck) === "[object Function]"
}

export const compareDates = (val1: any, val2: any, ascending: boolean) => {
  if (ascending) {
    return new Date(val1)?.getTime() - new Date(val2)?.getTime()
  } else {
    return new Date(val2)?.getTime() - new Date(val1)?.getTime()
  }
}

export const formatDate = (date: string | undefined) => {
  if (!date) {
    return ""
  }

  if (!date.toLowerCase().includes("z")) {
    date += "Z"
  }

  return new Date(date).toLocaleString()
}

function SearchableTable<T>({
  header,
  createButton,
  cancelButton,
  filterButton,
  getRowId,
  data,
  getSearchableContent,
  getSearchableContentExact,
  pageSize = 10,
  actions,
  customForm,
  refresh,
  label,
  onFormSubmit,
  idPrefix,
  customClass,
  customTableClass,
  isFetching = false,
  mainCheckbox,
  defaultSortDirection,
  defaultSortColumn = 0,
}: ISearchableTable<T>) {
  const searchInput = `${idPrefix ? `${idPrefix}-` : ""}search`
  const newForm = useForm()
  const form = customForm ?? newForm
  const search: string = useWatch({
    control: form.control,
    name: searchInput, // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
    defaultValue: "", // default value before the render
  })
  const [sortColumn, setSortColumn] = useState({
    index: defaultSortColumn,
    ascending: defaultSortDirection ? defaultSortDirection === "ASC" : true,
  })
  const sortFn = useCallback(
    (one: any, two: any) => {
      const column = header[sortColumn.index]
      const valOne = column.getSortValue?.(one) ?? (column.getValue(one) as string) ?? ""
      const valTwo = column.getSortValue?.(two) ?? (column.getValue(two) as string) ?? ""

      if (column.compare) {
        return column.compare(valOne, valTwo, sortColumn.ascending)
      }

      if (sortColumn.ascending) {
        if (typeof valOne !== "number" || typeof valTwo !== "number") {
          return (valOne + "").localeCompare(valTwo + "")
        }
        return valOne - valTwo
      } else {
        if (typeof valOne !== "number" || typeof valTwo !== "number") {
          return (valTwo + "").localeCompare(valOne + "")
        }
        return valTwo - valOne
      }
    },
    [header, sortColumn]
  )

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSortColumn((col) => {
        return { ...col }
      })
    }, 50)

    return () => {
      clearInterval(timeout)
    }
  }, [])

  useEffect(() => {
    if (sortColumn.index == -1) {
      return
    }
    if (header[sortColumn.index].disableSorting) {
      setSortColumn((currentColumn) => {
        return { ...currentColumn, index: (currentColumn.index + 1) % header.length }
      })
    }
  }, [sortColumn])

  useEffect(() => {
    document.getElementById(`${idPrefix}-sort-icon-${sortColumn.index}`)?.classList.add("show")

    return () => {
      document.getElementById(`${idPrefix}-sort-icon-${sortColumn.index}`)?.classList.remove("show")
    }
  }, [sortColumn])

  const { pages, pageItems, filteredItems, setCurrentPage, currentPage } = usePageCount(
    data,
    search,
    pageSize,
    sortColumn.index === -1 ? undefined : sortFn,
    getSearchableContent,
    getSearchableContentExact
  )
  const [refreshAnimation, setRefreshAnimation] = useState(false)

  const mainCheck: any = useWatch({
    control: form.control,
    name: mainCheckbox ?? "n/a",
  })

  const getIcon = () => document.getElementById(`${idPrefix}-refresh`)

  useEffect(() => {
    Object.keys(form.getValues())
      .filter((key) => key.startsWith("checkbox"))
      .forEach((key) => {
        const lastIndex = key.lastIndexOf("-")
        const id = +key.slice(lastIndex + 1)
        if (filteredItems.some((item) => getRowId(item) === id)) {
          form.setValue(key, mainCheck)
        }
      })
  }, [mainCheck])

  const onAnimationIteration = useCallback(() => {
    setRefreshAnimation(isFetching)
    const icon = getIcon()

    if (!icon) {
      return
    }

    if (isFetching) {
      icon.style.color = "grey"
      icon.classList.remove("rotate")
      void icon.offsetWidth
      icon.classList.add("rotate")
    } else {
      setTimeout(() => {
        const newIcon = getIcon()
        if (newIcon) {
          newIcon.style.color = "#0072c6"
        }
      }, 50)
    }
  }, [isFetching, setRefreshAnimation])

  useEffect(() => {
    const currIcon = getIcon()
    if (refreshAnimation && currIcon) {
      currIcon.classList.add("rotate")
      setTimeout(() => {
        const newIcon = getIcon()
        if (newIcon) {
          newIcon.style.color = "grey"
        }
      }, 50)
    }
  }, [refreshAnimation])

  useEffect(() => {
    if (isFetching) {
      setRefreshAnimation(true)
    }
  }, [isFetching])

  const refreshButton = useMemo(() => {
    return <RefreshIcon id={`${idPrefix}-refresh`} key={`${idPrefix}-refresh`} />
  }, [])

  return (
    <ThruFormProvider
      customForm={form}
      loading={false}
      onSubmit={(data) => {
        if (onFormSubmit) {
          onFormSubmit(data)
        }
      }}
      renderForm={onFormSubmit ? true : false}
    >
      <div className={`d-flex justify-content-between pt-3 pb-3 ${customClass}`}>
        <div className="row ml-0 pl-0 pr-0 flex-grow-1">
          {label ? (
            <>
              <div className="ml-3" />
              {label}
            </>
          ) : undefined}
          <TextInput
            name={searchInput}
            placeholder="Search"
            aria-label="Search"
            style={{ width: "unset", height: "unset", flexGrow: 1, maxWidth: 300 }}
          />

          {filterButton && filterButton instanceof Array ? (
            filterButton.map((button: any, index: number) => (
              <div key={index} className="align-self-center">
                {button}
              </div>
            ))
          ) : (
            <div className="align-self-center">{filterButton}</div>
          )}
        </div>
        <div className={`row${label ? " mr-3" : ""}`}>
          {refresh && (
            <div className="align-self-center mr-3">
              <button
                onClick={() => refresh()}
                type="button"
                style={{ border: "none", backgroundColor: "transparent", outline: "none" }}
                data-toggle="tooltip"
                data-placement="top"
                title="Refresh"
                onAnimationEnd={() => onAnimationIteration()}
              >
                {refreshButton}
              </button>
            </div>
          )}
          {createButton && createButton instanceof Array ? (
            createButton.map((button: any, index: number) => (
              <div key={index} className="align-self-center">
                {button}
              </div>
            ))
          ) : (
            <div className="align-self-center">{createButton}</div>
          )}
          {cancelButton && <ListCancelButton isDirty={form.formState.isDirty} to={cancelButton} />}
        </div>
      </div>
      <div>
        <table
          id={idPrefix ? `tbl-${idPrefix}` : `tbl`}
          className={`table table-hover mt-5 border-bottom mb-5 ${customTableClass ? customTableClass : ""}`}
        >
          <thead>
            <tr>
              {header.map((header, index: number) => {
                let innerElement = header.title as ReactElement

                if (typeof innerElement === "string" || innerElement instanceof String) {
                  innerElement = <p style={{ display: "inline" }}>{innerElement}</p>
                }

                if (header.registerOnForm) {
                  innerElement = (
                    <innerElement.type
                      {...innerElement.props}
                      ref={form.register()}
                      style={{ ...innerElement.props.style, position: "relative" }}
                    >
                      {innerElement.props.children}
                      <i
                        key={`insert-${1}`}
                        id={`${idPrefix}-sort-icon-${index}`}
                        className={"fad fa-sort ml-1 fade"}
                        style={{
                          color: "#007bff",
                          position: "absolute",
                          transform: "translateX(100%) translateX(5px) translateY(25%)",
                          right: 0,
                        }}
                      />
                    </innerElement.type>
                  )
                } else {
                  innerElement = (
                    <innerElement.type
                      {...innerElement.props}
                      style={{ ...innerElement.props.style, position: "relative" }}
                    >
                      {innerElement.props.children}
                      <i
                        key={`insert-${1}`}
                        id={`${idPrefix}-sort-icon-${index}`}
                        className={"fad fa-sort ml-1 fade"}
                        style={{
                          color: "#007bff",
                          position: "absolute",
                          transform: "translateX(100%) translateX(5px) translateY(25%)",
                          right: 0,
                        }}
                      />
                    </innerElement.type>
                  )
                }

                return (
                  <th
                    key={index}
                    scope="col"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      setSortColumn((col) => {
                        if (col.index === index) {
                          return { index: index, ascending: !col.ascending }
                        }
                        return { index: index, ascending: true }
                      })
                    }
                  >
                    {innerElement}
                  </th>
                )
              })}
              {actions && <th scope="col">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {!pageItems &&
              Array.from({ length: pageSize }).map((item, index) => {
                return (
                  <tr
                    key={index}
                    style={{
                      height: "68px",
                      backgroundColor: "rgba(0, 0, 0, 0)",
                    }}
                  >
                    <td className="align-middle" colSpan={header.length + (actions ? 1 : 0)}>
                      <Skeleton className="align-middle" height="16px" />
                    </td>
                  </tr>
                )
              })}
            {pageItems &&
              pageItems.map((item, index) => {
                return (
                  <Fade key={getRowId(item)}>
                    <tr>
                      {header.map((header, index) => {
                        let innerElement = header.getValue(item) as ReactElement

                        if (header.registerOnForm) {
                          innerElement = <innerElement.type {...innerElement.props} ref={form.register()} />
                        }

                        const headerElement = (
                          <td key={index} className="align-middle">
                            {innerElement}
                          </td>
                        )

                        if (!header.to) {
                          return headerElement
                        }

                        const headerToLocation = header.to(item)

                        if (!headerToLocation) {
                          return headerElement
                        }

                        return (
                          <td key={index} className="align-middle">
                            <Link id={`action${idPrefix ? `${idPrefix}-` : "-"}${index}`} to={headerToLocation}>
                              {innerElement}
                            </Link>
                          </td>
                        )
                      })}
                      {actions && (
                        <td
                          className="nav-item dropdown actionsDropdown align-middle text-center"
                          style={{ textAlign: "center", fontSize: "1.6rem" }}
                        >
                          <RowActions
                            generateActions={
                              isFunction(actions)
                                ? (actions as (data: T) => ActionItem<T>[])
                                : (data: T) => actions as ActionItem<T>[]
                            }
                            data={item}
                            idPrefix={idPrefix}
                          />
                        </td>
                      )}
                    </tr>
                  </Fade>
                )
              })}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-center">
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} pages={pages} />
      </div>
    </ThruFormProvider>
  )
}

export default SearchableTable
