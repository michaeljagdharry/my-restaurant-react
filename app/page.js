"use client";
import Image from "next/image";
import styles from "./page.module.css";
import "./style.css";
import  {useState} from 'react';



export default function Home() {
  return (
    <div>
    <Menu></Menu>
    {/* <Cart></Cart> */}
    <button onClick={()=>addToCart(1)}></button>
    </div>
  );
}
