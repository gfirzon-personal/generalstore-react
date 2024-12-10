import React from "react"
import { Link } from "react-router-dom"

interface ISecondaryNavItem {
  id?: string
  title: string
  url: string
  exactMatch?: boolean
}

interface ISecondaryNavMenu {
  options: ISecondaryNavItem[]
}

const SecondaryNavMenu: React.FC<ISecondaryNavMenu> = ({ options }: ISecondaryNavMenu) => {
  options = options.map((option: any) => {
    return {
      ...option,
      active: option.exactMatch
        ? option.url === window.location.pathname
        : window.location.pathname.startsWith(option.url),
    }
  })

  return (
    <div className="collapse navbar-collapse secdMenu ml-5">
      <ul className="navbar-nav">
        {options.map((option: any, index: number) => {
          return (
            <li key={index} className={`nav-item${option.active ? " active" : ""}`}>
              <Link id={option.id} to={option.url} className="nav-link">
                {option.title}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default SecondaryNavMenu
