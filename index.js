const products = [
    { id: 1, name: "Tea", type: "type1", price: 10 },
    { id: 2, name: "Coffee", type: "type2", price: 20 },
  
  ];
  
  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const totalElement = document.getElementById("total");
  
  let cart = [];
  
  function fetchProducts() {
    productList.innerHTML = "";
    products.forEach(product => {
      const productItem = document.createElement("div");
      productItem.innerHTML = `
        <h3>${product.name}</h3>
        <p>Price: $${product.price}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      productList.appendChild(productItem);
    });
  }
  
  function addToCart(productId) {
    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push({ id: productId, quantity: 1 });
    }
    updateCart();
  }
  
  function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
  }
  
  function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
      const product = products.find(p => p.id === item.id);
      const cartItem = document.createElement("li");
      cartItem.innerHTML = `
        ${product.name} - Quantity: ${item.quantity} - Price: $${product.price * item.quantity}
        <button onclick="removeFromCart(${product.id})">Remove</button>
      `;
      cartItems.appendChild(cartItem);
      total += product.price * item.quantity;
    });
    totalElement.textContent = `Total: $${total.toFixed(2)}`;
  }
  
  function searchProducts(query) {
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));
    fetchProducts(filteredProducts);
  }
  
  function filterProducts(type) {
    const filteredProducts = type === "all" ? products : products.filter(product => product.type === type);
    fetchProducts(filteredProducts);
  }
  
  function sortProducts(order) {
    products.sort((a, b) => (order === "asc" ? a.price - b.price : b.price - a.price));
    fetchProducts();
  }
  

  fetchProducts();

  const searchInput = document.getElementById("search");
  searchInput.addEventListener("input", () => searchProducts(searchInput.value));
  
  const filterSelect = document.getElementById("filter");
  filterSelect.addEventListener("change", () => filterProducts(filterSelect.value));
  
  const sortAscButton = document.getElementById("sort-asc");
  sortAscButton.addEventListener("click", () => sortProducts("asc"));
  
  const sortDescButton = document.getElementById("sort-desc");
  sortDescButton.addEventListener("click", () => sortProducts("desc"));