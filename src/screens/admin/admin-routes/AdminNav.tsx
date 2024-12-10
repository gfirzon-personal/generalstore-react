import React from "react"
import SecondaryNavMenu from "../../../components/nav-menu/SecondaryNavMenu"

const AdminNav: React.FC<any> = () => {
  return (
    <SecondaryNavMenu
      options={[
        {
          url: `/admin/general`,
          title: "Settings",
        },
        {
          url: `/admin/alerts`,
          title: "Alerts",
        },
        {
          url: `/admin/retention`,
          title: "Retention",
        },
        {
          url: `/admin/access`,
          title: "Access",
        },
        {
          url: `/admin/connectors`,
          title: "Connectors",
        },
        {
          url: `/admin/email-settings`,
          title: "Email Settings",
        },
        {
          url: `/admin/manage-instances`,
          title: "Manage Instances",
        },
      ]}
    />
  )
}

export default AdminNav
