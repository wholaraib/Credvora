"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const HeroSection = () => {
  return (
    <section className="pt-10 pb-20 px-4">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
        {/* Left: text */}
        <div className="md:flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl lg:text-[80px] pb-4 gradient-title leading-tight">
            Manage Your Finances
            <br />
            with Intelligence
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto md:mx-0">
            An AI-powered financial management platform that helps you track,
            analyze, and optimize your spending with real-time insights.
          </p>

          <div className="flex flex-col sm:flex-row items-center sm:items-stretch justify-center md:justify-start gap-3 sm:gap-4">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" className="px-8 btn-primary w-full sm:w-auto">
                Get Started
              </Button>
            </Link>

            <Link href="/" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="px-8 w-full sm:w-auto"
              >
                Watch Demo
              </Button>
            </Link>
          </div>
        </div>

        {/* Right: image */}
        <div className="hero-image-wrapper md:flex-1 mt-6 md:mt-0 flex justify-center md:justify-end">
          <div className="hero-image w-full max-w-[420px] md:max-w-[640px] mx-auto relative">
            {/* subtle framed background for depth */}
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-br from-transparent to-transparent pointer-events-none"></div>

            <Image
              src="/cover.png"
              width={1280}
              height={720}
              alt="Dashboard Preview"
              priority
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
