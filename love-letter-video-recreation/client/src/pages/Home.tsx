import { type MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { CanvasFlowerBloom } from "@/components/CanvasFlowerBloom";

const STORAGE = "/manus-storage/";

const letterParagraphs = [
  "I have been trying to find the right words, but every sentence feels too small when it comes to you kasi maliit ka Joke lang HASHSAH piece sana maganda araw mo Teerak :>>",
  "Thank you for the patient laughs, and the way you make space for my wonderfully messy thoughts. You are the soft place my mind wag ka mawawala ha and I love love lovee you always i do :)) simple message lang to para sayo teerak :))",
  "I know na minsan nahihirapan kana so lagi mong tandaan andito lang ako for u ha, iyak kalang imma be ur cryin shoulder HSHSHS aasarin pa kita and specially don't leave -_- kahit minsan lang tayo na uusap HSAHSAHS since busy tayo lagi so Imissyousomuch :>",
  "So i just wanted to say na, Everything is better with you, everything has been better since you. fav kitang person, i have looked at you in a million ways and i have loved you in each. :)) <3",
  "So keep this page open whenever your feeling down aight?, you will always have me, okay? I mmight not be much, but I will be by your side no matter what. okay eun? :))",
];

// Design philosophy: the final page uses the user's canvas garden as a cinematic
// botanical reveal, with the existing love-letter shell providing the pacing and copy.
function FlowerScene({ bloomed = false }: { bloomed?: boolean }) {
  return (
    <div id="bloom-scene" className="user-flower-bloom" aria-hidden="true">
      <CanvasFlowerBloom active={bloomed} />
    </div>
  );
}

export default function Home() {
  // Design philosophy: burgundy editorial stationery opens into a midnight garden,
  // where a quiet loading pause resolves into a tactile flower-bloom interaction.
  const [isIntroOpen, setIsIntroOpen] = useState(false);
  const [isIntroLeaving, setIsIntroLeaving] = useState(false);
  const [isBloomLoading, setIsBloomLoading] = useState(true);
  const [isBloomReady, setIsBloomReady] = useState(false);
  const [isBloomed, setIsBloomed] = useState(false);
  const [isBloomLeaving, setIsBloomLeaving] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const bloomSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    document.body.classList.toggle("intro-locked", !isIntroOpen);

    return () => {
      document.body.classList.remove("intro-locked");
    };
  }, [isIntroOpen]);

  useEffect(() => {
    const bloomSection = bloomSectionRef.current;
    if (!bloomSection || isBloomed) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setIsBloomLoading(true);
        setIsBloomReady(false);
        const timer = window.setTimeout(() => {
          setIsBloomLoading(false);
          setIsBloomReady(true);
        }, 1500);
        observer.disconnect();
        return () => window.clearTimeout(timer);
      },
      { threshold: 0.42 },
    );

    observer.observe(bloomSection);
    return () => observer.disconnect();
  }, [isBloomed]);

  const startMusic = useCallback(() => {
    const player = audioRef.current;
    if (!player) return;

    player.muted = false;
    const playback = player.play();
    if (playback) void playback.catch(() => undefined);
  }, []);

  const toggleMute = useCallback(() => {
    const player = audioRef.current;
    if (!player) return;

    setIsMuted((current) => {
      const next = !current;
      player.muted = next;
      return next;
    });
  }, []);

  const openInvitation = useCallback(() => {
    startMusic();
    setIsIntroLeaving(true);
    window.setTimeout(() => {
      setIsIntroOpen(true);
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }, 680);
  }, [startMusic]);

  const bloomFlower = useCallback(() => {
    setIsBloomed(true);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }), 20);
  }, []);

  const restartBloom = useCallback(() => {
    if (isBloomLeaving) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      window.location.reload();
      return;
    }

    setIsBloomLeaving(true);
    window.setTimeout(() => window.location.reload(), 720);
  }, [isBloomLeaving]);

  const scrollToSection = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute("href");
    if (!targetId) return;

    const target = document.querySelector<HTMLElement>(targetId);
    if (!target) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.classList.remove("is-scroll-target");
    void target.offsetWidth;
    target.classList.add("is-scroll-target");
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    window.setTimeout(() => target.classList.remove("is-scroll-target"), reduceMotion ? 120 : 820);
  }, []);

  const audioPlayer = (
    <audio
      ref={audioRef}
      src={`${STORAGE}love-letter-song_42fa40c7.mp3`}
      loop
      preload="auto"
      aria-hidden="true"
    />
  );

  if (isBloomed) {
    return (
      <>
        {audioPlayer}
        <main className={`bloom-page bloom-page-complete${isBloomLeaving ? " is-exiting" : ""}`} aria-labelledby="bloom-complete-heading">
          <div className="bloom-night" aria-hidden="true" />
          <div className="bloom-stars" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <section className="bloom-stage bloom-stage-complete">
            <p className="bloom-kicker">a little garden for you</p>
            <FlowerScene bloomed />
            <p id="bloom-complete-heading" className="bloom-complete-copy">Simple Flower for u loveyy :))</p>
            <p className="bloom-signoff">— for Eun, from Teerak <span aria-hidden="true">♡</span></p>
            <button className="bloom-restart" type="button" onClick={restartBloom} disabled={isBloomLeaving}>
              bloom it again <span aria-hidden="true">↗</span>
            </button>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      {audioPlayer}
      <main className={`love-letter ${isIntroOpen ? "is-visible" : "is-hidden"}`} aria-hidden={!isIntroOpen}>
      <section className="story-panel hero-panel" aria-labelledby="hero-heading">
        <div className="hero-backdrop" aria-hidden="true" />
        <div className="hero-grain" aria-hidden="true" />
        <div className="hero-copy">
          <div className="brand-lockup">
            <img src="/manus-storage/intro-cat-heart_a420b65d.jpg" alt="" />
            <span>HEH</span>
          </div>
          <div className="hero-rule" aria-hidden="true" />
          <p className="hero-kicker">dear TUPPERWARE,</p>
          <h1 id="hero-heading">RUTRUT</h1>
          <p className="hero-subline"> — scroll down mo nalang, charet Love u :)) <span aria-hidden="true">🌷</span></p>
        </div>
        <a className="scroll-cue" href="#letter" onClick={scrollToSection} aria-label="Scroll to the love letter">
          <span></span>
          <span className="scroll-arrow" aria-hidden="true">↓</span>
        </a>
      </section>

      <section className="story-panel letter-panel" id="letter" aria-labelledby="letter-heading">
        <div className="section-marker" aria-hidden="true">
          <span>01</span>
          <span className="marker-line" />
          <span>For u :))</span>
        </div>
        <article className="letter-card">
          <div className="letter-paper" aria-hidden="true" />
          <div className="letter-card-content">
            <div className="letter-meta">
              <span>SANA GUMANDA ARAW MO :&lt;&lt;</span>
              <time dateTime="2026-08-03">AUGUST 3, 2026</time>
            </div>
            <div className="letter-card-rule" aria-hidden="true" />
            <h2 id="letter-heading">My dearest Eunice Mae Pasco Rico (Teerak),</h2>
            <div className="letter-body">
              {letterParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="letter-close">
              <span>Forever yours,</span>
              <strong>Marco (Lucy Pearl) <span aria-hidden="true">🌷</span></strong>
            </div>
          </div>
          <span className="letter-stamp" aria-hidden="true">♡</span>
        </article>
      <a className="continue-cue" href="#bloom" onClick={scrollToSection}>
          <span>there’s one more thing pa sa baba :))</span>
          <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section ref={bloomSectionRef} className={`story-panel bloom-panel${isBloomLoading ? " is-loading" : ""}${isBloomReady ? " is-ready" : ""}`} id="bloom" aria-labelledby="bloom-heading">
        <div className="bloom-night" aria-hidden="true" />
        <div className="bloom-stars" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="bloom-stage">
          {isBloomLoading && (
              <div className="bloom-loader repo-loader" role="status" aria-live="polite">
                <div className="repo-loader-word" aria-hidden="true"><span>E</span><span>U</span><span>N</span></div>
                <span>planting something soft...</span>
                <span className="repo-loader-bar" aria-hidden="true"><i /></span>
              </div>
          )}
          {!isBloomLoading && (
            <>
              <p className="bloom-kicker">a little garden for you</p>
              <h2 id="bloom-heading" className="bloom-heading">let it bloom</h2>
              <button className="bloom-action" type="button" onClick={bloomFlower} aria-controls="bloom-scene">
                <span>CLICK TO BLOOM</span>
                <span className="bloom-action-arrow" aria-hidden="true">↓</span>
              </button>
              <FlowerScene />
              <p className="bloom-hint">for the person who makes ordinary days feel alive</p>
            </>
          )}
        </div>
      </section>
      </main>

      {!isIntroOpen && (
        <div className={`intro-overlay${isIntroLeaving ? " is-leaving" : ""}`}>
          <button className="intro-cover" type="button" onClick={openInvitation}>
            <span className="intro-frame" aria-hidden="true" />
            <span className="intro-glow" aria-hidden="true" />
            <span className="intro-content">
              <span className="intro-brand">
                <img src="/manus-storage/intro-cat-heart_a420b65d.jpg" alt="Cat holding a pink heart" />
                <span>HEH</span>
              </span>
              <span className="intro-rule" aria-hidden="true" />
              <span className="intro-kicker">a little something for</span>
              <span className="intro-title">Eun</span>
              <span className="intro-subtitle">From Teerak</span>
              <span className="intro-date">Hehehee Open mo nalang ayZOZ</span>
            </span>
            <span className="intro-open-label">
              <span>OPEN YOUR LETTER</span>
              <span className="intro-open-arrow" aria-hidden="true">↗</span>
            </span>
          </button>
        </div>
      )}
    </>
  );
}
