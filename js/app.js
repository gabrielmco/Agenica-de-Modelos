document.addEventListener("DOMContentLoaded", () => {
  // Configuração inicial para evitar FOUC
  gsap.set(".hero__header, .hero__text, .hero__actions", {
    visibility: "visible"
  });

  // Smooth scroll para anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Timeline Hero
  const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

  tl.fromTo(
    ".hero__header",
    { y: 80, opacity: 0, scale: 0.95 },
    { y: 0, opacity: 1, scale: 1, duration: 2, delay: 0.1 }
  )
    .fromTo(
      ".hero__text",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.8 },
      "-=1.5"
    )
    .fromTo(
      ".hero__actions",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.8 },
      "-=1.5"
    );

  /* ==========================================================================
     Works Section - Acordeão Sincronizado (Click Mútuo)
     ========================================================================== */
  const cards = document.querySelectorAll('.works__card');
  const listItems = document.querySelectorAll('.works__models-list li');

  // Função central para mudar os estados
  function syncAccordion(index) {
    cards.forEach((c, i) => {
      c.classList.remove('active');
      c.setAttribute('aria-expanded', 'false');
    });
    listItems.forEach(li => li.classList.remove('active'));

    if (cards[index]) {
      cards[index].classList.add('active');
      cards[index].setAttribute('aria-expanded', 'true');
    }
    if (listItems[index]) listItems[index].classList.add('active');
  }

  // Click nos CARDS:
  cards.forEach((card, index) => {
    card.addEventListener('click', () => syncAccordion(index));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        syncAccordion(index);
      }
    });
  });

  // Click nos TEXTOS da lista:
  listItems.forEach((li, index) => {
    li.addEventListener('click', () => syncAccordion(index));
    li.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        syncAccordion(index);
      }
    });
  });

  /* ==========================================================================
     Services Section - Carousel
     ========================================================================== */
  const servicesData = [
    {
      img: "./imgs/services-carrossel-1.webp",
      count: "01/06",
      title: "ESTRATÉGIA DE MARCA",
      desc1: "REVELAMOS A ESSÊNCIA DO SEU NEGÓCIO—DEFININDO POSIÇÃO, VOZ E DIREÇÃO PARA ERGUER UMA BASE SÓLIDA.",
      desc2: "POR MEIO DE PESQUISA PROFUNDA E RACIOCÍNIO AFIADO, IDENTIFICAMOS O QUE DIFERENCIA VOCÊ. DO PÚBLICO AO CENÁRIO COMPETITIVO, CADA DECISÃO É MOLDADA COM INTENÇÃO—GARANTINDO QUE SUA MARCA NÃO SEJA APENAS VISTA, MAS COMPREENDIDA. AQUI, CLAREZA SUBSTITUI SUPOSIÇÃO E SUA MARCA ASSUME SUA FORMA REAL."
    },
    {
      img: "./imgs/servicescarrossel-2.webp",
      count: "02/06",
      title: "IDENTIDADE VISUAL",
      desc1: "FORJAMOS A LINGUAGEM VISUAL QUE TRADUZ A ESSÊNCIA DA SUA MARCA.",
      desc2: "DESENHAMOS SISTEMAS VISUAIS COMPLETOS—DO LOGOTIPO À TIPOGRAFIA, DA PALETA DE CORES AO ESTILO DE IMAGEM—GARANTINDO COESÃO EM TODOS OS PONTOS DE CONTATO."
    },
    {
      img: "./imgs/accordion-1.webp",
      count: "03/06",
      title: "EXPERIÊNCIA DIGITAL",
      desc1: "ARQUITETAMOS JORNADAS DIGITAIS FLUIDAS QUE CATIVAM E CONVERTEM.",
      desc2: "DE SITES RESPONSIVOS A LANDING PAGES IMERSIVAS, CADA PIXEL É PROJETADO PARA PERFORMANCE. UNIMOS ESTÉTICA E USABILIDADE, CRIANDO INTERFACES QUE PARECEM INTUITIVAS E SURPREENDEM—TRANSFORMANDO VISITANTES EM DEFENSORES FIÉIS."
    },
    {
      img: "./imgs/accordion-4.webp",
      count: "04/06",
      title: "DIREÇÃO DE CONTEÚDO",
      desc1: "MOLDAMOS A NARRATIVA QUE DÁ À SUA MARCA UMA VOZ QUE VALE SEGUIR.",
      desc2: "COM ESTRATÉGIA EDITORIAL, DIREÇÃO DE ARTE E REDAÇÃO, CRIAMOS ECOSSISTEMAS DE CONTEÚDO QUE EDUCAM, INSPIRAM E VENDEM. CADA PALAVRA E IMAGEM É CALIBRADA PARA REFORÇAR SEU POSICIONAMENTO E APROFUNDAR A CONEXÃO."
    },
    {
      img: "./imgs/card-1.webp",
      count: "05/06",
      title: "MOTION & FILME",
      desc1: "DAMOS VIDA A MARCAS POR MEIO DE NARRATIVA CINEMATOGRÁFICA E MOTION DESIGN.",
      desc2: "DE FILMES DE MARCA A CONTEÚDO SOCIAL, PRODUZIMOS NARRATIVAS VISUAIS QUE CAPTURAM ATENÇÃO NUM MUNDO DE SCROLL INFINITO. CADA FRAME É DELIBERADO—FEITO PARA EVOCAR EMOÇÃO E AMPLIFICAR SUA MENSAGEM EM TODAS AS PLATAFORMAS."
    },
    {
      img: "./imgs/card-2.webp",
      count: "06/06",
      title: "EMBALAGEM & IMPRESSO",
      desc1: "DESENHAMOS EXPERIÊNCIAS TÁTEIS QUE LEVAM SUA MARCA AO MUNDO FÍSICO.",
      desc2: "DE EMBALAGENS DE LUXO A IMPRESSOS EDITORIAIS, CRIAMOS MATERIAIS QUE PARECEM TÃO PREMIUM QUANTO SÃO. CADA TEXTURA, DOBRA E ACABAMENTO É PENSADO—GARANTINDO UMA IMPRESSÃO DURADOURA ALÉM DA TELA."
    }
  ];

  let currentServiceIndex = 0;
  const btnPrev = document.getElementById("btn-prev");
  const btnNext = document.getElementById("btn-next");
  const serviceImg = document.getElementById("service-img");
  const serviceCount = document.getElementById("service-count");
  const serviceTitle = document.getElementById("service-title");
  const serviceDesc1 = document.getElementById("service-desc-1");
  const serviceDesc2 = document.getElementById("service-desc-2");

  let isCarouselAnimating = false;

  function updateServiceCarousel(index) {
    if (isCarouselAnimating) return;
    isCarouselAnimating = true;
    const data = servicesData[index];
    // Fase 1: Fade out
    gsap.to([serviceImg, serviceCount, serviceTitle, serviceDesc1, serviceDesc2], {
      opacity: 0,
      y: -10,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        // Reset explícito de qualquer transform residual antes de trocar a imagem
        gsap.set(serviceImg, { clearProps: "transform,y" });
        serviceImg.src = data.img;
        serviceCount.textContent = data.count;
        serviceTitle.textContent = data.title;
        serviceDesc1.textContent = data.desc1;
        serviceDesc2.textContent = data.desc2;

        // Fase 2: Fade in simples (sem scale — evita deslocamento com position:absolute)
        gsap.fromTo(serviceImg,
          { opacity: 0 },
          { opacity: 1, duration: 0.6, ease: "power2.out" }
        );
        gsap.fromTo([serviceCount, serviceTitle, serviceDesc1, serviceDesc2],
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power2.out",
            onComplete: () => { isCarouselAnimating = false; }
          }
        );
      }
    });
  }

  if (btnPrev && btnNext) {
    btnNext.addEventListener('click', () => {
      currentServiceIndex = (currentServiceIndex + 1) % servicesData.length;
      updateServiceCarousel(currentServiceIndex);
    });

    btnPrev.addEventListener('click', () => {
      currentServiceIndex = (currentServiceIndex - 1 + servicesData.length) % servicesData.length;
      updateServiceCarousel(currentServiceIndex);
    });
  }

  /* ==========================================================================
     AWWWARDS LEVEL SCROLL ANIMATIONS (Motor Reverse Consertado)
     ========================================================================== */
  gsap.registerPlugin(ScrollTrigger);

  // 1. HELPER FUNCTION: Fatiador de Palavras
  function splitTextIntoWords(element) {
    if (element.dataset.splitDone) return; // Guarda de idempotência
    element.dataset.splitDone = 'true';
    const childNodes = Array.from(element.childNodes);
    childNodes.forEach(node => {
      if (node.nodeType === 3) {
        const text = node.nodeValue;
        if (text.trim() === "") return;
        const words = text.split(/(\s+)/);
        const fragment = document.createDocumentFragment();

        words.forEach(word => {
          if (word.trim() === "") {
            fragment.appendChild(document.createTextNode(word));
          } else {
            const span = document.createElement('span');
            span.style.display = 'inline-block';
            span.className = 'reveal-word';
            span.textContent = word;
            fragment.appendChild(span);
          }
        });
        element.replaceChild(fragment, node);
      } else if (node.nodeType === 1 && node.tagName !== 'BR') {
        splitTextIntoWords(node);
      }
    });
  }

  // 2. TEXT REVEAL: Timeline Pré-Compilada (REVERSE NATIVO)
  const textRevealElements = [
    ".about__manifesto p",
    ".services__statement-title"
  ];

  textRevealElements.forEach((selector) => {
    const el = document.querySelector(selector);
    if (!el) return;

    splitTextIntoWords(el);
    const words = el.querySelectorAll('.reveal-word');

    // Timeline pré-compilada: fromTo garante estados iniciais inquebráveis
    const revealTl = gsap.timeline({ paused: true });
    revealTl.fromTo(words,
      { opacity: 0, y: 30, rotationX: -20 },
      { opacity: 1, y: 0, rotationX: 0, duration: 1.2, stagger: 0.03, ease: "power3.out" }
    );

    // ScrollTrigger apenas dá Play e Reverse — ZERO lógica manual
    ScrollTrigger.create({
      trigger: el,
      start: "top 75%",
      onEnter: () => revealTl.play(),
      onLeaveBack: () => revealTl.reverse()
    });
  });

  // 3. INVERSE REVEAL (Para o Logótipo do Footer)
  gsap.fromTo(".footer__brand",
    { opacity: 0, y: 100, scale: 0.95 },
    {
      opacity: 1, y: 0, scale: 1, duration: 2, ease: "expo.out",
      scrollTrigger: {
        trigger: ".footer__brand",
        start: "top 75%",
        end: "bottom 20%",
        toggleActions: "play reverse play reverse"
      }
    }
  );

  // 4. GRELHAS DE IMAGENS (Stagger fluido)
  const imageGrids = [
    ".works__card",
    ".about__pill",
    ".about__image-container",
    ".services__gallery-card",
    ".footer__card"
  ];

  imageGrids.forEach((selector) => {
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) return;

    // Footer cards usam o próprio container como trigger (não o section inteiro)
    let triggerEl;
    if (selector === '.footer__card') {
      triggerEl = document.querySelector('.footer__gallery');
    } else {
      triggerEl = elements[0].closest('section') || elements[0].parentElement;
    }

    gsap.fromTo(elements,
      { opacity: 0, y: 80, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1, duration: 1.8, stagger: 0.08, ease: "power4.out",
        clearProps: "transform",
        scrollTrigger: {
          trigger: triggerEl,
          start: "top 90%",
          toggleActions: "play reverse play reverse"
        }
      }
    );
  });

  // 5. ESTRATÉGIA "Play Once" (Anti-Fadiga)
  const playOnceStaggers = [
    { trigger: ".works", elements: ".works__header-left p, .works__models-list li" },
    { trigger: ".about", elements: ".about__content p, .about__btn, .about__stat-item" },
    { trigger: ".services", elements: ".services__carousel-left, .services__carousel-content > *, .services__controls, .services__statement-sub, .services__btn" },
    { trigger: ".footer", elements: ".footer__col, .footer__bottom", start: "top 80%" }
  ];

  playOnceStaggers.forEach(group => {
    const container = document.querySelector(group.trigger);
    const els = document.querySelectorAll(group.elements);
    if (!container || els.length === 0) return;

    gsap.fromTo(els,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1.4, stagger: 0.05, ease: "power3.out",
        clearProps: "opacity,transform",
        scrollTrigger: {
          trigger: container,
          start: group.start || "top 90%",
          toggleActions: "play none none none"
        }
      }
    );
  });

  // 6. COUNTER ANIMATION (Stat Numbers)
  document.querySelectorAll('.about__stat-number').forEach(el => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    if (isNaN(target)) return;
    const obj = { val: 0 };
    el.textContent = '000';

    gsap.to(obj, {
      val: target,
      duration: 2.5,
      ease: "power2.out",
      snap: { val: 1 },
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none"
      },
      onUpdate: () => {
        el.textContent = String(Math.floor(obj.val)).padStart(3, '0');
      }
    });
  });

  // BÓNUS: Hero Parallax Fade
  gsap.to(".hero__content", {
    y: 100,
    opacity: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  // 8. LAZY LOAD: IntersectionObserver para background-images (data-bg)
  const lazyBgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const bgUrl = el.dataset.bg;
        if (bgUrl) {
          el.style.backgroundImage = `url('${bgUrl}')`;
          el.removeAttribute('data-bg');
        }
        lazyBgObserver.unobserve(el);
      }
    });
  }, { rootMargin: '200px 0px' });

  document.querySelectorAll('[data-bg]').forEach(el => lazyBgObserver.observe(el));

  /* ==========================================================================
     MAGNETIC SPOTLIGHT REVEAL (Lanterna com Inércia)
     ========================================================================== */
  const magneticSpotlight = document.getElementById('magnetic-spotlight');
  if (magneticSpotlight) {
    const coloredLayer = magneticSpotlight.querySelector('.spotlight-colored');
    
    // Variáveis de alvo (mouse real) e atuais (com inércia)
    let targetX = 50;
    let targetY = 50;
    let targetSize = 0;
    
    let currentX = 50;
    let currentY = 50;
    let currentSize = 0;
    
    // Fator de suavização (0.01 a 1 - menor é mais inércia)
    const lerp = (start, end, factor) => start + (end - start) * factor;
    
    const updateSpotlight = () => {
      // Interpola os valores atuais em direção ao alvo
      currentX = lerp(currentX, targetX, 0.08);
      currentY = lerp(currentY, targetY, 0.08);
      currentSize = lerp(currentSize, targetSize, 0.12);
      
      if (coloredLayer) {
        coloredLayer.style.setProperty('--x', `${currentX}%`);
        coloredLayer.style.setProperty('--y', `${currentY}%`);
        // Se target é 0, quando chega bem perto a gente zera visualmente
        coloredLayer.style.setProperty('--size', `${currentSize}px`);
      }
      
      requestAnimationFrame(updateSpotlight);
    };
    
    requestAnimationFrame(updateSpotlight);
    
    magneticSpotlight.addEventListener('mousemove', (e) => {
      const rect = magneticSpotlight.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width) * 100;
      targetY = ((e.clientY - rect.top) / rect.height) * 100;
    });
    
    magneticSpotlight.addEventListener('mouseenter', () => {
      // Tamanho da "lanterna" ao passar o mouse
      targetSize = magneticSpotlight.offsetWidth * 0.7; // Responsivo baseado na largura
    });
    
    magneticSpotlight.addEventListener('mouseleave', () => {
      targetSize = 0;
      // Ao sair, pode manter a última posição suavemente
    });
  }

});