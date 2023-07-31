import React, { useEffect, useState } from 'react'

const ProductList = ()=>{
    const [product,setProduct] = useState([]);

    useEffect(()=>{
        getProducts();
    },[])

    const userid = JSON.parse(localStorage.getItem('user'))._id;
    const getProducts = async ()=>{
        let result = await fetch(`http://localhost:5000/products/${userid}`)
        result = await result.json();
        setProduct(result);
    }

    const deleteproduct = async (id)=>{
        let result = await fetch(`http://localhost:5000/product/${id}`,{
            method:"Delete"
        });
        result = await result.json();
        if(result){
            getProducts();
        }
    }
    return (
        <div className="product-list">
            <h3>Product List</h3>
            <ul>
                <li>S.no</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>
            </ul>
            {
                product?.map((item,index)=>
                    <ul key={item._id}>
                        <li>{index+1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li><button onClick={()=>deleteproduct(item._id)}>Delete</button></li>
                    </ul>
                )
            }
        </div>
    )
}

export default ProductList;