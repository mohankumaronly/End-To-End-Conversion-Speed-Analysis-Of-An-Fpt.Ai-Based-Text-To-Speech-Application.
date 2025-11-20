import React, { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import AccordionItem from './AccordionItem'
import { Link } from "react-router-dom";

const FAQSection = () => {
  const faqData = [
    {
      q: "What specific languages and accents are supported?",
      a: "Our primary focus is on high-quality standard Vietnamese, covering Northern, Central, and Southern accents. We also offer robust support for English and several other common regional languages to meet international needs.",
    },
    {
      q: "How is the voice quality maintained and improved?",
      a: "FPT AI utilizes advanced WaveNet and Generative Adversarial Networks (GANs) for voice synthesis. We continuously update our models with new, clean datasets to ensure our voices remain natural, expressive, and minimize synthesis artifacts.",
    },
    {
      q: "Is there an API for developers, and is documentation available?",
      a: "Yes, our service is fully accessible via a scalable REST API. Comprehensive documentation, including code examples for popular languages, is available in our developer portal.",
    },
    {
      q: "How does FPT AI ensure low latency for real-time applications?",
      a: "We utilize highly optimized serving models and distribute our processing infrastructure regionally, ensuring that the distance between the request origin and the synthesis engine is minimal. This guarantees sub-second latency critical for IVR and chat applications.",
    },
  ]

  const [activeIndex, setActiveIndex] = useState(null)
  const toggleAccordion = (index) => setActiveIndex(activeIndex === index ? null : index)

  return (
    <section id="faq" className="py-16 md:py-20 bg-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-10 md:mb-12">
          Frequently Asked Questions (FAQ)
        </h2>
        <div id="faq-accordion" className="space-y-4">
          {faqData.map((item, index) => (
            <AccordionItem
              key={index}
              id={index}
              title={item.q}
              content={item.a}
              isOpen={activeIndex === index}
              onClick={() => toggleAccordion(index)}
            />
          ))}
        </div>
        <div className="mt-10 md:mt-12 text-center">
          <p className="text-base md:text-lg text-gray-600 mb-4">
            Still have questions? Contact our support team.
          </p>

          <Link
            to="/auth"
            className="px-5 py-2.5 md:px-6 md:py-3 text-sm md:text-base font-bold text-white bg-amber-500 rounded-full hover:bg-amber-600 transition duration-300 shadow-md transform hover:scale-[1.05] inline-flex items-center"
          >
            <MessageCircle className="w-5 h-5 inline mr-2" />
            Get Support
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FAQSection
