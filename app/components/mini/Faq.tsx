import { useState } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  faqs: FAQItem[];
}

export default function FAQ({ faqs }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // default open first item

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full py-10">
      <div className="mx-auto w-full border-y border-[#1F1F1F40] divide-y divide-[#1F1F1F40] text-black shadow-md inter">
        {faqs.map((faq, index) => (
          <div key={index}>
            <button
              onClick={() => toggle(index)}
              className="group flex w-full items-center justify-between px-6 py-4 text-left max-w-screen-xl mx-auto"
            >
              <span className="text-base md:text-xl font-medium md:font-semibold">{faq.question}</span>
              <MdOutlineKeyboardArrowDown
                className={`size-6 md:size-8 text-black transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
              
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4 text-md text-gray-800 max-w-screen-xl mx-auto">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
