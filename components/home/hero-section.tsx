import { Sparkle } from "lucide-react";
import { Button } from "../ui/button";

export default function HeroSection() {
  return (
    <section>
      <div>
        <div className="flex ">
          <Sparkle className="h-6 w-6 mr-2 text-rose-600 animate-pulse" />
          <p>Powered by AI</p>
        </div>

        <h1>Tranform PDF into concise summaries</h1>
        <h2>Get a beautiful summary reel of the document</h2>
        <Button>Try Solar</Button>
      </div>
    </section>
  );
}
