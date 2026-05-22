// Single source of truth for the advertorial article library.
// Used by the /articles index and the "keep reading" loop at the bottom of every article.

export interface ArticleMeta {
  slug: string // full path, e.g. "/articles/whats-the-catch"
  title: string
  teaser: string
  image: string
}

export const ARTICLES: ArticleMeta[] = [
  {
    slug: "/articles/what-happens-next",
    title:
      "What Actually Unfolds Once You Ask for a Cash Offer (It Catches Most Homeowners Off Guard)",
    teaser:
      "An unhurried, step-by-step tour of the whole process, so nothing blindsides you and nobody leans on you.",
    image: "/images/adv-keys-couple.jpg",
  },
  {
    slug: "/articles/the-truth-about-lowball-offers",
    title:
      "The Honest Story Behind 'Lowball' Cash Offers, Told by the People Who Write Them",
    teaser:
      "How a fair cash number is genuinely figured, and why the amount you keep matters far more than the headline price.",
    image: "/images/adv-handshake.jpg",
  },
  {
    slug: "/articles/real-buyer-vs-tire-kicker",
    title:
      "How to Spot a Real Local Home Buyer From a Tire-Kicker in Roughly 5 Minutes",
    teaser:
      "A straightforward five-point checklist for sizing up any cash buyer and protecting yourself before you put pen to paper.",
    image: "/images/adv-local-team.jpg",
  },
  {
    slug: "/articles/cash-offer-vs-agent",
    title:
      "Cash Offer or List With an Agent? A Straight Look at What You Truly Pocket",
    teaser:
      "An even-handed look at both routes side by side, so you land on the one that fits your home and your life.",
    image: "/images/adv-strangers-open-house.jpg",
  },
  {
    slug: "/articles/whats-the-catch",
    title:
      "What Is the Catch With a Cash Offer? A Straight Look at Why It Sounds Too Good to Be True",
    teaser:
      "No repairs, no fees, no showings. Here is exactly where the money comes from, and what the genuine trade-off is.",
    image: "/images/adv-couple-kitchen.jpg",
  },
  {
    slug: "/articles/fix-up-before-selling",
    title:
      "Should You Fix Up the House Before You Sell? The Math Most Homeowners Read Wrong",
    teaser:
      "The gut instinct is to renovate first. Here is why fixing up so often costs you more than it ever hands back.",
    image: "/images/adv-homeowner-repair.jpg",
  },
  {
    slug: "/articles/real-cash-buyer-vs-scam",
    title:
      "How to Tell a Real Cash Buyer From a Scam: 5 Questions That Lay the Difference Bare",
    teaser:
      "Five plain questions a legitimate buyer answers without blinking, so you can keep yourself safe.",
    image: "/images/adv-phone-vetting.jpg",
  },
  {
    slug: "/articles/wait-for-better-market",
    title:
      "Is This a Bad Time to Sell? Why Holding Out for a Better Market Can Quietly Drain You",
    teaser:
      "Waiting for a higher price feels patient. Here is the price tag the waiting itself quietly runs up.",
    image: "/images/adv-couple-window.jpg",
  },
  {
    slug: "/articles/sell-it-yourself",
    title:
      "Why Not Just Sell It Yourself and Cut Out the Middleman? The Hidden Cost of Going Solo",
    teaser:
      "Selling on your own sounds like keeping every last dollar. Here is what it really demands, and where it tends to go sideways.",
    image: "/images/adv-paperwork-alone.jpg",
  },
]
