import PageShell from "../components/PageShell";

export default function AboutPage() {
  return (
    <PageShell>
      <section className="section-wrap py-16">
        <h1 className="font-heading text-4xl font-extrabold">About Future Fit Studio</h1>
        <p className="mt-4 max-w-3xl text-slate-600 dark:text-slate-300">
          We are a local fitness studio committed to helping people transform their lifestyle through training, nutrition, and mindset support.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="glass p-6">
            <h2 className="font-heading text-2xl font-bold">Owner Profile</h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              Coach Arjun Mehta has 10+ years of experience in strength coaching and functional training, guiding over 1,500 successful transformations.
            </p>
          </div>
          <div className="glass p-6">
            <h2 className="font-heading text-2xl font-bold">Mission & Vision</h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              Mission: Make professional fitness coaching accessible for every local family. Vision: Build the most trusted wellness community in the city.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="glass p-5 text-center">
            <p className="font-heading text-3xl font-extrabold text-brand-600">10+</p>
            <p className="text-sm">Years of coaching</p>
          </div>
          <div className="glass p-5 text-center">
            <p className="font-heading text-3xl font-extrabold text-brand-600">1500+</p>
            <p className="text-sm">Client transformations</p>
          </div>
          <div className="glass p-5 text-center">
            <p className="font-heading text-3xl font-extrabold text-brand-600">4.9/5</p>
            <p className="text-sm">Average member rating</p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
