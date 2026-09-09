import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Image as ImageIcon,
  MapPin,
  Menu,
  Phone,
  Search,
  Sparkles,
  X,
} from "lucide-react";

const asset = (name: string) => `${import.meta.env.BASE_URL}menu/${name}`;

type Category = "الكل" | "الفطار" | "الأطباق الرئيسية" | "المشويات" | "الأسماك" | "المشروبات";

type MenuImage = {
  id: number;
  src: string;
  title: string;
  category: Exclude<Category, "الكل">;
  description: string;
  page: string;
};

const menuImages: MenuImage[] = [
  {
    id: 1,
    src: asset("01.jpg"),
    title: "قائمة المشروبات",
    category: "المشروبات",
    description: "عصائر طازجة، موهيتو، قهوة ومشروبات باردة",
    page: "01",
  },
  {
    id: 2,
    src: asset("02.jpg"),
    title: "الفطار",
    category: "الفطار",
    description: "وجبات الفطار الشرقي والبيض والطواجن",
    page: "02",
  },
  {
    id: 3,
    src: asset("03.jpg"),
    title: "مشروبات ساخنة وباردة",
    category: "المشروبات",
    description: "سموزي، عصائر، شاي وقهوة",
    page: "03",
  },
  {
    id: 4,
    src: asset("04.jpg"),
    title: "الولائم والوجبات العائلية",
    category: "الأطباق الرئيسية",
    description: "اختيارات العائلة والوجبات الكبيرة",
    page: "04",
  },
  {
    id: 5,
    src: asset("05.jpg"),
    title: "المشويات",
    category: "المشويات",
    description: "مشويات مشكلة، كباب، كفتة وشيش طاووق",
    page: "05",
  },
  {
    id: 6,
    src: asset("06.jpg"),
    title: "الأرز وصيد اليوم",
    category: "الأسماك",
    description: "أرز مصري وصيادية وأسماك مختارة",
    page: "06",
  },
  {
    id: 7,
    src: asset("07.jpg"),
    title: "الأطباق الرئيسية",
    category: "الأطباق الرئيسية",
    description: "أطباق اللحوم والدجاج والطواجن",
    page: "07",
  },
  {
    id: 8,
    src: asset("08.jpg"),
    title: "الركن الإيطالي",
    category: "الأطباق الرئيسية",
    description: "بيتزا ومكرونة وأطباق إيطالية",
    page: "08",
  },
];

const categories: Category[] = ["الكل", "الفطار", "الأطباق الرئيسية", "المشويات", "الأسماك", "المشروبات"];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>("الكل");
  const [selected, setSelected] = useState<MenuImage | null>(null);
  const [query, setQuery] = useState("");
  const [mobileNav, setMobileNav] = useState(false);

  const visibleImages = useMemo(() => {
    return menuImages.filter((image) => {
      const matchesCategory = activeCategory === "الكل" || image.category === activeCategory;
      const searchable = `${image.title} ${image.category} ${image.description}`;
      return matchesCategory && searchable.includes(query.trim());
    });
  }, [activeCategory, query]);

  const selectedIndex = selected ? menuImages.findIndex((image) => image.id === selected.id) : -1;

  const showNext = () => {
    if (selectedIndex < 0) return;
    setSelected(menuImages[(selectedIndex + 1) % menuImages.length]);
  };

  const showPrevious = () => {
    if (selectedIndex < 0) return;
    setSelected(menuImages[(selectedIndex - 1 + menuImages.length) % menuImages.length]);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!selected) return;
      if (event.key === "Escape") setSelected(null);
      if (event.key === "ArrowRight") showPrevious();
      if (event.key === "ArrowLeft") showNext();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [selected, selectedIndex]);

  return (
    <div className="site-shell" dir="rtl">
      <div className="top-ribbon">
        <div className="container ribbon-inner">
          <span><Sparkles size={14} /> طعم أصيل بجو على النيل</span>
          <span className="ribbon-separator">•</span>
          <span>فندق الفنار أزور — سوهاج</span>
        </div>
      </div>

      <header className="site-header">
        <div className="container nav-inner">
          <a className="brand" href="#top" aria-label="منيو مطعم الملك فاروق">
            <img className="brand-logo" src={asset("logo.png")} alt="شعار مطعم الملك فاروق" />
            <span>
              <strong>الملك فاروق</strong>
              <small>مطعم وكافيه</small>
            </span>
          </a>
          <button className="mobile-menu-button" onClick={() => setMobileNav(!mobileNav)} aria-label="فتح القائمة">
            {mobileNav ? <X size={22} /> : <Menu size={22} />}
          </button>
          <nav className={`main-nav ${mobileNav ? "is-open" : ""}`} aria-label="التنقل الرئيسي">
            <a href="#menu" onClick={() => setMobileNav(false)}>المنيو</a>
            <a href="#about" onClick={() => setMobileNav(false)}>عن المطعم</a>
            <a href="#contact" onClick={() => setMobileNav(false)}>تواصل معنا</a>
            <a className="nav-cta" href="tel:01070633307"><Phone size={16} /> احجز الآن</a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-pattern" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow"><span /> منيو المطعم <span /></div>
              <h1>كل اللي بتحبه،<br /><em>في مكان واحد.</em></h1>
              <p>تصفح منيو مطعم الملك فاروق في سوهاج — أطباق شرقية أصيلة، مشويات شهية، صيد اليوم ومشروبات على مزاجك.</p>
              <div className="hero-actions">
                <a href="#menu" className="primary-button">استكشف المنيو <ArrowLeft size={18} /></a>
                <a href="https://wa.me/201070633307?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D9%84%D8%AD%D8%AC%D8%B2%20%D9%85%D9%86%20%D9%85%D8%B7%D8%B9%D9%85%20%D8%A7%D9%84%D9%85%D9%84%D9%83%20%D9%81%D8%A7%D8%B1%D9%88%D9%82" target="_blank" rel="noreferrer" className="secondary-button">احجز على واتساب <ExternalLink size={16} /></a>
              </div>
              <div className="hero-meta">
                <a href="https://www.google.com/maps/search/?api=1&query=%D9%81%D9%86%D8%AF%D9%82%20%D8%A7%D9%84%D9%81%D9%86%D8%A7%D8%B1%20%D8%A3%D8%B2%D9%88%D8%B1%20%D8%B3%D9%88%D9%87%D8%A7%D8%AC"><MapPin size={17} /><span>سوهاج — شارع البحر</span></a>
                <a href="tel:01070633307"><Phone size={17} /><span>01070633307</span></a>
              </div>
            </div>
            <div className="hero-art" aria-label="صور من المنيو">
              <div className="hero-frame hero-frame-back"><img src={asset("05.jpg")} alt="مشويات مطعم الملك فاروق" /></div>
              <div className="hero-frame hero-frame-front"><img src={asset("07.jpg")} alt="أطباق مطعم الملك فاروق" /></div>
              <div className="hero-stamp"><span>طعم</span><strong>أصيل</strong><small>منذ البداية</small></div>
            </div>
          </div>
        </section>

        <section className="menu-section" id="menu">
          <div className="container">
            <div className="section-heading">
              <div>
                <div className="eyebrow eyebrow-dark"><span /> اختار مزاجك <span /></div>
                <h2>صفحات <em>المنيو</em></h2>
                <p>اضغط على أي صورة لعرضها بالحجم الكامل</p>
              </div>
              <div className="menu-count"><strong>{visibleImages.length}</strong><span>صور معروضة</span></div>
            </div>

            <div className="menu-toolbar">
              <div className="category-tabs" role="tablist" aria-label="تصنيف صفحات المنيو">
                {categories.map((category) => (
                  <button key={category} className={activeCategory === category ? "active" : ""} onClick={() => setActiveCategory(category)}>{category}</button>
                ))}
              </div>
              <label className="search-box">
                <Search size={17} />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث في الأقسام..." aria-label="البحث في أقسام المنيو" />
              </label>
            </div>

            <div className="gallery-grid">
              {visibleImages.map((image, index) => (
                <button className={`menu-card ${index === 0 ? "featured" : ""}`} key={image.id} onClick={() => setSelected(image)} aria-label={`فتح ${image.title}`}>
                  <div className="card-image-wrap"><img src={image.src} alt={image.title} loading={index > 1 ? "lazy" : "eager"} /><span className="zoom-hint"><ImageIcon size={15} /> تكبير</span></div>
                  <div className="card-info"><div><span className="card-number">{image.page}</span><div><h3>{image.title}</h3><p>{image.description}</p></div></div><ChevronLeft size={18} /></div>
                </button>
              ))}
            </div>
            {visibleImages.length === 0 && <div className="empty-state">لا توجد صفحة بهذا البحث. جرّب قسمًا آخر.</div>}
            <div className="gallery-note"><span>اضغط على أي صورة لعرضها بالحجم الكامل والتنقل بين صفحات المنيو.</span><a href="https://wa.me/201070633307?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D9%84%D8%AD%D8%AC%D8%B2" target="_blank" rel="noreferrer">واتساب للحجز <ExternalLink size={14} /></a></div>
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="container about-grid">
            <div className="about-card"><span className="quote-mark">“</span><h2>الأكل الحلو<br /><em>يلم العيلة.</em></h2><p>من أول الفطار لحد قعدة العشا، بنحضر أكلنا بحب ونقدمه في أجواء هادية على كورنيش النيل.</p><a href="https://wa.me/201070633307?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D9%84%D8%AD%D8%AC%D8%B2" target="_blank" rel="noreferrer">احجز على واتساب <ArrowLeft size={17} /></a></div>
            <div className="about-details"><div className="eyebrow eyebrow-dark"><span /> في انتظارك <span /></div><h2>تعالى جرّب<br /><em>طعم الملك.</em></h2><div className="detail-list"><a href="https://www.google.com/maps/search/?api=1&query=%D9%81%D9%86%D8%AF%D9%82%20%D8%A7%D9%84%D9%81%D9%86%D8%A7%D8%B1%20%D8%A3%D8%B2%D9%88%D8%B1%20%D8%B3%D9%88%D9%87%D8%A7%D8%AC"><span className="detail-icon"><MapPin size={18} /></span><div><strong>العنوان</strong><p>سوهاج، شارع البحر، داخل فندق الفنار أزور</p></div></a><a href="tel:01070633307"><span className="detail-icon"><Phone size={18} /></span><div><strong>للحجز والاستفسار</strong><p>01070633307 — اضغط للاتصال</p></div></a></div></div>
          </div>
        </section>
      </main>

      <footer className="site-footer" id="contact"><div className="container footer-inner"><div className="brand footer-brand"><img className="brand-logo" src={asset("logo.png")} alt="شعار مطعم الملك فاروق" /><span><strong>الملك فاروق</strong><small>مطعم وكافيه</small></span></div><p>طعم أصيل بجو على النيل</p><div className="footer-links"><a href="tel:01070633307">01070633307</a><a href="https://wa.me/201070633307" target="_blank" rel="noreferrer">واتساب</a></div></div></footer>

      {selected && <div className="lightbox" role="dialog" aria-modal="true" aria-label={selected.title} onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}>
        <button className="lightbox-close" onClick={() => setSelected(null)} aria-label="إغلاق"><X size={22} /></button>
        <button className="lightbox-arrow lightbox-next" onClick={showNext} aria-label="الصورة التالية"><ChevronLeft size={28} /></button>
        <div className="lightbox-content"><div className="lightbox-image"><img src={selected.src} alt={selected.title} /></div><div className="lightbox-caption"><span>{selected.category}</span><h2>{selected.title}</h2><p>{selected.description}</p></div></div>
        <button className="lightbox-arrow lightbox-prev" onClick={showPrevious} aria-label="الصورة السابقة"><ChevronRight size={28} /></button>
      </div>}
    </div>
  );
}
