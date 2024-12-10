import React from "react"

import SecondaryNavMenu from "../../../components/nav-menu/SecondaryNavMenu"

interface IProductsNav {
  productId: number
}

const ProductsNav: React.FC<IProductsNav> = ({ productId }: IProductsNav) => {
  return (
    <SecondaryNavMenu
      options={[
        {
          id: "orgProperties",
          url: `/organizations/${productId}`,
          title: "Properties",
          exactMatch: true,
        },
        {
          id: "orgEndpoints",
          url: `/organizations/${productId}/endpoints`,
          title: "Endpoints",
        },
        {
          id: "orgSubscriptions",
          url: `/organizations/${productId}/subscriptions`,
          title: "Subscriptions",
        },
        {
          id: "orgPgpKeys",
          url: `/organizations/${productId}/pgpkeys`,
          title: "PGP Keys",
        },
        {
          id: "orgCertificates",
          url: `/organizations/${productId}/certificates`,
          title: "Certificates",
        },
      ]}
    />
  )
}

export default ProductsNav
