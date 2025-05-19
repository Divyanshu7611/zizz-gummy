import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import FAQ from "../mini/Faq";


export default function Example() {
    const faqData = [
  {
    question: 'What is the flavour of the Sleep gummies?',
    answer: "If you're unhappy with your purchase, we'll refund you in full.",
  },
  {
    question: 'How do I take the Sleep gummies?',
    answer: 'No.',
  },
   {
    question: 'When will I see the effects of my Sleep treatment?',
    answer: 'No.',
  },
   {
    question: "What's in the Sleep gummies?",
    answer: 'No.',
  },
   {
    question: 'At what age can you start enjoying the Sleep gummies?',
    answer: 'No.',
  },
   {
    question: 'Can I extend my Sleep treatment',
    answer: 'No.',
  },
   {
    question: 'Pregnancy, breastfeeding or medical treatment, what are the restrictions?',
    answer: 'No.',
  },
];


  return (
    <div>
        <h1 className="text-black inter font-bold md:text-4xl text-2xl text-center mt-10">FAQs About Gummies</h1> 
        <FAQ faqs={faqData}/>
    </div>
  )
}
