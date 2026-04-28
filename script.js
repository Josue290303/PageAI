let cart = [];
const MY_WHATSAPP = "51925458744";

const products = [
  { id: 0, name: "Blusa Floral Romance", price: 89.90, category: "blusas", image: "https://picsum.photos/id/1015/800/1000", description: "Blusa delicada con estampado floral romántico. Tejido suave y ligero.", material: "Algodón premium", size: "S, M, L" },
  { id: 1, name: "Aretes Perla Dorada", price: 34.90, category: "aretes", image: "https://picsum.photos/id/237/800/1000", description: "Elegantes aretes con perlas naturales y acabado en oro.", material: "Perla + Acero inoxidable", size: "Talla única" },
  { id: 2, name: "Collar Corazón Minimal", price: 49.90, category: "accesorios", image: "https://picsum.photos/id/201/800/1000", description: "Collar minimalista con delicado dije en forma de corazón.", material: "Acero inoxidable", size: "Cadena ajustable" },
  { id: 3, name: "Set de Pulseras Amistad", price: 65.00, category: "regalos", image: "https://picsum.photos/id/180/800/1000", description: "Hermoso set de pulseras ideal para compartir con alguien especial.", material: "Hilo encerado + Acero", size: "Ajustable" }
];

function showProductModal(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  document.getElementById('modal-content').innerHTML = `
    <div class="grid md:grid-cols-2 gap-8">
      <img src="${product.image}" class="w-full rounded-2xl" alt="${product.name}">
      <div>
        <h2 class="text-3xl font-bold text-[#55634A]">${product.name}</h2>
        <p class="text-4xl font-bold text-[#9E182B] mt-4">S/ ${product.price.toFixed(2)}</p>
        <p class="mt-6 text-gray-600">${product.description}</p>
        <div class="mt-8 space-y-3 text-sm">
          <p><strong>Material:</strong> ${product.material}</p>
          <p><strong>Tallas:</strong> ${product.size}</p>
        </div>
        <button onclick="addToCartFromModal(${product.id}); closeModal()" 
                class="mt-10 w-full bg-[#9E182B] hover:bg-[#F2AFBC] text-white py-5 rounded-2xl font-semibold transition">
          Agregar al Carrito
        </button>
      </div>
    </div>
  `;

  document.getElementById('product-modal').classList.remove('hidden');
  document.getElementById('product-modal').classList.add('flex');
}

function closeModal() {
  const modal = document.getElementById('product-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

function addToCartFromModal(id) {
  const product = products.find(p => p.id === id);
  if (product) {
    cart.push({ name: product.name, price: product.price });
    updateUI();
  }
}

function toggleCart() {
  document.getElementById('cart-sidebar').classList.toggle('open');
}

function updateUI() {
  const container = document.getElementById('cart-items');
  const count = document.getElementById('cart-count');
  const totalEl = document.getElementById('cart-total');

  count.innerText = cart.length;

  if (cart.length === 0) {
    container.innerHTML = `<p class="text-gray-400 text-center py-16">Tu carrito está vacío</p>`;
    totalEl.innerText = "S/ 0.00";
    return;
  }

  let total = 0;
  container.innerHTML = '';

  cart.forEach((item, index) => {
    total += item.price;
    container.innerHTML += `
      <div class="flex justify-between bg-gray-50 p-4 rounded-2xl">
        <div>
          <p class="font-medium">${item.name}</p>
          <p class="text-[#9E182B] font-bold">S/ ${item.price.toFixed(2)}</p>
        </div>
        <button onclick="removeFromCart(${index})" class="text-red-500">🗑</button>
      </div>
    `;
  });

  totalEl.innerText = `S/ ${total.toFixed(2)}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateUI();
}

function checkout() {
  if (cart.length === 0) return alert("Agrega productos al carrito");

  let msg = "¡Hola Naylin Shop! ✨ Quiero comprar:\n\n";
  let total = 0;

  cart.forEach(prod => {
    msg += `• ${prod.name} - S/ ${prod.price.toFixed(2)}\n`;
    total += prod.price;
  });

  msg += `\n*TOTAL: S/ ${total.toFixed(2)}*`;
  msg += `\n\n¿Me pueden confirmar disponibilidad y envío?`;

  window.open(`https://wa.me/${MY_WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank');
}

function filterCategory(cat) {
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');

  document.querySelectorAll('.product-item').forEach(item => {
    item.style.display = (cat === 'todas' || item.dataset.category === cat) ? 'block' : 'none';
  });
}

// Cerrar modal con tecla ESC
document.addEventListener('keydown', (e) => {
  if (e.key === "Escape") closeModal();
});