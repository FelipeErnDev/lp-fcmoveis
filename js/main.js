/**
 * FC Móveis sob Medida  Landing Page JS
 *
 * COMO TROCAR IMAGENS / ADICIONAR VÍDEOS:
 * Edite o array `projetos` abaixo.
 *
 * Tipos suportados:
 *   - tipo: "imagem"  ? { imagem, titulo, descricao, categoria? }
 *   - tipo: "video"   ? { video, poster?, titulo, descricao, categoria? }
 *   - tipo: "antes-depois" ? { antes, depois, titulo, descricao }
 *
 * Exemplos de vídeo (quando enviar os arquivos):
 *   {
 *     tipo: "video",
 *     video: "img/video-projeto-01.mp4",
 *     poster: "img/projeto-cozinha-01.jpg", // capa opcional
 *     titulo: "Tour pela cozinha planejada",
 *     descricao: "Vídeo do ambiente finalizado.",
 *     categoria: "Cozinha"
 *   }
 */

/* =========================================================
   DADOS  edite aqui para trocar mídia facilmente
   ========================================================= */

const projetos = [
  {
    tipo: "imagem",
    // TROCAR: /img/projeto-cozinha-01.jpg
    imagem: "img/projeto-cozinha-01.jpg",
    titulo: "Cozinha planejada minimalista",
    descricao:
      "Armários em cinza matte, ripado em madeira e bancada escura com iluminação LED linear.",
    categoria: "Cozinha",
  },
  {
    tipo: "imagem",
    // TROCAR: /img/projeto-cozinha-02.jpg
    imagem: "img/projeto-cozinha-02.jpg",
    titulo: "Cozinha com ripado e cooktop",
    descricao:
      "Layout em L com backsplash em madeira, torneira preta e acabamento handleless.",
    categoria: "Cozinha",
  },
  {
    tipo: "imagem",
    // TROCAR: /img/projeto-cozinha-03.jpg
    imagem: "img/projeto-cozinha-03.jpg",
    titulo: "Nicho em madeira com LED",
    descricao:
      "Detalhe do nicho iluminado, geladeira embutida e painel ripado  acabamento premium.",
    categoria: "Cozinha",
  },
  {
    tipo: "imagem",
    // TROCAR: /img/projeto-cozinha-04.jpg
    imagem: "img/projeto-cozinha-04.jpg",
    titulo: "Cozinha completa sob medida",
    descricao:
      "Ambiente integrado com torre de eletrodomésticos, iluminação embutida e linhas limpas.",
    categoria: "Cozinha",
  },
  {
    tipo: "imagem",
    // TROCAR: /img/projeto-quarto-01.jpg
    imagem: "img/projeto-quarto-01.jpg",
    titulo: "Suíte com painel ripado",
    descricao:
      "Painel de TV com LED, espelho iluminado e marcenaria integrada ao closet e cabeceira.",
    categoria: "Quarto",
  },


  {
    tipo: "video",
    video: "img/video-projeto-01.mp4",
    poster: "img/video-projeto-01-poster.jpg",
    titulo: "Tour pela cozinha planejada",
    descricao: "Percorra o ambiente finalizado e veja o acabamento sob medida em detalhes.",
    categoria: "Cozinha",
  },
  {
    tipo: "video",
    video: "img/video-projeto-02.mp4",
    poster: "img/video-projeto-02-poster.jpg",
    titulo: "Detalhes do projeto",
    descricao: "Enquadramentos que mostram o cuidado na marcenaria e na iluminação.",
    categoria: "Projeto",
  },
  {
    tipo: "video",
    video: "img/video-projeto-03.mp4",
    poster: "img/video-projeto-03-poster.jpg",
    titulo: "Ambiente sob medida",
    descricao: "Vídeo do projeto instalado, com acabamento premium do conceito à instalação.",
    categoria: "Projeto",
  },
  {
    tipo: "video",
    video: "img/video-projeto-04.mp4",
    poster: "img/video-projeto-04-poster.jpg",
    titulo: "Espaço planejado em vídeo",
    descricao: "Conheça o resultado final em movimento  qualidade FC Móveis sob Medida.",
    categoria: "Projeto",
  },

  /* Adicione mais itens aqui (imagem | video | antes-depois) */

];

const depoimentos = [
  {
    texto:
      "O projeto ficou exatamente como imaginávamos. Acabamento impecável e atendimento excelente do início ao fim.",
    autor: "Mariana S.",
  },
  {
    texto:
      "A visita técnica e o 3D fizeram toda a diferença. Entregaram no prazo e a instalação foi muito cuidadosa.",
    autor: "Ricardo & Ana",
  },
  {
    texto:
      "Transformaram nossa cozinha. Qualidade de material, iluminação e detalhes que elevam o ambiente.",
    autor: "Juliana P.",
  },
  {
    texto:
      "Recomendo de olhos fechados. Profissionais atenciosos e móveis sob medida de verdade.",
    autor: "Carlos Eduardo",
  },
];

/* =========================================================
   UTIL
   ========================================================= */

const WHATSAPP = "https://wa.me/5547991874477";

function $(sel, root = document) {
  return root.querySelector(sel);
}

function $$(sel, root = document) {
  return [...root.querySelectorAll(sel)];
}

/* =========================================================
   HEADER / MENU
   ========================================================= */

function initHeader() {
  const header = $("#header");
  const toggle = $("#menu-toggle");
  const nav = $("#nav");

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  toggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  });

  $$("#nav a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle?.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });
}

/* =========================================================
   GALERIA  carrossel com swipe + lightbox + vídeos
   ========================================================= */

function initGallery() {
  const track = $("#gallery-track");
  const dotsEl = $("#gallery-dots");
  const prevBtn = $("#gallery-prev");
  const nextBtn = $("#gallery-next");
  const adSection = $("#antes-depois");
  const adGrid = $("#antes-depois-grid");
  const tabs = $$("[data-gallery]");

  if (!track) return;

  const fotos = projetos.filter((p) => p.tipo === "imagem");
  const videos = projetos.filter((p) => p.tipo === "video");
  const antesDepois = projetos.filter((p) => p.tipo === "antes-depois");

  let mode = "fotos";
  let index = 0;
  let slidesData = fotos;

  function currentSlides() {
    return mode === "videos" ? videos : fotos;
  }

  function renderSlides() {
    slidesData = currentSlides();
    index = 0;

    if (!slidesData.length) {
      track.innerHTML = `
        <div class="carousel__slide">
          <p class="gallery-empty">Nenhum item nesta categoria ainda.</p>
        </div>`;
      dotsEl.innerHTML = "";
      window.__gallerySlides = [];
      track.style.transform = "translateX(0)";
      return;
    }

    track.innerHTML = slidesData
      .map((p, i) => {
        const media =
          p.tipo === "video"
            ? `
            <div class="slide__media" data-lightbox="${i}" role="button" tabindex="0" aria-label="Abrir vídeo: ${escapeHtml(p.titulo)}">
              <span class="slide__badge">Vídeo</span>
              <img src="${p.poster || p.video}" alt="${escapeHtml(p.titulo)}" loading="${i === 0 ? "eager" : "lazy"}" />
              <div class="slide__play" aria-hidden="true">
                <svg viewBox="0 0 64 64" fill="currentColor"><circle cx="32" cy="32" r="30" fill="rgba(12,12,12,0.55)" stroke="currentColor" stroke-width="1.5"/><path d="M26 20l22 12-22 12V20z"/></svg>
              </div>
            </div>`
            : `
            <div class="slide__media" data-lightbox="${i}" role="button" tabindex="0" aria-label="Ampliar: ${escapeHtml(p.titulo)}">
              <img src="${p.imagem}" alt="${escapeHtml(p.titulo)}" loading="${i === 0 ? "eager" : "lazy"}" />
            </div>`;

        return `
        <div class="carousel__slide" role="group" aria-roledescription="slide" aria-label="${i + 1} de ${slidesData.length}">
          <article class="slide">
            ${media}
            <div class="slide__info">
              ${p.categoria ? `<p class="slide__meta">${escapeHtml(p.categoria)}</p>` : ""}
              <h3>${escapeHtml(p.titulo)}</h3>
              <p>${escapeHtml(p.descricao || "")}</p>
            </div>
          </article>
        </div>`;
      })
      .join("");

    dotsEl.innerHTML = slidesData
      .map(
        (_, i) =>
          `<button class="carousel__dot${i === 0 ? " is-active" : ""}" type="button" aria-label="Ir para projeto ${i + 1}" data-index="${i}"></button>`
      )
      .join("");

    window.__gallerySlides = slidesData;
    goTo(0, false);
  }

  function goTo(i, animate = true) {
    const total = slidesData.length;
    if (!total) return;
    index = ((i % total) + total) % total;
    track.style.transition = animate ? "" : "none";
    track.style.transform = `translateX(-${index * 100}%)`;
    $$(".carousel__dot", dotsEl).forEach((d, di) => {
      d.classList.toggle("is-active", di === index);
    });
  }

  function setMode(next) {
    mode = next;
    tabs.forEach((tab) => {
      const active = tab.dataset.gallery === mode;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
    });
    renderSlides();
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => setMode(tab.dataset.gallery));
  });

  prevBtn?.addEventListener("click", () => goTo(index - 1));
  nextBtn?.addEventListener("click", () => goTo(index + 1));
  dotsEl?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-index]");
    if (btn) goTo(Number(btn.dataset.index));
  });

  // Touch / swipe
  const viewport = track.parentElement;
  let startX = 0;
  let deltaX = 0;
  let dragging = false;

  viewport.addEventListener(
    "touchstart",
    (e) => {
      dragging = true;
      startX = e.touches[0].clientX;
      deltaX = 0;
      track.style.transition = "none";
    },
    { passive: true }
  );

  viewport.addEventListener(
    "touchmove",
    (e) => {
      if (!dragging) return;
      deltaX = e.touches[0].clientX - startX;
      const width = viewport.offsetWidth;
      const offset = -index * width + deltaX;
      track.style.transform = `translateX(${offset}px)`;
    },
    { passive: true }
  );

  viewport.addEventListener("touchend", () => {
    if (!dragging) return;
    dragging = false;
    if (Math.abs(deltaX) > 50) {
      goTo(deltaX < 0 ? index + 1 : index - 1);
    } else {
      goTo(index);
    }
  });

  track.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      const media = e.target.closest("[data-lightbox]");
      if (media) {
        e.preventDefault();
        openLightbox(Number(media.dataset.lightbox));
      }
    }
  });

  track.addEventListener("click", (e) => {
    const media = e.target.closest("[data-lightbox]");
    if (media) openLightbox(Number(media.dataset.lightbox));
  });

  // Antes / Depois
  if (antesDepois.length && adSection && adGrid) {
    adSection.hidden = false;
    adSection.setAttribute("aria-hidden", "false");
    adGrid.innerHTML = antesDepois
      .map(
        (p, i) => `
        <article class="ad-item">
          <div class="ad-item__side" data-ad-lightbox="${i}" data-side="antes" role="button" tabindex="0">
            <img src="${p.antes}" alt="Antes — ${escapeHtml(p.titulo)}" loading="lazy" />
            <span class="ad-item__label">Antes</span>
          </div>
          <div class="ad-item__side" data-ad-lightbox="${i}" data-side="depois" role="button" tabindex="0">
            <img src="${p.depois}" alt="Depois — ${escapeHtml(p.titulo)}" loading="lazy" />
            <span class="ad-item__label">Depois</span>
          </div>
          <p class="ad-item__caption"><strong>${escapeHtml(p.titulo)}</strong> — ${escapeHtml(p.descricao || "")}</p>
        </article>`
      )
      .join("");

    adGrid.addEventListener("click", (e) => {
      const side = e.target.closest("[data-ad-lightbox]");
      if (!side) return;
      const item = antesDepois[Number(side.dataset.adLightbox)];
      const src = side.dataset.side === "antes" ? item.antes : item.depois;
      openLightboxMedia({
        tipo: "imagem",
        src,
        titulo: `${item.titulo} (${side.dataset.side})`,
      });
    });
  }

  window.__galleryGoTo = goTo;
  initLightbox();
  renderSlides();
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* =========================================================
   LIGHTBOX
   ========================================================= */

let lightboxIndex = 0;

function initLightbox() {
  const lb = $("#lightbox");
  const body = $("#lightbox-body");
  const caption = $("#lightbox-caption");
  const closeBtn = $("#lightbox-close");
  const prev = $("#lightbox-prev");
  const next = $("#lightbox-next");

  function render() {
    const slides = window.__gallerySlides || [];
    const p = slides[lightboxIndex];
    if (!p) return;

    if (p.tipo === "video") {
      body.innerHTML = `<video src="${p.video}" poster="${p.poster || ""}" controls autoplay playsinline muted></video>`;
    } else {
      body.innerHTML = `<img src="${p.imagem}" alt="${escapeHtml(p.titulo)}" />`;
    }
    caption.textContent = p.titulo + (p.descricao ? `  ${p.descricao}` : "");
  }

  window.openLightbox = function (i) {
    lightboxIndex = i;
    render();
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    document.body.classList.add("lightbox-open");
  };

  window.openLightboxMedia = function ({ tipo, src, titulo }) {
    if (tipo === "video") {
      body.innerHTML = `<video src="${src}" controls autoplay playsinline muted></video>`;
    } else {
      body.innerHTML = `<img src="${src}" alt="${escapeHtml(titulo)}" />`;
    }
    caption.textContent = titulo || "";
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    document.body.classList.add("lightbox-open");
  };

  function close() {
    lb.hidden = true;
    body.innerHTML = "";
    document.body.style.overflow = "";
    document.body.classList.remove("lightbox-open");
  }

  closeBtn?.addEventListener("click", close);
  lb?.addEventListener("click", (e) => {
    if (e.target === lb) close();
  });
  prev?.addEventListener("click", (e) => {
    e.stopPropagation();
    const slides = window.__gallerySlides || [];
    lightboxIndex = (lightboxIndex - 1 + slides.length) % slides.length;
    render();
  });
  next?.addEventListener("click", (e) => {
    e.stopPropagation();
    const slides = window.__gallerySlides || [];
    lightboxIndex = (lightboxIndex + 1) % slides.length;
    render();
  });

  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") prev?.click();
    if (e.key === "ArrowRight") next?.click();
  });
}

/* =========================================================
   DEPOIMENTOS
   ========================================================= */

function initTestimonials() {
  const track = $("#testimonials-track");
  const dotsEl = $("#testimonials-dots");
  const prev = $("#testimonial-prev");
  const next = $("#testimonial-next");
  if (!track) return;

  track.innerHTML = depoimentos
    .map(
      (d) => `
      <blockquote class="testimonial">
        <p class="testimonial__quote">&ldquo;${escapeHtml(d.texto)}&rdquo;</p>
        <footer class="testimonial__author">${escapeHtml(d.autor)}</footer>
      </blockquote>`
    )
    .join("");

  dotsEl.innerHTML = depoimentos
    .map(
      (_, i) =>
        `<button class="carousel__dot${i === 0 ? " is-active" : ""}" type="button" data-index="${i}" aria-label="Depoimento ${i + 1}"></button>`
    )
    .join("");

  let index = 0;
  const total = depoimentos.length;

  function goTo(i) {
    index = ((i % total) + total) % total;
    track.style.transform = `translateX(-${index * 100}%)`;
    $$(".carousel__dot", dotsEl).forEach((d, di) => {
      d.classList.toggle("is-active", di === index);
    });
  }

  prev?.addEventListener("click", () => goTo(index - 1));
  next?.addEventListener("click", () => goTo(index + 1));
  dotsEl?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-index]");
    if (btn) goTo(Number(btn.dataset.index));
  });

  // Auto-rotate
  let timer = setInterval(() => goTo(index + 1), 6000);
  const root = $("#testimonials");
  root?.addEventListener("mouseenter", () => clearInterval(timer));
  root?.addEventListener("mouseleave", () => {
    timer = setInterval(() => goTo(index + 1), 6000);
  });
}

/* =========================================================
   REVEAL ON SCROLL
   ========================================================= */

function initReveal() {
  const targets = [
    ...$$(".section__head"),
    ...$$(".ambiente"),
    ...$$(".cta-final__inner"),
  ];

  targets.forEach((el) => {
    el.classList.add("reveal");
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  targets.forEach((el, i) => {
    if (el.classList.contains("ambiente")) {
      el.style.transitionDelay = `${(i % 5) * 80}ms`;
    }
    io.observe(el);
  });
}

/* =========================================================
   INIT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  initHeader();
  initGallery();
  initTestimonials();
  initReveal();
});
