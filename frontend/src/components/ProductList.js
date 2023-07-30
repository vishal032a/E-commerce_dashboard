import React, { useEffect, useState } from 'react'

const ProductList = ()=>{
    const [product,setProduct] = useState([]);

    useEffect(()=>{
        getProducts();
    })

    const userid = JSON.parse(localStorage.getItem('user'))._id;
    const getProducts = async ()=>{
        let result = await fetch(`http://localhost:5000/products/${userid}`)
        result = await result.json();
        setProduct(result);
    }
    return (
        <div className="product-list">
            <h3>Product List</h3>
            <ul>
                <li>S.no</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
            </ul>
            {
                product.map((item,index)=>
                    <ul>
                        <li>{index+1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                    </ul>
                )
            }
        </div>
    )
}

export default ProductList;