import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "Who can donate blood?",
    answer:
      "Anyone who is healthy, at least 18 years old, and weighs more than 50kg can usually donate blood. However, eligibility is also based on medical history and current health."
  },
  {
    question: "Is blood donation safe?",
    answer:
      "Yes. Blood donation is a safe process. New, sterile equipment is used for each donor, eliminating the risk of contracting any disease."
  },
  {
    question: "How often can I donate blood?",
    answer:
      "You can donate whole blood once every 3 months. Platelets and plasma can be donated more frequently."
  },
  {
    question: "How long does the donation take?",
    answer:
      "The actual blood donation takes 8-10 minutes. The entire process, including registration and post-donation rest, may take about 45 minutes."
  },
  {
    question: "What should I do before donating blood?",
    answer:
      "Eat a healthy meal, stay hydrated, and get a good night’s sleep before donating. Avoid heavy physical activity after donating."
  },
  {
    question: "Can I donate if I have a tattoo or piercing?",
    answer:
      "Yes, you can donate blood after 6 months of getting a tattoo or piercing, provided it was done in a licensed facility."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle expansion on click
  };

  return (
    <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-semibold text-center mb-8 text-red-600">
        Frequently Asked Questions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className={`border rounded-xl shadow-sm transition-all ${
              openIndex === index ? "h-auto" : "h-24"
            }`} // Conditional height based on expansion state
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between px-6 py-4 text-left font-medium text-gray-800 bg-white hover:bg-gray-50 rounded-xl transition"
            >
              <span>{faq.question}</span>
              <ChevronDown
                className={`transform transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4 text-gray-700">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
