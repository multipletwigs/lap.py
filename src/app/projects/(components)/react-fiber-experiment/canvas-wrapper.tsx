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
  caption?: string;
}

const CanvasWrapper = (props: CanvasWrapperProps) => {
  const height = () => {
    switch (props.height) {
      case "small":
        return "h-[200px]";
      case "fit":
        return "h-fit";
      case "medium":
        return "h-[500px]";
      case "large":
        return "h-[800px]";
      case "xlarge":
        return "h-[1000px]";
      default:
        return `h-[${props.height}]`;
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
          props.background ? props.background : "bg-slate-600/20",
        )}
      >
        {props.children}
      </div>
      {props.caption && (
        <p
          className="mx-auto mt-6 px-4 py-1 max-w-md text-xs text-center 
                  bg-gradient-to-r from-blue-50 to-indigo-50 
                  dark:from-gray-800 dark:to-gray-700
                  text-gray-700 dark:text-gray-300 
                  border border-gray-200 dark:border-gray-600 
                  rounded-full shadow-sm 
                  transition-all duration-300 ease-in-out
                  "
        >
          {props.caption}
        </p>
      )}
    </div>
  );
};

export default CanvasWrapper;
