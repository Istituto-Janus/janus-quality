# Janus Quality & Accreditamenti

## 1. Visione del progetto

Janus Quality & Accreditamenti è il sistema digitale di riferimento di Istituto Janus per organizzare, verificare e sviluppare in modo strutturato i processi relativi a qualità, conformità, requisiti autorizzativi e accreditamento delle sedi e delle attività formative.

Il progetto deve trasformare informazioni normative, requisiti tecnici, evidenze documentali e controlli operativi in strumenti chiari, verificabili e replicabili. La piattaforma non sostituisce il giudizio professionale, la verifica normativa o l’attività degli enti competenti: supporta il lavoro interno fornendo una base organizzata per analisi, pianificazione e controllo.

## 2. Obiettivi

- centralizzare requisiti, checklist, fonti e documenti di progetto;
- standardizzare le verifiche preliminari per sedi, aule, laboratori e attività formative;
- ridurre errori, omissioni e interpretazioni non documentate;
- rendere confrontabili requisiti diversi per tipologia di corso, finanziamento e contesto autorizzativo;
- supportare decisioni su spazi, attrezzature, capienza e sostenibilità operativa;
- mantenere tracciabilità delle fonti, delle revisioni e delle responsabilità;
- evolvere verso un sistema completo di gestione della qualità.

## 3. Principi architetturali

L’architettura deve essere modulare, progressiva e indipendente da framework non necessari.

### Fase iniziale

Web application statica composta da:

- HTML5 semantico;
- CSS modulare basato su design token;
- JavaScript ES6+ senza dipendenze obbligatorie;
- persistenza locale tramite `localStorage` per dati non sensibili e preferenze;
- dati strutturati in file JSON versionati nel repository.

### Evoluzione prevista

Quando i requisiti lo renderanno necessario, il sistema potrà introdurre:

- autenticazione e ruoli;
- database centralizzato;
- API applicative;
- gestione documentale;
- audit trail;
- workflow approvativi;
- esportazioni e reportistica;
- integrazioni con CRM, Drive o altri sistemi Janus.

Ogni passaggio architetturale deve essere motivato da requisiti reali, evitando complessità prematura.

## 4. Moduli previsti

### 4.1 Dashboard

Vista sintetica dello stato del sistema con:

- indicatori di conformità;
- checklist aperte e completate;
- scadenze;
- criticità;
- fonti normative da revisionare;
- stato delle sedi e dei progetti;
- accesso rapido agli strumenti principali.

### 4.2 Checklist

Modulo per verifiche strutturate relative a:

- requisiti generali della sede;
- aule didattiche;
- laboratori;
- sicurezza e accessibilità;
- dotazioni;
- documentazione amministrativa;
- requisiti per specifiche tipologie formative;
- evidenze e note di verifica.

Le checklist devono distinguere chiaramente tra requisito, fonte, stato, evidenza, responsabile, data di verifica e note.

### 4.3 Comparatore

Strumento per confrontare requisiti tra:

- corsi finanziati e non finanziati;
- informatica;
- moda;
- area economica;
- formazione generica o di base;
- differenti configurazioni di aula o laboratorio;
- differenti fonti o regimi autorizzativi.

Il comparatore non deve appiattire differenze normative: deve mostrare origine, ambito e condizioni di applicabilità di ogni requisito.

### 4.4 Calcolatore aula

Strumento di supporto per stimare:

- capienza teorica;
- metri quadrati disponibili;
- superficie minima per persona;
- numero di postazioni;
- spazi destinati a docente, attrezzature e circolazione;
- compatibilità preliminare con la tipologia di attività.

I risultati devono essere presentati come stime operative da verificare rispetto alla normativa applicabile e alle condizioni reali della sede.

### 4.5 Fonti normative

Archivio strutturato contenente:

- titolo della fonte;
- ente emanante;
- data;
- ambito territoriale;
- stato di validità;
- collegamento ufficiale;
- requisiti associati;
- data dell’ultima verifica;
- note interpretative;
- eventuali versioni sostituite.

Le fonti ufficiali prevalgono sempre su sintesi, appunti o contenuti derivati.

### 4.6 Gestione sedi e progetti

Evoluzione destinata a raccogliere:

- anagrafiche delle sedi;
- spazi e locali;
- dotazioni;
- documenti;
- verifiche;
- non conformità;
- piani di adeguamento;
- scadenze e responsabilità.

## 5. Struttura prevista del progetto

```text
/
├── README.md
├── PROJECT.md
├── AI_CONTEXT.md
├── DEVELOPMENT.md
├── ROADMAP.md
├── .gitignore
├── index.html
├── assets/
│   ├── css/
│   │   ├── tokens.css
│   │   ├── base.css
│   │   ├── components.css
│   │   └── pages.css
│   ├── js/
│   │   ├── app.js
│   │   ├── storage.js
│   │   ├── validation.js
│   │   └── modules/
│   └── images/
├── data/
│   ├── requirements.json
│   ├── sources.json
│   └── checklists.json
├── docs/
└── tests/
```

Questa struttura è una destinazione prevista, non autorizza la creazione automatica di componenti non ancora approvati.

## 6. Design system Janus

Il design deve comunicare affidabilità, rigore, chiarezza e modernità istituzionale.

### Principi

- gerarchia visiva chiara;
- interfacce sobrie e leggibili;
- linguaggio non sensazionalistico;
- contrasto conforme ai criteri di accessibilità;
- componenti riutilizzabili;
- responsive design;
- uso coerente di spaziature, tipografia, bordi e stati;
- evidenza distinta per conforme, attenzione, non conforme e informativo;
- nessun colore deve essere l’unico veicolo di significato.

### Token da centralizzare

- colori istituzionali;
- colori semantici;
- scala tipografica;
- spaziature;
- raggi di curvatura;
- ombre;
- breakpoint;
- larghezze massime;
- durate e curve delle transizioni.

I valori definitivi devono essere approvati e inseriti in `assets/css/tokens.css` prima di essere duplicati altrove.

## 7. Gestione dei dati

- Le definizioni normative e i requisiti devono essere separati dall’interfaccia.
- Ogni requisito deve avere un identificatore stabile.
- Ogni dato derivato deve indicare la fonte o la regola di calcolo.
- Le date devono usare formato ISO `YYYY-MM-DD` nei dati.
- I dati sensibili non devono essere memorizzati in `localStorage` o nel repository.
- Le modifiche strutturali ai dati devono prevedere versionamento e migrazione.

## 8. Qualità, sicurezza e accessibilità

Il progetto deve perseguire:

- conformità WCAG 2.2 livello AA per quanto applicabile;
- HTML semanticamente corretto;
- navigazione da tastiera;
- validazione degli input;
- prevenzione di injection tramite gestione sicura del DOM;
- assenza di segreti nel repository;
- minimizzazione dei dati;
- messaggi di errore comprensibili;
- test delle funzionalità critiche;
- tracciabilità delle decisioni tecniche.

## 9. Roadmap evolutiva sintetica

1. Fondazione documentale e standard di progetto.
2. Prototipo statico navigabile.
3. Dataset strutturati e moduli checklist/comparatore/calcolatore.
4. Dashboard e gestione delle evidenze.
5. Persistenza centralizzata, autenticazione e ruoli.
6. Workflow qualità, non conformità e audit.
7. Reportistica, integrazioni e automazioni.
8. Sistema completo di gestione qualità multi-sede.

Il dettaglio operativo è mantenuto in [ROADMAP.md](ROADMAP.md).

## 10. Regole di sviluppo

- Leggere sempre `README.md`, `PROJECT.md`, `AI_CONTEXT.md`, `DEVELOPMENT.md` e `ROADMAP.md` prima di modifiche rilevanti.
- Verificare l’esistenza di un file prima di crearlo.
- Non introdurre framework, librerie o servizi senza motivazione documentata.
- Non inserire requisiti normativi privi di fonte ufficiale verificabile.
- Non presentare stime come certificazioni o pareri legali.
- Mantenere separati contenuto, presentazione e logica.
- Preferire modifiche piccole, verificabili e reversibili.
- Aggiornare la documentazione insieme al codice.
- Usare commit descrittivi secondo `DEVELOPMENT.md`.
- Non sviluppare funzionalità non richieste o non coerenti con la roadmap approvata.

## 11. Governance documentale

Questo file descrive la visione e l’architettura generale. In caso di conflitto:

1. le istruzioni esplicite del responsabile di progetto prevalgono;
2. le fonti normative ufficiali prevalgono sulle sintesi interne;
3. `PROJECT.md` definisce finalità e confini;
4. `DEVELOPMENT.md` definisce gli standard tecnici;
5. `AI_CONTEXT.md` definisce il comportamento degli assistenti AI;
6. `ROADMAP.md` definisce la sequenza evolutiva.
