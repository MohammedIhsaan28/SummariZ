import { cn } from "@/lib/utils";
import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function LoadingSkeleton() {
  return (
    <Card
      aria-busy="true"
      aria-label="Loading detailed summary content"
      className="
        relative px-4 sm:px-6 md:px-8 lg:px-12 
        h-[480px] sm:h-[560px] md:h-[650px] lg:h-[700px]
        w-full max-w-5xl mx-auto 
        overflow-hidden 
        bg-linear-to-br from-cyan-200 via-cyan-200 to-cyan-500
        backdrop-blur-lg shadow-2xl rounded-3xl 
        border border-cyan-400
      "
    >
      {/* Optimized Soft Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/30 via-transparent to-cyan-200/20 pointer-events-none opacity-60" />

      {/* Loading Progress Bar */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-cyan-200/80 backdrop-blur-xs pt-4 pb-2 border-b border-cyan-500">
        <div className="px-4 flex gap-2 sm:gap-3 md:gap-4">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="h-1.5 flex-1 rounded-full bg-cyan-500 overflow-hidden"
            >
              <div
                className={cn(
                  "h-full bg-linear-to-r from-cyan-300 to-cyan-600 animate-pulse",
                  index === 0 ? "w-full" : "w-0"
                )}
              />
            </div>
          ))}
        </div>
      </div>

      {/* NON-SCROLLING CONTENT */}
      <div className="relative pt-20 pb-20 px-4 sm:px-6 md:px-8 lg:px-12">
        
        {/* Title */}
        <div className="flex flex-col gap-2 mb-8 text-center">
          <Skeleton className="h-12 w-2/3 sm:w-3/4 md:w-1/2 lg:w-1/3 mx-auto bg-cyan-500" />
        </div>

        {/* Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {[...Array(3)].map((_, index) => (
            <div
              key={`point-${index}`}
              className="relative bg-linear-to-br from-cyan-500 to-cyan-600 p-4 rounded-2xl border border-cyan-500"
            >
              <div className="relative flex gap-4 items-center">
                <Skeleton className="h-8 w-8 rounded-full bg-cyan-500" />
                <div className="flex-1">
                  <Skeleton className="h-6 w-full bg-cyan-500" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Emoji Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mt-6">
          {[...Array(3)].map((_, index) => (
            <div
              key={`emoji-${index}`}
              className="relative bg-linear-to-br from-cyan-200 to-cyan-400 p-4 rounded-2xl border border-cyan-500"
            >
              <div className="relative flex items-start gap-3">
                <Skeleton className="h-6 w-6 rounded-full bg-cyan-500 shrink-0" />
                <div className="flex-1">
                  <Skeleton className="h-6 w-full bg-cyan-500" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:px-6 md:px-8 lg:px-12 bg-cyan-200/80 backdrop-blur-xs border-t border-cyan-500">
        <div className="flex justify-between items-center">
          <Skeleton className="rounded-full w-12 h-12 bg-linear-to-br from-cyan-500 to-cyan-600" />

          <div className="flex gap-2">
            {[1, 2, 3].map((_, index) => (
              <Skeleton
                key={index}
                className="h-2 w-2 rounded-full bg-cyan-500"
              />
            ))}
          </div>

          <Skeleton className="rounded-full w-12 h-12 bg-linear-to-br from-cyan-500 to-cyan-600" />
        </div>
      </div>
    </Card>
  );
}
