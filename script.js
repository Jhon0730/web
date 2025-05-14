// script.js
document.addEventListener("DOMContentLoaded", function () {
    // Menú hamburguesa
    const navToggle = document.getElementById("nav-toggle");
    const mainNav = document.getElementById("main-nav");

    navToggle.addEventListener("click", function () {
        mainNav.classList.toggle("active");
        const expanded = navToggle.getAttribute("aria-expanded") === "true";
        navToggle.setAttribute("aria-expanded", !expanded);
    });

    // Carrito
    const cartIcon = document.getElementById("cart-icon");
    const cartDropdown = document.getElementById("cart-dropdown");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartCounter = document.getElementById("cart-count");
    const cartNotification = document.getElementById("cart-notification");
    let cart = [];

    cartIcon.addEventListener("click", function (e) {
        e.stopPropagation();
        cartDropdown.classList.toggle("active");
    });

    document.addEventListener("click", function (e) {
        if (!cartDropdown.contains(e.target) && !cartIcon.contains(e.target)) {
            cartDropdown.classList.remove("active");
        }
    });

    // Función para mostrar notificación
    function showNotification() {
        cartNotification.style.display = 'block';
        setTimeout(() => {
            cartNotification.style.display = 'none';
        }, 2000);
    }

    // Función para animar el ícono del carrito
    function animateCartIcon() {
        cartIcon.classList.add('animate');
        setTimeout(() => {
            cartIcon.classList.remove('animate');
        }, 500);
    }

    // Reserva por WhatsApp
    const reserveBtn = document.getElementById("reserve-btn");
    reserveBtn.addEventListener("click", function () {
        const phoneNumber = "51987762448";
        const message = "Hola, quiero reservar una cita en Barber Studio.";
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    });

    // Añadir al carrito desde botón
    const addToCartButtons = document.querySelectorAll(".add-to-cart");

    addToCartButtons.forEach((btn) => {
        btn.addEventListener("click", function () {
            const productCard = btn.closest(".product-card");
            const name = productCard.querySelector(".product-name").textContent;
            const price = productCard.querySelector(".product-price").textContent;
            const imgSrc = productCard.querySelector("img").src;

            cart.push({ name, price, imgSrc });
            updateCartUI();
            showNotification();
            animateCartIcon();
        });
    });

    // Funcionalidad de arrastrar y soltar
    const productImages = document.querySelectorAll(".product-card img");

    productImages.forEach(img => {
        img.addEventListener("dragstart", function (e) {
            e.dataTransfer.setData("text/plain", JSON.stringify({
                name: img.dataset.name,
                price: img.dataset.price,
                imgSrc: img.src
            }));
        });
    });

    cartIcon.addEventListener("dragover", function (e) {
        e.preventDefault();
    });

    cartIcon.addEventListener("drop", function (e) {
        e.preventDefault();
        const data = JSON.parse(e.dataTransfer.getData("text/plain"));
        cart.push(data);
        updateCartUI();
        showNotification();
        animateCartIcon();
    });

    // Actualizar UI del carrito
    function updateCartUI() {
        cartItemsContainer.innerHTML = "";
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>🛒 Carrito vacío</p>';
        } else {
            cart.forEach((item, index) => {
                const div = document.createElement("div");
                div.className = "cart-item";
                div.innerHTML = `
                    <img src="${item.imgSrc}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;" />
                    <span>${item.name} - ${item.price}</span>
                    <button class="remove-btn" data-index="${index}">✕</button>
                `;
                cartItemsContainer.appendChild(div);
            });
        }
        cartCounter.textContent = cart.length;

        // Eliminar items
        document.querySelectorAll(".remove-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                const index = parseInt(this.dataset.index);
                cart.splice(index, 1);
                updateCartUI();
            });
        });
    }

    // Búsqueda
    const searchInput = document.getElementById("search-input");
    searchInput.addEventListener("input", function () {
        const query = this.value.toLowerCase();
        document.querySelectorAll(".product-card").forEach(card => {
            const name = card.querySelector(".product-name").textContent.toLowerCase();
            card.style.display = name.includes(query) ? "block" : "none";
        });
    });
});