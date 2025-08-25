'use client';

import React, { useState, useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/components/ui/button';

export default function ContactPage() {
  const formID = process.env.NEXT_PUBLIC_FORMSPREE_ID;
  const [state, handleSubmit] = useForm(formID);

  const [countdown, setCountdown] = useState(3);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (!state.succeeded) return;

    let seconds = 3;
    setCountdown(seconds);
    setProgress(0);

    const interval = setInterval(() => {
      seconds -= 1;
      setCountdown(seconds);
      setProgress(((3 - seconds) / 3) * 100);

      if (seconds <= 0) {
        clearInterval(interval);
        router.push('/');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [state.succeeded, router]);

  if (state.succeeded) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 px-4">
        <p className="text-green-600 text-xl font-semibold mb-4">
          Thanks for your message! We will get back to you soon.
        </p>

        {/* Progress Bar */}
        <div className="w-64 h-3 bg-gray-300 dark:bg-gray-700 rounded-full mb-2 overflow-hidden">
          <div
            className="h-full bg-purple-600 dark:bg-pink-500 transition-all duration-1000"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-gray-700 dark:text-gray-300">
          Redirecting to home page in {countdown} second{countdown > 1 ? 's' : ''}...
        </p>
      </div>
    );
  }

  // Form UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-16 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Contact Us
        </h1>

        <p className="text-gray-700 dark:text-gray-300 mb-8 text-center">
          Have questions or suggestions? We'd love to hear from you! Fill out the form below and we'll get back to you as soon as possible.
        </p>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 mt-1" />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 mt-1" />
          </div>

          {/* Message */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Message</label>
            <textarea
              name="message"
              required
              rows={5}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            ></textarea>
            <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 mt-1" />
          </div>

          <div className="text-center">
            <Button
              type="submit"
              disabled={state.submitting}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700"
            >
              {state.submitting ? 'Sending...' : 'Send Message'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
