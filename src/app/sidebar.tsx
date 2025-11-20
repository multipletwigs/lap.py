import { EmploymentTimeline } from "@/components/employment-timeline";
import { LofiPlayer } from "@/components/lofi-player";
import { GitHubLogoIcon, InstagramLogoIcon, LinkedInLogoIcon, DiscordLogoIcon, EnvelopeClosedIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import dayjs from "dayjs";
import Image from "next/image";

export function Sidebar() {
  const birthYear = 2001;
  const currentAge = dayjs().year() - birthYear;

  const socialLinks = [
    { icon: GitHubLogoIcon, href: "https://github.com/multipletwigs", label: "GitHub" },
    { icon: TwitterLogoIcon, href: "https://twitter.com/bashtwigs", label: "Twitter" },
    { icon: LinkedInLogoIcon, href: "https://www.linkedin.com/in/zachary-khong", label: "LinkedIn" },
    { icon: InstagramLogoIcon, href: "https://instagram.com/its._.lapp", label: "Instagram" },
    { icon: DiscordLogoIcon, href: "https://discord.com/users/bashtwigs", label: "Discord: bashtwigs" },
    { icon: EnvelopeClosedIcon, href: "mailto:inks.nightly@gmail.com", label: "Email" },
  ];

  return (
    <div className="flex flex-col min-h-full relative">
      <div className="mb-8 -mx-2">
        <div className="relative w-full h-32 overflow-hidden rounded-xl">
          <Image
            src="/root-hero.png"
            alt="Hero"
            fill
            className="object-cover object-center"
            style={{ objectPosition: 'center 30%' }}
            priority
          />
        </div>
      </div>
      <div className="mb-6">
        <h1
          className="font-playfair mb-1 text-foreground tracking-tight"
          style={{ fontSize: 'clamp(20px, 2vw, 24px)', fontWeight: 600, lineHeight: 1.2 }}
        >
          Zachary Khong
        </h1>

        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <p
            className="text-muted-foreground"
            style={{ fontSize: 'clamp(13px, 1.2vw, 14px)', fontWeight: 400 }}
          >
            邝立浩
          </p>
          <div className="w-1 h-1 rounded-full bg-foreground/30" />
          <span
            className="text-muted-foreground"
            style={{ fontSize: 'clamp(12px, 1.1vw, 13px)', fontWeight: 400 }}
          >
            {currentAge} Years Old
          </span>
          <div className="w-1 h-1 rounded-full bg-foreground/30" />
          <span
            className="text-muted-foreground"
            style={{ fontSize: 'clamp(12px, 1.1vw, 13px)', fontWeight: 400 }}
          >
            Kuala Lumpur, MY
          </span>
        </div>

        <div className="flex items-center gap-2">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-foreground/5 hover:bg-foreground/10 flex items-center justify-center transition-colors"
                aria-label={social.label}
              >
                <Icon className="w-4 h-4 text-muted-foreground" />
              </a>
            );
          })}
        </div>

      </div>

      <div className="mb-4">

        <p
          className="text-muted-foreground/70 italic"
          style={{ fontSize: 'clamp(11px, 1.05vw, 12px)', fontWeight: 400 }}
        >
          "despite everything. it's still you. nyeh heh heh"
        </p>
      </div>

      <div className="flex-1">
        <EmploymentTimeline />
      </div>

      {/* Footer section - Pinned to bottom on desktop, flow naturally on mobile */}
      <div className="mt-auto pt-8 sticky bottom-0 pb-6 z-20 flex flex-col gap-6">
        <div className="relative">
          {/* NowPlaying has its own absolute positioning when expanded to prevent layout shift */}
          <LofiPlayer />
        </div>

        <div className="pt-6 border-t border-border/40">
          <p
            className="text-muted-foreground/60"
            style={{ fontSize: 'clamp(11px, 1vw, 12px)', fontWeight: 400 }}
          >
            {dayjs().year()} © Zach Khong
          </p>
        </div>
      </div>
    </div>
  )
}
