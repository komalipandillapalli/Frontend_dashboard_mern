import React, {useState} from 'react'
import { API_URL } from '../../data/apiPath';

const AddProduct = () => {
  const [productName, setProductName] =useState('');
  const [price, setPrice] =useState('');
  const [category, setCategory] =useState([]);
  const [bestSeller, setBestSeller] =useState(false);
  const [description, setDescription] =useState('');
  const [image, setImage] =useState(null);

  const onChangeCategory =event=>{
    const value = event.target.value;
    if(category.includes(value)){
      setCategory(category.filter(item=>item!==value))
    }else{
      setCategory([...category, value])
    }
  }

  const onChangeImageUpload =event=>{
    const selectedImage=event.target.files[0]
    setImage(selectedImage)
  }

  const onChangeBestSeller =event =>{
    const value=event.target.value==='true';
    setBestSeller(value);
  }

  const onProductSubmit =async(e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const firmId = localStorage.getItem('firmId');

      if(!token || !firmId){
        console.error("user not authenticated")
      }

      const formData=new FormData();
      formData.append('productName', productName);
      formData.append('price', price);
      formData.append('image', image);
      formData.append('bestSeller',bestSeller)
      formData.append('description', description);
      category.forEach(item=>{
        formData.append('category', item)
      })

      const response = await fetch(`${API_URL}/product/add-product/${firmId}`, {
        method:'POST',
        body:formData
      })

      const data = await response.json();

      if(response.ok){
        console.log(data);
        alert('prodtt addedd');
      }

        setProductName('');
        setPrice('');
        setBestSeller(false);
        setCategory([]);
        setDescription('');
        setImage(null);
      
      
    } catch (error) {
      console.log(data.message);
      alert("Failed to add product")
    }
  }

  return (
    <div className="addProductSection">
        <form className='productSection' onSubmit={onProductSubmit} >
            <h2>Add Product</h2>

            <label>Product Name</label>
            <input type="text" placeholder='Enter Your product name' value={productName} 
                    onChange={(e)=>setProductName(e.target.value)} />

            <label>Price</label>
            <input type="text" placeholder='Enter price' value={price} 
                    onChange={(e)=>setPrice(e.target.value)} />

            <div className='category-container'>
              <p className='lab'>Category</p>
              <div className='input-container'>
                <label>Veg</label>
                <input type='checkbox' value='veg' onChange={onChangeCategory} checked={category.includes('veg')}/>
              </div>
              <div className='input-container'>
                <label>Non-veg</label>
                <input type='checkbox' value='non-veg' onChange={onChangeCategory} checked={category.includes('non-veg')} />
              </div>
            </div>

            <div className='bestseller-container'>
              <p className='lab'>BestSeller</p>
              <div className='input-container'>
                <label>Yes</label>
                <input type='radio'  value='true' checked={bestSeller===true} onChange={onChangeBestSeller} />
              </div>
              <div className='input-container'>
                <label>No</label>
                <input type='radio'  value='false' checked={bestSeller===false} onChange={onChangeBestSeller}  />
              </div>
            </div>

            <label>description</label>
            <input type="text" placeholder='Describe product' value={description} onChange={(e)=>setDescription(e.target.value)}/>

            <label>Product image</label>
            <input type="file" onChange={onChangeImageUpload} />

            <div>
                <button type='submit'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddProduct