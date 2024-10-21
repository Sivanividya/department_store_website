document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productElement = event.target.closest('.product');
            const productId = event.target.getAttribute('data-product-id');
            const productName = event.target.getAttribute('data-product-name');
            const productPrice = parseFloat(event.target.getAttribute('data-product-price'));
            const quantityInput = productElement.querySelector('.quantity');
            const quantity = parseInt(quantityInput.value, 10);

            if (isNaN(quantity) || quantity <= 0) {
                alert('Please enter a valid quantity.');
                return;
            }

            const totalprice = productPrice * quantity;

            const cartItem = {
                id: productId,
                name: productName,
                price: productPrice,
                quantity: quantity,
                total: totalprice
            };

            addToCart(cartItem);

            alert(`${productName} (Quantity: ${quantity}) with total price of ₹${totalprice.toFixed(2)} has been added to your cart.`);
        });
    });

    function addToCart(item) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += item.quantity;
            cart[existingItemIndex].total = cart[existingItemIndex].price * cart[existingItemIndex].quantity;
        } else {
            cart.push(item);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    }
});
