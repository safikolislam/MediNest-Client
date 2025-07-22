import React from "react";

export default function FAQAccordion() {
  return (
    <section className="max-w-3xl mx-auto p-4 space-y-2">
      <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>

      <div className="collapse collapse-arrow bg-base-100 border border-base-300">
        <input type="radio" name="faq-accordion" defaultChecked />
        <div className="collapse-title font-semibold cursor-pointer">
          How do I create an account on the medicine platform?
        </div>
        <div className="collapse-content text-sm">
          Click the "Join Us" button in the top navbar, fill out the registration form by providing your username, email, password, photo, and select your role (user or seller). Then submit to create your account.
        </div>
      </div>

      <div className="collapse collapse-arrow bg-base-100 border border-base-300">
        <input type="radio" name="faq-accordion" />
        <div className="collapse-title font-semibold cursor-pointer">
          Can I buy medicines from multiple sellers in one order?
        </div>
        <div className="collapse-content text-sm">
          Yes! Our multi-vendor platform lets you select medicines from different sellers and add them all to your cart before checkout.
        </div>
      </div>

      <div className="collapse collapse-arrow bg-base-100 border border-base-300">
        <input type="radio" name="faq-accordion" />
        <div className="collapse-title font-semibold cursor-pointer">
          How do I pay for my medicines?
        </div>
        <div className="collapse-content text-sm">
          We use Stripe for secure payment processing. You can pay online during checkout using your credit or debit card. After successful payment, you will receive an invoice.
        </div>
      </div>

      <div className="collapse collapse-arrow bg-base-100 border border-base-300">
        <input type="radio" name="faq-accordion" />
        <div className="collapse-title font-semibold cursor-pointer">
          How can sellers advertise their medicines on the homepage slider?
        </div>
        <div className="collapse-content text-sm">
          Sellers can request advertisement for their products via the Seller Dashboard’s “Ask For Advertisement” section. Admin approves and manages which medicines appear in the homepage slider.
        </div>
      </div>

      <div className="collapse collapse-arrow bg-base-100 border border-base-300">
        <input type="radio" name="faq-accordion" />
        <div className="collapse-title font-semibold cursor-pointer">
          What should I do if I forget my password?
        </div>
        <div className="collapse-content text-sm">
          Currently, password recovery can be done by logging in through Google or GitHub social login, or by creating a new account if you cannot remember your password.
        </div>
      </div>

      <div className="collapse collapse-arrow bg-base-100 border border-base-300">
        <input type="radio" name="faq-accordion" />
        <div className="collapse-title font-semibold cursor-pointer">
          How can I track my orders and payment history?
        </div>
        <div className="collapse-content text-sm">
          Registered users can view their payment and purchase history in the User Dashboard under the Payment History section.
        </div>
      </div>

      <div className="collapse collapse-arrow bg-base-100 border border-base-300">
        <input type="radio" name="faq-accordion" />
        <div className="collapse-title font-semibold cursor-pointer">
          Is the website optimized for mobile devices?
        </div>
        <div className="collapse-content text-sm">
          Yes! The website and all dashboards are fully responsive and designed to work smoothly on mobile phones, tablets, and desktop devices.
        </div>
      </div>
    </section>
  );
}
