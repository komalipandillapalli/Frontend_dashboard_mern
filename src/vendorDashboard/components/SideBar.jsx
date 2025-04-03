import React from 'react'

const SideBar = ({showAddFirm, showProductForm, showAllProducts, showFirmTitle}) => {
  return (
    <div className="sidebarSection">
        <ul>
            {showFirmTitle? <li onClick={showAddFirm}>Add Firm</li> : ""}                       
            <li onClick={showProductForm}>Add Product</li>
            <li onClick={showAllProducts}>All Products</li>
            <li>User Details</li>
        </ul>
    </div>
  )
}

export default SideBar