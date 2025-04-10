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

  // Botão WhatsApp animação
  const zap = document.querySelector(".zap-button");
  zap.addEventListener("click", () => {
    zap.textContent = "Abrindo WhatsApp...";
    setTimeout(() => {
      zap.textContent = "Peça pelo WhatsApp";
    }, 3000);
  });

  // 🛡️ Proteção contra redirecionamento automático
  const bloquearRedirects = () => {
    let redirDetectado = false;

    // Bloquear alteração de location
    Object.defineProperty(window, 'location', {
      set(value) {
        redirDetectado = true;
        console.warn("Tentativa de redirecionamento bloqueada: " + value);
      }
    });

    // Bloquear window.open
    window.open = function () {
      redirDetectado = true;
      console.warn("Tentativa de abrir janela bloqueada.");
      return null;
    };

    // Monitorar setTimeout suspeitos
    const originalTimeout = window.setTimeout;
    window.setTimeout = function (fn, delay) {
      if (typeof fn === "string" && (fn.includes("location") || fn.includes("open"))) {
        redirDetectado = true;
        console.warn("Redirecionamento via setTimeout bloqueado.");
        return;
      }
      return originalTimeout(fn, delay);
    };

    // Remover iframes suspeitos
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

  // 🍔🌭 Chuva de hambúrgueres e hotdogs
  const rainContainer = document.createElement("div");
  rainContainer.id = "rain-container";
  document.body.appendChild(rainContainer);

  const lanches = ["🌭", "🍔"];
  function criarLanche() {
    const item = document.createElement("div");
    item.classList.add("rain-item");
    item.innerText = lanches[Math.floor(Math.random() * lanches.length)];
    item.style.left = Math.random() * 100 + "vw";
    item.style.animationDuration = (Math.random() * 3 + 2) + "s";
    item.style.fontSize = (Math.random() * 15 + 20) + "px";
    rainContainer.appendChild(item);

    // Remover depois que cair
    setTimeout(() => {
      item.remove();
    }, 5000);
  }

  // Criar vários com intervalo
  setInterval(criarLanche, 300);
});
