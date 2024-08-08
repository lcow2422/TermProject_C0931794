document.addEventListener("DOMContentLoaded", function() {
    const productList = document.getElementById('product-list');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    // Fetch product data from JSON file
    fetch('product.json')
        .then(response => response.json())
        .then(products => {
            displayProducts(products);
            updateCart();
        })
        .catch(error => console.error('Error fetching products:', error));

    function displayProducts(products) {
        productList.innerHTML = '';
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product-item';
            productDiv.innerHTML = `
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>$${product.price.toFixed(2)}</p>
                <button onclick="addToCart('${product.id}', ${product.price})">Add to Cart</button>
            `;
            productList.appendChild(productDiv);
        });
    }

    window.addToCart = function(productId, price) {
        let cart = JSON.parse(localStorage.getItem('cart')) || {};
        if (cart[productId]) {
            cart[productId].quantity += 1;
        } else {
            cart[productId] = { quantity: 1, price: price };
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    };

    function updateCart() {
        let cart = JSON.parse(localStorage.getItem('cart')) || {};
        cartItems.innerHTML = '';
        let total = 0;

        for (let productId in cart) {
            const item = cart[productId];
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                Product ID: ${productId} - Quantity: ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}
            `;
            cartItems.appendChild(itemDiv);
            total += item.price * item.quantity;
        }

        const tax = total * 0.07;
        const grandTotal = total + tax;
        cartTotal.innerHTML = `
            <p>Subtotal: $${total.toFixed(2)}</p>
            <p>Tax: $${tax.toFixed(2)}</p>
            <p>Total: $${grandTotal.toFixed(2)}</p>
        `;
    }
});
