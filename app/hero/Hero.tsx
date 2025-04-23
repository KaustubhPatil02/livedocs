'use client';

import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="hero-container relative flex flex-col items-center justify-center gap-10 text-center text-white py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#3371FF"
            fillOpacity="0.3"
            d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,112C960,96,1056,128,1152,160C1248,192,1344,224,1392,240L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Title */}
      <h1 className="text-5xl font-bold tracking-tight drop-shadow-xl">
        Welcome to <span className="text-blue-300">LiveDocs✨</span>
      </h1>

      {/* Subtitle */}
      <p className="text-xl font-medium text-blue-200">
        A live collaborative editor powered by LiveBlocks.
      </p>

      {/* Bento Grid Features Section */}
      <div className="bento-grid-container grid grid-cols-1 gap-8 px-5 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl">
        {/* Feature 1 */}
        <div className="bento-card relative rounded-lg shadow-lg overflow-hidden bg-dark-500">
          <Image
            src="/hero/collab.png"
            alt="Real-time Collaboration"
            width={400}
            height={250}
            className="w-full h-auto"
          />
          <div className="p-6">
            <h3 className="text-lg font-semibold text-blue-100">
              Real-time Collaboration
            </h3>
            <p className="text-sm text-blue-300">
              Collaborate with your team in real-time with seamless updates.
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="bento-card relative rounded-lg shadow-lg overflow-hidden bg-dark-500">
          <Image
            src="/hero/edit.png"
            alt="Secure Editing"
            width={400}
            height={250}
            className="w-full h-auto"
          />
          <div className="p-6">
            <h3 className="text-lg font-semibold text-blue-100">
              Secure Editing
            </h3>
            <p className="text-sm text-blue-300">
              Your documents are safe with end-to-end encryption with clerk and liveblocks.
            </p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="bento-card relative rounded-lg shadow-lg overflow-hidden bg-dark-500">
          <Image
            src="/hero/edit1.png"
            alt="Edit Control"
            width={400}
            height={250}
            className="w-full h-auto"
          />
          <div className="p-6">
            <h3 className="text-lg font-semibold text-blue-100">
              Edit Control
            </h3>
            <p className="text-sm text-blue-300">
              Track the users and handle their access to the document.
            </p>
          </div>
        </div>

        {/* Feature 4 */}
        <div className="bento-card relative rounded-lg shadow-lg overflow-hidden bg-dark-500">
          <Image
            src="/hero/integrate.png"
            alt="Third-party Integration"
            width={400}
            height={250}
            className="w-full h-auto"
          />
          <div className="p-6">
            <h3 className="text-lg font-semibold text-blue-100">
              Third-party Integration
            </h3>
            <p className="text-sm text-blue-300">
              Integrate with awesome tools like LiveBlocks for live updates.
            </p>
          </div>
        </div>

        {/* Feature 5 */}
        <div className="bento-card relative rounded-lg shadow-lg overflow-hidden bg-dark-500">
          <Image
            src="/hero/noti.png"
            alt="Notifications"
            width={400}
            height={250}
            className="w-full h-auto"
          />
          <div className="p-6">
            <h3 className="text-lg font-semibold text-blue-100">
              Notifications
            </h3>
            <p className="text-sm text-blue-300">
              Stay updated with real-time notifications for changes.
            </p>
          </div>
        </div>

        {/* Feature 6 */}
        <div className="bento-card relative rounded-lg shadow-lg overflow-hidden bg-dark-500">
          <Image
            src="/hero/mention.png"
            alt="Customizable"
            width={400}
            height={250}
            className="w-full h-auto"
          />
          <div className="p-6">
            <h3 className="text-lg font-semibold text-blue-100">
              Mention users and tag them in the document
            </h3>
            <p className="text-sm text-blue-300">
              Tailor the editor to suit your workflow and preferences.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-10">
        <Link
          href="/sign-up"
          className="rounded-lg bg-blue-500 px-6 py-3 text-lg font-semibold text-white shadow-md hover:bg-blue-600"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
};

export default Hero;