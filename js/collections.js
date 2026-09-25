
let all=[];
async function render(){
  if(!all.length) all=await BYSSUS.products();
  const cat=document.getElementById('categoryFilter').value;
  const stone=document.getElementById('stoneFilter').value;
  const max=+document.getElementById('priceFilter').value;
  let list=all.filter(p=>(!cat||p.category===cat)&&(!stone||p.stone.includes(stone))&&p.price<=max);
  const sort=document.getElementById('sortSelect').value;
  if(sort==='priceAsc') list.sort((a,b)=>a.price-b.price);
  if(sort==='priceDesc') list.sort((a,b)=>b.price-a.price);
  document.getElementById('productGrid').innerHTML=list.map(p=>BYSSUS.card(p)).join('');
  document.getElementById('resultsCount').textContent=`${list.length} création${list.length>1?'s':''}`;
}
document.addEventListener('DOMContentLoaded',()=>{
  const params=new URLSearchParams(location.search), cat=params.get('cat');
  if(cat){
    const select=document.getElementById('categoryFilter');
    [...select.options].forEach(o=>{if(cat.toLowerCase().includes(o.value.toLowerCase())||o.value.toLowerCase().includes(cat.toLowerCase())) select.value=o.value;});
  }
  ['categoryFilter','stoneFilter','priceFilter','sortSelect'].forEach(id=>document.getElementById(id).addEventListener('input',()=>{
    document.getElementById('priceOutput').textContent=document.getElementById('priceFilter').value+' €'; render();
  }));
  document.getElementById('clearFilters').onclick=()=>{document.getElementById('categoryFilter').value='';document.getElementById('stoneFilter').value='';document.getElementById('priceFilter').value=130;document.getElementById('priceOutput').textContent='130 €';render();};
  render();
});
