"use client"

import { useRef, useState } from "react"

const VIDEO_URL =
  "https://ljvqnv2jvs8ramu3.public.blob.vercel-storage.com/GoDutch-Who-Are-We-For.mp4"

// Inline video card — meant to slot inside another section (e.g. WhyUs).
// Autoplay muted+looped. First click resets to 0:00 and plays with sound + native controls.
export default function WhoAreWeForVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [unlocked, setUnlocked] = useState(false)

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
  )
}
