//using bootstrap example
//https://www.youtube.com/watch?v=EYpdEYK25Dc

import products from "./products.json";

const prodById = new Map();

for (let prod of products) {
    prodById.set(prod.id, prod);
}


export function Checkout(props) {
    const items = [...props.cart]

    let totalCost = 0;
    let itemCount = 0
    for (let [id, quantity] of items) {
        let price = prodById.get(id).price;
        totalCost += price * quantity;
        itemCount += quantity;
    }

    return (
        <div>
            <div class="container">
                <main>
                <button class="btn btn-warning" onClick={props.changeViewToBrowse}>Continue Browsing</button>
                    <div class="py-5 text-center">
                        <h2>Checkout form</h2>
                        <p class="lead">
                            Below is an example form built entirely with Bootstrap's form
                            controls. Each required form group has a validation state that can
                            be triggered by attempting to submit the form without completing
                            it.
                        </p>
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
                                    <span>Total (USD)</span>
                                    <strong>${totalCost}</strong>
                                </li>
                            </ul>

                        </div>
                        <div class="col-md-7 col-lg-8">
                            <h4 class="mb-3">Billing address</h4>
                            <form class="needs-validation" id="checkout-form" novalidate onSubmit={(e) => {handleSubmit(e, props)}} >
                                <div class="row g-3">
                                    <div class="col-sm-12">
                                        <label for="fullname" class="form-label">Full Name</label>
                                        <input type="text" class="form-control" id="fullname" placeholder="" required />
                                        <div class="invalid-feedback">
                                            Valid first name is required.
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
                                        <div class="invalid-feedback">Please select a valid country.</div>
                                    </div>

                                    <div class="col-md-4">
                                        <label for="state" class="form-label">State</label>
                                        <select class="form-select" id="state" required>
                                            <option value="">Choose...</option>
                                            <option>Iowa</option>
                                            <option>California</option>
                                        </select>
                                        <div class="invalid-feedback">
                                            Please provide a valid state.
                                        </div>
                                    </div>

                                    <div class="col-md-3">
                                        <label for="zip" class="form-label">Zip</label>
                                        <input type="text" class="form-control" id="zip" placeholder="12345" pattern={"[0-9]+"} required minLength="5" maxLength="5"/>
                                        <div class="invalid-feedback">Zip code required.</div>
                                    </div>
                                </div>

                                <hr class="my-4" />

                                {/* <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="same-address" />
                                    <label class="form-check-label" for="same-address">Shipping address is the same as my billing
                                        address</label>
                                </div>

                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" id="save-info" />
                                    <label class="form-check-label" for="save-info">Save this information for next time</label>
                                </div> */}

                                {/* <hr class="my-4" /> */}

                                <h4 class="mb-3">Credit card details</h4>

                                {/* <div class="my-3">
                                    <div class="form-check">
                                        <input id="credit" name="paymentMethod" type="radio" class="form-check-input" checked required />
                                        <label class="form-check-label" for="credit">Credit card</label>
                                    </div>
                                    <div class="form-check">
                                        <input id="debit" name="paymentMethod" type="radio" class="form-check-input" required />
                                        <label class="form-check-label" for="debit">Debit card</label>
                                    </div>
                                    <div class="form-check">
                                        <input id="paypal" name="paymentMethod" type="radio" class="form-check-input" required />
                                        <label class="form-check-label" for="paypal">PayPal</label>
                                    </div>
                                </div> */}

                                <div class="row gy-3">
                                    <div class="col-md-6">
                                        <label for="cc-name" class="form-label">Name on card</label>
                                        <input type="text" class="form-control" id="cc-name" placeholder="" required />
                                        <small class="text-body-secondary">Full name as displayed on card</small>
                                        <div class="invalid-feedback">Name on card is required</div>
                                    </div>

                                    <div class="col-md-6">
                                        <label for="cc-number" class="form-label">Credit card number</label>
                                        <input type="text" class="form-control" id="cc-number" placeholder="" required />
                                        <div class="invalid-feedback">
                                            Credit card number is required
                                        </div>
                                    </div>

                                    <div class="col-md-3">
                                        <label for="cc-expiration" class="form-label">Expiration</label>
                                        <input type="date" class="form-control" id="cc-expiration" placeholder="" required />
                                        <div class="invalid-feedback">Expiration date required</div>
                                    </div>

                                    <div class="col-md-3">
                                        <label for="cc-cvv" class="form-label">CVV</label>
                                        <input type="text" class="form-control" id="cc-cvv" placeholder="" minLength="3" maxLength="3" required />
                                        <div class="invalid-feedback">Security code required</div>
                                    </div>
                                </div>

                                <hr class="my-4" />

                                <button class="w-100 btn btn-primary btn-lg" type="submit">
                                    Confirm Order
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

function handleSubmit(event, props) {
    event.preventDefault();
    let form = event.target;

    let {
        fullname,
        email,
        address1,
        address2,
        city,
        state,
        zip
    } = form;

    let order = {
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

        // time
        date: new Date(),
    }

    // call new structure, setting state
    props.changeViewToConfirmation(order)
}