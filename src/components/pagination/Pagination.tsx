import React from "react"

interface IPagination {
  pages: number
  currentPage: number
  setCurrentPage: (page: number) => void
  pageRange?: number
}

const Pagination: React.FC<IPagination> = ({ pages, currentPage, setCurrentPage, pageRange = 3 }: IPagination) => {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li
          className="page-item"
          onClick={() => {
            setCurrentPage(0)
          }}
        >
          <a className="page-link" href="#" aria-label="Previous">
            <i className="fas fa-angle-left"></i>
          </a>
        </li>
        {Array.from(Array(pages)).map((_, index) => {
          if (pageRange === -1) {
            return { ..._, index: index }
          }

          if (index === 0 || index === pages - 1) {
            return { ..._, index: index }
          }

          if (Math.abs(index - currentPage) <= pageRange) {
            return { ..._, index: index }
          }
          return undefined
        }).filter((item) => {
          return !!item
        }).map((item) => {
          return (
            <li
              onClick={() => {
                setCurrentPage(item.index)
              }}
              key={item.index}
              className="page-item"
            >
              <a
                style={{
                  color: item.index === currentPage ? "#FFFFFF" : undefined,
                  backgroundColor: item.index === currentPage ? "#007bffbb" : undefined,
                }}
                className="page-link"
                href="#"
              >
                {item.index + 1}
              </a>
            </li>
          )
        })}
        <li
          className="page-item"
          onClick={() => {
            setCurrentPage(pages - 1)
          }}
        >
          <a className="page-link" href="#" aria-label="Next">
            <i className="fas fa-angle-right"></i>
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
