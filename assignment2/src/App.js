import './App.css';
import React, { useState, useEffect } from "react";
import { Browse } from './Browse';
import { Checkout } from './Checkout';
import { Confirmation } from './Confirmation';

function App() {
  //for div swapping
  const [state, setState] = useState('Browse')
  const [cartList, setCartList] = useState([])
  const [cart, setCart] = useState(new Map())
  const [totalCost, setTotalCost] = useState(0)

  return (
    <div>
      {state === 'Browse' && (
        <Browse changeViewToCheckout={() => setState('Checkout')} setCartList={setCartList} setTotalCost={setTotalCost} cart={cart} setCart={setCart} />
      )}

      {state === 'Checkout' && (
        <Checkout changeViewToBrowse={() => setState('Browse')} changeViewToConfirmation={() => setState('Confirmation')} cart={cart} />
      )}

      {state === 'Confirmation' && (
        <Confirmation changeViewToBrowse={() => setState('Browse')} />
      )}
    </div>
  );
}

export default App;
