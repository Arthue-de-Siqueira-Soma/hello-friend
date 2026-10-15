
    // IMPORTANTE: substitua pelo WhatsApp real da pizzaria, com código do Brasil + DDD + número.
    // Número pendente de confirmação; os botões só serão ativados após o envio do contato correto.
    const WHATSAPP_NUMBER = "";
    const DEFAULT_MESSAGE = "Olá! Vim pelo site da Pizzaria Fatia dos Sonhos e gostaria de fazer um pedido.";
    document.querySelectorAll(".whatsapp-link").forEach(link => {
      if (/^55\d{10,11}$/.test(WHATSAPP_NUMBER)) {
        link.href = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(DEFAULT_MESSAGE);
      } else {
        link.href = "#";
        link.addEventListener("click", event => {
          event.preventDefault();
          alert("O WhatsApp da pizzaria ainda precisa ser configurado no arquivo index.html.");
        });
      }
    });
    document.querySelectorAll("#year").forEach(el => el.textContent = new Date().getFullYear());
    const imagesToReveal = document.querySelectorAll(".hero-photo img, .about-image img, .map-card");
    imagesToReveal.forEach(image => image.classList.add("reveal-image"));
    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            imageObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.14 });
      imagesToReveal.forEach(image => imageObserver.observe(image));
    } else {
      imagesToReveal.forEach(image => image.classList.add("is-visible"));
    }
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    });
    const closeMobileMenu = () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menu");
    };
    navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMobileMenu));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeMobileMenu();
    });
    document.addEventListener("click", event => {
      if (navLinks.classList.contains("open") &&
          !navLinks.contains(event.target) &&
          !menuToggle.contains(event.target)) closeMobileMenu();
    });
    const floatingWhatsApp = document.querySelector(".whatsapp-float");
    const footer = document.querySelector("footer");
    if (floatingWhatsApp && footer && "IntersectionObserver" in window) {
      const footerObserver = new IntersectionObserver(entries => {
        floatingWhatsApp.style.opacity = entries[0].isIntersecting ? "0" : "1";
        floatingWhatsApp.style.pointerEvents = entries[0].isIntersecting ? "none" : "auto";
        floatingWhatsApp.setAttribute("aria-hidden", entries[0].isIntersecting ? "true" : "false");
      }, { threshold: 0.05 });
      footerObserver.observe(footer);
    }
  
// Horarios oficiais editaveis: preencha apos confirmacao. Formato: [{open: "18:00", close: "22:30"}].
const BUSINESS_HOURS = { sunday: [], monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [] };

function updateBusinessHours(){
 const status=document.getElementById("hoursStatus"),summary=document.getElementById("homeHoursSummary");
 const configured=Object.values(BUSINESS_HOURS).some(list=>list.length);
 if(!configured){if(status)status.textContent="Horários ainda não cadastrados. Confirme com a equipe.";if(summary)summary.textContent="Confirme o atendimento com a pizzaria";return;}
 const now=new Date(new Date().toLocaleString("en-US",{timeZone:"America/Sao_Paulo"}));
 const day=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"][now.getDay()];
 const minute=now.getHours()*60+now.getMinutes();
 const open=(BUSINESS_HOURS[day]||[]).some(x=>{const a=x.open.split(":").map(Number),b=x.close.split(":").map(Number);return minute>=a[0]*60+a[1]&&minute<b[0]*60+b[1];});
 const msg=open?"Aberta agora, conforme os horários cadastrados.":"Fechada agora, conforme os horários cadastrados.";
 if(status)status.textContent=msg;if(summary)summary.textContent=open?"Aberta agora":"Fechada agora";
}
updateBusinessHours();
