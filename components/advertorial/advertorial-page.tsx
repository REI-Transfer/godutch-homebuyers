"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { SurveyCard } from "@/components/v2/survey-card"
import { AddressAutocomplete, type AddressDetails } from "@/components/survey/address-autocomplete"

// Advertorial editorial landing page (v2 form family). Embeds this repo's v2 SurveyCard,
// which reads its own config and redirects to /thank-you on submit. The sticky address
// bar passes the typed address to the modal SurveyCard via initialAddress (so it opens at
// step 2). Company/phone/market/accent come from props (server config).

interface AdvertorialPageProps {
  companyName: string
  phoneDisplay: string
  phoneHref: string
  marketName: string
  accentColor: string
  serviceBounds?: { south: number; north: number; west: number; east: number } | null
  writerName?: string
  writerRole?: string
  writerHeadshot?: string
}

function pad(n: number) {
  return n < 10 ? "0" + n : "" + n
}

export function AdvertorialPage({
  companyName,
  phoneDisplay,
  phoneHref,
  marketName,
  accentColor,
  serviceBounds = null,
  writerName = "Margaret Ellison",
  writerRole = "Senior Housing Correspondent",
  writerHeadshot = "/images/adv-local-team.jpg",
}: AdvertorialPageProps) {
  const market = marketName || "your area"
  const C = { text: "#1a1a1a", muted: "#6b6b6b", link: accentColor, rule: "#e5e5e5", cta: "#1f8a4c", accent: accentColor, warn: "#c0392b" }

  const formRef = useRef<HTMLDivElement>(null)
  const [showSticky, setShowSticky] = useState(false)
  const [stickyAddr, setStickyAddr] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [seeded, setSeeded] = useState<string>("")

  const [cdA, setCdA] = useState("--:--:--")
  const [cdB, setCdB] = useState("--d --:--")
  const [slots, setSlots] = useState(7)
  const targetsRef = useRef<{ a: number; b: number } | null>(null)
  useEffect(() => {
    const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min
    const now = Date.now()
    targetsRef.current = {
      a: now + rand(14, 46) * 3600000 + rand(0, 59) * 60000 + rand(0, 59) * 1000,
      b: now + rand(3, 6) * 86400000 + rand(0, 23) * 3600000 + rand(0, 59) * 60000,
    }
    setSlots(rand(3, 9))
    const tick = () => {
      if (!targetsRef.current) return
      const t = Date.now()
      const ra = Math.max(0, targetsRef.current.a - t)
      setCdA(`${pad(Math.floor(ra / 3600000))}:${pad(Math.floor((ra % 3600000) / 60000))}:${pad(Math.floor((ra % 60000) / 1000))}`)
      const rb = Math.max(0, targetsRef.current.b - t)
      setCdB(`${Math.floor(rb / 86400000)}d ${pad(Math.floor((rb % 86400000) / 3600000))}:${pad(Math.floor((rb % 3600000) / 60000))}`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY > 600
      const form = formRef.current
      let formVisible = false
      if (form) { const r = form.getBoundingClientRect(); formVisible = r.top < window.innerHeight && r.bottom > 0 }
      setShowSticky(scrolled && !formVisible)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  const handleStickySelect = (address: string, _details: AddressDetails) => { setSeeded(address); setModalOpen(true) }
  const openModalFromButton = () => { if (!seeded && stickyAddr.trim()) setSeeded(stickyAddr.trim()); setModalOpen(true) }

  return (
    <div style={{ color: C.text, background: "#fff" }}>
      <article className="mx-auto max-w-[760px] px-6 pt-10 pb-36 text-[18px] md:text-[19px] leading-[1.65]">
        <p style={{ color: C.muted }} className="text-xs tracking-[0.14em] uppercase text-center mb-[18px]">Advertorial</p>

        <header>
          <h1 className="text-[29px] md:text-[38px] leading-[1.18] font-extrabold text-center mb-[18px] tracking-[-0.01em]">
            Why So Many {market === "your area" ? "" : `${market} `}Homeowners Past 45 Are Quietly Selling For Cash And Never Putting Up A Single Open House Sign
          </h1>
          <p className="text-center text-[18px] mb-[26px]">
            There is an easier route qualified homeowners are taking. Sell it as it stands. Nothing out of pocket for repairs. Nobody parading through your hallways. No commission shaved off the bottom line.
          </p>
          <div style={{ borderTop: `1px solid ${C.rule}`, borderBottom: `1px solid ${C.rule}` }} className="flex items-center gap-3 py-3 mb-[30px]">
            <Image src={writerHeadshot} alt={writerName} width={46} height={46} className="h-[46px] w-[46px] rounded-full object-cover bg-gray-200" />
            <div>
              <div className="text-[15px] font-semibold">By {writerName}</div>
              <div style={{ color: C.muted }} className="text-[13px]">{writerRole} · Updated this week</div>
            </div>
          </div>
        </header>

        <figure className="my-[8px] mb-[30px]">
          <Image src="/images/adv-strangers-open-house.jpg" alt="Unfamiliar visitors touring a home during an open house showing" width={760} height={500} className="block w-full h-auto rounded-[3px] bg-gray-100" priority />
          <figcaption style={{ color: C.muted }} className="text-[13px] text-center mt-2 italic">An open house puts strangers in your living room for weeks on end. A growing number of homeowners are leaving that whole circus behind.</figcaption>
        </figure>

        <section>
          <p className="mb-[18px]">Let me put a simple question to you, neighbor to neighbor.</p>
          <p className="mb-[18px]"><strong>When did the house stop feeling like home and start feeling like a chore?</strong></p>
          <p className="mb-[18px]">Maybe it was the stairs. Your hand reaches for that railing now without you even thinking about it.</p>
          <p className="mb-[18px]">Maybe it was the lawn. What used to fill a Saturday morning has turned into something you put off as long as you can.</p>
          <p className="mb-[18px]">Maybe it was the running list. The roof. The water heater. That bathroom that has been waiting on a fix since long before the grandkids showed up.</p>
          <p className="mb-[18px]">You built a life inside these walls. You know which board squeaks. And somewhere down the road, the home you cherished became a home that asks for more than you care to hand it.</p>
          <p className="mb-[18px]">If any of that rings true, you have plenty of company. And you have done nothing wrong. <strong>You have simply reached the point where the wise move is a different one.</strong></p>
          <p className="mb-[18px]">(Here is what folks your age rarely hear:{" "}
            <a href="#offer-form" onClick={(e) => { e.preventDefault(); scrollToForm() }} style={{ color: C.link }} className="underline underline-offset-2">there is a calmer way qualified homeowners are selling these days</a>{" "}
            that leaves out the repairs, the showings, and the long wait.)</p>
        </section>

        <H2>The House Grew As The Years Passed</H2>
        <FullImage src="/images/adv-empty-rooms.jpg" alt="Still staircase and rooms in a longtime family home that now sit mostly empty" />
        <section>
          <p className="mb-[18px]">This is the part nobody prepares you for.</p>
          <p className="mb-[18px]">The square footage stays the same. You are the one who changes. One by one, the rooms you used to fill go still. The garage fills with boxes you can no longer haul. The upstairs turns into somewhere you visit rather than somewhere you live.</p>
          <p className="mb-[18px]">And the maintenance keeps right on coming. A home of this vintage always has its hand out. A coat of paint. A replacement AC unit, which matters more than most in this Houston heat. Gutters, all over again.</p>
          <p className="mb-[18px]">Here is the rough truth a lot of folks bump into: <strong>fixing everything up just to put it on the market can run higher than the cash you have on hand, and take more out of you than you want to give.</strong></p>
          <p className="mb-[18px]">So the house waits. The decision waits. And one more season slips by.</p>
        </section>

        <H2>The Part About Listing At This Stage That Goes Unspoken</H2>
        <FullImage src="/images/adv-couple-window.jpg" alt="An older couple standing in the family home they have owned for years" />
        <section>
          <p className="mb-[18px]">For most people, selling means ringing up an agent and staking a sign in the front yard. For a younger household, that road can work just fine.</p>
          <p className="mb-[18px]">But at this point in life, the old-fashioned route demands a great deal from you:</p>
          <ul className="mb-[18px] pl-[22px] list-disc">
            <li className="mb-2"><strong>You foot the repairs first.</strong> The agent shows up with a list. Paint, flooring, the roof. Cash leaving your wallet before a single buyer ever appears.</li>
            <li className="mb-2"><strong>Strangers wander through your home.</strong> Open houses put people you have never met inside your closets while you sit out in the car.</li>
            <li className="mb-2"><strong>You wait. Then wait some more.</strong> A typical listing can take two or three months to reach closing, sometimes longer, and the whole thing can still collapse at the finish.</li>
            <li className="mb-2"><strong>The fees pile up.</strong> Between commissions and closing costs, a fat slice of your price quietly evaporates. On plenty of Houston homes that means tens of thousands gone right off the top.</li>
          </ul>
          <p className="mb-[18px]">For a lot of older homeowners, that is no plan at all. <strong>It is a part-time job nobody handed you a paycheck for, right when you are hoping for less on your plate, not more.</strong></p>
          <p className="mb-[18px]">The good news is that it no longer has to go that way.</p>
        </section>

        <H2>There Is A Calmer Way Qualified Homeowners Are Selling</H2>
        <FullImage src="/images/adv-handshake.jpg" alt="A warm, no-fuss handshake between a homeowner and a local home buyer" />
        <section>
          <p className="mb-[18px]">These last few years, more and more homeowners past 45 have set the old listing routine aside and chosen something far simpler.</p>
          <p className="mb-[18px]">They sell straight to a local cash home buyer.</p>
          <p className="mb-[18px]">No repairs. No open houses. No commission carved out of the price. They sell the home exactly as it stands, name the closing date that suits them, and get on with living.</p>
          <p className="mb-[18px]">It will not suit everybody. If you have all the time in the world and the stamina to run a full renovation and a three month listing, the traditional path is still right there waiting.</p>
          <p className="mb-[18px]">But if you would sooner hold onto your weekends, hold onto your privacy, and <strong>hold onto more of that money for your own retirement, this is the door a lot of folks your age are walking through.</strong></p>
        </section>

        <H2>Introducing {companyName}</H2>
        <FullImage src="/images/adv-local-team.jpg" alt={`Local ${companyName} team`} />
        <section>
          <p className="mb-[18px]"><strong>{companyName} is a local outfit that buys homes straight from homeowners in {market === "your area" ? "the areas we serve" : market}, with cash, in whatever condition they sit.</strong></p>
          <p className="mb-[18px]">That means no repairs, no emptying out the entire house, no listing, no showings, and no commission skimmed off your number. You tell us about the place, we take a look, and we put a fair written cash offer in your hands.</p>
          <p className="mb-[18px]">Like the offer? You name the closing date. Want it wrapped up in two weeks? Done. Need 60 days to line up your next place and pack at an easy pace? That works just the same.</p>
          <p className="mb-[18px]">If the offer is not the right fit, there is no arm-twisting and nothing owed. The written offer is yours to keep and chew on for as long as you please.</p>
          <p className="mb-[18px]">It is the plainest, easiest-on-the-nerves way to sell a home you have held for years, shaped for exactly the season of life you are standing in.</p>
        </section>

        <H2>How It Works</H2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-[30px]">
          {[
            { n: 1, h: "Tell Us About The Home", p: "Answer a handful of quick questions below. About 60 seconds. No cost, nothing owed." },
            { n: 2, h: "Get Your Written Offer", p: "We go over the details and put together a fair cash offer for your home, just as it stands." },
            { n: 3, h: "Pick Your Closing Day", p: "Happy with the offer? You set the date. We handle the paperwork. You move on your own terms." },
          ].map((s) => (
            <div key={s.n} style={{ border: `1px solid ${C.rule}` }} className="rounded-lg p-5 text-center">
              <span style={{ background: C.accent }} className="inline-flex w-[34px] h-[34px] rounded-full text-white items-center justify-center font-extrabold mb-2.5">{s.n}</span>
              <h4 className="mb-1.5 text-[17px] font-bold">{s.h}</h4>
              <p style={{ color: C.muted }} className="m-0 text-[14px]">{s.p}</p>
            </div>
          ))}
        </div>

        <H2>Why It Suits This Season Of Life</H2>
        <section>
          <ul className="mb-[18px] pl-[22px] list-disc">
            <li className="mb-2"><strong>Sell as it stands.</strong> Not a single repair. Not one brushstroke of paint. Leave behind whatever you would rather not haul off.</li>
            <li className="mb-2"><strong>No showings.</strong> No strangers tracking through your home. No keeping the place spotless month after month.</li>
            <li className="mb-2"><strong>Hold onto more of your money.</strong> No commission and no closing costs chewing into your retirement.</li>
            <li className="mb-2"><strong>Move on your own schedule.</strong> Close quickly, or take all the time you need. You keep the calendar, not some buyer.</li>
            <li className="mb-2"><strong>Honest certainty.</strong> A genuine written offer from a genuine local buyer, not a maybe that crumbles at the closing table.</li>
          </ul>
          <p className="mb-[18px]">That is why, once homeowners past 45 see how this runs, so many of them say the very same thing: <em>I wish somebody had told me this was on the table years ago.</em></p>
        </section>

        <div ref={formRef} id="offer-form" className="scroll-mt-5 my-10">
          <div className="text-center mb-5">
            <h3 className="text-[23px] md:text-[26px] font-extrabold">Find Out What Your Home Qualifies For</h3>
            <p style={{ color: C.muted }} className="mt-1 text-[15px]">A handful of quick questions. No cost, nothing owed, no arm-twisting.</p>
          </div>
          <div className="flex justify-center">
            <SurveyCard />
          </div>
        </div>

        <H2>What Other Homeowners Are Saying</H2>
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-5 my-[30px] mb-10">
          {[
            { img: "/images/adv-testimonial-1.jpg", quote: "Once my husband was gone, the house was simply more than I could manage. The repairs by themselves would have run into the thousands. They took it just as it sat. I chose the closing day and never lifted a hammer. Such relief off my shoulders.", cite: "Patricia M., 71" },
            { img: "/images/adv-testimonial-2.jpg", quote: "We were heading over to be near our daughter and had no appetite for months of showings at our age. They handed us a fair written offer inside a couple of days and let us close once we were ready. Straight shooters. No games.", cite: "Robert and Jean D., 68 and 66" },
            { img: "/images/adv-testimonial-3.jpg", quote: "I inherited my mother's home and I live three states off. The thought of flying back for repairs and open houses was unbearable. They took care of all of it by phone and email. Not once did I have to make the trip.", cite: "Daniel K., 59" },
            { img: "/images/adv-testimonial-4.jpg", quote: "The agent wanted thousands sunk into fixing the place up before it ever went on the market. I live on a fixed income. That was never happening. Selling for cash as it stood just added up. I kept more in my pocket and slept easier that night.", cite: "Carol S., 74" },
          ].map((t) => (
            <figure key={t.cite} style={{ border: `1px solid ${C.rule}` }} className="m-0 text-[15px] leading-[1.55] rounded-lg p-[18px]">
              <Image src={t.img} alt={t.cite} width={300} height={300} className="w-full h-auto aspect-square object-cover rounded-md mb-3 block bg-gray-100" />
              <div style={{ color: "#f5a623" }} className="tracking-[1px] mb-2">★★★★★</div>
              <p className="mb-2.5">{t.quote}</p>
              <cite style={{ color: C.muted }} className="not-italic text-[13px]">{t.cite}</cite>
            </figure>
          ))}
        </section>

        <H2>So Here Is The Decision In Front Of You</H2>
        <section>
          <p className="mb-[18px]">The way I see it, two roads sit in front of you.</p>
          <p className="mb-[18px]"><strong>Road one</strong> is the drawn-out one. Spend money you may not want to spend dressing up a house you are leaving regardless. Let strangers walk it for months. Hand a thick wedge of the price to agents and closing costs. And cross your fingers it all closes before the holidays.</p>
          <p className="mb-[18px]"><strong>Road two</strong> is the simple one. Tell a trusted local buyer about the home, get a fair written cash offer, and choose the day you close. No repairs. No showings. No fees pulled from your number.</p>
          <p className="mb-[18px]">There is a reason you have read this far. Somewhere inside you already senses the house is ready for its next chapter, and so are you.</p>
        </section>

        <h3 className="text-[21px] md:text-[27px] leading-[1.32] font-extrabold text-center mx-auto my-[46px] max-w-[640px]">
          You gave that home a lifetime of care. At this point, it ought to be looking after you, not the other way around.
        </h3>

        <aside style={{ border: "2px dashed #bdbdbd" }} className="rounded-[10px] px-7 py-[30px] max-w-[600px] mx-auto mt-[50px] text-center">
          <Image src="/images/adv-keys-couple.jpg" alt="Relieved homeowners holding the keys after a cash sale" width={170} height={170} className="w-[170px] h-[170px] object-cover rounded-full mx-auto mb-4 block bg-gray-100" />
          <h4 className="text-[22px] font-bold mb-1.5">{companyName} · Cash Offer Program</h4>
          <p style={{ color: C.accent }} className="text-[26px] font-extrabold mb-2">Get Your Fair Written Cash Offer</p>
          <p className="text-[15px] mb-5">Sell it as it stands. No repairs, no showings, no commission. You name the closing date.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-[22px]">
            <div style={{ background: "#fbf4f4", border: "1px solid #f0d9d9" }} className="rounded-lg px-2.5 py-3.5">
              <p style={{ color: C.warn }} className="text-xs uppercase tracking-[0.08em] font-bold mb-1.5">This Week&apos;s Offer Window Closes In</p>
              <div className="text-[24px] font-extrabold tabular-nums text-[#1a1a1a]">{cdA}</div>
            </div>
            <div style={{ background: "#fbf4f4", border: "1px solid #f0d9d9" }} className="rounded-lg px-2.5 py-3.5">
              <p style={{ color: C.warn }} className="text-xs uppercase tracking-[0.08em] font-bold mb-1.5">Program Enrollment Ends In</p>
              <div className="text-[24px] font-extrabold tabular-nums text-[#1a1a1a]">{cdB}</div>
            </div>
          </div>
          <p style={{ color: C.warn }} className="text-[14px] font-bold mb-[18px]">Just {slots} offer reviews remaining for homeowners in our area this week</p>
          <a href="#offer-form" onClick={(e) => { e.preventDefault(); scrollToForm() }} style={{ background: C.cta }} className="block w-full text-white no-underline font-extrabold text-[17px] text-center px-5 py-[17px] rounded-[40px] hover:opacity-95 transition-opacity">
            See What My Home Qualifies For →
          </a>
        </aside>

        <p style={{ color: C.muted }} className="max-w-[760px] mx-auto mt-10 text-[12px] leading-[1.5] text-center">
          This is an advertorial. {companyName} is a real estate investment company. It is not a licensed real estate brokerage and does not provide brokerage services. Cash offers depend on the condition of the property, its location, and its market value. No offer is binding until it is put in writing. Requesting an offer carries no cost and no obligation. Testimonials describe individual experiences and do not guarantee any particular result.
        </p>
      </article>

      <div style={{ borderBottom: `1px solid ${C.rule}`, boxShadow: "0 6px 20px rgba(0,0,0,.10)", transform: showSticky && !modalOpen ? "none" : "translateY(-120%)", transition: "transform .3s ease" }} className="fixed left-0 right-0 top-0 z-40 bg-white px-4 py-3">
        <div className="max-w-[760px] mx-auto flex gap-2.5 items-center">
          <label className="hidden sm:block text-[13px] font-bold whitespace-nowrap">Type your address to begin:</label>
          <div className="flex-1 min-w-0">
            <AddressAutocomplete value={stickyAddr} onChange={setStickyAddr} onSelect={handleStickySelect} placeholder="Your property address" bounds={serviceBounds || undefined} />
          </div>
          <button onClick={openModalFromButton} style={{ background: C.cta }} className="px-4 sm:px-[18px] py-3 text-white rounded-[9px] text-[14px] sm:text-[15px] font-extrabold whitespace-nowrap hover:opacity-95 transition-opacity">See My Cash Offer →</button>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto p-4" style={{ background: "rgba(0,0,0,0.55)" }} onClick={() => setModalOpen(false)}>
          <div className="relative w-full max-w-[600px] my-4" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setModalOpen(false)} aria-label="Close" className="absolute -top-3 -right-3 z-10 h-9 w-9 rounded-full bg-white text-gray-700 text-xl font-bold shadow-md flex items-center justify-center hover:bg-gray-100">×</button>
            <SurveyCard initialAddress={seeded || undefined} />
          </div>
        </div>
      )}
    </div>
  )
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-[23px] md:text-[30px] leading-[1.22] font-extrabold text-center my-[52px] mb-[26px] tracking-[-0.005em]">{children}</h2>
}
function FullImage({ src, alt }: { src: string; alt: string }) {
  return <figure className="my-[8px] mb-[30px]"><Image src={src} alt={alt} width={760} height={500} className="block w-full h-auto rounded-[3px] bg-gray-100" /></figure>
}
