let cart = [];
function formatMoney(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function addToCart(name, price, img) {
    let item = cart.find(i => i.name === name);
    if (item) {
        item.qty += 1;
    } else {
        cart.push({ name, price, img, qty: 1 });
    }
    updateCartUI();
    document.getElementById('cart-sidebar').classList.add('open');
    document.getElementById('cart-overlay').classList.add('open');
    closeModal();
}
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}
function updateCartUI() {
    let itemsDiv = document.getElementById('cart-items');
    let totalSpan = document.getElementById('cart-total-price');
    let countSpan = document.getElementById('cart-count');
    
    itemsDiv.innerHTML = '';
    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        itemsDiv.innerHTML = '<p style="text-align:center; color:#777;">Giỏ hàng trống.</p>';
    } else {
        cart.forEach((item, idx) => {
            total += item.price * item.qty;
            count += item.qty;
            itemsDiv.innerHTML += `
                <div class="cart-item">
                    <img src="${item.img}" alt="${item.name}">
                    <div class="cart-info">
                        <h5>${item.name}</h5>
                        <p>${formatMoney(item.price)} VND x ${item.qty}</p>
                    </div>
                    <button class="btn-remove" onclick="removeFromCart(${idx})">Xóa</button>
                </div>
            `;
        });
    }
    totalSpan.innerText = formatMoney(total);
    countSpan.innerText = count;
}
function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('open');
    document.getElementById('cart-overlay').classList.toggle('open');
}
function openModal(name, price, desc, img) {
    document.getElementById('modal-title').innerText = name;
    document.getElementById('modal-price').innerText = formatMoney(price) + ' VND';
    document.getElementById('modal-desc').innerHTML = desc;
    document.getElementById('modal-img').src = img;
    
    document.getElementById('modal-add-btn').onclick = function() {
        addToCart(name, price, img);
    };

    document.getElementById('product-modal').classList.add('open');
    document.getElementById('modal-overlay').classList.add('open');
}
function closeModal() {
    document.getElementById('product-modal').classList.remove('open');
    document.getElementById('modal-overlay').classList.remove('open');
}
window.addEventListener('scroll', () => {
    let header = document.getElementById('main-header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.5)';
    } else {
        header.style.boxShadow = 'none';
    }
});