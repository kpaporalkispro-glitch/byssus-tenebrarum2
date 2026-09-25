
let current, qty=1;
document.addEventListener('DOMContentLoaded', async ()=>{
  const products=await BYSSUS.products();
  const id=new URLSearchParams(location.search).get('id')||products[0].id;
  current=products.find(p=>p.id===id)||products[0];
  productImage.src=current.image; productImage.alt=current.name;
  productName.textContent=current.name; productCategory.textContent=current.category.toUpperCase();
  productStone.textContent=current.stone+' — Micro-macramé'; productPrice.textContent=BYSSUS.money(current.price);
  productDescription.textContent=current.desc;
  productThumbs.innerHTML=[1,2,3].map(()=>`<button><img src="${current.image}" alt=""></button>`).join('');
  relatedProducts.innerHTML=products.filter(p=>p.id!==current.id).slice(0,5).map(p=>BYSSUS.card(p)).join('');
  minusQty.onclick=()=>{qty=Math.max(1,qty-1);qtyValue.textContent=qty};
  plusQty.onclick=()=>{qty++;qtyValue.textContent=qty};
  addDetailToCart.onclick=()=>{addToCart(current,qty,{pierre:productVariant.value});addDetailToCart.textContent='Ajouté ✓';};
  buyNow.onclick=()=>{addToCart(current,qty,{pierre:productVariant.value});location.href='cart.html';};
});
