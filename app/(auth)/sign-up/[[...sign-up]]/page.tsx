/** @format */
"use client";
import { SignUp, useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export default function Page() {
  const { user, isSignedIn, isLoaded } = useUser();

  console.log("in signuppage");

  useEffect(() => {
    const storeUserInDB = async () => {
      console.log("flow reached here and user data is ->", user);
    };

    if (isLoaded && isSignedIn) {
      storeUserInDB();
    }
  }, [user, isSignedIn, isLoaded]);

  return <SignUp />;
}
