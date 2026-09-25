
document.addEventListener('DOMContentLoaded', async ()=>{
  const p=(await BYSSUS.products()).slice(0,6);
  document.getElementById('homeProducts').innerHTML=p.map(x=>BYSSUS.card(x)).join('');
});
