import Link from "next/link";

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto w-full max-w-3xl px-6 py-10 space-y-8">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
            Pengaturan
          </p>
          <h1 className="text-3xl font-semibold">Settings Akun</h1>
          <p className="text-sm text-neutral-300">
            Atur profil, notifikasi, dan preferensi membership Anda.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-neutral-300 hover:text-white"
          >
            Kembali ke Dashboard
          </Link>
        </header>

        <section className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Profil</h2>
            <p className="text-sm text-neutral-300">
              Perbarui nama tampilan dan bio singkat.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                Nama Tampilan
              </label>
              <div className="rounded-lg border border-neutral-800 bg-neutral-950/40 px-3 py-2 text-sm text-neutral-300">
                Member Haus
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.2em] text-neutral-400">
                Role
              </label>
              <div className="rounded-lg border border-neutral-800 bg-neutral-950/40 px-3 py-2 text-sm text-neutral-300">
                Creator
              </div>
            </div>
          </div>
          <div className="rounded-lg border border-neutral-800 bg-neutral-950/40 px-3 py-2 text-sm text-neutral-300">
            Bio singkat akan tampil di halaman komunitas Anda.
          </div>
        </section>

        <section className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Notifikasi</h2>
            <p className="text-sm text-neutral-300">
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
                className="flex items-center justify-between rounded-lg border border-neutral-800 bg-neutral-950/40 px-3 py-2"
              >
                <span className="text-sm">{item}</span>
                <span className="text-xs text-emerald-200">Aktif</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Preferensi Membership</h2>
            <p className="text-sm text-neutral-300">
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
                className="rounded-lg border border-neutral-800 bg-neutral-950/40 px-3 py-2 text-sm"
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
