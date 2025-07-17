import React from "react";
import "./TermsAndCondtion.css";
import MetaData from "../component/layouts/MataData/MataData";
import TermsImage from "../Image/about/tc.jpg";

const TermsAndConditionsPage = () => {
  return (
    <div className="terms-container">
      <MetaData title="Terms and Conditions" />
      <div className="terms-image-container">
        <img
          src={TermsImage}
          alt="Terms and Conditions"
          className="terms-image"
        />
        <div className="terms-overlay">
          <h1 className="terms-title">TERMS & CONDITIONS</h1>
        </div>
      </div>

      <div className="terms-content">
        <h2>Effective Date: 15-07-2025</h2>
        <p>Website: <a href="https://product-trust.onrender.com/">https://product-trust.onrender.com/</a></p>
        <p>Owner: ProductTrust</p>

        <p>
          By using our website or placing an order on ProductTrust, you agree to the following Terms & Conditions. Please read them carefully before making a purchase.
        </p>

        <h2>1. Products</h2>
        <p>
          All our products are printed T-shirts under the brand name Next Topper. We strive to ensure that product images and descriptions are as accurate as possible. However, slight color variations may occur due to screen differences.
        </p>

        <h2>2. Shipping and Delivery</h2>
        <p><strong>India Orders:</strong> Delivery typically takes 2–3 business days.</p>
        <p><strong>International Orders:</strong> Delivery time depends on the destination and shipping method.</p>
        <p>Shipping delays may occur due to external factors like customs or courier issues.</p>

        <h2>3. Order Confirmation & Cancellation</h2>
        <p>After you place an order, we will call you to confirm the order.</p>
        <p>You may cancel or modify the order only during the confirmation call.</p>
        <p>Once the order is confirmed, it cannot be canceled or changed.</p>

        <h2>4. Return & Refund Policy</h2>
        <p>We allow returns and exchanges only under certain conditions:</p>
        <ul>
          <li>The product must be unused, unwashed, and in its original condition.</li>
          <li>If you receive a damaged product, you must provide proof via a video clearly showing the damage while unboxing the package.</li>
        </ul>
        <p><strong>🔴 This is mandatory to confirm the damage was not caused after delivery.</strong></p>
        <p>If the return is approved, we will offer an exchange or refund as per the situation.</p>

        <h2>5. Payments</h2>
        <p>We accept the following payment methods:</p>
        <ul>
          <li>UPI</li>
          <li>Cash on Delivery (COD)</li>
        </ul>
        <p>If you choose online payment and then cancel or refuse the product without a valid reason, the amount may not be refunded.</p>

        <h2>6. Customer Responsibility</h2>
        <p>Please provide accurate shipping information.</p>
        <p>If you provide a wrong address or refuse delivery without cause, and payment was already made, we may not issue a refund.</p>

        <h2>7. Contact & Support</h2>
        <p>For any issues or questions:</p>
        <ul>
          <li>📞 We are available 24/7.</li>
          <li>Visit our Contact Us page to find our phone number or submit a query.</li>
        </ul>
        <p>We are here to help you anytime!</p>

        <h2>8. Changes to Terms</h2>
        <p>
          ProductTrust may update or change these Terms & Conditions at any time. Updated terms will be posted on this page with a new effective date.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
