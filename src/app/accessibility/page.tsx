import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: "Roam's commitment to digital accessibility and WCAG 2.1 AA compliance.",
};

export default function AccessibilityPage() {
  return (
    <main id="main-content" className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <Link
          href="/"
          className="text-electric-indigo hover:text-electric-indigo/80 text-sm font-medium mb-8 inline-block"
        >
          ← Back to Home
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold text-midnight mb-8">
          Accessibility Statement
        </h1>

        <div className="prose prose-slate max-w-none space-y-8">
          <p className="text-slate-500 text-sm">
            Last Updated: January 15, 2026
          </p>

          <p className="text-slate-600">
            Roam is committed to ensuring digital accessibility for people with disabilities.
            We strive to meet <strong>WCAG 2.1 Level AA</strong> standards and continuously
            improve the user experience for everyone.
          </p>

          <section>
            <h2 className="text-xl font-semibold text-midnight mb-3">
              Feedback
            </h2>
            <p className="text-slate-600">
              If you encounter any accessibility barriers, please contact us at{" "}
              <a href="mailto:accessibility@roamhq.co" className="text-electric-indigo hover:underline">
                accessibility@roamhq.co
              </a>
              . We aim to respond within 3 business days.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
