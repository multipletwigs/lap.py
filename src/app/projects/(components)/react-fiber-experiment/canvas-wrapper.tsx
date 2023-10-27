import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import React from "react";

interface CanvasWrapperProps {
  height: "small" | "medium" | "large" | "xlarge" | string;
  background?: string;
  children: React.ReactNode;
  alertProps?: {
    title: string;
    description: string;
    icon: React.ReactNode;
  };
}

const CanvasWrapper = (props: CanvasWrapperProps) => {
  const height = () => {
    switch (props.height) {
      case "small":
        return "h-[200px]";
      case "medium":
        return "h-[500px]";
      case "large":
        return "h-[800px]";
      case "xlarge":
        return "h-[1000px]";
      default:
        return props.height;
    }
  };

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
        className={cn(
          height(),
          "w-full rounded-lg",
          props.background ? props.background : "bg-slate-600/20"
        )}
      >
        {props.children}
      </div>
    </div>
  );
};

export default CanvasWrapper;
