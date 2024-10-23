import ChatUI from "@/screens/ChatUI";
import { chatSession } from "@/utils/geminiAIModel";
import { useSession } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useEffect } from "react";

type PublicUserData = {
  identifier?: string;
};

const page = () => {
  const { interviewId } = useParams();
  const { session } = useSession();
  const publicUserData: PublicUserData = session?.publicUserData || {};
  const { identifier } = publicUserData;

  useEffect(() => {}, []);

  async function fetchInterviewDetails() {
    try {
      const interviewDetails = await fetch(
        `/api/interview/?identifier=${identifier}&interviewId=${interviewId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ identifier }),
        }
      );
      const response = await interviewDetails;
      console.log("response", response);
    } catch (error) {
      console.log("error occurs in chatUI page", error);
    }
  }

  async function handleChatStart() {
    try {
      const inputPrompt = `Generate ${process.env.NEXT_PUBLIC_QUESTIONS_LIMIT} of interview questions for a ${jobPosition} with ${yearOfExp} of experience. The candidate should be proficient in ${jobDec}. Ensure the questions difficulty level should depends on experince level , focusing on practical and theoretical knowledge relevant to the role. The questions should be valid for an interview setting and cover various concepts within the tech stack to effectively evaluate the candidate’s skills.give data in json format`;
      const aiGeneratedData = await chatSession.sendMessage(inputPrompt);
      const result = aiGeneratedData.response.text();
      const data = result.replace("```json", "").replace("```", "");
      const temp = JSON.parse(data);
    } catch (error) {
      console.log("error at generating AI response", error);
    }
  }

  return (
    <>
      <ChatUI />
    </>
  );
};

export default page;
