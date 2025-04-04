import React, {useState} from 'react'
import { API_URL } from '../../data/apiPath';

const VendorLogin = ({showWelcomeForm}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitLoginForm = async(e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/vendor/login`, {
                      method: 'POST',
                      headers:{
                        'Content-Type':'application/json'
                      },
                      body:JSON.stringify({email, password})                  
                      })

      const data=await response.json();
      
      if(response.ok){
        console.log("Login successful");
        alert("login success");
        setEmail('');
        setPassword('');

        localStorage.setItem('loginToken', data.token)
        showWelcomeForm()
      }

      const vendorId = data.vendorId
      const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`);
      window.location.reload()

      const vendorData = await vendorResponse.json();
      console.log(vendorData)
      if(vendorResponse.ok){
        const vendorFirmId = vendorData.vendorFirmId;
        const vendorFirmName=vendorData.vendorFirmName;
        localStorage.setItem('firmId', vendorFirmId);
      }

    } catch (error) {
      console.error(error);
      alert("login fail");
    }
  }

  return (
    <div className="vendorLoginSection">
        <form className='loginForm' onSubmit={submitLoginForm} >
            <h2>Vendor Login</h2>
            <label>Email</label>
            <input type="email" placeholder='Enter Your Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <label>Password</label>
            <input type="password" placeholder='Enter Your Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <div>
                <button type='submit'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default VendorLogin