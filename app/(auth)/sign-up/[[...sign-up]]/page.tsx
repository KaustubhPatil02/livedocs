import { AnimatedGridPattern } from '@/components/magicui/animated-grid-pattern';
import { SignUp } from '@clerk/nextjs';
import React from 'react';
import Link from 'next/link'; // Import the Link component

const SignUpPage = () => {
  return (
    <main className="auth-page relative flex h-screen items-center justify-center overflow-hidden text-white">
      {/* Background Grid Pattern */}
      <AnimatedGridPattern
        className="absolute inset-0 -z-10 opacity-20 fill-blue-300"
        width={100}
        height={100}
      />

      {/* Content Section */}
      <div className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-5xl font-bold tracking-tight text-blue-50 drop-shadow-xl">
          Welcome to LiveDocs ✨
        </h1>
        <p className="text-xl font-semibold text-blue-200">
          LiveDocs✨ is a live collaborative editor powered by LiveBlocks.
        </p>
        <p className="text-sm font-medium text-blue-200">
          Create your account and start collaborating in real-time.
        </p>

        {/* Corrected Link to Hero Page */}
        <Link
          href="/hero"
          className="text-blue-400 hover:underline text-sm font-medium"
        >
          Click here to see what this is actually, if you don't have any idea
        </Link>

        {/* Sign-Up Form */}
        <SignUp />
      </div>
    </main>
  );
};

export default SignUpPage;