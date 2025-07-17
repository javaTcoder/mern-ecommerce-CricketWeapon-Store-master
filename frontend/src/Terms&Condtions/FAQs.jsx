import React from "react";
import "./FAQs.css";
import MetaData from "../component/layouts/MataData/MataData";

const FAQs = () => {
  return (
    <div className="faq-container">
      <MetaData title="FAQs - ProductTrust" />
      <h1 className="faq-title">🧠 FAQs - ProductTrust
      </h1>
      <div className="faq-list">
        <div className="faq-item">
          <h2>1. What type of T-shirts do you sell?</h2>
          <p>
            We sell high-quality T-shirts under our student-focused brand <strong>Next Toppers</strong>. Each shirt is designed to inspire confidence, motivation, and a "topper" mindset.
          </p>
        </div>
        <div className="faq-item">
          <h2>2. What sizes are available?</h2>
          <p>
            We offer sizes ranging from S to XXL. Please check our Size Guide before placing your order to ensure a perfect fit.
          </p>
        </div>
        <div className="faq-item">
          <h2>3. Is the print long-lasting?</h2>
          <p>
            Yes! Our prints are made using premium heat transfer or screen-print technology, ensuring durability and comfort even after multiple washes.
          </p>
        </div>
        <div className="faq-item">
          <h2>4. How can I place an order?</h2>
          <p>
            Just select your T-shirt, choose your size, click "Add to Cart", and proceed to checkout. It's simple and secure.
          </p>
        </div>
        <div className="faq-item">
          <h2>5. What payment methods do you accept?</h2>
          <p>
            We accept UPI, debit/credit cards, and net banking through secure payment gateways and Cash on delivery (COD).
          </p>
        </div>
        <div className="faq-item">
          <h2>6. Do you offer Cash on Delivery (COD)?</h2>
          <p>
            Yes, we offer Cash on Delivery in selected areas across India.
          </p>
        </div>
        <div className="faq-item">
          <h2>7. How long does delivery take?</h2>
          <p>
            Orders are usually delivered within 4–7 business days, depending on your location.
          </p>
        </div>
        <div className="faq-item">
          <h2>8. ❓ Can I return or exchange a product?</h2>
          <p>
            Yes! If there’s an issue with your T-shirt (wrong size, damaged, etc.), you can return or exchange it within 7 days of delivery.
          </p>
          <p className="important-note">
            ⚠ IMPORTANT: You must have a video of the first-time unboxing as proof. This ensures the product was not damaged by the customer. Without this video, your return or exchange will not be accepted if there is damage. If it is only a size problem, the item will be exchanged.
          </p>
        </div>
        <div className="faq-item">
          <h2>9. How do I contact ProductTrust support?</h2>
          <p>
            Use the Contact Us page or email us at <strong>producttrust030@gmail.com</strong> for any help.
          </p>
        </div>
        <div className="faq-item">
          <h2>10. Are your T-shirts only for students?</h2>
          <p>
            Our <strong>Next Toppers</strong> collection is designed for students, but anyone who believes in growth, learning, and excellence can wear it proudly!
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
