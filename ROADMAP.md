# Roadmap — Janus Quality & Accreditamenti

## Finalità

Questa roadmap descrive l’evoluzione progressiva della web application, dalla fondazione documentale a un sistema completo di gestione qualità. Le fasi sono sequenziali ma possono essere rifinite in base a priorità, fonti normative disponibili e validazione degli utenti interni.

## Principi di pianificazione

- sviluppare solo funzionalità con obiettivo e responsabile chiari;
- validare ogni fase prima di aumentare la complessità;
- mantenere tracciabilità tra requisiti, fonti, dati e decisioni;
- privilegiare qualità, accessibilità, sicurezza e manutenibilità;
- evitare dipendenze e infrastrutture premature;
- separare sempre supporto operativo, interpretazione interna e valore normativo ufficiale.

---

## Fase 0 — Fondazione documentale

**Obiettivo:** rendere il repository autosufficiente e comprensibile.

### Deliverable

- README completo;
- visione e architettura in `PROJECT.md`;
- istruzioni per assistenti AI in `AI_CONTEXT.md`;
- standard tecnici in `DEVELOPMENT.md`;
- roadmap versionata;
- `.gitignore` iniziale.

### Criteri di uscita

- documenti coerenti tra loro;
- regole di governance esplicite;
- struttura futura definita senza anticipare lo sviluppo.

---

## Fase 1 — Prototipo statico e design system

**Obiettivo:** creare una base navigabile, accessibile e coerente con l’identità Janus.

### Funzionalità

- shell applicativa;
- navigazione principale;
- dashboard dimostrativa;
- componenti base;
- design token;
- layout responsive;
- stati vuoti, caricamento ed errore;
- pagina informativa su limiti e fonti.

### Attività tecniche

- creare struttura HTML/CSS/JS;
- definire componenti riutilizzabili;
- verificare accessibilità da tastiera;
- stabilire convenzioni per messaggi, badge e tabelle.

### Criteri di uscita

- interfaccia navigabile senza errori;
- responsive su viewport principali;
- componenti coerenti e documentati;
- nessun dato normativo non verificato.

---

## Fase 2 — Modello dati e fonti normative

**Obiettivo:** strutturare requisiti e fonti in modo tracciabile.

### Funzionalità

- archivio fonti;
- anagrafica requisiti;
- relazioni fonte-requisito;
- stato di validità e data ultima verifica;
- filtri per ambito, tipologia e territorio;
- segnalazione di fonti da revisionare.

### Attività tecniche

- definire schema JSON;
- introdurre ID stabili;
- validare riferimenti incrociati;
- distinguere testo ufficiale, sintesi e regola operativa;
- predisporre casi di test sui dati.

### Criteri di uscita

- nessun requisito privo di fonte o stato;
- dataset validabile;
- processi di aggiornamento documentati.

---

## Fase 3 — Checklist operative

**Obiettivo:** trasformare i requisiti in verifiche utilizzabili.

### Funzionalità

- checklist per sede;
- checklist aula;
- checklist laboratorio;
- checklist documentale;
- stati conforme, attenzione, non conforme, non applicabile;
- note, evidenze e responsabile;
- salvataggio bozze locale;
- riepilogo delle criticità.

### Attività tecniche

- motore checklist configurabile;
- gestione versionata di `localStorage`;
- validazioni;
- esportazione preliminare in formato stampabile;
- test su persistenza e ripristino.

### Criteri di uscita

- checklist complete e recuperabili;
- risultati collegati ai requisiti;
- nessun dato sensibile memorizzato localmente.

---

## Fase 4 — Comparatore requisiti

**Obiettivo:** confrontare scenari e categorie senza perdere il contesto normativo.

### Funzionalità

- confronto finanziato/non finanziato;
- confronto tra informatica, moda, area economica e formazione generica;
- confronto di spazi, postazioni, attrezzature e vincoli;
- evidenza delle differenze;
- collegamento diretto alle fonti;
- gestione delle condizioni di applicabilità.

### Criteri di uscita

- ogni confronto è riproducibile;
- le differenze sono motivate;
- nessun requisito è mostrato fuori contesto.

---

## Fase 5 — Calcolatore aula

**Obiettivo:** supportare valutazioni preliminari su capienza e configurazione degli spazi.

### Funzionalità

- inserimento superficie e spazi non utilizzabili;
- metri quadrati per persona;
- numero massimo teorico di utenti;
- numero di postazioni;
- spazio docente e attrezzature;
- scenari multipli;
- avvertenze e limiti del calcolo;
- collegamento alle regole applicate.

### Attività tecniche

- formule isolate e documentate;
- precisione e arrotondamenti espliciti;
- test su valori limite e input invalidi;
- nessuna presentazione del risultato come certificazione.

### Criteri di uscita

- formule testate;
- risultati comprensibili e tracciabili;
- scenari esportabili o stampabili.

---

## Fase 6 — Dashboard qualità

**Obiettivo:** offrire una vista gestionale delle attività e delle criticità.

### Funzionalità

- indicatori di conformità;
- checklist in corso;
- criticità aperte;
- scadenze;
- fonti da aggiornare;
- avanzamento dei progetti;
- filtri per sede e area;
- priorità operative.

### Criteri di uscita

- indicatori derivati da dati verificabili;
- dashboard leggibile e accessibile;
- drill-down verso l’informazione di origine.

---

## Fase 7 — Backend, autenticazione e ruoli

**Obiettivo:** passare dalla persistenza locale a un sistema centralizzato e multiutente.

### Funzionalità

- autenticazione;
- ruoli e permessi;
- database;
- API;
- gestione sessioni;
- protezione dei dati;
- backup e ripristino;
- ambienti separati.

### Ruoli indicativi

- amministratore;
- responsabile qualità;
- verificatore;
- referente di sede;
- lettore/auditor.

### Prerequisiti

- analisi privacy e sicurezza;
- modello autorizzativo approvato;
- scelta tecnologica documentata;
- piano di migrazione dai dati locali.

### Criteri di uscita

- accessi controllati;
- dati centralizzati;
- audit degli eventi critici;
- procedure di backup verificate.

---

## Fase 8 — Gestione sedi, evidenze e documenti

**Obiettivo:** creare il fascicolo digitale di ogni sede o progetto.

### Funzionalità

- anagrafica sedi;
- locali e dotazioni;
- documenti ed evidenze;
- scadenziario;
- versioni documentali;
- assegnazioni;
- stato di completezza;
- collegamento a checklist e requisiti.

### Criteri di uscita

- ogni evidenza ha proprietario, data e requisito collegato;
- scadenze monitorabili;
- permessi coerenti con i ruoli.

---

## Fase 9 — Non conformità e azioni correttive

**Obiettivo:** gestire il ciclo completo delle criticità.

### Funzionalità

- apertura non conformità;
- classificazione per gravità;
- analisi della causa;
- azione correttiva e preventiva;
- responsabile e scadenza;
- verifica di efficacia;
- chiusura approvata;
- storico e report.

### Criteri di uscita

- workflow tracciato;
- responsabilità esplicite;
- impossibilità di chiusura senza evidenza e verifica.

---

## Fase 10 — Audit e riesame della direzione

**Obiettivo:** supportare audit interni, verifiche periodiche e riesami.

### Funzionalità

- piano audit;
- programmi e checklist di audit;
- verbali;
- rilievi;
- follow-up;
- indicatori temporali;
- pacchetto informativo per il riesame;
- storico decisioni.

### Criteri di uscita

- audit ripetibili;
- evidenze e rilievi collegati;
- report approvabili e versionati.

---

## Fase 11 — Reportistica, integrazioni e automazioni

**Obiettivo:** ridurre attività manuali e migliorare la capacità decisionale.

### Funzionalità

- report PDF o esportazioni strutturate;
- notifiche e promemoria;
- integrazioni con Drive, CRM e sistemi Janus autorizzati;
- importazione dati controllata;
- dashboard direzionali;
- API documentate;
- automazioni con log e gestione errori.

### Criteri di uscita

- integrazioni sicure e monitorate;
- nessuna duplicazione incontrollata dei dati;
- report coerenti con la fonte primaria.

---

## Fase 12 — Sistema completo di gestione qualità

**Obiettivo:** consolidare una piattaforma multi-sede, governata e scalabile.

### Capacità finali previste

- gestione centralizzata di sedi e processi;
- ruoli, permessi e segregazione delle responsabilità;
- controllo documentale;
- requisiti e fonti normative versionati;
- checklist, verifiche e audit;
- non conformità e azioni correttive;
- indicatori e riesami;
- scadenze e notifiche;
- reportistica e integrazioni;
- audit trail;
- continuità operativa e sicurezza.

## Backlog trasversale

Durante tutte le fasi devono essere mantenuti:

- accessibilità WCAG;
- sicurezza e privacy;
- test;
- documentazione;
- qualità dei dati;
- performance;
- usabilità;
- tracciabilità delle decisioni;
- revisione periodica delle fonti.

## Gestione della roadmap

Ogni variazione significativa deve:

1. essere motivata;
2. indicare impatto su architettura, dati e sicurezza;
3. aggiornare questo documento;
4. essere registrata con commit descrittivo;
5. non anticipare fasi infrastrutturali senza prerequisiti verificati.
