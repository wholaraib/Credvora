import Link from "next/link";
import { Button } from "../ui/button";

const CallToAction = () => {
  return (
    <section className="py-20 bg-indigo-200">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-[#120e40] mb-4">
          Ready to Take Control of Your Finances?
        </h2>
        <p className="text-[#120e40] mb-8 max-w-2xl mx-auto">
          Join thousands of users who are already managing their finances
          smarter with CredVora
        </p>
        <Link href="/dashboard">
          <Button
            size="lg"
            className="btn-primary animate-bounce"
          >
            Start Free Trial
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
