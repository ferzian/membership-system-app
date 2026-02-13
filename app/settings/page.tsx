import Link from "next/link";

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-ink text-sand">
      <div className="mesh" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <div className="mx-auto w-full max-w-5xl space-y-8 px-6 py-10">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
              Pengaturan
            </p>
            <h1 className="text-3xl font-semibold">Settings Akun</h1>
            <p className="text-sm text-stone-300">
              Atur profil, notifikasi, dan preferensi membership Anda.
            </p>
            <p className="text-xs uppercase tracking-[0.3em] text-stone-500">
              Preview build - sample data only
            </p>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-stone-300 transition hover:text-sand"
          >
            Kembali ke Dashboard
          </Link>
        </header>

        <section className="rounded-3xl border border-stone-800 bg-charcoal p-6 space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Profil</h2>
            <p className="text-sm text-stone-300">
              Perbarui nama tampilan dan bio singkat.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.2em] text-stone-500">
                Nama Tampilan
              </label>
              <div className="rounded-2xl border border-stone-800 bg-ink/60 px-4 py-3 text-sm text-stone-300">
                Member Haus
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.2em] text-stone-500">
                Role
              </label>
              <div className="rounded-2xl border border-stone-800 bg-ink/60 px-4 py-3 text-sm text-stone-300">
                Creator
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-stone-800 bg-ink/60 px-4 py-3 text-sm text-stone-300">
            Bio singkat akan tampil di halaman komunitas Anda.
          </div>
        </section>

        <section className="rounded-3xl border border-stone-800 bg-charcoal p-6 space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Notifikasi</h2>
            <p className="text-sm text-stone-300">
              Tentukan update yang ingin Anda terima.
            </p>
          </div>
          <div className="grid gap-3">
            {[
              "Update pembayaran dan invoice",
              "Aktivitas member baru",
              "Pengingat event dan webinar",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between rounded-2xl border border-stone-800 bg-ink/60 px-4 py-3"
              >
                <span className="text-sm">{item}</span>
                <span className="text-xs text-emerald-200">Aktif</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-stone-800 bg-charcoal p-6 space-y-4">
          <div>
            <h2 className="text-xl font-semibold">Preferensi Membership</h2>
            <p className="text-sm text-stone-300">
              Sesuaikan pengalaman untuk member Anda.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Tema premium",
              "Akses konten mingguan",
              "Badge loyalitas",
              "Preview materi",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-stone-800 bg-ink/60 px-4 py-3 text-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
