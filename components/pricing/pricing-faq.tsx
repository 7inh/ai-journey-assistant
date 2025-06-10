"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const faqs: FAQItem[] = [
  {
    question: "How do I upgrade or downgrade my plan?",
    answer: (
      <p>
        You can upgrade or downgrade your plan at any time from your account
        settings. When upgrading, the new benefits will be available
        immediately. When downgrading, changes will take effect at the end of
        your current billing cycle.
      </p>
    ),
  },
  {
    question: "Are there any long-term contracts?",
    answer: (
      <p>
        No, all our paid plans are billed monthly or annually with no long-term
        commitment. You can cancel your subscription at any time from your
        account settings.
      </p>
    ),
  },
  {
    question: "What payment methods are accepted?",
    answer: (
      <p>
        We accept all major credit cards (Visa, Mastercard, American Express) as
        well as PayPal. For Team plans with annual billing, we also offer
        invoice payment options.
      </p>
    ),
  },
  {
    question: "What happens when I reach my usage limits?",
    answer: (
      <p>
        For Free plan users, you'll need to wait until your limits reset (daily
        for conversations, monthly for storage). Pro and Team plan users can
        purchase additional capacity if needed, or upgrade to a higher tier plan
        for increased limits.
      </p>
    ),
  },
  {
    question: "Is there a refund policy?",
    answer: (
      <p>
        We offer a 14-day money-back guarantee for first-time subscribers to our
        paid plans. If you're not satisfied with our service, contact our
        support team within 14 days of your initial payment for a full refund.
      </p>
    ),
  },
  {
    question: "Can I try the Pro features before subscribing?",
    answer: (
      <p>
        Yes! New users can start a 7-day free trial of our Pro plan. You'll need
        to provide payment details, but you won't be charged until the trial
        period ends, and you can cancel anytime.
      </p>
    ),
  },
];

export function PricingFAQ() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground">
          Everything you need to know about our pricing
        </p>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
