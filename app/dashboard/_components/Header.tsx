"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Cpu } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [profilePopupEnabled, setProfilePopupEnabled] =
    useState<boolean>(false);

  const pathName = usePathname();
  console.log('pathName', pathName)

  const items = [
    {
      id: 1,
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Features",
      path: "/info",
    },
    {
      id: 3,
      name: "How it works ?",
      path: "/info",
    },
  ];

  return (
    <header className="p-2 md:p-6 backdrop-blur-sm sticky top-0 z-50">
      <nav className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Cpu className="h-8 w-8 text-indigo-600" />
          <span className="text-2xl font-bold text-indigo-600">InterviewAI</span>
        </Link>
        <div className="hidden md:flex space-x-10">
          {items.map((item) => (
            <Link
              href={item.path}
              className="text-gray-600 hover:text-indigo-600 transition-colors text-md md:text-lg"
              key={item.id}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <Button
         variant="outline" className="hidden md:inline-flex"
        >
          Sign Up
        </Button>
      </nav>
    </header>
  );
}
