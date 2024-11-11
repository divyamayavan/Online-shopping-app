const products = {
    "Dairy Products": [
        { name: "Milk", image: "images/milky-removebg-preview.png", price: "100", rating: 0 },
        { name: "Cheese", image: "images/cheese-removebg-preview.png", price: "70", rating: 0 },
        { name: "Yogurt", image: "images/yogurt1-removebg-preview.png", price: "50", rating: 0 },
        { name: "Butter", image: "images/butterimage-removebg-preview.png", price: "82", rating: 0 },
    ],
    "Egg": [
        { name: "Chicken Eggs", image: "images/chicken-egg-removebg-preview.png", price: "100", rating: 0 },
        { name: "Duck Eggs", image: "images/ducsss-removebg-preview.png", price: "150", rating: 0 },
        { name: "Quail Eggs", image: "images/egg-removebg-preview.png", price: "200", rating: 0 }
    ],
    "Vegetables": [
        { name: "Tomatoes", image: "images/Tomato-removebg-preview.png", price: "120", rating: 0 },
        { name: "Carrots", image: "images/carrot1-removebg-preview.png", price: "100", rating: 0 },
        { name: "Spinach", image: "images/spinach-removebg-preview.png", price: "200", rating: 0 },
        { name: "Broccoli", image: "images/broccoli-removebg-preview.png", price: "220", rating: 0 }
    ],
    "Fruits": [
        { name: "Apples", image: "images/apple-removebg-preview.png", price: "180", rating: 0 },
        { name: "Bananas", image: "images/banana-removebg-preview.png", price: "120", rating: 0 },
        { name: "Oranges", image: "images/orangimage-removebg-preview.png", price: "100", rating: 0 },
        { name: "Mangoes", image: "images/mango-removebg-preview.png", price: "250", rating: 0 }
    ]
};

// Existing cart loading logic
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function navigate(page) {
    const sections = document.querySelectorAll('main > section');
    sections.forEach(section => section.style.display = 'none');  // Hide all sections

    // Show the page based on the selected category
    if (page === 'home') {
        document.getElementById('shop').style.display = 'block';  // Show shop section
        displayProducts('Dairy Products');  // Display the products (default category) when shop page loads
    } else if (page === 'cart') {
        document.getElementById('cart').style.display = 'block'; // Show cart page
        displayCart();  // Ensure we call displayCart to load cart items
    } else if (page === 'orders') {
        document.getElementById('orders').style.display = 'block';  // Show orders page
    } else if (page === 'signup') {
        document.getElementById('login-section').style.display = 'block'; // Show login form
    }
}

// Function to display products based on category
function displayProducts(category) {
    const productListElement = document.querySelector('.product-list');
    productListElement.innerHTML = "";  // Clear previous products

    if (products[category]) {
        products[category].forEach((product, index) => {
            const div = document.createElement('div');
            div.classList.add('product-item');

            const img = document.createElement('img');
            img.src = product.image;
            img.alt = product.name;

            const pName = document.createElement('p');
            pName.classList.add('product-name');
            pName.textContent = product.name;

            const price = document.createElement('p');
            price.classList.add('product-price');
            price.textContent = `Price: ${product.price}`;

            const quantityLabel = document.createElement('label');
            quantityLabel.textContent = 'Quantity:';

            const quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.value = 1;
            quantityInput.min = 1;
            quantityInput.classList.add('quantity-input');

            const ratingDiv = document.createElement('div');
            ratingDiv.classList.add('stars');
            for (let i = 1; i <= 5; i++) {
                const star = document.createElement('span');
                star.classList.add('star');
                star.innerHTML = '★'; 
                star.dataset.index = i;
                star.dataset.productIndex = index; 
                star.dataset.category = category; 
                star.addEventListener('click', handleStarClick); 
                ratingDiv.appendChild(star);
            }

            const addToCartButton = document.createElement('button');
            addToCartButton.textContent = "Add to Cart";
            addToCartButton.classList.add('add-to-cart');
            addToCartButton.onclick = function () {
                addToCart(product, parseInt(quantityInput.value));
                alert(`${product.name} added to cart!`);
            };

            const buyNowButton = document.createElement('button');
            buyNowButton.textContent = "Buy Now";
            buyNowButton.classList.add('buy-now');
            buyNowButton.onclick = function () {
                alert(`Proceeding to checkout for ${product.name}.`);
            };

            div.appendChild(img);
            div.appendChild(pName);
            div.appendChild(price);
            div.appendChild(quantityLabel);
            div.appendChild(quantityInput);
            div.appendChild(ratingDiv);
            div.appendChild(addToCartButton);
            div.appendChild(buyNowButton);

            productListElement.appendChild(div);
        });
    }
}

function handleStarClick(event) {
    const clickedStarIndex = parseInt(event.target.dataset.index);
    const productIndex = parseInt(event.target.dataset.productIndex);
    const category = event.target.dataset.category;
    const stars = event.target.parentElement.querySelectorAll('.star');

    stars.forEach((star, idx) => {
        if (idx < clickedStarIndex) {
            star.classList.add('filled');
        } else {
            star.classList.remove('filled'); 
        }
    });

    products[category][productIndex].rating = clickedStarIndex;
}

function addToCart(product, quantity) {
    const existingProductIndex = cart.findIndex(item => item.name === product.name);
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += quantity;
    } else {
        product.quantity = quantity;
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    if (document.getElementById('cart').style.display === 'block') {
        displayCart();
    }
}

function displayCart() {
    const cartListElement = document.querySelector('.cart-list');
    cartListElement.innerHTML = "";

    cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        cartListElement.innerHTML = "<p>Your cart is empty. Start adding products!</p>";
    } else {
        cart.forEach(item => {
            const div = document.createElement('div');
            div.classList.add('cart-item');

            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.name;

            const pName = document.createElement('p');
            pName.classList.add('cart-name');
            pName.textContent = item.name;

            const price = document.createElement('p');
            price.classList.add('cart-price');
            price.textContent = `Price: ${item.price}`;

            const quantity = document.createElement('p');
            quantity.classList.add('cart-quantity');
            quantity.textContent = `Quantity: ${item.quantity}`;

            const removeButton = document.createElement('button');
            removeButton.textContent = "Remove";
            removeButton.classList.add('remove-btn');
            removeButton.onclick = function () {
                removeFromCart(item.name);
            };

            div.appendChild(img);
            div.appendChild(pName);
            div.appendChild(price);
            div.appendChild(quantity);
            div.appendChild(removeButton);

            cartListElement.appendChild(div);
        });
    }
}

function removeFromCart(productName) {
    cart = cart.filter(product => product.name !== productName);
    localStorage.setItem('cart', JSON.stringify(cart));

    displayCart();
}

function placeOrder() {
    const orderDetails = document.getElementById('order-details');
    orderDetails.innerHTML = "Your order has been placed successfully!";
    cart = []; 
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

function openPopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "block";
}

function closePopup(){
    const popup = document.getElementById("popup");
    popup.style.display="none";
}



window.onload = function () {
    navigate('home'); 
};


