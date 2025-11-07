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
        {/* --- Inserted Legal Details --- */}
        <h2>Terms & Conditions</h2>
        <p><strong>Last updated on Sep 6 2025</strong></p>
        <p>
          For the purpose of these Terms and Conditions, The term "we", "us", "our" used anywhere on this page shall mean SURAJ SHAW, whose registered/operational office is Sahebabad football math dhapa kolkata 700105 North Parganas WEST BENGAL 700105 . "you", "your", "user", "visitor" shall mean any natural or legal person who is visiting our website and/or agreed to purchase from us.
        </p>
        <p>
          Your use of the website and/or purchase from us are governed by following Terms and Conditions:
        </p>
        <p>
          The content of the pages of this website is subject to change without notice.
        </p>
        <p>
          Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.
        </p>
        <p>
          Your use of any information or materials on our website and/or product pages is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through our website and/or product pages meet your specific requirements.
        </p>
        <p>
          Our website contains material which is owned by or licensed to us. This material includes, but are not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.
        </p>
        <p>
          All trademarks reproduced in our website which are not the property of, or licensed to, the operator are acknowledged on the website.
        </p>
        <p>
          Unauthorized use of information provided by us shall give rise to a claim for damages and/or be a criminal offense.
        </p>
        <p>
          From time to time our website may also include links to other websites. These links are provided for your convenience to provide further information.
        </p>
        <p>
          You may not create a link to our website from another website or document without SURAJ SHAW's prior written consent.
        </p>
        <p>
          Any dispute arising out of use of our website and/or purchase with us and/or any engagement with us is subject to the laws of India .
        </p>
        <p>
          We, shall be under no liability whatsoever in respect of any loss or damage arising directly or indirectly out of the decline of authorization for any Transaction, on Account of the Cardholder having exceeded the preset limit mutually agreed by us with our acquiring bank from time to time
        </p>
        {/* --- End Inserted Legal Details --- */}

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
