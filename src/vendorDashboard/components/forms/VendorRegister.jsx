import React, {useState} from 'react'
import { API_URL } from '../../data/apiPath';

const VendorRegister = ({showLoginForm}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const submitRegisterForm = async(e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/vendor/register`, {
                        method:'POST',
                        headers:{
                          'Content-Type':'application/json'
                        },
                        body:JSON.stringify({username, email, password})
      })

      const data = await response.json();

      if(response.ok){
        console.log(data);
        alert("vendor registration success")

        setUsername('');
        setEmail('');
        setPassword('');
        showLoginForm();
      }else{
        setError(data.error)
      }
    } catch (error) {
      console.log("registration failed", error);
      alert("registration failed");
    }

  }

  return (
    <div className="vendorRegisterSection">
        <form className="registerForm" onSubmit={submitRegisterForm} >
            <h2>Vendor Register</h2>
            <label>Username</label>
            <input type="text" placeholder='Enter Vendor name' value={username} onChange={(e) => setUsername(e.target.value)} />
            <label>Email</label>
            <input type="email" placeholder='Enter your Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <label>Password</label>
            <input type="password" placeholder='Enter your Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <div>
                <button type='submit'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default VendorRegister