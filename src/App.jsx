import { useState } from "react";

const WA = "+526461164550";

const sendWA = (msg) => window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, "_blank");

// Placeholder image service
const img = (w, h, text, bg = "1a1a1a", fg = "444") =>
  `https://placehold.co/${w}x${h}/${bg}/${fg}?text=${encodeURIComponent(text)}`;

const PRODUCTS = [
  {
    id: 1, name: "Maleta deportiva", category: "Maletas",
    desc: "Maleta de lona resistente con compartimento para zapatos y bolsillos laterales.",
    sizes: [],
    variants: [
  { label: "Dodgers", color: "#003DA5", img: "/images/maleta-dodgers.png" },
  { label: "Diablos Rojos", color: "#C8102E", img: "/images/maleta-diablos.png" },
  { label: "Padres", color: "#2F241D", img: "/images/maleta-padres.png" },
],
    price: 950,
  },
  {
    id: 2, name: "Guanteletas", category: "Guanteletas",
    desc: "Guanteletas de marca propia. Fabricación de alta calidad para entrenamiento diario.",
    sizes: ["S/M", "L/XL"],
    variants: [
      { label: "Negro", color: "#111111", img: img(600, 600, "Guanteletas Negro", "111111", "ffffff") },
      { label: "Rojo", color: "#C8102E", img: img(600, 600, "Guanteletas Rojo", "C8102E", "ffffff") },
      { label: "Azul", color: "#003DA5", img: img(600, 600, "Guanteletas Azul", "003DA5", "ffffff") },
    ],
    price: 120,
  },
  {
    id: 3, name: "Cinturón deportivo", category: "Cinturones",
    desc: "Cinturón tipo pantalón deportivo de marca propia. Elástico y ajustable.",
    sizes: ["S", "M", "L", "XL"],
    variants: [
      { label: "Negro", color: "#111111", img: img(600, 600, "Cinturon Negro", "111111", "ffffff") },
      { label: "Blanco", color: "#eeeeee", img: img(600, 600, "Cinturon Blanco", "eeeeee", "111111") },
      { label: "Gris", color: "#555555", img: img(600, 600, "Cinturon Gris", "555555", "ffffff") },
    ],
    price: 180,
  },
  {
    id: 4, name: "Gorra deportiva", category: "Gorras",
    desc: "Gorra ajustable con cierre trasero. Disponible en varios colores.",
    sizes: [],
    variants: [
      { label: "Negro", color: "#111111", img: img(600, 600, "Gorra Negro", "111111", "ffffff") },
      { label: "Blanco", color: "#eeeeee", img: img(600, 600, "Gorra Blanco", "eeeeee", "111111") },
      { label: "Rojo", color: "#C8102E", img: img(600, 600, "Gorra Rojo", "C8102E", "ffffff") },
      { label: "Azul marino", color: "#003DA5", img: img(600, 600, "Gorra Azul", "003DA5", "ffffff") },
    ],
    price: 180,
  },
  {
    id: 5, name: "Guantes de box", category: "Guantes",
    desc: "Guantes de entrenamiento con relleno de alta densidad.",
    sizes: ["8 oz", "10 oz", "12 oz", "14 oz", "16 oz"],
    variants: [
      { label: "Negro", color: "#111111", img: img(600, 600, "Guantes Box Negro", "111111", "ffffff") },
      { label: "Rojo", color: "#C8102E", img: img(600, 600, "Guantes Box Rojo", "C8102E", "ffffff") },
      { label: "Azul", color: "#003DA5", img: img(600, 600, "Guantes Box Azul", "003DA5", "ffffff") },
    ],
    price: 450,
  },
  {
    id: 6, name: "Guantes MMA", category: "Guantes",
    desc: "Guantes abiertos para sparring y grappling.",
    sizes: ["S", "M", "L", "XL"],
    variants: [
      { label: "Negro", color: "#111111", img: img(600, 600, "Guantes MMA Negro", "111111", "ffffff") },
      { label: "Rojo", color: "#C8102E", img: img(600, 600, "Guantes MMA Rojo", "C8102E", "ffffff") },
    ],
    price: 380,
  },
  {
    id: 7, name: "Uniforme deportivo", category: "Uniformes",
    desc: "Jersey + short de tela ligera transpirable. Ideal para equipos.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    variants: [
      { label: "Negro/Blanco", color: "#111111", img: img(600, 600, "Uniforme Negro", "111111", "ffffff") },
      { label: "Rojo/Negro", color: "#C8102E", img: img(600, 600, "Uniforme Rojo", "C8102E", "ffffff") },
      { label: "Azul/Blanco", color: "#003DA5", img: img(600, 600, "Uniforme Azul", "003DA5", "ffffff") },
    ],
    price: 390,
  },
  {
    id: 8, name: "Jersey béisbol", category: "Jerseys",
    desc: "Jersey tipo beisbolero con botones y mangas 3/4.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    variants: [
      { label: "Blanco", color: "#eeeeee", img: img(600, 600, "Jersey Blanco", "eeeeee", "111111") },
      { label: "Gris", color: "#888888", img: img(600, 600, "Jersey Gris", "888888", "ffffff") },
      { label: "Negro", color: "#111111", img: img(600, 600, "Jersey Negro", "111111", "ffffff") },
    ],
    price: 420,
  },
];

const CATEGORIES = ["Todos", ...Array.from(new Set(PRODUCTS.map(p => p.category)))];
const CUSTOM_PRODUCTS = [
  { id: "caps", label: "Gorras", icon: "🧢" },
  { id: "gloves", label: "Guantes", icon: "🥊" },
  { id: "shirts", label: "Camisetas", icon: "👕" },
  { id: "logos", label: "Logos / Parches", icon: "🎖️" },
  { id: "other", label: "Otro", icon: "📦" },
];
const PRINT_TYPES = ["Bordado", "Serigrafía", "Sublimación", "Sin preferencia"];

export default function App() {
  const [section, setSection] = useState("tienda");
  const [category, setCategory] = useState("Todos");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selections, setSelections] = useState({});
  const [added, setAdded] = useState(null);
  const [modal, setModal] = useState(null);

  // Custom form
  const [cStep, setCStep] = useState(0);
  const [cForm, setCForm] = useState({ product: "", quantity: "", printType: "", colors: "", notes: "", name: "", phone: "" });
  const [cErrors, setCErrors] = useState({});

  const setC = (k, v) => setCForm(f => ({ ...f, [k]: v }));

  const getSel = (pid) => selections[pid] || { variantIdx: 0, sizeIdx: null };
  const setSel = (pid, patch) => setSelections(s => ({ ...s, [pid]: { ...getSel(pid), ...patch } }));

  const filtered = category === "Todos" ? PRODUCTS : PRODUCTS.filter(p => p.category === category);

  const cartKey = (pid, vi, si) => `${pid}-${vi}-${si}`;

  const addToCart = (product) => {
    const sel = getSel(product.id);
    if (product.sizes.length > 0 && sel.sizeIdx === null) {
      alert("Selecciona una talla");
      return;
    }
    const variant = product.variants[sel.variantIdx];
    const size = product.sizes[sel.sizeIdx] || null;
    const key = cartKey(product.id, sel.variantIdx, sel.sizeIdx);
    setCart(c => {
      const ex = c.find(i => i.key === key);
      if (ex) return c.map(i => i.key === key ? { ...i, qty: i.qty + 1 } : i);
      return [...c, { key, product, variant, size, qty: 1 }];
    });
    setAdded(product.id);
    setTimeout(() => setAdded(null), 1200);
  };

  const removeFromCart = (key) => setCart(c => c.filter(i => i.key !== key));
  const updateQty = (key, d) => setCart(c => c.map(i => i.key === key ? { ...i, qty: Math.max(1, i.qty + d) } : i));
  const total = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const checkout = () => {
    if (!cart.length) return;
    const lines = cart.map(i => `• ${i.product.name} — ${i.variant.label}${i.size ? `, ${i.size}` : ""} x${i.qty} — $${(i.product.price * i.qty).toLocaleString()}`).join("\n");
    sendWA(`Hola, quiero hacer un pedido:\n\n${lines}\n\nTotal: $${total.toLocaleString()} MXN\n\n¿Pueden confirmar disponibilidad?`);
  };

  const validateC = () => {
    const e = {};
    if (cStep === 0 && !cForm.product) e.product = "Selecciona un producto";
    if (cStep === 1) {
      if (!cForm.quantity || +cForm.quantity < 1) e.quantity = "Ingresa una cantidad válida";
      if (!cForm.printType) e.printType = "Selecciona tipo de impresión";
    }
    if (cStep === 2) {
      if (!cForm.name.trim()) e.name = "Nombre requerido";
      if (!cForm.phone.trim()) e.phone = "Teléfono requerido";
    }
    setCErrors(e);
    return !Object.keys(e).length;
  };

  const submitCustom = () => {
    if (!validateC()) return;
    const p = CUSTOM_PRODUCTS.find(p => p.id === cForm.product);
    sendWA(`Hola, quiero un pedido personalizado:\n\n• Producto: ${p?.label}\n• Cantidad: ${cForm.quantity} piezas\n• Impresión: ${cForm.printType}\n${cForm.colors ? `• Colores: ${cForm.colors}\n` : ""}${cForm.notes ? `• Notas: ${cForm.notes}\n` : ""}\nNombre: ${cForm.name}\nTeléfono: ${cForm.phone}`);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#080808", fontFamily: "'Inter',-apple-system,sans-serif", color: "#fff" }}>

      {/* HEADER */}
      <header style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(8,8,8,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #1c1c1c" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src="/Logo.png" alt="Logo" style={{ width: 38, height: 38, objectFit: "contain", borderRadius: 8 }} />
            <div style={{ width: 38, height: 38, background: "#D4FF00", borderRadius: 8, display: "none", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, color: "#000" }}>V</div>
            <div>
              <p style={{ fontWeight: 800, fontSize: 17, letterSpacing: "-0.5px", margin: 0 }}>Vita Sports</p>
              <p style={{ fontSize: 11, color: "#555", margin: 0, letterSpacing: "0.5px", display: "none" }}>ARTÍCULOS DEPORTIVOS</p>
            </div>
          </div>
          <nav style={{ display: "flex", gap: 4, alignItems: "center" }}>
            {[["tienda", "Tienda"], ["personalizado", "Personalizado"]].map(([id, label]) => (
              <button key={id} onClick={() => setSection(id)} style={{ background: section === id ? "#161616" : "none", border: `1px solid ${section === id ? "#2a2a2a" : "transparent"}`, borderRadius: 8, padding: "8px 16px", cursor: "pointer", color: section === id ? "#fff" : "#666", fontSize: 14, fontWeight: section === id ? 600 : 400, transition: "all 0.15s" }}>
                {label}
              </button>
            ))}
            <button onClick={() => setCartOpen(true)} style={{ marginLeft: 8, background: cartCount > 0 ? "#D4FF00" : "#161616", border: `1px solid ${cartCount > 0 ? "#D4FF00" : "#2a2a2a"}`, borderRadius: 8, padding: "8px 16px", cursor: "pointer", color: cartCount > 0 ? "#000" : "#666", fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", gap: 6, transition: "all 0.2s" }}>
              🛒 {cartCount > 0 ? <span>{cartCount}</span> : <span>Carrito</span>}
            </button>
          </nav>
        </div>
      </header>

      {/* CART */}
      {cartOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 300, display: "flex" }} onClick={() => setCartOpen(false)}>
          <div style={{ flex: 1 }} />
          <div onClick={e => e.stopPropagation()} style={{ width: 400, background: "#0f0f0f", borderLeft: "1px solid #1c1c1c", display: "flex", flexDirection: "column", height: "100vh", overflowY: "auto" }}>
            <div style={{ padding: "1.5rem", borderBottom: "1px solid #1c1c1c", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontWeight: 700, fontSize: 18, margin: 0 }}>Carrito {cartCount > 0 && <span style={{ background: "#D4FF00", color: "#000", borderRadius: 100, padding: "2px 8px", fontSize: 12, marginLeft: 8 }}>{cartCount}</span>}</h3>
              <button onClick={() => setCartOpen(false)} style={{ background: "none", border: "none", color: "#666", fontSize: 22, cursor: "pointer", lineHeight: 1 }}>✕</button>
            </div>
            {!cart.length
              ? <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#444", padding: "3rem" }}>
                  <div style={{ fontSize: 48, marginBottom: "1rem" }}>🛒</div>
                  <p style={{ fontSize: 15 }}>El carrito está vacío</p>
                  <button onClick={() => setCartOpen(false)} style={{ marginTop: "1rem", background: "#D4FF00", border: "none", borderRadius: 8, padding: "10px 20px", color: "#000", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>Ver productos</button>
                </div>
              : <>
                  <div style={{ flex: 1, padding: "1rem 1.5rem", display: "flex", flexDirection: "column", gap: 10 }}>
                    {cart.map(item => (
                      <div key={item.key} style={{ display: "flex", gap: 12, padding: "12px", background: "#161616", borderRadius: 12, border: "1px solid #1c1c1c", alignItems: "center" }}>
                        <img src={item.variant.img} alt={item.product.name} style={{ width: 56, height: 56, borderRadius: 8, objectFit: "cover" }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontWeight: 600, fontSize: 13, margin: "0 0 2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.product.name}</p>
                          <p style={{ color: "#666", fontSize: 12, margin: "0 0 4px" }}>{item.variant.label}{item.size ? ` · ${item.size}` : ""}</p>
                          <p style={{ color: "#D4FF00", fontWeight: 700, fontSize: 14, margin: 0 }}>${(item.product.price * item.qty).toLocaleString()}</p>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <Qbtn onClick={() => updateQty(item.key, -1)}>−</Qbtn>
                            <span style={{ fontSize: 13, minWidth: 18, textAlign: "center" }}>{item.qty}</span>
                            <Qbtn onClick={() => updateQty(item.key, 1)}>+</Qbtn>
                          </div>
                          <button onClick={() => removeFromCart(item.key)} style={{ background: "none", border: "none", color: "#444", cursor: "pointer", fontSize: 13 }}>Quitar</button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: "1.5rem", borderTop: "1px solid #1c1c1c" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                      <span style={{ color: "#888", fontSize: 14 }}>Subtotal</span>
                      <span style={{ fontWeight: 700, fontSize: 20 }}>${total.toLocaleString()} <span style={{ fontSize: 13, color: "#555", fontWeight: 400 }}>MXN</span></span>
                    </div>
                    <p style={{ color: "#444", fontSize: 12, marginBottom: "1rem" }}>Envío y disponibilidad se confirman por WhatsApp</p>
                    <button onClick={checkout} style={{ width: "100%", background: "#25D366", border: "none", borderRadius: 10, padding: "14px", color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                      <span>💬</span> Pedir por WhatsApp
                    </button>
                  </div>
                </>}
          </div>
        </div>
      )}

      {/* PRODUCT MODAL */}
      {modal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }} onClick={() => setModal(null)}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#0f0f0f", borderRadius: 16, border: "1px solid #1c1c1c", maxWidth: 800, width: "100%", display: "flex", overflow: "hidden", maxHeight: "90vh" }}>
            <div style={{ width: "45%", flexShrink: 0, background: "#111" }}>
              <img src={modal.variants[getSel(modal.id).variantIdx].img} alt={modal.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ flex: 1, padding: "2rem", overflowY: "auto", display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                <span style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", borderRadius: 100, padding: "4px 12px", fontSize: 11, color: "#888", letterSpacing: "0.5px" }}>{modal.category.toUpperCase()}</span>
                <button onClick={() => setModal(null)} style={{ background: "none", border: "none", color: "#666", fontSize: 22, cursor: "pointer" }}>✕</button>
              </div>
              <h2 style={{ fontSize: 24, fontWeight: 800, margin: "0.75rem 0 0.5rem" }}>{modal.name}</h2>
              <p style={{ color: "#666", fontSize: 14, lineHeight: 1.7, marginBottom: "1.5rem" }}>{modal.desc}</p>
              <p style={{ fontSize: 28, fontWeight: 800, color: "#D4FF00", marginBottom: "1.5rem" }}>${modal.price.toLocaleString()} <span style={{ fontSize: 14, color: "#555", fontWeight: 400 }}>MXN</span></p>

              <div style={{ marginBottom: "1.25rem" }}>
                <p style={{ fontSize: 12, color: "#666", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 10 }}>Color / Modelo</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {modal.variants.map((v, i) => (
                    <button key={i} onClick={() => setSel(modal.id, { variantIdx: i })} style={{ display: "flex", alignItems: "center", gap: 6, background: getSel(modal.id).variantIdx === i ? "#1e1e1e" : "#111", border: `1.5px solid ${getSel(modal.id).variantIdx === i ? "#D4FF00" : "#2a2a2a"}`, borderRadius: 8, padding: "6px 12px", cursor: "pointer", color: getSel(modal.id).variantIdx === i ? "#fff" : "#888", fontSize: 13, transition: "all 0.15s" }}>
                      <span style={{ width: 12, height: 12, borderRadius: "50%", background: v.color, border: "1px solid #444", flexShrink: 0 }} />
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>

              {modal.sizes.length > 0 && (
                <div style={{ marginBottom: "1.5rem" }}>
                  <p style={{ fontSize: 12, color: "#666", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 10 }}>Talla</p>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {modal.sizes.map((s, i) => (
                      <button key={i} onClick={() => setSel(modal.id, { sizeIdx: i })} style={{ background: getSel(modal.id).sizeIdx === i ? "#D4FF00" : "#161616", border: `1px solid ${getSel(modal.id).sizeIdx === i ? "#D4FF00" : "#2a2a2a"}`, borderRadius: 8, padding: "8px 14px", cursor: "pointer", color: getSel(modal.id).sizeIdx === i ? "#000" : "#888", fontSize: 13, fontWeight: getSel(modal.id).sizeIdx === i ? 700 : 400, transition: "all 0.15s" }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button onClick={() => { addToCart(modal); setModal(null); }} style={{ marginTop: "auto", background: "#D4FF00", border: "none", borderRadius: 10, padding: "14px", color: "#000", fontWeight: 800, fontSize: 15, cursor: "pointer", width: "100%" }}>
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TIENDA */}
      {section === "tienda" && (
        <main style={{ maxWidth: 1200, margin: "0 auto", padding: "3rem 2rem" }}>
          <div style={{ marginBottom: "2.5rem" }}>
            <h1 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 800, letterSpacing: "-1px", marginBottom: "0.5rem" }}>Tienda</h1>
            <p style={{ color: "#555", fontSize: 15 }}>Artículos deportivos con envíos a todo el país</p>
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "2.5rem" }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)} style={{ background: category === cat ? "#D4FF00" : "#111", border: `1px solid ${category === cat ? "#D4FF00" : "#1c1c1c"}`, borderRadius: 100, padding: "7px 18px", cursor: "pointer", color: category === cat ? "#000" : "#666", fontSize: 13, fontWeight: category === cat ? 700 : 400, transition: "all 0.15s" }}>
                {cat}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
            {filtered.map(product => {
              const sel = getSel(product.id);
              const variant = product.variants[sel.variantIdx];
              const isAdded = added === product.id;
              return (
                <div key={product.id} style={{ background: "#0f0f0f", border: "1px solid #1c1c1c", borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column", transition: "border-color 0.2s", cursor: "pointer" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "#2a2a2a"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "#1c1c1c"}>
                  <div onClick={() => setModal(product)} style={{ position: "relative", overflow: "hidden", aspectRatio: "1", background: "#111" }}>
                    <img src={variant.img} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s" }}
                      onMouseEnter={e => e.target.style.transform = "scale(1.04)"}
                      onMouseLeave={e => e.target.style.transform = "scale(1)"} />
                    <span style={{ position: "absolute", top: 10, left: 10, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", borderRadius: 100, padding: "4px 10px", fontSize: 11, color: "#aaa", letterSpacing: "0.5px" }}>{product.category.toUpperCase()}</span>
                  </div>
                  <div style={{ padding: "1rem 1.1rem 1.1rem", flex: 1, display: "flex", flexDirection: "column" }}>
                    <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{product.name}</p>
                    <p style={{ color: "#555", fontSize: 12, lineHeight: 1.5, marginBottom: "0.75rem", flex: 1 }}>{product.desc}</p>

                    {/* Color dots */}
                    <div style={{ display: "flex", gap: 6, marginBottom: "0.75rem", alignItems: "center" }}>
                      {product.variants.map((v, i) => (
                        <button key={i} onClick={() => setSel(product.id, { variantIdx: i })} title={v.label} style={{ width: 18, height: 18, borderRadius: "50%", background: v.color, border: `2px solid ${sel.variantIdx === i ? "#D4FF00" : "transparent"}`, cursor: "pointer", padding: 0, transition: "border-color 0.15s", outline: "none" }} />
                      ))}
                      <span style={{ color: "#555", fontSize: 12, marginLeft: 4 }}>{variant.label}</span>
                    </div>

                    {/* Sizes */}
                    {product.sizes.length > 0 && (
                      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: "0.75rem" }}>
                        {product.sizes.map((s, i) => (
                          <button key={i} onClick={() => setSel(product.id, { sizeIdx: i })} style={{ background: sel.sizeIdx === i ? "#D4FF00" : "#161616", border: `1px solid ${sel.sizeIdx === i ? "#D4FF00" : "#222"}`, borderRadius: 6, padding: "4px 9px", cursor: "pointer", color: sel.sizeIdx === i ? "#000" : "#666", fontSize: 11, fontWeight: sel.sizeIdx === i ? 700 : 400, transition: "all 0.15s" }}>
                            {s}
                          </button>
                        ))}
                      </div>
                    )}

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
                      <span style={{ fontWeight: 800, fontSize: 20, color: "#D4FF00" }}>${product.price.toLocaleString()}</span>
                      <button onClick={() => addToCart(product)} style={{ background: isAdded ? "#1a2e00" : "#161616", border: `1px solid ${isAdded ? "#D4FF00" : "#2a2a2a"}`, borderRadius: 8, padding: "8px 16px", cursor: "pointer", color: isAdded ? "#D4FF00" : "#fff", fontSize: 13, fontWeight: 600, transition: "all 0.2s" }}>
                        {isAdded ? "✓ Listo" : "+ Agregar"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      )}

      {/* PERSONALIZADO */}
      {section === "personalizado" && (
        <main style={{ maxWidth: 640, margin: "0 auto", padding: "3rem 2rem" }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.5px", marginBottom: "0.5rem" }}>Pedido personalizado</h1>
          <p style={{ color: "#555", marginBottom: "2rem", lineHeight: 1.6 }}>Tu logo, tu diseño. Serigrafía, bordado o sublimación. Cotización en menos de 24 hrs.</p>

          {/* Steps indicator */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: "2rem", gap: 0 }}>
            {["Producto", "Detalles", "Contacto"].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", flex: i < 2 ? 1 : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 30, height: 30, borderRadius: "50%", background: i < cStep ? "#D4FF00" : i === cStep ? "#D4FF00" : "#161616", border: `1px solid ${i <= cStep ? "#D4FF00" : "#2a2a2a"}`, color: i <= cStep ? "#000" : "#555", fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.2s" }}>
                    {i < cStep ? "✓" : i + 1}
                  </div>
                  <span style={{ fontSize: 13, color: i === cStep ? "#fff" : "#555", fontWeight: i === cStep ? 600 : 400 }}>{s}</span>
                </div>
                {i < 2 && <div style={{ flex: 1, height: 1, background: i < cStep ? "#D4FF00" : "#222", margin: "0 12px" }} />}
              </div>
            ))}
          </div>

          <div style={{ background: "#0f0f0f", border: "1px solid #1c1c1c", borderRadius: 16, padding: "2rem" }}>
            {cStep === 0 && (
              <div>
                <Label>¿Qué producto quieres personalizar?</Label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
                  {CUSTOM_PRODUCTS.map(p => (
                    <button key={p.id} onClick={() => setC("product", p.id)} style={{ background: cForm.product === p.id ? "#111" : "#111", border: `1.5px solid ${cForm.product === p.id ? "#D4FF00" : "#1c1c1c"}`, borderRadius: 12, padding: "1rem", textAlign: "left", cursor: "pointer", color: "#fff", transition: "all 0.15s" }}>
                      <div style={{ fontSize: 26, marginBottom: 6 }}>{p.icon}</div>
                      <p style={{ fontWeight: 600, fontSize: 14, margin: 0 }}>{p.label}</p>
                    </button>
                  ))}
                </div>
                {cErrors.product && <Err>{cErrors.product}</Err>}
              </div>
            )}

            {cStep === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div>
                  <Label>Cantidad de piezas *</Label>
                  <input type="number" min="1" placeholder="Ej. 50" value={cForm.quantity} onChange={e => setC("quantity", e.target.value)} style={IS(cErrors.quantity)} />
                  {cErrors.quantity && <Err>{cErrors.quantity}</Err>}
                </div>
                <div>
                  <Label>Tipo de impresión *</Label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
                    {PRINT_TYPES.map(t => (
                      <button key={t} onClick={() => setC("printType", t)} style={{ background: cForm.printType === t ? "#111" : "#111", border: `1.5px solid ${cForm.printType === t ? "#D4FF00" : "#1c1c1c"}`, borderRadius: 8, padding: "8px 14px", cursor: "pointer", color: cForm.printType === t ? "#D4FF00" : "#666", fontSize: 14, transition: "all 0.15s" }}>
                        {t}
                      </button>
                    ))}
                  </div>
                  {cErrors.printType && <Err>{cErrors.printType}</Err>}
                </div>
                <div>
                  <Label>Colores del diseño</Label>
                  <input type="text" placeholder="Ej. Rojo, negro y blanco" value={cForm.colors} onChange={e => setC("colors", e.target.value)} style={IS()} />
                </div>
                <div>
                  <Label>Notas adicionales</Label>
                  <textarea rows={3} placeholder="Tallas, medidas, fecha límite, diseño especial..." value={cForm.notes} onChange={e => setC("notes", e.target.value)} style={{ ...IS(), resize: "vertical" }} />
                </div>
              </div>
            )}

            {cStep === 2 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <div>
                  <Label>Nombre completo *</Label>
                  <input type="text" placeholder="Tu nombre" value={cForm.name} onChange={e => setC("name", e.target.value)} style={IS(cErrors.name)} />
                  {cErrors.name && <Err>{cErrors.name}</Err>}
                </div>
                <div>
                  <Label>Teléfono / WhatsApp *</Label>
                  <input type="tel" placeholder="+52 664 000 0000" value={cForm.phone} onChange={e => setC("phone", e.target.value)} style={IS(cErrors.phone)} />
                  {cErrors.phone && <Err>{cErrors.phone}</Err>}
                </div>
                <div style={{ background: "#111", border: "1px solid #1c1c1c", borderRadius: 10, padding: "1rem", marginTop: "0.5rem" }}>
                  <p style={{ color: "#555", fontSize: 12, marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.5px" }}>Resumen del pedido</p>
                  {[
                    ["Producto", CUSTOM_PRODUCTS.find(p => p.id === cForm.product)?.label],
                    ["Cantidad", `${cForm.quantity} piezas`],
                    ["Impresión", cForm.printType],
                    cForm.colors && ["Colores", cForm.colors],
                  ].filter(Boolean).map(([k, v]) => (
                    <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #1a1a1a" }}>
                      <span style={{ color: "#555", fontSize: 13 }}>{k}</span>
                      <span style={{ color: "#ccc", fontSize: 13, fontWeight: 500 }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
              {cStep > 0
                ? <button onClick={() => { setCErrors({}); setCStep(s => s - 1); }} style={{ background: "none", border: "1px solid #1c1c1c", color: "#666", borderRadius: 8, padding: "10px 20px", cursor: "pointer", fontSize: 14 }}>← Atrás</button>
                : <div />}
              {cStep < 2
                ? <button onClick={() => { if (validateC()) setCStep(s => s + 1); }} style={BS("#D4FF00", "#000")}>Continuar →</button>
                : <button onClick={submitCustom} style={BS("#25D366", "#fff")}>💬 Enviar por WhatsApp</button>}
            </div>
          </div>
        </main>
      )}

      <footer style={{ borderTop: "1px solid #111", padding: "2rem", textAlign: "center" }}>
        <p style={{ color: "#333", fontSize: 13 }}>© 2025 Vita Sports · Ensenada, B.C. · <a href={`https://wa.me/${WA}`} style={{ color: "#25D366", textDecoration: "none" }}>WhatsApp</a></p>
      </footer>
    </div>
  );
}

function Qbtn({ onClick, children }) {
  return <button onClick={onClick} style={{ width: 26, height: 26, background: "#222", border: "none", borderRadius: 6, color: "#fff", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>{children}</button>;
}
function Label({ children }) {
  return <p style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 6, letterSpacing: "0.5px", textTransform: "uppercase" }}>{children}</p>;
}
function Err({ children }) {
  return <p style={{ color: "#ff4d4d", fontSize: 12, marginTop: 6 }}>{children}</p>;
}
function IS(err) {
  return { width: "100%", boxSizing: "border-box", background: "#111", border: `1px solid ${err ? "#ff4d4d" : "#1c1c1c"}`, borderRadius: 8, padding: "11px 14px", color: "#fff", fontSize: 14, outline: "none", fontFamily: "inherit" };
}
function BS(bg, color) {
  return { background: bg, color, border: "none", borderRadius: 8, padding: "11px 24px", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit" };
}
