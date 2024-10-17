"use client";
import { SignUp, useSignUp } from "@clerk/nextjs";
import { useEffect } from "react";
import { useSession } from "@clerk/nextjs";

export default function Page() {
  const { isLoaded, signUp } = useSignUp();

  console.log('first', useSession())

  useEffect(() => {
    console.log("flow reached here");
    if (isLoaded && signUp?.status === "complete") {
      // After Clerk signup is complete, send data to your API
      const { firstName, lastName, emailAddress } = signUp;

      console.log("firstName", firstName);

      // fetch("/api/store-user", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     email: emailAddress,
      //     firstName,
      //     lastName,
      //   }),
      // })
      //   .then((res) => res.json())
      //   .then((data) => console.log("User stored:", data))
      //   .catch((error) => console.error("Error storing user:", error));
    }
  }, [isLoaded, signUp]);

  console.log("isLoaded", isLoaded, "and", signUp);

  return <SignUp />;
}
