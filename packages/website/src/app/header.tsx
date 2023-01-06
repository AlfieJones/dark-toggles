"use client";

import Link from "next/link";
import clsx from "clsx";
import { Logo, Button, Search } from "@/components";
import { Expand } from "@theme-toggles/react";
import "@theme-toggles/core/dist/base/expand.css";
import { useState } from "react";

function TopLevelNavItem({
  href,
  children,
}: {
  href: string;
  children: string;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm leading-5 transition text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
      >
        {children}
      </Link>
    </li>
  );
}

export function Header({ className }: { className?: string }) {
  const isInsideMobileNavigation = false;
  const mobileNavIsOpen = false;

  const [toggled, setToggled] = useState(false);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setToggled((t) => !t);
  };

  return (
    <div
      className={clsx(
        className,
        "fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between gap-12 px-4 transition sm:px-6 lg:left-72 lg:z-30 lg:px-8 xl:left-80",
        !isInsideMobileNavigation &&
          "backdrop-blur-sm dark:backdrop-blur lg:left-72 xl:left-80",
        isInsideMobileNavigation
          ? "bg-white dark:bg-zinc-900"
          : "bg-white/[var(--bg-opacity-light)] dark:bg-zinc-900/[var(--bg-opacity-dark)]"
      )}
    >
      <div
        className={clsx(
          "absolute inset-x-0 top-full h-px transition",
          (isInsideMobileNavigation || !mobileNavIsOpen) &&
            "bg-zinc-900/7.5 dark:bg-white/7.5"
        )}
      />
      <Search />

      <div className="flex items-center gap-5 lg:hidden">
        <Link href="/" aria-label="Home">
          <Logo className="h-6" />
        </Link>
      </div>
      <div className="flex items-center gap-5">
        <nav className="hidden md:block">
          <ul role="list" className="flex items-center gap-8">
            <TopLevelNavItem href="/">API</TopLevelNavItem>
            <TopLevelNavItem href="#">Documentation</TopLevelNavItem>
            <TopLevelNavItem href="#">Support</TopLevelNavItem>
          </ul>
        </nav>
        <div className="hidden md:block md:h-5 md:w-px md:bg-zinc-900/10 md:dark:bg-white/15" />
        <div className="flex gap-4 text-2xl">
          <Expand onToggle={toggleTheme} />
        </div>
        <div className="hidden min-[416px]:contents">
          <Button href="#">Sign in</Button>
        </div>
      </div>
    </div>
  );
}
