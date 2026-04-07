function openChat() {
  alert("Hi 👋 How can we help you?");
}

const reveals = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;

  reveals.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    const elementVisible = 100;

    if (elementTop < windowHeight - elementVisible) {
      el.classList.add("active");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll); // 👈 THIS LINE FIXES IT

// =======================

/* COUNTER ANIMATION */
const counters = document.querySelectorAll(".counter");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.dataset.target;
        let count = 0;

        const update = () => {
          if (count < target) {
            count += Math.ceil(target / 60);
            counter.innerText = count;
            requestAnimationFrame(update);
          } else {
            counter.innerText = target;
          }
        };
        update();
        observer.unobserve(counter);
      }
    });
  },
  { threshold: 0.6 },
);

counters.forEach((c) => observer.observe(c));

/* CONSTELLATION BACKGROUND */
const canvas = document.getElementById("constellation");
const ctx = canvas.getContext("2d");
let w, h;
const stars = [];

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = canvas.parentElement.offsetHeight;
}
window.addEventListener("resize", resize);
resize();

for (let i = 0; i < 80; i++) {
  stars.push({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
  });
}

function animate() {
  ctx.clearRect(0, 0, w, h);
  stars.forEach((s) => {
    s.x += s.vx;
    s.y += s.vy;
    if (s.x < 0 || s.x > w) s.vx *= -1;
    if (s.y < 0 || s.y > h) s.vy *= -1;

    ctx.fillStyle = "#a855f7";
    ctx.fillRect(s.x, s.y, 2, 2);

    stars.forEach((o) => {
      const d = Math.hypot(s.x - o.x, s.y - o.y);
      if (d < 120) {
        ctx.strokeStyle = "rgba(168,85,247,0.15)";
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(o.x, o.y);
        ctx.stroke();
      }
    });
  });
  requestAnimationFrame(animate);
}
animate();

// ===============================================================
// Google Form
const form = document.getElementById("contactForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value,
  };

  fetch(
    "https://script.google.com/macros/s/AKfycbyu9RMWujTxUiPPdeuZ2VFFZbJoxRbxmbIjI3nyFgHsnScW9rCEr_OiO4O8B9aazlU/exec",
    {
      method: "POST",
      body: JSON.stringify(formData),
      // headers: {
      //   "Content-Type": "application/json",
      // },
    },
  )
    .then((res) => res.json())
    .then(() => {
      alert("🚀 Message sent successfully!");
      form.reset();
    })
    .catch((err) => {
      alert("❌ Something went wrong. Try again.");
      console.error(err);
    });
});
// =======================================================================
// POPUP Card
const popup = document.getElementById("featuredPopup");
const text = document.getElementById("popupText");
const btn = document.getElementById("translateBtn");

// const marathiText = text.innerHTML;

const englishText = `
  We are starting a spiritual worship class for children to build values,
  devotion, and positive thinking at an early age.<br /><br />

  🚩 Let us shape responsible citizens through values! 🚩<br /><br />

  🕉️ Chanting of shlokas and stotras<br />
  🪔 Aarti<br />
  📖 Moral values through stories<br /><br />

  Age Group: 5 to 12 years
  `;

if (!localStorage.getItem("featuredPopupSeen")) {
  window.addEventListener("load", () => {
    popup.style.display = "flex";
    localStorage.setItem("featuredPopupSeen", "true");
  });
}

/* Outside click close */
// popup.addEventListener("click", (e) => {
//   if (e.target === popup) {
//     popup.style.display = "none";
//   }
// });

/* Translate toggle */
// let isEnglish = false;
// btn.addEventListener("click", () => {
//   if (!isEnglish) {
//     text.innerHTML = englishText;
//     btn.innerText = "मराठीत पहा";
//   } else {
//     text.innerHTML = marathiText;
//     btn.innerText = "Translate to English";
//   }
//   isEnglish = !isEnglish;
// });
// =======================================================================
///CHATBOT
document.addEventListener("DOMContentLoaded", () => {
  console.log("JS Loaded");

  const bot = document.getElementById("chatbot");
  const chatbox = document.getElementById("chatbox");
  const chatText = document.getElementById("chat-text");
  const botAvatar = document.querySelector("#bot-avatar img");

  const chatWindow = document.getElementById("chat-window");
  const input = document.getElementById("user-input");
  const messagesDiv = document.getElementById("chat-messages");

  let lastSwitch = 0;

  const links = [
    "courses/generative-ai.html",
    "courses/python.html",
    "courses/excel.html",
  ];

  let current = 0;

  setInterval(() => {
    current = (current + 1) % links.length;
  }, 4000);

  // 👉 SCROLL
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    bot.classList.add("move");

    if (Math.abs(scrollY - lastSwitch) > 500) {
      lastSwitch = scrollY;

      bot.classList.toggle("move-right");
    }

    // adjust chatbox
    // if (bot.classList.contains("move-right")) {
    //   chatbox.style.left = "auto";
    //   chatbox.style.right = "0";
    // } else {
    //   chatbox.style.left = "0";
    //   chatbox.style.right = "auto";
    // }

    function adjustChatPosition() {
      const botRect = bot.getBoundingClientRect();

      // If bot is on right half of screen → show chat on LEFT
      if (botRect.left > window.innerWidth / 2) {
        chatbox.style.left = "auto";
        chatbox.style.right = "20px"; // distance from bot
      }
      // If bot on left → show chat on RIGHT
      else {
        chatbox.style.left = "20px";
        chatbox.style.right = "auto";
      }
    }

    function keepInsideScreen() {
      const rect = chatbox.getBoundingClientRect();

      if (rect.right > window.innerWidth) {
        chatbox.style.right = "10px";
        chatbox.style.left = "auto";
      }

      if (rect.left < 0) {
        chatbox.style.left = "10px";
        chatbox.style.right = "auto";
      }
    }

    async function sendMessage() {
      const userMsg = input.value.trim();

      if (!userMsg) return;

      messagesDiv.innerHTML += `<div class="user-msg">${userMsg}</div>`;
      input.value = "";

      const reply = await getAIResponse(userMsg);

      messagesDiv.innerHTML += `<div class="bot-msg">${reply}</div>`;
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    adjustChatPosition();
    keepInsideScreen();
  });

  // 👉 CLICK (OPEN CHAT WINDOW)
  botAvatar.addEventListener("click", () => {
    chatWindow.style.display = "flex";
  });

  // 👉 AUTO MESSAGES
  const messages = [
    "Did you know AI can automate your work? 🤖",
    "Learn Python & boost your career 🚀",
    "Limited seats — secure yours now!",
  ];

  let i = 0;

  function showMessage() {
    chatText.style.opacity = 0; // fade out

    setTimeout(() => {
      chatText.innerText = messages[i];
      chatText.style.opacity = 1; // fade in
      i = (i + 1) % messages.length;
    }, 300);
  }

  // initial message
  showMessage();

  // repeat smoothly
  setInterval(showMessage, 5000);

  // X Button for chatbox
  const closeBtn = document.getElementById("close-chat");

  closeBtn.addEventListener("click", () => {
    chatWindow.style.display = "none";
  });

  // Whatsapp LEFT RIGHT messages:
  // messagesDiv.innerHTML += `<div class="user-msg">${userMsg}</div>`;
  // messagesDiv.innerHTML += `<div class="bot-msg">${reply}</div>`;

  // Reply Logic
  async function getAIResponse(userMsg) {
    try {
      // We call our OWN local function URL now
      const res = await fetch("/.netlify/functions/chat", {
        method: "POST",
        body: JSON.stringify({ message: userMsg }),
      });

      const data = await res.json();
      return data.reply;
    } catch (err) {
      console.error(err);
      return "Error connecting to the chat service.";
    }
  }
  // 👉 CHAT INPUT
  input.addEventListener("keypress", async (e) => {
    if (e.key === "Enter") {
      const userMsg = input.value;

      messagesDiv.innerHTML += `<div class="user-msg">${userMsg}</div>`;

      input.value = "";

      const reply = await getAIResponse(userMsg);

      messagesDiv.innerHTML += `<div class="bot-msg">${reply}</div>`;

      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }
  });
});
// ChatBox
