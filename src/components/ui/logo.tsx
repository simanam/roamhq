"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
}

export function Logo({ variant = "dark", className }: LogoProps) {
  const textColor = variant === "light" ? "text-white" : "text-midnight";

  return (
    <Link href="/#top" className={cn("flex items-center gap-2", className)}>
      <Image
        src="/roamlogo.png"
        alt="Roam"
        width={32}
        height={32}
        className="rounded-lg"
      />
      <span className={cn("font-bold text-xl tracking-tight", textColor)}>
        ROAM
      </span>
    </Link>
  );
}
