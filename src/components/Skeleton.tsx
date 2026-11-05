import React from "react";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Skeleton({ className = "", ...props }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-slate-800/70 border border-slate-700/30 ${className}`}
      {...props}
    />
  );
}

export function DevShelfCardSkeleton() {
  return (
    <div className="glass-panel rounded-2xl p-5 border border-slate-800 flex flex-col justify-between space-y-4 animate-pulse">
      <div className="space-y-3">
        {/* Title & Star Placeholder */}
        <div className="flex items-start justify-between gap-3">
          <Skeleton className="h-5 w-3/5 rounded-md bg-slate-800" />
          <Skeleton className="h-6 w-6 rounded-md bg-slate-800/80 shrink-0" />
        </div>

        {/* Category & Tags Placeholder */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-24 rounded-full bg-slate-800/60" />
          <Skeleton className="h-4 w-16 rounded-full bg-slate-800/40" />
        </div>

        {/* Alternative-to pill placeholder */}
        <Skeleton className="h-7 w-4/5 rounded-lg bg-purple-950/20 border-purple-900/30" />

        {/* Description lines */}
        <div className="space-y-2 pt-1">
          <Skeleton className="h-3.5 w-full bg-slate-800/70" />
          <Skeleton className="h-3.5 w-5/6 bg-slate-800/60" />
          <Skeleton className="h-3.5 w-2/3 bg-slate-800/50" />
        </div>

        {/* Status tags */}
        <div className="flex items-center gap-2 pt-2">
          <Skeleton className="h-4 w-16 rounded-md bg-slate-800/60" />
          <Skeleton className="h-4 w-20 rounded-md bg-slate-800/60" />
        </div>
      </div>

      {/* Footer bar */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
        <Skeleton className="h-5 w-16 rounded bg-slate-800/60" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-7 w-7 rounded-lg bg-slate-800" />
          <Skeleton className="h-5 w-16 rounded bg-purple-950/40" />
        </div>
      </div>
    </div>
  );
}

export function DevShelfSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <DevShelfCardSkeleton key={i} />
      ))}
    </div>
  );
}
