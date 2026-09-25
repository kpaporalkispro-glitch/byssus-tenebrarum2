
let promo=0;
function renderCart(){
  const items=getCart(), box=document.getElementById('cartItems');
  if(!items.length){box.innerHTML='<div class="empty">Votre panier est vide.<br><a class="btn ghost" href="collections.html">Découvrir la boutique</a></div>';}
  else box.innerHTML=items.map(i=>`<div class="cart-item"><img src="${i.image}"><div><strong>${i.name}</strong><small>${i.options?Object.values(i.options).join(' · '):''}</small></div><div class="cart-qty"><button data-minus="${i.key}">−</button><span>${i.qty}</span><button data-plus="${i.key}">+</button></div><b>${BYSSUS.money(i.price*i.qty)}</b><button data-remove="${i.key}">×</button></div>`).join('');
  const sub=items.reduce((s,i)=>s+i.price*i.qty,0), discount=sub*promo, total=sub-discount;
  subtotal.textContent=BYSSUS.money(sub); document.getElementById('discount').textContent='− '+BYSSUS.money(discount); grandTotal.textContent=BYSSUS.money(total);
}
document.addEventListener('click',(e)=>{
  if(e.target.dataset.remove){removeCartItem(e.target.dataset.remove);renderCart();}
  if(e.target.dataset.minus){const i=getCart().find(x=>x.key===e.target.dataset.minus);setCartQty(i.key,i.qty-1);renderCart();}
  if(e.target.dataset.plus){const i=getCart().find(x=>x.key===e.target.dataset.plus);setCartQty(i.key,i.qty+1);renderCart();}
});
document.addEventListener('DOMContentLoaded',()=>{
  renderCart();
  applyPromo.onclick=()=>{promo=promoCode.value.trim().toUpperCase()==='BYSSUS10'?0.10:0; alert(promo?'Code appliqué : -10%':'Code invalide. Essayez BYSSUS10 pour la démo.');renderCart();};
  checkoutButton.onclick=()=>{if(!getCart().length)return alert('Votre panier est vide.'); alert('Étape suivante : remplacez cette action par votre lien Stripe Checkout / PayPal.');};
});
