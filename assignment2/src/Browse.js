export function Browse(props) {
    return (
        <div>
            <button onClick={props.changeViewToCheckout}>Temp button to Checkout</button>
            <header class="p-3 mb-3 border-bottom">
                <div class="container">
                    <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
                            <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
                            </svg>
                        </a>

                        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><a href="#" class="nav-link px-2 link-secondary">Overview</a></li>
                            <li><a href="#" class="nav-link px-2 link-body-emphasis">Inventory</a></li>
                            <li><a href="#" class="nav-link px-2 link-body-emphasis">Customers</a></li>
                            <li><a href="#" class="nav-link px-2 link-body-emphasis">Products</a></li>
                        </ul>

                        <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                            <input type="search" class="form-control" placeholder="Search..." aria-label="Search"></input>
                        </form>

                        <div class="text-end">
                            <button type="button" class="btn btn-warning">Checkout</button>
                        </div>
                    </div>
                </div>
            </header>
            <div class="p-5">

                <div class="row row-cols-3 g-3">
                    <div class="col">
                        <div class="card">
                            <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/041.webp" class="card-img-top"
                                alt="Hollywood Sign on The Hill" />
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">
                                    This is a longer card with supporting text below as a natural lead-in to
                                    additional content. This content is a little bit longer.
                                </p>
                                <div class="input-group w-auto justify-content-end align-items-center d-flex justify-content-center">
                                    <input type="button" value="-" class="button-minus border rounded-circle  icon-shape icon-sm mx-1 "
                                        data-field="quantity"></input>
                                    <input type="number" step="1" max="10" value="1" name="quantity"
                                        class="quantity-field border-0 text-center w-25"></input>
                                    <input type="button" value="+" class="button-plus border rounded-circle icon-shape icon-sm "
                                        data-field="quantity"></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card">
                            <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/042.webp" class="card-img-top"
                                alt="Palm Springs Road" />
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">
                                    This is a longer card with supporting text below as a natural lead-in to
                                    additional content. This content is a little bit longer.
                                </p>
                                <div class="input-group w-auto justify-content-end align-items-center d-flex justify-content-center">
                                    <input type="button" value="-" class="button-minus border rounded-circle  icon-shape icon-sm mx-1 "
                                        data-field="quantity"></input>
                                    <input type="number" step="1" max="10" value="1" name="quantity"
                                        class="quantity-field border-0 text-center w-25"></input>
                                    <input type="button" value="+" class="button-plus border rounded-circle icon-shape icon-sm "
                                        data-field="quantity"></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card">
                            <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/043.webp" class="card-img-top"
                                alt="Los Angeles Skyscrapers" />
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to
                                    additional content.</p>
                                <div class="input-group w-auto justify-content-end align-items-center d-flex justify-content-center">
                                    <input type="button" value="-" class="button-minus border rounded-circle  icon-shape icon-sm mx-1 "
                                        data-field="quantity"></input>
                                    <input type="number" step="1" max="10" value="1" name="quantity"
                                        class="quantity-field border-0 text-center w-25"></input>
                                    <input type="button" value="+" class="button-plus border rounded-circle icon-shape icon-sm "
                                        data-field="quantity"></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card">
                            <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/044.webp" class="card-img-top" alt="Skyscrapers" />
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">
                                    This is a longer card with supporting text below as a natural lead-in to
                                    additional content.
                                </p>
                                <div class="input-group w-auto justify-content-end align-items-center d-flex justify-content-center">
                                    <input type="button" value="-" class="button-minus border rounded-circle  icon-shape icon-sm mx-1 "
                                        data-field="quantity"></input>
                                    <input type="number" step="1" max="10" value="1" name="quantity"
                                        class="quantity-field border-0 text-center w-25"></input>
                                    <input type="button" value="+" class="button-plus border rounded-circle icon-shape icon-sm "
                                        data-field="quantity"></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card">
                            <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/046.webp" class="card-img-top" alt="Skyscrapers" />
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">
                                    This is a longer card with supporting text below as a natural lead-in to
                                    additional content. This content is a little bit longer.
                                </p>
                                <div class="input-group w-auto justify-content-end align-items-center d-flex justify-content-center">
                                    <input type="button" value="-" class="button-minus border rounded-circle  icon-shape icon-sm mx-1 "
                                        data-field="quantity"></input>
                                    <input type="number" step="1" max="10" value="1" name="quantity"
                                        class="quantity-field border-0 text-center w-25"></input>
                                    <input type="button" value="+" class="button-plus border rounded-circle icon-shape icon-sm "
                                        data-field="quantity"></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card">
                            <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/050.webp" class="card-img-top" alt="Skyscrapers" />
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                                <p class="card-text">
                                    This is a longer card with supporting text below as a natural lead-in to
                                    additional content. This content is a little bit longer.
                                </p>
                                <div class="input-group w-auto justify-content-end align-items-center d-flex justify-content-center">
                                    <input type="button" value="-" class="button-minus border rounded-circle  icon-shape icon-sm mx-1 "
                                        data-field="quantity"></input>
                                    <input type="number" step="1" max="10" value="1" name="quantity"
                                        class="quantity-field border-0 text-center w-25"></input>
                                    <input type="button" value="+" class="button-plus border rounded-circle icon-shape icon-sm "
                                        data-field="quantity"></input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}