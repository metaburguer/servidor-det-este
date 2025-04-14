// script.js
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const sideMenu = document.getElementById("sideMenu");
  const sections = document.querySelectorAll(".aba");
  const menuItems = document.querySelectorAll("#sideMenu ul li");

  menuToggle.addEventListener("click", () => {
    sideMenu.classList.toggle("show");
  });

  menuItems.forEach(item => {
    item.addEventListener("click", () => {
      const section = document.getElementById(item.dataset.section);
      if (section) {
        sections.forEach(sec => sec.classList.remove("ativa"));
        section.classList.add("ativa");
        sideMenu.classList.remove("show");
      }
    });
  });

  // Imagens com animação de entrada
  const imgs = document.querySelectorAll("section img");
  imgs.forEach((img, i) => {
    img.style.opacity = 0;
    img.style.transform = "translateY(50px)";
    setTimeout(() => {
      img.style.transition = "0.8s ease";
      img.style.opacity = 1;
      img.style.transform = "translateY(0)";
    }, 300 * i);
  });

  // Botão WhatsApp animação
  const zap = document.querySelector(".zap-button");
  if (zap) {
    zap.addEventListener("click", () => {
      zap.textContent = "Abrindo WhatsApp...";
      setTimeout(() => {
        zap.textContent = "Finalizar Pedido no WhatsApp";
      }, 3000);
    });
  }

  // Proteção contra redirecionamento automático
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
});
