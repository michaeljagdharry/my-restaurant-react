"use client";
import Image from "next/image";
import styles from "./page.module.css";
import "./style.css";
import  {useState} from 'react';

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

const addToCart = (id) => {
  console.log(id)

  const itemIndex = cart.findIndex(item => item.id === id); // Find cart object with id
  if (itemIndex == -1) { //If absent
      cart.push(foodData.filter(x => x.id === id)[0]) //Add object from foodData with id
  } else {
      cart[itemIndex].quantity++; //Otherwise increment existing quantity
  }
}

const MenuItem = (props) => {
  return (
    <div>
      <img src={props.Src}></img>
      <button onClick={() => addToCart(props.id)}>Add To Cart</button>
    </div>
  )
}

const Menu = () => {
  return (
    <div className="container">
      {foodData.map(x => <MenuItem Src={`food/${x.id}.jpg`} id={x.id}></MenuItem>)}
    </div>
  )
}

const CartRow = (props) => {
  return (
    <tr>
      <td>{props}</td>
    </tr>
  )
}

const Cart = () => {
  return (
    <table>
      <tr>
        <td>Item</td>
        <td>Price</td>
        <td>Quantity</td>
      </tr>
    </table>
  )
}

export default function Home() {
  return (
    <div>
    <Menu></Menu>
    {/* <Cart></Cart> */}
    <button onClick={()=>addToCart(1)}></button>
    </div>
  );
}
