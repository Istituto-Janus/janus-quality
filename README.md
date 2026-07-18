# Janus Quality & Accreditamenti

Repository ufficiale del progetto **Janus Quality & Accreditamenti** di Istituto Janus.

Il progetto ha l’obiettivo di costruire una web application modulare per organizzare requisiti, fonti normative, checklist, comparazioni, calcoli preliminari, verifiche di sedi e processi di gestione della qualità.

La piattaforma è uno strumento di supporto operativo e decisionale. Non sostituisce verifiche professionali, pareri legali, certificazioni o decisioni degli enti competenti. Ogni requisito deve essere collegato a fonti ufficiali verificabili.

## Stato attuale

Il repository si trova nella fase di **fondazione documentale e architetturale**. La web application non è ancora stata sviluppata.

Sono stati definiti:

- visione e obiettivi del progetto;
- architettura prevista;
- moduli applicativi;
- regole per assistenti AI;
- convenzioni di sviluppo;
- roadmap evolutiva;
- configurazione iniziale del repository.

## Moduli previsti

- dashboard qualità;
- checklist operative;
- comparatore dei requisiti;
- calcolatore aula e capienza;
- archivio delle fonti normative;
- gestione di sedi, spazi e dotazioni;
- evidenze e documenti;
- non conformità e azioni correttive;
- audit, scadenze e reportistica;
- autenticazione, ruoli e workflow nelle fasi successive.

## Documentazione essenziale

Prima di lavorare sul progetto, leggere:

1. [PROJECT.md](PROJECT.md) — visione, obiettivi, architettura, moduli, design system e regole generali;
2. [AI_CONTEXT.md](AI_CONTEXT.md) — istruzioni operative specifiche per assistenti AI;
3. [DEVELOPMENT.md](DEVELOPMENT.md) — convenzioni HTML, CSS, JavaScript, dati, storage, naming e commit;
4. [ROADMAP.md](ROADMAP.md) — fasi di evoluzione fino al sistema completo di gestione qualità.

## Struttura attuale del repository

```text
/
├── README.md
├── PROJECT.md
├── AI_CONTEXT.md
├── DEVELOPMENT.md
├── ROADMAP.md
└── .gitignore
```

## Struttura applicativa prevista

```text
/
├── index.html
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
├── data/
├── docs/
└── tests/
```

La struttura applicativa verrà creata soltanto durante le fasi di sviluppo approvate.

## Tecnologie previste per la prima versione

- HTML5 semantico;
- CSS moderno e modulare;
- JavaScript ES6+;
- JSON per requisiti, checklist e fonti;
- `localStorage` esclusivamente per dati non sensibili e bozze locali;
- GitHub per versionamento, documentazione e tracciabilità.

Framework, backend, database e servizi esterni non devono essere introdotti senza una decisione architetturale esplicita.

## Istruzioni di utilizzo

### Per comprendere il progetto

Leggere i documenti nella sequenza indicata nella sezione “Documentazione essenziale”.

### Per contribuire

1. verificare la fase corrente in [ROADMAP.md](ROADMAP.md);
2. leggere gli standard in [DEVELOPMENT.md](DEVELOPMENT.md);
3. verificare i file esistenti prima di crearne di nuovi;
4. mantenere separate struttura, stile, logica e dati;
5. associare ogni requisito normativo a una fonte ufficiale;
6. effettuare modifiche piccole e verificabili;
7. usare commit reali, descrittivi e coerenti con le convenzioni del progetto;
8. aggiornare la documentazione quando cambia il comportamento o l’architettura.

### Per assistenti AI

Ogni assistente AI deve leggere integralmente [AI_CONTEXT.md](AI_CONTEXT.md) prima di modificare il repository. Le operazioni richieste su GitHub devono essere eseguite realmente tramite il connettore autorizzato, senza simulazioni e senza limitarsi a mostrare codice in chat.

## Principi del progetto

- rigore delle fonti;
- chiarezza e tracciabilità;
- modularità;
- accessibilità;
- sicurezza e minimizzazione dei dati;
- sviluppo progressivo;
- assenza di complessità prematura;
- coerenza tra documentazione, dati e codice.

## Governance

Il repository è il punto di riferimento permanente del progetto. Le decisioni rilevanti devono essere documentate e versionate. In caso di dubbio, prevalgono le istruzioni esplicite del responsabile di progetto e le fonti normative ufficiali.
