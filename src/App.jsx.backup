// @ts-nocheck
import React from "react";
import { useState, useEffect, useCallback, useRef, useMemo, useReducer, createContext, useContext } from "react";

/* ══════════════════════════════════════════════════════════
   UTILS
══════════════════════════════════════════════════════════ */
const genId = () => Math.random().toString(36).slice(2,9) + Date.now().toString(36);
const nowISO = () => new Date().toISOString();
const todayDate = () => new Date().toISOString().slice(0,10);
const fmtEur = (n) => `€ ${Number(n||0).toLocaleString("it-IT",{minimumFractionDigits:2,maximumFractionDigits:2})}`;
function useIsMobile(bp=768) {
  const [m,setM] = useState(()=>typeof window!=="undefined"?window.innerWidth<bp:false);
  useEffect(()=>{ const fn=()=>setM(window.innerWidth<bp); window.addEventListener("resize",fn,{passive:true}); return()=>window.removeEventListener("resize",fn); },[bp]);
  return m;
}

/* ══════════════════════════════════════════════════════════
   TOAST SYSTEM
══════════════════════════════════════════════════════════ */
const ToastCtx = createContext(null);
function useToast() { return useContext(ToastCtx); }

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const toast = useCallback((msg, type = "success", duration = 3000) => {
    const id = genId();
    setToasts(ts => [...ts, { id, msg, type }]);
    setTimeout(() => setToasts(ts => ts.filter(t => t.id !== id)), duration);
  }, []);
  return (
    <ToastCtx.Provider value={toast}>
      {children}
      <div style={{ position: "fixed", bottom: 72, right: 16, zIndex: 9999, display: "flex", flexDirection: "column", gap: 8, pointerEvents: "none" }}>
        {toasts.map(t => (
          <div key={t.id} style={{
            padding: "12px 18px", borderRadius: 12, fontSize: 13, fontWeight: 600,
            background: t.type === "success" ? "#1A3A28" : t.type === "error" ? "#3A1A1A" : "#1A2A3A",
            color: t.type === "success" ? "#4EC97A" : t.type === "error" ? "#F05C5C" : "#4DBBDB",
            border: `1px solid ${t.type === "success" ? "#4EC97A44" : t.type === "error" ? "#F05C5C44" : "#4DBBDB44"}`,
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            animation: "slideInRight 0.3s ease",
            maxWidth: 320,
          }}>
            {t.type === "success" ? "✓ " : t.type === "error" ? "✗ " : "ℹ "}{t.msg}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

/* ══════════════════════════════════════════════════════════
   PRINT UTILITY
══════════════════════════════════════════════════════════ */
function printContent(html, title = "SalaPro") {
  const w = window.open("", "_blank", "width=800,height=600");
  w.document.write(`<!DOCTYPE html><html><head><title>${title}</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: Arial, sans-serif; padding: 32px; color: #111; }
      h1 { font-size: 22px; margin-bottom: 6px; }
      h2 { font-size: 16px; margin: 20px 0 10px; border-bottom: 1px solid #ddd; padding-bottom: 6px; }
      table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
      th { text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #666; padding: 6px 8px; border-bottom: 2px solid #ddd; }
      td { padding: 8px; border-bottom: 1px solid #eee; font-size: 13px; }
      .total { font-weight: 700; font-size: 18px; margin-top: 12px; text-align: right; }
      .badge { display: inline-block; padding: 2px 8px; border-radius: 12px; font-size: 10px; font-weight: 700; background: #f0f0f0; }
      .vip { background: #FFF3CD; color: #856404; }
      .allergia { background: #FFF3CD; color: #B45309; padding: 2px 6px; border-radius: 4px; font-size: 11px; }
      @media print { body { padding: 16px; } }
    </style>
  </head><body>${html}<script>window.onload=()=>{window.print();setTimeout(()=>window.close(),500)}<\/script></body></html>`);
  w.document.close();
}

function formatDuration(isoStart) {
  if (!isoStart) return "";
  const mins = Math.floor((Date.now() - new Date(isoStart).getTime()) / 60000);
  if (mins < 60) return `${mins}m`;
  return `${Math.floor(mins / 60)}h ${mins % 60}m`;
}

function timeGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Buongiorno";
  if (h < 18) return "Buon pomeriggio";
  if (h < 22) return "Buonasera";
  return "Buonanotte";
}



/* ══════════════════════════════════════════════════════════
   THEMES
══════════════════════════════════════════════════════════ */
const THEMES = {
  notte:{name:"Notte",icon:"🌙",bg:"#0E1118",bgAlt:"#141920",bgCard:"#181F2B",bgCardAlt:"#1E2738",bgInput:"rgba(255,255,255,0.04)",ink:"#E8E2D6",inkSoft:"#B0A898",inkMuted:"#6A6560",inkFaint:"#3E3C38",accent:"#7C6EF5",accentDeep:"#5A4FBF",accentGlow:"rgba(124,110,245,0.18)",gold:"#F0B84C",goldDim:"rgba(240,184,76,0.20)",goldFaint:"rgba(240,184,76,0.07)",success:"#4EC97A",warning:"#F0B84C",danger:"#F05C5C",vip:"#D4A843",promo:"#4EC97A",div:"rgba(255,255,255,0.06)",divStrong:"rgba(255,255,255,0.12)",shadow:"rgba(0,0,0,0.35)",shadowStrong:"rgba(0,0,0,0.55)"},
  ardesia:{name:"Ardesia",icon:"🪨",bg:"#1A1C22",bgAlt:"#20232B",bgCard:"#252830",bgCardAlt:"#2B2E38",bgInput:"rgba(255,255,255,0.05)",ink:"#E2DDD6",inkSoft:"#A8A39C",inkMuted:"#646060",inkFaint:"#3A3835",accent:"#E07B5C",accentDeep:"#B85A3E",accentGlow:"rgba(224,123,92,0.18)",gold:"#D4A843",goldDim:"rgba(212,168,67,0.25)",goldFaint:"rgba(212,168,67,0.07)",success:"#58A86E",warning:"#D4A843",danger:"#D95C5C",vip:"#D4A843",promo:"#58A86E",div:"rgba(255,255,255,0.06)",divStrong:"rgba(255,255,255,0.12)",shadow:"rgba(0,0,0,0.30)",shadowStrong:"rgba(0,0,0,0.50)"},
  luxury:{name:"Luxury",icon:"👑",bg:"#0A090C",bgAlt:"#121016",bgCard:"#1A1720",bgCardAlt:"#201C28",bgInput:"rgba(255,255,255,0.04)",ink:"#F0EAE0",inkSoft:"#B8B0A4",inkMuted:"#706868",inkFaint:"#403C3C",accent:"#C9963B",accentDeep:"#A07028",accentGlow:"rgba(201,150,59,0.20)",gold:"#C9963B",goldDim:"rgba(201,150,59,0.25)",goldFaint:"rgba(201,150,59,0.08)",success:"#5A9E70",warning:"#C9963B",danger:"#B85050",vip:"#C9963B",promo:"#5A9E70",div:"rgba(255,255,255,0.05)",divStrong:"rgba(255,255,255,0.10)",shadow:"rgba(0,0,0,0.50)",shadowStrong:"rgba(0,0,0,0.70)"},
  aurora:{name:"Aurora",icon:"🌌",bg:"#0C1020",bgAlt:"#111828",bgCard:"#161F30",bgCardAlt:"#1C2838",bgInput:"rgba(255,255,255,0.05)",ink:"#DDE8F0",inkSoft:"#8FA8BE",inkMuted:"#5A7088",inkFaint:"#354560",accent:"#4DBBDB",accentDeep:"#2A90AA",accentGlow:"rgba(77,187,219,0.18)",gold:"#F0C860",goldDim:"rgba(240,200,96,0.22)",goldFaint:"rgba(240,200,96,0.07)",success:"#5EC490",warning:"#F0C860",danger:"#F07070",vip:"#F0C860",promo:"#5EC490",div:"rgba(255,255,255,0.06)",divStrong:"rgba(255,255,255,0.12)",shadow:"rgba(0,0,0,0.40)",shadowStrong:"rgba(0,0,0,0.60)"},
};

/* ══════════════════════════════════════════════════════════
   SEED DATA
══════════════════════════════════════════════════════════ */
const SEED_PRENOTAZIONI = [
  {id:"p1",nome:"Alexa",cognome:"Detzi",via:"Walkup",tavolo:null,ospiti:2,minimo:"COMP",note:"",tipo:"normal",stato:"upcoming",allergie:[],telefono:"",ora:"22:00",arrivo:null},
  {id:"p2",nome:"Alexander",cognome:"Andrews",via:"John Henry",tavolo:null,ospiti:2,minimo:"2 bottles",note:"",tipo:"VIP",stato:"upcoming",allergie:["glutine"],telefono:"+39 555 0101",ora:"22:30",arrivo:null},
  {id:"p3",nome:"Angelia",cognome:"Middleton",via:"Johnny",tavolo:null,ospiti:4,minimo:"3 bottles",note:"CC registrata. Nuovo cliente.",tipo:"VIP",stato:"upcoming",allergie:["lattosio"],telefono:"+39 555 0202",ora:"22:00",arrivo:null},
  {id:"p4",nome:"Beth",cognome:"Brady",via:"John Henry",tavolo:"10",ospiti:5,minimo:"NO MIN",note:"Prenotato da Chris fitzmorris",tipo:"normal",stato:"upcoming",allergie:[],telefono:"+39 555 0303",ora:"23:00",arrivo:null},
  {id:"p5",nome:"Blaine",cognome:"Paciello",via:"Marissa",tavolo:"11",ospiti:4,minimo:"€1.500",note:"Giocatore di basket. Sparklers extra",tipo:"VIP",stato:"upcoming",allergie:["frutta secca"],telefono:"+39 555 0404",ora:"23:30",arrivo:null},
  {id:"p6",nome:"Brad",cognome:"Cristophe",via:"Lina",tavolo:null,ospiti:2,minimo:"€2.000",note:"QB per gli Sharks.",tipo:"VIP",stato:"upcoming",allergie:[],telefono:"+39 555 0505",ora:"22:00",arrivo:null},
  {id:"p7",nome:"Corey",cognome:"Lucas",via:"Marc Stern",tavolo:"12",ospiti:2,minimo:"COMP",note:"Wait list lounge",tipo:"Promo",stato:"upcoming",allergie:[],telefono:"",ora:"00:00",arrivo:null},
  {id:"p9",nome:"Kyle",cognome:"Christian",via:"Direct",tavolo:"14",ospiti:3,minimo:"€1.200",note:"Regular, sempre tavolo 14",tipo:"VIP",stato:"arrived",allergie:[],telefono:"+39 555 0707",ora:"22:00",arrivo:"22:05"},
  {id:"p10",nome:"Cristopher",cognome:"Chung",via:"John Henry",tavolo:"50",ospiti:4,minimo:"€1.200",note:"TEQUILA ROOM",tipo:"VIP",stato:"seated",allergie:[],telefono:"+39 555 0808",ora:"21:30",arrivo:"21:35"},
];
const SEED_GUESTLIST=[
  {id:"g1",nome:"Kai Duarte",booked_by:"Natalie Gosnell",note:"",stato:"pending",ora:"",categoria:"FULL"},
  {id:"g2",nome:"Kayden Mann",booked_by:"Natalie Gosnell",note:"",stato:"checkedin",ora:"22:44",categoria:"FULL"},
  {id:"g3",nome:"Kayla Espinosa +2",booked_by:"Natalie Gosnell",note:"VIV After-Party",stato:"pending",ora:"",categoria:"COMP"},
  {id:"g4",nome:"Keaton Slade",booked_by:"Natalie Gosnell",note:"",stato:"pending",ora:"",categoria:"REDUCED"},
  {id:"g5",nome:"Kimberly Barnard",booked_by:"Natalie Gosnell",note:"actress and model",stato:"pending",ora:"",categoria:"FULL"},
  {id:"g6",nome:"Lane Cavazos",booked_by:"Natalie Gosnell",note:"",stato:"pending",ora:"",categoria:"FULL"},
  {id:"g7",nome:"Mariana Gilman +4",booked_by:"Natalie Gosnell",note:"VIV After-Party",stato:"pending",ora:"",categoria:"COMP"},
  {id:"g9",nome:"Mason Fortier +2",booked_by:"Natalie Gosnell",note:"ACA Group",stato:"pending",ora:"",categoria:"FULL"},
  {id:"g11",nome:"Oscar Leavitt",booked_by:"Natalie Gosnell",note:"",stato:"pending",ora:"",categoria:"FULL"},
];
const SEED_CLIENTI=[
  {id:"c1",nome:"Kyle Christian",telefono:"+39 555 0707",email:"kyle@email.com",note:"Regular, sempre tavolo 14",vip:true,allergie:[],visite:12,spesaTotale:18400},
  {id:"c2",nome:"Blaine Paciello",telefono:"+39 555 0404",email:"blaine@email.com",note:"Sparklers sempre",vip:true,allergie:["frutta secca"],visite:8,spesaTotale:12000},
  {id:"c3",nome:"Alexander Andrews",telefono:"+39 555 0101",email:"alex@email.com",note:"",vip:true,allergie:["glutine"],visite:5,spesaTotale:8500},
  {id:"c5",nome:"Cristopher Chung",telefono:"+39 555 0808",email:"cchung@email.com",note:"Tequila room preferito",vip:true,allergie:[],visite:15,spesaTotale:22000},
];
const SEED_PROMOTORI=[
  {id:"pr1",nome:"Adam",totale:0,m:0,f:0,comp:0,reduced:0,full:0},
  {id:"pr2",nome:"Andy",totale:5,m:2,f:3,comp:0,reduced:0,full:5},
  {id:"pr3",nome:"Chloe Franc",totale:3,m:0,f:3,comp:3,reduced:0,full:0},
  {id:"pr4",nome:"Natalie Gosnell",totale:9,m:3,f:6,comp:2,reduced:2,full:5},
];
const SEED_TAVOLI=[
  {id:"t10",num:"10",cap:6,zona:"Main Room",stato:"occupied",pren_id:"p4",x:18,y:52,forma:"rect"},
  {id:"t11",num:"11",cap:4,zona:"Main Room",stato:"occupied",pren_id:"p5",x:32,y:52,forma:"square"},
  {id:"t12",num:"12",cap:4,zona:"Main Room",stato:"occupied",pren_id:"p7",x:48,y:52,forma:"square"},
  {id:"t13",num:"13",cap:4,zona:"Main Room",stato:"reserved",pren_id:null,x:64,y:22,forma:"round"},
  {id:"t14",num:"14",cap:4,zona:"Main Room",stato:"occupied",pren_id:"p9",x:76,y:22,forma:"round"},
  {id:"t20",num:"20",cap:4,zona:"Main Room",stato:"free",pren_id:null,x:18,y:68,forma:"square"},
  {id:"t21",num:"21",cap:6,zona:"Main Room",stato:"reserved",pren_id:null,x:30,y:68,forma:"rect"},
  {id:"t22",num:"22",cap:6,zona:"Main Room",stato:"occupied",pren_id:null,x:46,y:68,forma:"rect"},
  {id:"t24",num:"24",cap:4,zona:"Main Room",stato:"free",pren_id:null,x:63,y:62,forma:"square"},
  {id:"t25",num:"25",cap:4,zona:"Main Room",stato:"free",pren_id:null,x:63,y:74,forma:"square"},
  {id:"t30",num:"30",cap:6,zona:"Main Room",stato:"free",pren_id:null,x:50,y:82,forma:"rect_lg"},
  {id:"t31",num:"31",cap:4,zona:"Main Room",stato:"free",pren_id:null,x:25,y:88,forma:"round"},
  {id:"t32",num:"32",cap:4,zona:"Main Room",stato:"free",pren_id:null,x:40,y:88,forma:"round"},
  {id:"t33",num:"33",cap:8,zona:"Main Room",stato:"occupied",pren_id:null,x:52,y:88,forma:"banquet"},
  {id:"t50",num:"50",cap:6,zona:"Mezzanine",stato:"occupied",pren_id:"p10",x:22,y:35,forma:"rect"},
  {id:"t51",num:"51",cap:4,zona:"Mezzanine",stato:"free",pren_id:null,x:50,y:35,forma:"round"},
  {id:"t52",num:"52",cap:4,zona:"Mezzanine",stato:"free",pren_id:null,x:75,y:35,forma:"round"},
  {id:"t60",num:"60",cap:4,zona:"Lounge",stato:"free",pren_id:null,x:30,y:40,forma:"oval"},
  {id:"t61",num:"61",cap:4,zona:"Lounge",stato:"free",pren_id:null,x:60,y:40,forma:"oval"},
];
const SEED_ZONE=[
  {id:"z1",nome:"Main Room",colore:"#7C6EF5"},
  {id:"z2",nome:"Mezzanine",colore:"#4EC97A"},
  {id:"z3",nome:"Lounge",colore:"#F0B84C"},
];
const SEED_VINI=[
  {id:"v1",nome:"Barolo Cannubi",produttore:"Marchesi di Barolo",annata:"2018",tipo:"rosso",regione:"Piemonte",pAcquisto:28,pVendita:95,quantita:24,minStock:6,note:"Etichetta principale",vendite:[{data:"2024-01-10",qty:2},{data:"2024-01-15",qty:1},{data:"2024-01-20",qty:3},{data:"2024-02-01",qty:2},{data:"2024-02-10",qty:4},{data:"2024-02-18",qty:2}]},
  {id:"v2",nome:"Brunello di Montalcino",produttore:"Biondi Santi",annata:"2017",tipo:"rosso",regione:"Toscana",pAcquisto:55,pVendita:180,quantita:12,minStock:3,note:"Top seller VIP",vendite:[{data:"2024-01-08",qty:1},{data:"2024-01-22",qty:2},{data:"2024-02-05",qty:1},{data:"2024-02-14",qty:2}]},
  {id:"v3",nome:"Franciacorta DOCG Extra Brut",produttore:"Ca' del Bosco",annata:"NV",tipo:"spumante",regione:"Lombardia",pAcquisto:18,pVendita:65,quantita:36,minStock:12,note:"Aperitivo ufficiale",vendite:[{data:"2024-01-05",qty:4},{data:"2024-01-12",qty:6},{data:"2024-01-19",qty:3},{data:"2024-01-26",qty:5},{data:"2024-02-02",qty:7},{data:"2024-02-09",qty:4},{data:"2024-02-16",qty:6}]},
  {id:"v4",nome:"Champagne Blanc de Blancs",produttore:"Dom Pérignon",annata:"2013",tipo:"champagne",regione:"Francia",pAcquisto:120,pVendita:380,quantita:8,minStock:2,note:"Solo VIP",vendite:[{data:"2024-01-14",qty:1},{data:"2024-02-08",qty:1}]},
  {id:"v5",nome:"Gavi di Gavi DOCG",produttore:"La Scolca",annata:"2022",tipo:"bianco",regione:"Piemonte",pAcquisto:12,pVendita:42,quantita:30,minStock:8,note:"",vendite:[{data:"2024-01-06",qty:3},{data:"2024-01-13",qty:4},{data:"2024-01-20",qty:2},{data:"2024-02-03",qty:5},{data:"2024-02-17",qty:3}]},
  {id:"v6",nome:"Amarone della Valpolicella",produttore:"Allegrini",annata:"2016",tipo:"rosso",regione:"Veneto",pAcquisto:38,pVendita:125,quantita:18,minStock:4,note:"Abbinamento bistecca",vendite:[{data:"2024-01-09",qty:2},{data:"2024-01-23",qty:1},{data:"2024-02-06",qty:3}]},
  {id:"v7",nome:"Prosecco Superiore DOCG",produttore:"Ruggeri",annata:"2023",tipo:"spumante",regione:"Veneto",pAcquisto:9,pVendita:32,quantita:48,minStock:18,note:"Per cocktail e mise",vendite:[{data:"2024-01-04",qty:8},{data:"2024-01-11",qty:6},{data:"2024-01-18",qty:9},{data:"2024-01-25",qty:7},{data:"2024-02-01",qty:10},{data:"2024-02-08",qty:8},{data:"2024-02-15",qty:11}]},
  {id:"v8",nome:"Vermentino di Sardegna",produttore:"Argiolas",annata:"2022",tipo:"bianco",regione:"Sardegna",pAcquisto:10,pVendita:35,quantita:20,minStock:6,note:"",vendite:[{data:"2024-01-07",qty:2},{data:"2024-01-21",qty:3},{data:"2024-02-11",qty:2}]},
];
const SEED_GIACENZE={
  posate:[
    {id:"pos1",tipo:"Forchetta da pranzo",quantita:120,min:80,note:""},
    {id:"pos2",tipo:"Coltello da pranzo",quantita:118,min:80,note:""},
    {id:"pos3",tipo:"Cucchiaio da pranzo",quantita:115,min:80,note:""},
    {id:"pos4",tipo:"Forchettina dessert",quantita:85,min:60,note:""},
    {id:"pos5",tipo:"Cucchiaino caffè",quantita:90,min:60,note:""},
    {id:"pos6",tipo:"Forchetta pesce",quantita:60,min:40,note:""},
    {id:"pos7",tipo:"Coltello pesce",quantita:58,min:40,note:""},
    {id:"pos8",tipo:"Cucchiaio grande servizio",quantita:24,min:12,note:""},
  ],
  biancheria:[
    {id:"bia1",tipo:"Tovaglie 180x180",quantita:30,min:20,note:"Bianche"},
    {id:"bia2",tipo:"Tovaglie 200x200",quantita:20,min:12,note:"Bianche grandi"},
    {id:"bia3",tipo:"Tovaglioli cotone",quantita:180,min:120,note:""},
    {id:"bia4",tipo:"Runner decorativi",quantita:25,min:15,note:"Rosso bordeaux"},
    {id:"bia5",tipo:"Coprimacchie",quantita:40,min:25,note:""},
  ],
  porcellane:[
    {id:"por1",tipo:"Piatto piano 27cm",quantita:100,min:80,note:"Bianco bordo oro"},
    {id:"por2",tipo:"Piatto fondo 22cm",quantita:95,min:80,note:""},
    {id:"por3",tipo:"Piatto dessert 19cm",quantita:90,min:70,note:""},
    {id:"por4",tipo:"Tazza caffè",quantita:60,min:40,note:""},
    {id:"por5",tipo:"Piattino tazza",quantita:60,min:40,note:""},
    {id:"por6",tipo:"Piatto pane",quantita:85,min:70,note:""},
    {id:"por7",tipo:"Ciotola amuse-bouche",quantita:40,min:30,note:""},
  ],
  cristalli:[
    {id:"cri1",tipo:"Calice Bordeaux",quantita:80,min:60,note:"Riedel Vinum"},
    {id:"cri2",tipo:"Calice Borgogna",quantita:48,min:36,note:"Riedel Vinum"},
    {id:"cri3",tipo:"Calice Bianco",quantita:80,min:60,note:"Riedel Vinum"},
    {id:"cri4",tipo:"Flûte Champagne",quantita:70,min:48,note:""},
    {id:"cri5",tipo:"Bicchiere acqua",quantita:100,min:80,note:""},
    {id:"cri6",tipo:"Tumbler cocktail",quantita:60,min:40,note:""},
    {id:"cri7",tipo:"Coppa Martini",quantita:35,min:20,note:""},
    {id:"cri8",tipo:"Ballon Cognac",quantita:24,min:12,note:""},
  ],
};
const SEED_CHECKLIST_TEMPLATES=[
  {cat:"Mis en Place",items:[
    "Tavoli apparecchiati correttamente","Posate allineate e lucide","Bicchieri senza impronte","Tovaglioli piegati","Menù posizionati","Sale, pepe e condimenti riforniti","Centrotavola / decorazioni","Candele pronte / accese",
  ]},
  {cat:"HACCP Frigo Sala",items:[
    "Temperatura frigo vini verificata (8-12°C)","Temperatura frigo bevande verificata (4-6°C)","Prodotti etichettati con data apertura","Separazione corretta dei prodotti","Pulizia interna verificata","Registro temperature aggiornato",
  ]},
  {cat:"Posate",items:[
    "Conteggio posate effettuato","Posate pulite e senza macchie","Posate ordinate per tipo","Scorta di riserva disponibile","Posate speciali (pesce, dessert) verificate",
  ]},
  {cat:"Vassoi",items:[
    "Vassoi puliti e senza danni","Tappetini anti-scivolo verificati","Scorta vassoi sufficiente","Vassoi grandi per servizio tavola disponibili",
  ]},
  {cat:"Candele",items:[
    "Candele nuove su tutti i tavoli","Scorta candele disponibile (min 20%)","Accendini / fiammiferi disponibili","Portacandele puliti",
  ]},
  {cat:"Cristalli / Bicchieri",items:[
    "Calici rosso verificati e lucidati","Calici bianco verificati e lucidati","Flûte champagne pronte","Bicchieri acqua lucidati","Scorta bicchieri disponibile","Nessun bicchiere rotto o scheggiato",
  ]},
  {cat:"Servizi Aggiuntivi",items:[
    "Decanter disponibili e puliti","Secchielli ghiaccio pronti","Portabottiglie disponibili",
  ]},
];
const SEED_MENU_PIATTI=[
  {id:"mp1",nome:"Tartare di Manzo",categoria:"antipasto",prezzo:18,note:"Allergie: uova",attivo:true,origine:"locale"},
  {id:"mp2",nome:"Risotto al Tartufo",categoria:"primo",prezzo:24,note:"",attivo:true,origine:"locale"},
  {id:"mp3",nome:"Filetto alla Wellington",categoria:"secondo",prezzo:38,note:"Allergie: glutine",attivo:true,origine:"locale"},
  {id:"mp4",nome:"Tagliata di Manzo",categoria:"secondo",prezzo:32,note:"",attivo:true,origine:"locale"},
  {id:"mp5",nome:"Tiramisù della Casa",categoria:"dessert",prezzo:12,note:"Allergie: uova, glutine, lattosio",attivo:true,origine:"locale"},
  {id:"mp6",nome:"Tagliere Formaggi",categoria:"accessorio",prezzo:22,note:"",attivo:true,origine:"locale"},
  {id:"mp7",nome:"Bottiglia di Acqua Naturale",categoria:"bevanda",prezzo:5,note:"",attivo:true,origine:"locale"},
  {id:"mp8",nome:"Caffè",categoria:"bevanda",prezzo:3.5,note:"",attivo:true,origine:"locale"},
  {id:"mp9",nome:"Sparklers festeggiamento",categoria:"accessorio",prezzo:25,note:"",attivo:true,origine:"locale"},
  {id:"mp10",nome:"Torta compleanno (su richiesta)",categoria:"accessorio",prezzo:45,note:"",attivo:true,origine:"locale"},
];
const SEED_SERVIZIO_ORDINI=[];

/* ══════════════════════════════════════════════════════════
   REDUCER
══════════════════════════════════════════════════════════ */
const STORAGE_KEY = "sala-pro-v2";

function mkVenue(nome) {
  return {
    id:genId(), nome, createdAt:nowISO(),
    prenotazioni:SEED_PRENOTAZIONI, guestlist:SEED_GUESTLIST,
    clienti:SEED_CLIENTI, promotori:SEED_PROMOTORI,
    tavoli:SEED_TAVOLI, zone:SEED_ZONE,
    tally_totale:8, tally_m:2, tally_f:6,
    vini:SEED_VINI,
    giacenze:{...SEED_GIACENZE},
    menuPiatti:SEED_MENU_PIATTI,
    servizioOrdini:SEED_SERVIZIO_ORDINI,
    briefings:{},
    checklist:{},
  };
}

function ensureVenue(v) {
  return {
    zone:SEED_ZONE, vini:[], giacenze:{...SEED_GIACENZE},
    menuPiatti:SEED_MENU_PIATTI, servizioOrdini:[], briefings:{}, checklist:{},
    ...v,
    giacenze:{...SEED_GIACENZE,...(v.giacenze||{})},
  };
}

const initialState = (() => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  const venue = mkVenue("Club Notte");
  return { venues:[venue], selectedVenueId:venue.id, themeKey:"notte", selectedDate:todayDate() };
})();

function reducer(state, action) {
  const { venues } = state;
  const vid = state.selectedVenueId;
  const mapV = (id, fn) => venues.map(v => v.id!==id ? v : fn(ensureVenue(v)));

  // Fast-path: if no venue selected, skip venue mutations
  if (!vid && action.type !== "THEME_SET" && action.type !== "DATE_SET") return state;

  switch(action.type) {
    case "THEME_SET": return {...state, themeKey:action.key};
    case "DATE_SET": return {...state, selectedDate:action.date};

    // PRENOTAZIONI
    case "PREN_ADD": return {...state, venues:mapV(vid,v=>({...v,prenotazioni:[action.p,...v.prenotazioni]}))};
    case "PREN_UPDATE": return {...state, venues:mapV(vid,v=>({...v,prenotazioni:v.prenotazioni.map(p=>p.id!==action.p.id?p:action.p)}))};
    case "PREN_DELETE": return {...state, venues:mapV(vid,v=>({...v,prenotazioni:v.prenotazioni.filter(p=>p.id!==action.id)}))};
    case "PREN_STATO": return {...state, venues:mapV(vid,v=>({...v,prenotazioni:v.prenotazioni.map(p=>p.id!==action.id?p:{...p,stato:action.stato,arrivo:action.stato==="arrived"?new Date().toLocaleTimeString("it-IT",{hour:"2-digit",minute:"2-digit"}):p.arrivo})}))};

    // GUEST LIST
    case "GUEST_ADD": return {...state, venues:mapV(vid,v=>({...v,guestlist:[action.g,...v.guestlist]}))};
    case "GUEST_STATO": return {...state, venues:mapV(vid,v=>({...v,guestlist:v.guestlist.map(g=>g.id!==action.id?g:{...g,stato:action.stato,ora:action.stato==="checkedin"?new Date().toLocaleTimeString("it-IT",{hour:"2-digit",minute:"2-digit"}):g.ora})}))};
    case "GUEST_DELETE": return {...state, venues:mapV(vid,v=>({...v,guestlist:v.guestlist.filter(g=>g.id!==action.id)}))};

    // CLIENTI
    case "CLIENTE_ADD": return {...state, venues:mapV(vid,v=>({...v,clienti:[action.c,...v.clienti]}))};
    case "CLIENTE_UPDATE": return {...state, venues:mapV(vid,v=>({...v,clienti:v.clienti.map(c=>c.id!==action.c.id?c:action.c)}))};
    case "CLIENTE_DELETE": return {...state, venues:mapV(vid,v=>({...v,clienti:v.clienti.filter(c=>c.id!==action.id)}))};

    // TALLY
    case "TALLY_INC": return {...state, venues:mapV(vid,v=>{const dM=action.g==="m"?action.delta:0,dF=action.g==="f"?action.delta:0,nM=Math.max(0,(v.tally_m||0)+dM),nF=Math.max(0,(v.tally_f||0)+dF);return{...v,tally_m:nM,tally_f:nF,tally_totale:nM+nF};})};
    case "PROMOTORE_TALLY": {
      return {
        ...state,
        venues: mapV(vid, v => ({
          ...v,
          promotori: v.promotori.map(p => {
            if (p.id !== action.id) return p;
            const dM = action.g === "m" ? action.delta : 0;
            const dF = action.g === "f" ? action.delta : 0;
            const nM = Math.max(0, (p.m || 0) + dM);
            const nF = Math.max(0, (p.f || 0) + dF);
            const dCat = action.cat === "comp" ? action.delta : 0;
            const dRed = action.cat === "reduced" ? action.delta : 0;
            const dFul = action.cat === "full" ? action.delta : 0;
            return {
              ...p,
              m: nM, f: nF, totale: nM + nF,
              comp: Math.max(0, (p.comp || 0) + dCat),
              reduced: Math.max(0, (p.reduced || 0) + dRed),
              full: Math.max(0, (p.full || 0) + dFul),
            };
          })
        }))
      };
    }
    case "PROMOTORE_ADD": return {...state, venues:mapV(vid,v=>({...v,promotori:[...v.promotori,action.p]}))};

    // TAVOLI
    case "TAVOLO_ADD": return {...state, venues:mapV(vid,v=>({...v,tavoli:[...v.tavoli,action.t]}))};
    case "TAVOLO_UPDATE": return {...state, venues:mapV(vid,v=>({...v,tavoli:v.tavoli.map(t=>t.id!==action.t.id?t:action.t)}))};
    case "TAVOLO_DELETE": return {...state, venues:mapV(vid,v=>({...v,tavoli:v.tavoli.filter(t=>t.id!==action.id)}))};
    case "TAVOLO_MOVE": return {...state, venues:mapV(vid,v=>({...v,tavoli:v.tavoli.map(t=>t.id!==action.id?t:{...t,x:action.x,y:action.y})}))};
    case "TAVOLO_UPDATE": return {...state, venues:mapV(vid,v=>({...v,tavoli:v.tavoli.map(t=>t.id!==action.tv.id?t:{...t,...action.tv})}))};
    case "ORDINE_REMOVE_ITEM": return {...state, venues:mapV(vid,v=>({...v,servizioOrdini:(v.servizioOrdini||[]).map(o=>{if(o.id!==action.ordineId)return o;const items=(o.items||[]).filter((_,i)=>i!==action.idx);const totale=items.reduce((a,i)=>a+(i.prezzo*i.qty),0);return{...o,items,totale};})}))};
    case "ORDINE_ITEMS_STATO": return {...state, venues:mapV(vid,v=>({...v,servizioOrdini:(v.servizioOrdini||[]).map(o=>o.id!==action.id?o:{...o,items:(o.items||[]).map(i=>({...i,statoKitchen:action.statoKitchen}))})}))};
    case "ZONA_ADD": return {...state, venues:mapV(vid,v=>({...v,zone:[...v.zone,action.z]}))};
    case "ZONA_DELETE": return {...state, venues:mapV(vid,v=>({...v,zone:v.zone.filter(z=>z.id!==action.id)}))};

    // VINI
    case "VINO_ADD": return {...state, venues:mapV(vid,v=>({...v,vini:[...v.vini,action.vino]}))};
    case "VINO_UPDATE": return {...state, venues:mapV(vid,v=>({...v,vini:v.vini.map(vi=>vi.id!==action.vino.id?vi:action.vino)}))};
    case "VINO_DELETE": return {...state, venues:mapV(vid,v=>({...v,vini:v.vini.filter(vi=>vi.id!==action.id)}))};
    case "VINO_ADJUST": return {...state, venues:mapV(vid,v=>({...v,vini:v.vini.map(vi=>vi.id!==action.id?vi:{...vi,quantita:Math.max(0,vi.quantita+action.delta)})}))};
    case "VINO_VENDITA": return {...state, venues:mapV(vid,v=>({...v,vini:v.vini.map(vi=>vi.id!==action.id?vi:{...vi,quantita:Math.max(0,vi.quantita-action.qty),vendite:[...(vi.vendite||[]),{data:todayDate(),qty:action.qty}]})}))};
    case "VINI_IMPORT": return {...state, venues:mapV(vid,v=>({...v,vini:[...v.vini,...action.vini]}))};

    // GIACENZE
    case "GIACENZA_ADJUST": return {...state, venues:mapV(vid,v=>({...v,giacenze:{...v.giacenze,[action.cat]:v.giacenze[action.cat].map(i=>i.id!==action.id?i:{...i,quantita:Math.max(0,i.quantita+action.delta)})}}))};
    case "GIACENZA_ADD": return {...state, venues:mapV(vid,v=>({...v,giacenze:{...v.giacenze,[action.cat]:[...v.giacenze[action.cat],action.item]}}))};
    case "GIACENZA_DELETE": return {...state, venues:mapV(vid,v=>({...v,giacenze:{...v.giacenze,[action.cat]:v.giacenze[action.cat].filter(i=>i.id!==action.id)}}))};
    case "GIACENZA_SET_MIN": return {...state, venues:mapV(vid,v=>({...v,giacenze:{...v.giacenze,[action.cat]:v.giacenze[action.cat].map(i=>i.id!==action.id?i:{...i,min:action.min})}}))};

    // MENU PIATTI
    case "PIATTO_ADD": return {...state, venues:mapV(vid,v=>({...v,menuPiatti:[...v.menuPiatti,action.p]}))};
    case "PIATTO_UPDATE": return {...state, venues:mapV(vid,v=>({...v,menuPiatti:v.menuPiatti.map(p=>p.id!==action.p.id?p:action.p)}))};
    case "PIATTO_DELETE": return {...state, venues:mapV(vid,v=>({...v,menuPiatti:v.menuPiatti.filter(p=>p.id!==action.id)}))};
    case "PIATTI_IMPORT_KP": return {...state, venues:mapV(vid,v=>({...v,menuPiatti:[...v.menuPiatti,...action.piatti.map(p=>({...p,id:genId(),origine:"kitchenpro",attivo:true}))]}))};

    // SERVIZIO ORDINI
    case "ORDINE_ADD": return {...state, venues:mapV(vid,v=>({...v,servizioOrdini:[...v.servizioOrdini,action.ordine]}))};
    case "ORDINE_UPDATE": return {...state, venues:mapV(vid,v=>({...v,servizioOrdini:v.servizioOrdini.map(o=>o.id!==action.ordine.id?o:action.ordine)}))};
    case "ORDINE_CHIUDI": return {...state, venues:mapV(vid,v=>({...v,servizioOrdini:v.servizioOrdini.map(o=>o.id!==action.id?o:{...o,stato:"chiuso",chiusoAt:nowISO()})}))};
    case "ORDINE_DELETE": return {...state, venues:mapV(vid,v=>({...v,servizioOrdini:v.servizioOrdini.filter(o=>o.id!==action.id)}))};

    // BRIEFING
    case "BRIEFING_SAVE": return {...state, venues:mapV(vid,v=>({...v,briefings:{...v.briefings,[action.data]:action.briefing}}))};
    case "BRIEFING_INVIA_CUCINA": return {...state, venues:mapV(vid,v=>({...v,briefings:{...v.briefings,[action.data]:{...v.briefings[action.data],inviatoCucina:true,inviatoAt:nowISO()}}}))};

    // CHECKLIST
    case "CHECK_SAVE": return {...state, venues:mapV(vid,v=>({...v,checklist:{...v.checklist,[action.data]:action.items}}))};
    case "CHECK_TOGGLE": return {...state, venues:mapV(vid,v=>{const todayItems=v.checklist[action.data]||[];const exists=todayItems.find(i=>i.id===action.id);const updated=exists?todayItems.map(i=>i.id!==action.id?i:{...i,done:!i.done}):todayItems;return{...v,checklist:{...v.checklist,[action.data]:updated}};})};
    case "CHECK_ADD_ITEM": return {...state, venues:mapV(vid,v=>{const todayItems=v.checklist[action.data]||[];return{...v,checklist:{...v.checklist,[action.data]:[...todayItems,action.item]}};})};
    case "CHECK_DELETE_ITEM": return {...state, venues:mapV(vid,v=>{const todayItems=v.checklist[action.data]||[];return{...v,checklist:{...v.checklist,[action.data]:todayItems.filter(i=>i.id!==action.id)}};})};

    default: return state;
  }
}

/* ══════════════════════════════════════════════════════════
   CONTEXT
══════════════════════════════════════════════════════════ */
const Ctx = createContext(null);
function useApp() { return useContext(Ctx); }

/* ══════════════════════════════════════════════════════════
   ICONS
══════════════════════════════════════════════════════════ */
function Icon({name,size=20,color="currentColor",style={}}) {
  const s={width:size,height:size,display:"block",flexShrink:0,...style};
  const p={fill:"none",stroke:color,strokeWidth:1.8,strokeLinecap:"round",strokeLinejoin:"round"};
  switch(name){
    case"dashboard":return <svg viewBox="0 0 24 24"style={s}{...p}><rect x="3"y="3"width="7"height="7"rx="1"/><rect x="14"y="3"width="7"height="7"rx="1"/><rect x="3"y="14"width="7"height="7"rx="1"/><rect x="14"y="14"width="7"height="7"rx="1"/></svg>;
    case"calendar":return <svg viewBox="0 0 24 24"style={s}{...p}><rect x="3"y="4"width="18"height="18"rx="2"/><line x1="3"y1="9"x2="21"y2="9"/><line x1="8"y1="2"x2="8"y2="6"/><line x1="16"y1="2"x2="16"y2="6"/></svg>;
    case"list":return <svg viewBox="0 0 24 24"style={s}{...p}><line x1="8"y1="6"x2="21"y2="6"/><line x1="8"y1="12"x2="21"y2="12"/><line x1="8"y1="18"x2="21"y2="18"/><circle cx="3"cy="6"r="1"fill={color}/><circle cx="3"cy="12"r="1"fill={color}/><circle cx="3"cy="18"r="1"fill={color}/></svg>;
    case"users":return <svg viewBox="0 0 24 24"style={s}{...p}><circle cx="9"cy="7"r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/><path d="M21 21v-2a4 4 0 0 0-3-3.85"/></svg>;
    case"map":return <svg viewBox="0 0 24 24"style={s}{...p}><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8"y1="2"x2="8"y2="18"/><line x1="16"y1="6"x2="16"y2="22"/></svg>;
    case"person":return <svg viewBox="0 0 24 24"style={s}{...p}><circle cx="12"cy="8"r="5"/><path d="M3 21v-1a9 9 0 0 1 18 0v1"/></svg>;
    case"tally":return <svg viewBox="0 0 24 24"style={s}{...p}><path d="M3 4l18 0"/><path d="M3 8l18 0"/><path d="M3 12l10 0"/><path d="M17 9l4 8"/><line x1="13"y1="17"x2="21"y2="17"/></svg>;
    case"wine":return <svg viewBox="0 0 24 24"style={s}{...p}><path d="M8 22h8"/><path d="M12 11v11"/><path d="M7 3h10l-1 8H8L7 3z"/><path d="M7 8a5 5 0 0 0 10 0"/></svg>;
    case"box":return <svg viewBox="0 0 24 24"style={s}{...p}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12"y1="22.08"x2="12"y2="12"/></svg>;
    case"service":return <svg viewBox="0 0 24 24"style={s}{...p}><circle cx="12"cy="12"r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>;
    case"briefing":return <svg viewBox="0 0 24 24"style={s}{...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16"y1="13"x2="8"y2="13"/><line x1="16"y1="17"x2="8"y2="17"/><polyline points="10 9 9 9 8 9"/></svg>;
    case"checklist":return <svg viewBox="0 0 24 24"style={s}{...p}><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>;
    case"kitchen":return <svg viewBox="0 0 24 24"style={s}{...p}><path d="M3 2h18v4H3z"/><path d="M3 10h18v4H3z"/><path d="M3 18h18v4H3z"/><line x1="8"y1="2"x2="8"y2="22"/></svg>;
    case"settings":return <svg viewBox="0 0 24 24"style={s}{...p}><circle cx="12"cy="12"r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
    case"plus":return <svg viewBox="0 0 24 24"style={s}{...p}><line x1="12"y1="5"x2="12"y2="19"/><line x1="5"y1="12"x2="19"y2="12"/></svg>;
    case"minus":return <svg viewBox="0 0 24 24"style={s}{...p}><line x1="5"y1="12"x2="19"y2="12"/></svg>;
    case"search":return <svg viewBox="0 0 24 24"style={s}{...p}><circle cx="11"cy="11"r="8"/><line x1="21"y1="21"x2="16.65"y2="16.65"/></svg>;
    case"x":return <svg viewBox="0 0 24 24"style={s}{...p}><line x1="18"y1="6"x2="6"y2="18"/><line x1="6"y1="6"x2="18"y2="18"/></svg>;
    case"check":return <svg viewBox="0 0 24 24"style={s}{...p}><polyline points="20 6 9 17 4 12"/></svg>;
    case"star":return <svg viewBox="0 0 24 24"style={s}fill={color}stroke={color}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
    case"alert":return <svg viewBox="0 0 24 24"style={s}{...p}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12"y1="9"x2="12"y2="13"/><line x1="12"y1="17"x2="12.01"y2="17"/></svg>;
    case"trash":return <svg viewBox="0 0 24 24"style={s}{...p}><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>;
    case"edit":return <svg viewBox="0 0 24 24"style={s}{...p}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
    case"upload":return <svg viewBox="0 0 24 24"style={s}{...p}><polyline points="16 16 12 12 8 16"/><line x1="12"y1="12"x2="12"y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>;
    case"link":return <svg viewBox="0 0 24 24"style={s}{...p}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>;
    case"chart":return <svg viewBox="0 0 24 24"style={s}{...p}><line x1="18"y1="20"x2="18"y2="10"/><line x1="12"y1="20"x2="12"y2="4"/><line x1="6"y1="20"x2="6"y2="14"/></svg>;
    case"send":return <svg viewBox="0 0 24 24"style={s}{...p}><line x1="22"y1="2"x2="11"y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;
    case"move":return <svg viewBox="0 0 24 24"style={s}{...p}><polyline points="5 9 2 12 5 15"/><polyline points="9 5 12 2 15 5"/><polyline points="15 19 12 22 9 19"/><polyline points="19 9 22 12 19 15"/><line x1="2"y1="12"x2="22"y2="12"/><line x1="12"y1="2"x2="12"y2="22"/></svg>;
    case"refresh":return <svg viewBox="0 0 24 24"style={s}{...p}><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>;
    default:return <svg viewBox="0 0 24 24"style={s}{...p}><circle cx="12"cy="12"r="10"/></svg>;
  }
}

/* ══════════════════════════════════════════════════════════
   SHARED UI
══════════════════════════════════════════════════════════ */
function Badge({children,color,bg,style={}}){return <span style={{display:"inline-flex",alignItems:"center",padding:"2px 8px",borderRadius:20,fontSize:10,fontWeight:700,letterSpacing:"0.05em",background:bg||"rgba(255,255,255,0.08)",color:color||"#fff",...style}}>{children}</span>;}
function Chip({label,active,onClick,t}){return <button onClick={onClick}style={{padding:"6px 16px",borderRadius:20,border:"none",cursor:"pointer",fontSize:12,fontWeight:active?700:400,background:active?t.accent:"transparent",color:active?"#fff":t.inkSoft,transition:"all 0.2s"}}>{label}</button>;}
function SearchBar({value,onChange,placeholder,t}){return <div style={{position:"relative",display:"flex",alignItems:"center"}}><Icon name="search"size={15}color={t.inkMuted}style={{position:"absolute",left:12,pointerEvents:"none"}}/><input value={value}onChange={e=>onChange(e.target.value)}placeholder={placeholder||"Cerca…"}style={{width:"100%",padding:"9px 12px 9px 36px",background:t.bgInput,border:`1px solid ${t.div}`,borderRadius:10,color:t.ink,fontSize:13,outline:"none",fontFamily:"inherit"}}/>{value&&<button onClick={()=>onChange("")}style={{position:"absolute",right:10,background:"none",border:"none",cursor:"pointer",padding:4}}><Icon name="x"size={14}color={t.inkMuted}/></button>}</div>;}
function Input({label,value,onChange,placeholder,type="text",t,readOnly=false}){return <div style={{marginBottom:14}}>{label&&<div style={{fontSize:11,fontWeight:600,letterSpacing:"0.05em",color:t.inkMuted,marginBottom:5,textTransform:"uppercase"}}>{label}</div>}<input type={type}value={value}onChange={e=>onChange(e.target.value)}placeholder={placeholder}readOnly={readOnly}style={{width:"100%",padding:"10px 12px",background:t.bgInput,border:`1px solid ${t.div}`,borderRadius:10,color:t.ink,fontSize:14,outline:"none",fontFamily:"inherit",opacity:readOnly?0.6:1}}/></div>;}
function Select({label,value,onChange,options,t}){return <div style={{marginBottom:14}}>{label&&<div style={{fontSize:11,fontWeight:600,letterSpacing:"0.05em",color:t.inkMuted,marginBottom:5,textTransform:"uppercase"}}>{label}</div>}<select value={value}onChange={e=>onChange(e.target.value)}style={{width:"100%",padding:"10px 12px",background:t.bgCard,border:`1px solid ${t.div}`,borderRadius:10,color:t.ink,fontSize:14,outline:"none",fontFamily:"inherit",cursor:"pointer"}}>{options.map(o=><option key={o.value}value={o.value}>{o.label}</option>)}</select></div>;}
function Btn({children,onClick,variant="primary",t,disabled=false,small=false,style={}}){const isPrimary=variant==="primary",isDanger=variant==="danger",isGhost=variant==="ghost",isWarning=variant==="warning";return <button onClick={onClick}disabled={disabled}style={{padding:small?"6px 14px":"10px 20px",borderRadius:10,border:isGhost?`1px solid ${t.div}`:"none",cursor:disabled?"not-allowed":"pointer",fontSize:small?12:14,fontWeight:600,fontFamily:"inherit",background:isPrimary?t.accent:isDanger?t.danger:isWarning?t.warning:isGhost?"transparent":t.bgCardAlt,color:(isPrimary||isDanger)?'#fff':isWarning?"#000":isGhost?t.inkSoft:t.ink,opacity:disabled?0.5:1,transition:"all 0.2s",...style}}>{children}</button>;}
function Modal({title,onClose,children,t,width=520}){return <div onClick={onClose}style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.65)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16,backdropFilter:"blur(4px)"}}><div onClick={e=>e.stopPropagation()}style={{background:t.bgCard,borderRadius:16,width:"100%",maxWidth:width,border:`1px solid ${t.div}`,boxShadow:`0 24px 60px ${t.shadowStrong}`,maxHeight:"90vh",overflow:"auto"}}><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"18px 20px 14px",borderBottom:`1px solid ${t.div}`}}><span style={{fontSize:16,fontWeight:700,color:t.ink}}>{title}</span><button onClick={onClose}style={{background:"none",border:"none",cursor:"pointer",padding:4,color:t.inkMuted}}><Icon name="x"size={18}color={t.inkMuted}/></button></div><div style={{padding:20}}>{children}</div></div></div>;}
function StatCard({label,value,sub,color,t,icon}){return <div style={{background:t.bgCard,borderRadius:14,padding:"16px 18px",border:`1px solid ${t.div}`,flex:1,minWidth:120,transition:"transform 0.15s"}}onMouseEnter={e=>e.currentTarget.style.transform="translateY(-1px)"}onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}><div style={{fontSize:10,fontWeight:600,letterSpacing:"0.06em",color:t.inkMuted,textTransform:"uppercase"}}>{label}</div>{icon&&<span style={{fontSize:16}}>{icon}</span>}</div><div style={{fontSize:28,fontWeight:800,color:color||t.ink,lineHeight:1,marginBottom:sub?6:0}}>{value}</div>{sub&&<div style={{fontSize:11,color:t.inkSoft}}>{sub}</div>}</div>;}
function Avatar({nome,size=36}){const initials=nome.split(" ").slice(0,2).map(w=>w[0]).join("").toUpperCase();const hue=nome.split("").reduce((acc,c)=>acc+c.charCodeAt(0),0)%360;return <div style={{width:size,height:size,borderRadius:"50%",flexShrink:0,background:`hsl(${hue},45%,38%)`,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*0.36,fontWeight:700}}>{initials}</div>;}
function TipoBadge({tipo,t}){if(tipo==="VIP")return <Badge color={t.vip}bg={`${t.vip}22`}>VIP</Badge>;if(tipo==="Promo")return <Badge color={t.promo}bg={`${t.promo}22`}>PROMO</Badge>;return null;}
function StatoBadge({stato,t}){const map={upcoming:{label:"Attesa",color:t.inkSoft,bg:t.div},arrived:{label:"Arrivato",color:t.warning,bg:`${t.warning}22`},seated:{label:"Seduto",color:t.success,bg:`${t.success}22`},left:{label:"Uscito",color:t.inkMuted,bg:t.div},noshow:{label:"No Show",color:t.danger,bg:`${t.danger}22`}};const m=map[stato]||map.upcoming;return <Badge color={m.color}bg={m.bg}>{m.label}</Badge>;}

/* ══════════════════════════════════════════════════════════
   BAR CHART SVG
══════════════════════════════════════════════════════════ */
function BarChart({data,color,height=80,t}) {
  if (!data||data.length===0) return <div style={{height,display:"flex",alignItems:"center",justifyContent:"center",color:t.inkMuted,fontSize:12}}>Nessun dato</div>;
  const max=Math.max(...data.map(d=>d.value),1);
  const w=100/data.length;
  return (
    <div style={{display:"flex",alignItems:"flex-end",gap:3,height,padding:"0 4px"}}>
      {data.map((d,i)=>(
        <div key={i} title={`${d.label}: ${d.value}`} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3,height:"100%",justifyContent:"flex-end"}}>
          <div style={{width:"100%",background:color||t.accent,borderRadius:"3px 3px 0 0",height:`${(d.value/max)*100}%`,minHeight:d.value>0?4:0,opacity:0.85,transition:"height 0.3s"}}/>
          <div style={{fontSize:9,color:t.inkMuted,textAlign:"center",lineHeight:1}}>{d.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   DASHBOARD
══════════════════════════════════════════════════════════ */
function DashboardSection() {
  const {state,t,venue}=useApp();
  const {prenotazioni,guestlist,tally_totale,tally_m,tally_f,vini,servizioOrdini}=venue;
  const upcoming=prenotazioni.filter(p=>p.stato==="upcoming").length;
  const vip=prenotazioni.filter(p=>p.tipo==="VIP").length;
  const seated=prenotazioni.filter(p=>p.stato==="seated").length;
  const checkedIn=guestlist.filter(g=>g.stato==="checkedin").length;
  const viniAlert=vini.filter(v=>v.quantita<=v.minStock);
  const totaleServizio=servizioOrdini.filter(o=>o.stato==="aperto").reduce((acc,o)=>acc+(o.totale||0),0);

  return (
    <div style={{padding:"24px 20px",maxWidth:960,margin:"0 auto"}}>
      <div style={{marginBottom:22,display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
        <div>
          <h1 style={{fontSize:26,fontWeight:800,color:t.ink,marginBottom:4}}>{timeGreeting()} 👋</h1>
          <p style={{color:t.inkSoft,fontSize:14}}>{new Date(state.selectedDate).toLocaleDateString("it-IT",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}</p>
        </div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {[["+ Prenotazione","calendar"],["+ Guest","list"],["Apri tavolo","service"],["Briefing","briefing"]].map(([label,icon])=>(
            <button key={label} style={{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",borderRadius:10,border:`1px solid ${t.div}`,background:t.bgCard,color:t.inkSoft,fontSize:12,fontWeight:600,cursor:"pointer",transition:"all 0.2s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=t.accent;e.currentTarget.style.color=t.accent;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=t.div;e.currentTarget.style.color=t.inkSoft;}}>
              <Icon name={icon} size={14} color="currentColor"/>{label}
            </button>
          ))}
        </div>
      </div>
      <div style={{display:"flex",gap:12,flexWrap:"wrap",marginBottom:24}}>
        <StatCard label="Prenotazioni" value={prenotazioni.length} sub={`${upcoming} in attesa`} color={t.accent} t={t}/>
        <StatCard label="VIP" value={vip} sub="questa sera" color={t.vip} t={t}/>
        <StatCard label="Seduti" value={seated} sub="ai tavoli" color={t.success} t={t}/>
        <StatCard label="Guest List" value={guestlist.length} sub={`${checkedIn} check-in`} color={t.gold} t={t}/>
        <StatCard label="Tally" value={tally_totale} sub={`${tally_m}M · ${tally_f}F`} color={t.inkSoft} t={t}/>
        <StatCard label="Incasso Servizio" value={fmtEur(totaleServizio)} sub="tavoli aperti" color={t.success} t={t}/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <div style={{background:t.bgCard,borderRadius:14,border:`1px solid ${t.div}`,overflow:"hidden"}}>
          <div style={{padding:"14px 18px 12px",borderBottom:`1px solid ${t.div}`}}><span style={{fontSize:14,fontWeight:700,color:t.ink}}>Prossimi arrivi</span></div>
          {prenotazioni.filter(p=>p.stato==="upcoming").slice(0,5).map(p=>(
            <div key={p.id} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 18px",borderBottom:`1px solid ${t.div}`}}>
              <Avatar nome={`${p.nome} ${p.cognome}`} size={32}/>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:13,fontWeight:600,color:t.ink}}>{p.nome} {p.cognome}</div>
                <div style={{fontSize:11,color:t.inkMuted}}>{p.ospiti} ospiti · {p.ora}</div>
              </div>
              <TipoBadge tipo={p.tipo} t={t}/>
            </div>
          ))}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {viniAlert.length>0&&(
            <div style={{background:t.bgCard,borderRadius:14,border:`1px solid ${t.danger}44`,padding:"14px 18px"}}>
              <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:10}}><Icon name="alert"size={16}color={t.danger}/><span style={{fontSize:13,fontWeight:700,color:t.danger}}>Scorte vini basse</span></div>
              {viniAlert.map(v=>(
                <div key={v.id} style={{display:"flex",justifyContent:"space-between",padding:"4px 0",fontSize:12}}>
                  <span style={{color:t.inkSoft}}>{v.nome}</span>
                  <span style={{color:t.danger,fontWeight:700}}>{v.quantita} bot.</span>
                </div>
              ))}
            </div>
          )}
          <div style={{background:t.bgCard,borderRadius:14,border:`1px solid ${t.div}`,padding:"14px 18px"}}>
            <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:10}}><Icon name="alert"size={16}color={t.warning}/><span style={{fontSize:13,fontWeight:700,color:t.ink}}>Allergie questa sera</span></div>
            {prenotazioni.filter(p=>p.allergie?.length>0).map(p=>(
              <div key={p.id} style={{marginBottom:8}}>
                <div style={{fontSize:12,fontWeight:600,color:t.ink,marginBottom:3}}>{p.nome} {p.cognome}</div>
                <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{p.allergie.map(a=><Badge key={a}color={t.warning}bg={`${t.warning}22`}>{a}</Badge>)}</div>
              </div>
            ))}
            {prenotazioni.filter(p=>p.allergie?.length>0).length===0&&<div style={{fontSize:12,color:t.inkMuted}}>Nessuna allergia segnalata ✓</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   PRENOTAZIONI
══════════════════════════════════════════════════════════ */
function PrenotazioniSection(){
  const{dispatch,t,venue}=useApp();
  const[search,setSearch]=useState("");
  const[filter,setFilter]=useState("All");
  const[sortOra,setSortOra]=useState(true);
  const[showNuova,setShowNuova]=useState(false);
  const[selected,setSelected]=useState(null);
  const vip=venue.prenotazioni.filter(p=>p.tipo==="VIP").length;
  const promo=venue.prenotazioni.filter(p=>p.tipo==="Promo").length;
  const seduti=venue.prenotazioni.filter(p=>p.stato==="seated").length;
  const items=useMemo(()=>{
    let list=[...venue.prenotazioni];
    if(filter==="VIP")list=list.filter(p=>p.tipo==="VIP");
    else if(filter==="Promo")list=list.filter(p=>p.tipo==="Promo");
    else if(filter==="Seduti")list=list.filter(p=>p.stato==="seated");
    else if(filter==="Arrivati")list=list.filter(p=>p.stato==="arrived");
    if(search){const q=search.toLowerCase();list=list.filter(p=>`${p.nome} ${p.cognome}`.toLowerCase().includes(q)||(p.via||"").toLowerCase().includes(q)||(p.note||"").toLowerCase().includes(q));}
    if(sortOra)list.sort((a,b)=>a.ora.localeCompare(b.ora));
    return list;
  },[venue.prenotazioni,filter,search,sortOra]);

  const handlePrint=()=>{
    const rows=items.map(p=>`<tr>
      <td><strong>${p.nome} ${p.cognome}</strong><br/><small style="color:#666">${p.via||""}</small></td>
      <td><span class="badge ${p.tipo==="VIP"?"vip":""}">${p.tipo}</span></td>
      <td>${p.ora}</td>
      <td>${p.tavolo||"—"}</td>
      <td>${p.ospiti}</td>
      <td>${p.minimo||"—"}</td>
      <td>${(p.allergie||[]).map(a=>`<span class="allergia">${a}</span>`).join(" ")}</td>
      <td>${p.note||""}</td>
    </tr>`).join("");
    printContent(`
      <h1>Prenotazioni — ${new Date().toLocaleDateString("it-IT",{weekday:"long",day:"numeric",month:"long"})}</h1>
      <p style="color:#666;margin-bottom:16px">${items.length} prenotazioni · ${vip} VIP · ${seduti} seduti</p>
      <table><thead><tr><th>Nome</th><th>Tipo</th><th>Ora</th><th>Tavolo</th><th>Ospiti</th><th>Minimo</th><th>Allergie</th><th>Note</th></tr></thead>
      <tbody>${rows}</tbody></table>`, "Prenotazioni SalaPro");
  };

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
      <div style={{padding:"14px 20px 0",borderBottom:`1px solid ${t.div}`}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10,flexWrap:"wrap",gap:8}}>
          <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
            {[["All",venue.prenotazioni.length],["VIP",vip],["Promo",promo],["Seduti",seduti],["Arrivati",venue.prenotazioni.filter(p=>p.stato==="arrived").length]].map(([f,c])=>(
              <Chip key={f}label={`${f} ${c>0?"("+c+")":""}`}active={filter===f}onClick={()=>setFilter(f)}t={t}/>
            ))}
          </div>
          <div style={{display:"flex",gap:6}}>
            <button onClick={()=>setSortOra(s=>!s)}style={{display:"flex",alignItems:"center",gap:5,padding:"7px 12px",borderRadius:9,border:`1px solid ${sortOra?t.accent:t.div}`,background:sortOra?t.accentGlow:"none",color:sortOra?t.accent:t.inkSoft,fontSize:12,cursor:"pointer"}}>⏰ Ora</button>
            <button onClick={handlePrint}style={{display:"flex",alignItems:"center",gap:5,padding:"7px 12px",borderRadius:9,border:`1px solid ${t.div}`,background:"none",color:t.inkSoft,fontSize:12,cursor:"pointer"}}>🖨️ Stampa</button>
            <button onClick={()=>setShowNuova(true)}style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",background:t.accent,border:"none",borderRadius:10,color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer"}}><Icon name="plus"size={15}color="#fff"/>Nuova</button>
          </div>
        </div>
        <div style={{marginBottom:12}}><SearchBar value={search}onChange={setSearch}placeholder="Cerca prenotazioni…"t={t}/></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 64px 56px 100px auto",gap:8,paddingBottom:10}}>
          {["Nome","Tavolo","Ospiti","Minimo","Note / Allergie"].map(h=><span key={h}style={{fontSize:10,fontWeight:600,color:t.inkMuted,letterSpacing:"0.05em",textTransform:"uppercase"}}>{h}</span>)}
        </div>
      </div>
      <div style={{flex:1,overflow:"auto"}}>
        {items.map(p=>(
          <div key={p.id}onClick={()=>setSelected(p)}
            onMouseEnter={e=>e.currentTarget.style.background=t.bgCardAlt}
            onMouseLeave={e=>e.currentTarget.style.background="transparent"}
            style={{display:"grid",gridTemplateColumns:"1fr 64px 56px 100px auto",gap:8,alignItems:"center",padding:"11px 20px",borderBottom:`1px solid ${t.div}`,cursor:"pointer",transition:"background 0.15s",position:"relative"}}>
            <div style={{position:"absolute",left:0,top:4,bottom:4,width:3,borderRadius:"0 3px 3px 0",background:p.tipo==="VIP"?t.vip:p.tipo==="Promo"?t.promo:"transparent"}}/>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <Avatar nome={`${p.nome} ${p.cognome}`} size={34}/>
              <div>
                <div style={{display:"flex",gap:6,alignItems:"center"}}><span style={{fontSize:13,fontWeight:700,color:t.ink}}>{p.nome} {p.cognome}</span><TipoBadge tipo={p.tipo}t={t}/><StatoBadge stato={p.stato}t={t}/></div>
                <div style={{fontSize:11,color:t.inkMuted}}>via {p.via||"—"} · {p.ora}</div>
              </div>
            </div>
            <div style={{textAlign:"center"}}><span style={{fontSize:12,fontWeight:700,color:p.tavolo?t.ink:t.inkMuted,background:p.tavolo?t.bgCardAlt:"transparent",padding:p.tavolo?"3px 8px":"0",borderRadius:6}}>{p.tavolo||<span style={{fontSize:10}}>assign</span>}</span></div>
            <div style={{textAlign:"center",fontSize:13,fontWeight:600,color:t.ink}}>{p.ospiti}</div>
            <div style={{textAlign:"center"}}><span style={{fontSize:12,fontWeight:600,color:p.minimo==="COMP"?t.gold:p.minimo==="NO MIN"?t.success:t.ink}}>{p.minimo||"—"}</span></div>
            <div style={{fontSize:11,color:t.inkSoft,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
              {p.allergie?.length>0&&<span style={{color:t.warning,marginRight:4}}>⚠</span>}
              {p.note||""}
              <div style={{display:"flex",gap:4,marginTop:4,flexWrap:"wrap"}}>
                {p.stato==="upcoming"&&<button onClick={e=>{e.stopPropagation();dispatch({type:"PREN_STATO",id:p.id,stato:"arrived"});}}style={{padding:"2px 8px",borderRadius:6,border:"none",background:`${t.warning}22`,color:t.warning,fontSize:10,cursor:"pointer",fontWeight:600}}>✓ Arrivato</button>}
                {p.stato==="arrived"&&<button onClick={e=>{e.stopPropagation();dispatch({type:"PREN_STATO",id:p.id,stato:"seated"});}}style={{padding:"2px 8px",borderRadius:6,border:"none",background:`${t.success}22`,color:t.success,fontSize:10,cursor:"pointer",fontWeight:600}}>→ Seduto</button>}
                {(p.stato==="arrived"||p.stato==="seated")&&<button onClick={e=>{e.stopPropagation();dispatch({type:"PREN_STATO",id:p.id,stato:"left"});}}style={{padding:"2px 8px",borderRadius:6,border:"none",background:t.div,color:t.inkMuted,fontSize:10,cursor:"pointer"}}>Uscito</button>}
              </div>
            </div>
          </div>
        ))}
        {items.length===0&&<div style={{padding:"40px",textAlign:"center",color:t.inkMuted}}><Icon name="calendar"size={40}color={t.inkFaint}style={{margin:"0 auto 12px"}}/><div>Nessuna prenotazione trovata</div></div>}
      </div>
      {showNuova&&<NuovaPrenModal onClose={()=>setShowNuova(false)}/>}
      {selected&&<DettaglioPrenModal pren={selected}onClose={()=>setSelected(null)}/>}
    </div>
  );
}

function NuovaPrenModal({onClose}){
  const{dispatch,t}=useApp();
  const[d,setD]=useState({nome:"",cognome:"",via:"",ospiti:"2",ora:"22:00",minimo:"",note:"",tipo:"normal",allergie:"",telefono:""});
  const set=k=>v=>setD(x=>({...x,[k]:v}));
  const save=()=>{if(!d.nome.trim())return;dispatch({type:"PREN_ADD",p:{id:genId(),...d,ospiti:parseInt(d.ospiti)||2,tavolo:null,stato:"upcoming",arrivo:null,allergie:d.allergie?d.allergie.split(",").map(a=>a.trim()).filter(Boolean):[]}});onClose();};
  return <Modal title="Nuova Prenotazione"onClose={onClose}t={t}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 16px"}}><Input label="Nome"value={d.nome}onChange={set("nome")}t={t}/><Input label="Cognome"value={d.cognome}onChange={set("cognome")}t={t}/><Input label="Prenotato da"value={d.via}onChange={set("via")}t={t}/><Input label="Telefono"value={d.telefono}onChange={set("telefono")}t={t}/><Input label="N° Ospiti"value={d.ospiti}onChange={set("ospiti")}type="number"t={t}/><Input label="Ora"value={d.ora}onChange={set("ora")}type="time"t={t}/><Input label="Minimo"value={d.minimo}onChange={set("minimo")}placeholder="€ 500 / COMP"t={t}/><Select label="Tipo"value={d.tipo}onChange={set("tipo")}t={t}options={[{value:"normal",label:"Standard"},{value:"VIP",label:"VIP"},{value:"Promo",label:"Promo"}]}/></div><Input label="Allergie (virgola)"value={d.allergie}onChange={set("allergie")}placeholder="glutine, lattosio…"t={t}/><div style={{marginBottom:14}}><div style={{fontSize:11,fontWeight:600,color:t.inkMuted,marginBottom:5,textTransform:"uppercase"}}>Note</div><textarea value={d.note}onChange={e=>set("note")(e.target.value)}rows={3}style={{width:"100%",padding:"10px 12px",background:t.bgInput,border:`1px solid ${t.div}`,borderRadius:10,color:t.ink,fontSize:14,resize:"vertical",fontFamily:"inherit",outline:"none"}}/></div><div style={{display:"flex",gap:10,justifyContent:"flex-end"}}><Btn variant="ghost"onClick={onClose}t={t}>Annulla</Btn><Btn onClick={save}t={t}>Salva</Btn></div></Modal>;
}

function DettaglioPrenModal({pren,onClose}){
  const{dispatch,t}=useApp();
  const[edit,setEdit]=useState(false);
  const[d,setD]=useState({...pren});
  const set=k=>v=>setD(x=>({...x,[k]:v}));
  const STATI=["upcoming","arrived","seated","left","noshow"];
  if(edit)return <Modal title="Modifica Prenotazione"onClose={onClose}t={t}width={560}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 16px"}}><Input label="Nome"value={d.nome}onChange={set("nome")}t={t}/><Input label="Cognome"value={d.cognome}onChange={set("cognome")}t={t}/><Input label="Via"value={d.via}onChange={set("via")}t={t}/><Input label="Tavolo"value={d.tavolo||""}onChange={set("tavolo")}t={t}/><Input label="Ospiti"value={d.ospiti}onChange={set("ospiti")}type="number"t={t}/><Input label="Ora"value={d.ora}onChange={set("ora")}type="time"t={t}/><Input label="Minimo"value={d.minimo}onChange={set("minimo")}t={t}/><Select label="Tipo"value={d.tipo}onChange={set("tipo")}t={t}options={[{value:"normal",label:"Standard"},{value:"VIP",label:"VIP"},{value:"Promo",label:"Promo"}]}/></div><Input label="Telefono"value={d.telefono||""}onChange={set("telefono")}t={t}/><Input label="Allergie"value={(d.allergie||[]).join(", ")}onChange={v=>set("allergie")(v.split(",").map(a=>a.trim()).filter(Boolean))}t={t}/><div style={{marginBottom:14}}><div style={{fontSize:11,fontWeight:600,color:t.inkMuted,marginBottom:5,textTransform:"uppercase"}}>Note</div><textarea value={d.note||""}onChange={e=>set("note")(e.target.value)}rows={3}style={{width:"100%",padding:"10px 12px",background:t.bgInput,border:`1px solid ${t.div}`,borderRadius:10,color:t.ink,fontSize:14,resize:"vertical",fontFamily:"inherit",outline:"none"}}/></div><div style={{display:"flex",gap:8,justifyContent:"flex-end"}}><Btn variant="ghost"onClick={()=>setEdit(false)}t={t}>Annulla</Btn><Btn onClick={()=>{dispatch({type:"PREN_UPDATE",p:d});setEdit(false);}}t={t}>Salva</Btn></div></Modal>;
  return <Modal title={`${pren.nome} ${pren.cognome}`}onClose={onClose}t={t}width={520}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:16}}>{[["Prenotato da",pren.via||"—"],["Tavolo",pren.tavolo||"da assegnare"],["Ospiti",pren.ospiti],["Ora",pren.ora],["Minimo",pren.minimo||"—"],["Arrivo",pren.arrivo||"—"]].map(([k,v])=><div key={k}style={{background:t.bgCardAlt,borderRadius:10,padding:"10px 14px"}}><div style={{fontSize:10,color:t.inkMuted,fontWeight:600,letterSpacing:"0.05em",textTransform:"uppercase",marginBottom:3}}>{k}</div><div style={{fontSize:14,color:t.ink,fontWeight:600}}>{v}</div></div>)}</div>{pren.allergie?.length>0&&<div style={{marginBottom:12}}><div style={{fontSize:11,color:t.inkMuted,marginBottom:5,fontWeight:600}}>ALLERGIE</div><div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{pren.allergie.map(a=><Badge key={a}color={t.warning}bg={`${t.warning}22`}>{a}</Badge>)}</div></div>}{pren.note&&<div style={{background:t.bgCardAlt,borderRadius:10,padding:"12px 14px",marginBottom:12,fontSize:13,color:t.inkSoft}}>📝 {pren.note}</div>}<div style={{marginBottom:14}}><div style={{fontSize:11,color:t.inkMuted,marginBottom:8,fontWeight:600}}>CAMBIA STATO</div><div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{STATI.map(s=><button key={s}onClick={()=>{dispatch({type:"PREN_STATO",id:pren.id,stato:s});onClose();}}style={{padding:"6px 14px",borderRadius:8,border:`1px solid ${pren.stato===s?t.accent:t.div}`,background:pren.stato===s?t.accentGlow:"transparent",color:pren.stato===s?t.accent:t.inkSoft,cursor:"pointer",fontSize:12,fontWeight:pren.stato===s?700:400}}>{s}</button>)}</div></div><div style={{display:"flex",gap:8,justifyContent:"space-between"}}><Btn variant="danger"small onClick={()=>{dispatch({type:"PREN_DELETE",id:pren.id});onClose();}}t={t}>Elimina</Btn><div style={{display:"flex",gap:8}}><Btn variant="ghost"onClick={onClose}t={t}>Chiudi</Btn><Btn onClick={()=>setEdit(true)}t={t}>Modifica</Btn></div></div></Modal>;
}

/* ══════════════════════════════════════════════════════════
   GUEST LIST
══════════════════════════════════════════════════════════ */
function GuestListSection(){
  const{dispatch,t,venue}=useApp();
  const[search,setSearch]=useState("");
  const[filter,setFilter]=useState("All");
  const[showNew,setShowNew]=useState(false);
  const[nd,setNd]=useState({nome:"",booked_by:"",note:"",categoria:"FULL"});
  const counts={all:venue.guestlist.length,checkedin:venue.guestlist.filter(g=>g.stato==="checkedin").length,denied:venue.guestlist.filter(g=>g.stato==="denied").length};
  const items=useMemo(()=>{let l=venue.guestlist;if(filter==="Checked In")l=l.filter(g=>g.stato==="checkedin");else if(filter==="Denied")l=l.filter(g=>g.stato==="denied");if(search){const q=search.toLowerCase();l=l.filter(g=>g.nome.toLowerCase().includes(q)||(g.booked_by||"").toLowerCase().includes(q));}return l;},[venue.guestlist,filter,search]);
  const grouped=useMemo(()=>{const m={};items.forEach(g=>{const l=g.nome[0]?.toUpperCase()||"#";if(!m[l])m[l]=[];m[l].push(g);});return Object.entries(m).sort(([a],[b])=>a.localeCompare(b));},[items]);
  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
      <div style={{padding:"14px 20px 0",borderBottom:`1px solid ${t.div}`}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
          <div style={{display:"flex",gap:4}}>{[["All",counts.all],["Checked In",counts.checkedin],["Denied",counts.denied]].map(([f,c])=><Chip key={f}label={`${f} (${c})`}active={filter===f}onClick={()=>setFilter(f)}t={t}/>)}</div>
          <button onClick={()=>setShowNew(true)}style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",background:t.accent,border:"none",borderRadius:10,color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer"}}><Icon name="plus"size={15}color="#fff"/>Aggiungi</button>
        </div>
        <div style={{marginBottom:12}}><SearchBar value={search}onChange={setSearch}placeholder="Cerca per nome o promotore…"t={t}/></div>
        <div style={{display:"grid",gridTemplateColumns:"80px 1fr 160px 180px",gap:8,paddingBottom:10}}>{["Ora","Nome","Prenotato da","Note / Azioni"].map(h=><span key={h}style={{fontSize:10,fontWeight:600,color:t.inkMuted,letterSpacing:"0.05em",textTransform:"uppercase"}}>{h}</span>)}</div>
      </div>
      <div style={{flex:1,overflow:"auto"}}>
        {grouped.map(([letter,guests])=>(
          <div key={letter}>
            <div style={{padding:"7px 20px 4px",fontSize:12,fontWeight:700,color:t.inkMuted,background:t.bgAlt,letterSpacing:"0.06em"}}>{letter}</div>
            {guests.map(g=>{
              const[hov,setHov]=useState(false);
              return <div key={g.id}onMouseEnter={()=>setHov(true)}onMouseLeave={()=>setHov(false)}style={{display:"grid",gridTemplateColumns:"80px 1fr 160px 180px",gap:8,alignItems:"center",padding:"11px 20px",borderBottom:`1px solid ${t.div}`,background:hov?t.bgCardAlt:"transparent",transition:"background 0.15s"}}>
                <div style={{display:"flex",alignItems:"center",gap:6}}>{g.stato==="checkedin"?<div style={{width:20,height:20,borderRadius:"50%",background:t.accent,display:"flex",alignItems:"center",justifyContent:"center"}}><Icon name="check"size={11}color="#fff"/></div>:<div style={{width:20,height:20,borderRadius:"50%",border:`2px solid ${t.div}`}}/>}<span style={{fontSize:11,color:t.inkMuted}}>{g.ora||""}</span></div>
                <div><span style={{fontSize:13,fontWeight:600,color:t.ink}}>{g.nome}</span>{g.categoria!=="FULL"&&<Badge color={g.categoria==="COMP"?t.gold:t.inkSoft}bg={g.categoria==="COMP"?t.goldFaint:t.div}style={{marginLeft:8}}>{g.categoria}</Badge>}</div>
                <span style={{fontSize:12,color:t.inkSoft}}>{g.booked_by||"—"}</span>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}><span style={{fontSize:11,color:t.inkMuted}}>{g.note}</span>{hov&&<div style={{display:"flex",gap:3}}>{g.stato!=="checkedin"&&<button onClick={()=>dispatch({type:"GUEST_STATO",id:g.id,stato:"checkedin"})}style={{padding:"3px 8px",borderRadius:6,border:"none",background:t.success,color:"#fff",fontSize:11,fontWeight:600,cursor:"pointer"}}>✓ In</button>}{g.stato!=="denied"&&<button onClick={()=>dispatch({type:"GUEST_STATO",id:g.id,stato:"denied"})}style={{padding:"3px 8px",borderRadius:6,border:"none",background:t.danger,color:"#fff",fontSize:11,fontWeight:600,cursor:"pointer"}}>✗</button>}<button onClick={()=>dispatch({type:"GUEST_DELETE",id:g.id})}style={{padding:"3px 8px",borderRadius:6,border:"none",background:t.bgCardAlt,color:t.inkMuted,fontSize:11,cursor:"pointer"}}>del</button></div>}</div>
              </div>;
            })}
          </div>
        ))}
        {items.length===0&&<div style={{padding:"40px",textAlign:"center",color:t.inkMuted}}><Icon name="users"size={40}color={t.inkFaint}style={{margin:"0 auto 12px"}}/><div>Nessun ospite trovato</div></div>}
      </div>
      {showNew&&<Modal title="Nuovo Ospite"onClose={()=>setShowNew(false)}t={t}width={400}><Input label="Nome"value={nd.nome}onChange={v=>setNd(d=>({...d,nome:v}))}t={t}/><Input label="Prenotato da"value={nd.booked_by}onChange={v=>setNd(d=>({...d,booked_by:v}))}t={t}/><Input label="Note"value={nd.note}onChange={v=>setNd(d=>({...d,note:v}))}t={t}/><Select label="Categoria"value={nd.categoria}onChange={v=>setNd(d=>({...d,categoria:v}))}t={t}options={[{value:"FULL",label:"FULL"},{value:"REDUCED",label:"REDUCED"},{value:"COMP",label:"COMP"}]}/><div style={{display:"flex",gap:8,justifyContent:"flex-end"}}><Btn variant="ghost"onClick={()=>setShowNew(false)}t={t}>Annulla</Btn><Btn onClick={()=>{if(!nd.nome.trim())return;dispatch({type:"GUEST_ADD",g:{id:genId(),...nd,stato:"pending",ora:""}});setShowNew(false);setNd({nome:"",booked_by:"",note:"",categoria:"FULL"});}}t={t}>Aggiungi</Btn></div></Modal>}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   TAVOLI — SHAPE FLOOR PLAN
══════════════════════════════════════════════════════════ */
const TABLE_FORME = [
  {id:"round",   label:"Rotondo",  icon:"⬤",  w:48,  h:48,  r:"50%"},
  {id:"square",  label:"Quadrato", icon:"■",  w:50,  h:50,  r:"8px"},
  {id:"rect",    label:"Rettangolo 4px",  icon:"▬",  w:72,  h:44,  r:"8px"},
  {id:"rect_lg", label:"Rettangolo XL", icon:"▬",  w:96,  h:44,  r:"8px"},
  {id:"oval",    label:"Ovale",    icon:"⬬",  w:72,  h:46,  r:"50%"},
  {id:"banquet", label:"Banquet",  icon:"▬",  w:120, h:40,  r:"8px"},
];

function getFormaStyle(forma, scale=1) {
  const f = TABLE_FORME.find(x=>x.id===forma) || TABLE_FORME[0];
  return { width: f.w*scale, height: f.h*scale, borderRadius: f.r };
}

function TableShape({ tv, fillColor, textColor, selected, editMode, dragging, onMouseDown, onClick, onDelete, pren, ordine, t }) {
  const fs = getFormaStyle(tv.forma||"round");
  const isLong = tv.forma==="banquet"||tv.forma==="rect_lg";
  return (
    <div
      onMouseDown={onMouseDown}
      onClick={onClick}
      style={{
        position:"absolute",
        left:`${tv.x}%`, top:`${tv.y}%`,
        transform:"translate(-50%,-50%)",
        ...fs,
        background: fillColor,
        border: selected ? `3px solid #F0B84C` : editMode ? `2px dashed rgba(255,255,255,0.25)` : `2px solid transparent`,
        display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
        cursor: editMode ? "move" : "pointer",
        transition: dragging ? "none" : "all 0.15s",
        boxShadow: selected
          ? `0 0 0 4px rgba(240,184,76,0.25), 0 6px 20px rgba(0,0,0,0.5)`
          : tv.stato!=="free" ? `0 4px 14px rgba(0,0,0,0.45)` : `0 2px 6px rgba(0,0,0,0.2)`,
        zIndex: selected || dragging ? 20 : 1,
        userSelect:"none",
        flexShrink:0,
      }}
    >
      <span style={{fontSize: isLong?13:11, fontWeight:800, color:textColor, lineHeight:1}}>{tv.num}</span>
      {pren && <span style={{fontSize:isLong?9:7, color:textColor, opacity:0.85, maxWidth:fs.width-8, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", marginTop:1}}>{pren.cognome}</span>}
      {tv.stato==="occupied" && ordine?.creatoAt && (
        <span style={{fontSize:isLong?8:6, color:textColor, opacity:0.7, marginTop:1}}>⏱{formatDuration(ordine.creatoAt)}</span>
      )}
      {editMode && (
        <button onClick={e=>{e.stopPropagation(); onDelete();}}
          style={{position:"absolute",top:-6,right:-6,width:16,height:16,borderRadius:"50%",background:"#F05C5C",border:"none",color:"#fff",fontSize:9,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",lineHeight:1}}>×</button>
      )}
    </div>
  );
}

function TavoliSection() {
  const {dispatch, t, venue} = useApp();
  const zone = venue.zone||SEED_ZONE;
  const [activeZona, setActiveZona] = useState(zone[0]?.nome||"Main Room");
  const [editMode, setEditMode]     = useState(false);
  const [selected, setSelected]     = useState(null);
  const [dragging, setDragging]     = useState(null);
  const [showAddTavolo, setShowAddTavolo] = useState(false);
  const [showAddZona,   setShowAddZona]   = useState(false);
  const [showEditTavolo, setShowEditTavolo] = useState(false);
  const [newZona,   setNewZona]   = useState({nome:"",colore:"#7C6EF5"});
  const [newTavolo, setNewTavolo] = useState({num:"",cap:"4",zona:activeZona,forma:"round"});
  const mapRef = useRef(null);

  const tavoli   = venue.tavoli.filter(tv=>tv.zona===activeZona);
  const zonaObj  = zone.find(z=>z.nome===activeZona);
  const selTavolo= selected ? venue.tavoli.find(tv=>tv.id===selected.id) : null;

  const getColor = tv => {
    if(tv.stato==="occupied") return zonaObj?.colore||t.accent;
    if(tv.stato==="reserved") return t.warning;
    return t.bgCardAlt;
  };
  const getTextColor = tv => (tv.stato==="occupied"||tv.stato==="reserved") ? "#fff" : t.inkMuted;
  const getPren  = tv => venue.prenotazioni.find(p=>p.tavolo===tv.num);
  const getOrdine= tv => (venue.servizioOrdini||[]).find(o=>o.tavolo===tv.num&&o.stato==="aperto");

  const handleMouseDown = (e, tv) => {
    if(!editMode) return;
    e.preventDefault();
    setDragging({id:tv.id,startX:e.clientX,startY:e.clientY,origX:tv.x,origY:tv.y});
  };

  useEffect(()=>{
    if(!dragging) return;
    const onMove = e => {
      const rect = mapRef.current?.getBoundingClientRect();
      if(!rect) return;
      const px = Math.min(95,Math.max(5, dragging.origX+(e.clientX-dragging.startX)/rect.width*100));
      const py = Math.min(95,Math.max(5, dragging.origY+(e.clientY-dragging.startY)/rect.height*100));
      dispatch({type:"TAVOLO_MOVE",id:dragging.id,x:Math.round(px),y:Math.round(py)});
    };
    const onUp = ()=>setDragging(null);
    window.addEventListener("mousemove",onMove);
    window.addEventListener("mouseup",onUp);
    return()=>{ window.removeEventListener("mousemove",onMove); window.removeEventListener("mouseup",onUp); };
  },[dragging]);

  const statoCount = {
    free:     tavoli.filter(tv=>tv.stato==="free").length,
    reserved: tavoli.filter(tv=>tv.stato==="reserved").length,
    occupied: tavoli.filter(tv=>tv.stato==="occupied").length,
  };

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>

      {/* ── Toolbar ── */}
      <div style={{padding:"10px 16px",borderBottom:`1px solid ${t.div}`,display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",background:t.bgAlt}}>
        {/* Zone chips */}
        <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
          {zone.map(z=>(
            <button key={z.id} onClick={()=>{setActiveZona(z.nome);setSelected(null);}}
              style={{display:"flex",alignItems:"center",gap:6,padding:"5px 14px",borderRadius:20,border:"none",cursor:"pointer",
                background:activeZona===z.nome?z.colore:t.bgCardAlt,
                color:activeZona===z.nome?"#fff":t.inkSoft,
                fontSize:12,fontWeight:activeZona===z.nome?700:400,transition:"all 0.2s"}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:activeZona===z.nome?"rgba(255,255,255,0.6)":z.colore}}/>
              {z.nome}
            </button>
          ))}
          <button onClick={()=>setShowAddZona(true)}
            style={{padding:"5px 10px",borderRadius:20,border:`1px dashed ${t.div}`,background:"none",color:t.inkMuted,fontSize:11,cursor:"pointer"}}>
            + Zona
          </button>
        </div>

        {/* Stats pills */}
        <div style={{display:"flex",gap:6,marginLeft:4}}>
          {[["Liberi",statoCount.free,t.bgCardAlt,t.inkSoft],
            ["Riservati",statoCount.reserved,`${t.warning}22`,t.warning],
            ["Occupati",statoCount.occupied,`${zonaObj?.colore||t.accent}22`,zonaObj?.colore||t.accent]
          ].map(([l,v,bg,col])=>(
            <div key={l} style={{display:"flex",alignItems:"center",gap:5,padding:"4px 10px",borderRadius:12,background:bg,fontSize:11,color:col,fontWeight:600}}>
              <span style={{fontWeight:800}}>{v}</span> {l}
            </div>
          ))}
        </div>

        <div style={{flex:1}}/>

        {/* Legend */}
        {TABLE_FORME.slice(0,4).map(f=>(
          <div key={f.id} style={{display:"flex",alignItems:"center",gap:4,fontSize:10,color:t.inkMuted}}>
            <div style={{width:f.w*0.28,height:f.h*0.28,borderRadius:f.r,background:t.bgCardAlt,border:`1px solid ${t.divStrong}`}}/>
            <span>{f.label.split(" ")[0]}</span>
          </div>
        ))}

        <button onClick={()=>setEditMode(e=>!e)}
          style={{padding:"6px 14px",borderRadius:20,border:`1px solid ${editMode?t.accent:t.div}`,
            background:editMode?t.accentGlow:"none",color:editMode?t.accent:t.inkMuted,fontSize:12,cursor:"pointer",fontWeight:editMode?700:400}}>
          {editMode?"✓ Fine modifica":"✎ Modifica sala"}
        </button>
        {editMode&&(
          <button onClick={()=>setShowAddTavolo(true)}
            style={{padding:"6px 16px",borderRadius:20,border:"none",background:t.accent,color:"#fff",fontSize:12,cursor:"pointer",fontWeight:700}}>
            + Tavolo
          </button>
        )}
      </div>

      {/* ── Floor Map ── */}
      <div ref={mapRef}
        style={{flex:1,position:"relative",overflow:"hidden",background:t.bg,userSelect:editMode?"none":"auto"}}
        onClick={e=>{ if(e.target===mapRef.current) setSelected(null); }}>

        {/* Stage label */}
        <div style={{position:"absolute",left:"30%",top:"2%",width:"25%",padding:"7px 0",background:t.bgCard,borderRadius:8,border:`1px solid ${t.div}`,textAlign:"center",fontSize:10,fontWeight:700,letterSpacing:"0.12em",color:t.inkMuted,pointerEvents:"none"}}>STAGE / PALCO</div>

        {tavoli.map(tv=>(
          <TableShape
            key={tv.id}
            tv={tv}
            fillColor={getColor(tv)}
            textColor={getTextColor(tv)}
            selected={selTavolo?.id===tv.id}
            editMode={editMode}
            dragging={dragging?.id===tv.id}
            pren={getPren(tv)}
            ordine={getOrdine(tv)}
            t={t}
            onMouseDown={e=>handleMouseDown(e,tv)}
            onClick={()=>{ if(!editMode) setSelected(tv); }}
            onDelete={()=>dispatch({type:"TAVOLO_DELETE",id:tv.id})}
          />
        ))}

        {/* Fixed labels */}
        {[["BAR",{right:"2%",top:"38%"}],["WC",{right:"2%",top:"50%"}]].map(([l,pos])=>(
          <div key={l} style={{position:"absolute",...pos,padding:"5px 10px",background:t.bgCard,border:`1px solid ${t.div}`,borderRadius:6,fontSize:10,fontWeight:700,color:t.inkMuted}}>{l}</div>
        ))}
      </div>

      {/* ── Detail bar (click on table) ── */}
      {selTavolo&&!editMode&&(()=>{
        const pren = getPren(selTavolo);
        const ord  = getOrdine(selTavolo);
        const zona = zone.find(z=>z.nome===selTavolo.zona);
        return (
          <div style={{padding:"12px 20px",borderTop:`1px solid ${t.div}`,background:t.bgCard,display:"flex",alignItems:"center",gap:14,flexWrap:"wrap"}}>
            <div style={{...getFormaStyle(selTavolo.forma||"round",0.7),background:zona?.colore||t.accent,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <span style={{fontSize:13,fontWeight:900,color:"#fff"}}>{selTavolo.num}</span>
            </div>
            <div style={{flex:1,minWidth:0}}>
              {pren ? (
                <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
                  <span style={{fontSize:14,fontWeight:700,color:t.ink}}>{pren.nome} {pren.cognome}</span>
                  <StatoBadge stato={pren.stato} t={t}/>
                  <TipoBadge tipo={pren.tipo} t={t}/>
                  <span style={{fontSize:12,color:t.inkSoft}}>{pren.ospiti} ospiti · {pren.ora} · {pren.minimo||"—"}</span>
                  {pren.allergie?.length>0&&<span style={{fontSize:11,color:t.warning,fontWeight:600}}>⚠ {pren.allergie.join(", ")}</span>}
                </div>
              ) : (
                <span style={{color:t.inkMuted,fontSize:13}}>Tavolo libero · cap {selTavolo.cap}</span>
              )}
              {ord&&<div style={{fontSize:11,color:t.inkSoft,marginTop:2}}>Ordine aperto · {fmtEur(ord.totale||0)} · ⏱{formatDuration(ord.creatoAt)}</div>}
            </div>
            <div style={{display:"flex",gap:8}}>
              {/* Quick stato change */}
              {pren&&pren.stato==="upcoming"&&(
                <button onClick={()=>dispatch({type:"PREN_STATO",id:pren.id,stato:"arrived"})}
                  style={{padding:"6px 12px",borderRadius:8,border:"none",background:`${t.warning}22`,color:t.warning,fontSize:12,cursor:"pointer",fontWeight:600}}>✓ Arrivato</button>
              )}
              {pren&&pren.stato==="arrived"&&(
                <button onClick={()=>dispatch({type:"PREN_STATO",id:pren.id,stato:"seated"})}
                  style={{padding:"6px 12px",borderRadius:8,border:"none",background:`${t.success}22`,color:t.success,fontSize:12,cursor:"pointer",fontWeight:600}}>→ Seduto</button>
              )}
              <button onClick={()=>setShowEditTavolo(true)}
                style={{padding:"6px 12px",borderRadius:8,border:`1px solid ${t.div}`,background:"none",color:t.inkSoft,fontSize:12,cursor:"pointer"}}>✎ Tavolo</button>
            </div>
            <button onClick={()=>setSelected(null)} style={{background:"none",border:"none",cursor:"pointer",color:t.inkMuted}}><Icon name="x"size={16}color={t.inkMuted}/></button>
          </div>
        );
      })()}

      {/* ── Edit selected table ── */}
      {showEditTavolo&&selTavolo&&(
        <EditTavoloModal tavolo={selTavolo} zone={zone} t={t} dispatch={dispatch} onClose={()=>setShowEditTavolo(false)}/>
      )}

      {/* ── Add table modal ── */}
      {showAddTavolo&&(
        <AddTavoloModal
          zone={zone} activeZona={activeZona} t={t}
          dispatch={dispatch}
          onClose={()=>setShowAddTavolo(false)}
        />
      )}

      {/* ── Add zona modal ── */}
      {showAddZona&&<Modal title="Nuova Zona" onClose={()=>setShowAddZona(false)} t={t} width={360}>
        <Input label="Nome zona" value={newZona.nome} onChange={v=>setNewZona(d=>({...d,nome:v}))} t={t}/>
        <div style={{marginBottom:14}}>
          <div style={{fontSize:11,fontWeight:600,color:t.inkMuted,marginBottom:5,textTransform:"uppercase"}}>Colore</div>
          <input type="color" value={newZona.colore} onChange={e=>setNewZona(d=>({...d,colore:e.target.value}))}
            style={{width:"100%",height:44,borderRadius:10,border:`1px solid ${t.div}`,background:"none",cursor:"pointer"}}/>
        </div>
        <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
          <Btn variant="ghost" onClick={()=>setShowAddZona(false)} t={t}>Annulla</Btn>
          <Btn onClick={()=>{if(!newZona.nome)return;dispatch({type:"ZONA_ADD",z:{id:genId(),...newZona}});setActiveZona(newZona.nome);setShowAddZona(false);setNewZona({nome:"",colore:"#7C6EF5"});}} t={t}>Crea</Btn>
        </div>
      </Modal>}
    </div>
  );
}

function AddTavoloModal({zone, activeZona, t, dispatch, onClose}) {
  const [d,setD] = useState({num:"",cap:"4",zona:activeZona,forma:"round"});
  const save = () => {
    if(!d.num) return;
    dispatch({type:"TAVOLO_ADD",t:{id:genId(),num:d.num,cap:parseInt(d.cap)||4,zona:d.zona,stato:"free",pren_id:null,x:50,y:50,forma:d.forma}});
    onClose();
  };
  return (
    <Modal title="Aggiungi Tavolo" onClose={onClose} t={t} width={420}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 14px"}}>
        <Input label="N° Tavolo" value={d.num} onChange={v=>setD(x=>({...x,num:v}))} t={t}/>
        <Input label="Coperti" value={d.cap} onChange={v=>setD(x=>({...x,cap:v}))} type="number" t={t}/>
      </div>
      <Select label="Zona" value={d.zona} onChange={v=>setD(x=>({...x,zona:v}))} t={t}
        options={zone.map(z=>({value:z.nome,label:z.nome}))}/>
      <div style={{marginBottom:16}}>
        <div style={{fontSize:11,fontWeight:600,color:t.inkMuted,marginBottom:10,textTransform:"uppercase",letterSpacing:"0.05em"}}>Forma tavolo</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {TABLE_FORME.map(f=>(
            <button key={f.id} onClick={()=>setD(x=>({...x,forma:f.id}))}
              style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6,padding:"10px 14px",borderRadius:10,
                border:`2px solid ${d.forma===f.id?t.accent:t.div}`,
                background:d.forma===f.id?t.accentGlow:"transparent",cursor:"pointer",transition:"all 0.15s"}}>
              <div style={{...getFormaStyle(f.id,0.55),background:d.forma===f.id?t.accent:t.bgCardAlt,flexShrink:0}}/>
              <span style={{fontSize:10,color:d.forma===f.id?t.accent:t.inkSoft,fontWeight:d.forma===f.id?700:400,whiteSpace:"nowrap"}}>{f.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
        <Btn variant="ghost" onClick={onClose} t={t}>Annulla</Btn>
        <Btn onClick={save} t={t}>Aggiungi</Btn>
      </div>
    </Modal>
  );
}

function EditTavoloModal({tavolo, zone, t, dispatch, onClose}) {
  const [d,setD] = useState({...tavolo});
  const save = () => { dispatch({type:"TAVOLO_UPDATE",tv:d}); onClose(); };
  return (
    <Modal title={`Tavolo ${tavolo.num}`} onClose={onClose} t={t} width={420}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 14px"}}>
        <Input label="N° Tavolo" value={d.num} onChange={v=>setD(x=>({...x,num:v}))} t={t}/>
        <Input label="Coperti" value={d.cap} onChange={v=>setD(x=>({...x,cap:parseInt(v)||d.cap}))} type="number" t={t}/>
      </div>
      <Select label="Zona" value={d.zona} onChange={v=>setD(x=>({...x,zona:v}))} t={t}
        options={zone.map(z=>({value:z.nome,label:z.nome}))}/>
      <Select label="Stato" value={d.stato} onChange={v=>setD(x=>({...x,stato:v}))} t={t}
        options={[{value:"free",label:"Libero"},{value:"reserved",label:"Riservato"},{value:"occupied",label:"Occupato"}]}/>
      <div style={{marginBottom:16}}>
        <div style={{fontSize:11,fontWeight:600,color:t.inkMuted,marginBottom:10,textTransform:"uppercase",letterSpacing:"0.05em"}}>Forma</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {TABLE_FORME.map(f=>(
            <button key={f.id} onClick={()=>setD(x=>({...x,forma:f.id}))}
              style={{display:"flex",flexDirection:"column",alignItems:"center",gap:5,padding:"8px 12px",borderRadius:10,
                border:`2px solid ${d.forma===f.id?t.accent:t.div}`,
                background:d.forma===f.id?t.accentGlow:"transparent",cursor:"pointer"}}>
              <div style={{...getFormaStyle(f.id,0.5),background:d.forma===f.id?t.accent:t.bgCardAlt,flexShrink:0}}/>
              <span style={{fontSize:9,color:d.forma===f.id?t.accent:t.inkSoft,fontWeight:d.forma===f.id?700:400}}>{f.label.split(" ")[0]}</span>
            </button>
          ))}
        </div>
      </div>
      <div style={{display:"flex",gap:8,justifyContent:"space-between"}}>
        <Btn variant="danger" small onClick={()=>{dispatch({type:"TAVOLO_DELETE",id:tavolo.id});onClose();}} t={t}>Elimina</Btn>
        <div style={{display:"flex",gap:8}}>
          <Btn variant="ghost" onClick={onClose} t={t}>Annulla</Btn>
          <Btn onClick={save} t={t}>Salva</Btn>
        </div>
      </div>
    </Modal>
  );
}

/* ══════════════════════════════════════════════════════════
   CLIENTI
══════════════════════════════════════════════════════════ */
function ClientiSection(){
  const{dispatch,t,venue}=useApp();
  const[search,setSearch]=useState("");
  const[selected,setSelected]=useState(null);
  const[showNew,setShowNew]=useState(false);
  const[editData,setEditData]=useState(null);
  const items=useMemo(()=>{if(!search)return venue.clienti;const q=search.toLowerCase();return venue.clienti.filter(c=>c.nome.toLowerCase().includes(q)||(c.email||"").toLowerCase().includes(q)||(c.telefono||"").toLowerCase().includes(q));},[venue.clienti,search]);
  return (
    <div style={{display:"flex",height:"100%"}}>
      <div style={{width:300,borderRight:`1px solid ${t.div}`,display:"flex",flexDirection:"column"}}>
        <div style={{padding:"14px 14px",borderBottom:`1px solid ${t.div}`}}><SearchBar value={search}onChange={setSearch}placeholder="Cerca clienti…"t={t}/></div>
        <div style={{flex:1,overflow:"auto"}}>
          {items.map(c=>(
            <div key={c.id}onClick={()=>setSelected(c)}style={{display:"flex",gap:10,padding:"12px 14px",borderBottom:`1px solid ${t.div}`,cursor:"pointer",background:selected?.id===c.id?t.bgCardAlt:"transparent",transition:"background 0.15s"}}
              onMouseEnter={e=>e.currentTarget.style.background=t.bgCardAlt}
              onMouseLeave={e=>e.currentTarget.style.background=selected?.id===c.id?t.bgCardAlt:"transparent"}>
              <Avatar nome={c.nome}size={38}/>
              <div style={{flex:1,minWidth:0}}><div style={{display:"flex",gap:5,alignItems:"center",marginBottom:2}}><span style={{fontSize:13,fontWeight:700,color:t.ink}}>{c.nome}</span>{c.vip&&<Icon name="star"size={11}color={t.vip}/>}</div><div style={{fontSize:11,color:t.inkMuted}}>{c.visite} visite · {fmtEur(c.spesaTotale)}</div></div>
            </div>
          ))}
        </div>
        <div style={{padding:"12px 14px",borderTop:`1px solid ${t.div}`}}><button onClick={()=>setShowNew(true)}style={{width:"100%",padding:"10px",borderRadius:10,border:`1px dashed ${t.div}`,background:"none",color:t.inkMuted,fontSize:13,cursor:"pointer"}}>+ Aggiungi cliente</button></div>
      </div>
      <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center"}}>
        {selected?(
          <div style={{maxWidth:460,width:"100%",padding:28}}>
            <div style={{display:"flex",alignItems:"center",gap:18,marginBottom:22}}><Avatar nome={selected.nome}size={68}/><div><h2 style={{fontSize:20,fontWeight:800,color:t.ink,marginBottom:6}}>{selected.nome}</h2><div style={{display:"flex",gap:6}}>{selected.vip&&<Badge color={t.vip}bg={`${t.vip}22`}>⭐ VIP</Badge>}</div></div></div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:18}}>{[["Visite totali",selected.visite,t.accent],["Spesa totale",fmtEur(selected.spesaTotale),t.gold]].map(([l,v,c])=><div key={l}style={{background:t.bgCard,borderRadius:12,padding:"14px 16px",border:`1px solid ${t.div}`}}><div style={{fontSize:11,color:t.inkMuted,fontWeight:600,marginBottom:4}}>{l}</div><div style={{fontSize:20,fontWeight:800,color:c}}>{v}</div></div>)}</div>
            {selected.telefono&&<div style={{display:"flex",gap:8,marginBottom:8,fontSize:13,color:t.inkSoft}}>📞 {selected.telefono}</div>}
            {selected.email&&<div style={{display:"flex",gap:8,marginBottom:8,fontSize:13,color:t.inkSoft}}>✉ {selected.email}</div>}
            {selected.allergie?.length>0&&<div style={{marginBottom:12}}><div style={{fontSize:11,color:t.warning,fontWeight:600,marginBottom:5}}>⚠ ALLERGIE</div><div style={{display:"flex",gap:5,flexWrap:"wrap"}}>{selected.allergie.map(a=><Badge key={a}color={t.warning}bg={`${t.warning}22`}>{a}</Badge>)}</div></div>}
            {selected.note&&<div style={{background:t.bgCard,borderRadius:10,padding:"10px 14px",marginBottom:14,fontSize:13,color:t.inkSoft,border:`1px solid ${t.div}`}}>📝 {selected.note}</div>}
            <div style={{display:"flex",gap:8}}><Btn onClick={()=>setEditData({...selected})}t={t}style={{flex:1}}>Modifica</Btn><Btn variant="danger"small onClick={()=>{dispatch({type:"CLIENTE_DELETE",id:selected.id});setSelected(null);}}t={t}>Elimina</Btn></div>
          </div>
        ):(
          <div style={{textAlign:"center",color:t.inkMuted}}><div style={{fontSize:56,marginBottom:12}}>👤</div><div style={{fontSize:14}}>Seleziona un cliente</div></div>
        )}
      </div>
      {(showNew||editData)&&<ClienteForm cliente={editData||{nome:"",telefono:"",email:"",note:"",vip:false,allergie:[],visite:0,spesaTotale:0}}isNew={!editData}onClose={()=>{setShowNew(false);setEditData(null);}}onSave={c=>{if(editData){dispatch({type:"CLIENTE_UPDATE",c});setSelected(c);}else{const nc={...c,id:genId()};dispatch({type:"CLIENTE_ADD",c:nc});}setShowNew(false);setEditData(null);}}t={t}/>}
    </div>
  );
}
function ClienteForm({cliente,isNew,onClose,onSave,t}){
  const[d,setD]=useState({...cliente,allergie:(cliente.allergie||[]).join(", ")});
  const set=k=>v=>setD(x=>({...x,[k]:v}));
  const save=()=>{if(!d.nome.trim())return;onSave({...d,allergie:d.allergie?d.allergie.split(",").map(a=>a.trim()).filter(Boolean):[],visite:parseInt(d.visite)||0,spesaTotale:parseFloat(String(d.spesaTotale).replace(/[^0-9.]/g,""))||0});};
  return <Modal title={isNew?"Nuovo Cliente":"Modifica Cliente"}onClose={onClose}t={t}width={480}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 16px"}}><Input label="Nome"value={d.nome}onChange={set("nome")}t={t}/><Input label="Telefono"value={d.telefono||""}onChange={set("telefono")}t={t}/><Input label="Email"value={d.email||""}onChange={set("email")}t={t}/><div style={{marginBottom:14}}><div style={{fontSize:11,fontWeight:600,color:t.inkMuted,marginBottom:5,textTransform:"uppercase"}}>VIP</div><button onClick={()=>set("vip")(!d.vip)}style={{padding:"10px 16px",borderRadius:10,border:`2px solid ${d.vip?t.vip:t.div}`,background:d.vip?`${t.vip}18`:"transparent",color:d.vip?t.vip:t.inkSoft,cursor:"pointer",fontWeight:600,fontSize:13}}>{d.vip?"⭐ VIP attivo":"Imposta VIP"}</button></div></div><Input label="Allergie (virgola)"value={d.allergie}onChange={set("allergie")}t={t}/><div style={{marginBottom:14}}><div style={{fontSize:11,fontWeight:600,color:t.inkMuted,marginBottom:5,textTransform:"uppercase"}}>Note</div><textarea value={d.note||""}onChange={e=>set("note")(e.target.value)}rows={3}style={{width:"100%",padding:"10px 12px",background:t.bgInput,border:`1px solid ${t.div}`,borderRadius:10,color:t.ink,fontSize:14,resize:"vertical",fontFamily:"inherit",outline:"none"}}/></div><div style={{display:"flex",gap:8,justifyContent:"flex-end"}}><Btn variant="ghost"onClick={onClose}t={t}>Annulla</Btn><Btn onClick={save}t={t}>Salva</Btn></div></Modal>;
}

/* ══════════════════════════════════════════════════════════
   TALLY
══════════════════════════════════════════════════════════ */
function TallySection(){
  const{dispatch,t,venue}=useApp();
  const[selPromo,setSelPromo]=useState(venue.promotori[3]||venue.promotori[0]);
  const[search,setSearch]=useState("");
  const[showNew,setShowNew]=useState(false);
  const[nuovoNome,setNuovoNome]=useState("");
  const[tGender,setTGender]=useState("f");
  const[tCat,setTCat]=useState("comp");
  const promo=venue.promotori;
  const filtered=promo.filter(p=>!search||p.nome.toLowerCase().includes(search.toLowerCase()));
  const live=selPromo?promo.find(p=>p.id===selPromo.id)||selPromo:null;

  return (
    <div style={{display:"flex",height:"100%"}}>
      <div style={{width:340,borderRight:`1px solid ${t.div}`,display:"flex",flexDirection:"column"}}>
        <div style={{padding:"12px 14px",borderBottom:`1px solid ${t.div}`}}><SearchBar value={search}onChange={setSearch}placeholder="Cerca promotore…"t={t}/></div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 54px 54px 54px",gap:4,padding:"8px 14px 6px",borderBottom:`1px solid ${t.div}`}}>{["Promotore","Tot","M","F"].map(h=><span key={h}style={{fontSize:10,fontWeight:600,color:t.inkMuted,letterSpacing:"0.05em",textTransform:"uppercase"}}>{h}</span>)}</div>
        <div style={{background:t.bgCardAlt,display:"grid",gridTemplateColumns:"1fr 54px 54px 54px",gap:4,padding:"9px 14px",borderBottom:`1px solid ${t.div}`}}>
          <span style={{fontSize:12,fontWeight:800,color:t.ink}}>TOTALE SERATA</span>
          <span style={{fontSize:12,fontWeight:800,color:t.accent,textAlign:"center"}}>{venue.tally_totale}</span>
          <span style={{fontSize:12,fontWeight:700,color:"#7AADF5",textAlign:"center"}}>{venue.tally_m}m</span>
          <span style={{fontSize:12,fontWeight:700,color:"#F57AB5",textAlign:"center"}}>{venue.tally_f}f</span>
        </div>
        <div style={{flex:1,overflow:"auto"}}>
          {filtered.map(p=>(
            <div key={p.id}onClick={()=>setSelPromo(p)}style={{display:"grid",gridTemplateColumns:"1fr 54px 54px 54px",gap:4,padding:"10px 14px",borderBottom:`1px solid ${t.div}`,cursor:"pointer",background:live?.id===p.id?t.bgCardAlt:"transparent",transition:"background 0.15s"}}
              onMouseEnter={e=>e.currentTarget.style.background=t.bgCardAlt}
              onMouseLeave={e=>e.currentTarget.style.background=live?.id===p.id?t.bgCardAlt:"transparent"}>
              <span style={{fontSize:13,fontWeight:live?.id===p.id?700:400,color:t.ink}}>{p.nome}</span>
              <span style={{fontSize:13,textAlign:"center",color:t.ink}}>{p.totale}</span>
              <span style={{fontSize:12,textAlign:"center",color:"#7AADF5"}}>{p.m}m</span>
              <span style={{fontSize:12,textAlign:"center",color:"#F57AB5"}}>{p.f}f</span>
            </div>
          ))}
        </div>
        <div style={{padding:"12px 14px",borderTop:`1px solid ${t.div}`}}>{showNew?<div style={{display:"flex",gap:6}}><input value={nuovoNome}onChange={e=>setNuovoNome(e.target.value)}placeholder="Nome promotore"style={{flex:1,padding:"8px 10px",background:t.bgInput,border:`1px solid ${t.div}`,borderRadius:8,color:t.ink,fontSize:13,fontFamily:"inherit",outline:"none"}}/><Btn small onClick={()=>{if(!nuovoNome.trim())return;dispatch({type:"PROMOTORE_ADD",p:{id:genId(),nome:nuovoNome.trim(),totale:0,m:0,f:0,comp:0,reduced:0,full:0}});setNuovoNome("");setShowNew(false);}}t={t}>+</Btn></div>:<button onClick={()=>setShowNew(true)}style={{width:"100%",padding:"8px",borderRadius:8,border:`1px dashed ${t.div}`,background:"none",color:t.inkMuted,fontSize:12,cursor:"pointer"}}>+ Promotore</button>}</div>
      </div>
      {live?(
        <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"auto"}}>
          <div style={{padding:"18px 24px",borderBottom:`1px solid ${t.div}`}}><h2 style={{fontSize:20,fontWeight:800,color:t.ink}}>{live.nome}</h2></div>
          <div style={{display:"flex",gap:0,borderBottom:`1px solid ${t.div}`}}>
            {[["MALE",live.m,"#7AADF5"],["TOTAL",live.totale,t.ink],["FEMALE",live.f,"#F57AB5"]].map(([l,v,c],i)=>(
              <div key={l}style={{flex:1,padding:"18px 0",textAlign:"center",borderRight:i<2?`1px solid ${t.div}`:"none"}}>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.08em",color:t.inkMuted,marginBottom:4}}>{l}</div>
                <div style={{fontSize:36,fontWeight:900,color:c}}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",borderBottom:`1px solid ${t.div}`}}>
            {[["COMP",live.comp||0,t.gold],["REDUCED",live.reduced||0,t.inkSoft],["FULL",live.full||0,t.success]].map(([l,v,c],i)=>(
              <div key={l}style={{padding:"14px 0",textAlign:"center",borderRight:i<2?`1px solid ${t.div}`:"none"}}>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.06em",color:t.inkMuted,marginBottom:4}}>{l}</div>
                <div style={{fontSize:24,fontWeight:800,color:c}}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{padding:"16px 24px",display:"flex",flexDirection:"column",gap:12,alignItems:"center"}}>
            <div style={{display:"flex",gap:0,width:"100%",maxWidth:320}}>
              {["m","f"].map(g=><button key={g}onClick={()=>setTGender(g)}style={{flex:1,padding:"10px",border:"none",cursor:"pointer",background:tGender===g?t.accent:t.bgCardAlt,color:tGender===g?"#fff":t.inkSoft,fontWeight:700,fontSize:13,borderRadius:g==="m"?"10px 0 0 10px":"0 10px 10px 0",transition:"all 0.2s"}}>{g==="m"?"👨 Male":"👩 Female"}</button>)}
            </div>
            <div style={{display:"flex",gap:16,flexWrap:"wrap",justifyContent:"center"}}>
              {[{label:"COMP",cat:"comp",color:t.gold},{label:"REDUCED",cat:"reduced",color:t.inkSoft},{label:"FULL",cat:"full",color:t.success}].map(({label,cat,color})=>(
                <div key={cat}style={{background:t.bgCard,borderRadius:14,border:`1px solid ${t.div}`,overflow:"hidden",width:160}}>
                  <div style={{padding:"9px 0",textAlign:"center",fontSize:11,fontWeight:700,letterSpacing:"0.06em",color,borderBottom:`1px solid ${t.div}`}}>{label}</div>
                  <div style={{display:"flex",alignItems:"center"}}>
                    <button onClick={()=>{dispatch({type:"PROMOTORE_TALLY",id:live.id,g:tGender,delta:-1,cat});dispatch({type:"TALLY_INC",g:tGender,delta:-1});setSelPromo(promo.find(p=>p.id===live.id)||live);}}style={{flex:1,padding:"16px 0",background:"rgba(255,80,80,0.12)",border:"none",cursor:"pointer",fontSize:22,color:t.danger,fontWeight:700}}>−</button>
                    <span style={{flex:1,textAlign:"center",fontSize:22,fontWeight:800,color:t.ink}}>{live[cat]||0}</span>
                    <button onClick={()=>{dispatch({type:"PROMOTORE_TALLY",id:live.id,g:tGender,delta:1,cat});dispatch({type:"TALLY_INC",g:tGender,delta:1});setSelPromo(promo.find(p=>p.id===live.id)||live);}}style={{flex:1,padding:"16px 0",background:"rgba(80,200,120,0.12)",border:"none",cursor:"pointer",fontSize:22,color:t.success,fontWeight:700}}>+</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ):<div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",color:t.inkMuted}}>Seleziona un promotore</div>}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   SOMMELIER — VINI
══════════════════════════════════════════════════════════ */
const TIPI_VINO=["rosso","bianco","rosé","spumante","champagne","liquoroso","altro"];
const TIPI_COLOR={rosso:"#C44B4B",bianco:"#D4A843",rosé:"#E07B9C",spumante:"#8B78D4",champagne:"#D4B84B",liquoroso:"#9E6B38",altro:"#888"};

function SommeliereSection(){
  const{dispatch,t,venue}=useApp();
  const[search,setSearch]=useState("");
  const[filterTipo,setFilterTipo]=useState("tutti");
  const[selected,setSelected]=useState(null);
  const[showNew,setShowNew]=useState(false);
  const[showChart,setShowChart]=useState(false);
  const[showImport,setShowImport]=useState(false);
  const[viewMode,setViewMode]=useState("list");
  const[importMsg,setImportMsg]=useState(null);
  const fileRef=useRef(null);

  const vini=venue.vini||[];
  const filtered=useMemo(()=>{
    let l=vini;
    if(filterTipo!=="tutti")l=l.filter(v=>v.tipo===filterTipo);
    if(search){const q=search.toLowerCase();l=l.filter(v=>
      v.nome.toLowerCase().includes(q)||
      (v.produttore||"").toLowerCase().includes(q)||
      (v.regione||"").toLowerCase().includes(q)
    );}
    return l;
  },[vini,filterTipo,search]);

  const totaleValore=vini.reduce((acc,v)=>acc+(v.quantita*v.pAcquisto),0);
  const totaleVendite=vini.reduce((acc,v)=>acc+(v.vendite||[]).reduce((a,vv)=>a+(vv.qty||0),0),0);
  const ricavoTotale=vini.reduce((acc,v)=>acc+(v.vendite||[]).reduce((a,vv)=>a+(vv.qty||0),0)*v.pVendita,0);
  const inAlert=vini.filter(v=>v.quantita<=v.minStock);

  const parseCSV=(text)=>{
    const lines=text.split("\n").filter(l=>l.trim());
    if(lines.length<2)return[];
    const headers=lines[0].split(",").map(h=>h.trim().toLowerCase());
    return lines.slice(1).map(line=>{
      const vals=line.split(",").map(v=>v.trim().replace(/^"|"$/g,""));
      const obj={};headers.forEach((h,i)=>obj[h]=vals[i]||"");
      return{
        id:genId(),nome:obj.nome||obj.name||"",produttore:obj.produttore||obj.producer||"",
        annata:obj.annata||obj.vintage||"NV",tipo:obj.tipo||obj.type||"rosso",
        regione:obj.regione||obj.region||"",pAcquisto:parseFloat(obj.acquisto||obj.cost||"0"),
        pVendita:parseFloat(obj.vendita||obj.price||"0"),quantita:parseInt(obj.quantita||obj.qty||"0"),
        minStock:parseInt(obj.min||"3"),note:obj.note||"",vendite:[],
      };
    }).filter(v=>v.nome);
  };

  const handleFileImport=(e)=>{
    const file=e.target.files[0];if(!file)return;
    const reader=new FileReader();
    reader.onload=ev=>{
      const viniImportati=parseCSV(ev.target.result);
      if(viniImportati.length>0){
        dispatch({type:"VINI_IMPORT",vini:viniImportati});
        setImportMsg({ok:true,text:`${viniImportati.length} vini importati con successo!`});
        setTimeout(()=>setImportMsg(null),4000);
      } else {
        setImportMsg({ok:false,text:"Nessun vino trovato. Formato: nome,produttore,annata,tipo,regione,acquisto,vendita,quantita,min,note"});
        setTimeout(()=>setImportMsg(null),5000);
      }
    };
    reader.readAsText(file);
    e.target.value="";
  };

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
      {/* Header stats */}
      <div style={{padding:"14px 20px",borderBottom:`1px solid ${t.div}`,background:t.bgAlt}}>
        <div style={{display:"flex",gap:12,marginBottom:12}}>
          <StatCard label="Bottiglie in cantina"value={vini.reduce((a,v)=>a+v.quantita,0)}sub={`${vini.length} etichette`}color={t.accent}t={t}/>
          <StatCard label="Valore magazzino"value={fmtEur(totaleValore)}sub="a prezzo acquisto"color={t.gold}t={t}/>
          <StatCard label="Ricavo vendite"value={fmtEur(ricavoTotale)}sub={`${totaleVendite} bottiglie vendute`}color={t.success}t={t}/>
          {inAlert.length>0&&<StatCard label="⚠ Scorte basse"value={inAlert.length}sub="etichette sotto soglia"color={t.danger}t={t}/>}
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
          <div style={{display:"flex",gap:4}}>
            <Chip label="Tutti"active={filterTipo==="tutti"}onClick={()=>setFilterTipo("tutti")}t={t}/>
            {TIPI_VINO.map(tp=><Chip key={tp}label={tp.charAt(0).toUpperCase()+tp.slice(1)}active={filterTipo===tp}onClick={()=>setFilterTipo(tp)}t={t}/>)}
          </div>
          <div style={{flex:1}}/>
          <div style={{width:220}}><SearchBar value={search}onChange={setSearch}placeholder="Cerca vino…"t={t}/></div>
          <button onClick={()=>setViewMode(m=>m==="list"?"cards":"list")}style={{display:"flex",gap:5,alignItems:"center",padding:"8px 14px",borderRadius:10,border:`1px solid ${viewMode==="cards"?t.accent:t.div}`,background:viewMode==="cards"?t.accentGlow:"none",color:viewMode==="cards"?t.accent:t.inkSoft,fontSize:12,cursor:"pointer"}}>⊞ Schede</button>
          <button onClick={()=>setShowChart(v=>!v)}style={{display:"flex",gap:5,alignItems:"center",padding:"8px 14px",borderRadius:10,border:`1px solid ${showChart?t.accent:t.div}`,background:showChart?t.accentGlow:"none",color:showChart?t.accent:t.inkSoft,fontSize:12,cursor:"pointer"}}><Icon name="chart"size={15}color={showChart?t.accent:t.inkSoft}/>Grafici</button>
          <button onClick={()=>fileRef.current?.click()}style={{display:"flex",gap:5,alignItems:"center",padding:"8px 14px",borderRadius:10,border:`1px solid ${t.div}`,background:"none",color:t.inkSoft,fontSize:12,cursor:"pointer"}}><Icon name="upload"size={15}color={t.inkSoft}/>CSV</button>
          <input ref={fileRef}type="file"accept=".csv,.txt"onChange={handleFileImport}style={{display:"none"}}/>
          <button onClick={()=>setShowNew(true)}style={{display:"flex",gap:5,alignItems:"center",padding:"8px 16px",borderRadius:10,border:"none",background:t.accent,color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer"}}><Icon name="plus"size={15}color="#fff"/>Nuovo</button>
        </div>
      </div>

      {/* Chart panel */}
      {showChart&&<ViniChartPanel vini={vini}t={t}/>}

      {/* Table / Cards */}
      <div style={{flex:1,overflow:"auto"}}>
        {viewMode==="list"?(
          <>
            <div style={{display:"grid",gridTemplateColumns:"2fr 1.2fr 80px 80px 80px 80px 90px 100px",gap:8,padding:"8px 20px",borderBottom:`1px solid ${t.div}`,position:"sticky",top:0,background:t.bgAlt,zIndex:5}}>
              {["Vino","Produttore / Regione","Tipo","Annata","Prezzo","Acquisto","Giacenza","Azioni"].map(h=><span key={h}style={{fontSize:10,fontWeight:600,color:t.inkMuted,letterSpacing:"0.05em",textTransform:"uppercase"}}>{h}</span>)}
            </div>
            {filtered.map(vino=>(
              <VinoRow key={vino.id}vino={vino}t={t}onSelect={()=>setSelected(vino)}dispatch={dispatch}/>
            ))}
          </>
        ):(
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:14,padding:20}}>
            {filtered.map(vino=>{
              const isAlert=vino.quantita<=vino.minStock;
              const margine=vino.pVendita>0?Math.round(((vino.pVendita-vino.pAcquisto)/vino.pVendita)*100):0;
              const col=TIPI_COLOR[vino.tipo]||"#888";
              return <div key={vino.id}onClick={()=>setSelected(vino)}style={{background:t.bgCard,borderRadius:14,border:`1px solid ${isAlert?t.danger+"66":t.div}`,overflow:"hidden",cursor:"pointer",transition:"transform 0.15s, box-shadow 0.15s"}}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=`0 8px 24px ${t.shadow}`;}}
                onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";}}>
                <div style={{height:5,background:col}}/>
                <div style={{padding:"14px 16px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                    <span style={{fontSize:11,padding:"2px 8px",borderRadius:10,fontWeight:700,background:`${col}22`,color:col}}>{vino.tipo}</span>
                    {isAlert&&<span style={{fontSize:10,color:t.danger,fontWeight:700}}>⚠ BASSO</span>}
                  </div>
                  <div style={{fontSize:14,fontWeight:800,color:t.ink,marginBottom:3,lineHeight:1.3}}>{vino.nome}</div>
                  <div style={{fontSize:12,color:t.inkSoft,marginBottom:2}}>{vino.produttore}</div>
                  <div style={{fontSize:11,color:t.inkMuted,marginBottom:12}}>{vino.regione} · {vino.annata}</div>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div>
                      <div style={{fontSize:16,fontWeight:800,color:t.gold}}>{fmtEur(vino.pVendita)}</div>
                      <div style={{fontSize:10,color:margine>=50?t.success:margine>=30?t.warning:t.danger}}>+{margine}% margine</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontSize:22,fontWeight:900,color:isAlert?t.danger:t.ink}}>{vino.quantita}</div>
                      <div style={{fontSize:10,color:t.inkMuted}}>bottiglie</div>
                    </div>
                  </div>
                </div>
                <div style={{borderTop:`1px solid ${t.div}`,display:"flex",justifyContent:"center",gap:8,padding:"10px 14px",background:t.bgCardAlt}}>
                  <button onClick={e=>{e.stopPropagation();dispatch({type:"VINO_ADJUST",id:vino.id,delta:-1});}}style={{flex:1,padding:"6px",borderRadius:7,border:"none",background:"rgba(255,80,80,0.12)",color:t.danger,cursor:"pointer",fontWeight:700}}>−</button>
                  <button onClick={e=>{e.stopPropagation();dispatch({type:"VINO_ADJUST",id:vino.id,delta:1});}}style={{flex:1,padding:"6px",borderRadius:7,border:"none",background:"rgba(80,200,120,0.12)",color:t.success,cursor:"pointer",fontWeight:700}}>+</button>
                </div>
              </div>;
            })}
          </div>
        )}
        {filtered.length===0&&<div style={{padding:"40px",textAlign:"center",color:t.inkMuted}}><div style={{fontSize:40,marginBottom:12}}>🍷</div><div>Nessun vino trovato</div></div>}
      </div>
      {importMsg&&<div style={{padding:"10px 20px",background:importMsg.ok?"#1A3A28":"#3A1A1A",borderTop:`1px solid ${importMsg.ok?"#4EC97A44":"#F05C5C44"}`,fontSize:12,fontWeight:600,color:importMsg.ok?"#4EC97A":"#F05C5C",display:"flex",alignItems:"center",gap:8}}>
        {importMsg.ok?"✓":"✗"} {importMsg.text}
      </div>}
      {/* CSV format hint */}
      <div style={{padding:"8px 20px",background:t.bgAlt,borderTop:`1px solid ${t.div}`,fontSize:11,color:t.inkMuted}}>
        📋 Formato CSV: <code style={{color:t.inkSoft}}>nome, produttore, annata, tipo, regione, acquisto, vendita, quantita, min, note</code>
      </div>

      {selected&&<VinoDetail vino={selected}t={t}dispatch={dispatch}venue={venue}onClose={()=>setSelected(null)}/>}
      {showNew&&<VinoForm onClose={()=>setShowNew(false)}t={t}dispatch={dispatch}/>}
    </div>
  );
}

function ViniChartPanel({vini,t}){
  const topVendite=useMemo(()=>{
    return [...vini].sort((a,b)=>(b.vendite||[]).reduce((s,v)=>s+v.qty,0)-(a.vendite||[]).reduce((s,v)=>s+v.qty,0)).slice(0,8).map(v=>({label:v.nome.split(" ").slice(0,2).join(" "),value:(v.vendite||[]).reduce((s,vv)=>s+vv.qty,0)}));
  },[vini]);
  const topRicavo=useMemo(()=>{
    return [...vini].sort((a,b)=>((b.vendite||[]).reduce((s,v)=>s+v.qty,0)*b.pVendita)-((a.vendite||[]).reduce((s,v)=>s+v.qty,0)*a.pVendita)).slice(0,8).map(v=>({label:v.nome.split(" ").slice(0,2).join(" "),value:(v.vendite||[]).reduce((s,vv)=>s+vv.qty,0)*v.pVendita}));
  },[vini]);
  const perTipo=useMemo(()=>{
    const m={};vini.forEach(v=>{if(!m[v.tipo])m[v.tipo]=0;m[v.tipo]+=v.quantita;});
    return Object.entries(m).map(([k,v])=>({label:k,value:v,color:TIPI_COLOR[k]||"#888"}));
  },[vini]);
  const margine=useMemo(()=>{
    return [...vini].map(v=>({label:v.nome.split(" ").slice(0,2).join(" "),value:Math.round(((v.pVendita-v.pAcquisto)/v.pVendita)*100)})).sort((a,b)=>b.value-a.value).slice(0,8);
  },[vini]);

  return (
    <div style={{padding:"16px 20px",borderBottom:`1px solid ${t.div}`,background:t.bgCard,display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:16}}>
      {[
        {title:"Top vendite (bottiglie)",data:topVendite,color:t.accent},
        {title:"Top ricavo (€)",data:topRicavo,color:t.gold},
        {title:"Giacenza per tipo",data:perTipo,color:t.success},
        {title:"Margine % top 8",data:margine,color:"#E07B9C"},
      ].map(({title,data,color})=>(
        <div key={title}style={{background:t.bgCardAlt,borderRadius:12,padding:"14px 14px 10px",border:`1px solid ${t.div}`}}>
          <div style={{fontSize:11,fontWeight:700,color:t.inkMuted,marginBottom:10,letterSpacing:"0.04em"}}>{title}</div>
          <BarChart data={data}color={color}height={80}t={t}/>
        </div>
      ))}
    </div>
  );
}

function VinoRow({vino,t,onSelect,dispatch}){
  const[hov,setHov]=useState(false);
  const vendTot=(vino.vendite||[]).reduce((a,v)=>a+v.qty,0);
  const isAlert=vino.quantita<=vino.minStock;
  const margine=vino.pVendita>0?Math.round(((vino.pVendita-vino.pAcquisto)/vino.pVendita)*100):0;
  return (
    <div onMouseEnter={()=>setHov(true)}onMouseLeave={()=>setHov(false)}
      style={{display:"grid",gridTemplateColumns:"2fr 1.2fr 80px 80px 80px 80px 90px 100px",gap:8,alignItems:"center",padding:"11px 20px",borderBottom:`1px solid ${t.div}`,background:hov?t.bgCardAlt:"transparent",transition:"background 0.15s"}}>
      <div onClick={onSelect}style={{cursor:"pointer"}}>
        <div style={{fontSize:13,fontWeight:700,color:t.ink}}>{vino.nome}</div>
        {vino.note&&<div style={{fontSize:11,color:t.inkMuted}}>{vino.note}</div>}
      </div>
      <div><div style={{fontSize:12,color:t.inkSoft}}>{vino.produttore||"—"}</div><div style={{fontSize:11,color:t.inkMuted}}>{vino.regione||""}</div></div>
      <div><span style={{padding:"2px 8px",borderRadius:12,fontSize:10,fontWeight:700,background:`${TIPI_COLOR[vino.tipo]||"#888"}22`,color:TIPI_COLOR[vino.tipo]||"#888"}}>{vino.tipo}</span></div>
      <span style={{fontSize:12,color:t.inkSoft,textAlign:"center"}}>{vino.annata}</span>
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:13,fontWeight:700,color:t.ink}}>{fmtEur(vino.pVendita)}</div>
        <div style={{fontSize:10,color:margine>=50?t.success:margine>=30?t.warning:t.danger}}>+{margine}%</div>
      </div>
      <span style={{fontSize:12,color:t.inkSoft,textAlign:"center"}}>{fmtEur(vino.pAcquisto)}</span>
      <div style={{textAlign:"center"}}>
        <span style={{fontSize:14,fontWeight:800,color:isAlert?t.danger:t.ink}}>{vino.quantita}</span>
        <div style={{fontSize:10,color:t.inkMuted}}>min {vino.minStock}</div>
        {isAlert&&<div style={{fontSize:9,color:t.danger,fontWeight:700}}>⚠ BASSO</div>}
      </div>
      <div style={{display:"flex",gap:4,justifyContent:"center"}}>
        <button onClick={()=>dispatch({type:"VINO_ADJUST",id:vino.id,delta:-1})}style={{width:28,height:28,borderRadius:8,border:"none",background:"rgba(255,80,80,0.12)",color:t.danger,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
        <button onClick={()=>dispatch({type:"VINO_ADJUST",id:vino.id,delta:1})}style={{width:28,height:28,borderRadius:8,border:"none",background:"rgba(80,200,120,0.12)",color:t.success,cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
        <button onClick={onSelect}style={{width:28,height:28,borderRadius:8,border:`1px solid ${t.div}`,background:"none",color:t.inkMuted,cursor:"pointer",fontSize:11,display:"flex",alignItems:"center",justifyContent:"center"}}>…</button>
      </div>
    </div>
  );
}

function VinoDetail({vino,t,dispatch,venue,onClose}){
  const[edit,setEdit]=useState(false);
  const[qtyVendita,setQtyVendita]=useState("1");
  const[d,setD]=useState({...vino});
  const set=k=>v=>setD(x=>({...x,[k]:v}));
  const vendTot=(vino.vendite||[]).reduce((a,v)=>a+v.qty,0);
  const ricavo=vendTot*vino.pVendita;
  const margine=vino.pVendita>0?((vino.pVendita-vino.pAcquisto)/vino.pVendita*100).toFixed(1):0;

  const chartData=useMemo(()=>{
    const m={};(vino.vendite||[]).forEach(v=>{const mo=v.data.slice(0,7);if(!m[mo])m[mo]=0;m[mo]+=v.qty;});
    return Object.entries(m).sort(([a],[b])=>a.localeCompare(b)).map(([k,v])=>({label:k.slice(5),value:v}));
  },[vino.vendite]);

  if(edit)return <Modal title="Modifica Vino"onClose={()=>setEdit(false)}t={t}width={520}>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 16px"}}>
      <Input label="Nome"value={d.nome}onChange={set("nome")}t={t}/>
      <Input label="Produttore"value={d.produttore||""}onChange={set("produttore")}t={t}/>
      <Input label="Annata"value={d.annata}onChange={set("annata")}t={t}/>
      <Select label="Tipo"value={d.tipo}onChange={set("tipo")}t={t}options={TIPI_VINO.map(tp=>({value:tp,label:tp}))}/>
      <Input label="Regione"value={d.regione||""}onChange={set("regione")}t={t}/>
      <Input label="Prezzo acquisto (€)"value={d.pAcquisto}onChange={v=>set("pAcquisto")(parseFloat(v)||0)}type="number"t={t}/>
      <Input label="Prezzo vendita (€)"value={d.pVendita}onChange={v=>set("pVendita")(parseFloat(v)||0)}type="number"t={t}/>
      <Input label="Quantità in cantina"value={d.quantita}onChange={v=>set("quantita")(parseInt(v)||0)}type="number"t={t}/>
      <Input label="Soglia minima"value={d.minStock}onChange={v=>set("minStock")(parseInt(v)||0)}type="number"t={t}/>
    </div>
    <Input label="Note"value={d.note||""}onChange={set("note")}t={t}/>
    <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}><Btn variant="ghost"onClick={()=>setEdit(false)}t={t}>Annulla</Btn><Btn onClick={()=>{dispatch({type:"VINO_UPDATE",vino:d});setEdit(false);onClose();}}t={t}>Salva</Btn></div>
  </Modal>;

  return <Modal title={vino.nome}onClose={onClose}t={t}width={560}>
    <div style={{display:"flex",gap:12,marginBottom:16}}>
      <div style={{padding:"6px 14px",borderRadius:20,background:`${TIPI_COLOR[vino.tipo]||"#888"}22`,color:TIPI_COLOR[vino.tipo]||"#888",fontSize:12,fontWeight:700}}>{vino.tipo} · {vino.annata}</div>
      <div style={{fontSize:13,color:t.inkSoft,display:"flex",alignItems:"center",gap:4}}>🏭 {vino.produttore}</div>
      <div style={{fontSize:13,color:t.inkSoft,display:"flex",alignItems:"center",gap:4}}>📍 {vino.regione}</div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:10,marginBottom:16}}>
      {[["Giacenza",`${vino.quantita} bot.`,vino.quantita<=vino.minStock?t.danger:t.ink],["Prezzo vendita",fmtEur(vino.pVendita),t.gold],["Margine",`${margine}%`,margine>=50?t.success:t.warning],["Vendute",`${vendTot} bot.`,t.accent]].map(([l,v,c])=>(
        <div key={l}style={{background:t.bgCardAlt,borderRadius:10,padding:"10px 12px"}}><div style={{fontSize:10,color:t.inkMuted,fontWeight:600,marginBottom:3}}>{l}</div><div style={{fontSize:16,fontWeight:800,color:c}}>{v}</div></div>
      ))}
    </div>
    <div style={{background:t.bgCardAlt,borderRadius:12,padding:"14px",marginBottom:16}}>
      <div style={{fontSize:11,fontWeight:700,color:t.inkMuted,marginBottom:10}}>VENDITE PER MESE</div>
      <BarChart data={chartData}color={TIPI_COLOR[vino.tipo]||t.accent}height={70}t={t}/>
    </div>
    <div style={{background:t.bgCardAlt,borderRadius:12,padding:"14px",marginBottom:16}}>
      <div style={{fontSize:12,fontWeight:700,color:t.ink,marginBottom:10}}>📦 Registra vendita rapida</div>
      <div style={{display:"flex",gap:8,alignItems:"center"}}>
        <input type="number"value={qtyVendita}onChange={e=>setQtyVendita(e.target.value)}min={1}style={{width:80,padding:"8px 10px",background:t.bgInput,border:`1px solid ${t.div}`,borderRadius:8,color:t.ink,fontSize:14,outline:"none",fontFamily:"inherit"}}/>
        <span style={{color:t.inkSoft,fontSize:13}}>bottiglie</span>
        <Btn onClick={()=>{const q=parseInt(qtyVendita)||1;dispatch({type:"VINO_VENDITA",id:vino.id,qty:q});setQtyVendita("1");onClose();}}t={t}style={{marginLeft:"auto"}}>Registra vendita</Btn>
      </div>
    </div>
    {vino.note&&<div style={{background:t.bgCardAlt,borderRadius:10,padding:"10px 14px",marginBottom:14,fontSize:13,color:t.inkSoft}}>📝 {vino.note}</div>}
    <div style={{display:"flex",gap:8,justifyContent:"space-between"}}>
      <Btn variant="danger"small onClick={()=>{dispatch({type:"VINO_DELETE",id:vino.id});onClose();}}t={t}>Elimina</Btn>
      <div style={{display:"flex",gap:8}}><Btn variant="ghost"onClick={onClose}t={t}>Chiudi</Btn><Btn onClick={()=>setEdit(true)}t={t}>Modifica</Btn></div>
    </div>
  </Modal>;
}

function VinoForm({onClose,t,dispatch,vino=null}){
  const[d,setD]=useState(vino||{nome:"",produttore:"",annata:"2022",tipo:"rosso",regione:"",pAcquisto:"",pVendita:"",quantita:"",minStock:"3",note:""});
  const set=k=>v=>setD(x=>({...x,[k]:v}));
  const save=()=>{if(!d.nome.trim())return;const item={...d,id:vino?.id||genId(),pAcquisto:parseFloat(d.pAcquisto)||0,pVendita:parseFloat(d.pVendita)||0,quantita:parseInt(d.quantita)||0,minStock:parseInt(d.minStock)||3,vendite:vino?.vendite||[]};vino?dispatch({type:"VINO_UPDATE",vino:item}):dispatch({type:"VINO_ADD",vino:item});onClose();};
  return <Modal title={vino?"Modifica Vino":"Nuovo Vino"}onClose={onClose}t={t}width={520}>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 16px"}}>
      <Input label="Nome"value={d.nome}onChange={set("nome")}t={t}/>
      <Input label="Produttore"value={d.produttore}onChange={set("produttore")}t={t}/>
      <Input label="Annata"value={d.annata}onChange={set("annata")}t={t}/>
      <Select label="Tipo"value={d.tipo}onChange={set("tipo")}t={t}options={TIPI_VINO.map(tp=>({value:tp,label:tp}))}/>
      <Input label="Regione"value={d.regione}onChange={set("regione")}t={t}/>
      <Input label="Prezzo acquisto (€)"value={d.pAcquisto}onChange={set("pAcquisto")}type="number"t={t}/>
      <Input label="Prezzo vendita (€)"value={d.pVendita}onChange={set("pVendita")}type="number"t={t}/>
      <Input label="Quantità"value={d.quantita}onChange={set("quantita")}type="number"t={t}/>
      <Input label="Soglia minima"value={d.minStock}onChange={set("minStock")}type="number"t={t}/>
    </div>
    <Input label="Note"value={d.note}onChange={set("note")}t={t}/>
    <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}><Btn variant="ghost"onClick={onClose}t={t}>Annulla</Btn><Btn onClick={save}t={t}>Salva</Btn></div>
  </Modal>;
}

/* ══════════════════════════════════════════════════════════
   GIACENZE SALA
══════════════════════════════════════════════════════════ */
const CAT_CONFIG={
  posate:{label:"Posate",icon:"🍴",color:"#B0A0E0"},
  biancheria:{label:"Biancheria",icon:"🪣",color:"#78B4D4"},
  porcellane:{label:"Porcellane & Piatti",icon:"🍽️",color:"#D4A0A0"},
  cristalli:{label:"Cristalli & Bicchieri",icon:"🥂",color:"#A0C8A0"},
};

function GiacenzeSection(){
  const{dispatch,t,venue}=useApp();
  const[activeTab,setActiveTab]=useState("posate");
  const[showNew,setShowNew]=useState(false);
  const[newItem,setNewItem]=useState({tipo:"",quantita:"",min:"0",note:""});
  const giacenze=venue.giacenze||SEED_GIACENZE;
  const items=giacenze[activeTab]||[];
  const catCfg=CAT_CONFIG[activeTab];
  const alertCount=Object.entries(giacenze).reduce((acc,[cat,arr])=>acc+arr.filter(i=>i.quantita<=i.min).length,0);

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
      <div style={{padding:"12px 20px",borderBottom:`1px solid ${t.div}`,display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
        {Object.entries(CAT_CONFIG).map(([cat,cfg])=>{
          const alert=(giacenze[cat]||[]).filter(i=>i.quantita<=i.min).length;
          return <button key={cat}onClick={()=>setActiveTab(cat)}style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",borderRadius:12,border:`2px solid ${activeTab===cat?cfg.color:t.div}`,background:activeTab===cat?`${cfg.color}18`:"transparent",color:activeTab===cat?cfg.color:t.inkSoft,fontSize:13,fontWeight:activeTab===cat?700:400,cursor:"pointer",position:"relative"}}>
            <span>{cfg.icon}</span>{cfg.label}
            {alert>0&&<span style={{position:"absolute",top:-4,right:-4,width:16,height:16,borderRadius:"50%",background:t.danger,color:"#fff",fontSize:9,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>{alert}</span>}
          </button>;
        })}
        <div style={{flex:1}}/>
        <button onClick={()=>setShowNew(true)}style={{display:"flex",alignItems:"center",gap:6,padding:"8px 16px",borderRadius:10,border:"none",background:t.accent,color:"#fff",fontSize:13,fontWeight:700,cursor:"pointer"}}><Icon name="plus"size={15}color="#fff"/>Aggiungi {catCfg.label.split(" ")[0]}</button>
      </div>

      {/* Summary */}
      <div style={{padding:"12px 20px",borderBottom:`1px solid ${t.div}`,background:t.bgAlt,display:"flex",gap:14,flexWrap:"wrap"}}>
        <div style={{fontSize:13,color:t.inkSoft}}><strong style={{color:t.ink}}>{items.length}</strong> tipologie · <strong style={{color:t.ink}}>{items.reduce((a,i)=>a+i.quantita,0)}</strong> pezzi totali</div>
        {items.filter(i=>i.quantita<=i.min).length>0&&<div style={{color:t.danger,fontSize:13,fontWeight:600}}>⚠ {items.filter(i=>i.quantita<=i.min).length} sotto soglia</div>}
      </div>

      <div style={{flex:1,overflow:"auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 100px 80px 80px 120px",gap:8,padding:"8px 20px",borderBottom:`1px solid ${t.div}`,position:"sticky",top:0,background:t.bgAlt,zIndex:5}}>
          {["Tipologia","Quantità","Min","Stato","Azioni"].map(h=><span key={h}style={{fontSize:10,fontWeight:600,color:t.inkMuted,letterSpacing:"0.05em",textTransform:"uppercase"}}>{h}</span>)}
        </div>
        {items.map(item=>{
          const isAlert=item.quantita<=item.min;
          const pct=item.min>0?Math.min(100,(item.quantita/Math.max(item.min*2,1))*100):100;
          return (
            <div key={item.id}style={{display:"grid",gridTemplateColumns:"1fr 100px 80px 80px 120px",gap:8,alignItems:"center",padding:"11px 20px",borderBottom:`1px solid ${t.div}`}}>
              <div>
                <div style={{fontSize:13,fontWeight:600,color:t.ink}}>{item.tipo}</div>
                {item.note&&<div style={{fontSize:11,color:t.inkMuted}}>{item.note}</div>}
                <div style={{marginTop:5,height:3,background:t.div,borderRadius:2,width:"80%"}}>
                  <div style={{height:"100%",borderRadius:2,background:isAlert?t.danger:pct>70?t.success:t.warning,width:`${pct}%`,transition:"width 0.3s"}}/>
                </div>
              </div>
              <span style={{fontSize:18,fontWeight:800,color:isAlert?t.danger:t.ink,textAlign:"center"}}>{item.quantita}</span>
              <span style={{fontSize:12,color:t.inkMuted,textAlign:"center"}}>{item.min}</span>
              <div style={{textAlign:"center"}}><Badge color={isAlert?t.danger:pct>70?t.success:t.warning}bg={isAlert?`${t.danger}22`:pct>70?`${t.success}22`:`${t.warning}22`}>{isAlert?"⚠ Basso":pct>70?"OK":"Medio"}</Badge></div>
              <div style={{display:"flex",gap:4,justifyContent:"center"}}>
                <button onClick={()=>dispatch({type:"GIACENZA_ADJUST",cat:activeTab,id:item.id,delta:-1})}style={{width:28,height:28,borderRadius:6,border:"none",background:"rgba(255,80,80,0.12)",color:t.danger,cursor:"pointer",fontSize:16}}>−</button>
                <button onClick={()=>dispatch({type:"GIACENZA_ADJUST",cat:activeTab,id:item.id,delta:1})}style={{width:28,height:28,borderRadius:6,border:"none",background:"rgba(80,200,120,0.12)",color:t.success,cursor:"pointer",fontSize:16}}>+</button>
                <button onClick={()=>{const n=window.prompt(`Nuovo valore per "${item.tipo}":`,item.quantita);if(n!==null&&!isNaN(parseInt(n)))dispatch({type:"GIACENZA_ADJUST",cat:activeTab,id:item.id,delta:parseInt(n)-item.quantita});}}style={{width:28,height:28,borderRadius:6,border:`1px solid ${t.div}`,background:"none",color:t.inkMuted,cursor:"pointer",fontSize:10}}>✎</button>
                <button onClick={()=>dispatch({type:"GIACENZA_DELETE",cat:activeTab,id:item.id})}style={{width:28,height:28,borderRadius:6,border:"none",background:"none",color:t.danger,cursor:"pointer",fontSize:14}}>×</button>
              </div>
            </div>
          );
        })}
        {items.length===0&&<div style={{padding:"40px",textAlign:"center",color:t.inkMuted}}><div style={{fontSize:36,marginBottom:10}}>{catCfg.icon}</div><div>Nessun elemento in {catCfg.label}</div></div>}
      </div>

      {showNew&&<Modal title={`Aggiungi ${catCfg.label}`}onClose={()=>setShowNew(false)}t={t}width={400}>
        <Input label="Tipologia"value={newItem.tipo}onChange={v=>setNewItem(d=>({...d,tipo:v}))}placeholder={`es. ${activeTab==="posate"?"Forchetta da carne":activeTab==="cristalli"?"Calice Pinot Noir":activeTab==="biancheria"?"Tovagliolo cotone":"Piatto piano 27cm"}`}t={t}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 14px"}}>
          <Input label="Quantità iniziale"value={newItem.quantita}onChange={v=>setNewItem(d=>({...d,quantita:v}))}type="number"t={t}/>
          <Input label="Soglia minima"value={newItem.min}onChange={v=>setNewItem(d=>({...d,min:v}))}type="number"t={t}/>
        </div>
        <Input label="Note"value={newItem.note}onChange={v=>setNewItem(d=>({...d,note:v}))}t={t}/>
        <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}><Btn variant="ghost"onClick={()=>setShowNew(false)}t={t}>Annulla</Btn><Btn onClick={()=>{if(!newItem.tipo.trim())return;dispatch({type:"GIACENZA_ADD",cat:activeTab,item:{id:genId(),tipo:newItem.tipo.trim(),quantita:parseInt(newItem.quantita)||0,min:parseInt(newItem.min)||0,note:newItem.note}});setShowNew(false);setNewItem({tipo:"",quantita:"",min:"0",note:""});}}t={t}>Aggiungi</Btn></div>
      </Modal>}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   SERVIZIO — split multitasking floor + order panel
══════════════════════════════════════════════════════════ */
function ServizioSection() {
  const {dispatch, t, venue, state} = useApp();
  const zone = venue.zone||SEED_ZONE;
  const [activeZona, setActiveZona]     = useState(zone[0]?.nome||"Main Room");
  const [selectedTavolo, setSelectedTavolo] = useState(null);
  const [showAddItem, setShowAddItem]   = useState(false);
  const [showNewOrdine, setShowNewOrdine] = useState(false);
  const [floorExpanded, setFloorExpanded] = useState(false);
  const mapRef = useRef(null);

  const ordini    = venue.servizioOrdini||[];
  const oggi      = state.selectedDate;
  const aperti    = ordini.filter(o=>o.stato==="aperto"&&o.data===oggi);
  const zonaObj   = zone.find(z=>z.nome===activeZona);
  const tavoliZona= venue.tavoli.filter(tv=>tv.zona===activeZona);
  const allTavoliAperti = [...new Set(aperti.map(o=>o.tavolo))];
  const totaleSerata = aperti.reduce((a,o)=>a+(o.totale||0),0);

  const selOrdine = selectedTavolo ? aperti.find(o=>o.tavolo===selectedTavolo) : null;
  const selOrdini = selectedTavolo ? aperti.filter(o=>o.tavolo===selectedTavolo) : [];
  const selTotal  = selOrdini.reduce((a,o)=>a+(o.totale||0),0);
  const selPren   = selectedTavolo ? venue.prenotazioni.find(p=>p.tavolo===selectedTavolo) : null;
  const selTavoloObj = selectedTavolo ? venue.tavoli.find(tv=>tv.num===selectedTavolo) : null;

  const getColor = tv => {
    if(allTavoliAperti.includes(tv.num)) return zonaObj?.colore||t.accent;
    if(tv.stato==="occupied") return `${zonaObj?.colore||t.accent}88`;
    if(tv.stato==="reserved") return t.warning;
    return t.bgCardAlt;
  };
  const getTextColor = tv => allTavoliAperti.includes(tv.num)||tv.stato!=="free" ? "#fff" : t.inkMuted;

  // KitchenPro sync
  const sendToKitchen = (ordineId, items) => {
    try {
      const existing = JSON.parse(localStorage.getItem("kitchen-pro-orders")||"[]");
      const kpOrder = {
        id: ordineId,
        tavolo: selectedTavolo,
        items: items.map(i=>({nome:i.nome,qty:i.qty,note:i.note||"",categoria:i.categoria})),
        timestamp: new Date().toISOString(),
        stato: "pending",
        source: "SalaPro",
      };
      localStorage.setItem("kitchen-pro-orders", JSON.stringify([...existing.filter(o=>o.id!==ordineId), kpOrder]));
      dispatch({type:"ORDINE_ITEMS_STATO",id:ordineId,statoKitchen:"sent"});
    } catch(e) { console.warn("KP sync failed", e); }
  };

  const kpStatus = (() => {
    try {
      const orders = JSON.parse(localStorage.getItem("kitchen-pro-orders")||"[]");
      return orders.filter(o=>o.tavolo===selectedTavolo);
    } catch { return []; }
  })();

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>

      {/* ── Top bar ── */}
      <div style={{padding:"8px 16px",borderBottom:`1px solid ${t.div}`,background:t.bgAlt,display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>

        {/* Zone chips */}
        <div style={{display:"flex",gap:5}}>
          {zone.map(z=>(
            <button key={z.id} onClick={()=>{setActiveZona(z.nome);}}
              style={{display:"flex",alignItems:"center",gap:5,padding:"4px 12px",borderRadius:16,border:"none",cursor:"pointer",
                background:activeZona===z.nome?z.colore:t.bgCardAlt,
                color:activeZona===z.nome?"#fff":t.inkSoft,fontSize:11,fontWeight:activeZona===z.nome?700:400}}>
              <div style={{width:6,height:6,borderRadius:"50%",background:activeZona===z.nome?"rgba(255,255,255,0.6)":z.colore}}/>
              {z.nome}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div style={{display:"flex",gap:10,marginLeft:4}}>
          <div style={{fontSize:12,color:t.inkSoft}}>
            <span style={{fontWeight:700,color:t.accent}}>{allTavoliAperti.length}</span> tavoli · <span style={{fontWeight:700,color:t.gold}}>{fmtEur(totaleSerata)}</span>
          </div>
        </div>

        <div style={{flex:1}}/>

        <button onClick={()=>setFloorExpanded(e=>!e)}
          style={{padding:"5px 12px",borderRadius:8,border:`1px solid ${floorExpanded?t.accent:t.div}`,background:floorExpanded?t.accentGlow:"none",color:floorExpanded?t.accent:t.inkSoft,fontSize:11,cursor:"pointer"}}>
          {floorExpanded?"⊠ Comprimi":"⊞ Espandi mappa"}
        </button>
        <button onClick={()=>setShowNewOrdine(true)}
          style={{display:"flex",alignItems:"center",gap:5,padding:"6px 14px",borderRadius:9,border:"none",background:t.accent,color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer"}}>
          <Icon name="plus" size={13} color="#fff"/>Apri tavolo
        </button>
      </div>

      {/* ── Body: floor map + order panel ── */}
      <div style={{flex:1,display:"flex",overflow:"hidden"}}>

        {/* ══ LEFT: Mini Floor Map ══ */}
        <div style={{
          width: floorExpanded ? "100%" : (selectedTavolo ? "42%" : "100%"),
          borderRight: selectedTavolo&&!floorExpanded ? `1px solid ${t.div}` : "none",
          display:"flex", flexDirection:"column", flexShrink:0,
          transition:"width 0.25s",
        }}>
          <div ref={mapRef}
            style={{flex:1,position:"relative",overflow:"hidden",background:t.bg}}
            onClick={e=>{ if(e.target===mapRef.current) setSelectedTavolo(null); }}>

            {/* Stage */}
            <div style={{position:"absolute",left:"28%",top:"2%",width:"26%",padding:"5px 0",background:t.bgCard,borderRadius:6,border:`1px solid ${t.div}`,textAlign:"center",fontSize:9,fontWeight:700,letterSpacing:"0.12em",color:t.inkMuted,pointerEvents:"none"}}>STAGE</div>

            {tavoliZona.map(tv=>{
              const isOpen = allTavoliAperti.includes(tv.num);
              const isSel  = selectedTavolo===tv.num;
              const pren   = venue.prenotazioni.find(p=>p.tavolo===tv.num);
              const ordine = aperti.find(o=>o.tavolo===tv.num);
              const fillColor = getColor(tv);
              const textColor = getTextColor(tv);
              const fs = getFormaStyle(tv.forma||"round", 0.85);
              const isLong = tv.forma==="banquet"||tv.forma==="rect_lg";
              return (
                <div
                  key={tv.id}
                  onClick={()=>setSelectedTavolo(isSel ? null : tv.num)}
                  style={{
                    position:"absolute", left:`${tv.x}%`, top:`${tv.y}%`,
                    transform:"translate(-50%,-50%)",
                    ...fs,
                    background: fillColor,
                    border: isSel ? `3px solid ${t.gold}` : isOpen ? `2px solid rgba(255,255,255,0.3)` : `2px solid transparent`,
                    display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
                    cursor:"pointer",
                    transition:"all 0.15s",
                    boxShadow: isSel
                      ? `0 0 0 4px ${t.goldDim}, 0 4px 16px rgba(0,0,0,0.5)`
                      : isOpen ? `0 4px 14px rgba(0,0,0,0.4)` : "none",
                    zIndex: isSel ? 10 : 1,
                  }}>
                  <span style={{fontSize:isLong?12:10,fontWeight:800,color:textColor,lineHeight:1}}>{tv.num}</span>
                  {pren&&!isLong&&<span style={{fontSize:6,color:textColor,opacity:0.8,maxWidth:fs.width-6,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",marginTop:1}}>{pren.cognome}</span>}
                  {pren&&isLong&&<span style={{fontSize:8,color:textColor,opacity:0.85,marginTop:1}}>{pren.cognome} · {pren.ospiti}p</span>}
                  {isOpen&&ordine?.creatoAt&&<span style={{fontSize:isLong?7:5,color:textColor,opacity:0.7,marginTop:1}}>⏱{formatDuration(ordine.creatoAt)}</span>}
                  {isOpen&&<div style={{position:"absolute",top:-4,right:-4,width:10,height:10,borderRadius:"50%",background:t.success,boxShadow:`0 0 5px ${t.success}`}}/>}
                </div>
              );
            })}

            {/* Labels */}
            {[["BAR",{right:"2%",top:"38%"}],["WC",{right:"2%",top:"50%"}]].map(([l,pos])=>(
              <div key={l} style={{position:"absolute",...pos,padding:"4px 8px",background:t.bgCard,border:`1px solid ${t.div}`,borderRadius:5,fontSize:9,fontWeight:700,color:t.inkMuted}}>{l}</div>
            ))}
          </div>

          {/* List of all open tables (bottom strip, hidden when expanded) */}
          {!floorExpanded&&!selectedTavolo&&allTavoliAperti.length>0&&(
            <div style={{borderTop:`1px solid ${t.div}`,background:t.bgAlt,padding:"8px 12px",display:"flex",gap:8,flexWrap:"wrap"}}>
              <span style={{fontSize:10,fontWeight:600,color:t.inkMuted,alignSelf:"center",textTransform:"uppercase",letterSpacing:"0.05em"}}>Aperti:</span>
              {allTavoliAperti.map(num=>{
                const ord=aperti.find(o=>o.tavolo===num);
                const tots=aperti.filter(o=>o.tavolo===num).reduce((a,o)=>a+(o.totale||0),0);
                return (
                  <button key={num} onClick={()=>setSelectedTavolo(num)}
                    style={{display:"flex",alignItems:"center",gap:5,padding:"4px 10px",borderRadius:8,border:`1px solid ${t.div}`,background:t.bgCard,cursor:"pointer",fontSize:11,color:t.ink,fontWeight:600}}>
                    <span style={{color:t.accent}}>T{num}</span>
                    <span style={{color:t.gold}}>{fmtEur(tots)}</span>
                    {ord?.creatoAt&&<span style={{color:t.inkMuted,fontSize:9}}>⏱{formatDuration(ord.creatoAt)}</span>}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ══ RIGHT: Order Panel ══ */}
        {selectedTavolo&&!floorExpanded&&(
          <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",minWidth:0}}>

            {/* Panel header */}
            <div style={{padding:"12px 16px",borderBottom:`1px solid ${t.div}`,background:t.bgCard,display:"flex",alignItems:"center",gap:10,flexWrap:"wrap"}}>
              <div style={{...getFormaStyle(selTavoloObj?.forma||"round",0.65),background:zonaObj?.colore||t.accent,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                <span style={{fontSize:12,fontWeight:900,color:"#fff"}}>{selectedTavolo}</span>
              </div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontSize:15,fontWeight:800,color:t.ink}}>Tavolo {selectedTavolo}</div>
                {selPren&&<div style={{fontSize:11,color:t.inkSoft}}>{selPren.nome} {selPren.cognome} · {selPren.ospiti} ospiti · {selPren.ora}</div>}
              </div>
              {selOrdine?.creatoAt&&(
                <span style={{fontSize:11,padding:"3px 9px",borderRadius:16,background:t.bgCardAlt,color:t.inkSoft,fontWeight:600}}>⏱ {formatDuration(selOrdine.creatoAt)}</span>
              )}
              <span style={{fontSize:18,fontWeight:900,color:t.gold}}>{fmtEur(selTotal)}</span>
              <button onClick={()=>{
                const pren=selPren;
                const rows=(selOrdini.flatMap(o=>o.items||[])).map(i=>`<tr><td>${i.nome}</td><td style="text-align:center">${i.qty}</td><td style="text-align:right">€ ${(i.prezzo*i.qty).toFixed(2)}</td></tr>`).join("");
                printContent(`<h1>Conto — Tavolo ${selectedTavolo}</h1>${pren?`<p style="color:#666">${pren.nome} ${pren.cognome} · ${pren.ospiti} ospiti</p>`:""}
                  <table><thead><tr><th>Articolo</th><th>Qt.</th><th>Totale</th></tr></thead><tbody>${rows}</tbody></table>
                  <div class="total">TOTALE: € ${selTotal.toFixed(2)}</div>`,`Conto T${selectedTavolo}`);
              }} style={{padding:"6px 11px",borderRadius:8,border:`1px solid ${t.div}`,background:"none",color:t.inkSoft,fontSize:11,cursor:"pointer"}}>🖨️</button>
              <button onClick={()=>setSelectedTavolo(null)} style={{background:"none",border:"none",cursor:"pointer",color:t.inkMuted,padding:4}}><Icon name="x"size={16}color={t.inkMuted}/></button>
            </div>

            {/* Scrollable body */}
            <div style={{flex:1,overflow:"auto"}}>

              {/* ─ Client recap card ─ */}
              {selPren&&(
                <div style={{margin:"12px 14px 0",background:t.bgCard,borderRadius:12,border:`1px solid ${t.div}`,overflow:"hidden"}}>
                  <div style={{padding:"8px 14px",borderBottom:`1px solid ${t.div}`,display:"flex",alignItems:"center",gap:8,background:t.bgCardAlt}}>
                    <Avatar nome={`${selPren.nome} ${selPren.cognome}`} size={28}/>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13,fontWeight:700,color:t.ink}}>{selPren.nome} {selPren.cognome}</div>
                      <div style={{display:"flex",gap:6,alignItems:"center",marginTop:2}}>
                        <TipoBadge tipo={selPren.tipo} t={t}/>
                        <StatoBadge stato={selPren.stato} t={t}/>
                      </div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontSize:11,color:t.inkMuted}}>Minimo</div>
                      <div style={{fontSize:13,fontWeight:700,color:selPren.minimo==="COMP"?t.gold:t.ink}}>{selPren.minimo||"—"}</div>
                    </div>
                  </div>
                  {/* Allergie */}
                  {selPren.allergie?.length>0&&(
                    <div style={{padding:"7px 14px",borderBottom:`1px solid ${t.div}`,background:`${t.warning}08`}}>
                      <div style={{display:"flex",gap:6,alignItems:"center",flexWrap:"wrap"}}>
                        <span style={{fontSize:10,fontWeight:700,color:t.warning,textTransform:"uppercase",letterSpacing:"0.04em"}}>⚠ Allergie:</span>
                        {selPren.allergie.map(a=><Badge key={a} color={t.warning} bg={`${t.warning}22`}>{a}</Badge>)}
                      </div>
                    </div>
                  )}
                  {/* Note */}
                  {selPren.note&&(
                    <div style={{padding:"7px 14px",fontSize:12,color:t.inkSoft,fontStyle:"italic"}}>📝 {selPren.note}</div>
                  )}
                </div>
              )}

              {/* ─ KitchenPro status ─ */}
              {kpStatus.length>0&&(
                <div style={{margin:"10px 14px 0",background:t.bgCard,borderRadius:12,border:`1px solid ${t.accent}44`,overflow:"hidden"}}>
                  <div style={{padding:"7px 14px",borderBottom:`1px solid ${t.div}`,display:"flex",alignItems:"center",gap:6,background:t.accentGlow}}>
                    <span style={{fontSize:10,fontWeight:700,color:t.accent,textTransform:"uppercase",letterSpacing:"0.05em"}}>👨‍🍳 KitchenPro</span>
                    <span style={{fontSize:10,color:t.inkSoft,marginLeft:"auto"}}>{kpStatus.length} batch inviati</span>
                  </div>
                  {kpStatus.map(kpo=>(
                    <div key={kpo.id} style={{padding:"7px 14px",borderBottom:`1px solid ${t.div}`,display:"flex",alignItems:"center",gap:8}}>
                      <div style={{width:8,height:8,borderRadius:"50%",background:kpo.stato==="ready"?t.success:kpo.stato==="sent"?t.warning:t.inkMuted,flexShrink:0}}/>
                      <div style={{flex:1,fontSize:11,color:t.ink}}>
                        {(kpo.items||[]).map(i=>`${i.nome} ×${i.qty}`).join(", ")}
                      </div>
                      <Badge color={kpo.stato==="ready"?t.success:kpo.stato==="sent"?t.warning:t.inkMuted}
                        bg={kpo.stato==="ready"?`${t.success}22`:kpo.stato==="sent"?`${t.warning}22`:t.div}>
                        {kpo.stato==="ready"?"✓ Pronto":kpo.stato==="sent"?"Inviato":"In attesa"}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}

              {/* ─ Order items ─ */}
              <div style={{margin:"10px 14px 0",background:t.bgCard,borderRadius:12,border:`1px solid ${t.div}`,overflow:"hidden"}}>
                <div style={{padding:"8px 14px",borderBottom:`1px solid ${t.div}`,display:"flex",alignItems:"center",justifyContent:"space-between",background:t.bgCardAlt}}>
                  <span style={{fontSize:11,fontWeight:700,color:t.inkMuted,textTransform:"uppercase",letterSpacing:"0.05em"}}>Ordine</span>
                  {selOrdine&&(
                    <div style={{display:"flex",gap:6}}>
                      <button onClick={()=>sendToKitchen(selOrdine.id, selOrdine.items||[])}
                        style={{padding:"3px 10px",borderRadius:6,border:"none",background:`${t.accent}22`,color:t.accent,fontSize:10,cursor:"pointer",fontWeight:700}}>
                        👨‍🍳 Invia in cucina
                      </button>
                      <button onClick={()=>dispatch({type:"ORDINE_CHIUDI",id:selOrdine.id})}
                        style={{padding:"3px 10px",borderRadius:6,border:`1px solid ${t.div}`,background:"none",color:t.inkSoft,fontSize:10,cursor:"pointer"}}>
                        Chiudi
                      </button>
                    </div>
                  )}
                </div>

                {selOrdini.flatMap(ord=>(ord.items||[]).map((item,i)=>({...item, ordId:ord.id, idx:i}))).map((item,idx)=>(
                  <div key={idx} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 14px",borderBottom:`1px solid ${t.div}`}}>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:12,fontWeight:600,color:t.ink}}>{item.nome}</div>
                      {item.note&&<div style={{fontSize:10,color:t.warning,marginTop:1}}>⚠ {item.note}</div>}
                    </div>
                    <Badge
                      color={item.categoria==="vino"?"#8B78D4":item.categoria==="food"?t.success:t.gold}
                      bg={item.categoria==="vino"?"#8B78D422":item.categoria==="food"?`${t.success}18`:t.goldFaint}>
                      {item.categoria}
                    </Badge>
                    {item.statoKitchen&&(
                      <Badge color={item.statoKitchen==="sent"?t.warning:item.statoKitchen==="ready"?t.success:t.inkMuted}
                        bg={item.statoKitchen==="sent"?`${t.warning}22`:item.statoKitchen==="ready"?`${t.success}22`:t.div}>
                        {item.statoKitchen==="sent"?"🔥":item.statoKitchen==="ready"?"✓":"—"}
                      </Badge>
                    )}
                    <span style={{fontSize:11,color:t.inkMuted,minWidth:24,textAlign:"center"}}>×{item.qty}</span>
                    <span style={{fontSize:12,fontWeight:700,color:t.ink,minWidth:52,textAlign:"right"}}>{fmtEur(item.prezzo*item.qty)}</span>
                    <button onClick={()=>dispatch({type:"ORDINE_REMOVE_ITEM",ordineId:item.ordId,idx:item.idx})}
                      style={{background:"none",border:"none",cursor:"pointer",color:t.danger,fontSize:14,padding:"0 2px",opacity:0.6}}>×</button>
                  </div>
                ))}

                {selOrdini.flatMap(o=>o.items||[]).length===0&&(
                  <div style={{padding:"20px",textAlign:"center",color:t.inkMuted,fontSize:12}}>Nessun articolo — aggiungi un piatto o un vino</div>
                )}

                {/* Totale */}
                <div style={{padding:"10px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",background:t.bgCardAlt}}>
                  <span style={{fontSize:12,color:t.inkMuted,fontWeight:600}}>TOTALE TAVOLO</span>
                  <span style={{fontSize:18,fontWeight:900,color:t.gold}}>{fmtEur(selTotal)}</span>
                </div>
              </div>

              {/* ─ Add items button ─ */}
              <div style={{padding:"12px 14px 20px",display:"flex",gap:8}}>
                <button onClick={()=>{
                  if(!selOrdine) {
                    const newOrd={id:genId(),tavolo:selectedTavolo,stato:"aperto",data:oggi,creatoAt:nowISO(),items:[],totale:0};
                    dispatch({type:"ORDINE_ADD",ordine:newOrd});
                  }
                  setShowAddItem(true);
                }}
                  style={{flex:1,padding:"11px",borderRadius:10,border:`1px dashed ${t.accent}`,background:t.accentGlow,color:t.accent,fontSize:13,cursor:"pointer",fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",gap:6}}>
                  <Icon name="plus" size={15} color={t.accent}/>Aggiungi piatto / vino
                </button>
              </div>
            </div>
          </div>
        )}

        {/* No table selected state */}
        {!selectedTavolo&&!floorExpanded&&(
          <div style={{position:"absolute",bottom:16,left:"50%",transform:"translateX(-50%)",pointerEvents:"none",textAlign:"center"}}>
            <div style={{background:t.bgCard,borderRadius:12,padding:"10px 20px",border:`1px solid ${t.div}`,fontSize:12,color:t.inkSoft,boxShadow:`0 4px 16px ${t.shadow}`}}>
              Clicca un tavolo per aprire l'ordine
            </div>
          </div>
        )}
      </div>

      {showNewOrdine&&<ApreTavoloModal t={t} dispatch={dispatch} venue={venue} state={state}
        onClose={()=>setShowNewOrdine(false)}
        onCreated={num=>{setSelectedTavolo(num);setShowNewOrdine(false);}}/>}

      {showAddItem&&(()=>{
        const ordineId = selOrdine?.id || null;
        return <AddItemOrdineModal
          t={t} dispatch={dispatch} venue={venue}
          ordine={selOrdine||{id:null,tavolo:selectedTavolo}}
          onClose={()=>setShowAddItem(false)}/>;
      })()}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   BRIEFING
══════════════════════════════════════════════════════════ */
function BriefingSection(){
  const{dispatch,t,venue,state}=useApp();
  const oggi=state.selectedDate;
  const existingBriefing=venue.briefings?.[oggi];
  const[bData,setBData]=useState(existingBriefing||{
    note_generali:"",note_cucina:"",eventi_speciali:"",
    vini_highlight:"",piatti_highlight:"",
    sezioni:{reservazioni:true,allergie:true,guestlist:true,giacenze_alert:true,vini_alert:true},
    inviatoCucina:false,
  });
  const set=k=>v=>setBData(d=>({...d,[k]:v}));
  const[saved,setSaved]=useState(false);

  const pren=venue.prenotazioni;
  const vip=pren.filter(p=>p.tipo==="VIP");
  const allergie=pren.filter(p=>p.allergie?.length>0);
  const guestlist=venue.guestlist;
  const viniAlert=(venue.vini||[]).filter(v=>v.quantita<=v.minStock);
  const giacenzeAlert=Object.entries(venue.giacenze||{}).flatMap(([cat,items])=>items.filter(i=>i.quantita<=i.min).map(i=>({...i,cat})));

  const salva=()=>{dispatch({type:"BRIEFING_SAVE",data:oggi,briefing:bData});setSaved(true);setTimeout(()=>setSaved(false),2000);};
  const inviaCucina=()=>{dispatch({type:"BRIEFING_INVIA_CUCINA",data:oggi});setBData(d=>({...d,inviatoCucina:true}));};

  return (
    <div style={{display:"flex",height:"100%"}}>
      {/* Edit panel */}
      <div style={{width:420,borderRight:`1px solid ${t.div}`,display:"flex",flexDirection:"column",overflow:"auto"}}>
        <div style={{padding:"16px 18px",borderBottom:`1px solid ${t.div}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <h2 style={{fontSize:16,fontWeight:800,color:t.ink}}>Briefing</h2>
            <div style={{fontSize:12,color:t.inkMuted}}>{new Date(oggi).toLocaleDateString("it-IT",{weekday:"long",day:"numeric",month:"long"})}</div>
          </div>
          <div style={{display:"flex",gap:8}}>
            {bData.inviatoCucina&&<Badge color={t.success}bg={`${t.success}22`}>✓ Inviato cucina</Badge>}
          </div>
        </div>
        <div style={{flex:1,overflow:"auto",padding:"16px 18px"}}>
          <div style={{marginBottom:14}}>
            <div style={{fontSize:11,fontWeight:600,color:t.inkMuted,marginBottom:5,textTransform:"uppercase"}}>Note generali serata</div>
            <textarea value={bData.note_generali}onChange={e=>set("note_generali")(e.target.value)}rows={4}placeholder="Situazione generale, ospiti speciali, note organizzative…"style={{width:"100%",padding:"10px 12px",background:t.bgInput,border:`1px solid ${t.div}`,borderRadius:10,color:t.ink,fontSize:13,resize:"vertical",fontFamily:"inherit",outline:"none"}}/>
          </div>
          <div style={{marginBottom:14}}>
            <div style={{fontSize:11,fontWeight:600,color:t.inkMuted,marginBottom:5,textTransform:"uppercase"}}>Comunicazioni per cucina</div>
            <textarea value={bData.note_cucina}onChange={e=>set("note_cucina")(e.target.value)}rows={3}placeholder="Piatti da evidenziare, preparazioni speciali, allergie critiche…"style={{width:"100%",padding:"10px 12px",background:t.bgInput,border:`1px solid ${t.div}`,borderRadius:10,color:t.ink,fontSize:13,resize:"vertical",fontFamily:"inherit",outline:"none"}}/>
          </div>
          <div style={{marginBottom:14}}>
            <div style={{fontSize:11,fontWeight:600,color:t.inkMuted,marginBottom:5,textTransform:"uppercase"}}>Vini da evidenziare</div>
            <textarea value={bData.vini_highlight}onChange={e=>set("vini_highlight")(e.target.value)}rows={2}placeholder="Etichette consigliate, proposte abbinamenti…"style={{width:"100%",padding:"10px 12px",background:t.bgInput,border:`1px solid ${t.div}`,borderRadius:10,color:t.ink,fontSize:13,resize:"vertical",fontFamily:"inherit",outline:"none"}}/>
          </div>
          <div style={{marginBottom:14}}>
            <div style={{fontSize:11,fontWeight:600,color:t.inkMuted,marginBottom:5,textTransform:"uppercase"}}>Piatti del giorno</div>
            <textarea value={bData.piatti_highlight}onChange={e=>set("piatti_highlight")(e.target.value)}rows={2}placeholder="Speciali del giorno, fuori menù…"style={{width:"100%",padding:"10px 12px",background:t.bgInput,border:`1px solid ${t.div}`,borderRadius:10,color:t.ink,fontSize:13,resize:"vertical",fontFamily:"inherit",outline:"none"}}/>
          </div>
          <div style={{marginBottom:14}}>
            <div style={{fontSize:11,fontWeight:600,color:t.inkMuted,marginBottom:5,textTransform:"uppercase"}}>Sezioni da includere nel briefing</div>
            {Object.entries({reservazioni:"Prenotazioni & VIP",allergie:"Allergie",guestlist:"Guest List",giacenze_alert:"Avvisi giacenze sala",vini_alert:"Avvisi scorte vini"}).map(([k,label])=>(
              <label key={k}style={{display:"flex",alignItems:"center",gap:10,padding:"6px 0",cursor:"pointer"}}>
                <input type="checkbox"checked={bData.sezioni?.[k]||false}onChange={e=>setBData(d=>({...d,sezioni:{...d.sezioni,[k]:e.target.checked}}))}style={{width:16,height:16,cursor:"pointer"}}/>
                <span style={{fontSize:13,color:t.inkSoft}}>{label}</span>
              </label>
            ))}
          </div>
        </div>
        <div style={{padding:"12px 18px",borderTop:`1px solid ${t.div}`,display:"flex",gap:8}}>
          <Btn variant="ghost"onClick={salva}t={t}style={{flex:1}}>{saved?"✓ Salvato!":"Salva bozza"}</Btn>
          <Btn onClick={inviaCucina}t={t}style={{flex:1,display:"flex",alignItems:"center",gap:6,justifyContent:"center"}} disabled={bData.inviatoCucina}>
            <Icon name="send"size={15}color="#fff"/>{bData.inviatoCucina?"Inviato":"Invia cucina 🔜"}
          </Btn>
          <button onClick={()=>{
            const html=document.getElementById("briefing-preview-content")?.innerHTML||"";
            printContent(`<h1>Briefing — ${new Date(oggi).toLocaleDateString("it-IT",{weekday:"long",day:"numeric",month:"long"})}</h1>${html}`,"Briefing SalaPro");
          }}style={{display:"flex",alignItems:"center",gap:6,padding:"10px 14px",borderRadius:10,border:`1px solid ${t.div}`,background:"none",color:t.inkSoft,fontSize:13,cursor:"pointer"}}>🖨️</button>
        </div>
      </div>

      {/* Preview */}
      <div style={{flex:1,overflow:"auto",padding:"20px 24px"}}>
        <div style={{maxWidth:600}}>
          <div id="briefing-preview-content" style={{background:t.bgCard,borderRadius:16,border:`1px solid ${t.div}`,overflow:"hidden"}}>
            <div style={{padding:"20px 24px",background:t.accent,color:"#fff"}}>
              <div style={{fontSize:11,fontWeight:700,letterSpacing:"0.1em",opacity:0.8,marginBottom:4}}>BRIEFING SERATA</div>
              <div style={{fontSize:20,fontWeight:800}}>{venue.nome}</div>
              <div style={{fontSize:14,opacity:0.8,marginTop:2}}>{new Date(oggi).toLocaleDateString("it-IT",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}</div>
            </div>
            <div style={{padding:"20px 24px"}}>
              {/* Stats */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:20}}>
                {[["Prenotazioni",pren.length],["VIP",vip.length],["Guest List",guestlist.length]].map(([l,v])=>(
                  <div key={l}style={{background:t.bgCardAlt,borderRadius:10,padding:"10px 14px",textAlign:"center"}}><div style={{fontSize:22,fontWeight:800,color:t.accent}}>{v}</div><div style={{fontSize:11,color:t.inkMuted}}>{l}</div></div>
                ))}
              </div>
              {bData.note_generali&&<BriefingBlock title="Note generali"content={bData.note_generali}t={t}/>}
              {bData.sezioni?.reservazioni&&vip.length>0&&(
                <BriefingBlock title={`VIP (${vip.length})`}t={t}>
                  {vip.map(p=><div key={p.id}style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:`1px solid ${t.div}`,fontSize:13}}><span style={{color:t.ink,fontWeight:600}}>{p.nome} {p.cognome}</span><span style={{color:t.inkMuted}}>{p.ospiti} osp · {p.ora} · {p.minimo}</span></div>)}
                </BriefingBlock>
              )}
              {bData.sezioni?.allergie&&allergie.length>0&&(
                <BriefingBlock title={`⚠ Allergie (${allergie.length})`}color={t.warning}t={t}>
                  {allergie.map(p=><div key={p.id}style={{padding:"6px 0",borderBottom:`1px solid ${t.div}`,fontSize:13}}><span style={{color:t.ink,fontWeight:600}}>{p.nome} {p.cognome}</span> — <span style={{color:t.warning}}>{p.allergie.join(", ")}</span>{p.note&&<span style={{color:t.inkMuted,fontSize:11}}> · {p.note}</span>}</div>)}
                </BriefingBlock>
              )}
              {bData.note_cucina&&<BriefingBlock title="📨 Comunicazioni cucina"content={bData.note_cucina}color={t.success}t={t}/>}
              {bData.vini_highlight&&<BriefingBlock title="🍷 Vini in evidenza"content={bData.vini_highlight}t={t}/>}
              {bData.piatti_highlight&&<BriefingBlock title="🍽️ Piatti del giorno"content={bData.piatti_highlight}t={t}/>}
              {bData.sezioni?.vini_alert&&viniAlert.length>0&&(
                <BriefingBlock title={`⚠ Scorte vini (${viniAlert.length} sotto soglia)`}color={t.danger}t={t}>
                  {viniAlert.map(v=><div key={v.id}style={{display:"flex",justifyContent:"space-between",padding:"5px 0",fontSize:13}}><span style={{color:t.ink}}>{v.nome}</span><span style={{color:t.danger,fontWeight:700}}>{v.quantita} bot.</span></div>)}
                </BriefingBlock>
              )}
              {bData.sezioni?.giacenze_alert&&giacenzeAlert.length>0&&(
                <BriefingBlock title={`⚠ Giacenze sala (${giacenzeAlert.length})`}color={t.warning}t={t}>
                  {giacenzeAlert.map(i=><div key={i.id}style={{display:"flex",justifyContent:"space-between",padding:"5px 0",fontSize:13}}><span style={{color:t.ink}}>{i.tipo}</span><span style={{color:t.warning,fontWeight:700}}>{i.quantita} pz</span></div>)}
                </BriefingBlock>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BriefingBlock({title,content,children,color,t}){
  return <div style={{marginBottom:16}}>
    <div style={{fontSize:12,fontWeight:700,color:color||t.accent,marginBottom:8,letterSpacing:"0.04em",textTransform:"uppercase"}}>{title}</div>
    {content&&<div style={{fontSize:13,color:t.inkSoft,lineHeight:1.6,background:t.bgCardAlt,borderRadius:10,padding:"10px 12px"}}>{content}</div>}
    {children&&<div style={{background:t.bgCardAlt,borderRadius:10,padding:"10px 12px"}}>{children}</div>}
  </div>;
}

/* ══════════════════════════════════════════════════════════
   CHECKLIST
══════════════════════════════════════════════════════════ */
function ChecklistSection(){
  const{dispatch,t,venue,state}=useApp();
  const oggi=state.selectedDate;
  const[activeTab,setActiveTab]=useState(SEED_CHECKLIST_TEMPLATES[0].cat);
  const[showAddItem,setShowAddItem]=useState(false);
  const[newItemTxt,setNewItemTxt]=useState("");
  const[showCustomCat,setShowCustomCat]=useState(false);
  const[newCatNome,setNewCatNome]=useState("");

  // Build today's checklist from templates + saved
  const savedItems=venue.checklist?.[oggi]||[];
  const getItems=(cat)=>{
    const tmpl=SEED_CHECKLIST_TEMPLATES.find(t=>t.cat===cat);
    const templateItems=(tmpl?.items||[]).map(txt=>({id:`tmpl-${cat}-${txt}`,testo:txt,done:false,custom:false}));
    const savedForCat=savedItems.filter(i=>i.cat===cat);
    return templateItems.map(ti=>{const saved=savedForCat.find(s=>s.id===ti.id);return saved||{...ti,cat};}).concat(savedForCat.filter(s=>s.custom));
  };

  const allCats=[...SEED_CHECKLIST_TEMPLATES.map(t=>t.cat),...[...new Set(savedItems.filter(i=>i.custom&&i.cat&&!SEED_CHECKLIST_TEMPLATES.find(t=>t.cat===i.cat)).map(i=>i.cat))]];

  const handleToggle=(id,cat)=>{
    const currentItems=getItems(cat);
    const item=currentItems.find(i=>i.id===id);
    if(!item)return;
    const newDone=!item.done;
    const savedCopy=[...savedItems.filter(i=>!(i.id===id&&i.cat===cat)),{...item,id,cat,done:newDone}];
    dispatch({type:"CHECK_SAVE",data:oggi,items:savedCopy});
  };

  const addCustomItem=()=>{
    if(!newItemTxt.trim())return;
    const newItem={id:genId(),testo:newItemTxt.trim(),done:false,custom:true,cat:activeTab};
    dispatch({type:"CHECK_SAVE",data:oggi,items:[...savedItems,newItem]});
    setNewItemTxt("");setShowAddItem(false);
  };

  const deleteCustomItem=(id)=>{
    dispatch({type:"CHECK_SAVE",data:oggi,items:savedItems.filter(i=>i.id!==id)});
  };

  const addCustomCat=()=>{
    if(!newCatNome.trim())return;
    const newItem={id:genId(),testo:"Primo elemento",done:false,custom:true,cat:newCatNome.trim()};
    dispatch({type:"CHECK_SAVE",data:oggi,items:[...savedItems,newItem]});
    setActiveTab(newCatNome.trim());setNewCatNome("");setShowCustomCat(false);
  };

  const resetGiornaliero=()=>{
    if(!window.confirm("Reset tutti i check di oggi?"))return;
    dispatch({type:"CHECK_SAVE",data:oggi,items:savedItems.filter(i=>i.custom)});
  };

  const totali=allCats.reduce((acc,cat)=>{const items=getItems(cat);return{...acc,[cat]:{done:items.filter(i=>i.done).length,tot:items.length}};},{});
  const globalDone=Object.values(totali).reduce((a,v)=>a+v.done,0);
  const globalTot=Object.values(totali).reduce((a,v)=>a+v.tot,0);

  return (
    <div style={{display:"flex",height:"100%"}}>
      {/* Sidebar categorie */}
      <div style={{width:220,borderRight:`1px solid ${t.div}`,display:"flex",flexDirection:"column"}}>
        <div style={{padding:"14px 14px",borderBottom:`1px solid ${t.div}`}}>
          <div style={{fontSize:11,fontWeight:600,color:t.inkMuted,marginBottom:8}}>PROGRESSI SERATA</div>
          {globalDone===globalTot&&globalTot>0?(
            <div style={{textAlign:"center",padding:"8px 0",animation:"pulse 1s ease"}}>
              <div style={{fontSize:28,marginBottom:4}}>🎉</div>
              <div style={{fontSize:13,fontWeight:800,color:t.success}}>Tutto completato!</div>
            </div>
          ):(
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <svg width="52" height="52" viewBox="0 0 52 52">
                <circle cx="26" cy="26" r="22" fill="none" stroke={t.div} strokeWidth="5"/>
                <circle cx="26" cy="26" r="22" fill="none" stroke={globalDone===globalTot?t.success:t.accent} strokeWidth="5"
                  strokeDasharray={`${2*Math.PI*22}`}
                  strokeDashoffset={`${2*Math.PI*22*(1-(globalTot>0?globalDone/globalTot:0))}`}
                  strokeLinecap="round" transform="rotate(-90 26 26)" style={{transition:"stroke-dashoffset 0.5s ease"}}/>
                <text x="26" y="31" textAnchor="middle" fontSize="13" fontWeight="700" fill={t.ink}>{globalTot>0?Math.round(globalDone/globalTot*100):0}%</text>
              </svg>
              <div>
                <div style={{fontSize:22,fontWeight:900,color:t.ink,lineHeight:1}}>{globalDone}<span style={{fontSize:14,color:t.inkMuted}}>/{globalTot}</span></div>
                <div style={{fontSize:11,color:t.inkMuted}}>completati</div>
              </div>
            </div>
          )}
        </div>
        <div style={{flex:1,overflow:"auto"}}>
          {allCats.map(cat=>{
            const {done,tot}=totali[cat]||{done:0,tot:0};
            const isAll=done===tot&&tot>0;
            return <button key={cat}onClick={()=>setActiveTab(cat)}style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 14px",border:"none",borderBottom:`1px solid ${t.div}`,cursor:"pointer",background:activeTab===cat?t.bgCardAlt:"transparent",color:t.inkSoft,textAlign:"left",transition:"background 0.15s"}}>
              <span style={{fontSize:13,fontWeight:activeTab===cat?700:400,color:activeTab===cat?t.ink:t.inkSoft}}>{cat}</span>
              <span style={{fontSize:11,fontWeight:700,color:isAll?t.success:done>0?t.warning:t.inkMuted}}>{done}/{tot}</span>
            </button>;
          })}
        </div>
        <div style={{padding:"10px 14px",borderTop:`1px solid ${t.div}`,display:"flex",gap:6,flexDirection:"column"}}>
          {showCustomCat?<div style={{display:"flex",gap:5}}><input value={newCatNome}onChange={e=>setNewCatNome(e.target.value)}placeholder="Nome categoria"style={{flex:1,padding:"7px 8px",background:t.bgInput,border:`1px solid ${t.div}`,borderRadius:8,color:t.ink,fontSize:12,fontFamily:"inherit",outline:"none"}}/><button onClick={addCustomCat}style={{padding:"7px 10px",borderRadius:8,border:"none",background:t.accent,color:"#fff",cursor:"pointer",fontSize:12}}>+</button></div>
          :<button onClick={()=>setShowCustomCat(true)}style={{padding:"7px",borderRadius:8,border:`1px dashed ${t.div}`,background:"none",color:t.inkMuted,fontSize:11,cursor:"pointer"}}>+ Categoria</button>}
          <button onClick={resetGiornaliero}style={{padding:"7px",borderRadius:8,border:`1px solid ${t.div}`,background:"none",color:t.inkMuted,fontSize:11,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:5}}><Icon name="refresh"size={13}color={t.inkMuted}/>Reset giornaliero</button>
        </div>
      </div>

      {/* Items */}
      <div style={{flex:1,display:"flex",flexDirection:"column"}}>
        <div style={{padding:"14px 20px",borderBottom:`1px solid ${t.div}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <h2 style={{fontSize:16,fontWeight:800,color:t.ink}}>{activeTab}</h2>
          <button onClick={()=>setShowAddItem(true)}style={{display:"flex",gap:5,alignItems:"center",padding:"7px 14px",borderRadius:10,border:"none",background:t.accent,color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer"}}><Icon name="plus"size={14}color="#fff"/>Aggiungi elemento</button>
        </div>
        <div style={{flex:1,overflow:"auto",padding:"8px 20px"}}>
          {getItems(activeTab).map(item=>(
            <div key={item.id}style={{display:"flex",alignItems:"center",gap:14,padding:"14px 16px",borderRadius:12,marginBottom:8,background:item.done?`${t.success}08`:t.bgCard,border:`1px solid ${item.done?`${t.success}30`:t.div}`,transition:"all 0.2s",cursor:"pointer"}}
              onClick={()=>handleToggle(item.id,activeTab)}>
              <div style={{width:24,height:24,borderRadius:8,border:`2px solid ${item.done?t.success:t.div}`,background:item.done?t.success:"transparent",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all 0.2s"}}>
                {item.done&&<Icon name="check"size={14}color="#fff"/>}
              </div>
              <span style={{flex:1,fontSize:14,color:item.done?t.inkMuted:t.ink,textDecoration:item.done?"line-through":"none",transition:"all 0.2s"}}>{item.testo}</span>
              {item.custom&&<button onClick={e=>{e.stopPropagation();deleteCustomItem(item.id);}}style={{background:"none",border:"none",cursor:"pointer",color:t.inkFaint,padding:4,opacity:0.6}}><Icon name="trash"size={14}color={t.inkMuted}/></button>}
            </div>
          ))}
          {getItems(activeTab).length===0&&<div style={{padding:"30px",textAlign:"center",color:t.inkMuted}}>Nessun elemento</div>}
        </div>
        {showAddItem&&(
          <div style={{padding:"14px 20px",borderTop:`1px solid ${t.div}`,background:t.bgCard,display:"flex",gap:8}}>
            <input value={newItemTxt}onChange={e=>setNewItemTxt(e.target.value)}onKeyDown={e=>e.key==="Enter"&&addCustomItem()}placeholder="Nuovo elemento da verificare…"style={{flex:1,padding:"10px 12px",background:t.bgInput,border:`1px solid ${t.div}`,borderRadius:10,color:t.ink,fontSize:13,fontFamily:"inherit",outline:"none"}}autoFocus/>
            <Btn onClick={addCustomItem}t={t}>Aggiungi</Btn>
            <Btn variant="ghost"onClick={()=>{setShowAddItem(false);setNewItemTxt("");}}t={t}>✕</Btn>
          </div>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   KITCHENPRO BRIDGE
══════════════════════════════════════════════════════════ */
function KitchenProSection(){
  const{dispatch,t,venue}=useApp();
  const[kpData,setKpData]=useState(null);
  const[lastSync,setLastSync]=useState(null);
  const[status,setStatus]=useState("idle");

  const tryConnect=()=>{
    setStatus("connecting");
    setTimeout(()=>{
      try{
        const raw=localStorage.getItem("kitchen-pro-v4");
        if(!raw){setStatus("notfound");return;}
        const parsed=JSON.parse(raw);
        setKpData(parsed);setStatus("connected");setLastSync(new Date().toLocaleTimeString("it-IT",{hour:"2-digit",minute:"2-digit"}));
      }catch{setStatus("error");}
    },800);
  };

  const importPiatti=()=>{
    if(!kpData)return;
    const kitchens=kpData.kitchens||[];
    const allRicette=kitchens.flatMap(k=>(k.ricette||[]).map(r=>({nome:r.nome||r.title||"",categoria:mapCat(r.categoria||r.category||""),prezzo:parseFloat(r.prezzo||r.price||"0"),note:(r.allergeni||[]).join(", ")||"",origine:"kitchenpro"})));
    if(allRicette.length===0){return;}
    dispatch({type:"PIATTI_IMPORT_KP",piatti:allRicette});
    /* toast by caller */
  };

  const mapCat=c=>{const m={antipasto:"antipasto",primo:"primo",secondo:"secondo",dessert:"dessert",dolce:"dessert"};return m[c?.toLowerCase()]||"secondo";};

  return (
    <div style={{padding:"24px 24px",maxWidth:700}}>
      <div style={{marginBottom:24,display:"flex",alignItems:"center",gap:14}}>
        <div style={{width:48,height:48,borderRadius:14,background:t.accent,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>👨‍🍳</div>
        <div>
          <h2 style={{fontSize:20,fontWeight:800,color:t.ink,marginBottom:2}}>KitchenPro Bridge</h2>
          <p style={{fontSize:13,color:t.inkSoft}}>Sincronizzazione con l'app KitchenPro</p>
        </div>
      </div>

      {/* Status card */}
      <div style={{background:t.bgCard,borderRadius:14,border:`1px solid ${status==="connected"?t.success:t.div}`,padding:"20px",marginBottom:20}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
          <div style={{width:10,height:10,borderRadius:"50%",background:status==="connected"?t.success:status==="connecting"?t.warning:t.inkMuted,boxShadow:status==="connected"?`0 0 8px ${t.success}`:"none"}}/>
          <span style={{fontSize:14,fontWeight:700,color:t.ink}}>
            {status==="idle"?"Non connesso":status==="connecting"?"Connessione in corso…":status==="connected"?"✓ Connesso a KitchenPro":status==="notfound"?"KitchenPro non trovato nel browser":"Errore di connessione"}
          </span>
          {lastSync&&<span style={{fontSize:11,color:t.inkMuted,marginLeft:"auto"}}>Ultimo sync: {lastSync}</span>}
        </div>
        {status!=="connected"&&(
          <div style={{fontSize:12,color:t.inkMuted,marginBottom:14,lineHeight:1.6}}>
            La connessione funziona automaticamente se <strong style={{color:t.inkSoft}}>KitchenPro</strong> è aperto nello stesso browser. Entrambe le app condividono il localStorage del browser.
          </div>
        )}
        {status==="connected"&&kpData&&(
          <div style={{fontSize:12,color:t.inkSoft,marginBottom:14}}>
            Trovate <strong style={{color:t.ink}}>{kpData.kitchens?.length||0}</strong> cucine · <strong style={{color:t.ink}}>{kpData.kitchens?.flatMap(k=>k.ricette||[]).length||0}</strong> ricette
          </div>
        )}
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          <Btn onClick={tryConnect}t={t}disabled={status==="connecting"}>
            {status==="connecting"?"Connessione…":"Connetti / Aggiorna"}
          </Btn>
          {status==="connected"&&<Btn variant="ghost"onClick={importPiatti}t={t}>Importa piatti in menù SalaPro</Btn>}
        </div>
      </div>

      {/* Menu piatti attivi */}
      <div style={{background:t.bgCard,borderRadius:14,border:`1px solid ${t.div}`,overflow:"hidden",marginBottom:20}}>
        <div style={{padding:"14px 18px",borderBottom:`1px solid ${t.div}`,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <h3 style={{fontSize:14,fontWeight:700,color:t.ink}}>Menù SalaPro ({venue.menuPiatti?.filter(p=>p.attivo).length||0} piatti attivi)</h3>
        </div>
        <div style={{maxHeight:300,overflow:"auto"}}>
          {(venue.menuPiatti||[]).map(p=>(
            <div key={p.id}style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 18px",borderBottom:`1px solid ${t.div}`}}>
              <div>
                <div style={{display:"flex",gap:8,alignItems:"center"}}><span style={{fontSize:13,fontWeight:600,color:t.ink}}>{p.nome}</span><Badge color={t.inkMuted}bg={t.div}>{p.categoria}</Badge>{p.origine==="kitchenpro"&&<Badge color={t.accent}bg={t.accentGlow}>KP</Badge>}</div>
                {p.note&&<div style={{fontSize:11,color:t.warning}}>⚠ {p.note}</div>}
              </div>
              <div style={{display:"flex",gap:8,alignItems:"center"}}>
                <span style={{fontSize:14,fontWeight:700,color:t.gold}}>{fmtEur(p.prezzo)}</span>
                <button onClick={()=>dispatch({type:"PIATTO_UPDATE",p:{...p,attivo:!p.attivo}})}style={{padding:"3px 10px",borderRadius:6,border:`1px solid ${p.attivo?t.success:t.div}`,background:p.attivo?`${t.success}18`:"none",color:p.attivo?t.success:t.inkMuted,fontSize:11,cursor:"pointer"}}>{p.attivo?"Attivo":"Off"}</button>
                <button onClick={()=>dispatch({type:"PIATTO_DELETE",id:p.id})}style={{width:24,height:24,borderRadius:6,border:"none",background:"none",color:t.danger,cursor:"pointer",fontSize:14}}>×</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info */}
      <div style={{background:t.bgCard,borderRadius:14,border:`1px solid ${t.div}`,padding:"16px 18px"}}>
        <h3 style={{fontSize:13,fontWeight:700,color:t.ink,marginBottom:10}}>ℹ️ Come funziona l'integrazione</h3>
        <div style={{fontSize:12,color:t.inkSoft,lineHeight:1.8}}>
          <div>• SalaPro legge i dati di KitchenPro tramite <code style={{color:t.accent}}>localStorage</code> condiviso nel browser</div>
          <div>• I piatti importati diventano disponibili nella sezione <strong style={{color:t.inkSoft}}>Servizio</strong> per gli ordini ai tavoli</div>
          <div>• Le allergie dei piatti sono mostrate nei briefing automaticamente</div>
          <div style={{marginTop:8,padding:"8px 12px",background:t.bgCardAlt,borderRadius:8,color:t.inkMuted}}>🔜 Prossimamente: invio ordini diretti alla cucina, aggiornamento stock ingredienti in tempo reale</div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   SETTINGS
══════════════════════════════════════════════════════════ */
function SettingsSection(){
  const{state,dispatch,t,venue}=useApp();
  return (
    <div style={{padding:"24px",maxWidth:600}}>
      <h2 style={{fontSize:22,fontWeight:800,color:t.ink,marginBottom:24}}>Impostazioni</h2>
      <div style={{background:t.bgCard,borderRadius:14,border:`1px solid ${t.div}`,padding:"20px",marginBottom:20}}>
        <h3 style={{fontSize:14,fontWeight:700,color:t.ink,marginBottom:16}}>Tema</h3>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
          {Object.entries(THEMES).map(([key,th])=>(
            <button key={key}onClick={()=>dispatch({type:"THEME_SET",key})}style={{padding:"14px 16px",borderRadius:12,cursor:"pointer",border:`2px solid ${state.themeKey===key?t.accent:t.div}`,background:th.bgCard,display:"flex",alignItems:"center",gap:10,transition:"all 0.2s"}}>
              <span style={{fontSize:20}}>{th.icon}</span>
              <div style={{textAlign:"left"}}>
                <div style={{fontSize:13,fontWeight:700,color:th.ink}}>{th.name}</div>
                <div style={{display:"flex",gap:4,marginTop:4}}>{[th.accent,th.gold,th.success].map((c,i)=><div key={i}style={{width:12,height:12,borderRadius:3,background:c}}/>)}</div>
              </div>
              {state.themeKey===key&&<div style={{marginLeft:"auto"}}><Icon name="check"size={16}color={t.accent}/></div>}
            </button>
          ))}
        </div>
      </div>
      <div style={{background:t.bgCard,borderRadius:14,border:`1px solid ${t.div}`,padding:"20px",marginBottom:20}}>
        <h3 style={{fontSize:14,fontWeight:700,color:t.ink,marginBottom:12}}>💾 Esporta dati</h3>
        <p style={{fontSize:12,color:t.inkSoft,marginBottom:12}}>Scarica un backup completo di tutti i dati SalaPro in formato JSON.</p>
        <button onClick={()=>{
          const data=JSON.stringify(state,null,2);
          const blob=new Blob([data],{type:"application/json"});
          const url=URL.createObjectURL(blob);
          const a=document.createElement("a");
          a.href=url;a.download=`salapro-backup-${todayDate()}.json`;a.click();
          URL.revokeObjectURL(url);
        }}style={{display:"flex",alignItems:"center",gap:8,padding:"10px 18px",borderRadius:10,border:`1px solid ${t.div}`,background:t.bgCardAlt,color:t.inkSoft,fontSize:13,cursor:"pointer",fontWeight:600}}>⬇️ Scarica backup JSON</button>
      </div>
      <div style={{background:t.bgCard,borderRadius:14,border:`1px solid ${t.div}`,padding:"20px"}}>
        <h3 style={{fontSize:14,fontWeight:700,color:t.ink,marginBottom:12}}>Statistiche</h3>
        <div style={{fontSize:12,color:t.inkSoft,lineHeight:2}}>
          <div>Prenotazioni: <strong style={{color:t.ink}}>{venue.prenotazioni.length}</strong></div>
          <div>Clienti: <strong style={{color:t.ink}}>{venue.clienti.length}</strong></div>
          <div>Vini in catalogo: <strong style={{color:t.ink}}>{(venue.vini||[]).length}</strong></div>
          <div>Piatti nel menù: <strong style={{color:t.ink}}>{(venue.menuPiatti||[]).length}</strong></div>
          <div>Ordini di servizio: <strong style={{color:t.ink}}>{(venue.servizioOrdini||[]).length}</strong></div>
        </div>
        <button onClick={()=>{if(window.confirm("Svuotare tutti i dati e ripristinare demo?"))localStorage.removeItem(STORAGE_KEY)&&window.location.reload();}}style={{marginTop:14,padding:"8px 16px",borderRadius:8,border:`1px solid ${t.danger}`,background:"none",color:t.danger,fontSize:12,cursor:"pointer"}}>Reset dati</button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   NAV CONFIG
══════════════════════════════════════════════════════════ */
const NAV=[
  {key:"dashboard",icon:"dashboard",label:"Dashboard",group:"main"},
  {key:"prenotazioni",icon:"calendar",label:"Prenotazioni",group:"main"},
  {key:"guestlist",icon:"list",label:"Guest List",group:"main"},
  {key:"tavoli",icon:"map",label:"Floorplan",group:"main"},
  {key:"clienti",icon:"person",label:"Clienti",group:"main"},
  {key:"tally",icon:"tally",label:"Tally",group:"main"},
  {key:"servizio",icon:"service",label:"Servizio",group:"ops"},
  {key:"sommeliere",icon:"wine",label:"Sommelière",group:"ops"},
  {key:"giacenze",icon:"box",label:"Giacenze",group:"ops"},
  {key:"briefing",icon:"briefing",label:"Briefing",group:"ops"},
  {key:"checklist",icon:"checklist",label:"Checklist",group:"ops"},
  {key:"kitchenpro",icon:"kitchen",label:"KitchenPro",group:"ops"},
  {key:"settings",icon:"settings",label:"Settings",group:"other"},
];

const SECTION_TITLE={dashboard:"Dashboard",prenotazioni:"Prenotazioni",guestlist:"Guest List",tavoli:"Floorplan",clienti:"Clienti",tally:"Tally",servizio:"Servizio Sala",sommeliere:"Sommelière",giacenze:"Giacenze Sala",briefing:"Briefing",checklist:"Checklist",kitchenpro:"KitchenPro Bridge",settings:"Impostazioni"};

// Wrap heavy sections with React.memo to prevent re-renders on unrelated state changes
const MemoSommelier   = React.memo(SommeliereSection);
const MemoGiacenze    = React.memo(GiacenzeSection);
const MemoChecklist   = React.memo(ChecklistSection);
const MemoKitchenPro  = React.memo(KitchenProSection);
const MemoTavoli      = React.memo(TavoliSection);
const MemoBriefing    = React.memo(BriefingSection);

const SECTION_MAP={
  dashboard:DashboardSection,
  prenotazioni:PrenotazioniSection,
  guestlist:GuestListSection,
  tavoli:MemoTavoli,
  clienti:ClientiSection,
  tally:TallySection,
  servizio:ServizioSection,
  sommeliere:MemoSommelier,
  giacenze:MemoGiacenze,
  briefing:MemoBriefing,
  checklist:MemoChecklist,
  kitchenpro:MemoKitchenPro,
  settings:SettingsSection,
};

/* ══════════════════════════════════════════════════════════
   APP SHELL
══════════════════════════════════════════════════════════ */

function LiveClock({section,state,dispatch,t}){
  const[time,setTime]=useState(()=>new Date().toLocaleTimeString("it-IT",{hour:"2-digit",minute:"2-digit"}));
  useEffect(()=>{
    const id=setInterval(()=>setTime(new Date().toLocaleTimeString("it-IT",{hour:"2-digit",minute:"2-digit"})),10000);
    return()=>clearInterval(id);
  },[]);
  return (
    <header style={{height:50,background:t.bgAlt,borderBottom:`1px solid ${t.div}`,display:"flex",alignItems:"center",paddingInline:16,gap:12,flexShrink:0}}>
      <h1 style={{flex:1,fontSize:15,fontWeight:700,color:t.ink}}>{SECTION_TITLE[section]}</h1>
      <span style={{fontSize:13,fontWeight:700,color:t.inkSoft,fontVariantNumeric:"tabular-nums"}}>{time}</span>
      <input type="date"value={state.selectedDate}onChange={e=>dispatch({type:"DATE_SET",date:e.target.value})}style={{padding:"4px 10px",borderRadius:8,border:`1px solid ${t.div}`,background:t.bgInput,color:t.ink,fontSize:12,fontFamily:"inherit",cursor:"pointer"}}/>
      <div style={{display:"flex",alignItems:"center",gap:5}}>
        <div style={{width:7,height:7,borderRadius:"50%",background:t.success,boxShadow:`0 0 5px ${t.success}`,animation:"pulse 2s ease infinite"}}/>
        <span style={{fontSize:10,color:t.inkSoft,fontWeight:600}}>LIVE</span>
      </div>
    </header>
  );
}

function AppShell(){
  const{state,dispatch,t,venue}=useApp();
  const[section,setSection]=useState(()=>{
    try {
      const params = new URLSearchParams(window.location.search);
      const s = params.get("section");
      if (s && SECTION_MAP[s]) return s;
    } catch {}
    return "dashboard";
  });
  const[sideExpanded,setSideExpanded]=useState(false);
  // Sync section to URL for sharing/PWA shortcuts
  useEffect(()=>{
    const url = new URL(window.location.href);
    if(section==="dashboard") url.searchParams.delete("section");
    else url.searchParams.set("section", section);
    window.history.replaceState(null,"",url.toString());
  },[section]);
  const isMobile=useIsMobile();
  const SectionComp=SECTION_MAP[section];

  useEffect(()=>{
    const id = typeof requestIdleCallback !== 'undefined'
      ? requestIdleCallback(()=>{try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}catch{}},{timeout:2000})
      : setTimeout(()=>{try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}catch{}},100);
    return()=>{ typeof requestIdleCallback!=='undefined' ? cancelIdleCallback(id) : clearTimeout(id); };
  },[state]);

  const alertCount=(venue.vini||[]).filter(v=>v.quantita<=v.minStock).length+Object.values(venue.giacenze||{}).flatMap(a=>a).filter(i=>i.quantita<=i.min).length;

  const mainNav=NAV.filter(n=>n.group==="main");
  const opsNav=NAV.filter(n=>n.group==="ops");
  const otherNav=NAV.filter(n=>n.group==="other");

  return (
    <div style={{display:"flex",height:"100vh",background:t.bg,color:t.ink,fontFamily:"'Inter','Helvetica Neue',sans-serif",overflow:"hidden"}}>
      {/* Sidebar */}
      {!isMobile&&(
        <aside style={{width:sideExpanded?180:64,background:t.bgAlt,borderRight:`1px solid ${t.div}`,display:"flex",flexDirection:"column",alignItems:sideExpanded?"stretch":"center",paddingTop:10,flexShrink:0,zIndex:10,transition:"width 0.25s",overflow:"hidden"}}>
          {/* Logo + expand */}
          <div style={{display:"flex",alignItems:"center",justifyContent:sideExpanded?"space-between":"center",padding:sideExpanded?"8px 12px":"8px 0",borderBottom:`1px solid ${t.div}`,marginBottom:8}}>
            <div style={{width:36,height:36,borderRadius:10,background:`linear-gradient(135deg,${t.accent},${t.accentDeep})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0,boxShadow:`0 2px 8px ${t.accentGlow}`}}>🎵</div>
            {sideExpanded&&<div style={{marginLeft:8,flex:1,minWidth:0}}>
              <div style={{fontSize:13,fontWeight:800,color:t.ink,lineHeight:1.2}}>SalaPro</div>
              <div style={{fontSize:9,color:t.inkMuted,textTransform:"uppercase",letterSpacing:"0.06em"}}>{venue.nome}</div>
            </div>}
            <button onClick={()=>setSideExpanded(e=>!e)}style={{background:"none",border:"none",cursor:"pointer",padding:4,color:t.inkFaint,flexShrink:0,borderRadius:6,transition:"all 0.2s"}}
              onMouseEnter={e=>e.currentTarget.style.background=t.div}
              onMouseLeave={e=>e.currentTarget.style.background="none"}>
              <Icon name={sideExpanded?"x":"chevron-right"}size={16}color={t.inkMuted}/>
            </button>
          </div>
          {/* Date */}
          <div style={{display:"flex",justifyContent:"center",marginBottom:10}}>
            <div style={{background:t.accent,borderRadius:8,padding:"4px 8px",textAlign:"center"}}>
              <div style={{fontSize:16,fontWeight:900,color:"#fff",lineHeight:1}}>{new Date(state.selectedDate).getDate()}</div>
              <div style={{fontSize:9,fontWeight:700,color:"rgba(255,255,255,0.8)",textTransform:"uppercase"}}>{new Date(state.selectedDate).toLocaleDateString("it-IT",{weekday:"short"})}</div>
            </div>
          </div>
          {/* Nav groups */}
          <div style={{flex:1,overflow:"auto"}}>
            <NavGroup items={mainNav}section={section}setSection={setSection}t={t}expanded={sideExpanded}label="Sala"/>
            <NavGroup items={opsNav}section={section}setSection={setSection}t={t}expanded={sideExpanded}label="Operazioni" alertCount={alertCount}/>
            <NavGroup items={otherNav}section={section}setSection={setSection}t={t}expanded={sideExpanded}label=""/>
          </div>
        </aside>
      )}

      {/* Main */}
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",minWidth:0}}>
        <LiveClock section={section} state={state} dispatch={dispatch} t={t}/>
        <main style={{flex:1,overflow:"auto",display:"flex",flexDirection:"column"}} key={section}>
          <div className="section-enter" style={{flex:1,display:"flex",flexDirection:"column",height:"100%"}}>
            <SectionComp/>
          </div>
        </main>
        {isMobile&&(
          <nav style={{background:t.bgAlt,borderTop:`1px solid ${t.div}`,display:"flex",flexShrink:0,overflowX:"auto",WebkitOverflowScrolling:"touch",scrollbarWidth:"none"}}>
            <style>{"::-webkit-scrollbar{display:none}"}</style>
            {[...mainNav,...opsNav,...otherNav].map(n=>(
              <button key={n.key}onClick={()=>setSection(n.key)}style={{flex:"0 0 auto",minWidth:56,padding:"8px 4px 6px",border:"none",background:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:3,color:section===n.key?t.accent:t.inkFaint,position:"relative"}}>
                <div style={{width:32,height:32,borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",background:section===n.key?t.accentGlow:"transparent"}}>
                  <Icon name={n.icon}size={18}color={section===n.key?t.accent:t.inkFaint}/>
                </div>
                <span style={{fontSize:8,fontWeight:section===n.key?700:400,whiteSpace:"nowrap"}}>{n.label.slice(0,7)}</span>
                {section===n.key&&<div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:24,height:2,borderRadius:2,background:t.accent}}/>}
              </button>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
}

function NavGroup({items,section,setSection,t,expanded,label,alertCount=0}){
  return (
    <div style={{marginBottom:8}}>
      {expanded&&label&&<div style={{fontSize:9,fontWeight:700,color:t.inkFaint,letterSpacing:"0.1em",textTransform:"uppercase",padding:"8px 14px 4px"}}>{label}</div>}
      {items.map(n=>(
        <button key={n.key}onClick={()=>setSection(n.key)}title={n.label}style={{width:"100%",padding:expanded?"9px 12px":"9px 0",border:"none",cursor:"pointer",background:"none",display:"flex",alignItems:"center",gap:expanded?10:0,justifyContent:expanded?"flex-start":"center",color:section===n.key?t.accent:t.inkFaint,transition:"color 0.2s",position:"relative"}}>
          {section===n.key&&<div style={{position:"absolute",left:0,top:"50%",transform:"translateY(-50%)",width:3,height:22,background:t.accent,borderRadius:"0 3px 3px 0"}}/>}
          <div style={{width:36,height:36,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",background:section===n.key?t.accentGlow:"transparent",flexShrink:0,position:"relative"}}>
            <Icon name={n.icon}size={18}color={section===n.key?t.accent:t.inkFaint}/>
            {n.key==="giacenze"&&alertCount>0&&<span style={{position:"absolute",top:-2,right:-2,width:14,height:14,borderRadius:"50%",background:t.danger,color:"#fff",fontSize:8,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700}}>{alertCount>9?"9+":alertCount}</span>}
          </div>
          {expanded&&<span style={{fontSize:13,fontWeight:section===n.key?700:400}}>{n.label}</span>}
        </button>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════════════
   ERROR BOUNDARY
══════════════════════════════════════════════════════════ */
class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, info) { console.error("SalaPro error:", error, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"#0E1118",color:"#E8E2D6",fontFamily:"sans-serif",padding:32,gap:16}}>
          <div style={{fontSize:48}}>⚠️</div>
          <h2 style={{fontSize:20,fontWeight:800,color:"#F05C5C"}}>Qualcosa è andato storto</h2>
          <p style={{color:"#6A6560",fontSize:14,textAlign:"center",maxWidth:360}}>
            {this.state.error?.message || "Errore sconosciuto"}
          </p>
          <button onClick={()=>window.location.reload()}
            style={{padding:"12px 24px",background:"#7C6EF5",border:"none",borderRadius:10,color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer"}}>
            🔄 Ricarica app
          </button>
          <button onClick={()=>{localStorage.removeItem("sala-pro-v2");window.location.reload();}}
            style={{padding:"8px 18px",background:"transparent",border:"1px solid #3E3C38",borderRadius:10,color:"#6A6560",fontSize:12,cursor:"pointer"}}>
            Reset dati (ultima risorsa)
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function SalaProApp(){
  const[state,dispatch]=useReducer(reducer,initialState);
  const t=THEMES[state.themeKey]||THEMES.notte;
  const venue=ensureVenue(state.venues.find(v=>v.id===state.selectedVenueId)||state.venues[0]);
  return (
    <ErrorBoundary><ToastProvider>
      <Ctx.Provider value={{state,dispatch,t,venue}}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
          *{margin:0;padding:0;box-sizing:border-box;}
          body,html{overflow:hidden;height:100%;}
          input,select,textarea,button{font-family:inherit;}
          ::-webkit-scrollbar{width:4px;height:4px;}
          ::-webkit-scrollbar-track{background:transparent;}
          ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.10);border-radius:2px;}
          button:focus-visible{outline:2px solid #7C6EF5;outline-offset:2px;}
          input[type=date]::-webkit-calendar-picker-indicator{filter:invert(0.7);}
          *{-webkit-overflow-scrolling:touch;}
          button,input,select,a{-webkit-tap-highlight-color:transparent;touch-action:manipulation;}
          @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
          @keyframes slideInRight{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
          @keyframes slideUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
          @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.6}}
          @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
          @keyframes confetti{0%{transform:translateY(0) rotate(0deg);opacity:1}100%{transform:translateY(60px) rotate(720deg);opacity:0}}
          .section-enter{animation:fadeIn 0.22s ease}
          select option{background:#1E2738;color:#E8E2D6;}
        `}</style>
        <AppShell/>
      </Ctx.Provider>
    </ToastProvider></ErrorBoundary>
  );
}
