import React, { useState } from 'react'

const AddProduct = ()=>{
    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [category,setCategory] = useState('');
    const [company,setCompany] = useState('');
    const [error,setError] = useState(false);
    const addProduct = async()=>{

        if(!name || !price || !category || !company){
            setError(true);
            return false;
        }

        
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:5000/add-product",{
            method:'POST',
            body:JSON.stringify({name,price,category,userId,company}),
            headers:{
                "Content-Type":"application/json"
            }
        });
        console.log(result);
    }
    return(
        <div className='product'>
            <h1>Add product</h1>
            <input type='text' placeholder='Enter product name' className='inputbox' onChange={(e)=>{setName(e.target.value)}}/>
            {error && !name &&<span className='invalid-input'>Enter valid name</span>}
            <input type='text' placeholder='Enter product price' className='inputbox' onChange={(e)=>{setPrice(e.target.value)}}/>
            {error && !price &&<span className='invalid-input'>Enter valid price</span>}
            <input type='text' placeholder='Enter product category' className='inputbox' onChange={(e)=>{setCategory(e.target.value)}} />
            {error && !category &&<span className='invalid-input'>Enter valid category</span>}
            <input type='text' placeholder='Enter product company' className='inputbox' onChange={(e)=>{setCompany(e.target.value)}}/>
            {error && !company &&<span className='invalid-input'>Enter valid company</span>}
            <button onClick={addProduct} className='app_button'>Add Product</button>
        </div>
    )
}
export default AddProduct;