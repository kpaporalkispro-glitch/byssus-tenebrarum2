
const creator = {
  step:1,
  data:{type:'Collier',univers:'Mystique',pierre:'Améthyste',couleurs:'Noir & violet',intention:'Équilibre'},
  choices:{
    1:{title:'Choisir le type de bijou',key:'type',items:['Collier','Pendentif','Bracelet','Ceinture','Boucles d’oreilles','Parure','Sur-mesure']},
    2:{title:'Choisir votre univers',key:'univers',items:['Mystique','Gothique sobre','Nature','Romantique sombre','Minimaliste','Mythologique']},
    3:{title:'Choisir la pierre',key:'pierre',items:['Améthyste','Labradorite','Pierre de lune','Onyx','Quartz rose','Grenat']},
    4:{title:'Choisir les couleurs',key:'couleurs',items:['Noir & violet','Noir & bronze','Prune & or vieilli','Sable & bronze','Noir monochrome','Violet profond']},
    5:{title:'Choisir une intention',key:'intention',items:['Équilibre','Intuition','Ancrage','Confiance','Lien','Transformation']},
    6:{title:'Votre création est prête',key:'resume',items:[]}
  }
};
const typeImage={Collier:'collier-elise.svg',Pendentif:'pendentif-nebuleuse.svg',Bracelet:'bracelet-solene.svg',Ceinture:'chaine-lune.svg',"Boucles d’oreilles":'boucles-aurore.svg',Parure:'collier-elise.svg',"Sur-mesure":'pendentif-sakura.svg'};
function renderCreator(){
  const c=creator.choices[creator.step], stepEl=document.getElementById('creatorStep');
  document.querySelectorAll('#stepper button').forEach(b=>b.classList.toggle('active',+b.dataset.step===creator.step));
  if(creator.step===6){
    stepEl.innerHTML=`<div class="final-card"><p class="eyebrow">RÉSUMÉ</p><h2>Votre bijou prend forme</h2><p>Vérifiez votre combinaison puis ajoutez cette création personnalisée au panier.</p>
    <button class="btn primary" id="addCustom">Ajouter ma création au panier</button></div>`;
    setTimeout(()=>document.getElementById('addCustom').onclick=addCustom,0);
  } else {
    stepEl.innerHTML=`<div class="step-title"><b>${creator.step}</b><div><h2>${c.title}</h2><p>Sélectionnez une option. Vous pourrez revenir en arrière à tout moment.</p></div></div>
    <div class="choice-grid">${c.items.map(item=>`<button class="choice-card ${creator.data[c.key]===item?'selected':''}" data-choice="${item}">
      <span class="choice-icon">✦</span><strong>${item}</strong><small>${choiceSubtitle(item)}</small>
    </button>`).join('')}</div>`;
    stepEl.querySelectorAll('[data-choice]').forEach(b=>b.onclick=()=>{creator.data[c.key]=b.dataset.choice;renderCreator();});
  }
  prevStep.disabled=creator.step===1; nextStep.textContent=creator.step===6?'Revenir au début ↺':'Étape suivante →';
  renderSummary();
}
function choiceSubtitle(i){
  const map={'Collier':'Au plus près du cœur','Pendentif':'Une pierre, une histoire','Bracelet':'Un talisman quotidien','Ceinture':'Une ligne délicate',"Boucles d’oreilles":'Légèreté et mouvement','Parure':'Une harmonie complète','Sur-mesure':'Une idée à dessiner'};
  return map[i]||'Choix personnalisable';
}
function renderSummary(){
  creatorSummary.innerHTML=Object.entries(creator.data).map(([k,v])=>`<dt>${({type:'Type de bijou',univers:'Univers',pierre:'Pierre',couleurs:'Couleurs',intention:'Intention'})[k]}</dt><dd>${v}</dd>`).join('');
  previewImage.src='assets/products/'+(typeImage[creator.data.type]||'collier-elise.svg');
  const base={Collier:80,Pendentif:65,Bracelet:45,Ceinture:60,"Boucles d’oreilles":42,Parure:110,"Sur-mesure":95}[creator.data.type]||80;
  creatorPrice.textContent=`${base} € – ${base+35} €`;
}
function addCustom(){
  const base={Collier:80,Pendentif:65,Bracelet:45,Ceinture:60,"Boucles d’oreilles":42,Parure:110,"Sur-mesure":95}[creator.data.type]||80;
  addToCart({id:'custom-'+Date.now(),name:'Création personnalisée — '+creator.data.type,price:base,image:previewImage.src.replace(location.origin+location.pathname.replace(/[^/]+$/,''),'')},1,{...creator.data});
  location.href='cart.html';
}
document.addEventListener('DOMContentLoaded',()=>{
  nextStep.onclick=()=>{ if(creator.step===6){creator.step=1}else creator.step++;renderCreator(); };
  prevStep.onclick=()=>{creator.step=Math.max(1,creator.step-1);renderCreator();};
  resetCreator.onclick=()=>{creator.step=1;creator.data={type:'Collier',univers:'Mystique',pierre:'Améthyste',couleurs:'Noir & violet',intention:'Équilibre'};renderCreator();};
  document.querySelectorAll('#stepper button').forEach(b=>b.onclick=()=>{creator.step=+b.dataset.step;renderCreator();});
  renderCreator();
});
