"use client"

import { useRef, useState } from "react"

const VIDEO_URL =
  "https://ljvqnv2jvs8ramu3.public.blob.vercel-storage.com/GoDutch-Who-Are-We-For.mp4"

export default function WhoAreWeForVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [unlocked, setUnlocked] = useState(false)

  // First click: restart from 0:00 with sound. Subsequent clicks: toggle play/pause.
  const handleActivate = () => {
    const v = videoRef.current
    if (!v) return
    if (!unlocked) {
      v.currentTime = 0
      v.muted = false
      v.loop = false
      v.controls = true
      v.play().catch(() => {})
      setUnlocked(true)
    }
  }

  return (
    <section
      className="py-12 sm:py-14 px-4"
      style={{
        backgroundColor: "var(--hpg-cream)",
        borderBottom: "1px solid var(--hpg-border)",
      }}
    >
      <div className="hpg-container max-w-3xl text-center">
        <p
          className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] mb-2"
          style={{ color: "var(--hpg-gold-dark)" }}
        >
          A Quick Hello
        </p>
        <h2
          className="font-display text-2xl sm:text-3xl font-black uppercase leading-tight mb-6"
          style={{ color: "var(--hpg-black)" }}
        >
          Who We&apos;re For
        </h2>

        <button
          type="button"
          onClick={handleActivate}
          aria-label={unlocked ? "Video playing with sound" : "Tap to play with sound"}
          className="relative block w-full overflow-hidden rounded-2xl shadow-md cursor-pointer focus:outline-none focus:ring-2"
          style={{
            border: "1px solid var(--hpg-border)",
            backgroundColor: "#000",
          }}
        >
          <video
            ref={videoRef}
            src={VIDEO_URL}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-auto block"
          />

          {!unlocked && (
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ background: "rgba(0,0,0,0.18)" }}
            >
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
                style={{ backgroundColor: "white", color: "var(--hpg-black)" }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                  style={{ color: "var(--hpg-green-dark)" }}
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                Tap to play with sound
              </div>
            </div>
          )}
        </button>
      </div>
    </section>
  )
}
