"use client";

import { useEffect, useState } from "react";
import "./RotatingHeadline.css";

type Phrase = { lead: string; highlight: string };

const PHRASES: Phrase[] = [
  { lead: "We build things that ", highlight: "work." },
  { lead: "Africa's leading ", highlight: "AI & automation company." },
  { lead: "We automate the ", highlight: "boring stuff." },
  { lead: "Software, shipped fast — built to ", highlight: "last." },
  { lead: "Turning ambitious ideas into ", highlight: "real products." },
];

const TYPE_MS = 42;
const DELETE_MS = 26;
const HOLD_MS = 1900;
const GAP_MS = 350;

export default function RotatingHeadline() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const full = PHRASES[phraseIndex].lead + PHRASES[phraseIndex].highlight;

  useEffect(() => {
    let delay = deleting ? DELETE_MS : TYPE_MS;

    if (!deleting && charIndex === full.length) {
      delay = HOLD_MS;
    } else if (deleting && charIndex === 0) {
      delay = GAP_MS;
    }

    const timer = setTimeout(() => {
      if (!deleting && charIndex === full.length) {
        setDeleting(true);
        return;
      }
      if (deleting && charIndex === 0) {
        setDeleting(false);
        setPhraseIndex((p) => (p + 1) % PHRASES.length);
        return;
      }
      setCharIndex((c) => c + (deleting ? -1 : 1));
    }, delay);

    return () => clearTimeout(timer);
  }, [charIndex, deleting, full.length, phraseIndex]);

  const typed = full.slice(0, charIndex);
  const leadLen = PHRASES[phraseIndex].lead.length;
  const leadPart = typed.slice(0, Math.min(charIndex, leadLen));
  const highlightPart = typed.slice(leadLen);

  return (
    <h1 className="hero-title">
      <span aria-hidden="true">
        {leadPart}
        <span className="hero-highlight">{highlightPart}</span>
        <span className="hero-cursor">|</span>
      </span>
      <span className="sr-only">{PHRASES[0].lead + PHRASES[0].highlight}</span>
    </h1>
  );
}
