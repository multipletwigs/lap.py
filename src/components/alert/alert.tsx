import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AlertItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

function AlertItem(props: AlertItemProps) {
  return (
    <Alert className="my-4">
      {props.icon}
      <AlertTitle className="font-semibold">{props.title}</AlertTitle>
      <AlertDescription>{props.description}</AlertDescription>
    </Alert>
  );
}

export default AlertItem;
