import { KiyotakaIcon, MoneyLionIcon, PatlyticsIcon } from "@/components/icons";
import { GraduationCapIcon } from "lucide-react";
import { FC, SVGProps } from "react";

export interface Employment {
  company: string;
  role: string;
  logo: FC<SVGProps<SVGElement>> | string;
  logoSize?: number;
  start: string;
  end: string | "Present";
  link: string;
}

export const employmentHistory: Employment[] = [
  {
    company: "Patlytics",
    role: "Fullstack Engineer",
    logo: PatlyticsIcon,
    logoSize: 28,
    start: "2025-05-07",
    end: "Present",
    link: "https://patlytics.ai",
  },
  {
    company: "Kiyotaka",
    role: "DevOps Engineer",
    logo: KiyotakaIcon,
    logoSize: 20,
    start: "2024-05-08",
    end: "2025-05-08",
    link: "https://kiyotaka.ai",
  },
  {
    company: "MoneyLion",
    role: "Jr Frontend Engineer",
    logo: MoneyLionIcon,
    logoSize: 20,
    start: "2023-07-10",
    end: "2024-05-01",
    link: "https://moneylion.com",
  },
  {
    company: "Monash University",
    role: "Bachelor of Computer Science",
    logo: GraduationCapIcon,
    logoSize: 20,
    start: "2020-11-01",
    end: "2023-11-30",
    link: "https://www.monash.edu",
  },
];
