"use client"

import Image from "next/image"
import { Star } from "lucide-react"
import { openQuiz } from "./openQuiz"

// Placeholder reviews. Swap with real Google reviews when available.
// Avatars are AI-generated stand-ins (GPT Image 2).
const REVIEWS = [
  {
    quote:
      "Tom's team walked me through the math line by line. The number they quoted is what hit my account at closing. Other cash buyers I'd talked to all chipped the price after inspection. GoDutch didn't.",
    name: "C. Mendez",
    city: "Houston, TX",
    avatar: "/v2-avatars/gd-1.jpg",
  },
  {
    quote:
      "Inherited my mom's place. Didn't want to deal with showings or repairs. Sent them a few photos, got a real offer in 24 hours, closed in three weeks.",
    name: "A. Bennett",
    city: "Katy, TX",
    avatar: "/v2-avatars/gd-2.jpg",
  },
  {
    quote:
      "Tired landlord here. Two bad tenants in a row and I was done. They took it as-is, paid what they promised, and I walked away clean.",
    name: "M. Williams",
    city: "Sugar Land, TX",
    avatar: "/v2-avatars/gd-3.jpg",
  },
]

export default function Reviews() {
  return (
    <section
      className="py-14 px-4"
      style={{
        backgroundColor: "white",
        borderBottom: "1px solid var(--hpg-border)",
      }}
    >
      <div className="hpg-container">
        <div className="text-center mb-8">
          <p
            className="text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.25em] mb-2"
            style={{ color: "var(--hpg-gold-dark)" }}
          >
            Real Reviews
          </p>
          <h2
            className="font-display text-2xl sm:text-3xl font-black uppercase"
            style={{ color: "var(--hpg-black)" }}
          >
            What Houston Homeowners Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {REVIEWS.map((r) => (
            <button
              key={r.name}
              type="button"
              onClick={openQuiz}
              aria-label={`Get my cash offer — review from ${r.name}`}
              className="text-left rounded-2xl p-6 sm:p-7 shadow-md hover:shadow-xl transition-all bg-white"
              style={{ border: "1px solid var(--hpg-border)" }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5"
                    style={{ color: "var(--hpg-gold)", fill: "var(--hpg-gold)" }}
                  />
                ))}
              </div>
              <p
                className="italic leading-relaxed mb-5 text-[15px] sm:text-[16px]"
                style={{ color: "var(--hpg-charcoal)" }}
              >
                "{r.quote}"
              </p>
              <div className="flex items-center gap-3 mt-1">
                <div
                  className="relative h-12 w-12 rounded-full overflow-hidden shrink-0"
                  style={{ border: "2px solid var(--hpg-gold)" }}
                >
                  <Image
                    src={r.avatar}
                    alt={r.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <p
                    className="font-display font-black text-[13px] uppercase tracking-wide leading-tight"
                    style={{ color: "var(--hpg-black)" }}
                  >
                    {r.name}
                  </p>
                  <p className="text-[12px] leading-tight" style={{ color: "var(--hpg-muted)" }}>
                    {r.city}
                  </p>
                </div>
              </div>
              <p
                className="text-[11px] font-bold uppercase tracking-wider mt-3"
                style={{ color: "var(--hpg-gold-dark)" }}
              >
                Get my cash offer →
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
