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
      {foodData.map(item => 
        <MenuItem 
        key={item.id} 
          itemSrc={`food/${item.id}.jpg`} 
          clickFunc={() => addToCartFunc(item.id)}>
        </MenuItem>)}
    </div>
  )
}

const MenuItem = ({itemSrc, clickFunc}) => {
  return (
    <div>
      <img src={itemSrc}></img>
      <button onClick={clickFunc}>Add To Cart</button>
    </div>
  )
}

const CartTable = ({JScart}) => {
  return (
    <table id="cartTable">
      {JScart.length > 0 ? <tr><td>Item</td><td>Price</td><td>Quantity</td></tr> : <tr></tr>} {/*Display header row only if cart is nonempty*/}
      {JScart.map(JSCartItem => <CartRow key={JSCartItem.id} cartItem={JSCartItem}/>)}
    </table>
  )
}

const CartRow = ({cartItem}) => {
  return (
    <tr>
      <td>{cartItem.name}</td>
      <td>{cartItem.price}</td>
      <td>{cartItem.quantity}</td>
      <td><button>Remove</button></td>
    </tr>
  )
}


export default function Home() {
  const [cart, setCart] = useState([]);

  // useEffect(() => { //Log whenever cart length changes (unfortunately object mutations aren't tracked)
  //   console.log(cart);
  // },[cart])

  const addToCart = (id) => {
    setCart(prevCart => {
      const itemIndex = prevCart.findIndex(item => item.id === id);
  
      if (itemIndex === -1) {
        const itemToAdd = foodData.find(x => x.id === id);
        if (itemToAdd) return [...prevCart, itemToAdd];
      } else {
        const updatedCart = prevCart.map((item, index) => 
          index === itemIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
        return updatedCart;
      }
      return prevCart;
    });
  }
  
  return (
    <div>
      <Menu addToCartFunc={addToCart}/>
      {cart.length > 0 ? <Divider/> : ''}
      <CartTable JScart={cart}/>
    </div>
  );
}

// cart=[{id: "appetizer1", name: "Fries", price: 5, quantity: 1},
//     {id: "appetizer2", name: "Mac & Cheese", price: 3, quantity: 1},
//     {id: "appetizer3", name: "Cucumber Roll", price: 4, quantity: 1}]