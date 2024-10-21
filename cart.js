document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on the cart page
    const isCartPage = window.location.pathname.includes('cart');
    
    if (isCartPage) {
        renderCart();
    } else {
        handleAddToCart();
    }
});

function handleAddToCart() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productElement = event.target.closest('.product');
            const productId = event.target.getAttribute('data-product-id');
            const productName = event.target.getAttribute('data-product-name');
            const productPrice = parseFloat(event.target.getAttribute('data-product-price'));
            const quantityInput = productElement.querySelector('.quantity');
            const quantity = parseInt(quantityInput.value, 10);
            const totalprice = productPrice * quantity;

            if (quantity > 0) {
                const cartItem = {
                    id: productId,
                    name: productName,
                    price: productPrice,
                    quantity: quantity,
                    total: totalprice
                };

                addToCart(cartItem);

                alert(`${productName} (Quantity: ${quantity}) with a total price of ₹${totalprice.toFixed(2)} has been added to your cart.`);
            } else {
                alert('Please select a quantity greater than 0.');
            }
        });
    });

    function addToCart(item) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
        if (existingItemIndex > -1) {
            // If the item already exists in the cart, update the quantity and total price
            cart[existingItemIndex].quantity += item.quantity;
            cart[existingItemIndex].total = cart[existingItemIndex].price * cart[existingItemIndex].quantity;
        } else {
            // Add new item to the cart
            cart.push(item);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

function renderCart() {
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalItemsElement = document.getElementById('total-items');
    const totalPriceElement = document.getElementById('total-price');

    function updateCartSummary(items) {
        let totalItems = 0;
        let totalPrice = 0;

        items.forEach(item => {
            totalItems += item.quantity;
            totalPrice += item.total;
        });

        totalItemsElement.textContent = totalItems;
        totalPriceElement.textContent = totalPrice.toFixed(2);
    }

    function removeFromCart(productId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart(); // Re-render the cart after removing an item
    }

    function handleRemoveItem(event) {
        if (event.target.classList.contains('remove-item')) {
            const productId = event.target.getAttribute('data-product-id');
            removeFromCart(productId);
        }
    }

    function renderCartItems(cart) {
        cartItemsContainer.innerHTML = ''; // Clear the container before adding items

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            return;
        }

        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');

            cartItemElement.innerHTML = `
                <img src="{{ url_for('static', filename='images/product${item.id}.jpg') }}" alt="${item.name}">
                <div class="item-details">
                    <h2>${item.name}</h2>
                    <p>Price: ₹${item.price.toFixed(2)} per kg</p>
                    <p>Quantity: ${item.quantity} kg</p>
                    <p>Total: ₹${item.total.toFixed(2)}</p>
                </div>
                <button class="remove-item" data-product-id="${item.id}">Remove</button>
            `;

            cartItemsContainer.appendChild(cartItemElement);
        });
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    renderCartItems(cart);
    updateCartSummary(cart);
    cartItemsContainer.addEventListener('click', handleRemoveItem);
}
