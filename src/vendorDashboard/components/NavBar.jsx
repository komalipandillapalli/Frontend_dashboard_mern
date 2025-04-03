import React from 'react';

const NavBar = ({showLoginForm, showRegisterForm, showLogout, showLogoutHandler}) => {
  const firmName = localStorage.getItem('firmName')
  return (
    <div className="navSection">
        <div className="company">
            Vendor Dashboard
        </div>
        <div>
          FirmName: {firmName}
        </div>
        <div className="userAuth">

          {showLogout? 
                         
                         (<span onClick={showLogoutHandler} >Logout</span>) 
                         :
                         (<>
                              <span onClick={showLoginForm}>Login / </span>
                              <span onClick={showRegisterForm}>Register</span>
                          </>)
                         
                        }
            
            
        </div>
    </div>
  )
}

export default NavBar