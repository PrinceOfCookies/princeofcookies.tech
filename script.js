const text = "I'm PrinceOfCookies";
const speed = 50;

function typeWriter(elementId, text, speed) {
  const element = document.getElementById(elementId);
  if (!element) return;

  let index = 0;

  function type() {
    if (index < text.length) {
      element.textContent += text.charAt(index++);
      setTimeout(type, speed);
    }
  }

  // Clear text before starting (optional)
  element.textContent = "";
  type();
}

typeWriter("typewriterText", text, speed);
