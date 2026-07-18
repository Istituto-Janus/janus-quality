# AI Context — Janus Quality & Accreditamenti

## Scopo di questo file

Questo documento è destinato agli assistenti AI che lavorano sul repository `Istituto-Janus/janus-quality`. Deve essere letto prima di proporre o applicare modifiche.

## Cos'è il progetto

Janus Quality & Accreditamenti è il sistema digitale di Istituto Janus per organizzare requisiti, fonti normative, checklist, verifiche di sedi e aule, comparazioni, calcoli preliminari, evidenze, non conformità e processi di qualità.

Il sistema supporta il lavoro interno, ma non sostituisce verifiche professionali, pareri legali, certificazioni o decisioni degli enti competenti. I risultati prodotti dalla futura applicazione devono essere presentati come strumenti di supporto e devono mantenere sempre tracciabilità delle fonti.

## Ordine obbligatorio di lettura

Prima di modificare codice o documentazione, leggere nell'ordine:

1. `README.md` — orientamento generale e accesso alla documentazione;
2. `PROJECT.md` — visione, architettura, moduli, confini e principi;
3. `AI_CONTEXT.md` — regole operative per assistenti AI;
4. `DEVELOPMENT.md` — convenzioni tecniche e checklist;
5. `ROADMAP.md` — priorità e fasi approvate;
6. tutti i file direttamente coinvolti dalla modifica.

Se esistono issue, pull request o specifiche più recenti, verificarle prima di intervenire.

## Organizzazione prevista

La prima versione sarà una web application statica con HTML5, CSS e JavaScript ES6+, dati JSON e persistenza locale limitata. L'architettura potrà evolvere verso backend, autenticazione, database, ruoli, workflow e audit trail solo quando approvato.

Moduli principali previsti:

- dashboard;
- checklist;
- comparatore requisiti;
- calcolatore aula;
- archivio fonti normative;
- gestione sedi e progetti;
- evidenze e documenti;
- non conformità e azioni correttive;
- scadenze, report e audit.

## Tecnologie da utilizzare

Fino a diversa decisione documentata:

- HTML5 semantico;
- CSS moderno con custom properties e approccio modulare;
- JavaScript ES6+ in moduli;
- JSON per dati versionati;
- `localStorage` esclusivamente per dati non sensibili e preferenze locali;
- GitHub come fonte primaria del codice e della documentazione.

Non introdurre framework, package manager, build system, database o servizi esterni senza richiesta esplicita e motivazione architetturale.

## Regole obbligatorie

- Verificare sempre se un file esiste prima di crearlo.
- Leggere il contenuto corrente prima di aggiornarlo.
- Preservare le funzionalità esistenti salvo richiesta contraria.
- Mantenere coerenza tra codice, documentazione e roadmap.
- Separare struttura, presentazione, logica e dati.
- Utilizzare identificatori stabili per requisiti, fonti e checklist.
- Associare ogni requisito normativo a una fonte ufficiale verificabile.
- Dichiarare chiaramente ipotesi, limiti e dati mancanti.
- Applicare accessibilità, sicurezza, privacy e minimizzazione dei dati.
- Effettuare modifiche piccole, comprensibili e reversibili.
- Aggiornare la documentazione quando cambiano architettura, dati o comportamento.

## Cosa non deve mai essere fatto

- Non inventare norme, requisiti, soglie, autorizzazioni o riferimenti.
- Non presentare dati non verificati come certi.
- Non descrivere l'applicazione come strumento di certificazione automatica.
- Non salvare dati personali, documenti riservati, credenziali o segreti nel repository o in `localStorage`.
- Non inserire token, password, chiavi API o configurazioni sensibili.
- Non duplicare costanti, token grafici o regole di calcolo in più file senza necessità.
- Non usare `innerHTML` con contenuti non controllati.
- Non disabilitare controlli, accessibilità o validazioni per accelerare lo sviluppo.
- Non introdurre dipendenze non approvate.
- Non sviluppare funzionalità fuori dalla fase corrente della roadmap.
- Non creare file ZIP o artefatti paralleli quando è richiesto di lavorare sul repository.
- Non limitarsi a mostrare codice in chat quando è richiesto un intervento reale su GitHub.

## Modalità di lavoro su GitHub

Quando l'utente richiede un intervento reale sul repository:

1. operare direttamente su `Istituto-Janus/janus-quality` tramite il connettore GitHub;
2. verificare repository, branch e permessi;
3. leggere i file interessati;
4. creare o aggiornare i file sul branch indicato;
5. effettuare commit reali e descrittivi;
6. verificare il contenuto dopo la scrittura quando possibile;
7. riportare file creati, file modificati, branch, hash dei commit ed eventuali errori.

Non simulare operazioni e non dichiarare completata una modifica senza un risultato restituito dal connettore.

## Convenzioni commit

Usare messaggi brevi, specifici e in forma imperativa, preferibilmente secondo Conventional Commits:

- `docs: describe project architecture`
- `feat: add classroom capacity calculator`
- `fix: correct checklist persistence`
- `refactor: isolate storage service`
- `test: add comparator validation cases`
- `chore: update repository configuration`

Un commit deve rappresentare un'unità logica. Evitare messaggi generici come `update`, `changes` o `fix stuff`.

## Gestione delle fonti normative

- Usare fonti ufficiali e indicare ente, titolo, data, ambito e URL.
- Distinguere testo normativo, interpretazione interna e regola applicativa.
- Segnalare fonti obsolete, sostituite o non verificate.
- Non modificare una soglia senza aggiornare fonte, data di verifica e logica correlata.
- In caso di dubbio, fermare l'affermazione normativa e segnalare la necessità di verifica.

## Criterio di completamento

Una modifica è completa solo se:

- rispetta la fase della roadmap;
- è coerente con l'architettura;
- non introduce rischi non dichiarati;
- è leggibile e verificabile;
- include gli aggiornamenti documentali necessari;
- è stata salvata realmente su GitHub con commit identificabile.
