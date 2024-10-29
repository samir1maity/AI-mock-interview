/** @format */
"use client";
import Landing from "@/components/Landing";
import { useSession } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";

type PublicUserData = {
  identifier?: string;
};

export default function Home() {
  const { session } = useSession();
  const router = useRouter();
  const publicUserData: PublicUserData = session?.publicUserData || {};
  const { identifier } = publicUserData;

  const handleRedirectDashBoard = () => {
    router.push("/dashboard");
  };

  return identifier ? (
    <>{handleRedirectDashBoard()}</>
  ) : (
    <>
      <Landing />
    </>
  );
}
