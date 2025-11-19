import { KiyotakaIcon, MoneyLionIcon, PatlyticsIcon } from "@/components/icons";
import { FC, SVGProps } from "react";

export interface Employment {
  company: string;
  role: string;
  logo: FC<SVGProps<SVGElement>>;
  logoSize?: number;
  start: string;
  end: string | "Present";
}

export const employmentHistory: Employment[] = [
  {
    company: "Patlytics",
    role: "Fullstack Engineer",
    logo: PatlyticsIcon,
    logoSize: 28,
    start: "2025-05-07",
    end: "Present",
  },
  {
    company: "Kiyotaka",
    role: "DevOps Engineer",
    logo: KiyotakaIcon,
    logoSize: 20,
    start: "2024-05-08",
    end: "2025-05-08",
  },
  {
    company: "MoneyLion",
    role: "Jr Frontend Engineer",
    logo: MoneyLionIcon,
    logoSize: 20,
    start: "2023-07-10",
    end: "2024-05-01",
  },
];
