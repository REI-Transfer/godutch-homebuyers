import { Header } from "@/components/v2/header";
import { HeroSection } from "@/components/v2/hero-section";
import { PhilosophySection } from "@/components/v2/philosophy-section";
import { VslSection } from "@/components/v2/vsl-section";
import { TrustSection } from "@/components/v2/trust-section";
import { SalesLetterSection } from "@/components/v2/sales-letter-section";
import { FaqSection } from "@/components/v2/faq-section";
import { FooterSection } from "@/components/v2/footer-section";
import { getHeadlineForUtm } from "@/lib/headline-router";
import { DEFAULT_HEADLINE } from "@/lib/headline-overrides";

// Force dynamic rendering so searchParams is read on every request and Vercel
// never serves a stale cached variant with the wrong headline. Server-rendered,
// no flash, no client hydration cost.
export const dynamic = "force-dynamic";

// Next.js 16 made searchParams ASYNC (a Promise). Server components must
// await it before accessing properties — synchronous access returns undefined.
export default async function V2Page({
  searchParams,
}: {
  searchParams: Promise<{ utm_content?: string }>;
}) {
  const params = await searchParams;

  // Dynamic-headline scent match. If utm_content matches a row in
  // lib/headline-overrides.ts, swap H1 + sub. Otherwise fall back to DEFAULT.
  // Naming contract: ~/.claude/projects/-Users-williamyu/memory/feedback_ad-name-scent-contract.md
  const matched = getHeadlineForUtm(params?.utm_content);
  const heroH1 = matched?.h1 ?? DEFAULT_HEADLINE.h1;
  const heroSub = matched?.sub ?? DEFAULT_HEADLINE.sub;

  return (
    <main className="v2-light min-h-screen">
      <Header />
      <HeroSection h1={heroH1} sub={heroSub} />
      <PhilosophySection />
      <VslSection />
      <TrustSection />
      <SalesLetterSection />
      <FaqSection />
      <FooterSection />
    </main>
  );
}
