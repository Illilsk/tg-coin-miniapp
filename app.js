const tg = window.Telegram?.WebApp;
const coin = document.querySelector("#coin");
const result = document.querySelector("#result");
const hint = document.querySelector("#hint");
const flipButton = document.querySelector("#flipButton");

const sides = [
  { id: "heads", title: "Орел", hint: "Выпал орел." },
  { id: "tails", title: "Решка", hint: "Выпала решка." },
];

tg?.ready();
tg?.expand();

function pickSide() {
  const random = new Uint32Array(1);

  if (window.crypto?.getRandomValues) {
    window.crypto.getRandomValues(random);
    return sides[random[0] % sides.length];
  }

  return sides[Math.floor(Math.random() * sides.length)];
}

function flipCoin() {
  const side = pickSide();

  flipButton.disabled = true;
  result.textContent = "Крутим...";
  hint.textContent = "";
  coin.classList.remove("is-flipping");

  requestAnimationFrame(() => {
    coin.classList.add("is-flipping");
  });

  window.setTimeout(() => {
    coin.dataset.side = side.id;
    result.textContent = side.title;
    hint.textContent = side.hint;
    flipButton.disabled = false;

    tg?.HapticFeedback?.notificationOccurred?.("success");
  }, 1150);
}

flipButton.addEventListener("click", flipCoin);
