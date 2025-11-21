"use client";

import { employmentHistory } from "./config";
import dayjs from "dayjs";

export function EmploymentTimeline() {
  const formatDate = (date: string) => {
    if (date === "Present") return "Present";
    return dayjs(date).format("MMM YYYY");
  };

  const calculateDuration = (start: string, end: string | "Present") => {
    const startDate = dayjs(start);
    const endDate = end === "Present" ? dayjs() : dayjs(end);
    const months = endDate.diff(startDate, "month");
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (years === 0) {
      return `${remainingMonths}mo`;
    }
    if (remainingMonths === 0) {
      return `${years}yr`;
    }
    return `${years}yr ${remainingMonths}mo`;
  };

  return (
    <div className="space-y-4">
      <h3
        className="text-muted-foreground uppercase tracking-wider mb-4"
        style={{ fontSize: 'clamp(10px, 1vw, 11px)', fontWeight: 500, letterSpacing: '0.1em' }}
      >
        Places I've worked before!
      </h3>
      <div className="flex flex-col space-y-6">
        {employmentHistory.map((job, index) => {
          const Logo = job.logo;
          const isLast = index === employmentHistory.length - 1;

          return (
            <div key={`${job.company}-${job.start}`} className="relative">
              {!isLast && (
                <div className="absolute left-[31px] top-16 w-px bg-border/40 -z-10" style={{ height: 'calc(100% + 1.5rem)' }} />
              )}

              <div className="flex gap-4 items-start">
                <div className={`relative flex-shrink-0 w-16 h-16 rounded-xl bg-background flex items-center justify-center overflow-hidden z-10 border ${job.end === "Present" ? "border-green-500/60" : "border-border/40"}`}>
                  {job.end === "Present" && (
                    <div className="absolute inset-0 rounded-xl bg-green-500/5 animate-pulse" />
                  )}
                  <Logo
                    width={32}
                    height={32}
                    style={{ width: '32px', height: '32px' }}
                  />
                </div>

                <div className="flex-1 min-w-0 pt-1.5">
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <h4
                        className="text-foreground font-medium truncate"
                        style={{ fontSize: 'clamp(13px, 1.2vw, 14px)', fontWeight: 500 }}
                      >
                        {job.company}
                      </h4>
                      {job.end === "Present" && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 flex-shrink-0">
                          Current
                        </span>
                      )}
                    </div>
                    <span
                      className="text-muted-foreground flex-shrink-0"
                      style={{ fontSize: 'clamp(11px, 1vw, 12px)', fontWeight: 400 }}
                    >
                      {calculateDuration(job.start, job.end)}
                    </span>
                  </div>
                  <p
                    className="text-muted-foreground mb-1"
                    style={{ fontSize: 'clamp(11px, 1vw, 12px)', fontWeight: 400 }}
                  >
                    {job.role}
                  </p>
                  <p
                    className="text-muted-foreground/60"
                    style={{ fontSize: 'clamp(10px, 0.95vw, 11px)', fontWeight: 400 }}
                  >
                    {formatDate(job.start)} – {formatDate(job.end)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
