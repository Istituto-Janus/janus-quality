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

function escapeHtml(value){
  return String(value??'').replace(/[&<>"]/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[char]));
}

function renderSituationSummary(){
  const knownStatuses=['Disponibile','Parziale','Da acquisire','Da predisporre','Da verificare','Non avviato'];
  const statusCounts=Object.fromEntries(knownStatuses.map(status=>[status,data.checklist.filter(item=>item.status===status).length]));
  const otherStatuses=data.checklist.filter(item=>!knownStatuses.includes(item.status)).length;
  const blockers=data.checklist.filter(item=>item.priority==='Bloccante').length;
  const highPriority=data.checklist.filter(item=>item.priority==='Alta').length;
  const linked=data.checklist.filter(item=>item.url).length;
  const incompleteStatuses=new Set(['Parziale','Da acquisire','Da predisporre','Da verificare','Non avviato']);

  const areas=[...new Set(data.checklist.map(item=>item.area||'Area non indicata'))].map(area=>{
    const items=data.checklist.filter(item=>(item.area||'Area non indicata')===area);
    return {area,total:items.length,available:items.filter(item=>item.status==='Disponibile').length,partial:items.filter(item=>item.status==='Parziale').length,incomplete:items.filter(item=>incompleteStatuses.has(item.status)||!knownStatuses.includes(item.status)).length,blockers:items.filter(item=>item.priority==='Bloccante').length};
  }).sort((a,b)=>a.area.localeCompare(b.area,'it'));

  const owners=[...new Set(data.checklist.map(item=>item.owner||'Responsabile non indicato'))].map(owner=>{
    const items=data.checklist.filter(item=>(item.owner||'Responsabile non indicato')===owner);
    return {owner,total:items.length,urgent:items.filter(item=>['Bloccante','Alta'].includes(item.priority)).length};
  }).sort((a,b)=>b.urgent-a.urgent||b.total-a.total||a.owner.localeCompare(b.owner,'it'));

  const priorityOrder={Bloccante:0,Alta:1,Media:2};
  const statusOrder={'Non avviato':0,'Da acquisire':1,'Da predisporre':2,'Da verificare':3,Parziale:4};
  const criticalities=data.checklist.filter(item=>item.status!=='Disponibile').sort((a,b)=>(priorityOrder[a.priority]??99)-(priorityOrder[b.priority]??99)||(statusOrder[a.status]??99)-(statusOrder[b.status]??99)||String(a.area||'').localeCompare(String(b.area||''),'it')||String(a.id||'').localeCompare(String(b.id||''),'it'));

  document.getElementById('situationSummaryContent').innerHTML=`
    <div class="summary-metrics">
      <div><strong>${data.checklist.length}</strong><span>Requisiti totali</span></div><div><strong>${statusCounts.Disponibile}</strong><span>Disponibili</span></div><div><strong>${statusCounts.Parziale}</strong><span>Parziali</span></div><div><strong>${statusCounts['Da acquisire']}</strong><span>Da acquisire</span></div><div><strong>${statusCounts['Da predisporre']}</strong><span>Da predisporre</span></div><div><strong>${statusCounts['Da verificare']}</strong><span>Da verificare</span></div><div><strong>${statusCounts['Non avviato']}</strong><span>Non avviati</span></div><div><strong>${blockers}</strong><span>Priorità bloccante</span></div><div><strong>${highPriority}</strong><span>Priorità alta</span></div><div><strong>${linked}</strong><span>Con documento collegato</span></div><div><strong>${data.checklist.length-linked}</strong><span>Senza documento collegato</span></div>${otherStatuses?`<div><strong>${otherStatuses}</strong><span>Altri stati</span></div>`:''}
    </div>
    <section class="summary-section"><h3>Situazione per area</h3><div class="summary-table-wrap"><table><thead><tr><th>Area</th><th>Totale</th><th>Disponibili</th><th>Parziali</th><th>Da completare</th><th>Bloccanti</th></tr></thead><tbody>${areas.map(item=>`<tr><th>${escapeHtml(item.area)}</th><td>${item.total}</td><td>${item.available}</td><td>${item.partial}</td><td>${item.incomplete}</td><td>${item.blockers}</td></tr>`).join('')}</tbody></table></div></section>
    <section class="summary-section"><h3>Carico per responsabile</h3><div class="summary-owner-grid">${owners.map(item=>`<div><strong>${escapeHtml(item.owner)}</strong><span>${item.total} requisiti · ${item.urgent} bloccanti o ad alta priorità</span></div>`).join('')}</div></section>
    <section class="summary-section"><h3>Criticità prioritarie</h3><div class="summary-criticalities">${criticalities.map(item=>`<article class="summary-criticality"><div class="summary-criticality-head"><span class="check-id">${escapeHtml(item.id||'ID non indicato')}</span><span class="status-pill ${statusClass(item.status)}">${escapeHtml(item.status||'Stato non indicato')}</span></div><h4>${escapeHtml(item.requirement||'Requisito non indicato')}</h4><div class="check-meta"><span>${escapeHtml(item.area||'Area non indicata')}</span><span>Priorità: ${escapeHtml(item.priority||'Non indicata')}</span><span>Responsabile: ${escapeHtml(item.owner||'Non indicato')}</span></div>${item.note?`<p>${escapeHtml(item.note)}</p>`:''}${item.url?`<a class="document-link" href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">Apri ${escapeHtml(item.document||'documento')}</a>`:''}</article>`).join('')||'<p>Nessuna criticità rilevata.</p>'}</div></section>`;
}

function openSituationSummary(){
  renderSituationSummary();
  const modal=document.getElementById('situationSummaryModal');
  modal.hidden=false;
  document.body.classList.add('modal-open');
  document.getElementById('closeSituationSummary').focus();
}

function closeSituationSummary(){
  const modal=document.getElementById('situationSummaryModal');
  modal.hidden=true;
  document.body.classList.remove('modal-open');
  document.getElementById('openSituationSummary').focus();
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
  document.getElementById('openSituationSummary').addEventListener('click',openSituationSummary);
  document.getElementById('closeSituationSummary').addEventListener('click',closeSituationSummary);
  document.getElementById('situationSummaryModal').addEventListener('click',event=>{if(event.target===event.currentTarget)closeSituationSummary();});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!document.getElementById('situationSummaryModal').hidden)closeSituationSummary();});
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