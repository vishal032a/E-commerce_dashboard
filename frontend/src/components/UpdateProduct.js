import React, { useEffect, useState } from "react";
import { useParams,useNavigate} from "react-router-dom";
import { useProducts } from "./productContext";
// import { useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
  const { productList} = useProducts();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    const result = productList?.filter((item) => item._id === id)[0];
    setName(result?.name);
    setPrice(result?.price);
    setCategory(result?.category);
    setCompany(result?.company);
  }, []);

  const updateproduct = async () => {
     let result = await fetch(`http://localhost:5000/product/${id}`,{
      method:'PUT',
      body:JSON.stringify({name,price,category,company}),
      headers:{
        'Content-Type':"application/json"
      }
     });
     result = await result.json();
     
     if(result)
     navigate('/');
  };

  return (
    <div className="product">
      <h1>Update product</h1>
      <input
        type="text"
        placeholder="Enter product name"
        className="inputbox"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Enter product price"
        className="inputbox"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Enter product category"
        className="inputbox"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Enter product company"
        className="inputbox"
        value={company}
        onChange={(e) => {
          setCompany(e.target.value);
        }}
      />
      <button onClick={updateproduct} className="app_button">
        Update Product
      </button>
    </div>
  );
};
export default UpdateProduct;
