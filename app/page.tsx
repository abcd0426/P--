"use client";

import { useEffect, useMemo, useState } from "react";

type ChecklistItem = {
  id: string;
  label: string;
  category: string;
};

const itinerary = {
  day1: [
    { time: "06:30", title: "新北出發", note: "早餐上車，向南追一條藍色地平線", tag: "GO" },
    { time: "11:30", title: "車城午餐", note: "補充能量，準備進入海洋的下午", tag: "EAT" },
    { time: "13:00", title: "國立海生館", note: "企鵝、珊瑚與海底隧道的第一站", tag: "DIVE" },
    { time: "17:30", title: "入住恆春", note: "放下行李，把傍晚留給家人", tag: "REST" },
    { time: "19:00", title: "南國晚餐", note: "慢慢吃，交換今天最喜歡的一種魚", tag: "GLOW" },
  ],
  day2: [
    { time: "08:30", title: "後灣慢早餐", note: "陽光、麵包與不用趕時間的早晨", tag: "RISE" },
    { time: "10:00", title: "萬里桐潮間帶", note: "看寄居蟹與小魚；安全第一、跟著潮汐走", tag: "PLAY" },
    { time: "12:30", title: "海邊午餐", note: "孩子的笑聲和一桌南國料理", tag: "EAT" },
    { time: "15:00", title: "回到新北", note: "把海的顏色留在相簿，也留在心裡", tag: "HOME" },
  ],
};

const defaultChecklist: ChecklistItem[] = [
  { id: "id", label: "身分證件", category: "重要" },
  { id: "swim", label: "泳衣與快乾毛巾", category: "海上" },
  { id: "sun", label: "海洋友善防曬", category: "防護" },
  { id: "meds", label: "暈船藥", category: "健康" },
  { id: "power", label: "行動電源", category: "裝備" },
  { id: "bottle", label: "環保水壺", category: "日用" },
];

const budget = [
  { label: "住宿", amount: 4800, color: "coral" },
  { label: "海生館門票", amount: 1500, color: "aqua" },
  { label: "餐費", amount: 2200, color: "sun" },
  { label: "交通", amount: 2500, color: "ink" },
];

const navItems = [
  ["行程", "day1"],
  ["清單", "checklist"],
  ["預算", "budget"],
  ["地圖", "map"],
];

function ThemeButton() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("ocean-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const enabled = stored ? stored === "dark" : prefersDark;
    setDark(enabled);
    document.documentElement.dataset.theme = enabled ? "dark" : "light";
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    localStorage.setItem("ocean-theme", next ? "dark" : "light");
  }

  return (
    <button className="theme-button" onClick={toggle} aria-label={dark ? "切換亮色模式" : "切換深色模式"}>
      <span className="theme-dot" aria-hidden="true" />
      {dark ? "Light" : "Dark"}
    </button>
  );
}

function Timeline({ day, items }: { day: string; items: typeof itinerary.day1 }) {
  return (
    <div className="day-panel">
      <div className="day-panel-head">
        <p>{day}</p>
        <span>{items.length} stops</span>
      </div>
      <div className="timeline">
        {items.map((item, index) => (
          <article className="timeline-item" key={item.time}>
            <time>{item.time}</time>
            <div className="timeline-rail" aria-hidden="true">
              <span />
            </div>
            <div className="timeline-card">
              <div>
                <small>{item.tag}</small>
                <h3>{item.title}</h3>
                <p>{item.note}</p>
              </div>
              <b aria-label={`第 ${index + 1} 站`}>{String(index + 1).padStart(2, "0")}</b>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [checked, setChecked] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("ocean-checklist") || "[]");
      if (Array.isArray(saved)) setChecked(saved);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem("ocean-checklist", JSON.stringify(checked));
  }, [checked, loaded]);

  const progress = Math.round((checked.length / defaultChecklist.length) * 100);
  const totalBudget = useMemo(() => budget.reduce((sum, item) => sum + item.amount, 0), []);
  const mapKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const mapSrc = mapKey
    ? `https://www.google.com/maps/embed/v1/place?key=${mapKey}&q=National+Museum+of+Marine+Biology+and+Aquarium,Taiwan&zoom=10`
    : "https://www.google.com/maps?q=National+Museum+of+Marine+Biology+and+Aquarium,Taiwan&z=10&output=embed";

  function toggleItem(id: string) {
    setChecked((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Ocean Trip 首頁">
          <span className="brand-mark" aria-hidden="true">O</span>
          <span>Family Ocean Trip</span>
        </a>
        <nav aria-label="主要導覽">
          {navItems.map(([label, id]) => <a href={`#${id}`} key={id}>{label}</a>)}
        </nav>
        <ThemeButton />
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">FAMILY OCEAN TRIP · V2.0</p>
          <h1>把兩天，<br />交給海。</h1>
          <p className="hero-lead">從新北到屏東，一場看見企鵝、珊瑚與海底隧道的親子小旅行。<br />少一點趕路，多一點一起驚嘆。</p>
          <div className="hero-actions">
            <a className="primary-button" href="#day1">開始旅程 <span>↓</span></a>
            <p><b>2</b> days　<b>9</b> stops　<b>1</b> family memory</p>
          </div>
        </div>
        <div className="hero-orbit" aria-label="海洋動態視覺">
          <div className="sun-disc" />
          <div className="boat"><span /><i /></div>
          <div className="wave wave-one" />
          <div className="wave wave-two" />
          <div className="wave wave-three" />
          <div className="hero-stamp">22°03&apos;N<br />120°42&apos;E</div>
        </div>
        <div className="scroll-note"><span /> SCROLL TO DRIFT</div>
      </section>

      <section className="story section-shell">
        <div className="story-photo"><img src="https://images.unsplash.com/photo-1544550285-f813152fb2fd?auto=format&fit=crop&w=1400&q=85" alt="陽光穿過海面" /></div>
        <div className="story-copy"><p className="eyebrow">A SMALL FAMILY STORY</p><h2>旅行不必跑很多地方，<br />一起看很久就夠了。</h2><p>把行程留白給孩子的問題、海邊的風，和一張張不需要擺拍的照片。這次，我們往南，去海生館的藍裡慢慢走。</p></div>
      </section>

      <section className="intro section-shell" id="day1">
        <div className="section-heading">
          <p className="eyebrow">THE ITINERARY</p>
          <h2>順著潮汐，<br />走進兩日藍圖。</h2>
        </div>
        <p className="section-note">每個停靠點都留一點空白，<br />讓意外成為旅程最好看的部分。</p>
      </section>

      <section className="itinerary section-shell" aria-label="兩日行程">
        <Timeline day="DAY 01 · INTO THE BLUE" items={itinerary.day1} />
        <div id="day2"><Timeline day="DAY 02 · ISLAND SLOW" items={itinerary.day2} /></div>
      </section>

      <section className="attractions section-shell" id="attractions">
        <div className="section-heading"><p className="eyebrow">UNDER THE SURFACE</p><h2>四個，孩子會<br />記很久的畫面。</h2></div>
        <div className="attraction-grid">
          {[
            ["企鵝", "看牠們像小紳士一樣游過眼前", "PENGUIN"],
            ["珊瑚", "把一座微小而熱鬧的城市看清楚", "CORAL"],
            ["世界水域", "從臺灣出發，認識遠方的海", "WATERS"],
            ["海底隧道", "抬頭時，整片藍在頭頂流動", "TUNNEL"],
          ].map(([title, note, tag], index) => <article className="attraction-card" key={title}><span>0{index + 1}</span><i>{tag}</i><h3>{title}</h3><p>{note}</p><b>↗</b></article>)}
        </div>
      </section>

      <section className="beach-section" id="beach">
        <div className="section-shell beach-heading"><div><p className="eyebrow">SAND, TIDE, PAUSE</p><h2>第二天，去海邊<br />把時間放慢。</h2></div><p>兩個適合親子停下來的海岸，<br />請依當日潮汐與現場安全指示安排。</p></div>
        <div className="beach-scroll section-shell">
          <article className="beach-card"><img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85" alt="後灣海岸" /><div><small>01 · CALM MORNING</small><h3>後灣</h3><p>適合：散步、看海、慢慢吃早餐</p><b>提醒：沿岸停留，留意孩子與浪況</b></div></article>
          <article className="beach-card"><img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=85" alt="萬里桐潮間帶" /><div><small>02 · TIDE POOL</small><h3>萬里桐</h3><p>適合：潮間帶觀察、浮潛、認識小生物</p><b>提醒：穿防滑鞋、勿踩踏珊瑚</b></div></article>
        </div>
      </section>

      <section className="checklist-section" id="checklist">
        <div className="section-shell checklist-grid">
          <div className="checklist-copy">
            <p className="eyebrow">PACK LIGHT</p>
            <h2>只帶需要的，<br />其餘交給海風。</h2>
            <div className="progress-block">
              <div><span>打包進度</span><b>{progress}%</b></div>
              <div className="progress-track"><i style={{ width: `${progress}%` }} /></div>
              <small>{checked.length} / {defaultChecklist.length} 已準備</small>
            </div>
          </div>
          <div className="checklist" aria-live="polite">
            {defaultChecklist.map((item) => {
              const done = checked.includes(item.id);
              return (
                <label className={done ? "check-row done" : "check-row"} key={item.id}>
                  <input type="checkbox" checked={done} onChange={() => toggleItem(item.id)} />
                  <span className="custom-check" aria-hidden="true">{done ? "✓" : ""}</span>
                  <span className="check-label">{item.label}</span>
                  <small>{item.category}</small>
                </label>
              );
            })}
            <button className="reset-button" onClick={() => setChecked([])}>全部重設</button>
          </div>
        </div>
      </section>

      <section className="budget-section section-shell" id="budget">
        <div className="section-heading budget-head">
          <div>
            <p className="eyebrow">TRIP BUDGET</p>
            <h2>花在值得的<br />海上時光。</h2>
          </div>
          <div className="budget-total">
            <span>預估總額 / PERSON</span>
            <strong><small>NT$</small>{totalBudget.toLocaleString()}</strong>
          </div>
        </div>
        <div className="budget-cards">
          {budget.map((item, index) => (
            <article className={`budget-card ${item.color}`} key={item.label} style={{ "--delay": `${index * 0.12}s` } as React.CSSProperties}>
              <div><span>0{index + 1}</span><i /></div>
              <h3>{item.label}</h3>
              <strong>NT$ {item.amount.toLocaleString()}</strong>
              <div className="budget-bar"><i style={{ width: `${(item.amount / totalBudget) * 100}%` }} /></div>
            </article>
          ))}
        </div>
      </section>

      <section className="map-section" id="map">
        <div className="section-shell map-copy">
          <div>
            <p className="eyebrow">MEET THE HORIZON</p>
            <h2>目的地：<br />屏東海生館。</h2>
          </div>
          <p>新北 ↓ 車城 ↓ 海生館 ↓ 恆春住宿 ↓ 海邊<br />地圖載入後可直接縮放與探索。</p>
        </div>
        <div className="map-frame">
          <iframe
            title="國立海洋生物博物館 Google 地圖"
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <div className="map-label"><span>DESTINATION</span><b>海生館 · PINGTUNG</b></div>
        </div>
      </section>

      <footer>
        <div className="footer-mark">FAMILY<br />OCEAN</div>
        <p>V2.0 · Last updated 2026.07<br />Two days. One blue memory.</p>
        <a href="https://github.com" target="_blank" rel="noreferrer">GITHUB ↗</a>
      </footer>
    </main>
  );
}
