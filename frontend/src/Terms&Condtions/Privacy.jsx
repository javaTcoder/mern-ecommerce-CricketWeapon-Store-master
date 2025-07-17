import React from "react";
import { Link } from "react-router-dom";
import "./Privacy.css";
import MetaData from "../component/layouts/MataData/MataData";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <MetaData title={"Privacy Policy"} />
      <div className="container___">
        <h1>Privacy Policy</h1>
        <p style={{ fontSize: "16px", fontWeight: "600" }}>
          Effective Date: July 12, 2025
        </p>
        <p>
          Website: <a href="https://product-trust.onrender.com/">https://product-trust.onrender.com/</a><br />
          Owner: ProductTrust
        </p>

        <p>
          At ProductTrust, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share information when you visit or make a purchase from our website.
        </p>

        <h2>1. Information We Collect</h2>
        <p>When you use our website, we may collect the following information:</p>
        <ul>
          <li><strong>Personal Information:</strong> Name, phone number, and email address (collected during the order and checkout process).</li>
          <li><strong>Order Information:</strong> Product details, delivery address, and transaction data.</li>
          <li><strong>Device Information:</strong> IP address, browser type, and usage data through necessary tools for advertising and website performance.</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>Process and deliver your orders</li>
          <li>Communicate with you regarding your purchase</li>
          <li>Provide customer support</li>
          <li>Improve our website and services</li>
          <li>Run promotions or ads using basic analytics and tools</li>
        </ul>
        <p>We only use information that is required to operate our eCommerce business.</p>

        <h2>3. Sharing Your Information</h2>
        <p>We do not sell or rent your personal data. We may share your data with:</p>
        <ul>
          <li>Trusted third-party services (e.g., payment gateways, delivery partners)</li>
          <li>Advertising or analytics tools, only as needed to help us grow our business</li>
          <li>Authorities, if required by law</li>
        </ul>

        <h2>4. Payment Information</h2>
        <p>We use third-party secure payment services to process payments. Your card or banking details are not stored on our servers.</p>

        <h2>5. Cookies and Tracking Tools</h2>
        <p>We use necessary cookies and tracking tools only to:</p>
        <ul>
          <li>Run ads (if applicable)</li>
          <li>Understand visitor behavior to improve your experience</li>
        </ul>
        <p>You can control cookie settings from your browser at any time.</p>

        <h2>6. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access or update your personal data</li>
          <li>Request removal of your data</li>
          <li>Opt out of email communications (if we ever send)</li>
        </ul>
        <p>To make any request, just contact us using the details below.</p>

        <h2>7. Children’s Privacy</h2>
        <p>Our website is intended for everyone, but we do not knowingly collect data from anyone under the age of 13 without parental consent.</p>

        <h2>8. Changes to This Policy</h2>
        <p>We may update this Privacy Policy occasionally. Changes will be posted on this page with a new effective date.</p>

        <h2>9. Contact Us</h2>
        <p>If you have any questions or requests, you can contact us through our <Link to="/contact">Contact Us</Link> page.</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
