"use client";

import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { useEffect, useMemo, useState } from "react";

type MembershipTier = "a" | "b" | "c";

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
];

const tierLimits: Record<MembershipTier, number | "all"> = {
  a: 1,
  b: 3,
  c: "all",
};

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const getStoredTier = (): MembershipTier => {
    if (typeof window === "undefined") return "a";
    const stored = window.localStorage.getItem("membershipTier") as
      | MembershipTier
      | null;
    return stored && tierLimits[stored] ? stored : "a";
  };

  const [selectedTier, setSelectedTier] = useState<MembershipTier>(
    () => getStoredTier()
  );
  const [appliedTier, setAppliedTier] = useState<MembershipTier>(
    () => getStoredTier()
  );
  const { visibleVideos, visibleContents, visibleMenuCount } = useMemo(() => {
    const limit = tierLimits[appliedTier];
    const slice = (items: typeof videos) =>
      limit === "all" ? items : items.slice(0, limit);

    return {
      visibleVideos: slice(videos),
      visibleContents: slice(contents),
      visibleMenuCount: limit === "all" ? menus.length : limit,
    };
  }, [appliedTier]);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/sign-in");
    }
  }, [isPending, session, router]);

  if (isPending)
    return <p className="text-center mt-8 text-white">Loading...</p>;
  if (!session?.user)
    return <p className="text-center mt-8 text-white">Redirecting...</p>;

  const { user } = session;

  return (
    <main className="max-w-md h-screen flex items-center justify-center flex-col mx-auto p-6 space-y-6 text-white">
      <div className="w-full text-center space-y-1">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>Welcome, {user.name || "User"}!</p>
        <p>Email: {user.email}</p>
      </div>

      <section className="w-full rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
        <h2 className="text-lg font-semibold">Pilih Membership</h2>
        <p className="text-sm text-neutral-300">
          Pilih membership untuk mengatur akses konten dan video.
        </p>

        <fieldset className="mt-4 space-y-3">
          <legend className="sr-only">Tipe Membership</legend>

          <label className="flex items-start gap-3 rounded-lg border border-neutral-800 p-3 hover:border-neutral-600">
            <input
              type="radio"
              name="membership-filter"
              value="a"
              checked={selectedTier === "a"}
              onChange={() => setSelectedTier("a")}
              defaultChecked
              className="mt-1"
            />
            <div>
              <p className="font-medium">Membership A</p>
              <p className="text-sm text-neutral-300">
                Akses 1 video dan 1 konten.
              </p>
            </div>
          </label>

          <label className="flex items-start gap-3 rounded-lg border border-neutral-800 p-3 hover:border-neutral-600">
            <input
              type="radio"
              name="membership-filter"
              value="b"
              checked={selectedTier === "b"}
              onChange={() => setSelectedTier("b")}
              className="mt-1"
            />
            <div>
              <p className="font-medium">Membership B</p>
              <p className="text-sm text-neutral-300">
                Akses 3 video dan 3 konten.
              </p>
            </div>
          </label>

          <label className="flex items-start gap-3 rounded-lg border border-neutral-800 p-3 hover:border-neutral-600">
            <input
              type="radio"
              name="membership-filter"
              value="c"
              checked={selectedTier === "c"}
              onChange={() => setSelectedTier("c")}
              className="mt-1"
            />
            <div>
              <p className="font-medium">Membership C</p>
              <p className="text-sm text-neutral-300">
                Akses penuh semua video dan konten.
              </p>
            </div>
          </label>
        </fieldset>

        <div className="mt-4">
          <button
            onClick={() => {
              setAppliedTier(selectedTier);
              window.localStorage.setItem("membershipTier", selectedTier);
            }}
            className="w-full bg-white text-black font-medium rounded-md px-4 py-2 hover:bg-gray-200"
          >
            Simpan Membership
          </button>
        </div>
      </section>

      <section className="w-full rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Video</h2>
          <p className="text-sm text-neutral-300">
            Menampilkan {visibleVideos.length}/{videos.length} video.
          </p>
          <ul className="mt-3 space-y-2">
            {visibleVideos.map((video) => (
              <li
                key={video.id}
                className="rounded-md border border-neutral-800 px-3 py-2"
              >
                {video.title}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Konten</h2>
          <p className="text-sm text-neutral-300">
            Menampilkan {visibleContents.length}/{contents.length} konten.
          </p>
          <ul className="mt-3 space-y-2">
            {visibleContents.map((content) => (
              <li
                key={content.id}
                className="rounded-md border border-neutral-800 px-3 py-2"
              >
                {content.title}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="w-full rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 space-y-3">
        <div>
          <h2 className="text-lg font-semibold">Menu Akses</h2>
          <p className="text-sm text-neutral-300">
            Menu terkunci mengikuti membership yang dipilih.
          </p>
        </div>
        <ul className="space-y-2">
          {menus.map((menu, index) => {
            const isLocked = index >= visibleMenuCount;
            return (
              <li
                key={menu.id}
                className={`rounded-md border px-3 py-2 flex items-center justify-between ${
                  isLocked
                    ? "border-neutral-800 bg-neutral-900/40 text-neutral-400"
                    : "border-neutral-700"
                }`}
              >
                <span>{menu.title}</span>
                {isLocked && (
                  <span className="text-xs bg-neutral-800 text-neutral-300 px-2 py-1 rounded">
                    Terkunci
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <button
        onClick={() => router.push("/content")}
        className="w-full border border-neutral-600 text-white font-medium rounded-md px-4 py-2 hover:bg-neutral-900"
      >
        Buka Halaman Konten & Video
      </button>

      <button
        onClick={() => signOut()}
        className="w-full bg-white text-black font-medium rounded-md px-4 py-2 hover:bg-gray-200"
      >
        Sign Out
      </button>
    </main>
  );
}