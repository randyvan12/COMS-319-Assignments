import './App.css';
import React, { useState } from "react";
import { Browse } from './Browse';
import { Checkout } from './Checkout';
import { Confirmation } from './Confirmation';
import $ from 'jquery';

function App() {
  //for div swapping
  const [state, setState] = useState('Browse')

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
