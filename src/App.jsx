export default function App() {
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "white", fontFamily: "system-ui" }}>
      {/* NAV */}
      <header style={{ position: "sticky", top: 0, backdropFilter: "blur(6px)", background: "rgba(10,10,10,.8)", borderBottom: "1px solid #262626" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <a href="#hero" style={{ fontWeight: 600, letterSpacing: ".2px", color: "white", textDecoration: "none" }}>
            EcomMeasure <span style={{ color: "#a3a3a3" }}>· Measurement Studio</span>
          </a>
          <nav style={{ display: "flex", gap: 16, fontSize: 14, color: "#d4d4d4" }}>
            <a href="#results" style={{ color: "inherit", textDecoration: "none" }}>Resultaten</a>
            <a href="#features" style={{ color: "inherit", textDecoration: "none" }}>Diensten</a>
            <a href="#process" style={{ color: "inherit", textDecoration: "none" }}>Proces</a>
            <a href="#pricing" style={{ color: "inherit", textDecoration: "none" }}>Prijzen</a>
            <a href="#dashboard" style={{ color: "inherit", textDecoration: "none" }}>Dashboard</a>
            <a href="#faq" style={{ color: "inherit", textDecoration: "none" }}>FAQ</a>
            <a href="#about" style={{ color: "inherit", textDecoration: "none" }}>Over mij</a>
            <a href="#contact" style={{ color: "inherit", textDecoration: "none" }}>Contact</a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section id="hero" style={{ padding: "96px 16px 48px", textAlign: "center" }}>
        <h1 style={{ margin: 0, fontSize: 52, fontWeight: 800 }}>
          Meetbaar. Compliant. <span style={{ color: "#10b981" }}>Groeien.</span>
        </h1>
        <p style={{ maxWidth: 680, margin: "16px auto 0", color: "#d4d4d4", fontSize: 18, lineHeight: 1.5 }}>
          In 30 dagen fixen we je metingen (GA4 + GTM), cookietoestemming en advertentiekoppelingen — mét dashboard.
        </p>
        <div style={{ marginTop: 24, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#contact" style={{ background: "#10b981", color: "black", fontWeight: 600, padding: "12px 16px", borderRadius: 12, textDecoration: "none" }}>
            Plan de sprint
          </a>
          <a href="#contact" style={{ border: "1px solid #404040", color: "white", padding: "12px 16px", borderRadius: 12, textDecoration: "none" }}>
            Gratis scan aanvragen
          </a>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="results" style={{ background: "#111", padding: "72px 16px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: 28, marginBottom: 32 }}>Dit zeggen klanten</h2>
          <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
            {[
              { n: "Sanne — D2C koffiemerk", t: "Eindelijk kloppen onze cijfers. ROAS steeg en discussies over data zijn weg." },
              { n: "Youssef — sportshop", t: "Meta CAPI en consent goed geregeld. Minder afkeuringen, betere ads." },
              { n: "Lotte — woonwebshop", t: "Dashboard is top. We zien precies waar de funnel lekt." },
            ].map((x, i) => (
              <div key={i} style={{ background: "#0a0a0a", border: "1px solid #262626", borderRadius: 12, padding: 16 }}>
                <div style={{ color: "#10b981", marginBottom: 8 }}>★★★★★</div>
                <p style={{ margin: "0 0 8px", color: "#e5e5e5" }}>{x.t}</p>
                <p style={{ margin: 0, color: "#a3a3a3", fontSize: 14 }}>— {x.n}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIENSTEN */}
      <section id="features" style={{ padding: "72px 16px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: 28, marginBottom: 32 }}>Mijn diensten</h2>
          <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
            {[
              { t: "Betrouwbare meting", d: "GA4 + Tag Manager netjes ingericht: productview, add-to-cart, checkout, purchase." },
              { t: "Privacyproof", d: "Consent Mode v2 en cookiebanner conform EU-regels. Rust en compliance." },
              { t: "Sterke koppelingen", d: "Meta Conversion API en Google Ads conversies voor slimmer bieden." },
              { t: "Dashboard dat stuurt", d: "Looker Studio met omzet, funnel en kanalen. Eén bron van waarheid." },
            ].map((x, i) => (
              <div key={i} style={{ background: "#0a0a0a", border: "1px solid #262626", borderRadius: 12, padding: 16 }}>
                <h3 style={{ margin: "0 0 8px" }}>{x.t}</h3>
                <p style={{ margin: 0, color: "#a3a3a3" }}>{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCES */}
      <section id="process" style={{ background: "#111", padding: "72px 16px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: 28, marginBottom: 32 }}>Hoe werkt het?</h2>
          <ol style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
            {[
              { t: "1. Audit", d: "We scannen je meetstack en maken een blueprint." },
              { t: "2. Implementatie", d: "We zetten GA4, GTM en koppelingen correct neer." },
              { t: "3. Consent", d: "Consent Mode v2 volledig werkend met je CMP." },
              { t: "4. Dashboard", d: "Looker Studio rapport op maat + overdracht." },
            ].map((x, i) => (
              <li key={i} style={{ background: "#0a0a0a", border: "1px solid #262626", borderRadius: 12, padding: 16, listStyle: "none" }}>
                <h3 style={{ margin: "0 0 8px" }}>{x.t}</h3>
                <p style={{ margin: 0, color: "#a3a3a3" }}>{x.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* PRIJZEN */}
      <section id="pricing" style={{ padding: "72px 16px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: 28, marginBottom: 32 }}>Prijzen</h2>
          <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
            {[
              { n: "Sprint Basis", p: "€ 1.200", i: ["Audit & blueprint", "GA4 + GTM (basis e-commerce)", "CMP basis-koppeling", "Testrapport"] },
              { n: "Sprint Plus", p: "€ 2.000", i: ["Alles uit Basis", "Consent Mode v2 volledig", "Meta Conversion API", "Looker Studio dashboard"] },
              { n: "Sprint Pro", p: "€ 3.000 – € 3.500", i: ["Alles uit Plus", "Server-side tagging", "Google Ads conversies direct", "30 dagen nazorg"] },
            ].map((x, i) => (
              <div key={i} style={{ background: "#0a0a0a", border: "1px solid #262626", borderRadius: 12, padding: 16 }}>
                <h3 style={{ margin: "0 0 8px" }}>{x.n}</h3>
                <p style={{ margin: "0 0 12px", fontSize: 24, fontWeight: 700 }}>{x.p}</p>
                <ul style={{ margin: 0, paddingLeft: 16, color: "#a3a3a3" }}>
                  {x.i.map((li, k) => <li key={k}>{li}</li>)}
                </ul>
                <div style={{ marginTop: 12 }}>
                  <a href="#contact" style={{ display: "inline-block", border: "1px solid #404040", color: "white", padding: "10px 14px", borderRadius: 10, textDecoration: "none" }}>
                    Kies dit pakket
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DASHBOARD */}
      <section id="dashboard" style={{ background: "#111", padding: "72px 16px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 28, marginBottom: 12 }}>Voorbeeld dashboard</h2>
          <p style={{ color: "#a3a3a3", marginBottom: 16 }}>
            Zo ziet een Looker Studio rapport eruit: omzet, funnel en kanalen in één overzicht.
          </p>
          <div style={{ border: "1px solid #262626", borderRadius: 12, overflow: "hidden" }}>
            <img src="https://dummyimage.com/1200x500/0a0a0a/10b981&text=Voorbeeld+dashboard"
                 alt="Voorbeeld dashboard" style={{ width: "100%", height: 380, objectFit: "cover" }} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "72px 16px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: 28, marginBottom: 32 }}>FAQ</h2>
          {[
            ["Wat lever je precies op?", "Een werkende meetstack (GA4 + GTM), correcte Consent Mode v2, Meta CAPI, Looker Studio-dashboard en testrapport."],
            ["Hoe lang duurt de sprint?", "Ongeveer 30 dagen: week 1 audit, week 2 meting, week 3 consent & koppelingen, week 4 QA + dashboard + overdracht."],
            ["Voor wie is dit?", "Shopify/ WooCommerce-webshops die al adverteren of willen opschalen en betrouwbare data + privacy op orde willen."],
            ["Wat kost onderhoud?", "Vanaf € 250 per maand voor checks, kleine fixes en advies bij platformwijzigingen."],
          ].map(([q, a], i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <h3 style={{ margin: "0 0 6px" }}>{q}</h3>
              <p style={{ margin: 0, color: "#a3a3a3" }}>{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* OVER MIJ */}
      <section id="about" style={{ background: "#111", padding: "72px 16px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "grid", gap: 24, gridTemplateColumns: "1fr 1fr", alignItems: "center" }}>
          <img src="/rowan.jpg" alt="Rowan" style={{ width: "100%", borderRadius: 16, boxShadow: "0 8px 24px rgba(0,0,0,.5)" }} />
          <div>
            <h2 style={{ marginTop: 0, fontSize: 28 }}>Over mij</h2>
            <p style={{ color: "#e5e5e5" }}>
              Mijn naam is Rowan. Ik help webshops om hun metingen, advertentiekoppelingen en cookietoestemming goed in te richten.
            </p>
            <p style={{ color: "#a3a3a3" }}>
              Tijdens mijn studie AD e-commerce aan Hogeschool Windesheim ontdekte ik dat betere data leidt tot betere
              beslissingen — en dus tot groei.
            </p>
            <ul style={{ color: "#e5e5e5", paddingLeft: 18 }}>
              <li>Duidelijk en transparant</li>
              <li>Praktisch en snel toepasbaar</li>
              <li>Gericht op resultaat</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "72px 16px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: 28, marginBottom: 8 }}>Contact</h2>
          <p style={{ color: "#a3a3a3", marginBottom: 16 }}>Plan een sprint of stel je vraag direct.</p>
          <div style={{ display: "grid", gap: 10 }}>
            <p>📧 info@ecommeasure.com</p>
            <p>📞 +31 6 12345678</p>
            <p>📍 Zwolle, Nederland</p>
          </div>
        </div>
      </section>
    </div>
  );
}
