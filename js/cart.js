
const CART_KEY='byssus-cart';
function getCart(){ try{return JSON.parse(localStorage.getItem(CART_KEY))||[]}catch{return[]} }
function saveCart(c){ localStorage.setItem(CART_KEY,JSON.stringify(c)); updateCartCount(); }
function addToCart(product, qty=1, options={}){
  const c=getCart();
  const key=product.id+'|'+JSON.stringify(options);
  const found=c.find(i=>i.key===key);
  if(found) found.qty+=qty; else c.push({key,id:product.id,name:product.name,price:product.price,image:product.image,qty,options});
  saveCart(c);
}
function removeCartItem(key){ saveCart(getCart().filter(i=>i.key!==key)); }
function setCartQty(key,qty){ const c=getCart(); const x=c.find(i=>i.key===key); if(x){x.qty=Math.max(1,qty);saveCart(c);} }
function updateCartCount(){
  const el=document.getElementById('cartCount'); if(!el)return;
  el.textContent=getCart().reduce((a,b)=>a+b.qty,0);
}
