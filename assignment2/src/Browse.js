// Using bootstrap example
import { CardGroup } from "react-bootstrap";
import products from "./products.json";
import React, { useState, useEffect } from "react";

export function Browse(props) {
    let {changeViewToCheckout, setCartList, setTotalCost, cart, setCart} = props;
    //For the list of products
    const [ProductsCategory, setProductsCategory] = useState(products);

    //for the search bar
    const [input, setInput] = useState("");
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        total();
    }, [cart]);

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

    const total = () => {
        let total = 0;

        for (let product of cart.values()) {
            total += product.price * product.count;
        }
        setCartTotal(total);
    };

    // const cartItems = cart.map((el) => (
    //     <li key={el.id} class="list-group-item d-flex justify-content-between lh-sm">
    //         <img class="img-fluid" src={el.image} width={30} />
    //         <h6 class="my-0">{el.title}</h6>

    //         <span class="text-body-secondary">${el.price}</span>
    //     </li>
    // ));

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
                            <li><a href="#" class="nav-link px-2 link-body-emphasis">All Products</a></li>
                        </ul>

                        <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                            <input type="search" class="form-control" placeholder="Search..." aria-label="Search" value={input} onChange={Change}></input>
                        </form>
                        <div class="text-end">
                            <button type="button" class="btn btn-warning" onClick={() => { changeViewToCheckout(); setTotalCost((cartTotal * 0.05) + cartTotal);}}>Checkout</button>
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