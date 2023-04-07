import './App.css';
import React, { useState } from "react";
import { Browse } from './Browse';
import { Checkout } from './Checkout';
import { Confirmation } from './Confirmation';

function App() {
  //for div swapping
  const [state, setState] = useState('Browse')

  //for cart
  // const [cart, setCart] = useState([]);
  // const [cartTotal, setCartTotal] = useState(0);

  // useEffect(() => {
  //   total();
  // }, [cart]);

  // const total = () => {
  //   let totalVal = 0;
  //   for (let i = 0; i < cart.length; i++) {
  //     totalVal += cart[i].price;
  //   }
  //   setCartTotal(totalVal);
  // };

  // const addToCart = (el) => {
  //   setCart([...cart, el]);
  // };

  // const removeFromCart = (el) => {
  //   let hardCopy = [...cart];
  //   hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
  //   setCart(hardCopy);
  // };

  // const cartItems = cart.map((el) => (
  //   <div key={el.id}>
  //     <img class="img-fluid" src={el.image} width={30} />
  //     {el.title}
  //     ${el.price}
  //   </div>
  // ));

  // const listItems = items.map((el) => (
  //   <div key={el.id}>
  //     <img class="img-fluid" src={el.image} />
  //     {el.title}
  //     {el.category}
  //     {el.price}
  //     <button type="button" onClick={() => removeFromCart(el)}>-</button>{" "}
  //     <button type="button" variant="light" onClick={() => addToCart(el)}> + </button>
  //   </div>
  // ));

  return (
    <div>
      {state === 'Browse' && (
        <Browse changeViewToCheckout={() => setState('Checkout')} />
      )}

      {state === 'Checkout' && (
        <Checkout changeViewToBrowse={() => setState('Browse')} changeViewToConformation={() => setState('Conformation')} />
      )}

      {state === 'Conformation' && (
        <Confirmation changeViewToBrowse={() => setState('Browse')} />
      )}
    </div>
  );
}
export default App;
