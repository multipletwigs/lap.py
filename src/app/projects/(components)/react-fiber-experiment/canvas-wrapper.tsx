import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import React from "react";

interface CanvasWrapperProps {
  height?: number;
  children: React.ReactNode;
  alertProps?: {
    title: string;
    description: string;
    icon: React.ReactNode;
  };
}

const CanvasWrapper = (props: CanvasWrapperProps) => {
  const height = props.height ? props.height : 400;
  return (
    <div className="my-6 flex flex-col gap-2">
      {props.alertProps && (
        <Alert>
          {props.alertProps.icon}
          <AlertTitle>{props.alertProps.title}</AlertTitle>
          <AlertDescription>{props.alertProps.description}</AlertDescription>
        </Alert>
      )}

      <div
        className={cn(`h-[${height}px]`, "w-full rounded-lg bg-slate-500/20")}
      >
        {props.children}
      </div>
    </div>
  );
};

export default CanvasWrapper;
