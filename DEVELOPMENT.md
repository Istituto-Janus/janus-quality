# Development Guide

## 1. Finalità

Questo documento definisce le convenzioni tecniche del progetto Janus Quality & Accreditamenti. Tutti i contributi, umani o assistiti da AI, devono rispettarlo.

## 2. Struttura delle cartelle

Struttura prevista:

```text
/
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
├── docs/
└── tests/
```

Regole:

- evitare file monolitici;
- raggruppare per responsabilità;
- non creare cartelle vuote senza necessità;
- mantenere i dati applicativi separati dalla logica e dall’interfaccia;
- documentare ogni deviazione significativa.

## 3. Convenzioni HTML

- Usare HTML5 semantico.
- Dichiarare `lang="it"` nel documento principale.
- Utilizzare una sola gerarchia coerente di heading.
- Preferire elementi nativi (`button`, `dialog`, `details`, `table`, `form`) prima di ricreare comportamenti con `div`.
- Associare ogni input a una `label` esplicita.
- Usare attributi ARIA solo quando il markup semantico non è sufficiente.
- Garantire navigazione da tastiera e focus visibile.
- Evitare stili inline e handler JavaScript inline.
- Usare `data-*` per collegare comportamento e DOM senza dipendere da classi decorative.
- Non inserire contenuti non controllati tramite `innerHTML`.

## 4. Convenzioni CSS

- Centralizzare i design token in `assets/css/tokens.css`.
- Usare custom properties per colori, spaziature, tipografia, ombre e breakpoint.
- Adottare classi descrittive e componenti riutilizzabili.
- Evitare selettori eccessivamente specifici e uso non motivato di `!important`.
- Mobile first, con layout progressivamente migliorato.
- Nessun colore deve essere l’unico indicatore di stato.
- Rispettare `prefers-reduced-motion`.
- Limitare animazioni a casi funzionali.
- Non duplicare valori già disponibili come token.
- Mantenere separati reset/base, componenti e regole specifiche di pagina.

## 5. Convenzioni JavaScript

- Usare JavaScript ES6+ e moduli quando la struttura lo richiede.
- Preferire `const`; usare `let` solo per riassegnazioni reali.
- Evitare variabili globali.
- Una funzione deve avere una responsabilità chiara.
- Separare logica di dominio, accesso ai dati, rendering e gestione eventi.
- Validare gli input al confine del sistema.
- Gestire esplicitamente errori e stati vuoti.
- Usare nomi descrittivi; evitare abbreviazioni ambigue.
- Documentare formule, regole normative e decisioni non ovvie.
- Non introdurre dipendenze senza approvazione.
- Non affidare la correttezza soltanto all’interfaccia: le regole devono essere validate nella logica.

## 6. Naming

### File e cartelle

- `kebab-case` per file HTML, CSS, JSON e cartelle;
- `camelCase` per file JavaScript solo se coerente con il modulo; preferire comunque `kebab-case` nei nomi di percorso;
- nomi sostantivi per dati e componenti;
- nomi verbali per funzioni e azioni.

### Codice

- variabili e funzioni: `camelCase`;
- costanti globali immutabili: `UPPER_SNAKE_CASE`;
- classi JavaScript: `PascalCase`;
- classi CSS: nomi leggibili e coerenti, ad esempio `.status-badge`, `.checklist-item`;
- attributi dati: `data-module`, `data-action`, `data-id`.

### Identificatori di dominio

Gli identificatori devono essere stabili, leggibili e non dipendere dal testo mostrato, ad esempio:

- `REQ-AULA-001`;
- `SRC-REG-001`;
- `CHK-SEDE-001`.

## 7. Standard qualitativi

Ogni modifica deve garantire:

- leggibilità;
- coerenza architetturale;
- accessibilità;
- responsive design;
- validazione degli input;
- assenza di dati sensibili;
- tracciabilità delle fonti;
- gestione degli errori;
- compatibilità con browser moderni;
- documentazione aggiornata;
- assenza di codice morto o duplicato.

Le funzionalità critiche devono poter essere testate con casi nominali, limiti, input invalidi e assenza di dati.

## 8. Gestione di localStorage

`localStorage` è ammesso solo nella fase statica e per dati non sensibili.

Regole:

- usare un namespace unico, ad esempio `janusQuality`;
- definire una versione dello schema;
- centralizzare lettura, scrittura, cancellazione e migrazione in `storage.js`;
- serializzare esclusivamente JSON valido;
- gestire dati mancanti, corrotti o incompatibili;
- non salvare password, token, documenti, dati sanitari o dati personali non necessari;
- prevedere una funzione di reset esplicita;
- non usare `localStorage` come sostituto permanente di un database;
- documentare chiavi e struttura dati.

Esempio concettuale:

```json
{
  "schemaVersion": 1,
  "preferences": {},
  "drafts": {}
}
```

## 9. Dati e fonti normative

- Conservare requisiti e fonti in file JSON separati.
- Collegare i requisiti alle fonti tramite identificatori.
- Usare date ISO `YYYY-MM-DD`.
- Distinguere campi normativi, interpretativi e operativi.
- Non eliminare una fonte sostituita senza conservarne la tracciabilità.
- Validare unicità degli ID e riferimenti incrociati.

## 10. Convenzioni commit

Preferire Conventional Commits:

- `docs:` documentazione;
- `feat:` nuova funzionalità;
- `fix:` correzione;
- `refactor:` riorganizzazione senza variazione funzionale;
- `test:` test;
- `style:` modifiche esclusivamente visive o di formattazione;
- `chore:` manutenzione e configurazione.

Regole:

- messaggio in inglese, breve e specifico;
- verbo all’imperativo;
- un commit per unità logica;
- evitare commit misti e messaggi generici;
- includere documentazione e test pertinenti nello stesso commit funzionale quando opportuno.

## 11. Branch e modifiche

- Il branch predefinito è `main`.
- Interventi semplici e autorizzati possono essere applicati direttamente a `main` quando richiesto.
- Funzionalità rilevanti dovrebbero usare branch dedicati e pull request quando il processo collaborativo sarà attivo.
- Non riscrivere la cronologia condivisa.
- Non effettuare force push salvo autorizzazione esplicita.

## 12. Checklist tecnica prima di ogni commit

### Ambito

- [ ] La modifica è richiesta e rientra nella roadmap corrente.
- [ ] Sono stati letti i file di contesto pertinenti.
- [ ] È stata verificata l’esistenza dei file prima di crearli.

### Codice

- [ ] HTML semantico e accessibile.
- [ ] CSS coerente con i token e senza duplicazioni evitabili.
- [ ] JavaScript modulare, senza globali e con gestione errori.
- [ ] Input validati e output sicuri.
- [ ] Nessun dato sensibile o segreto.

### Dati

- [ ] ID univoci e stabili.
- [ ] Fonti ufficiali collegate ai requisiti.
- [ ] Date e formati coerenti.
- [ ] Migrazione prevista se cambia lo schema di storage.

### Verifica

- [ ] Funzionamento verificato nei casi principali e limite.
- [ ] Navigazione da tastiera controllata.
- [ ] Layout verificato su viewport differenti.
- [ ] Console priva di errori evitabili.
- [ ] Documentazione aggiornata.

### Commit

- [ ] Diff limitato all’obiettivo.
- [ ] Nessun file temporaneo o generato.
- [ ] Messaggio descrittivo e conforme alle convenzioni.
- [ ] Hash del commit registrato nel riepilogo operativo quando richiesto.

## 13. Definition of Done

Una modifica è completata quando è implementata, verificata, accessibile, documentata, priva di segreti, coerente con il modello dati e salvata nel repository con un commit descrittivo.
