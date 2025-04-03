import React, {useState, useEffect} from 'react';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import VendorLogin from '../components/forms/VendorLogin';
import VendorRegister from '../components/forms/VendorRegister';
import AddFirm from '../components/forms/AddFirm';
import AddProduct from '../components/forms/AddProduct';
import Welcome from '../components/Welcome';
import AllProducts from '../components/AllProducts';

const LandingPages = () => {
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [showFirm, setShowFirm] = useState(false)
  const [showProduct, setShowProduct] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [allProducts,setShowAllProducts] = useState(false)
  const [showLogout, setShowLogout] = useState(false);
  const [showFirmTitle, setShowFirmTitle] =useState(true)

  useEffect(()=>{
    const token = localStorage.getItem('loginToken');
    if(token){
      setShowLogout(true)
    }
  }, [])

  useEffect(()=>{
    const firmName = localStorage.getItem('firmName');
    if(firmName){
      setShowFirmTitle(false)
    }
  },[])
  const showLogoutHandler =()=>{
    confirm("Are you sure you want to logout")
    localStorage.removeItem('loginToken');
    localStorage.removeItem('firmId');
    localStorage.removeItem('firmName');
    setShowLogout(false)
    setShowFirmTitle(true)
  }

  const showLoginForm = () => {
    setShowLogin(true)
    setShowRegister(false)
    setShowFirm(false)
    setShowProduct(false)
    setShowWelcome(false);
    setShowAllProducts(false);
  }

  const showRegisterForm = () => {
    setShowRegister(true)
    setShowLogin(false)
    setShowFirm(false)
    setShowProduct(false)
    setShowWelcome(false);
    setShowAllProducts(false);
  }

  const showAddFirm = () => {
    if(showLogout){
      setShowFirm(true)
      setShowRegister(false)
      setShowLogin(false)
      setShowProduct(false)
      setShowWelcome(false);
      setShowAllProducts(false);
    }else{
      alert("Please Login");
      setShowLogin(true);
    }
    
  }

  const showProductForm = () => {
    if(showLogout){
      setShowProduct(true)
      setShowFirm(false)
      setShowRegister(false)
      setShowLogin(false)
      setShowWelcome(false);
      setShowAllProducts(false);
    }else{
      alert("Please Login");
      setShowLogin(true);
    }
    
  }

  const showWelcomeForm = () => {
    setShowWelcome(true);
    setShowLogin(false);
    setShowRegister(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowAllProducts(false);
  }

  const showAllProducts = () => {
    if(showLogout){
      setShowAllProducts(true)
      setShowWelcome(false);
      setShowLogin(false);
      setShowRegister(false);
      setShowFirm(false);
      setShowProduct(false);
    }else{
      alert("Please Login");
      setShowLogin(true);
    }
    
  }

  return (
    <>
        <section className='landingSection' >
            <NavBar showLoginForm={showLoginForm} showRegisterForm={showRegisterForm} 
                    showLogout={showLogout} showLogoutHandler={showLogoutHandler} />
            <div className="collectionSection">
              <SideBar showAddFirm={showAddFirm} showProductForm={showProductForm} 
                        showAllProducts={showAllProducts} showFirmTitle={showFirmTitle} />
              {showLogin && <VendorLogin showWelcomeForm={showWelcomeForm} />}
              {showRegister && <VendorRegister showLoginForm={showLoginForm} />}
              {showFirm && showLogout && <AddFirm/>}
              {showProduct && showLogout && <AddProduct/>}              
              {allProducts && showLogout &&  <AllProducts />}
              {showWelcome && <Welcome /> }
            </div>           
        </section>
    </>
  )
}

export default LandingPages