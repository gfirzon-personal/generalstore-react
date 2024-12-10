import { CURRENT_USER } from "../../utils/constants"
import { Link, useHistory } from "react-router-dom"
import React, { useEffect, useState } from "react"
//import { useAuth } from "../../contexts/AuthContext"
//import { useSecondaryNav } from "../../contexs/SecondaryNavContext"
import { PRIVILEGE_CODE, useJwtInfo } from "../../utils/useJwtInfo"
//import { getActiveAlertCount } from "../../utils/AlertInfoClient"
//import { useQuery, useQueryClient } from "react-query"
import BellIcon from "../icons/BellIcon"
//const helpMenuItems = (window as any)["runConfig"].helpMenu
const helpMenuItems = [
  {
    title: "Help Center",
    link: "https://www.thruinc.com/support/"
  },
  {
    title: "User Guide",
    link: "http://guide.thruinc.com/thru-mft-user-guide-home"
  }
]

interface INavMenu {
  secondaryMenu: boolean
}

const NavMenu: React.FC<INavMenu> = ({ secondaryMenu }: INavMenu) => {
  //const { logout } = useAuth()
  //const { navComponent } = useSecondaryNav()

  const t = window.localStorage.getItem(CURRENT_USER)
  const jwtInfo = useJwtInfo()
  //const { data: alertData } = useQuery(["alert-count"], () => getActiveAlertCount())

  //const alertCount = alertData ? +alertData : 0
  // const activeAlertCount = alertCount ? (+alertCount >= 100 ? "99+" : alertCount) : ""
  const alertCount = 0
  const activeAlertCount = ""

  //const helpMenuItems = (window as any)["runConfig"].helpMenu
 
  const history = useHistory()
  //const queryClient = useQueryClient()

  const [timeLeftToRetechAlertCount, setAlertRefreshTimeLeft] = useState(60)

  useEffect(() => {
    const timer = setInterval(() => {
      setAlertRefreshTimeLeft((time) => time - 1)
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [setAlertRefreshTimeLeft])

  useEffect(() => {
    if (timeLeftToRetechAlertCount === 0) {
      //queryClient.invalidateQueries(["alert-count"])
      setAlertRefreshTimeLeft((time) => 60)
    }
  }, [timeLeftToRetechAlertCount])

  return (
    <div className="thru-header">
      <nav className="navbar navbar-expand navbar-dark static-top">
        <Link className="navbar-brand mr-1" to="/">
          <img className="img-fluid" src="/images/local-grocery-store.svg" alt="Thru logo" width="50px" />
        </Link>
        <div id="thruHeaderBar" className="border-left thru-header-bar thru-header__brand-title show">
          <Link to="/products">
            <button
              id="_hdrmOverview"
              className={
                "btn btn-ghost mr-2 thru-hdr-bar" +
                (window.location.pathname.startsWith("/products") || window.location.pathname === "/"
                  ? " thru-hdr-active"
                  : "")
              }
              type="button"
            >
              Products
            </button>
          </Link>
          <Link to="/vendors">
            <button
              id="_hdrmActivity"
              className={
                "btn btn-ghost mr-2 thru-hdr-bar" +
                (window.location.pathname.startsWith("/vendors") ? " thru-hdr-active" : "")
              }
              type="button"
            >
              Vendors
            </button>
          </Link>
          <Link to="/employees">
            <button
              id="_hdrmOrganizations"
              className={
                "btn btn-ghost mr-2 thru-hdr-bar" +
                (window.location.pathname.startsWith("/employees") ? " thru-hdr-active" : "")
              }
              type="button"
            >
              Employees
            </button>
          </Link>
          <Link to="/contact">
            <button
              id="_hdrmFlows"
              className={
                "btn btn-ghost mr-2 thru-hdr-bar" +
                (window.location.pathname.startsWith("/contact") ? " thru-hdr-active" : "")
              }
              type="button"
            >
              Contact Us
            </button>
          </Link>
        </div>
        <label className="mr-5 custNameHeader">{jwtInfo?.data.CustomerName}</label>
        <div id="thruTopBar" className="thru-header-topbar thru-header__brand-title ml-auto">
          <div className="thru-header-topbar__item"></div>
          <div id="_ctrlmenu" className="thru-header-topbar__item">
            <ul className="navbar-nav ml-auto ml-md-0">
              <label className="mr-1">{jwtInfo?.data.UserName}</label>
              <li id="_ctrlAccount" className="nav-item dropleft">
                <a
                  className="nav-link dropdown-toggle p-0"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-user icon-size" data-toggle="tooltip" data-placement="top" title="User" />
                  {/*<span> Account</span>*/}
                </a>
                <div className="dropdown-menu" aria-labelledby="userDropdown">
                  <div id="_ctrlAccount_UserProfile" className="dropdown-header">
                    User Profile
                  </div>
                  <Link to="/account/profile">
                    <div id="_ctrlAccount_ProfileSettings" className="dropdown-item">
                      Profile Settings
                    </div>
                  </Link>
                  <Link to="/account/changePassword">
                    <div id="_ctrlAccount_ChangePassword" className="dropdown-item">
                      Change Password
                    </div>
                  </Link>
                  <div id="_ctrlAccount_Div2" className="dropdown-divider">
                    Div2
                  </div>
                  <div
                    id="_ctrlAccount_SignOut"
                    className="dropdown-item signOut"
                    onClick={async () => {
                      //await logout()
                      history.push("/")
                    }}
                  >
                    Logout
                  </div>
                </div>
              </li>
              <li _ngcontent-ng-cli-universal-c48="" id="_ctrlHelp" className="nav-item dropleft thru-ctrl-active">
                <a
                  _ngcontent-ng-cli-universal-c48=""
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  className="nav-link dropdown-toggle p-0"
                >
                  <i
                    _ngcontent-ng-cli-universal-c48=""
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Help"
                    className="fas fa-question-circle icon-size thru-menu-active"
                  ></i>
                </a>
                <div _ngcontent-ng-cli-universal-c48="" aria-labelledby="userDropdown" className="dropdown-menu">
                  <div _ngcontent-ng-cli-universal-c48="" id="_ctrlHelp_GetHelp" className="dropdown-header">
                    Get Help
                  </div>
                  {/*helpMenuItems?.map((item: any, index: number) => {
                    return (
                      <a href={item.link} target="_blank" rel="noreferrer" key={index}>
                        <div _ngcontent-ng-cli-universal-c48="" id="_ctrlHelp_HelpCenter" className="dropdown-item">
                          {item.title}
                        </div>
                      </a>
                    )
                  })*/}
                </div>
              </li>
              <li id="_ctrlNotifications" className="nav-item dropleft p-0 faStack-adj">
                <a
                  className="nav-link dropdown-toggle p-0 px-2"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {alertCount > 0 && (
                    <span className="fa-stacks" data-count={activeAlertCount}>
                      <BellIcon></BellIcon>
                    </span>
                  )}
                  {alertCount <= 0 && <BellIcon />}
                </a>

                <div className="dropdown-menu" aria-labelledby="userDropdown">
                  <div id="_ctrlNotifications_ManageNotifications" className="dropdown-header">
                    Manage Notifications
                  </div>
                  <Link to="/alerts">
                    <div id="_ctrlNotifications_NotificationsBanner" className="dropdown-item">
                      Alert Activity
                    </div>
                  </Link>
                </div>
              </li>
              {jwtInfo?.hasPrivilege(PRIVILEGE_CODE.ADMIN_MENU) && (
                <li id="_ctrlAdmin" className="nav-item dropleft">
                  <a
                    className="nav-link dropdown-toggle p-0"
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fas fa-cog icon-size" data-toggle="tooltip" data-placement="top" title="Admin" />
                    {/*<span>Admin</span>*/}
                  </a>
                  <div className="dropdown-menu" aria-labelledby="userDropdown">
                    <div id="_ctrlAdmin_Administration" className="dropdown-header">
                      Administration
                    </div>
                    {jwtInfo?.hasPrivilege(PRIVILEGE_CODE.USERS) && (
                      <Link to="/admin/users">
                        <div id="_ctrlAdmin_Users" className="dropdown-item">
                          Users
                        </div>
                      </Link>
                    )}
                    {jwtInfo?.hasPrivilege(PRIVILEGE_CODE.USER_GROUPS) && (
                      <Link to="/admin/groups">
                        <div id="_ctrlAdmin_UserGroups" className="dropdown-item">
                          Groups
                        </div>
                      </Link>
                    )}
                    {jwtInfo?.hasPrivilege(PRIVILEGE_CODE.PERMISSIONS) && (
                      <Link to="/admin/permissions">
                        <div id="_ctrlAdmin_Permissions" className="dropdown-item">
                          Permissions
                        </div>
                      </Link>
                    )}
                  </div>
                </li>
              )}
              {jwtInfo?.hasPrivilege(PRIVILEGE_CODE.THRU_OPS_ADMIN_MENU) && (
                <li _ngcontent-ng-cli-universal-c48="" id="_ctrlOps" className="nav-item dropleft">
                  <a
                    _ngcontent-ng-cli-universal-c48=""
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    className="nav-link dropdown-toggle p-0"
                  >
                    <svg
                      _ngcontent-ng-cli-universal-c48=""
                      data-toggle="tooltip"
                      data-placement="top"
                      name="Thru OPS"
                      className="svg-inline--fa fa-user-cog fa-w-20 fa-swap-opacity icon-size"
                      aria-labelledby="svg-inline--fa-title-S8HwbZHYrgOp"
                      data-prefix="fad"
                      data-icon="user-cog"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                      data-fa-i2svg=""
                    >
                      <title id="svg-inline--fa-title-S8HwbZHYrgOp">Thru OPS</title>
                      <g className="fa-group">
                        <path
                          className="fa-secondary"
                          fill="currentColor"
                          d="M636.3 388.2l-25.8-14.9a117.31 117.31 0 0 0 0-42.6l25.8-14.9a7.24 7.24 0 0 0 3.3-8.5 150.07 150.07 0 0 0-33.2-57.4 7.29 7.29 0 0 0-9-1.4l-25.8 14.9a117.4 117.4 0 0 0-36.9-21.3v-29.8a7.28 7.28 0 0 0-5.7-7.1 150.88 150.88 0 0 0-66.2 0 7.28 7.28 0 0 0-5.7 7.1v29.8a117.4 117.4 0 0 0-36.9 21.3l-25.8-14.9a7.31 7.31 0 0 0-9 1.4 150.07 150.07 0 0 0-33.2 57.4 7.37 7.37 0 0 0 3.3 8.5l25.8 14.9a117.31 117.31 0 0 0 0 42.6l-25.8 14.9a7.24 7.24 0 0 0-3.3 8.5 150.82 150.82 0 0 0 33.2 57.4 7.29 7.29 0 0 0 9 1.4l25.8-14.9a117.4 117.4 0 0 0 36.9 21.3v29.8a7.28 7.28 0 0 0 5.7 7.1 150.88 150.88 0 0 0 66.2 0 7.28 7.28 0 0 0 5.7-7.1v-29.8a117.4 117.4 0 0 0 36.9-21.3l25.8 14.9a7.31 7.31 0 0 0 9-1.4 150.07 150.07 0 0 0 33.2-57.4 7.37 7.37 0 0 0-3.3-8.5zM496 400.5a48.5 48.5 0 1 1 48.5-48.5 48.55 48.55 0 0 1-48.5 48.5z"
                        ></path>
                        <path
                          className="fa-primary"
                          fill="currentColor"
                          d="M425.2 491.7v-9.2c-2.3-1.2-4.6-2.6-6.8-3.9l-7.9 4.6a39.23 39.23 0 0 1-48.5-7.3 182.34 182.34 0 0 1-40.2-69.6 39.11 39.11 0 0 1 17.9-45.7l7.9-4.6q-.15-3.9 0-7.8l-7.9-4.6a39.07 39.07 0 0 1-17.9-45.7c.9-2.9 2.2-5.8 3.2-8.7-3.8-.3-7.5-1.2-11.4-1.2h-16.7a174.08 174.08 0 0 1-145.8 0h-16.7A134.43 134.43 0 0 0 0 422.4V464a48 48 0 0 0 48 48h352a47.94 47.94 0 0 0 27.2-8.5 39 39 0 0 1-2-11.8zM224 256A128 128 0 1 0 96 128a128 128 0 0 0 128 128z"
                        ></path>
                      </g>
                    </svg>
                    {/* <i _ngcontent-ng-cli-universal-c48="" data-toggle="tooltip" data-placement="top" title="Thru OPS" className="fas fa-user-cog fa-swap-opacity icon-size"></i> */}
                  </a>
                  <div className="dropdown-menu" aria-labelledby="userDropdown">
                    <div id="_ctrlOps_OperationsMgmt" className="dropdown-header">
                      ThruOps Management
                    </div>
                    {jwtInfo?.hasPrivilege(PRIVILEGE_CODE.THRU_OPS_APPLICATION_SETTINGS) && (
                      <Link to="/thru-admin/app-settings">
                        <div id="_ctrlOps_Settings" className="dropdown-item">
                          Application Settings
                        </div>
                      </Link>
                    )}
                    {/* <Link to="/thru-admin/clients">
                    <div id="_ctrlOps_ManageClients" className="dropdown-item">
                      Manage Clients
                    </div>
                  </Link> */}
                    {jwtInfo?.hasPrivilege(PRIVILEGE_CODE.THRU_OPS_MANAGE_CUSTOMERS) && (
                      <Link to="/thru-admin/customers">
                        <div id="_ctrlOps_ManageCustomers" className="dropdown-item">
                          Manage Customers
                        </div>
                      </Link>
                    )}
                    {jwtInfo?.hasPrivilege(PRIVILEGE_CODE.THRU_OPS_EMAIL_TEMPLATES) && (
                      <Link to="/thru-admin/email-templates">
                        <div id="_ctrlOps_InvitationEmails" className="dropdown-item">
                          Email Templates
                        </div>
                      </Link>
                    )}

                    {/* <div id="_ctrlOps_Div4" className="dropdown-divider">
                    Div4
                  </div>
                  <div id="_ctrlOps_ThruOperationsUserMgmt" className="dropdown-header">
                    ThruOps User Administration
                  </div>
                  <Link to="/thru-admin/user-invites">
                    <div id="_ctrlOps_ManageInvitations" className="dropdown-item">
                      User Invitations
                    </div>
                  </Link>
                  <Link to="/thru-admin/registration-approvals">
                    <div id="_ctrlOps_RegistrationApprovals" className="dropdown-item">
                      Registration Approvals
                    </div>
                  </Link> */}
                    <div id="_ctrlOps_Div5" className="dropdown-divider">
                      Div5
                    </div>
                    <div id="_ctrlOps_ASM" className="dropdown-header">
                      Application Security Management
                    </div>
                    {jwtInfo?.hasPrivilege(PRIVILEGE_CODE.THRU_OPS_USERS) && (
                      <Link to="/thru-admin/users">
                        <div id="_ctrlOps_UserManagement" className="dropdown-item">
                          Users
                        </div>
                      </Link>
                    )}
                    {/* {jwtInfo?.hasPrivilege(PRIVILEGE_CODE.THRU_OPS_GROUPS) && (
                      <div id="_ctrlOps_AccountGroups" className="dropdown-item">
                        Groups
                      </div>
                    )}
                    {jwtInfo?.hasPrivilege(PRIVILEGE_CODE.PERMISSIONS) && (
                      <div id="_ctrlOps_AccountPermissions" className="dropdown-item">
                        Permissions
                      </div>
                    )} */}
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>{" "}
        {/* end of Right Side Menu */}
      </nav>
      {secondaryMenu && (
        <div className="thru-header-bottom">
          <div id="mmMainMenu" className="thru-container">
            <nav className="navbar navbar-expand navbar-light bg-light static-top">{"navComponentXXX"}</nav>
          </div>
        </div>
      )}
    </div>
  )
}

export default NavMenu
