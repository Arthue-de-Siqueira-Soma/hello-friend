// Personalize these settings before publishing.
const WHATSAPP_NUMBER = ""; // Example: "5548999999999" (country code + area code + number, digits only)
const DELIVERY_FEE = 0; // Set your delivery fee in BRL, if applicable.

const pizzas = {
  "Margherita": { price: 39.90 },
  "Pepperoni": { price: 44.90 },
  "Forno & Brasa": { price: 49.90 },
  "Quatro Queijos": { price: 47.90 },
  "Chocolate": { price: 35.90 },
  "Calabresa": { price: 42.90 }
};
const cart = {};
const money = value => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const cartCount = document.getElementById("cart-count");
const orderDialog = document.getElementById("order-dialog");
const toast = document.getElementById("toast");
let toastTimeout;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 2600);
}
function getCount() {
  return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
}
function getSubtotal() {
  return Object.entries(cart).reduce((sum, [name, quantity]) => sum + pizzas[name].price * quantity, 0);
}
function renderCart() {
  const count = getCount();
  cartCount.textContent = count;
  const items = document.getElementById("order-items");
  const entries = Object.entries(cart).filter(([, quantity]) => quantity > 0);
  if (!entries.length) {
    items.innerHTML = '<p class="empty-cart">Seu pedido ainda está vazio. Escolha uma pizza do cardápio!</p>';
  } else {
    items.innerHTML = entries.map(([name, quantity]) => `
      <div class="order-row">
        <div><strong>${name}</strong><small>${money(pizzas[name].price)} cada · ${money(pizzas[name].price * quantity)}</small></div>
        <div class="quantity-controls">
          <button type="button" data-change="-1" data-name="${name}" aria-label="Remover uma ${name}">−</button>
          <span>${quantity}</span>
          <button type="button" data-change="1" data-name="${name}" aria-label="Adicionar uma ${name}">+</button>
        </div>
      </div>`).join("");
  }
  document.getElementById("order-total").textContent = money(getSubtotal() + (count ? DELIVERY_FEE : 0));
}
function changeQuantity(name, amount) {
  if (!pizzas[name]) return;
  cart[name] = (cart[name] || 0) + amount;
  if (cart[name] <= 0) delete cart[name];
  renderCart();
}
document.querySelectorAll(".add-button").forEach(button => {
  button.addEventListener("click", () => {
    const name = button.dataset.pizza;
    changeQuantity(name, 1);
    showToast(name + " adicionada ao pedido.");
  });
});
document.getElementById("order-items").addEventListener("click", event => {
  const button = event.target.closest("[data-change]");
  if (button) changeQuantity(button.dataset.name, Number(button.dataset.change));
});
document.getElementById("view-order").addEventListener("click", () => {
  renderCart();
  orderDialog.showModal();
});
document.getElementById("close-order").addEventListener("click", () => orderDialog.close());
orderDialog.addEventListener("click", event => {
  if (event.target === orderDialog) orderDialog.close();
});

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(filter => filter.classList.toggle("active", filter === button));
    document.querySelectorAll(".pizza-card").forEach(card => {
      card.hidden = button.dataset.filter !== "todas" && card.dataset.category !== button.dataset.filter;
    });
  });
});
const menuToggle = document.getElementById("menu-toggle");
const navigation = document.getElementById("navigation");
menuToggle.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  menuToggle.textContent = isOpen ? "×" : "☰";
});
navigation.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navigation.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
  menuToggle.textContent = "☰";
}));
document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("checkout").addEventListener("click", () => {
  const entries = Object.entries(cart).filter(([, quantity]) => quantity > 0);
  if (!entries.length) {
    showToast("Adicione pelo menos uma pizza antes de finalizar.");
    return;
  }
  if (!/^\d{12,13}$/.test(WHATSAPP_NUMBER)) {
    showToast("Configure o número do WhatsApp no arquivo script.js antes de receber pedidos.");
    return;
  }
  const name = document.getElementById("customer-name").value.trim();
  const address = document.getElementById("customer-address").value.trim();
  if (!name || !address) {
    showToast("Informe seu nome e endereço de entrega.");
    return;
  }
  const lines = entries.map(([pizza, quantity]) => `• ${pizza} x${quantity} — ${money(pizzas[pizza].price * quantity)}`);
  const total = getSubtotal() + DELIVERY_FEE;
  const message = [
    "Olá! Quero fazer um pedido na Forno & Brasa:",
    "",
    ...lines,
    "",
    `Subtotal: ${money(getSubtotal())}`,
    `Entrega: ${money(DELIVERY_FEE)}`,
    `TOTAL: ${money(total)}`,
    "",
    `Nome: ${name}`,
    `Endereço: ${address}`
  ].join("\n");
  window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message), "_blank", "noopener,noreferrer");
});
document.getElementById("footer-whatsapp").addEventListener("click", event => {
  if (!/^\d{12,13}$/.test(WHATSAPP_NUMBER)) {
    event.preventDefault();
    showToast("Configure o número do WhatsApp no arquivo script.js.");
  }
});
renderCart();