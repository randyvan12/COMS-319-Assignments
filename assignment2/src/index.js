import './App.css';
import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import products from './products.json';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

function App() {
  //for div swapping
  const [state, setState] = useState('Browse')
  const [cart, setCart] = useState(new Map())

  const [billing, setBilling] = useState({})

  return (
    <div>
      {state === 'Browse' && (
        <Browse changeViewToCheckout={() => setState('Checkout')} cart={cart} setCart={setCart} />
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

/* --- Browse-view related functions -----------------*/
// Using bootstrap example

export function Browse(props) {
    let {changeViewToCheckout, cart, setCart} = props;
    //For the list of products
    const [ProductsCategory, setProductsCategory] = useState(products);

    //for the search bar
    const [input, setInput] = useState("");

    const addToCart = (product) => {
        console.debug(`adding to cart:`, product)

        let oldCount = cart.get(product.id);
        if (isNaN(oldCount)) oldCount = 0;
        
        cart.set(product.id, oldCount+1)


        console.debug(cart)
        setCart(new Map(cart));
    };

    const removeFromCart = (product) => {
        let count = cart.get(product.id);
        
        if (!isNaN(count)) {
            count--;
        }

        // if NaN or less than zero: remove it from cart
        if (isNaN(count) || count <= 0) {
            cart.delete(product.id);
        } else {
            // else update new count
            cart.set(product.id, count);
        }

        console.debug(cart);

        setCart(new Map(cart));
    };

    //search bar
    function Change(event) {
        setInput(event.target.value)
    }

    

    return (
        <div>
            <header class="p-3 mb-3 border-bottom">
                <div class="container">
                    <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
                            <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
                            </svg>
                        </a>

                        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">

                        <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                            <input type="search" class="form-control" placeholder="Search..." aria-label="Search" value={input} onChange={Change}></input>
                        </form>
                        </ul>

                        <div class="text-end">
                            <button type="button" class="btn btn-warning" onClick={() => { changeViewToCheckout();}}>checkout</button>
                        </div>
                    </div>
                </div>
            </header>
            <div class="p-5">
                <div class="row row-cols-3 g-3">
                    {ProductsCategory.filter((product) => {
                        if (input == "") {
                            return product
                        } else if (product.title.replaceAll(/\s/g, '').toLowerCase().includes(input.toLowerCase().replaceAll(/\s/g, ''))) {
                            return product
                        }
                    }).map((product, index) => (
                        <div key={index} class="col">
                            <div class="card">
                                <img src={product.image} alt={product.image} class="card-img-top" />
                                <div class="card-body">
                                    <h5 class="card-title">{product.title}</h5>
                                    <p class="card-text" >
                                        {product.description}
                                    </p>
                                    <div>
                                        <p class="card-text" >
                                            Price = ${product.price}
                                        </p>
                                        <Buttons product={product} productCount={cart.get(product.id) || 0} addToCart={addToCart} removeFromCart={removeFromCart}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

//For the product cards with counters
function Buttons({product, productCount, addToCart, removeFromCart}) {
    const [counter, setCounter] = useState(productCount);

    return (
        
        <div class="input-group w-auto justify-content-end align-items-center d-flex justify-content-center">
            <input type="button" value="-" class="button-minus border rounded-circle  icon-shape icon-sm mx-1 "
                data-field="quantity" onClick={() => {
                    if (counter - 1 >= 0) setCounter(counter - 1);
                    removeFromCart(product);
                }}></input>
            <div type="number" name="quantity"
                class="quantity-field border-0 text-center w-25">{counter}</div>
            <input type="button" value="+" class="button-plus border rounded-circle icon-shape icon-sm"
                data-field="quantity" onClick={() => { setCounter(counter + 1); addToCart(product) }}></input>
        </div>
    )
}

/* --- Checkout-view related functions --------------*/

const prodById = new Map();

for (let prod of products) {
    prodById.set(prod.id, prod);
}


export function Checkout(props) {
    const items = [...props.cart]
    
    
    let itemCost = 0;
    let itemCount = 0
    for (let [id, quantity] of items) {
        let price = prodById.get(id).price;
        itemCost += price * quantity;
        itemCount += quantity;
    }
    let salesTaxCost = (0.07 * itemCost);
    let totalCost = itemCost + salesTaxCost;

    // costs formatted, rounded to 2 decimals 
    let costs = {
        items: itemCost.toFixed(2),
        salesTax: salesTaxCost.toFixed(2),
        total: totalCost.toFixed(2),
    }

    return (
        <div>
            <div class="container">
              <header class="p-3 mb-3 border-bottom">
                  <div class="container">
                      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

                      <button class="btn btn-warning" onClick={props.changeViewToBrowse}>return</button>


                      </div>
                  </div>
            </header>
                <main>
                  
                    <div class="py-5 text-center">
                        <h2>Payment form</h2>
                    </div>

                    <div class="row g-5">
                        <div class="col-md-5 col-lg-4 order-md-last">
                            <h4 class="d-flex justify-content-between align-items-center mb-3">
                                <span class="text-primary">Your cart</span>
                                <span class="badge bg-primary rounded-pill">{itemCount}</span>
                            </h4>
                            <ul class="list-group mb-3">
                                {/* {cartList} */}
                                <CartList items={items}/>
                                <li class="list-group-item d-flex justify-content-between">
                                    <span>Subtotal</span>
                                    ${costs.items}
                                </li>
                                <li class="list-group-item d-flex justify-content-between">
                                    <span>Tax (7%)</span>
                                    ${costs.salesTax}
                                </li>
                                <li class="list-group-item d-flex justify-content-between">
                                    <span>Total (USD)</span>
                                    <strong>${costs.total}</strong>
                                </li>
                            </ul>

                        </div>
                        <div class="col-md-7 col-lg-8">
                            <h4 class="mb-3">Billing address</h4>
                            <form noValidate class="needs-validation" id="checkout-form" onSubmit={(e) => {handleSubmit(e, costs, props)}} >
                                <div class="row g-3">
                                    <div class="col-sm-12">
                                        <label for="fullname" class="form-label">Full Name</label>
                                        <input type="text" class="form-control" id="fullname" placeholder="" required />
                                        <div class="invalid-feedback">
                                            Your full name is required.
                                        </div>
                                    </div>


                                    <div class="col-12">
                                        <label for="email" class="form-label">Email</label>
                                        <input type="email" class="form-control" id="email" placeholder="you@example.com" required />
                                        <div class="invalid-feedback">
                                            Please enter a valid email address for shipping updates.
                                        </div>
                                    </div>

                                    <div class="col-12">
                                        <label for="address" class="form-label">Address 1</label>
                                        <input type="text" class="form-control" id="address1" placeholder="1234 Main St" required />
                                        <div class="invalid-feedback">
                                            Please enter your shipping address.
                                        </div>
                                    </div>

                                    <div class="col-12">
                                        <label for="address1" class="form-label">Address 2
                                        <span class="text-body-secondary"> (Optional)</span></label>
                                        <input type="text" class="form-control" id="address2" placeholder="" />
                                        <div class="invalid-feedback">
                                            Please enter your shipping address.
                                        </div>
                                    </div>

                                    <div class="col-md-5">
                                        <label for="city" class="form-label">City</label>
                                        <input type="text" class="form-control" id="city" required />
                                        <div class="invalid-feedback">Please enter a city.</div>
                                    </div>

                                    <div class="col-md-4">
                                        <label for="state" class="form-label">State</label>
                                        <select class="form-select" id="state" required>
                                            <option value="">Choose...</option>
                                            <option>Iowa</option>
                                            <option>California</option>
                                        </select>
                                        <div class="invalid-feedback">
                                            Please provide a valid state from the list.
                                        </div>
                                    </div>

                                    <div class="col-md-3">
                                        <label for="zip" class="form-label">Zip</label>
                                        <input type="text" class="form-control" id="zip" placeholder="12345" pattern={"[0-9]+"}  minLength="5" maxLength="5" required/>
                                        <div class="invalid-feedback">5-digit zip code required.</div>
                                    </div>
                                </div>

                                <hr class="my-4" />

                                <h4 class="mb-3">Credit card details</h4>

                                <div class="row gy-3">
                                    <div class="col-md-6">
                                        <label for="cc-name" class="form-label">Name on card</label>
                                        <input type="text" class="form-control" id="cc-name" placeholder="" required />
                                        <small class="text-body-secondary">Full name as displayed on card</small>
                                        <div class="invalid-feedback">Name on card is required</div>
                                    </div>

                                    <div class="col-md-6">
                                        <label for="cc-number" class="form-label">Credit card number</label>
                                        <input type="text" class="form-control" id="cc-number" placeholder="XXXX-XXXX-XXXX-XXXX" minLength="19" maxLength="19" pattern={"[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}"} onInput={handleCreditCard} required />
                                        <div class="invalid-feedback">
                                            16 Digit credit card number is required
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <label for="cc-expiration" class="form-label">Expiration</label>
                                        <input type="date" class="form-control" id="cc-expiration" placeholder="" required />
                                        <div class="invalid-feedback">Expiration date required</div>
                                    </div>

                                    <div class="col-md-2">
                                        <label for="cc-cvv" class="form-label">CVV</label>
                                        <input type="text" class="form-control" id="cc-cvv" placeholder="" minLength="3" maxLength="3" required />
                                        <div class="invalid-feedback">3 digit code required</div>
                                    </div>
                                </div>

                                <hr class="my-4" />

                                <button class="w-100 btn btn-primary btn-lg" type="submit">
                                    order
                                </button>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

function CartList({items}) {


    const cartList = items.map(([prodId, quantity]) => {
        let i = prodById.get(prodId);

        return (
        <li key={i.id} class="list-group-item d-flex justify-content-between lh-sm">
            <img class="img-fluid" src={i.image} alt={i.title} width={30} />
            <h6 class="my-0">{i.title}</h6>
            <span class="text-body-secondary">${i.price}</span>
            <span class="text-body-secondary">&nbsp;x&nbsp;{quantity}</span>
        </li>)
    });

    return (<>{cartList}</>)
}

// validates and "submits"
function handleSubmit(event, costs, props) {
    event.preventDefault()
    let form = event.target;

    console.log('form', form)
    form.classList.add('was-validated')
    
    // Our html form elements have the checks specified in it via the patterns, minLength
    // and maxLength properties
    // we will simply re-use them
    if (!form.checkValidity()) {
        event.stopPropagation()
    } else {
        let {
            fullname,
            email,
            address1,
            address2,
            city,
            state,
            zip
        } = form;

        let billing = {
            // shipping
            fullname: fullname.value,
            email: email.value,
            address1: address1.value,
            address2: address2.value,
            city: city.value,
            state: state.value,
            zip: zip.value,

            // billing
            cardNumber: form["cc-number"].value,
            cardName: form["cc-name"].value,
            cardExp: form["cc-expiration"].value,
            cardCVV: form["cc-cvv"].value,

            // costs
            costs: costs,

            // time
            date: new Date(),
        }

        // call new structure, setting state
        props.changeViewToConfirmation(billing)
    }
}

function isNumeric (n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
}

function handleCreditCard(event) {
    let cardInput = event.target;

    if (!cardInput.value) {
        return event.preventDefault()
    } else {
        cardInput.value = cardInput.value.replace(/-/g, '')
        let newVal = ''
        for (var i = 0, nums = 0; i < cardInput.value.length; i++) {
            if (nums !== 0 && nums % 4 === 0) {
                newVal += '-'
            }
            newVal += cardInput.value[i]
            if (isNumeric(cardInput.value[i])) {
                nums++
            }
        }
        cardInput.value = newVal
    }
}

/* --- Confirmation-view related functions ---- */

function formatDate(date) {
  return `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
}

//Using example found online
export function Confirmation({billing, cart, changeViewToBrowse}) {
  console.log("billing:", billing);
  console.log("date:", billing.date);
  const dateFormatted = formatDate(billing.date);
  let costs = billing.costs;

  console.log("passed shipping details: ", billing);
  return (
      <div>
          <div class="container mt-5 mb-5">
              <div class="row d-flex justify-content-center">
                  <div class="col-md-8">
                      <div class="card">
                              <button class="btn btn-warning" onClick={changeViewToBrowse}>Return to browsing</button>
                          <div class="text-left logo p-2 px-5">
                          </div>
                          <div class="invoice p-5">
                              <h5>Your Order Has Been Confirmed!</h5>
                              <span>You order has been confirmed and will be shipped in next two days!</span>
                              <div class="payment border-top mt-3 mb-3 border-bottom table-responsive">
                                  <table class="table table-borderless">
                                      <tbody>
                                          <tr>
                                              <td>
                                                  <div class="py-2">
                                                      <span class="d-block text-muted">Order Date</span>
                                                      <span>{dateFormatted}</span>
                                                  </div>
                                              </td>
                                              <td>
                                                  <div class="py-2">
                                                      <span class="d-block text-muted">Order No</span>
                                                      <span>MT12332345</span>
                                                  </div>
                                              </td>
                                              <td>
                                                  <div class="py-2">
                                                      <span class="d-block text-muted">Email</span>
                                                      <span>{billing.email}</span>
                                                  </div>
                                              </td>
                                          </tr>
                                          
                                          <tr>
                                              <td>
                                                  <div class="py-2">
                                                      <span class="d-block text-muted">Name on Card</span>
                                                      <span>{billing.cardName}</span>
                                                  </div>
                                              </td>
                                              <td>
                                                  <div class="py-2">
                                                      <span class="d-block text-muted">Credit Card</span>
                                                      <span><Card billing={billing} /></span>
                                                  </div>
                                              </td>
                                              <td>
                                                  <div class="py-2">
                                                      <span class="d-block text-muted">Shipping Address</span>
                                                      <AddressCard billing={billing} />
                                                  </div>
                                              </td>
                                          </tr>
                                      </tbody>
                                  </table>
                              </div>
                             <ProductCards cart={cart}/>
                              <div class="row d-flex justify-content-end">
                                  <div class="col-md-5">
                                      <table class="table table-borderless">
                                          <tbody class="totals">
                                              <tr>
                                                  <td>
                                                      <div class="text-left">
                                                          <span class="text-muted">Subtotal</span>
                                                      </div>
                                                  </td>
                                                  <td>
                                                      <div class="text-right">
                                                          <span>${costs.items}</span>
                                                      </div>
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td>
                                                      <div class="text-left">
                                                          <span class="text-muted">Tax Fee</span>
                                                      </div>
                                                  </td>
                                                  <td>
                                                      <div class="text-right">
                                                          <span>${costs.salesTax}</span>
                                                      </div>
                                                  </td>
                                              </tr>
                                              <tr class="border-top border-bottom">
                                                  <td>
                                                      <div class="text-left">

                                                          <span class="font-weight-bold">Total</span>

                                                      </div>
                                                  </td>
                                                  <td>
                                                      <div class="text-right">
                                                          <span class="font-weight-bold">${costs.total}</span>
                                                      </div>
                                                  </td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </div>
                              </div>
                              <p>We will be sending shipping confirmation email when the item shipped successfully!</p>
                              <p class="font-weight-bold mb-0">Thanks for shopping with us!</p>
                          </div>
                          <div class="d-flex justify-content-between footer p-3">
                              <span>{new Date().getFullYear()}</span>

                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  )
}

function Card({billing}) {
  let last4CardDigits = billing.cardNumber.slice(-4);
  return (
      <>
       {`XXXX-XXXX-XXXX-${last4CardDigits}`} <br/>
       Expires: {billing.cardExp} <br />
      </>
  )
}


function AddressCard({billing}) {
  const addr2 = (billing.address2) ? (<>{billing.address2} <br /></>) : (<></>);
  return (
      <span>
      {billing.fullname} <br />
      {billing.address1} <br />
      {addr2}
      {billing.city}, {billing.state} {billing.zip}
      </span>
  )
}

function ProductCards ({cart}) {
  const cartList = [...cart].map(([prodId, quantity]) => {
      let prod = prodById.get(prodId);

      return (
      <tr>
          <td width="20%">
              <img src={prod.image} width="90" />
          </td>
          <td width="60%">
              <span class="font-weight-bold">{prod.title}</span>
              <div class="product-qty">
                  <span class="d-block">Quantity: {quantity}</span>
              </div>
          </td>
          <td width="20%">
              <div class="text-right">
                  <span class="font-weight-bold">${prod.price}</span>
              </div>
          </td>
      </tr>)
  });

  return (
  <div class="product border-bottom table-responsive">
      <table class="table table-borderless">
          <tbody>
              {cartList}
          </tbody>
      </table>
  </div>)
}