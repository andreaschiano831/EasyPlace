# SalaPro — App di Gestione Sala v2.0

## Installazione rapida (3 passi)

Prerequisiti: Node.js 18+ (nodejs.org)

```bash
cd salapro-app
npm install
npm run dev
```
Apri http://localhost:5173

---

## Installare come app sul dispositivo (PWA)

### iPhone / iPad (Safari)
1. Apri nel browser Safari
2. Tocca Condividi (riquadro con freccia su)
3. "Aggiungi alla schermata Home"
4. Conferma — l'icona SalaPro apparira nella home

### Android (Chrome)
1. Apri in Chrome
2. Menu tre puntini > "Aggiungi alla schermata Home"

### Mac / Windows (Chrome o Edge)
1. Nella barra indirizzi compare icona installa
2. Clicca "Installa SalaPro" — si apre come app nativa separata

---

## Deploy in rete locale (stessa WiFi per tutto lo staff)

```bash
npm run build
npm run preview -- --host
```
Condividi l'indirizzo IP con i tablet del personale.

## Deploy online gratuito (Netlify)
1. npm run build
2. Vai su netlify.com > "Deploy manually"
3. Trascina la cartella dist/
4. URL pubblico in 30 secondi

---

## Struttura progetto

```
salapro-app/
  src/
    App.jsx      <- Tutta l'app
    main.jsx     <- Entry point
  public/
    icons/       <- Icone PWA (genera con pwa-asset-generator)
  index.html
  vite.config.js
  package.json
```

## Generare icone PWA

```bash
npm install -g pwa-asset-generator
pwa-asset-generator logo.png public/icons --background "#0E1118"
```

Oppure usa realfavicongenerator.net

---

## Integrazione KitchenPro

Funziona automaticamente se entrambe le app sono aperte nello stesso browser. I dati sono condivisi via localStorage.

---

## Sezioni app

- Dashboard — panoramica serata e allergie
- Prenotazioni — VIP / Promo / Standard
- Guest List — check-in COMP / REDUCED / FULL
- Floorplan — mappa tavoli drag and drop, zone personalizzabili
- Clienti — CRM allergie, visite, spesa
- Tally — contatore porta per promotore
- Servizio — ordini per tavolo con piatti e vini
- Sommeliere — cantina, grafici, import CSV
- Giacenze — posate, biancheria, porcellane, cristalli
- Briefing — briefing serata con invio cucina
- Checklist — mis en place, HACCP, candele, cristalli
- KitchenPro Bridge — sincronizzazione cucina

Tutti i dati salvati localmente nel dispositivo. Nessun server esterno.

SalaPro v2.0
