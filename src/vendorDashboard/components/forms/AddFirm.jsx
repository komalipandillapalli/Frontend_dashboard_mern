import React, {useState} from 'react';
import { API_URL } from '../../data/apiPath';

const AddFirm = () => {
  const [firmName, setFirmName] = useState('');
  const [area, setArea] =useState('');
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState('');
  const [file, setFile] = useState(null);

  const onChangeCategory =event => {
    const value = event.target.value;
    if (category.includes(value)) {
      setCategory(category.filter(item=>item!==value))
    }else{
      setCategory([...category,value])
    }
  }

  const onChangeRegion = event => {
    const value = event.target.value;
    if (region.includes(value)){
      setRegion(region.filter(item => item !== value))
    }else{
      setRegion([...region, value])
    }
  }

  const onChangeImageUpload = event => {
    const selectedImage = event.target.files[0];
    setFile(selectedImage);
  }

const onSubmitFirmHandler = async(event) => {
  event.preventDefault();
  try {
    const token = localStorage.getItem('loginToken');
    if (!token){
      console.log("User not authenticated")
    }

    const formData = new FormData();
    formData.append('firmName', firmName);
    formData.append('area', area);
    formData.append('offer', offer);
    formData.append('image', file);
    category.forEach(item =>{
      formData.append('category', item)
    })

    region.forEach(item => {
      formData.append('region', item)
    })

    const response = await fetch(`${API_URL}/firm/add-firm`, {
      method:'POST',
      headers:{
        'token' : `${token}`
      },
      body:formData
      });
    const data = await response.json(); 

    if(response.ok){
      console.log(data);
      
      setFirmName('');
      setArea('');
      setOffer('');
      setCategory([]);
      setRegion([]);
      setFile(null);
      alert("Firm added successfully");

    }else if(data.message==="vendor can have only one firm"){
      alert("Firm Exists: only one firm can be added to vendor")
    }else{
      alert("Failed to add Firm")
    }


    const firmId = data.firmId;
    const vendorRestuarant = data.vendorFirmName

    localStorage.setItem('firmId', firmId);
    localStorage.setItem('firmName', vendorRestuarant)
    window.location.reload()
  } catch (error) {
    console.error("Failed to Add Firm");

  } 
}

  return (
    
    <div className="addFirmSection">
        <form className='firmSection' onSubmit={onSubmitFirmHandler}>
            <h2>Add Firm</h2>

            <label>Firm Name</label>
            <input type="text" placeholder='Enter Your Firm name' value={firmName} 
                   onChange={(e) => setFirmName(e.target.value)} />

            <label>Area</label>
            <input type="text" placeholder='Enter Your area' value={area} 
                    onChange={(e) => setArea(e.target.value)} />

            <div className='category-container'>
              <p className='lab'>Category</p>
              <div className='input-container'>
                <label>Veg</label>
                <input type='checkbox' value='veg' onChange={onChangeCategory} checked={category.includes('veg')} />
              </div>
              <div className='input-container'>
                <label>Non-veg</label>
                <input type='checkbox' value='non-veg' onChange={onChangeCategory} checked={category.includes('non-veg')}/>
              </div>
            </div>

            <div className='region-container'>
              <p className='lab'>Region</p>
              <div className='input-container'>
                <label>South-Indian</label>
                <input type='checkbox' value='south-Indian' checked={region.includes('south-Indian')} 
                        onChange={onChangeRegion} />
              </div>
              <div className='input-container'>
                <label>North-Indian</label>
                <input type='checkbox' value='north-Indian' checked={region.includes('north-Indian')} 
                        onChange={onChangeRegion} />
              </div>
              <div className='input-container'>
                <label>Chinese</label>
                <input type='checkbox' value='chinese' checked={region.includes('chinese')} 
                        onChange={onChangeRegion} />
              </div>
              <div className='input-container'>
                <label>Bakery</label>
                <input type='checkbox' value='bakery' checked={region.includes('bakery')} 
                        onChange={onChangeRegion} />
              </div>
            </div>

            <label>Offer</label>
            <input type="text" placeholder='' value={offer} 
                    onChange={(e) => setOffer(e.target.value)} />

            <label>Firm image</label>
            <input type="file" onChange={onChangeImageUpload} />
            <div>
                <button type='submit'>Submit</button>
            </div> 
        </form> 
    </div>

  )
}

export default AddFirm