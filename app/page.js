//TD: Add functions for increasing and decreasing cart quantities 

"use client";
import Image from "next/image";
import styles from "./page.module.css";
import "./style.css";
import  {useEffect, useState} from 'react';

const foodData = [ //Quantity=1 so this holds when adding to cart initially
    {id: "appetizer1", name: "Fries", price: 5, quantity: 1},
    {id: "appetizer2", name: "Mac & Cheese", price: 3, quantity: 1},
    {id: "appetizer3", name: "Cucumber Roll", price: 4, quantity: 1},
    {id: "burger1", name: "Single Cheeseburger", price: 10, quantity: 1},
    {id: "burger2", name: "Double Cheeseburger", price: 12, quantity: 1},
    {id: "burger3", name: "Triple Cheeseburger", price: 1, quantity: 1},
    {id: "salad1", name: "Caesar Salad", price: 6, quantity: 1},
    {id: "salad2", name: "Cucumber Salad", price: 5, quantity: 1},
    {id: "salad3", name: "Chicken Salad", price: 7, quantity: 1}
];

const Divider = () => <div><br></br><hr></hr><br></br></div>

const Menu = ({addToCartFunc}) => {
  return (
    <div className="container">
      {
        foodData.map(item => 
          <MenuItem
            name={item.name} 
            key={item.id} 
            itemSrc={`food/${item.id}.jpg`} 
            clickFunc={() => addToCartFunc(item.id,1)}>
          </MenuItem>)
      }
    </div>
  )
}

const MenuItem = ({name, itemSrc, clickFunc}) => {
  return (
    <div>
      <h2>{name}</h2>
      <img src={itemSrc}></img>
      <button onClick={clickFunc}>Add To Cart</button>
    </div>
  )
}

const CartTable = ({JScart, removeItemFunc, updateItemFunc}) => {
  return (
    JScart.length > 0 
    ? <div>
        <Divider/>
        <table id="cartTable">
          <tbody>
          <tr><td>Item</td><td>Price</td><td>Quantity</td></tr>
          {JScart.map(JSCartItem => 
            <CartRow key={JSCartItem.id} removeFunc={removeItemFunc} cartItem={JSCartItem} updateFunc={updateItemFunc}/>)}
          <tr><td className="cartTotalCell" colSpan={3}>Total: {JScart.reduce((s,x) => s + x.quantity*x.price, 0)}</td></tr>
          </tbody>
        </table>
      </div>
    : 
      ''
  )
}

const CartRow = ({cartItem, removeFunc, updateFunc}) => {
  return (
    <tr>
      <td>{cartItem.name}</td>
      <td>{cartItem.price}</td>
      <td>{cartItem.quantity}</td>
      <td><button onClick={() => updateFunc(cartItem.id, 1)}>+</button></td>
      <td><button onClick={() => updateFunc(cartItem.id, -1)}>-</button></td>
      <td><button onClick={() => removeFunc(cartItem.id)}>Remove</button></td>
    </tr>
  )
}

export default function Home() {
  const [cart, setCart] = useState([]);
  const addToCart = (id,q) => {
    setCart(prevCart => {
      const itemIndex = prevCart.findIndex(item => item.id === id);
  
      if (itemIndex === -1) {
        const itemToAdd = foodData.find(x => x.id === id);
        if (itemToAdd) return [...prevCart, itemToAdd];
      } else {
        const updatedCart = prevCart.map((item, index) => 
          index === itemIndex ? { ...item, quantity: item.quantity + q } : item);
        return updatedCart.filter(item => item.quantity > 0); //Remove items of 0 or negative quantity
      }
      return prevCart;
    });
  }

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(x => x.id !== id))
  }
 
  return (
    <div>
      <Menu addToCartFunc={addToCart}/>
      <CartTable removeItemFunc={removeFromCart} updateItemFunc={addToCart} JScart={cart}/>
    </div>
  );
}

// cart=[{id: "appetizer1", name: "Fries", price: 5, quantity: 1},
//     {id: "appetizer2", name: "Mac & Cheese", price: 3, quantity: 1},
//     {id: "appetizer3", name: "Cucumber Roll", price: 4, quantity: 1}]