let cart = [];
const MY_WHATSAPP = "51925458744";

const products = [
  { id: 0, category: "blusas", name: "Blusa Floral Romance", price: 89.90, image: "https://picsum.photos/id/1015/600/800", description: "Blusa delicada con estampado floral romántico." },
  { id: 1, category: "blusas", name: "Blusa Blanca Elegante", price: 79.90, image: "https://picsum.photos/id/201/600/800", description: "Blusa básica blanca con detalles de encaje." },
  { id: 2, category: "blusas", name: "Blusa Rosa Pastel", price: 85.00, image: "https://picsum.photos/id/237/600/800", description: "Blusa manga larga en tono rosa suave." },
  { id: 3, category: "aretes", name: "Aretes Perla Dorada", price: 34.90, image: "https://picsum.photos/id/180/600/800", description: "Aretes con perlas naturales y acabado dorado." },
  { id: 4, category: "aretes", name: "Aretes Aro Minimal", price: 29.90, image: "https://picsum.photos/id/133/600/800", description: "Aros finos minimalistas." },
  { id: 5, category: "aretes", name: "Aretes Corazón", price: 39.90, image: "https://picsum.photos/id/160/600/800", description: "Aretes con dije en forma de corazón." },
  { id: 6, category: "accesorios", name: "Collar Corazón Minimal", price: 49.90, image: "https://picsum.photos/id/201/600/800", description: "Collar delicado con dije de corazón." },
  { id: 7, category: "accesorios", name: "Pulsera Cadena Dorada", price: 45.00, image: "https://picsum.photos/id/251/600/800", description: "Pulsera fina de cadena dorada." },
  { id: 8, category: "accesorios", name: "Anillo Ajustable", price: 25.90, image: "https://picsum.photos/id/270/600/800", description: "Anillo delicado ajustable." },
  { id: 9, category: "regalos", name: "Set de Pulseras Amistad", price: 65.00, image: "https://picsum.photos/id/180/600/800", description: "Set de 3 pulseras para compartir." },
  { id: 10, category: "regalos", name: "Caja de Regalo Floral", price: 95.00, image: "https://picsum.photos/id/133/600/800", description: "Caja con accesorios y nota personalizada." },
  { id: 11, category: "regalos", name: "Espejo de Bolsillo", price: 38.90, image: "https://picsum.photos/id/160/600/800", description: "Espejo compacto con diseño floral." },
  { id: 12, category: "bolsos", name: "Bolso Tote Beige", price: 119.90, image: "https://picsum.photos/id/201/600/800", description: "Bolso tote amplio en tono beige." },
  { id: 13, category: "bolsos", name: "Bolso Cruzado Negro", price: 89.90, image: "https://picsum.photos/id/237/600/800", description: "Bolso bandolera negro elegante." },
  { id: 14, category: "bolsos", name: "Mini Bolso Rosa", price: 75.00, image: "https://picsum.photos/id/251/600/800", description: "Mini bolso crossbody en rosa pastel." }
];

let currentQuantity = 1;
let currentProductId = null;

// Renderizar productos
function renderProducts() {
  const container = document.getElementById('grid-productos');
  container.innerHTML = '';

  products.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product-item';
    div.setAttribute('data-category', product.category);
    div.innerHTML = `
      <div class="product-card cursor-pointer" onclick="showProductModal(${product.id})">
        <div class="h-64 md:h-80 overflow-hidden">
          <img src="${product.image}" class="w-full h-full object-cover hover:scale-110 transition duration-500" alt="${product.name}">
        </div>
        <div class="p-5">
          <h3 class="font-semibold text-lg">${product.name}</h3>
          <p class="text-[#9E182B] font-bold text-2xl mt-2">S/ ${product.price.toFixed(2)}</p>
        </div>
      </div>
    `;
    container.appendChild(div);
  });
}

// Mostrar Modal
function showProductModal(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  currentProductId = id;
  currentQuantity = 1;

  const html = `
    <div class="relative">
      <button onclick="closeModal()" class="close-modal-btn absolute -top-4 -right-4 bg-white w-12 h-12 rounded-full text-4xl flex items-center justify-center shadow-xl z-10">×</button>
      
      <div class="grid md:grid-cols-2 gap-10">
        <!-- Imagen Principal -->
        <div>
          <img src="${product.image}" class="main-image" alt="${product.name}">
        </div>

        <!-- Información -->
        <div class="flex flex-col">
          <h2 class="text-3xl font-bold text-[#55634A]">${product.name}</h2>
          <p class="text-4xl font-bold text-[#9E182B] mt-4">S/ ${product.price.toFixed(2)}</p>
          
          <p class="mt-6 text-gray-600 leading-relaxed">${product.description}</p>

          <!-- Cantidad -->
          <div class="mt-8">
            <p class="font-medium text-gray-700 mb-3">Cantidad</p>
            <div class="flex items-center gap-6">
              <button onclick="changeQuantity(-1)" class="w-14 h-14 border-2 border-gray-300 rounded-2xl text-3xl hover:bg-gray-100">-</button>
              <span id="modal-quantity" class="text-4xl font-semibold w-16 text-center">${currentQuantity}</span>
              <button onclick="changeQuantity(1)" class="w-14 h-14 border-2 border-gray-300 rounded-2xl text-3xl hover:bg-gray-100">+</button>
            </div>
          </div>

          <div class="mt-auto pt-10">
            <button onclick="addToCartFromModal()" 
                    class="w-full bg-[#9E182B] hover:bg-[#c45a6a] text-white py-6 rounded-3xl text-xl font-semibold transition-all">
              Añadir al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('modal-content').innerHTML = html;
  document.getElementById('product-modal').classList.remove('hidden');
  document.getElementById('product-modal').classList.add('flex');
}

function changeQuantity(amount) {
  currentQuantity = Math.max(1, currentQuantity + amount);
  document.getElementById('modal-quantity').textContent = currentQuantity;
}

function addToCartFromModal() {
  const product = products.find(p => p.id === currentProductId);
  if (!product) return;

  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += currentQuantity;
  } else {
    cart.push({ ...product, quantity: currentQuantity });
  }

  showNotification(`Se agregaron ${currentQuantity} × ${product.name}`);
  updateCartUI();
  closeModal();

  setTimeout(() => {
    document.getElementById('cart-sidebar').classList.add('open');
  }, 300);
}

function closeModal() {
  const modal = document.getElementById('product-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

// Carrito
function updateCartUI() {
  const container = document.getElementById('cart-items');
  const count = document.getElementById('cart-count');
  const totalEl = document.getElementById('cart-total');

  const totalItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
  count.textContent = totalItems;

  if (cart.length === 0) {
    container.innerHTML = `<p class="text-gray-400 text-center py-20">Tu carrito está vacío</p>`;
    totalEl.textContent = "S/ 0.00";
    return;
  }

  let total = 0;
  container.innerHTML = '';

  cart.forEach((item, index) => {
    const subtotal = item.price * (item.quantity || 1);
    total += subtotal;
    container.innerHTML += `
      <div class="flex gap-4 bg-gray-50 p-4 rounded-2xl">
        <img src="${item.image}" class="w-20 h-20 object-cover rounded-xl">
        <div class="flex-1">
          <p class="font-medium">${item.name}</p>
          <p class="text-[#9E182B] font-bold">S/ ${item.price.toFixed(2)}</p>
          <div class="flex items-center gap-4 mt-2">
            <button onclick="changeCartQuantity(${index}, -1)" class="px-3 py-1 border rounded">-</button>
            <span>${item.quantity || 1}</span>
            <button onclick="changeCartQuantity(${index}, 1)" class="px-3 py-1 border rounded">+</button>
            <button onclick="removeFromCart(${index})" class="ml-auto text-red-500 text-xl">×</button>
          </div>
        </div>
      </div>
    `;
  });

  totalEl.textContent = `S/ ${total.toFixed(2)}`;
}

function changeCartQuantity(index, amount) {
  if (!cart[index]) return;
  cart[index].quantity = (cart[index].quantity || 1) + amount;
  if (cart[index].quantity < 1) cart[index].quantity = 1;
  updateCartUI();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

function toggleCart() {
  document.getElementById('cart-sidebar').classList.toggle('open');
}

function checkout() {
  if (cart.length === 0) return alert("El carrito está vacío");

  let msg = "¡Hola Naylin Shop! ✨\n\nMi pedido:\n\n";
  let total = 0;

  cart.forEach(item => {
    const qty = item.quantity || 1;
    msg += `• ${qty}x ${item.name} - S/ ${(item.price * qty).toFixed(2)}\n`;
    total += item.price * qty;
  });

  msg += `\n*TOTAL: S/ ${total.toFixed(2)}*`;

  window.open(`https://wa.me/${MY_WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank');
}

function filterCategory(cat) {
  document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
  const activeBtn = Array.from(document.querySelectorAll('.cat-btn')).find(b => 
    b.getAttribute('onclick').includes(`'${cat}'`)
  );
  if (activeBtn) activeBtn.classList.add('active');

  document.querySelectorAll('.product-item').forEach(item => {
    item.style.display = (cat === 'todas' || item.getAttribute('data-category') === cat) ? 'block' : 'none';
  });
}

function showNotification(text) {
  const notif = document.getElementById('notification');
  document.getElementById('notification-text').textContent = text;
  notif.classList.remove('hidden');
  setTimeout(() => notif.classList.add('hidden'), 2800);
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();

  document.getElementById('menu-button').addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.toggle('hidden');
  });

  window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 80) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  });
});