import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [searchResults, setSearchResults] = useState(null);

  //for the search bar
  const [input, setInput] = useState("");
  const [updatedPrices, setUpdatedPrices] = useState({});

  function Change(event) {
    setInput(event.target.value)
  }

  const fetchData = async () => {
    fetch('http://localhost:8081/listProducts')
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    fetch(`http://localhost:8081/${input}`)
      .then((response) => response.json())
      .then((json) => setSearchResults(json))
      .catch((error) => console.error(error));
  };

  const handleLogoClick = (event) => {
    event.preventDefault();
    fetchData();
    window.location.reload();
  };

  const handlePriceUpdate = async (itemId, updatedPrice) => {
    console.log(`Updated price for item ${itemId}: ${updatedPrice}`);

    try {
      const response = await fetch("http://localhost:8081/updatePrice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: itemId,
          price: parseFloat(updatedPrice),
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update price: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Price updated successfully:", result);

      // Refetch the data and update the state
      fetchData();
    } catch (error) {
      console.error("Error updating price:", error);
    }
  };

  const handleDeleteProduct = async (itemId) => {
    console.log(`Deleting item ${itemId}`);

    try {
      const response = await fetch("http://localhost:8081/deleteProduct", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product1: {
            id: itemId,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete product: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Product deleted successfully:", result);

      // Refetch the data and update the state
      fetchData();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (

    <div className="App">
      {/* <div>
        {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
      </div> */}
      <div class="dropdown position-fixed bottom-0 end-0 mb-3 me-3 bd-mode-toggle">
        <button class="btn btn-bd-primary py-2 dropdown-toggle d-flex align-items-center" id="bd-theme" type="button"
          aria-expanded="false" data-bs-toggle="dropdown" aria-label="Toggle theme (auto)">
          <svg class="bi my-1 theme-icon-active" width="1em" height="1em">
            <use href="#circle-half"></use>
          </svg>
          <span class="visually-hidden" id="bd-theme-text">Toggle theme</span>
        </button>
        <ul class="dropdown-menu dropdown-menu-end shadow" aria-labelledby="bd-theme-text">
          <li>
            <button type="button" class="dropdown-item d-flex align-items-center" data-bs-theme-value="light"
              aria-pressed="false">
              <svg class="bi me-2 opacity-50 theme-icon" width="1em" height="1em">
                <use href="#sun-fill"></use>
              </svg>
              Light
              <svg class="bi ms-auto d-none" width="1em" height="1em">
                <use href="#check2"></use>
              </svg>
            </button>
          </li>
          <li>
            <button type="button" class="dropdown-item d-flex align-items-center" data-bs-theme-value="dark"
              aria-pressed="false">
              <svg class="bi me-2 opacity-50 theme-icon" width="1em" height="1em">
                <use href="#moon-stars-fill"></use>
              </svg>
              Dark
              <svg class="bi ms-auto d-none" width="1em" height="1em">
                <use href="#check2"></use>
              </svg>
            </button>
          </li>
          <li>
            <button type="button" class="dropdown-item d-flex align-items-center active" data-bs-theme-value="auto"
              aria-pressed="true">
              <svg class="bi me-2 opacity-50 theme-icon" width="1em" height="1em">
                <use href="#circle-half"></use>
              </svg>
              Auto
              <svg class="bi ms-auto d-none" width="1em" height="1em">
                <use href="#check2"></use>
              </svg>
            </button>
          </li>
        </ul>
      </div>


      <header data-bs-theme="dark">
        <div class="collapse text-bg-dark" id="navbarHeader">
          <div class="container">
            <div class="row">
              <div class="col-sm-8 col-md-7 py-4">
                <h4>About</h4>
                <p class="text-body-secondary">This is a product page using React, Express, and Mongodb for assignment 3 made by Randy Nguyen and Matthew Duncan.</p>
              </div>
              {/* <div class="col-sm-4 offset-md-1 py-4">
                <h4>Contact</h4>
                <ul class="list-unstyled">
                  <li><a href="#" class="text-white">Follow on Twitter</a></li>
                  <li><a href="#" class="text-white">Like on Facebook</a></li>
                  <li><a href="#" class="text-white">Email me</a></li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
        <div class="navbar navbar-dark bg-dark shadow-sm">
          <div class="container">
            <a href="#" class="navbar-brand d-flex align-items-center" onClick={handleLogoClick}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor"
                stroke-linecap="round" stroke-linejoin="round" stroke-width="2" aria-hidden="true" class="me-2"
                viewBox="0 0 24 24">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              <strong>Fake Store</strong>
            </a>
            <form class="navbar-brand d-flex align-items-center" onSubmit={handleSearch}>
              <input
                type="search"
                class="form-control"
                placeholder="Search..."
                aria-label="Search"
                value={input}
                onChange={(event) => setInput(event.target.value)}
              />
              <button type="submit" class="btn btn-primary">
                Search
              </button>
            </form>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader"
              aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
      </header>

      <main>

        {/* <section class="py-5 text-center container">
          <div class="row py-lg-5">
            <div class="col-lg-6 col-md-8 mx-auto">
              <h1 class="fw-light">Album example</h1>
              <p class="lead text-body-secondary">Something short and leading about the collection below—its contents, the
                creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely.</p>
              <p>
                <a href="#" class="btn btn-primary my-2">Main call to action</a>
                <a href="#" class="btn btn-secondary my-2">Secondary action</a>
              </p>
            </div>
          </div>
        </section> */}

        <div class="album py-5 bg-body-tertiary">
          <div class="container">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {
                // Check if there are search results or if the data is available
                (searchResults ? [searchResults] : data)
                  ? // If there are search results, wrap them in an array, otherwise use the data
                  (searchResults ? [searchResults] : data).map((productGroup) => {
                    // Find the key in the product group that starts with "product"
                    const productKey = Object.keys(productGroup).find((key) =>
                      key.startsWith("product")
                    );
                    // Extract the products from the product group using the product key
                    const products = productGroup[productKey];

                    // Render each product in the products array
                    return products.map((item) => (
                      <div key={item.id} class="col">
                        <div class="card shadow-sm">
                          <img src={item.image} className="bd-placeholder-img card-img-top" alt={item.title} />
                          <div class="card-body">
                            <h5 class="card-title">{item.title}</h5>
                            <p class="card-text">{item.description}</p>
                            <p class="card-text">${item.price}</p>
                            <p class="card-text">Category: {item.category}</p>
                            <p class="card-text">{item.rating.rate} out of {item.rating.count} reviews</p>
                            <div class="d-flex justify-content-between align-items-center">
                              <input type="number" value={updatedPrices[item.id] || ''}
                                onChange={(e) =>
                                  setUpdatedPrices({
                                    ...updatedPrices,
                                    [item.id]: e.target.value,
                                  })
                                }
                                placeholder="Update price"
                              />
                              <button onClick={() => handlePriceUpdate(item.id, updatedPrices[item.id])}> Update </button>
                              <button className="btn btn-danger mt-2" onClick={() => handleDeleteProduct(item.id)}>Delete</button>
                            </div>

                          </div>
                        </div>
                      </div>
                    ));
                  })
                  : // If there are no search results and the data is not available
                  "no search results and the data is not available"}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

export default App;