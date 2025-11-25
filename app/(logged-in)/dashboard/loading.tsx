import BgGradient from "@/components/common/bg-gradient";
import {
  MotionDiv,
  MotionH1,
} from "@/components/common/motion-wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { itemVariants } from "@/utils/constants";

function HeaderSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6 sm:mb-8 justify-between">
  <div className="flex flex-col gap-2 sm:gap-3">
    <Skeleton className="h-8 sm:h-10 w-40 sm:w-48 rounded-lg" />
    <Skeleton className="h-5 sm:h-6 w-64 sm:w-96 rounded-lg" />
  </div>
  <Skeleton className="h-9 sm:h-10 w-28 sm:w-32 rounded-lg self-start" />
</div>
  );
}

function SummaryCardSkeleton() {
  return (
    <MotionDiv
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="rounded-lg border bg-card text-card-foreground shadow-sm"
    >
      <Skeleton className="h-48 w-full rounded-lg" />
    </MotionDiv>
  );
}

export default function LoadingSummaries() {
  return (
    <div className="min-h-screen relative">
      <BgGradient className="from-emerald-200 via-teal-200 to-cyan-200" />
      <section className="container px-10 py-24 mx-auto flex flex-col gap-4">
        <HeaderSkeleton />
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 sm:px-0">
          {Array.from({ length: 3 }).map((_, index) => (
            <SummaryCardSkeleton key={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
