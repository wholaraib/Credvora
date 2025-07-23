"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-bold">Credvora</h1>

      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton />
          <SignUpButton>
            <button className="bg-white text-blue-600 rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 hover:bg-gray-100 transition">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>

        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </header>
  );
}
