"use client";

import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { useEffect, useMemo, useState } from "react";

type MembershipTier = "A" | "B" | "C";

const videos = [
  { id: "v1", title: "Video 1: Intro Membership" },
  { id: "v2", title: "Video 2: Materi Dasar" },
  { id: "v3", title: "Video 3: Materi Lanjutan" },
  { id: "v4", title: "Video 4: Studi Kasus" },
  { id: "v5", title: "Video 5: Bonus" },
];

const contents = [
  { id: "c1", title: "Konten 1: Panduan Awal" },
  { id: "c2", title: "Konten 2: Checklist" },
  { id: "c3", title: "Konten 3: Template" },
  { id: "c4", title: "Konten 4: Studi Kasus" },
  { id: "c5", title: "Konten 5: Bonus" },
];

const menus = [
  { id: "m1", title: "Menu 1: Materi Dasar" },
  { id: "m2", title: "Menu 2: Template" },
  { id: "m3", title: "Menu 3: Studi Kasus" },
  { id: "m4", title: "Menu 4: Bonus" },
  { id: "m5", title: "Menu 5: Webinar" },
  { id: "m6", title: "Menu 6: Toolkit" },
  { id: "m7", title: "Menu 7: Forum" },
  { id: "m8", title: "Menu 8: Sertifikat" },
  { id: "m9", title: "Menu 9: Settings" },
  { id: "m10", title: "Menu 10: Komunitas" },
];

const tierLimits: Record<MembershipTier, number | "all"> = {
  A: 1,
  B: 3,
  C: "all",
};

const tierInfo: Record<MembershipTier, { label: string; summary: string }> = {
  A: {
    label: "Membership A",
    summary: "Starter access untuk memulai komunitas kecil.",
  },
  B: {
    label: "Membership B",
    summary: "Akses menengah untuk konten mingguan.",
  },
  C: {
    label: "Membership C",
    summary: "Akses penuh untuk semua konten premium.",
  },
};

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [selectedTier, setSelectedTier] = useState<MembershipTier | null>(null);
  const [appliedTier, setAppliedTier] = useState<MembershipTier | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const resolveTier = (tier?: MembershipTier | null) =>
    tier && tierLimits[tier] ? tier : null;
  const sessionTier = (
    session?.user as { membershipTier?: MembershipTier } | undefined
  )?.membershipTier;
  const resolvedSelectedTier =
    resolveTier(selectedTier) ?? resolveTier(sessionTier) ?? "A";
  const resolvedAppliedTier =
    resolveTier(appliedTier) ?? resolveTier(sessionTier) ?? "A";
  const { visibleVideos, visibleContents, visibleMenuCount } = useMemo(() => {
    const limit = tierLimits[resolvedAppliedTier];
    const slice = (items: typeof videos) =>
      limit === "all" ? items : items.slice(0, limit);

    return {
      visibleVideos: slice(videos),
      visibleContents: slice(contents),
      visibleMenuCount: limit === "all" ? menus.length : limit,
    };
  }, [resolvedAppliedTier]);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/sign-in");
      return;
    }

  }, [isPending, session, router]);

  if (isPending)
    return <p className="text-center mt-8 text-white">Loading...</p>;
  if (!session?.user)
    return <p className="text-center mt-8 text-white">Redirecting...</p>;

  const { user } = session;

  return (
    <main className="min-h-screen bg-ink text-sand">
      <div className="mesh" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <div className="mx-auto w-full max-w-6xl space-y-10 px-6 py-10">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">
              MemberHaus Dashboard
            </p>
            <h1 className="text-3xl font-semibold">Welcome, {user.name || "User"}!</h1>
            <p className="text-sm text-stone-300">Email: {user.email}</p>
            <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
              Preview build - sample data only
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => router.push("/settings")}
              className="rounded-full border border-stone-700 bg-ink/60 px-5 py-2 text-sm text-stone-200 transition hover:border-stone-500"
            >
              Settings
            </button>
            <button
              onClick={() => signOut()}
              className="rounded-full bg-sand px-5 py-2 text-sm font-semibold text-ink transition hover:bg-amber-200"
            >
              Sign Out
            </button>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-stone-800 bg-charcoal p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
              Active tier
            </p>
            <p className="mt-4 text-2xl font-semibold text-sand">
              {tierInfo[resolvedAppliedTier].label}
            </p>
            <p className="mt-2 text-sm text-stone-300">
              {tierInfo[resolvedAppliedTier].summary}
            </p>
          </div>
          <div className="rounded-3xl border border-stone-800 bg-charcoal p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
              Access usage
            </p>
            <p className="mt-4 text-2xl font-semibold text-sand">
              {visibleVideos.length}/{videos.length} videos
            </p>
            <p className="mt-2 text-sm text-stone-300">
              {visibleContents.length}/{contents.length} konten aktif.
            </p>
          </div>
          <div className="rounded-3xl border border-stone-800 bg-charcoal p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
              Next actions
            </p>
            <p className="mt-4 text-2xl font-semibold text-sand">2 pending</p>
            <p className="mt-2 text-sm text-stone-300">
              Jadwalkan drop konten & evaluasi engagement minggu ini.
            </p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-stone-800 bg-charcoal p-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Pilih Membership</h2>
              <p className="text-sm text-stone-300">
                Sesuaikan akses konten dan video untuk tiap member.
              </p>
            </div>

            <fieldset className="mt-6 grid gap-4">
              <legend className="sr-only">Tipe Membership</legend>

              {(["A", "B", "C"] as MembershipTier[]).map((tier) => (
                <label
                  key={tier}
                  className={`flex items-start gap-3 rounded-2xl border px-4 py-3 transition ${
                    resolvedSelectedTier === tier
                      ? "border-amber-200 bg-amber-200/10"
                      : "border-stone-800 bg-ink/60 hover:border-stone-600"
                  }`}
                >
                  <input
                    type="radio"
                    name="membership-filter"
                    value={tier}
                    checked={resolvedSelectedTier === tier}
                    onChange={() => setSelectedTier(tier)}
                    className="mt-1"
                  />
                  <div>
                    <p className="font-medium text-sand">
                      {tierInfo[tier].label}
                    </p>
                    <p className="text-sm text-stone-300">
                      {tier === "A"
                        ? "Akses 1 video dan 1 konten."
                        : tier === "B"
                        ? "Akses 3 video dan 3 konten."
                        : "Akses penuh semua video dan konten."}
                    </p>
                  </div>
                </label>
              ))}
            </fieldset>

            <div className="mt-6">
              {saveError && (
                <div className="mb-4 rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                  {saveError}
                </div>
              )}
              <button
                onClick={async () => {
                  setSaveError(null);
                  setIsSaving(true);

                  try {
                    const response = await fetch("/api/membership", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ tier: resolvedSelectedTier }),
                    });

                    if (!response.ok) {
                      setSaveError("Membership gagal disimpan. Silakan coba lagi.");
                      return;
                    }

                    setAppliedTier(resolvedSelectedTier);
                  } catch {
                    setSaveError("Membership gagal disimpan. Silakan coba lagi.");
                  } finally {
                    setIsSaving(false);
                  }
                }}
                className="w-full rounded-full bg-sand px-4 py-3 text-sm font-semibold text-ink transition hover:bg-amber-200"
                disabled={isSaving}
              >
                {isSaving ? "Menyimpan..." : "Simpan Membership"}
              </button>
            </div>
          </div>

          <div className="rounded-3xl border border-stone-800 bg-charcoal p-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Quick Actions</h2>
              <p className="text-sm text-stone-300">
                Akses cepat ke menu penting.
              </p>
            </div>
            <div className="mt-6 grid gap-4">
              <button
                onClick={() => router.push("/settings")}
                className="rounded-2xl border border-stone-800 bg-ink/60 px-4 py-4 text-left transition hover:border-stone-600"
              >
                <p className="text-sm font-semibold">Settings</p>
                <p className="text-xs text-stone-300">
                  Kelola profil, notifikasi, dan preferensi akun.
                </p>
              </button>
              <button
                onClick={() => router.push("/content")}
                className="rounded-2xl border border-stone-800 bg-ink/60 px-4 py-4 text-left transition hover:border-stone-600"
              >
                <p className="text-sm font-semibold">Konten & Video</p>
                <p className="text-xs text-stone-300">
                  Lihat materi sesuai membership yang dipilih.
                </p>
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-stone-800 bg-charcoal p-6">
            <div>
              <h2 className="text-xl font-semibold">Video</h2>
              <p className="text-sm text-stone-300">
                Menampilkan {visibleVideos.length}/{videos.length} video.
              </p>
            </div>
            <ul className="mt-4 space-y-3">
              {visibleVideos.map((video) => (
                <li
                  key={video.id}
                  className="rounded-2xl border border-stone-800 bg-ink/60 px-4 py-3 text-sm"
                >
                  {video.title}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-stone-800 bg-charcoal p-6">
            <div>
              <h2 className="text-xl font-semibold">Konten</h2>
              <p className="text-sm text-stone-300">
                Menampilkan {visibleContents.length}/{contents.length} konten.
              </p>
            </div>
            <ul className="mt-4 space-y-3">
              {visibleContents.map((content) => (
                <li
                  key={content.id}
                  className="rounded-2xl border border-stone-800 bg-ink/60 px-4 py-3 text-sm"
                >
                  {content.title}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="rounded-3xl border border-stone-800 bg-charcoal p-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold">Menu Akses</h2>
              <p className="text-sm text-stone-300">
                Menu terkunci mengikuti membership yang dipilih.
              </p>
            </div>
            <button
              onClick={() => router.push("/content")}
              className="rounded-full border border-stone-700 bg-ink/60 px-4 py-2 text-sm text-stone-200 transition hover:border-stone-500"
            >
              Buka Halaman Konten & Video
            </button>
          </div>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {menus.map((menu, index) => {
              const isLocked = index >= visibleMenuCount;
              return (
                <li
                  key={menu.id}
                  className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm ${
                    isLocked
                      ? "border-stone-800 bg-ink/40 text-stone-400"
                      : "border-stone-700 bg-ink/60"
                  }`}
                >
                  <span>{menu.title}</span>
                  {isLocked && (
                    <span className="rounded-full bg-stone-800 px-3 py-1 text-xs text-stone-300">
                      Terkunci
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </main>
  );
}