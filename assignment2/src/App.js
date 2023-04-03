import './App.css';
import React, { useState } from "react";
import { Browse } from './Browse';
import { Checkout } from './Checkout';
import { Conformation } from './Conformation';

function App() {
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
        <Conformation changeViewToBrowse={() => setState('Browse')} />
      )}
    </div>
  );
}
export default App;
