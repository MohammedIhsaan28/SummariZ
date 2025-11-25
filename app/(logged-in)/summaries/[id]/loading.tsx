import BgGradient from "@/components/common/bg-gradient";
import { Skeleton } from "@/components/ui/skeleton";
import LoadingSkeleton from "@/components/upload/loading-skeleton";
import { cn } from "@/lib/utils";
import { FileText } from "lucide-react";

function HeaderSkeleton() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 sm:gap-4">
        <Skeleton className="h-6 sm:h-8 w-24 sm:w-32 rounded-full bg-white/80" />
        <Skeleton className="h-4 sm:h-5 w-32 sm:w-40 rounded-full bg-white/80" />
      </div>
      <Skeleton className="h-8 sm:h-10 md:h-12 w-full sm:w-3/4 rounded-lg bg-white/80" />
    </div>
  );
}

function ContentSkeleton() {
  return (
    <div className="space-y-3 sm:space-y-4">
      {[...Array(6)].map((_, i) => (
        <Skeleton
          key={i}
          className={cn("h-3 sm:h-4 bg-white/80", i % 2 === 0 ? "w-full" : "w-11/12")}
        />
      ))}
    </div>
  );
}

export default function LoadingSummary() {
  return (
    <div className="relative isolate min-h-screen bg-gradient-to-b from-cyan-50 to-white">
      <BgGradient className="from-cyan-400 via-cyan-300 to-cyan-200" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
        <div className="py-6 sm:py-8 md:py-12 lg:py-16">
          <div className="flex flex-col gap-4 sm:gap-6">
            <HeaderSkeleton />
            <div className="relative">
              <div className="relative p-4 sm:p-6 md:p-8 bg-white/80 backdrop-blur-md rounded-xl sm:rounded-2xl border border-cyan-100/30 shadow-lg">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/50 via-cyan-50/50 to-transparent opacity-50 rounded-xl sm:rounded-2xl" />

                {/* Icon */}
                <div className="absolute top-1 right-3 sm:top-3 sm:right-3 text-cyan-400">
                  <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div className="relative">
                  <LoadingSkeleton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}