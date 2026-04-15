import { useState, useEffect } from "react";
import "./App.css";

const NO_RESPONSES = [
  "Nahi! 🐰",
  "Phir se nahi!",
  "Kya? Nahi!",
  "Bilkul nahi!",
  "Nope~ 🌸",
  "Try again! 💕",
  "Hehehe... nahi!",
  "Nahi nahi nahi!",
];

function BunnyEar({ side }) {
  return (
    <div className={`ear ear-${side}`}>
      <div className="ear-inner" />
    </div>
  );
}

function Bunny({ mood }) {
  return (
    <div className={`bunny-wrap ${mood}`}>
      <div className="bunny">
        <BunnyEar side="left" />
        <BunnyEar side="right" />
        <div className="bunny-head">
          <div className="bunny-face">
            <div className="eyes">
              <div className="eye left-eye">
                <div className="pupil" />
                <div className="shine" />
              </div>
              <div className="eye right-eye">
                <div className="pupil" />
                <div className="shine" />
              </div>
            </div>
            <div className={`nose`} />
            <div className={`mouth ${mood === "sorry" ? "sad" : mood === "happy" ? "smile" : ""}`} />
            {mood === "sorry" && <div className="tear left-tear" />}
            {mood === "sorry" && <div className="tear right-tear" />}
          </div>
        </div>
        <div className="bunny-body">
          <div className="paw left-paw" />
          <div className="paw right-paw" />
          <div className="belly" />
        </div>
        <div className="tail" />
      </div>
      {mood === "sorry" && (
        <div className="sorry-sign">
          <span>Maafi chahiye! 🥺</span>
        </div>
      )}
      {mood === "happy" && (
        <div className="happy-hearts">
          <span className="heart h1">💗</span>
          <span className="heart h2">💕</span>
          <span className="heart h3">💖</span>
          <span className="heart h4">🌸</span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [stage, setStage] = useState("sorry"); // sorry | forgiven
  const [noCount, setNoCount] = useState(0);
  const [noLabel, setNoLabel] = useState("Nahi! 🐰");
  const [shake, setShake] = useState(false);
  const [confetti, setConfetti] = useState([]);

  const handleNo = () => {
    const next = (noCount + 1) % NO_RESPONSES.length;
    setNoCount(next);
    setNoLabel(NO_RESPONSES[next]);
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleYes = () => {
    setStage("forgiven");
    const pieces = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 1.5,
      color: ["#ffb3c6", "#ffd6e7", "#c9f0ff", "#fff0b3", "#d4f5c4"][Math.floor(Math.random() * 5)],
      size: 8 + Math.random() * 10,
    }));
    setConfetti(pieces);
  };

  return (
    <div className={`app ${stage}`}>
      {/* Confetti */}
      {confetti.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            background: p.color,
            width: p.size,
            height: p.size,
          }}
        />
      ))}

      <div className="card">
        {stage === "sorry" && (
          <>
            <h1 className="title">Mujhe maaf kar do... 🥺</h1>
            <p className="subtitle">Galti ho gayi, sacchi mein bahut sharminda hoon</p>
            <Bunny mood="sorry" />
            <div className={`buttons ${shake ? "shake" : ""}`}>
              <button className="yes-btn" onClick={handleYes}>
                ✨ Maaf Kiya! ✨
              </button>
              <button className="no-btn" onClick={handleNo}>
                {noLabel}
              </button>
            </div>
          </>
        )}

        {stage === "forgiven" && (
          <>
            <h1 className="title forgiven-title">Shukriya! 💖</h1>
            <p className="subtitle">Tumhara dil bahut bada hai! 🌸</p>
            <Bunny mood="happy" />
            <p className="forgiven-msg">Ab hum phir se best friends hain! 🐰💕</p>
          </>
        )}
      </div>
    </div>
  );
}
