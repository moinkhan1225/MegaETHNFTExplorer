// app/terms/page.js
'use client';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-16 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Terms & Conditions
        </h1>

        {/* Content */}
        <div className="prose prose-lg max-w-4xl mx-auto text-gray-700 dark:text-gray-300">
          <p>Welcome to <strong>MegaETH NFT Explorer</strong>. By accessing or using our platform, you agree to the following terms and conditions. Please read them carefully.</p>

          <h2>1. Acceptance of Terms</h2>
          <p>By using our website, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please do not use the platform.</p>

          <h2>2. Use of Service</h2>
          <p>You may use the platform for exploring NFT collections, checking wallet holdings, and obtaining insights on MegaETH NFTs. Any misuse of the platform is strictly prohibited.</p>

          <h2>3. Intellectual Property</h2>
          <p>All content, logos, and branding on MegaETH NFT Explorer are the property of the platform or its licensors. Unauthorized use is prohibited.</p>

          <h2>4. Limitation of Liability</h2>
          <p>The platform provides NFT data and insights for informational purposes only. We are not responsible for any losses or damages arising from the use of our service.</p>

          <h2>5. Privacy</h2>
          <p>Your privacy is important. Please review our <Link href="/privacy" className="text-purple-600 dark:text-purple-400 hover:underline">Privacy Policy</Link> to understand how we handle your data.</p>

          <h2>6. Changes to Terms</h2>
          <p>We may update these Terms and Conditions from time to time. Continued use of the platform constitutes acceptance of the updated terms.</p>

          <p className="mt-8">If you have any questions regarding these Terms, please <Link href="/contact" className="text-purple-600 dark:text-purple-400 hover:underline">contact us</Link>.</p>
        </div>
      </div>
    </div>
  );
}
