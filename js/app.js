let data;
const views=document.querySelectorAll('.view');
const navLinks=document.querySelectorAll('.nav-link');
const sidebar=document.getElementById('sidebar');

function showView(id){
  views.forEach(view=>view.classList.toggle('active-view',view.id===id));
  navLinks.forEach(link=>link.classList.toggle('active',link.dataset.view===id));
  sidebar.classList.remove('open');
  window.scrollTo({top:0,behavior:'smooth'});
}

function statusClass(status){
  if(status==='Disponibile')return 'available';
  if(status==='Parziale')return 'partial';
  if(['Da acquisire','Da predisporre','Da verificare'].includes(status))return 'missing';
  return 'not-started';
}

function renderSidebarStats(){
  const counts={
    available:data.checklist.filter(i=>i.status==='Disponibile').length,
    partial:data.checklist.filter(i=>i.status==='Parziale').length,
    missing:data.checklist.filter(i=>['Da acquisire','Da predisporre','Da verificare'].includes(i.status)).length,
    notStarted:data.checklist.filter(i=>i.status==='Non avviato').length
  };
  document.getElementById('totalRequirements').textContent=data.checklist.length;
  document.getElementById('sidebarStats').innerHTML=`<h3>Stato generale documentazione</h3>
    <div class="stat-line"><span class="stat-label"><i class="stat-dot available"></i>Disponibili</span><strong>${counts.available}</strong></div>
    <div class="stat-line"><span class="stat-label"><i class="stat-dot partial"></i>Parziali</span><strong>${counts.partial}</strong></div>
    <div class="stat-line"><span class="stat-label"><i class="stat-dot missing"></i>Da completare</span><strong>${counts.missing}</strong></div>
    <div class="stat-line"><span class="stat-label"><i class="stat-dot not-started"></i>Non avviati</span><strong>${counts.notStarted}</strong></div>
    <div class="stat-line"><span>Totale requisiti</span><strong>${data.checklist.length}</strong></div>`;
}

function renderDashboard(){
  document.getElementById('dashboardCards').innerHTML=data.courses.map(course=>{
    const req=course.requirements.finanziato;
    return `<article class="course-card"><h3>${course.name}</h3><p>${course.description}</p>
      <div class="metric-row"><span>Superficie indicativa</span><strong>${req.area} mq</strong></div>
      <div class="metric-row"><span>Postazioni PC</span><strong>${req.pc}</strong></div>
      <div class="metric-row"><span>Postazioni laboratorio</span><strong>${req.lab}</strong></div></article>`;
  }).join('');
}

const courseFilter=document.getElementById('courseFilter');
const fundingFilter=document.getElementById('fundingFilter');
function renderRequirements(){
  const course=data.courses.find(c=>c.id===courseFilter.value)||data.courses[0];
  const regimes=fundingFilter.value==='tutti'?['finanziato','non-finanziato']:[fundingFilter.value];
  document.getElementById('requirementsDetail').innerHTML=regimes.map(regime=>{
    const req=course.requirements[regime];
    return `<article class="requirements-card"><div class="section-heading"><div><h3>${course.name} · ${regime==='finanziato'?'Finanziato':'Non finanziato'}</h3><p>${course.description}</p></div><span class="status warning">${req.status}</span></div>
      <div class="requirement-list"><div class="requirement-item"><span>Superficie minima indicativa</span><strong>${req.area} mq</strong></div><div class="requirement-item"><span>Rapporto superficie/persona</span><strong>${req.sqmPerPerson} mq</strong></div><div class="requirement-item"><span>Postazioni PC</span><strong>${req.pc}</strong></div><div class="requirement-item"><span>Postazioni laboratorio</span><strong>${req.lab}</strong></div><div class="requirement-item"><span>Dotazioni</span><strong>${req.equipment}</strong></div><div class="requirement-item"><span>Accessibilità</span><strong>${req.accessibility}</strong></div></div></article>`;
  }).join('');
}

function renderCompareControls(){
  const options=data.courses.map(c=>`<option value="${c.id}">${c.name}</option>`).join('');
  document.getElementById('compareControls').innerHTML=`<label>Primo corso<select id="compare1">${options}</select></label><label>Secondo corso<select id="compare2">${options}</select></label><label>Regime<select id="compareFunding"><option value="finanziato">Finanziato</option><option value="non-finanziato">Non finanziato</option></select></label>`;
  document.getElementById('compare2').selectedIndex=1;
  ['compare1','compare2','compareFunding'].forEach(id=>document.getElementById(id).addEventListener('change',renderComparison));
}
function renderComparison(){
  const c1=data.courses.find(c=>c.id===document.getElementById('compare1').value);
  const c2=data.courses.find(c=>c.id===document.getElementById('compare2').value);
  const regime=document.getElementById('compareFunding').value;
  const r1=c1.requirements[regime];
  const r2=c2.requirements[regime];
  document.getElementById('compareHead1').textContent=c1.name;
  document.getElementById('compareHead2').textContent=c2.name;
  const rows=[['Superficie',`${r1.area} mq`,`${r2.area} mq`],['Mq per persona',`${r1.sqmPerPerson} mq`,`${r2.sqmPerPerson} mq`],['Postazioni PC',r1.pc,r2.pc],['Postazioni laboratorio',r1.lab,r2.lab],['Dotazioni',r1.equipment,r2.equipment],['Accessibilità',r1.accessibility,r2.accessibility],['Stato validazione',r1.status,r2.status]];
  document.getElementById('compareBody').innerHTML=rows.map(row=>`<tr><th>${row[0]}</th><td>${row[1]}</td><td>${row[2]}</td></tr>`).join('');
}

function handleCalculator(event){
  event.preventDefault();
  const area=Number(document.getElementById('roomArea').value);
  const pc=Number(document.getElementById('pcCount').value);
  const lab=Number(document.getElementById('labCount').value);
  const results=data.courses.map(course=>{
    const req=course.requirements.finanziato;
    const gaps=[];
    if(area<req.area)gaps.push(`Mancano ${req.area-area} mq`);
    if(pc<req.pc)gaps.push(`Mancano ${req.pc-pc} postazioni PC`);
    if(lab<req.lab)gaps.push(`Mancano ${req.lab-lab} postazioni laboratorio`);
    return {course,gaps};
  });
  document.getElementById('calculatorResults').innerHTML=results.map(({course,gaps})=>`<article class="result-card ${gaps.length?'ko':'ok'}"><h3>${course.name}</h3><p><strong>${gaps.length?'Non conforme ai valori indicativi':'Compatibile con i valori indicativi'}</strong></p>${gaps.length?`<ul>${gaps.map(g=>`<li>${g}</li>`).join('')}</ul>`:'<p>Nessuna carenza quantitativa rilevata.</p>'}</article>`).join('');
}

function renderChecklistFilters(){
  const area=document.getElementById('checklistArea');
  const status=document.getElementById('checklistStatus');
  area.innerHTML='<option value="tutte">Tutte</option>'+[...new Set(data.checklist.map(i=>i.area))].map(v=>`<option>${v}</option>`).join('');
  status.innerHTML='<option value="tutti">Tutti</option>'+[...new Set(data.checklist.map(i=>i.status))].map(v=>`<option>${v}</option>`).join('');
  [area,status,document.getElementById('checklistSearch')].forEach(el=>el.addEventListener('input',renderChecklist));
}
function renderChecklist(){
  const saved=JSON.parse(localStorage.getItem('janusChecklist')||'{}');
  const area=document.getElementById('checklistArea')?.value||'tutte';
  const status=document.getElementById('checklistStatus')?.value||'tutti';
  const query=(document.getElementById('checklistSearch')?.value||'').trim().toLowerCase();
  const filtered=data.checklist.filter(item=>{
    const haystack=[item.id,item.area,item.requirement,item.evidence,item.document,item.owner].join(' ').toLowerCase();
    return (area==='tutte'||item.area===area)&&(status==='tutti'||item.status===status)&&(!query||haystack.includes(query));
  });
  const available=data.checklist.filter(i=>i.status==='Disponibile').length;
  const partial=data.checklist.filter(i=>i.status==='Parziale').length;
  const linked=data.checklist.filter(i=>i.url).length;
  document.getElementById('checklistSummary').innerHTML=`<div><strong>${data.checklist.length}</strong><span>Requisiti totali</span></div><div><strong>${available}</strong><span>Disponibili</span></div><div><strong>${partial}</strong><span>Parziali</span></div><div><strong>${linked}</strong><span>Accessi Drive</span></div>`;
  document.getElementById('checklistItems').innerHTML=filtered.map(item=>`<article class="check-card ${statusClass(item.status)}"><div class="check-card-main"><label class="check-control"><input type="checkbox" data-check="${item.id}" ${saved[item.id]?'checked':''}><span class="check-id">${item.id}</span></label><div><div class="check-title-row"><h3>${item.requirement}</h3><span class="status-pill ${statusClass(item.status)}">${item.status}</span></div><p class="check-evidence"><strong>Evidenza attesa:</strong> ${item.evidence}</p><div class="check-meta"><span>${item.area}</span><span>Priorità: ${item.priority}</span><span>Responsabile: ${item.owner}</span></div>${item.note?`<p class="check-note">${item.note}</p>`:''}</div></div><div class="check-document">${item.url?`<a class="document-link" href="${item.url}" target="_blank" rel="noopener noreferrer">Apri ${item.document||'documento'}</a>`:'<span class="document-missing">Documento non ancora collegato</span>'}</div></article>`).join('')||'<div class="notice panel"><strong>Nessun risultato</strong><p>Modifica i filtri o la ricerca.</p></div>';
  document.querySelectorAll('[data-check]').forEach(input=>input.addEventListener('change',()=>{
    saved[input.dataset.check]=input.checked;
    localStorage.setItem('janusChecklist',JSON.stringify(saved));
  }));
}
function renderSources(){
  document.getElementById('sourcesList').innerHTML=data.sources.map(source=>`<article class="source-card"><h3>${source.title}</h3><div class="source-meta">${source.scope}</div><p>${source.note}</p><span class="badge">${source.status}</span></article>`).join('');
}

function initializeListeners(){
  navLinks.forEach(link=>link.addEventListener('click',()=>showView(link.dataset.view)));
  document.querySelectorAll('[data-go]').forEach(button=>button.addEventListener('click',()=>showView(button.dataset.go)));
  document.getElementById('menuToggle').addEventListener('click',()=>sidebar.classList.toggle('open'));
  courseFilter.addEventListener('change',renderRequirements);
  fundingFilter.addEventListener('change',renderRequirements);
  document.getElementById('calculatorForm').addEventListener('submit',handleCalculator);
  document.getElementById('resetChecklist').addEventListener('click',()=>{
    localStorage.removeItem('janusChecklist');
    renderChecklist();
  });
}

function initializeRendering(){
  courseFilter.innerHTML=data.courses.map(c=>`<option value="${c.id}">${c.name}</option>`).join('');
  renderSidebarStats();
  renderDashboard();
  renderRequirements();
  renderCompareControls();
  renderComparison();
  renderChecklistFilters();
  renderChecklist();
  renderSources();
}

async function initializeApp(){
  try{
    const response=await fetch('data/janus-data.json');
    if(!response.ok)throw new Error(`Errore HTTP ${response.status}`);
    data=await response.json();
    initializeListeners();
    initializeRendering();
  }catch(error){
    console.error('Impossibile caricare i dati della Web App:',error);
    document.querySelector('main.content').innerHTML='<div class="notice panel"><strong>Impossibile caricare i dati</strong><p>Ricarica la pagina o riprova più tardi.</p></div>';
  }
}

initializeApp();