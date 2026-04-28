let cart = [];
const MY_WHATSAPP = "51925458744";

const products = [
  // Blusas
  { id: 0, category: "blusas", name: "Blusa Floral Romance", price: 89.90, image: "https://picsum.photos/id/1015/600/800", description: "Blusa delicada con estampado floral romántico." },
  { id: 1, category: "blusas", name: "Blusa Blanca Elegante", price: 79.90, image: "https://picsum.photos/id/201/600/800", description: "Blusa básica blanca con detalles de encaje." },
  { id: 2, category: "blusas", name: "Blusa Rosa Pastel", price: 85.00, image: "https://picsum.photos/id/237/600/800", description: "Blusa manga larga en tono rosa suave." },

  // Aretes
  { id: 3, category: "aretes", name: "Aretes Perla Dorada", price: 34.90, image: "https://picsum.photos/id/180/600/800", description: "Aretes con perlas naturales y acabado dorado." },
  { id: 4, category: "aretes", name: "Aretes Aro Minimal", price: 29.90, image: "https://picsum.photos/id/133/600/800", description: "Aros finos minimalistas." },
  { id: 5, category: "aretes", name: "Aretes Corazón", price: 39.90, image: "https://picsum.photos/id/160/600/800", description: "Aretes con dije en forma de corazón." },

  // Accesorios
  { id: 6, category: "accesorios", name: "Collar Corazón Minimal", price: 49.90, image: "https://picsum.photos/id/201/600/800", description: "Collar delicado con dije de corazón." },
  { id: 7, category: "accesorios", name: "Pulsera Cadena Dorada", price: 45.00, image: "https://picsum.photos/id/251/600/800", description: "Pulsera fina de cadena dorada." },
  { id: 8, category: "accesorios", name: "Anillo Ajustable", price: 25.90, image: "https://picsum.photos/id/270/600/800", description: "Anillo delicado ajustable." },

  // Regalos
  { id: 9, category: "regalos", name: "Set de Pulseras Amistad", price: 65.00, image: "https://picsum.photos/id/180/600/800", description: "Set de 3 pulseras para compartir." },
  { id: 10, category: "regalos", name: "Caja de Regalo Floral", price: 95.00, image: "https://picsum.photos/id/133/600/800", description: "Caja con accesorios y nota personalizada." },
  { id: 11, category: "regalos", name: "Espejo de Bolsillo", price: 38.90, image: "https://picsum.photos/id/160/600/800", description: "Espejo compacto con diseño floral." },

  // Bolsos
  { id: 12, category: "bolsos", name: "Bolso Tote Beige", price: 119.90, image: "https://picsum.photos/id/201/600/800", description: "Bolso tote amplio en tono beige." },
  { id: 13, category: "bolsos", name: "Bolso Cruzado Negro", price: 89.90, image: "https://picsum.photos/id/237/600/800", description: "Bolso bandolera negro elegante." },
  { id: 14, category: "bolsos", name: "Mini Bolso Rosa", price: 75.00, image: "https://picsum.photos/id/251/600/800", description: "Mini bolso crossbody en rosa pastel." }
];

// Renderizar todos los productos
function renderProducts() {
  const container = document.getElementById('grid-productos');
  container.innerHTML = '';

  products.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product-item';
    div.setAttribute('data-category', product.category);
    div.innerHTML = `
      <div class="product-card cursor-pointer" onclick="showProductModal(${product.id})">
        <div class="h-80 overflow-hidden rounded-t-3xl">
          <img src="${product.image}" class="w-full h-full object-cover hover:scale-110 transition duration-500">
        </div>
        <div class="p-6">
          <h3 class="font-semibold text-lg">${product.name}</h3>
          <p class="text-[#9E182B] font-bold text-2xl mt-1">S/ ${product.price.toFixed(2)}</p>
        </div>
      </div>
    `;
    container.appendChild(div);
  });
}

let currentQuantity = 1;

function showProductModal(id) {
  const p = products.find(prod => prod.id === id);
  if (!p) return;

  const html = `
    <div class="grid md:grid-cols-2 gap-8">
      <div>
        <img src="${p.image}" class="w-full rounded-2xl shadow-md" alt="${p.name}">
      </div>
      <div>
        <h2 class="text-3xl font-bold text-[#9E182B]">${p.name}</h2>
        <p class="text-4xl font-bold mt-4 text-[#55634A]">S/ ${p.price.toFixed(2)}</p>
        
        <p class="mt-6 text-gray-600">${p.description}</p>

        <!-- Cantidad -->
        <div class="mt-8">
          <p class="font-medium text-gray-500 mb-2">Cantidad</p>
          <div class="flex items-center gap-6">
            <button onclick="changeQuantity(-1)" class="w-11 h-11 border rounded-full text-2xl hover:bg-gray-100 flex items-center justify-center">-</button>
            <span id="modal-quantity" class="text-2xl font-semibold w-12 text-center">1</span>
            <button onclick="changeQuantity(1)" class="w-11 h-11 border rounded-full text-2xl hover:bg-gray-100 flex items-center justify-center">+</button>
          </div>
        </div>

        <button onclick="addToCartFromModal(${p.id})" 
                class="mt-10 w-full bg-[#9E182B] hover:bg-[#bc5f66] text-white py-6 rounded-2xl text-lg font-semibold transition">
          Añadir al Carrito
        </button>
      </div>
    </div>
  `;

  document.getElementById('modal-content').innerHTML = html;
  document.getElementById('product-modal').classList.remove('hidden');
  document.getElementById('product-modal').classList.add('flex');
}

function changeQuantity(amount) {
  currentQuantity = Math.max(1, currentQuantity + amount);
  const el = document.getElementById('modal-quantity');
  if (el) el.textContent = currentQuantity;
}

function addToCartFromModal(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  for (let i = 0; i < currentQuantity; i++) {
    cart.push({ name: product.name, price: product.price });
  }

  showNotification(`Se agregaron ${currentQuantity} unidad(es)`);
  updateUI();
  closeModal();
  currentQuantity = 1;
}

function closeModal() {
  const modal = document.getElementById('product-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

function showNotification(text) {
  const notif = document.getElementById('notification');
  document.getElementById('notification-text').textContent = text;
  notif.classList.remove('hidden');
  setTimeout(() => notif.classList.add('hidden'), 2500);
}

function toggleCart() {
  document.getElementById('cart-sidebar').classList.toggle('open');
}

function updateUI() {
  const container = document.getElementById('cart-items');
  const count = document.getElementById('cart-count');
  const totalEl = document.getElementById('cart-total');

  count.textContent = cart.length;

  if (cart.length === 0) {
    container.innerHTML = `<p class="text-gray-400 text-center py-16">Tu carrito está vacío</p>`;
    totalEl.textContent = "S/ 0.00";
    return;
  }

  let total = 0;
  container.innerHTML = '';

  cart.forEach((item, index) => {
    total += item.price;
    container.innerHTML += `
      <div class="flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
        <div class="flex-1">
          <p class="font-medium">${item.name}</p>
          <p class="text-[#9E182B] font-bold">S/ ${item.price.toFixed(2)}</p>
        </div>
        <button onclick="removeFromCart(${index})" class="text-red-500 text-3xl hover:text-red-700">×</button>
      </div>
    `;
  });

  totalEl.textContent = `S/ ${total.toFixed(2)}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateUI();
}

function checkout() {
  if (cart.length === 0) return alert("El carrito está vacío");

  let msg = "¡Hola Naylin Shop! ✨ Mi pedido:\n\n";
  let total = 0;

  cart.forEach(item => {
    msg += `• ${item.name} - S/ ${item.price.toFixed(2)}\n`;
    total += item.price;
  });

  msg += `\n*TOTAL: S/ ${total.toFixed(2)}*`;

  window.open(`https://wa.me/${MY_WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank');
}

function filterCategory(cat) {
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');

  document.querySelectorAll('.product-item').forEach(item => {
    item.style.display = (cat === 'todas' || item.getAttribute('data-category') === cat) ? 'block' : 'none';
  });
}

// Menú Hamburguesa para móvil
document.getElementById('menu-button').addEventListener('click', () => {
  const mobileMenu = document.getElementById('mobile-menu');
  mobileMenu.classList.toggle('hidden');
});

// Inicializar productos
renderProducts();

// Scroll para ocultar logo
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Cerrar modal con tecla ESC
document.addEventListener('keydown', (e) => {
  if (e.key === "Escape") closeModal();
});