import Link from "next/link";
import { HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <h1 className="text-9xl font-extrabold text-gray-700">404</h1>
      <div className="bg-red-400 px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <div className="text-gray-600 mt-8 text-center">
        <p className="text-xl">Oops! The page you're looking for doesn't exist.</p>
      </div>
      <Link href="/" className="mt-8">
        <Button className="flex items-center gap-2">
          <HomeIcon size={18} />
          Back to Home
        </Button>
      </Link>
    </div>
  );
}