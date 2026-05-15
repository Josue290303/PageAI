/* ═══════════════════════════════════════════
   NAYLIN SHOP — script.js
   ═══════════════════════════════════════════ */

/* ── PRODUCTOS DE EJEMPLO ── */
const productos = [
  {
    id: 1,
    nombre: "Llaveros Sanrio x Conejito",
    categoria: "accesorios",
    precio: 42,
    precioOld: null,
    promoLabel: "Promo 2x70 soles",
    imagen: "/attachments/foto mochila.png",
    imagenes: [
      "/attachments/foto mochila.png",
      "/attachments/foto mochila.png",
      "/attachments/foto mochila.png"
    ],
    descripcion: "Llavero Sanrio con pijama de conejito. Llavero dorado de acero inoxidable, rostro en plástico duro y cuerpo de peluche suave. Tamaño: 20 cm de alto.",
    opciones: ["Hello Kitty", "My Melody", "Pochacco", "Kuromi", "Cinnamoroll"],
    badge: "⭐ Favorito",
    nuevo: true
  },
  {
    id: 2,
    nombre: "Blusa Floral Primavera",
    categoria: "blusas",
    precio: 65,
    precioOld: 85,
    promoLabel: null,
    imagen: "/attachments/foto mochila.png",
    imagenes: [],
    descripcion: "Blusa de tela suave con estampado floral, perfecta para el verano. Disponible en tallas S, M, L y XL.",
    opciones: ["S", "M", "L", "XL"],
    badge: "Nuevo",
    nuevo: true
  },
  {
    id: 3,
    nombre: "Aretes Corazón Esmalte",
    categoria: "aretes",
    precio: 25,
    precioOld: null,
    promoLabel: null,
    imagen: "/attachments/foto mochila.png",
    imagenes: [],
    descripcion: "Aretes colgantes con corazón esmaltado en varios colores. Cierre de mariposa hipoalergénico.",
    opciones: ["Rojo", "Rosa", "Morado", "Celeste"],
    badge: null,
    nuevo: false
  },
  {
    id: 4,
    nombre: "Bolso Mini Capibara",
    categoria: "bolsos",
    precio: 55,
    precioOld: 70,
    promoLabel: null,
    imagen: "/attachments/Capi Frambbuesas.png",
    imagenes: [],
    descripcion: "Bolso pequeño con diseño de capibara, correa ajustable, cierre metálico y compartimento interior con bolsillo.",
    opciones: ["Beige", "Rosa", "Verde menta"],
    badge: "Oferta",
    nuevo: false
  },
  {
    id: 5,
    nombre: "Pulsera Macramé Perú",
    categoria: "accesorios",
    precio: 18,
    precioOld: null,
    promoLabel: "3 x 50 soles",
    imagen: "/attachments/foto mochila.png",
    imagenes: [],
    descripcion: "Pulsera tejida a mano en macramé con dijes de plata. Ajustable, hecha con amor artesanal.",
    opciones: ["Único"],
    badge: "Hecho a mano",
    nuevo: false
  },
  {
    id: 6,
    nombre: "Caja Regalo Kawaii",
    categoria: "regalos",
    precio: 89,
    precioOld: null,
    promoLabel: null,
    imagen: "/attachments/Capibara Lista.png",
    imagenes: [],
    descripcion: "Caja sorpresa con productos seleccionados: aretes, pulsera, mini bolso y stickers. Empaque decorado con moño.",
    opciones: ["Sorpresa", "Solo aretes", "Solo accesorios"],
    badge: "🎁 Regalo",
    nuevo: true
  },
  {
    id: 7,
    nombre: "Aretes Mariposa Acrílico",
    categoria: "aretes",
    precio: 22,
    precioOld: 30,
    promoLabel: null,
    imagen: "/attachments/foto mochila.png",
    imagenes: [],
    descripcion: "Aretes de acrílico con forma de mariposa, ligeros y brillantes. Disponibles en varios colores pastel.",
    opciones: ["Lila", "Rosa", "Amarillo", "Verde"],
    badge: null,
    nuevo: false
  },
  {
    id: 8,
    nombre: "Blusa Bordada Capibara",
    categoria: "blusas",
    precio: 78,
    precioOld: null,
    promoLabel: null,
    imagen: "/attachments/Capi Moras.png",
    imagenes: [],
    descripcion: "Blusa blanca con bordado a mano de capibara en el pecho. Tela de algodón premium, fresca y cómoda.",
    opciones: ["S", "M", "L"],
    badge: "Exclusivo",
    nuevo: true
  }
];

/* ── ESTADO ── */
let carrito = JSON.parse(localStorage.getItem("naylin-cart") || "[]");
let categoriaActual = "todas";
let modalProducto = null;

/* ── INICIALIZACIÓN ── */
document.addEventListener("DOMContentLoaded", () => {
  renderGrid(productos);
  actualizarContadorCarrito();
  initNavbarScroll();
  renderCarrito();
});

/* ── NAVBAR SCROLL ── */
function initNavbarScroll() {
  const nav = document.getElementById("navbar");
  if (!nav) return;
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 60);
  });
}

/* ── MENÚ MÓVIL ── */
function toggleMenu() {
  const btn = document.getElementById("menu-btn");
  const menu = document.getElementById("mobile-menu");
  if (!btn || !menu) return;
  btn.classList.toggle("open");
  menu.classList.toggle("open");
}

/* ── FILTRO DE CATEGORÍAS ── */
function filterCategory(cat) {
  categoriaActual = cat;
  document.querySelectorAll(".cat-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.cat === cat);
  });
  const filtrados = cat === "todas" ? productos : productos.filter(p => p.categoria === cat);
  renderGrid(filtrados);
}

/* ── RENDER GRID ── */
function renderGrid(lista) {
  const grid = document.getElementById("grid-productos");
  if (!grid) return;

  if (lista.length === 0) {
    grid.innerHTML = `
      <div class="grid-empty">
        <i class="fa-solid fa-box-open"></i>
        <p>No hay productos en esta categoría</p>
      </div>`;
    return;
  }

  grid.innerHTML = lista.map(p => `
    <article class="product-card" onclick="openModal(${p.id})">
      <div class="product-img-wrap">
        <img src="${p.imagen}" alt="${p.nombre}" loading="lazy" onerror="this.style.opacity='0.3'">
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}
        ${p.promoLabel ? `<span class="product-promo-tag">${p.promoLabel}</span>` : ""}
        <button class="product-wishlist" onclick="event.stopPropagation(); wishlist(${p.id})" aria-label="Favorito">
          <i class="fa-regular fa-heart"></i>
        </button>
      </div>
      <div class="product-info">
        <span class="product-cat">${p.categoria}</span>
        <h3 class="product-name">${p.nombre}</h3>
        <p class="product-desc">${p.descripcion.substring(0, 80)}…</p>
        <div class="product-footer">
          <div class="product-price">
            S/ ${p.precio.toFixed(2)}
            ${p.precioOld ? `<span>S/ ${p.precioOld.toFixed(2)}</span>` : ""}
          </div>
          <button class="add-cart-btn" onclick="event.stopPropagation(); quickAdd(${p.id})">
            + Agregar
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

/* ── QUICK ADD (sin opciones) ── */
function quickAdd(id) {
  const prod = productos.find(p => p.id === id);
  if (!prod) return;
  if (prod.opciones && prod.opciones.length > 1) {
    openModal(id);
    return;
  }
  agregarAlCarrito(prod, 1, prod.opciones?.[0] || "");
}

/* ── MODAL PRODUCTO ── */
function openModal(id) {
  const prod = productos.find(p => p.id === id);
  if (!prod) return;
  modalProducto = prod;

  // Eliminar modal anterior
  document.getElementById("product-modal")?.remove();

  const opcionesHtml = prod.opciones && prod.opciones.length > 1
    ? `<div class="modal-field">
        <label class="modal-label">Elegir</label>
        <div class="modal-options" id="modal-opts">
          ${prod.opciones.map((o, i) => `
            <label class="opt-check ${i === 0 ? "selected" : ""}">
              <input type="checkbox" value="${o}" ${i === 0 ? "checked" : ""} onchange="toggleOpcion(this)">
              ${o}
            </label>
          `).join("")}
        </div>
       </div>`
    : "";

  const promoHtml = prod.promoLabel
    ? `<div class="modal-promo">${prod.promoLabel}</div>`
    : "";

  const precioHtml = prod.precioOld
    ? `<div class="modal-price-wrap">
        <span class="modal-price-old">S/ ${prod.precioOld.toFixed(2)}</span>
        <span class="modal-price">S/ ${prod.precio.toFixed(2)}</span>
       </div>`
    : `<span class="modal-price">S/ ${prod.precio.toFixed(2)}</span>`;

  const modal = document.createElement("div");
  modal.id = "product-modal";
  modal.className = "modal-overlay";
  modal.innerHTML = `
    <div class="modal-box" onclick="event.stopPropagation()">
      <button class="modal-close" onclick="closeModal()"><i class="fa-solid fa-xmark"></i></button>
      <div class="modal-layout">
        <div class="modal-gallery">
          <div class="modal-main-img">
            <img src="${prod.imagen}" alt="${prod.nombre}" id="modal-img-main" onerror="this.style.opacity='0.3'">
          </div>
          ${prod.imagenes && prod.imagenes.length > 0 ? `
          <div class="modal-thumbs">
            ${prod.imagenes.map((im, i) => `
              <img src="${im}" class="modal-thumb ${i===0?"active":""}" onclick="changeModalImg('${im}', this)" alt="Foto ${i+1}">
            `).join("")}
          </div>` : ""}
        </div>
        <div class="modal-info">
          <span class="product-cat">${prod.categoria}</span>
          <h2 class="modal-title">${prod.nombre}</h2>
          <div class="modal-prices">${precioHtml}</div>
          <p class="modal-desc">${prod.descripcion}</p>
          <div class="modal-field">
            <label class="modal-label">Cantidad</label>
            <div class="qty-control">
              <button onclick="changeQty(-1)" class="qty-btn">-</button>
              <span id="modal-qty">1</span>
              <button onclick="changeQty(1)" class="qty-btn">+</button>
            </div>
          </div>
          ${opcionesHtml}
          <button class="btn-primary btn-full modal-add-btn" onclick="addFromModal()">
            <i class="fa-solid fa-bag-shopping"></i> Añadir al Carrito
          </button>
          ${promoHtml}
        </div>
      </div>
    </div>`;

  modal.onclick = closeModal;
  document.body.appendChild(modal);
  document.body.style.overflow = "hidden";
  requestAnimationFrame(() => modal.classList.add("open"));
}

function closeModal() {
  const modal = document.getElementById("product-modal");
  if (!modal) return;
  modal.classList.remove("open");
  setTimeout(() => { modal.remove(); document.body.style.overflow = ""; }, 300);
}

function changeModalImg(src, el) {
  document.getElementById("modal-img-main").src = src;
  document.querySelectorAll(".modal-thumb").forEach(t => t.classList.remove("active"));
  el.classList.add("active");
}

function changeQty(delta) {
  const el = document.getElementById("modal-qty");
  if (!el) return;
  let qty = parseInt(el.textContent) + delta;
  if (qty < 1) qty = 1;
  if (qty > 99) qty = 99;
  el.textContent = qty;
}

function toggleOpcion(cb) {
  const label = cb.closest(".opt-check");
  label.classList.toggle("selected", cb.checked);
}

function addFromModal() {
  if (!modalProducto) return;
  const qty = parseInt(document.getElementById("modal-qty")?.textContent || "1");
  const checked = [...document.querySelectorAll("#modal-opts input:checked")].map(c => c.value);
  const opcion = checked.length > 0 ? checked.join(", ") : (modalProducto.opciones?.[0] || "");
  agregarAlCarrito(modalProducto, qty, opcion);
  closeModal();
}

function wishlist(id) {
  showToast("¡Agregado a favoritos! ❤️");
}

/* ── CARRITO ── */
function agregarAlCarrito(prod, qty, opcion) {
  const key = `${prod.id}-${opcion}`;
  const existing = carrito.find(c => c.key === key);
  if (existing) {
    existing.qty += qty;
  } else {
    carrito.push({ key, id: prod.id, nombre: prod.nombre, precio: prod.precio, imagen: prod.imagen, opcion, qty });
  }
  guardarCarrito();
  actualizarContadorCarrito();
  renderCarrito();
  showToast(`${prod.nombre} agregado al carrito`);
}

function guardarCarrito() {
  localStorage.setItem("naylin-cart", JSON.stringify(carrito));
}

function actualizarContadorCarrito() {
  const el = document.getElementById("cart-count");
  if (!el) return;
  const total = carrito.reduce((s, c) => s + c.qty, 0);
  el.textContent = total;
  el.style.transform = "scale(1.4)";
  setTimeout(() => { el.style.transform = "scale(1)"; }, 200);
}

function renderCarrito() {
  const itemsEl = document.getElementById("cart-items");
  const footerEl = document.getElementById("cart-footer");
  const totalEl = document.getElementById("cart-total");
  if (!itemsEl) return;

  if (carrito.length === 0) {
    itemsEl.innerHTML = `
      <div class="cart-empty">
        <i class="fa-solid fa-bag-shopping"></i>
        <p>Tu carrito está vacío</p>
      </div>`;
    if (footerEl) footerEl.style.display = "none";
    return;
  }

  itemsEl.innerHTML = carrito.map(item => `
    <div class="cart-item">
      <img src="${item.imagen}" alt="${item.nombre}" onerror="this.style.opacity='0.2'">
      <div class="cart-item-info">
        <p class="cart-item-name">${item.nombre}</p>
        ${item.opcion ? `<p class="cart-item-variant">${item.opcion}</p>` : ""}
        <div class="cart-item-qty-row">
          <button class="cart-qty-btn" onclick="cambiarQtyCarrito('${item.key}', -1)">-</button>
          <span>${item.qty}</span>
          <button class="cart-qty-btn" onclick="cambiarQtyCarrito('${item.key}', 1)">+</button>
        </div>
        <p class="cart-item-price">S/ ${(item.precio * item.qty).toFixed(2)}</p>
      </div>
      <button class="cart-item-remove" onclick="eliminarDelCarrito('${item.key}')" aria-label="Eliminar">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  `).join("");

  const total = carrito.reduce((s, c) => s + c.precio * c.qty, 0);
  if (totalEl) totalEl.textContent = `S/ ${total.toFixed(2)}`;
  if (footerEl) footerEl.style.display = "flex";

  // Armar mensaje WhatsApp
  const waBtn = footerEl?.querySelector("a");
  if (waBtn) {
    const msg = "¡Hola! Quiero hacer un pedido:%0A%0A" +
      carrito.map(c => `▸ ${c.nombre}${c.opcion ? " (" + c.opcion + ")" : ""} x${c.qty} — S/ ${(c.precio * c.qty).toFixed(2)}`).join("%0A") +
      "%0A%0A*Total: S/ " + total.toFixed(2) + "*";
    waBtn.href = `https://wa.me/51925458744?text=${msg}`;
  }
}

function cambiarQtyCarrito(key, delta) {
  const item = carrito.find(c => c.key === key);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) { eliminarDelCarrito(key); return; }
  guardarCarrito();
  actualizarContadorCarrito();
  renderCarrito();
}

function eliminarDelCarrito(key) {
  carrito = carrito.filter(c => c.key !== key);
  guardarCarrito();
  actualizarContadorCarrito();
  renderCarrito();
}

function toggleCart() {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("cart-overlay");
  const isOpen = drawer?.classList.contains("open");
  drawer?.classList.toggle("open", !isOpen);
  overlay?.classList.toggle("open", !isOpen);
  document.body.style.overflow = isOpen ? "" : "hidden";
}

/* ── TOAST ── */
function showToast(msg) {
  const toast = document.getElementById("toast");
  const msgEl = document.getElementById("toast-msg");
  if (!toast || !msgEl) return;
  msgEl.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => toast.classList.remove("show"), 3000);
}