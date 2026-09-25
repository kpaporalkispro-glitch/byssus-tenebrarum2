
window.BYSSUS = {
  async products() {
    if (!this._products) {
      const r = await fetch('data/products.json');
      this._products = await r.json();
    }
    return this._products;
  },
  money(v) { return new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR'}).format(v); },
  card(p) {
    return `<article class="product-card">
      <a href="product.html?id=${encodeURIComponent(p.id)}" class="product-image"><img src="${p.image}" alt="${p.name}"></a>
      <button class="heart" aria-label="Ajouter aux favoris">♡</button>
      <div class="product-meta">
        <a href="product.html?id=${encodeURIComponent(p.id)}"><h3>${p.name}</h3></a>
        <p>${p.stone}</p>
        <div class="product-bottom"><strong>${this.money(p.price)}</strong><button class="mini-cart" data-add="${p.id}">Ajouter au panier</button></div>
      </div>
    </article>`;
  }
};

document.addEventListener('click', async (e) => {
  const b = e.target.closest('[data-add]');
  if (!b) return;
  const products = await BYSSUS.products();
  const p = products.find(x => x.id === b.dataset.add);
  if (p) {
    addToCart(p, 1);
    b.textContent = 'Ajouté ✓';
    setTimeout(()=> b.textContent='Ajouter au panier', 900);
  }
});

document.addEventListener('DOMContentLoaded', updateCartCount);
