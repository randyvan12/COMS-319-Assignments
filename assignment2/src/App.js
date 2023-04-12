import './App.css';
import React, { useState, useEffect } from "react";
import { Browse } from './Browse';
import { Checkout } from './Checkout';
import { Confirmation } from './Confirmation';

function App() {
  //for div swapping
  const [state, setState] = useState('Browse')
  const [cart, setCart] = useState(new Map())
  
  
  const [cartList, setCartList] = useState([])
  const [totalCost, setTotalCost] = useState(0)

  const [billing, setBilling] = useState({})

  return (
    <div>
      {state === 'Browse' && (
        <Browse changeViewToCheckout={() => setState('Checkout')} setCartList={setCartList} setTotalCost={setTotalCost} cart={cart} setCart={setCart} />
      )}

      {state === 'Checkout' && (
        <Checkout changeViewToBrowse={() => setState('Browse')} changeViewToConfirmation={(bill) => {   
          setBilling({...bill})
          setState('Confirmation')
        }} 
        
        cart={cart} />
      )}

      {state === 'Confirmation' && (
        <Confirmation 
        billing={billing}
        cart={cart}
        changeViewToBrowse={() => {
          // make a "fresh" view by removing old state and swapping divs
          setCart(new Map())
          setBilling({})
          setState('Browse')
        }} />
      )}
    </div>
  );
}

export default App;
