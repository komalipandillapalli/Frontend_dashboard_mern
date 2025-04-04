import React, {useState, useEffect} from 'react';
import { API_URL } from '../data/apiPath';

const AllProducts = () => {
    const [products, setProducts] = useState([]);

    const productsHandler = async() => {
        const firmId = localStorage.getItem('firmId');
        try {
            const response = await fetch(`${API_URL}/product/${firmId}/products`);
            const data = await response.json();
            setProducts(data.products);
            console.log(data.products)
        } catch (error) {
            console.error("failed to fetch products", error)
            alert("failed to fetch")
        }
    }

    useEffect(() => {
        productsHandler()
    }, [])


    const onDeleteProduct = async(productId) => {
        try {
           const response = await fetch(`${API_URL}/product/${productId}`,{
            method:'DELETE'
           })
        

           const data= await response.json()
           console.log(data);  

           if(response.ok){
            setProducts(products.filter(eachProduct => eachProduct._id !== productId));
            confirm("are you sure, you want to delete");
            alert("Product deleted successfully");
           }
        } catch (error) {
            console.error("Failed to delete Product")
            alert("Failed to delete")
        }
    }

  return (
    <div>
        {!products? 
                (<h1>No Products Added</h1> )
                : 
                (
                    <table className='products-table'>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>image</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(eachProduct => (
                                <>
                                <tr key={eachProduct._id}>
                                    <td>{eachProduct.productName}</td>
                                    <td>{eachProduct.price}</td>
                                    <td>
                                        {eachProduct.image && (
                                            <img src={`${API_URL}/uploads/${eachProduct.image}`} 
                                                 alt={eachProduct.productName} className='eachImage' />
                                        )}
                                    </td>
                                    <td>
                                        <button onClick={()=>onDeleteProduct(eachProduct._id)} >Delete</button>
                                    </td>
                                </tr>
                                </>
                            ))}
                        </tbody>
                    </table>
                )
        }
    </div>
  )
}

export default AllProducts