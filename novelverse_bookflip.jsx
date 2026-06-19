import { useState, useEffect, useRef } from "react";

// ── Palette (formal light) ───────────────────────────────────────────────
const C = {
  bg:        "#F5F6F8",
  surface:   "#FFFFFF",
  border:    "#E2E5EC",
  borderMid: "#C8CDD8",
  text:      "#1A1D26",
  textSub:   "#4A5068",
  muted:     "#8A90A8",
  accent:    "#1E40AF",   // deep royal blue
  accentLt:  "#EEF2FF",
  accentMid: "#BFCBF7",
  gold:      "#B45309",
  goldLt:    "#FEF3C7",
  green:     "#065F46",
  greenLt:   "#D1FAE5",
  page:      "#FEFDF9",   // book page — warm white
  pageEdge:  "#EDE9DC",
  pageSpine: "#D6CEB8",
  shadow:    "rgba(30,40,80,0.12)",
};

// ── Data ─────────────────────────────────────────────────────────────────
const NOVELS = [
  { id:1, title:"Bayangan Abadi", author:"Rina Kusuma", genre:"Fantasi", rating:4.9, readers:"2.3jt", chapters:142, status:"Ongoing", cover:"https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=300&q=80", synopsis:"Di dunia di mana bayangan memiliki jiwa sendiri, seorang gadis muda menemukan bahwa bayangannya menyembunyikan kekuatan yang mampu menghancurkan kerajaan..." },
  { id:2, title:"Cinta di Ujung Waktu", author:"Dian Pratiwi", genre:"Romance", rating:4.8, readers:"1.9jt", chapters:89, status:"Tamat", cover:"https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=300&q=80", synopsis:"Dua jiwa yang terpisah oleh waktu menemukan satu sama lain dalam mimpi. Tapi mampukah cinta menembus batas dimensi?" },
  { id:3, title:"Pendekar Naga Hitam", author:"Budi Santoso", genre:"Action", rating:4.7, readers:"1.5jt", chapters:210, status:"Ongoing", cover:"https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&q=80", synopsis:"Seorang pendekar terbuang mewarisi kekuatan naga kuno. Perjalanannya membalaskan dendam menjadi takdir yang lebih besar dari yang ia bayangkan." },
  { id:4, title:"Rumah di Tepi Jurang", author:"Sarah Amelia", genre:"Horor", rating:4.6, readers:"987rb", chapters:56, status:"Tamat", cover:"https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=300&q=80", synopsis:"Keluarga Wibowo pindah ke rumah warisan di pegunungan. Tapi malam pertama mengungkap rahasia gelap yang telah tersimpan selama tiga generasi." },
  { id:5, title:"Galaksi Terakhir", author:"Arif Rahman", genre:"Sci-Fi", rating:4.8, readers:"1.1jt", chapters:178, status:"Ongoing", cover:"https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=300&q=80", synopsis:"Tahun 2387. Ketika matahari mulai sekarat, satu kapal perang menjadi harapan terakhir umat manusia untuk menemukan galaksi baru." },
  { id:6, title:"Misteri Kota Tua", author:"Lestari Dewi", genre:"Misteri", rating:4.5, readers:"743rb", chapters:94, status:"Tamat", cover:"https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=300&q=80", synopsis:"Detektif muda Nadia dipanggil ke kota tua yang diselimuti kabut. Di sana, setiap bangunan menyimpan teka-teki yang saling terhubung." },
];

const CATEGORIES = [
  { name:"Fantasi", icon:"🧙", color:"#7C3AED" },
  { name:"Romance", icon:"💝", color:"#DB2777" },
  { name:"Action",  icon:"⚔️", color:"#DC2626" },
  { name:"Horor",   icon:"👻", color:"#4B5563" },
  { name:"Misteri", icon:"🔍", color:"#0369A1" },
  { name:"Sci-Fi",  icon:"🚀", color:"#0891B2" },
  { name:"Petualangan", icon:"🗺️", color:"#16A34A" },
  { name:"Komedi",  icon:"😄", color:"#D97706" },
];

const SAMPLE_CHAPTER = `Fajar belum sepenuhnya menyingsing ketika Aira membuka matanya.

Kamarnya—jika bisa disebut kamar—hanyalah sebuah ruang sempit di loteng gedung tua yang sudah lama ditinggalkan. Atapnya bocor di tiga tempat, dan angin malam selalu berhasil menyelip masuk melalui celah-celah di dinding kayu yang mulai lapuk.

Tapi Aira tidak peduli.

Yang ia pedulikan adalah bayangan di sudut ruangan itu—bayangan yang tidak seharusnya ada, karena tidak ada sumber cahaya yang bisa menciptakannya.

"Kau kembali lagi," bisiknya.

Bayangan itu bergerak. Bukan seperti bayangan biasa yang mengikuti arah cahaya, melainkan dengan gerakan cair yang tampak hidup—terlalu hidup untuk sekadar permainan optik.

*Tentu saja aku kembali,* suara itu terdengar bukan di telinganya, melainkan langsung di dalam kepalanya, seperti gema yang mengalun dari dalam diri sendiri. *Ke mana lagi aku harus pergi? Kau adalah satu-satunya yang bisa melihatku.*

Aira duduk tegak, memeluk lututnya sendiri. Sudah tiga minggu sejak bayangan itu pertama kali muncul—malam yang sama ketika ia menemukan medali kuno itu di reruntuhan Kuil Selatan.

"Siapa kau sebenarnya?"

Bayangan itu tampak bergoyang, seolah tertawa. *Pertanyaan yang lebih tepat adalah: siapa kau sebenarnya, Aira Malaika? Karena aku hanyalah separuh dari jawaban itu.*

Di luar, lonceng kota berdentang enam kali.

Hari baru telah dimulai. Dan Aira tahu, hari ini tidak akan sama dengan hari-hari sebelumnya.

Ia berdiri, meraih mantel lusuhnya dari balik pintu, dan melangkah keluar—menuju kota yang masih tidur, menuju misteri yang sudah lama menunggunya.`;

// ── Minimal SVG Icons ─────────────────────────────────────────────────────
const Ic = ({ d, size=20, fill="none", sw=2 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {Array.isArray(d) ? d.map((p,i)=><path key={i} d={p}/>) : <path d={d}/>}
  </svg>
);
const Icons = {
  home:      () => <Ic d={["m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z","M9 22V12h6v10"]} />,
  search:    () => <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  library:   () => <Ic d={["M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z","M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"]} />,
  user:      () => <Ic d={["M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2","M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"]} />,
  back:      () => <Ic d="M19 12H5M12 19l-7-7 7-7" />,
  settings:  () => <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  bookmark:  () => <Ic d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />,
  share:     () => <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
  ear:       () => <Ic d={["M3 18v-6a9 9 0 0 1 18 0v6","M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"]} />,
  chevR:     () => <Ic d="M9 18l6-6-6-6" />,
  arrowL:    () => <Ic d="M19 12H5M12 19l-7-7 7-7" />,
  arrowR:    () => <Ic d="M5 12h14M12 5l7 7-7 7" />,
};

// ── Paginate ─────────────────────────────────────────────────────────────
function paginate(paras, cpl = 620) {
  const pages = []; let cur = [], len = 0;
  for (const p of paras) {
    if (len + p.length > cpl && cur.length) { pages.push(cur); cur = []; len = 0; }
    cur.push(p); len += p.length;
  }
  if (cur.length) pages.push(cur);
  return pages;
}
const BOOK_PAGES = paginate(SAMPLE_CHAPTER.split("\n\n"));
const FONT_SIZES = { S:"13px", M:"15px", L:"17px", XL:"20px" };

// ── Book Reader ───────────────────────────────────────────────────────────
function BookReader({ novel, onBack }) {
  const [pg, setPg]           = useState(0);
  const [phase, setPhase]     = useState("idle"); // "idle"|"fold"|"land"
  const [flipDir, setFlipDir] = useState("next");
  const [nextPg, setNextPg]   = useState(null);
  const [uiOn, setUiOn]       = useState(true);
  const [showCfg, setShowCfg] = useState(false);
  const [theme, setTheme]     = useState("cream");
  const [fsz, setFsz]         = useState("M");
  const [isTTS, setIsTTS]     = useState(false);
  const [drag, setDrag]       = useState(null);
  const uiTimer = useRef(null);
  const total = BOOK_PAGES.length;

  const THEMES = {
    cream: { bg:"#EDE7DA", page:"#FEFCF5", edge:"#E4DCC8", spine:"#C4B898", text:"#2A2010", sub:"#6A5C40", border:"#DDD5C0", accent:"#1E40AF" },
    white: { bg:"#DDE2EC", page:"#FFFFFF", edge:"#ECF0F5", spine:"#C8CEDC", text:"#1A1D26", sub:"#5A6080", border:"#E2E5EC", accent:"#1E40AF" },
    sepia: { bg:"#B89650", page:"#F5EDD4", edge:"#DECA98", spine:"#B08858", text:"#3A2810", sub:"#7A5C30", border:"#D8C898", accent:"#92400E" },
    stone: { bg:"#C8CCD8", page:"#F8F9FA", edge:"#E0E3EC", spine:"#B4B8C8", text:"#1E2030", sub:"#606880", border:"#DDE0E8", accent:"#1E40AF" },
  };
  const T = THEMES[theme];

  const showUI = () => {
    setUiOn(true);
    clearTimeout(uiTimer.current);
    uiTimer.current = setTimeout(() => setUiOn(false), 4200);
  };
  useEffect(() => { showUI(); return () => clearTimeout(uiTimer.current); }, []);

  // Two-phase flip: fold (leaf sweeps), then land (new content appears)
  const FOLD_MS = 380;
  const LAND_MS = 120;

  const go = (dir) => {
    if (phase !== "idle") return;
    const target = dir === "next" ? pg + 1 : pg - 1;
    if (target < 0 || target >= total) return;
    setFlipDir(dir);
    setNextPg(target);
    setPhase("fold");
    setTimeout(() => {
      setPg(target);
      setPhase("land");
      setTimeout(() => setPhase("idle"), LAND_MS);
    }, FOLD_MS);
    showUI();
  };

  const onTS = (e) => setDrag(e.touches[0].clientX);
  const onTE = (e) => {
    if (drag === null) return;
    const dx = e.changedTouches[0].clientX - drag;
    if (Math.abs(dx) > 44) go(dx < 0 ? "next" : "prev");
    setDrag(null); showUI();
  };

  const progress = Math.round(((pg + 1) / total) * 100);
  const leftParas  = BOOK_PAGES[pg]     || [];
  const rightParas = BOOK_PAGES[pg + 1] || null;
  // For the flipping leaf, show the outgoing page content
  const leafParas  = flipDir === "next"
    ? (BOOK_PAGES[pg + 1] || BOOK_PAGES[pg])   // right page sweeps to left
    : (BOOK_PAGES[pg - 1] || BOOK_PAGES[pg]);   // left page sweeps to right

  const renderPageContent = (paras, num, side) => (
    <>
      {/* Spine shadow */}
      <div style={{
        position:"absolute", top:0, bottom:0,
        [side === "left" ? "right" : "left"]: 0,
        width:20, pointerEvents:"none", zIndex:2,
        background: side === "left"
          ? "linear-gradient(to left, rgba(0,0,0,0.06), transparent)"
          : "linear-gradient(to right, rgba(0,0,0,0.06), transparent)",
      }}/>
      <div style={{ flex:1, display:"flex", flexDirection:"column", padding:"22px 20px 14px", position:"relative", zIndex:1 }}>
        {/* Running head */}
        <div style={{ display:"flex", justifyContent:"space-between", paddingBottom:9, borderBottom:`1px solid ${T.border}`, marginBottom:14 }}>
          <span style={{ fontSize:8.5, color:T.sub, letterSpacing:"0.5px", fontStyle:"italic" }}>
            {side === "left" ? (novel?.title || "NovelVerse") : "Bab Satu"}
          </span>
        </div>
        {/* Chapter title — first page */}
        {num === 1 && (
          <div style={{ textAlign:"center", marginBottom:18 }}>
            <div style={{ fontSize:8, color:T.sub, letterSpacing:"3px", textTransform:"uppercase", marginBottom:5 }}>— Bab Satu —</div>
            <div style={{ fontFamily:"Georgia,serif", fontSize:15, fontWeight:700, color:T.text, lineHeight:1.25 }}>Bayangan yang Berbicara</div>
            <div style={{ width:28, height:1, background:T.sub, margin:"9px auto 0", opacity:0.35 }}/>
          </div>
        )}
        {/* Body */}
        <div style={{ flex:1, fontFamily:"Georgia,'Times New Roman',serif", fontSize:FONT_SIZES[fsz], lineHeight:"1.92", color:T.text }}>
          {paras.map((p, i) => {
            const italic = p.startsWith("*");
            const txt = p.replace(/\*/g, "");
            if (num === 1 && i === 0 && !italic) {
              return (
                <p key={i} style={{ margin:"0 0 0.8em", textAlign:"justify" }}>
                  <span style={{ float:"left", fontFamily:"Georgia,serif", fontSize:`${parseFloat(FONT_SIZES[fsz]) * 3.2}px`, lineHeight:"0.78", marginRight:5, marginTop:5, color:T.accent, fontWeight:700 }}>{txt[0]}</span>
                  {txt.slice(1)}
                </p>
              );
            }
            return (
              <p key={i} style={{ margin:"0 0 0.8em", textIndent: italic ? 0 : "1.4em", fontStyle: italic ? "italic" : "normal", color: italic ? T.sub : T.text, textAlign:"justify" }}>
                {txt}
              </p>
            );
          })}
        </div>
        {/* Footer page number */}
        <div style={{ textAlign:"center", paddingTop:9, borderTop:`1px solid ${T.border}` }}>
          <span style={{ fontSize:8.5, color:T.sub }}>{num}</span>
        </div>
      </div>
    </>
  );

  // The turning leaf — a half-page-width div that rotates around the spine
  // For "next": starts on right side, rotates leftward (rotateY 0→-180)
  // For "prev": starts on left side, rotates rightward (rotateY 0→180)
  const leafStyle = () => {
    const isNext = flipDir === "next";
    // fold phase: rotate from 0 to ±90 (leaf is mid-air)
    // land phase: snap to ±91 (instantly hidden behind)
    const angle = phase === "fold" ? (isNext ? -15 : 15) : (isNext ? -16 : 16);
    const origin = isNext ? "left center" : "right center";
    return {
      position:"absolute",
      top:0, bottom:0,
      [isNext ? "right" : "left"]: 0,
      width:"50%",
      transformOrigin: origin,
      transform:`perspective(1800px) rotateY(${phase === "idle" ? 0 : angle}deg)`,
      transition: phase === "fold" ? `transform ${FOLD_MS}ms cubic-bezier(0.4,0,0.2,1)` : "none",
      zIndex:30,
      overflow:"hidden",
      background: T.page,
      backgroundImage: isNext
        ? `linear-gradient(to left, ${T.edge} 0%, ${T.page} 10%)`
        : `linear-gradient(to right, ${T.edge} 0%, ${T.page} 10%)`,
      display: phase === "idle" ? "none" : "flex",
      flexDirection:"column",
    };
  };

  // Moving shadow that sweeps across the static pages during flip
  const sweepShadow = () => {
    if (phase === "idle") return null;
    const isNext = flipDir === "next";
    return (
      <div style={{
        position:"absolute", top:0, bottom:0,
        [isNext ? "right" : "left"]: 0,
        width:"50%",
        zIndex:25, pointerEvents:"none",
        background: isNext
          ? `linear-gradient(to left, rgba(0,0,0,0.13) 0%, transparent 100%)`
          : `linear-gradient(to right, rgba(0,0,0,0.13) 0%, transparent 100%)`,
        opacity: phase === "fold" ? 1 : 0,
        transition: phase === "fold" ? `opacity ${FOLD_MS}ms ease` : "none",
      }}/>
    );
  };

  return (
    <div
      onClick={showUI}
      onTouchStart={onTS}
      onTouchEnd={onTE}
      style={{ background:T.bg, minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"16px 0 12px", position:"relative", userSelect:"none", transition:"background 0.4s" }}
    >
      <style>{`
        @keyframes fadeBar { from{opacity:0;transform:translateY(-5px)} to{opacity:1;transform:translateY(0)} }
        @keyframes landIn  { from{opacity:0.6} to{opacity:1} }
      `}</style>

      {/* ── Top toolbar ── */}
      {uiOn && (
        <div style={{ position:"fixed", top:0, left:0, right:0, zIndex:200, animation:"fadeBar 0.2s ease", background:"rgba(255,255,255,0.94)", backdropFilter:"blur(12px)", borderBottom:`1px solid ${C.border}`, padding:"10px 16px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <button onClick={onBack} style={{ background:"none", border:`1px solid ${C.border}`, color:C.textSub, borderRadius:8, padding:"6px 12px", cursor:"pointer", display:"flex", alignItems:"center", gap:6, fontSize:12, fontWeight:600 }}>
            <Icons.back /> Kembali
          </button>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:12, fontWeight:700, color:C.text, fontFamily:"Georgia,serif" }}>{novel?.title}</div>
            <div style={{ fontSize:10, color:C.muted }}>Hal. {pg+1}–{Math.min(pg+2,total)} / {total}</div>
          </div>
          <div style={{ display:"flex", gap:6 }}>
            <button onClick={() => setIsTTS(v=>!v)} style={{ background: isTTS?C.accent:"none", border:`1px solid ${isTTS?C.accent:C.border}`, color: isTTS?"#fff":C.textSub, borderRadius:8, padding:"6px 10px", cursor:"pointer" }}>
              <Icons.ear />
            </button>
            <button onClick={() => setShowCfg(true)} style={{ background:"none", border:`1px solid ${C.border}`, color:C.textSub, borderRadius:8, padding:"6px 10px", cursor:"pointer" }}>
              <Icons.settings />
            </button>
          </div>
        </div>
      )}

      {/* ── Book ── */}
      <div style={{ position:"relative", width:"min(97vw, 440px)" }}>

        {/* Drop shadow */}
        <div style={{ position:"absolute", bottom:-14, left:"4%", right:"4%", height:18, background:"rgba(30,40,80,0.2)", borderRadius:"50%", filter:"blur(14px)" }}/>

        {/* Header label */}
        <div style={{ textAlign:"center", marginBottom:5 }}>
          <span style={{ fontSize:8.5, color:T.sub, letterSpacing:"2.5px", textTransform:"uppercase", fontFamily:"Georgia,serif", opacity:0.65 }}>NovelVerse · Perpustakaan Digital</span>
        </div>

        {/* Book block — contains static spread + animated leaf on top */}
        <div style={{
          display:"flex", position:"relative",
          borderRadius:"2px 4px 4px 2px",
          overflow:"hidden",
          perspective:"1800px",
          transformStyle:"preserve-3d",
          boxShadow:"2px 4px 32px rgba(30,40,80,0.22), 0 1px 6px rgba(30,40,80,0.10)",
          minHeight:"min(80vh, 590px)",
          animation: phase === "land" ? "landIn 0.12s ease" : "none",
        }}>

          {/* ── Static left page ── */}
          <div style={{
            flex:1, display:"flex", flexDirection:"column", position:"relative", overflow:"hidden",
            background: T.page,
            backgroundImage:`linear-gradient(to right, ${T.edge} 0%, ${T.page} 8%)`,
          }}>
            {renderPageContent(leftParas, pg+1, "left")}
          </div>

          {/* ── Spine ── */}
          <div style={{ width:5, flexShrink:0, position:"relative", zIndex:40, background:`linear-gradient(to right, ${T.spine}, ${T.edge} 40%, ${T.edge} 60%, ${T.spine})` }}>
            <div style={{ position:"absolute", top:0, bottom:0, left:1.5, width:1, background:"rgba(255,255,255,0.3)" }}/>
          </div>

          {/* ── Static right page ── */}
          <div style={{
            flex:1, display:"flex", flexDirection:"column", position:"relative", overflow:"hidden",
            background: T.page,
            backgroundImage:`linear-gradient(to left, ${T.edge} 0%, ${T.page} 8%)`,
          }}>
            {rightParas
              ? renderPageContent(rightParas, pg+2, "right")
              : (
                <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:10, opacity:0.45 }}>
                  <div style={{ width:28, height:1, background:T.sub, opacity:0.3 }}/>
                  <span style={{ fontSize:9, color:T.sub, fontStyle:"italic", fontFamily:"Georgia,serif" }}>— Tamat —</span>
                  <div style={{ width:28, height:1, background:T.sub, opacity:0.3 }}/>
                </div>
              )
            }
          </div>

          {/* ── Sweep shadow on static pages ── */}
          {sweepShadow()}

          {/* ── Animated turning leaf ── */}
          {phase !== "idle" && (
            <div style={leafStyle()}>
              {/* Leaf face — shows the page that's turning */}
              <div style={{ flex:1, display:"flex", flexDirection:"column", padding:"22px 20px 14px" }}>
                <div style={{ paddingBottom:9, borderBottom:`1px solid ${T.border}`, marginBottom:14 }}>
                  <span style={{ fontSize:8.5, color:T.sub, letterSpacing:"0.5px", fontStyle:"italic" }}>
                    {flipDir === "next" ? "Bab Satu" : (novel?.title || "NovelVerse")}
                  </span>
                </div>
                <div style={{ flex:1, fontFamily:"Georgia,serif", fontSize:FONT_SIZES[fsz], lineHeight:"1.92", color:T.text, overflow:"hidden" }}>
                  {(leafParas || []).slice(0, 4).map((p, i) => (
                    <p key={i} style={{ margin:"0 0 0.8em", textIndent:"1.4em", textAlign:"justify", color: p.startsWith("*") ? T.sub : T.text, fontStyle: p.startsWith("*") ? "italic" : "normal" }}>
                      {p.replace(/\*/g,"")}
                    </p>
                  ))}
                </div>
              </div>
              {/* Leaf highlight — simulates light catching the turning page */}
              <div style={{
                position:"absolute", top:0, bottom:0, left:0, right:0, pointerEvents:"none",
                background: flipDir === "next"
                  ? "linear-gradient(to right, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 60%)"
                  : "linear-gradient(to left,  rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 60%)",
              }}/>
              {/* Leaf spine-edge shadow */}
              <div style={{
                position:"absolute", top:0, bottom:0,
                [flipDir === "next" ? "left" : "right"]: 0,
                width:10, pointerEvents:"none",
                background: flipDir === "next"
                  ? "linear-gradient(to right, rgba(0,0,0,0.10), transparent)"
                  : "linear-gradient(to left,  rgba(0,0,0,0.10), transparent)",
              }}/>
            </div>
          )}
        </div>

        {/* Page-curl hint */}
        <div onClick={() => go("next")} style={{ position:"absolute", bottom:0, right:0, width:28, height:28, background:`linear-gradient(225deg, ${T.bg} 50%, ${T.edge} 50%)`, cursor:"pointer", zIndex:50, borderRadius:"0 0 4px 0", boxShadow:"-2px -2px 5px rgba(0,0,0,0.08)" }}/>

        {/* Tap zones */}
        <div onClick={() => go("prev")} style={{ position:"absolute", top:0, bottom:0, left:0, width:"30%", cursor: pg>0?"pointer":"default", zIndex:20 }}/>
        <div onClick={() => go("next")} style={{ position:"absolute", top:0, bottom:0, right:0, width:"30%", cursor: pg<total-1?"pointer":"default", zIndex:20 }}/>
      </div>

      {/* ── Bottom bar ── */}
      {uiOn && (
        <div style={{ position:"fixed", bottom:0, left:0, right:0, zIndex:200, animation:"fadeBar 0.2s ease", background:"rgba(255,255,255,0.94)", backdropFilter:"blur(12px)", borderTop:`1px solid ${C.border}`, padding:"10px 20px 16px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
            <span style={{ fontSize:10, color:C.muted, minWidth:28 }}>{progress}%</span>
            <div style={{ flex:1, height:3, background:C.border, borderRadius:2 }}>
              <div style={{ height:"100%", width:`${progress}%`, background:C.accent, borderRadius:2, transition:"width 0.35s" }}/>
            </div>
            <span style={{ fontSize:10, color:C.muted }}>Bab 1</span>
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <button onClick={() => go("prev")} disabled={pg===0} style={{ background: pg>0?C.accentLt:C.bg, border:`1px solid ${pg>0?C.accentMid:C.border}`, color: pg>0?C.accent:C.muted, padding:"8px 16px", borderRadius:8, cursor: pg>0?"pointer":"default", fontSize:12, fontWeight:600, opacity: pg===0?0.4:1, transition:"all 0.15s" }}>
              ← Sebelumnya
            </button>
            <span style={{ fontSize:11, color:C.muted }}>{pg+1}–{Math.min(pg+2,total)} / {total}</span>
            <button onClick={() => go("next")} disabled={pg>=total-1} style={{ background: pg<total-1?C.accentLt:C.bg, border:`1px solid ${pg<total-1?C.accentMid:C.border}`, color: pg<total-1?C.accent:C.muted, padding:"8px 16px", borderRadius:8, cursor: pg<total-1?"pointer":"default", fontSize:12, fontWeight:600, opacity: pg>=total-1?0.4:1, transition:"all 0.15s" }}>
              Berikutnya →
            </button>
          </div>
        </div>
      )}

      {/* TTS banner */}
      {isTTS && (
        <div style={{ position:"fixed", top: uiOn?62:12, left:16, right:16, zIndex:150, background:C.accent, borderRadius:10, padding:"10px 14px", display:"flex", alignItems:"center", gap:10, boxShadow:"0 4px 16px rgba(30,64,175,0.28)" }}>
          <span style={{ fontSize:16 }}>🎧</span>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:12, fontWeight:700, color:"#fff" }}>Narasi aktif</div>
            <div style={{ fontSize:10, color:"rgba(255,255,255,0.75)" }}>Suara Wanita · Hal. {pg+1}</div>
          </div>
          <button onClick={() => setIsTTS(false)} style={{ background:"rgba(255,255,255,0.2)", border:"none", color:"#fff", borderRadius:6, padding:"4px 8px", cursor:"pointer", fontSize:11 }}>✕</button>
        </div>
      )}

      {/* Settings drawer */}
      {showCfg && (
        <div style={{ position:"fixed", inset:0, zIndex:300 }}>
          <div onClick={() => setShowCfg(false)} style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.3)", backdropFilter:"blur(3px)" }}/>
          <div style={{ position:"absolute", bottom:0, left:0, right:0, background:"#fff", borderRadius:"20px 20px 0 0", padding:"20px 22px 30px", maxHeight:"76vh", overflowY:"auto", boxShadow:"0 -8px 40px rgba(0,0,0,0.10)" }}>
            <div style={{ width:36, height:4, background:C.border, borderRadius:2, margin:"0 auto 18px" }}/>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <h3 style={{ margin:0, fontSize:14, fontWeight:700, color:C.text, fontFamily:"Georgia,serif" }}>Pengaturan Tampilan</h3>
              <button onClick={() => setShowCfg(false)} style={{ background:C.bg, border:`1px solid ${C.border}`, color:C.muted, borderRadius:8, padding:"5px 10px", cursor:"pointer", fontSize:12 }}>Tutup</button>
            </div>

            <div style={{ marginBottom:20 }}>
              <div style={{ fontSize:9, color:C.muted, fontWeight:700, letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:10 }}>Warna Halaman</div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 }}>
                {[["cream","Krem","#FEFCF5"],["white","Putih","#FFFFFF"],["sepia","Sepia","#F5EDD4"],["stone","Abu","#F8F9FA"]].map(([k,lb,bg]) => (
                  <button key={k} onClick={() => setTheme(k)} style={{ background:bg, border:`2px solid ${theme===k?C.accent:C.border}`, borderRadius:10, padding:"12px 6px", cursor:"pointer", textAlign:"center", transition:"all 0.15s" }}>
                    <div style={{ fontSize:9, color:"#444", fontWeight:600 }}>{lb}</div>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom:20 }}>
              <div style={{ fontSize:9, color:C.muted, fontWeight:700, letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:10 }}>Ukuran Teks</div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>
                {[["S","13px"],["M","15px"],["L","17px"],["XL","20px"]].map(([k,px]) => (
                  <button key={k} onClick={() => setFsz(k)} style={{ background: fsz===k?C.accent:C.bg, border:`1px solid ${fsz===k?C.accent:C.border}`, borderRadius:8, padding:"10px 4px", cursor:"pointer", color: fsz===k?"#fff":C.textSub, fontWeight:700, fontSize:13, display:"flex", flexDirection:"column", alignItems:"center", gap:2, transition:"all 0.15s" }}>
                    {k}<span style={{ fontSize:8, opacity:0.6 }}>{px}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize:9, color:C.muted, fontWeight:700, letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:10 }}>Narasi Suara</div>
              <button onClick={() => setIsTTS(!isTTS)} style={{ width:"100%", background: isTTS?C.accentLt:C.bg, border:`1px solid ${isTTS?C.accent:C.border}`, borderRadius:10, padding:"14px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}>
                <span style={{ fontSize:20 }}>🎧</span>
                <span style={{ fontSize:12, fontWeight:600, color: isTTS?C.accent:C.textSub }}>{isTTS?"Nonaktifkan":"Aktifkan"} Narasi Suara</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────
export default function NovelVerse() {
  const [screen, setScreen]   = useState("splash");
  const [tab, setTab]         = useState("home");
  const [novel, setNovel]     = useState(null);
  const [library, setLibrary] = useState([NOVELS[0], NOVELS[2]]);
  const [query, setQuery]     = useState("");
  const [focused, setFocused] = useState(false);
  const [ptcls, setPtcls]     = useState([]);
  const [progress]            = useState(34);

  useEffect(() => {
    setPtcls(Array.from({length:10},(_,i)=>({ id:i, x:Math.random()*100, y:Math.random()*100, size:Math.random()*14+8, dur:Math.random()*7+5, del:Math.random()*3 })));
    setTimeout(() => setScreen("main"), 3200);
  }, []);

  const addLib = (n) => { if (!library.find(l=>l.id===n.id)) setLibrary(p=>[...p,n]); };

  const filtered = query
    ? NOVELS.filter(n => [n.title,n.author,n.genre].some(s=>s.toLowerCase().includes(query.toLowerCase())))
    : NOVELS;

  // ── Splash ──
  if (screen === "splash") return (
    <div style={{ background:"linear-gradient(160deg,#1E3A8A 0%,#312E81 50%,#1E40AF 100%)", minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden" }}>
      <style>{`@keyframes rise{0%{opacity:0;transform:translateY(0) rotate(0)}20%{opacity:0.8}80%{opacity:0.3}100%{opacity:0;transform:translateY(-110vh) rotate(540deg)}}@keyframes fi{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}@keyframes pu{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}@keyframes sh{0%{background-position:-200% center}100%{background-position:200% center}}`}</style>
      {ptcls.map(p=>(
        <div key={p.id} style={{ position:"absolute", left:`${p.x}%`, bottom:"-5%", fontSize:`${p.size}px`, animation:`rise ${p.dur}s ${p.del}s infinite linear` }}>
          {["📖","📚","✨","📜","📝","🔖"][p.id%6]}
        </div>
      ))}
      <div style={{ animation:"fi 0.9s ease forwards", textAlign:"center", zIndex:10 }}>
        <div style={{ fontSize:64, animation:"pu 2s ease-in-out infinite", marginBottom:14 }}>📚</div>
        <div style={{ fontSize:34, fontWeight:900, fontFamily:"Georgia,serif", letterSpacing:"-0.5px", background:"linear-gradient(135deg,#BFDBFE,#E0E7FF,#BFDBFE)", backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", animation:"sh 3s linear infinite" }}>NovelVerse</div>
        <div style={{ color:"rgba(255,255,255,0.55)", marginTop:8, fontSize:13, letterSpacing:"0.5px" }}>Perpustakaan Digital Anda</div>
        <div style={{ marginTop:36, display:"flex", gap:6, justifyContent:"center" }}>
          {[0,1,2].map(i=><div key={i} style={{ width:7, height:7, borderRadius:"50%", background:"rgba(255,255,255,0.6)", animation:`pu 0.8s ${i*0.18}s ease-in-out infinite` }}/>)}
        </div>
      </div>
    </div>
  );

  // ── Reading ──
  if (screen === "reading") return <BookReader novel={novel} onBack={() => setScreen("detail")} />;

  // ── Detail ──
  if (screen === "detail" && novel) {
    const inLib = !!library.find(l=>l.id===novel.id);
    return (
      <div style={{ background:C.bg, minHeight:"100vh", fontFamily:"Inter,sans-serif" }}>
        {/* Hero image */}
        <div style={{ position:"relative" }}>
          <img src={novel.cover} alt={novel.title} style={{ width:"100%", height:260, objectFit:"cover" }}/>
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(245,246,248,1) 100%)" }}/>
          <button onClick={() => setScreen("main")} style={{ position:"absolute", top:14, left:14, background:"rgba(255,255,255,0.85)", backdropFilter:"blur(8px)", border:`1px solid ${C.border}`, color:C.text, borderRadius:8, padding:"7px 12px", cursor:"pointer", display:"flex", alignItems:"center", gap:5, fontSize:12, fontWeight:600 }}>
            ← Kembali
          </button>
          <button onClick={() => addLib(novel)} style={{ position:"absolute", top:14, right:14, background:"rgba(255,255,255,0.85)", backdropFilter:"blur(8px)", border:`1px solid ${inLib ? "#1E40AF" : C.border}`, color: inLib ? "#1E40AF" : C.textSub, borderRadius:8, padding:"7px 12px", cursor:"pointer", display:"flex", alignItems:"center", gap:5, fontSize:12, fontWeight:600 }}>
            🔖 {inLib ? "Tersimpan" : "Simpan"}
          </button>
        </div>

        <div style={{ padding:"0 18px 100px" }}>
          {/* Tags */}
          <div style={{ display:"flex", gap:6, marginBottom:10 }}>
            <span style={{ background:C.accentLt, color:C.accent, padding:"3px 10px", borderRadius:4, fontSize:10, fontWeight:700, letterSpacing:"0.5px", textTransform:"uppercase" }}>{novel.genre}</span>
            <span style={{ background: novel.status==="Tamat" ? C.greenLt : C.goldLt, color: novel.status==="Tamat" ? C.green : C.gold, padding:"3px 10px", borderRadius:4, fontSize:10, fontWeight:700, letterSpacing:"0.5px", textTransform:"uppercase" }}>{novel.status}</span>
          </div>
          <h1 style={{ fontSize:24, fontWeight:800, margin:"0 0 4px", fontFamily:"Georgia,serif", color:C.text, letterSpacing:"-0.3px", lineHeight:1.2 }}>{novel.title}</h1>
          <p style={{ margin:"0 0 16px", fontSize:13, color:C.muted }}>oleh <strong style={{ color:C.textSub }}>{novel.author}</strong></p>

          {/* Stats row */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginBottom:20 }}>
            {[["⭐",novel.rating,"Rating"],["👥",novel.readers,"Pembaca"],["📄",novel.chapters,"Bab"],["📌",novel.status==="Tamat"?"Selesai":"Aktif","Status"]].map(([ic,val,lbl])=>(
              <div key={lbl} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, padding:"10px 6px", textAlign:"center" }}>
                <div style={{ fontSize:16, marginBottom:2 }}>{ic}</div>
                <div style={{ fontSize:12, fontWeight:700, color:C.text }}>{val}</div>
                <div style={{ fontSize:9, color:C.muted, textTransform:"uppercase", letterSpacing:"0.4px" }}>{lbl}</div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ borderTop:`1px solid ${C.border}`, marginBottom:16 }}/>

          {/* Synopsis */}
          <div style={{ marginBottom:22 }}>
            <div style={{ fontSize:10, fontWeight:700, color:C.muted, letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:8 }}>Sinopsis</div>
            <p style={{ margin:0, fontSize:13, lineHeight:"1.8", color:C.textSub, fontFamily:"Georgia,serif" }}>{novel.synopsis}</p>
          </div>

          {/* CTA */}
          <button onClick={() => setScreen("reading")} style={{ width:"100%", background:C.accent, border:"none", color:"#fff", padding:"15px", borderRadius:10, cursor:"pointer", fontSize:14, fontWeight:700, letterSpacing:"0.3px", marginBottom:10, boxShadow:"0 4px 14px rgba(30,64,175,0.3)" }}>
            Baca Sekarang
          </button>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
            {[["🔖", inLib?"Tersimpan":"Koleksi", ()=>addLib(novel)],["🔊","Dengarkan",()=>setScreen("reading")],["↗️","Bagikan",()=>{}]].map(([ic,lb,fn])=>(
              <button key={lb} onClick={fn} style={{ background:C.surface, border:`1px solid ${C.border}`, color:C.textSub, padding:"11px 6px", borderRadius:10, cursor:"pointer", fontSize:11, fontWeight:600, display:"flex", flexDirection:"column", alignItems:"center", gap:5 }}>
                <span style={{ fontSize:16 }}>{ic}</span>{lb}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Home tab ──
  const Home = () => (
    <div style={{ paddingBottom:80 }}>
      {/* Header */}
      <div style={{ background:C.surface, borderBottom:`1px solid ${C.border}`, padding:"16px 18px 14px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div>
          <div style={{ fontSize:10, color:C.muted, letterSpacing:"1px", textTransform:"uppercase", marginBottom:2 }}>Perpustakaan Digital</div>
          <div style={{ fontSize:20, fontWeight:800, color:C.text, fontFamily:"Georgia,serif", letterSpacing:"-0.4px" }}>NovelVerse</div>
        </div>
        <div style={{ width:38, height:38, borderRadius:10, background:C.accentLt, border:`1px solid ${C.accentMid}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>👤</div>
      </div>

      {/* Search */}
      <div style={{ padding:"14px 18px 0" }}>
        <div style={{ position:"relative" }}>
          <div style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:C.muted }}>
            <Icons.search />
          </div>
          <input value={query} onChange={e=>setQuery(e.target.value)} onFocus={()=>setFocused(true)} onBlur={()=>setTimeout(()=>setFocused(false),200)}
            placeholder="Cari judul, penulis, atau genre..."
            style={{ width:"100%", background:C.surface, border:`1px solid ${focused ? C.accent : C.border}`, color:C.text, borderRadius:10, padding:"11px 14px 11px 42px", fontSize:13, outline:"none", boxSizing:"border-box", transition:"border-color 0.2s", boxShadow: focused ? `0 0 0 3px ${C.accentMid}40` : "none" }}/>
        </div>
      </div>

      {/* Search results */}
      {query && (
        <div style={{ padding:"12px 18px 0" }}>
          <div style={{ fontSize:11, color:C.muted, marginBottom:10 }}>{filtered.length} hasil pencarian untuk "{query}"</div>
          {filtered.map(n=>(
            <div key={n.id} onClick={()=>{setNovel(n);setScreen("detail");}} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, padding:12, display:"flex", gap:12, cursor:"pointer", marginBottom:8 }}>
              <img src={n.cover} alt="" style={{ width:50, height:70, objectFit:"cover", borderRadius:6 }}/>
              <div>
                <div style={{ fontWeight:700, fontSize:13, color:C.text, marginBottom:2 }}>{n.title}</div>
                <div style={{ fontSize:11, color:C.muted }}>{n.author}</div>
                <div style={{ fontSize:10, color:C.accent, marginTop:4, fontWeight:600 }}>{n.genre} · ⭐ {n.rating}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!query && <>
        {/* XP bar */}
        <div style={{ margin:"14px 18px 0", background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, padding:"12px 14px", display:"flex", alignItems:"center", gap:12 }}>
          <div style={{ width:36, height:36, borderRadius:8, background:C.accentLt, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>📖</div>
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
              <span style={{ fontSize:11, fontWeight:700, color:C.accent }}>Story Explorer</span>
              <span style={{ fontSize:10, color:C.muted }}>340 / 500 XP</span>
            </div>
            <div style={{ height:4, background:C.border, borderRadius:2 }}>
              <div style={{ height:"100%", width:"68%", background:C.accent, borderRadius:2 }}/>
            </div>
          </div>
        </div>

        {/* Hero featured */}
        <div style={{ margin:"16px 18px 0" }}>
          <div style={{ fontSize:10, color:C.muted, fontWeight:700, letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:10 }}>Novel Pilihan Hari Ini</div>
          <div onClick={()=>{setNovel(NOVELS[0]);setScreen("detail");}} style={{ borderRadius:12, overflow:"hidden", position:"relative", cursor:"pointer", height:180, border:`1px solid ${C.border}` }}>
            <img src={NOVELS[0].cover} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right, rgba(10,15,40,0.92) 0%, rgba(10,15,40,0.55) 55%, transparent 100%)" }}/>
            <div style={{ position:"absolute", bottom:18, left:16, right:"38%" }}>
              <div style={{ fontSize:8, color:C.accentMid, fontWeight:700, letterSpacing:"2px", textTransform:"uppercase", marginBottom:5 }}>Unggulan</div>
              <div style={{ fontSize:17, fontWeight:800, color:"#fff", fontFamily:"Georgia,serif", lineHeight:1.2, marginBottom:6 }}>{NOVELS[0].title}</div>
              <div style={{ fontSize:10, color:"rgba(255,255,255,0.65)", marginBottom:10 }}>{NOVELS[0].author}</div>
              <button style={{ background:"#fff", border:"none", color:C.accent, padding:"6px 14px", borderRadius:6, fontSize:10, fontWeight:700, cursor:"pointer" }}>Baca Sekarang</button>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div style={{ margin:"20px 0 0" }}>
          <div style={{ padding:"0 18px", marginBottom:10 }}>
            <span style={{ fontSize:10, fontWeight:700, color:C.muted, letterSpacing:"1.5px", textTransform:"uppercase" }}>Kategori</span>
          </div>
          <div style={{ display:"flex", gap:8, paddingLeft:18, overflowX:"auto", paddingBottom:2 }}>
            {CATEGORIES.map(cat=>(
              <button key={cat.name} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:8, padding:"8px 14px", cursor:"pointer", whiteSpace:"nowrap", display:"flex", alignItems:"center", gap:6, flexShrink:0 }}>
                <span style={{ fontSize:14 }}>{cat.icon}</span>
                <span style={{ fontSize:11, fontWeight:600, color:C.textSub }}>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Popular */}
        <div style={{ margin:"20px 0 0" }}>
          <div style={{ padding:"0 18px", display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
            <span style={{ fontSize:10, fontWeight:700, color:C.muted, letterSpacing:"1.5px", textTransform:"uppercase" }}>Novel Populer</span>
            <span style={{ fontSize:11, color:C.accent, fontWeight:600, cursor:"pointer" }}>Lihat Semua</span>
          </div>
          <div style={{ display:"flex", gap:12, paddingLeft:18, overflowX:"auto", paddingBottom:4 }}>
            {NOVELS.map(n=>(
              <div key={n.id} onClick={()=>{setNovel(n);setScreen("detail");}} style={{ minWidth:120, cursor:"pointer", flexShrink:0 }}>
                <div style={{ position:"relative", marginBottom:8 }}>
                  <img src={n.cover} alt="" style={{ width:120, height:172, objectFit:"cover", borderRadius:8, display:"block", border:`1px solid ${C.border}` }}/>
                  <div style={{ position:"absolute", bottom:6, left:6, background:"rgba(0,0,0,0.65)", borderRadius:4, padding:"2px 6px", fontSize:10, color:"#FCD34D" }}>⭐ {n.rating}</div>
                </div>
                <div style={{ fontSize:12, fontWeight:700, color:C.text, marginBottom:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{n.title}</div>
                <div style={{ fontSize:10, color:C.muted }}>{n.author}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Continue reading */}
        {library.length > 0 && (
          <div style={{ margin:"20px 18px 0" }}>
            <div style={{ fontSize:10, fontWeight:700, color:C.muted, letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:10 }}>Lanjutkan Membaca</div>
            {library.slice(0,2).map(n=>(
              <div key={n.id} onClick={()=>{setNovel(n);setScreen("reading");}} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, padding:12, display:"flex", gap:12, cursor:"pointer", marginBottom:8 }}>
                <img src={n.cover} alt="" style={{ width:46, height:62, objectFit:"cover", borderRadius:6, border:`1px solid ${C.border}` }}/>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700, fontSize:13, color:C.text, marginBottom:2 }}>{n.title}</div>
                  <div style={{ fontSize:10, color:C.muted, marginBottom:8 }}>Bab 1 · {progress}% selesai</div>
                  <div style={{ height:3, background:C.border, borderRadius:2 }}>
                    <div style={{ height:"100%", width:`${progress}%`, background:C.accent, borderRadius:2 }}/>
                  </div>
                </div>
                <Icons.chevR />
              </div>
            ))}
          </div>
        )}
      </>}
    </div>
  );

  // ── Library tab ──
  const Library = () => (
    <div style={{ padding:"0 0 80px" }}>
      <div style={{ background:C.surface, borderBottom:`1px solid ${C.border}`, padding:"16px 18px" }}>
        <div style={{ fontSize:10, color:C.muted, letterSpacing:"1px", textTransform:"uppercase", marginBottom:2 }}>Koleksi Saya</div>
        <div style={{ fontSize:18, fontWeight:800, color:C.text, fontFamily:"Georgia,serif" }}>Perpustakaan</div>
      </div>
      <div style={{ padding:"16px 18px" }}>
        {library.length === 0 ? (
          <div style={{ textAlign:"center", padding:"60px 20px" }}>
            <div style={{ fontSize:40, marginBottom:12 }}>📭</div>
            <div style={{ fontSize:13, color:C.muted }}>Perpustakaan Anda masih kosong.</div>
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
            {library.map(n=>(
              <div key={n.id} onClick={()=>{setNovel(n);setScreen("detail");}} style={{ cursor:"pointer" }}>
                <img src={n.cover} alt="" style={{ width:"100%", aspectRatio:"3/4", objectFit:"cover", borderRadius:10, display:"block", marginBottom:8, border:`1px solid ${C.border}` }}/>
                <div style={{ fontSize:12, fontWeight:700, color:C.text, marginBottom:1 }}>{n.title}</div>
                <div style={{ fontSize:10, color:C.muted }}>{n.author}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // ── Profile tab ──
  const Profile = () => (
    <div style={{ padding:"0 0 80px" }}>
      <div style={{ background:C.surface, borderBottom:`1px solid ${C.border}`, padding:"16px 18px" }}>
        <div style={{ fontSize:10, color:C.muted, letterSpacing:"1px", textTransform:"uppercase", marginBottom:2 }}>Akun Saya</div>
        <div style={{ fontSize:18, fontWeight:800, color:C.text, fontFamily:"Georgia,serif" }}>Profil</div>
      </div>
      <div style={{ padding:"20px 18px" }}>
        {/* Avatar */}
        <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:22, background:C.surface, border:`1px solid ${C.border}`, borderRadius:12, padding:16 }}>
          <div style={{ width:56, height:56, borderRadius:12, background:C.accentLt, border:`1px solid ${C.accentMid}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26 }}>👤</div>
          <div>
            <div style={{ fontSize:15, fontWeight:800, color:C.text, fontFamily:"Georgia,serif" }}>Pembaca Setia</div>
            <div style={{ fontSize:11, color:C.muted, marginBottom:6 }}>pembaca@email.com</div>
            <span style={{ background:C.accentLt, color:C.accent, fontSize:10, fontWeight:700, padding:"3px 10px", borderRadius:4, letterSpacing:"0.4px" }}>📖 Story Explorer</span>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:16 }}>
          {[["📖","12","Novel"],["📄","148","Bab Dibaca"],["⏱","24j","Waktu"]].map(([ic,val,lb])=>(
            <div key={lb} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, padding:"14px 8px", textAlign:"center" }}>
              <div style={{ fontSize:20, marginBottom:4 }}>{ic}</div>
              <div style={{ fontSize:16, fontWeight:800, color:C.text }}>{val}</div>
              <div style={{ fontSize:9, color:C.muted, textTransform:"uppercase", letterSpacing:"0.4px" }}>{lb}</div>
            </div>
          ))}
        </div>

        {/* XP */}
        <div style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, padding:16, marginBottom:16 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
            <span style={{ fontSize:12, fontWeight:700, color:C.text }}>Progress Level</span>
            <span style={{ fontSize:11, color:C.muted }}>340 / 500 XP</span>
          </div>
          <div style={{ height:6, background:C.border, borderRadius:3, marginBottom:6 }}>
            <div style={{ height:"100%", width:"68%", background:C.accent, borderRadius:3 }}/>
          </div>
          <div style={{ fontSize:11, color:C.muted }}>Level berikutnya: Book Hunter</div>
        </div>

        {/* Achievements */}
        <div style={{ fontSize:10, fontWeight:700, color:C.muted, letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:10 }}>Pencapaian</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>
          {[["🔖","Tekun"],["⚡","Cepat"],["🌙","Malam"],["🎯","Fokus"]].map(([ic,lb])=>(
            <div key={lb} style={{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:10, padding:"12px 6px", textAlign:"center" }}>
              <div style={{ fontSize:22, marginBottom:4 }}>{ic}</div>
              <div style={{ fontSize:9, color:C.muted, fontWeight:600 }}>{lb}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ background:C.bg, minHeight:"100vh", fontFamily:"Inter,sans-serif", maxWidth:480, margin:"0 auto", position:"relative" }}>
      <style>{`*{box-sizing:border-box}::-webkit-scrollbar{display:none}input::placeholder{color:${C.muted}}`}</style>
      <div style={{ minHeight:"100vh", overflowY:"auto" }}>
        {tab==="home"    && <Home/>}
        {tab==="library" && <Library/>}
        {tab==="profile" && <Profile/>}
      </div>
      {/* Bottom nav */}
      <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:480, background:C.surface, borderTop:`1px solid ${C.border}`, display:"flex", justifyContent:"space-around", padding:"8px 0 16px", zIndex:60 }}>
        {[["home","home","Beranda"],["library","library","Koleksi"],["profile","user","Profil"]].map(([id,ic,lb])=>(
          <button key={id} onClick={()=>setTab(id)} style={{ background:"none", border:"none", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:3, padding:"4px 20px", color: tab===id ? C.accent : C.muted, transition:"color 0.15s" }}>
            {ic==="home"    && <Icons.home/>}
            {ic==="library" && <Icons.library/>}
            {ic==="user"    && <Icons.user/>}
            <span style={{ fontSize:10, fontWeight: tab===id ? 700 : 400 }}>{lb}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
