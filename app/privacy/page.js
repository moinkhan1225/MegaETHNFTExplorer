// app/privacy/page.js
'use client';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-16 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Privacy Policy
        </h1>

        {/* Content */}
        <div className="prose prose-lg max-w-4xl mx-auto text-gray-700 dark:text-gray-300">
          <p>Your privacy is important to us at <strong>MegaETH NFT Explorer</strong>. This Privacy Policy explains how we collect, use, and protect your information when you use our platform.</p>

          <h2>1. Information We Collect</h2>
          <p>We do not require you to create an account to use our service. However, we may collect the following information:</p>
          <ul>
            <li>Data you provide voluntarily, such as contact requests or feedback.</li>
            <li>Technical data, such as browser type, IP address, and usage statistics.</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We may use your information to:</p>
          <ul>
            <li>Provide and maintain the platform.</li>
            <li>Improve user experience and website functionality.</li>
            <li>Respond to inquiries or requests you submit.</li>
          </ul>

          <h2>3. Cookies & Tracking</h2>
          <p>We may use cookies and similar tracking technologies to enhance your browsing experience and gather analytics. You can manage cookies via your browser settings.</p>

          <h2>4. Sharing of Information</h2>
          <p>We do not sell, trade, or otherwise transfer your personal information to outside parties except as required by law.</p>

          <h2>5. Security</h2>
          <p>We implement reasonable measures to protect your information from unauthorized access or disclosure. However, no method of transmission over the internet is 100% secure.</p>

          <h2>6. Third-Party Services</h2>
          <p>Our platform may include links to third-party services. We are not responsible for their privacy practices. Please review their privacy policies directly.</p>

          <h2>7. Changes to this Privacy Policy</h2>
          <p>We may update this Privacy Policy periodically. Continued use of the platform indicates your acceptance of any changes.</p>

          <p className="mt-8">
            If you have any questions or concerns about this Privacy Policy, please <Link href="/contact" className="text-purple-600 dark:text-purple-400 hover:underline">contact us</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
