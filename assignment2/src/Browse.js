// Using bootstrap example
import { Products } from "./Products";
import React, { useState, useEffect } from "react";

export function Browse(props) {
    //For the list of products
    const [ProductsCategory, setProductsCategory] = useState(Products);

    //for the search bar
    const [input, setInput] = useState("");
    const [cart, setCart] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        total();
    }, [cart]);

    const total = () => {
        let totalVal = 0;
        for (let i = 0; i < cart.length; i++) {
            totalVal += cart[i].price;
        }
        setCartTotal(totalVal);
    };

    const addToCart = (el) => {
        setCart([...cart, el]);
    };

    const removeFromCart = (el) => {
        let hardCopy = [...cart];
        hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
        setCart(hardCopy);
    };

    const cartItems = cart.map((el) => (
        <li key={el.id} class="list-group-item d-flex justify-content-between lh-sm">
            <img class="img-fluid" src={el.image} width={30} />
            <h6 class="my-0">{el.title}</h6>

            <span class="text-body-secondary">${el.price}</span>
        </li>
    ));

    //search bar
    function Change(event) {
        setInput(event.target.value)
    }

    //For the product cards with counters
    function Cards(props) {
        const [counter, setCounter] = useState(1);

        return (
            <div class="input-group w-auto justify-content-end align-items-center d-flex justify-content-center">
                <input type="button" value="-" class="button-minus border rounded-circle  icon-shape icon-sm mx-1 "
                    data-field="quantity" onClick={() => { setCounter(counter - 1); removeFromCart(props.product) }}></input>
                <div type="number" name="quantity"
                    class="quantity-field border-0 text-center w-25">{counter}</div>
                <input type="button" value="+" class="button-plus border rounded-circle icon-shape icon-sm"
                    data-field="quantity" onClick={() => { setCounter(counter + 1); addToCart(props.product) }}></input>
            </div>
        )
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
                            <button type="button" class="btn btn-warning" onClick={() => { props.changeViewToCheckout(); props.setCartList(cartItems); props.setTotalCost((cartTotal * 0.05) + cartTotal);}}>Checkout</button>
                        </div>
                    </div>
                </div>
            </header>
            <div class="p-5">
                <div class="row row-cols-3 g-3">
                    {ProductsCategory.filter((product) => {
                        if (input == "") {
                            return product
                        } else if (product.title.replaceAll(/\s/g, '').toLowerCase().startsWith(input.toLowerCase().replaceAll(/\s/g, ''))) {
                            return product
                        }
                    }).map((product, index) => (
                        <div key={index} class="col">
                            <div class="card">
                                <img src={product.image} class="card-img-top" width="370px" height="640px" />
                                <div class="card-body">
                                    <h5 class="card-title">{product.title}</h5>
                                    <p class="card-text" >
                                        {product.description}
                                    </p>
                                    <div>
                                        <p class="card-text" >
                                            Price = ${product.price}
                                        </p>
                                        <Cards product={product} />
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

