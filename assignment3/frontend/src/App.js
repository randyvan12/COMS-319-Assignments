import './App.css';
import React, { useState, useEffect, useRef, Children } from 'react';

const SERVER_ADDR = "localhost:8081"


function App() {
  const [view, setView] = useState('read');

  const [data, setData] = useState(null);
  const [searchResults, setSearchResults] = useState(null);

  //for the search bar
  const [input, setInput] = useState("");
  const [updatedPrices, setUpdatedPrices] = useState({});
  
  const fetchData = async () => {
    fetch(`http://${SERVER_ADDR}/products`)
      .then(response => response.json())
      .then(json => setData(json))
      .catch(error => console.error(error));
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogoClick = (event) => {
    event.preventDefault();
    fetchData();
    window.location.reload();
  };

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
          </div>
        </div>
      </header>
        {view ==="create"  && <CreateView />}
        {view ==="read"    && <ReadView data={data} />}
        {view ==="update"  && <UpdateView />}
        {view ==="delete"  && <DeleteView />}
        {view ==="credits" && <CreditsView />}
    </div>
  );
}

/* Views made from functional components */

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
                 data.map((product) => {
                  // console.log("product:", product)
                  return <ProductCard item={product} />
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
   const handlePriceUpdate = async (e, item, updatedPrice) => {
    e.preventDefault()
    e.stopPropagation()
    console.log(`Updating price for item ${item._id}: ${updatedPrice}`);

      try {
        const response = await fetch(`http://${SERVER_ADDR}/products/${item._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: item._id,
            price: parseFloat(updatedPrice),
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to update price: ${response.statusText}`);
        }

        const result = await response.json();
        console.log("Price updated successfully:", result);

        // Refetch the data and update the state
        // fetchData();
      } catch (error) {
        console.error("Error updating price:", error);
      }
    };

  const [item, setItem] = useState(null);
  const priceInput = useRef(null);

  console.log("item:", item)
  
  if (item) {
    return (
      <main>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
        <ProductCard item={item}>
        <form class="d-flex justify-content-between align-items-center" onSubmit={
          (e) => {
            console.log(e);
            handlePriceUpdate(e, item, priceInput.current.value);}
          }>
          <input type="number"
            placeholder={item.price}
            id="new-price"
            ref={priceInput}
            min="0"
            step="0.01"
            className="form-control"
          />
          <button type="submit" className="btn btn-primary" > Update </button>
          </form>
        </ProductCard>
        </div>
      </main>
    )
  }
  else return (
    <main className="centered-cont">
        <ItemSearch callback={setItem} />
    </main>
  )
}

function DeleteView() {
  const handleDeleteProduct = async (e, itemId) => {
    e.preventDefault();
    console.log("Attempting to delete: ", itemId);
    try {
        const response = await fetch(`http://${SERVER_ADDR}/products/${itemId}`, {
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

      } catch (error) {
        console.error("Error deleting product:", error);
      }
  };


 const [item, setItem] = useState(null);
 const priceInput = useRef(null);

 console.log("item:", item)
 
 if (item) {
   return (
     <main>
       <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
       <ProductCard item={item}>
       <form class="d-flex justify-content-between align-items-center" onSubmit={
         (e) => {
           console.log(e);
           handleDeleteProduct(e, item._id);
          }}>
         <button type="submit" className="btn btn-danger" >Confirm Delete</button>
         </form>
       </ProductCard>
       </div>
     </main>
   )
 }
 else return (
   <main className="centered-cont">
       <ItemSearch callback={setItem} />
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

/* Other components for modularization */

function ProductCard({item, children}) {
  const f = children
  // console.log("rendering product:", item.title)
  // console.log("children:", f)
  return (
  <div key={item.id} className="col">
    <div className="card shadow-sm">
      <img src={item.image} className="bd-placeholder-img card-img-top" alt={item.title} />
      <div className="card-body">
        <h5 className="card-title">{item.title}</h5>
        <p className="card-text">{item.description}</p>
        <p className="card-text">${item.price}</p>
        <p className="card-text">Category: {item.category}</p>
        <p className="card-text">{item.rating.rate} out of {item.rating.count} reviews</p>
        {f || ""}
      </div>
    </div>
  </div> )
}

function ItemSearch({callback}) {
  const field = useRef(null);

  return (
    <form className="navbar-brand d-flex align-items-center" style={{width: "220px", }} onSubmit={(e) => handleSubmit(e, field.current, callback)}>
    <input
      type="search"
      className="form-control"
      id="id-input"
      ref={field}
      placeholder="Id"
      aria-label="Search"
    />
    <button type="submit" class="btn btn-primary">
      Search by ID
    </button>
  </form>
  )
}

const handleSubmit = (event, field, callback) => {
  event.preventDefault();
  const id = field.value;

  console.log(field)

  console.log("Selected id: ", id)

  fetch(`http://${SERVER_ADDR}/products/${id}`)
  .then(response => response.json())
  .then(json => callback(json))
  .catch(error => console.error(error));
}
export default App;