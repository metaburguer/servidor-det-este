document.addEventListener("DOMContentLoaded", () => {
  // Animação de entrada
  const images = document.querySelectorAll(".cardapio img");
  images.forEach((img, i) => {
    img.style.opacity = 0;
    img.style.transform = "translateY(50px)";
    setTimeout(() => {
      img.style.transition = "0.8s ease";
      img.style.opacity = 1;
      img.style.transform = "translateY(0)";
    }, 300 * i);
  });

  // Scroll suave
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop,
          behavior: "smooth"
        });
      }
    });
  });

  // Botão WhatsApp animação e iniciar chuva
  const zap = document.querySelector(".zap-button");
  let chuvaAtiva = false;
  zap.addEventListener("click", () => {
    zap.textContent = "Abrindo WhatsApp...";
    setTimeout(() => {
      zap.textContent = "Peça pelo WhatsApp";
    }, 3000);

    if (!chuvaAtiva) {
      iniciarChuva();
      chuvaAtiva = true;
    }
  });

  // 🛡️ Proteção contra redirecionamento automático
  const bloquearRedirects = () => {
    let redirDetectado = false;

    Object.defineProperty(window, 'location', {
      set(value) {
        redirDetectado = true;
        console.warn("Tentativa de redirecionamento bloqueada: " + value);
      }
    });

    window.open = function () {
      redirDetectado = true;
      console.warn("Tentativa de abrir janela bloqueada.");
      return null;
    };

    const originalTimeout = window.setTimeout;
    window.setTimeout = function (fn, delay) {
      if (typeof fn === "string" && (fn.includes("location") || fn.includes("open"))) {
        redirDetectado = true;
        console.warn("Redirecionamento via setTimeout bloqueado.");
        return;
      }
      return originalTimeout(fn, delay);
    };

    setInterval(() => {
      document.querySelectorAll("iframe").forEach(iframe => {
        if (!iframe.src.includes("trusted") && !iframe.src.includes("youtube")) {
          iframe.remove();
          console.warn("Iframe suspeito removido.");
        }
      });
    }, 1000);

    if (redirDetectado) alert("Tentativa de redirecionamento bloqueada!");
  };

  bloquearRedirects();

  // 🌧️ Função para iniciar a chuva
  function iniciarChuva() {
    const rainContainer = document.createElement("div");
    rainContainer.style.position = "fixed";
    rainContainer.style.top = 0;
    rainContainer.style.left = 0;
    rainContainer.style.width = "100%";
    rainContainer.style.height = "100%";
    rainContainer.style.pointerEvents = "none";
    rainContainer.style.zIndex = 999;
    document.body.appendChild(rainContainer);

    const imagens = ["caca.png", "haha.png"];

    function criarLanche() {
      const img = document.createElement("img");
      const item = imagens[Math.floor(Math.random() * imagens.length)];
      img.src = `imagens/${item}`;
      img.alt = item === "caca.png" ? "Cachorro-quente" : "Hambúrguer";
      img.style.position = "absolute";
      img.style.left = Math.random() * 100 + "vw";
      img.style.top = "-50px";
      img.style.width = "39px";
      img.style.opacity = "0.9";
      img.style.transition = "transform 5s linear, top 5s linear";
      img.style.zIndex = 999;

      rainContainer.appendChild(img);

      setTimeout(() => {
        img.style.top = "110%";
        img.style.transform = `rotate(${Math.random() * 360}deg)`;
      }, 50);

      setTimeout(() => {
        img.remove();
      }, 6000);
    }

    setInterval(criarLanche, 400);
  }
});
