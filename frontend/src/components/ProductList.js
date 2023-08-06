import React, { useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import { useProducts } from './productContext';

const ProductList = ()=>{
    const {productList, setProductList} = useProducts();
    // const [refresh, setRefresh] = useState(false);


    const[word,setword] = useState('');

    const userid = JSON.parse(localStorage.getItem('user'))._id;
    const getProducts = async ()=>{
        let result = await fetch(`http://localhost:5000/products/${userid}`)
        result = await result.json();
        setProductList(result);
    }
    
    const deleteproduct = async (id)=>{
        let result = await fetch(`http://localhost:5000/product/${id}`,{
            method:"Delete"
        });
        result = await result.json();
        if(result){
            getProducts();
        }
        // setRefresh(prev => !prev);
    }
 
        const filtered = ProductList.length?(productList?.filter((item) => item.name.toLowerCase().includes(word.toLowerCase()))):([]);

    useEffect(()=>{
        getProducts();
    },[word]);
    return (
        <div className="product-list">
            <h3>Product List</h3>
            <input type='text' placeholder='Search by name...' className='search_box' onChange={(e)=>{setword(e.target.value)}}/>
            <ul>
                <li>S.no</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>
            </ul>
            {
                word!==undefined?(
                    filtered?.map((item,index)=>
                        <ul key={item._id}>
                            <li>{index+1}</li>
                            <li>{item.name}</li>
                            <li>{item.price}</li>
                            <li>{item.category}</li>
                            <li>
                                <button onClick={()=>deleteproduct(item._id)}>Delete</button>
                                <Link to={`/update/${item._id}`}>Update</Link>
                            </li>
                        </ul>
                    )
                ):(
                    productList.length ? (productList?.map((item,index)=>
                    <ul key={item._id}>
                        <li>{index+1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>
                            <button onClick={()=>deleteproduct(item._id)}>Delete</button>
                            <Link to={`/update/${item._id}`}>Update</Link>
                        </li>
                    </ul>
                    )):<h1>No product is there</h1>
                )
            }
        </div>
    )
}

export default ProductList;