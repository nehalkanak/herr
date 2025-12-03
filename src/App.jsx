import React, { useRef, useState, useEffect } from "react";
import confetti from "canvas-confetti";
import "./index.css";

export default function App() {
  const containerRef = useRef(null);
  const noRef = useRef(null);
  const [accepted, setAccepted] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "happy anniversary anu my baby💗";
  const [noPos, setNoPos] = useState({ left: 0, top: 0 });

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 60);
  }, []);

  useEffect(() => {
    const audio = new Audio("https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Kevin_MacLeod/Lovely_Piano_Suite/Kevin_MacLeod_-_A_Peaceful_Retreat.mp3");
    audio.volume = 0.4;
    audio.play().catch(() => {});
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const heart = document.createElement("div");
      heart.className = "floating-heart";
      heart.innerHTML = "❤️";
      heart.style.left = Math.random() * 100 + "vw";
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 4000);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  function moveNo() {
    const c = containerRef.current;
    const n = noRef.current;
    if (!c || !n) return;
    const crect = c.getBoundingClientRect();
    const maxLeft = crect.width - n.offsetWidth - 20;
    const maxTop = crect.height - n.offsetHeight - 20;
    setNoPos({
      left: Math.random() * maxLeft,
      top: Math.random() * maxTop
    });
  }

  function accept() {
    setAccepted(true);

    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({ particleCount: 5, spread: 70, origin: { y: 0.6 } });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }

  return (
    <div ref={containerRef} className="romantic-bg">
      <img src="https://media.tenor.com/sy3n4YAlnSAAAAAC/hello-kitty.gif" className="sticker s1" />
      <img src="https://media.tenor.com/Ep3Sl5SOj3gAAAAM/hello-kitty.gif" className="sticker s2" />

      {!accepted ? (
        <div className="card sparkle">
          <h1 className="question typewriter">{typedText}</h1>

          <div className="buttons-fixed">
            <button className="btn yes" onClick={accept}>
              muahhhh 💞
            </button>

            <button
              ref={noRef}
              className="btn no"
              style={{ left: noPos.left, top: noPos.top, position: "absolute" }}
              onMouseEnter={moveNo}
            >
              sure 💔
            </button>
          </div>
        </div>
      ) : (
        <div className="love-screen fade-in">
          <h1>💖 I will love you forever 💖</h1>
          <p>You make my world beautiful.</p>
          <p>You're my everything.</p>
        </div>
      )}
    </div>
  );
}
