import './App.css';
import React, { useState, useEffect } from 'react';



function App() {
  const [view, setView] = useState('read');

  const [data, setData] = useState(null);
  const [searchResults, setSearchResults] = useState(null);

  //for the search bar
  const [input, setInput] = useState("");
  const [updatedPrices, setUpdatedPrices] = useState({});

  // function Change(event) {
  //   setInput(event.target.value)
  // }
  
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

  // const handlePriceUpdate = async (itemId, updatedPrice) => {
  //   console.log(`Updated price for item ${itemId}: ${updatedPrice}`);

  //   try {
  //     const response = await fetch("http://localhost:8081/updatePrice", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         id: itemId,
  //         price: parseFloat(updatedPrice),
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Failed to update price: ${response.statusText}`);
  //     }

  //     const result = await response.json();
  //     console.log("Price updated successfully:", result);

  //     // Refetch the data and update the state
  //     fetchData();
  //   } catch (error) {
  //     console.error("Error updating price:", error);
  //   }
  // };

  // const handleDeleteProduct = async (itemId) => {
  //   console.log(`Deleting item ${itemId}`);

  //   try {
  //     const response = await fetch("http://localhost:8081/deleteProduct", {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         product1: {
  //           id: itemId,
  //         },
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Failed to delete product: ${response.statusText}`);
  //     }

  //     const result = await response.json();
  //     console.log("Product deleted successfully:", result);

  //     // Refetch the data and update the state
  //     fetchData();
  //   } catch (error) {
  //     console.error("Error deleting product:", error);
  //   }
  // };

  

  return (
    <div className="App">
     <header data-bs-theme="dark">
        <div class="collapse text-bg-dark" id="navbarHeader">
          <div class="container">
            <div class="row">
              <div class="col-sm-8 col-md-7 py-4">
                <h4>About</h4>
                <p class="text-body-secondary">This is a product page using React, Express, and Mongodb for assignment 3 made by Randy Nguyen and Matthew Duncan.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
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

            {/* <div class="collapse navbar-collapse" id="navbarNav"> */}
              <ul class="navbar-nav">
                <li class="nav-item">
                  <button class={(view==="create" ? "active" : "") + " nav-link"} onClick={() => {setView("create")}}>Create</button>
                </li>
                <li class="nav-item">
                  <button class={(view==="read" ? "active" : "") + " nav-link"} onClick={() => {setView("read")}}>Read</button>
                </li>
                <li class="nav-item">
                  <button class={(view==="update" ? "active" : "") + " nav-link"} onClick={() => {setView("update")}}>Update</button>
                </li>
                <li class="nav-item">
                  <button class={(view==="delete" ? "active" : "") + " nav-link"} onClick={() => {setView("delete")}}>Delete</button>
                </li>
                <li class="nav-item">
                  <button class={(view==="credits" ? "active" : "") + " nav-link"} onClick={() => {setView("credits")}}>Credits</button>
                </li>
              </ul>
            
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
        {view ==="create" && <CreateView />}
        {view ==="read" && <ReadView data={data} />}
        {view ==="update" && <UpdateView />}
        {view ==="delete" && <DeleteView />}
        {view ==="credits" && <CreditsView />}
    </div>
  );
}

function CreateView() {
  return (
    <main>
      create view
    </main>
  )
}

function ReadView(params) {
  const data = params.data || []
  
  return (data) ? (
    <main>
      
      <div class="album py-5 bg-body-tertiary">
          <div class="container">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
              {
                 data.map((productGroup) => {
                  // Find the key in the product group that starts with "product"
                  const productKey = Object.keys(productGroup).find((key) =>
                    key.startsWith("product")
                  );
                  // Extract the products from the product group using the product key
                  const products = productGroup[productKey];

                  // Render each product in the products array
                  return products.map(item => <ItemCard item={item} /> );
                })
                  }
            </div>
          </div>
        </div>

    </main>
  )
  :
  <main>unable to load</main>
}

function UpdateView() {
  return (
    <main>
      update view
    </main>
  )
}

function DeleteView() {
  return (
    <main>
      delete view
    </main>
  )
}

function CreditsView() {
  return (
    <main>
      <p>This is a product page using the MERN stack (React, Express, and Mongodb). It was created for Assignment 3 of COM S 319, taught by Abraham Aldaco, Ph.D.
        This application was created by students Randy Nguyen and Matthew Duncan.</p>
      <p>April 30, 2023</p>
    </main>
  );
}

function ItemCard({item}) {
  return (
  <div key={item.id} class="col">
    <div class="card shadow-sm">
      <img src={item.image} className="bd-placeholder-img card-img-top" alt={item.title} />
      <div class="card-body">
        <h5 class="card-title">{item.title}</h5>
        <p class="card-text">{item.description}</p>
        <p class="card-text">${item.price}</p>
        <p class="card-text">Category: {item.category}</p>
        <p class="card-text">{item.rating.rate} out of {item.rating.count} reviews</p>

      </div>
    </div>
  </div> )
}

export default App;