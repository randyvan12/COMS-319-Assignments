import products from './products.json'

const prodById = new Map();

for (let prod of products) {
    prodById.set(prod.id, prod);
}

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
                                                {/* <tr>
                                                    <td>
                                                        <div class="text-left">
                                                            <span class="text-muted">Shipping Fee</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="text-right">
                                                            <span>{billing.costs.salesTax}</span>
                                                        </div>
                                                    </td>
                                                </tr> */}
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
                                                {/* <tr>
                                                    <td>
                                                        <div class="text-left">
                                                            <span class="text-muted">Discount</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="text-right">
                                                            <span class="text-success">$168.50</span>
                                                        </div>
                                                    </td>
                                                </tr> */}
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