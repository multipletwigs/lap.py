import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { ChangeEvent } from "react";

interface InputButtonProps {
  setImageUrl: (url: string) => void;
}

export function InputWithButton(props: InputButtonProps) {
  const [file, setFile] = React.useState<File | null>(null);
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type="file"
        accept="image/*"
        placeholder="Upload any photo"
        onChange={(e: ChangeEvent) => {
          const target = e.target as HTMLInputElement;
          const file: File = (target.files as FileList)[0];
          setFile(file);
        }}
      />
      <Button
        type="submit"
        disabled={!file}
        onClick={() => {
          if (!file) return;
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            props.setImageUrl(reader.result as string);
          };
        }}
      >
        Upload
      </Button>
    </div>
  );
}
