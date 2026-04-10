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

function changeQty(index, delta) {
    cart[index].qty += delta;
    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }
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
        itemsDiv.innerHTML = '<p class="empty-cart" style="text-align:center; color:#999; margin-top:20px;">Giỏ hàng của bạn đang trống.</p>';
    } else {
        cart.forEach((item, idx) => {
            total += item.price * item.qty;
            count += item.qty;
            itemsDiv.innerHTML += `
                <div class="cart-item">
                    <img src="${item.img}" alt="${item.name}">
                    <div class="cart-info">
                        <h5>${item.name}</h5>
                        <p class="cart-price">${formatMoney(item.price)}đ</p>
                        <div class="qty-controls">
                            <button onclick="changeQty(${idx}, -1)">-</button>
                            <span>${item.qty}</span>
                            <button onclick="changeQty(${idx}, 1)">+</button>
                        </div>
                    </div>
                    <button class="btn-remove" onclick="changeQty(${idx}, -${item.qty})">✖</button>
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

function toggleMenu() {
    document.getElementById('nav-menu').classList.toggle('active');
}

// LOGIC LỌC SẢN PHẨM (FILTER)
function filterItems(category) {
    let cards = document.querySelectorAll('.product-card');
    let buttons = document.querySelectorAll('.filter-btn');
    
    // Đổi màu nút
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Ẩn hiện thẻ
    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// LOGIC ACCORDION (HỎI ĐÁP FAQ)
function toggleFaq(element) {
    element.classList.toggle('active');
    let content = element.querySelector('.faq-answer');
    if (element.classList.contains('active')) {
        content.style.maxHeight = content.scrollHeight + "px";
    } else {
        content.style.maxHeight = "0";
    }
}
// Logic xử lý khi bấm nút Thanh toán
document.querySelector('.btn-full').addEventListener('click', function() {
    if (cart.length === 0) {
        alert("Giỏ hàng của bạn đang trống. Hãy chọn món ngon trước khi thanh toán nhé!");
        return;
    }

    // Tính tổng tiền để thông báo cho oai
    let total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    
    // Hiện thông báo xác nhận
    let confirmPay = confirm(`Tổng đơn hàng của bạn là: ${formatMoney(total)} VND.\nBạn có chắc chắn muốn đặt hàng không?`);
    
    if (confirmPay) {
        alert("🎉 Chúc mừng Kiên! Đơn hàng đã được ghi nhận. TROUW sẽ liên hệ giao hàng cho bạn sớm nhất!");
        
        // Xóa sạch giỏ hàng sau khi thanh toán
        cart = [];
        updateCartUI();
        toggleCart(); // Đóng giỏ hàng lại
    }
});

// Nếu bạn muốn nút trong Modal cũng thanh toán được ngay:
function checkoutNow(name, price, img) {
    // Thêm món đó vào giỏ trước
    addToCart(name, price, img);
    // Sau đó kích hoạt nút thanh toán luôn
    document.querySelector('.btn-full').click();
}