import { useState } from "react";
import { useFaq } from "../hooks/useFaq";
import { FaqSkeleton } from "./FaqSkeleton";
import { richTextToPlain } from "../../../helpers/richTextToPlain";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { data: faqs, loading, error } = useFaq();

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-cream">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-emerald font-medium tracking-widest uppercase text-sm mb-4">
            Resolvemos tus dudas
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-cacao mb-4 text-balance">
            Preguntas Frecuentes
          </h2>
          <p className="text-cacao-light max-w-2xl mx-auto leading-relaxed">
            Encuentra respuestas a las preguntas más comunes sobre nuestros
            productos y servicios.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {loading && <FaqSkeleton />}

          {error && (
            <p className="text-center text-cacao-light">
              No se pudieron cargar las preguntas frecuentes.
            </p>
          )}

          {!loading && !error && faqs && faqs.length === 0 && (
            <p className="text-center text-cacao-light">
              No hay preguntas frecuentes disponibles.
            </p>
          )}

          {!loading &&
            !error &&
            faqs?.map((faq, index) => (
              <div key={faq.id} className="mb-4 last:mb-0">
                <button
                  onClick={() => toggleFAQ(index)}
                  className={`w-full flex items-center justify-between p-5 md:p-6 text-left rounded-2xl transition-all duration-300 ${
                    openIndex === index
                      ? "bg-secondary shadow-lg"
                      : "bg-secondary/50 hover:bg-secondary hover:shadow-md"
                  }`}
                  aria-expanded={openIndex === index}
                >
                  <span className="font-serif text-lg md:text-xl font-semibold text-cacao pr-4">
                    {faq.question}
                  </span>
                  <span
                    className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      openIndex === index
                        ? "bg-emerald text-cream rotate-180"
                        : "bg-cacao/10 text-cacao"
                    }`}
                  >
                    <svg
                      className="w-5 h-5 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-5 md:px-6 py-4 md:py-5">
                    <p className="text-cacao-light leading-relaxed">
                      {richTextToPlain(faq.answer)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
