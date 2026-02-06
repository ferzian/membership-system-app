"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-ink text-sand">
      <div className="mesh" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <header className="mx-auto w-full max-w-6xl px-6 pt-8">
        <nav className="flex items-center justify-between rounded-full border border-stone-800 bg-ink/70 px-5 py-3 backdrop-blur">
          <div className="text-lg font-semibold tracking-tight">MemberHaus</div>
          <div className="hidden items-center gap-6 text-sm text-stone-300 md:flex">
            <a href="#features" className="hover:text-sand">
              Features
            </a>
            <a href="#plans" className="hover:text-sand">
              Plans
            </a>
            <a href="#stories" className="hover:text-sand">
              Stories
            </a>
            <a href="#faq" className="hover:text-sand">
              FAQ
            </a>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/sign-in")}
              className="rounded-full border border-stone-700 px-4 py-2 text-sm font-medium text-stone-200 transition hover:border-stone-500 hover:text-sand">
              Sign In
            </button>
            <button
              onClick={() => router.push("/sign-up")}
              className="rounded-full bg-sand px-4 py-2 text-sm font-semibold text-ink transition hover:bg-amber-200">
              Start Free
            </button>
          </div>
        </nav>
      </header>

      <section className="mx-auto w-full max-w-6xl px-6 pb-24 pt-20">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-stone-800 bg-ink/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-stone-300">
              Membership operating system
              <span className="rounded-full bg-emerald-400/20 px-2 py-1 text-[10px] text-emerald-200">
                Live
              </span>
            </div>
            <h1 className="text-balance text-4xl font-semibold leading-tight text-sand sm:text-5xl lg:text-6xl">
              Build a paid community that feels premium from day one.
            </h1>
            <p className="max-w-xl text-lg text-stone-300">
              Launch tiers, gated content, and member events in minutes. Automate
              onboarding, renewals, and perks while your audience stays focused on
              the experience.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => router.push("/sign-up")}
                className="rounded-full bg-sand px-6 py-3 text-sm font-semibold text-ink transition hover:bg-amber-200">
                Create My Membership
              </button>
              <button
                onClick={() => router.push("/sign-in")}
                className="rounded-full border border-stone-700 px-6 py-3 text-sm font-semibold text-sand transition hover:border-stone-500">
                View Dashboard
              </button>
            </div>
            <div className="flex flex-wrap gap-6 text-xs uppercase tracking-[0.3em] text-stone-500">
              <span>Automated billing</span>
              <span>Gatekeeper content</span>
              <span>Member insights</span>
            </div>
          </div>
          <div className="rounded-3xl border border-stone-800 bg-ink/60 p-6 shadow-hero">
            <div className="rounded-2xl border border-stone-800 bg-charcoal p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
                    Active members
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-sand">2,486</p>
                </div>
                <div className="rounded-full border border-stone-700 bg-ink/70 px-3 py-2 text-xs text-stone-300">
                  +18% this month
                </div>
              </div>
              <div className="mt-6 grid gap-4">
                {["Onboarding flows", "Tier upgrades", "Events & perks"].map(
                  (item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between rounded-2xl border border-stone-800 bg-ink px-4 py-3">
                      <span className="text-sm text-stone-200">{item}</span>
                      <span className="text-xs text-emerald-200">Active</span>
                    </div>
                  )
                )}
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div className="rounded-2xl border border-stone-800 bg-ink px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                    MRR
                  </p>
                  <p className="mt-2 text-lg text-sand">$48,920</p>
                </div>
                <div className="rounded-2xl border border-stone-800 bg-ink px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.2em] text-stone-500">
                    Churn
                  </p>
                  <p className="mt-2 text-lg text-sand">1.9%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">
              What you get
            </p>
            <h2 className="text-3xl font-semibold text-sand sm:text-4xl">
              Everything to run a paid membership.
            </h2>
          </div>
          <p className="text-stone-300">
            Control access, design perks, and surface member signals in one
            place. Build an experience that feels curated without a complex
            stack of tools.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Tiered access",
              copy: "Launch public, premium, and VIP tiers with tailored content gates.",
            },
            {
              title: "Automated onboarding",
              copy: "Welcome flows, streaks, and perks delivered the moment they join.",
            },
            {
              title: "Event scheduling",
              copy: "Sync calendars, send invites, and host sessions directly in the hub.",
            },
            {
              title: "Member intelligence",
              copy: "See who is active, who is at risk, and what content converts.",
            },
            {
              title: "Revenue tools",
              copy: "Coupons, upgrades, and annual plans built to reduce churn.",
            },
            {
              title: "Brand control",
              copy: "Customize colors, domain, and tone to match your community.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-stone-800 bg-charcoal p-6 transition hover:border-stone-600">
              <h3 className="text-lg font-semibold text-sand">{feature.title}</h3>
              <p className="mt-2 text-sm text-stone-300">{feature.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="plans" className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">
              Pricing
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-sand sm:text-4xl">
              Choose the plan that fits your stage.
            </h2>
          </div>
          <div className="rounded-full border border-stone-800 bg-ink/60 px-4 py-2 text-xs uppercase tracking-[0.2em] text-stone-400">
            Monthly billing
          </div>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {[
            {
              name: "Starter",
              price: "$19",
              highlight: false,
              points: [
                "500 members",
                "3 tiers",
                "Email automations",
                "Community analytics",
              ],
            },
            {
              name: "Growth",
              price: "$59",
              highlight: true,
              points: [
                "Unlimited members",
                "Advanced perks",
                "Events & streams",
                "Priority support",
              ],
            },
            {
              name: "Enterprise",
              price: "Let’s talk",
              highlight: false,
              points: [
                "Dedicated success",
                "Custom integrations",
                "Migration support",
                "Security reviews",
              ],
            },
          ].map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl border px-6 py-8 ${
                plan.highlight
                  ? "border-amber-200 bg-sand text-ink shadow-glow"
                  : "border-stone-800 bg-charcoal text-sand"
              }`}>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                {plan.highlight ? (
                  <span className="rounded-full bg-ink/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
                    Best value
                  </span>
                ) : null}
              </div>
              <p className="mt-4 text-3xl font-semibold">{plan.price}</p>
              <ul className="mt-6 space-y-3 text-sm">
                {plan.points.map((point) => (
                  <li key={point} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-current" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => router.push("/sign-up")}
                className={`mt-8 w-full rounded-full px-4 py-2 text-sm font-semibold transition ${
                  plan.highlight
                    ? "bg-ink text-sand hover:bg-stone-900"
                    : "border border-stone-700 hover:border-stone-500"
                }`}>
                Start {plan.name}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section id="stories" className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">
              Member stories
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-sand sm:text-4xl">
              Communities that feel like a private club.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                name: "Studio Atlas",
                quote:
                  "We doubled retention in 60 days by adding VIP experiences and streak rewards.",
              },
              {
                name: "Flow Guild",
                quote:
                  "Members love the clean onboarding and the monthly drop events we host.",
              },
              {
                name: "The Quiet Room",
                quote:
                  "Our paid tier hit 1k members without adding new ops hires.",
              },
              {
                name: "Signal Craft",
                quote:
                  "Analytics helped us spot churn before it happened. That changed everything.",
              },
            ].map((story) => (
              <div
                key={story.name}
                className="rounded-3xl border border-stone-800 bg-ink/60 p-6">
                <p className="text-sm text-stone-300">{story.quote}</p>
                <p className="mt-4 text-sm font-semibold text-sand">
                  {story.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-sand sm:text-4xl">
              Everything you need to know.
            </h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "Can I migrate from another platform?",
                a: "Yes. We import members, tiers, and recurring billing in under 48 hours.",
              },
              {
                q: "Do you support custom domains?",
                a: "Every plan includes branded portals and domain mapping.",
              },
              {
                q: "How do trials work?",
                a: "Offer free or paid trials, then automate upgrades when they end.",
              },
              {
                q: "Is there a member mobile app?",
                a: "Members get a progressive web app with offline access and push alerts.",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="rounded-3xl border border-stone-800 bg-charcoal p-6">
                <h3 className="text-base font-semibold text-sand">{item.q}</h3>
                <p className="mt-2 text-sm text-stone-300">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-24">
        <div className="rounded-[40px] border border-stone-800 bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 p-10 text-center shadow-hero sm:p-14">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-400">
            Ready to launch?
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-sand sm:text-4xl">
            Start your membership in under an hour.
          </h2>
          <p className="mt-3 text-sm text-stone-300">
            Invite your founding members, ship perks, and keep every renewal on
            autopilot.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => router.push("/sign-up")}
              className="rounded-full bg-sand px-6 py-3 text-sm font-semibold text-ink transition hover:bg-amber-200">
              Launch MemberHaus
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="rounded-full border border-stone-700 px-6 py-3 text-sm font-semibold text-sand transition hover:border-stone-500">
              Preview Dashboard
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}