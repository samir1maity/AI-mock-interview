import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <div className="min-h-screen bg-white">
      <header className=" mx-auto flex justify-between items-center backdrop-blur-sm">
        <div className="flex items-center space-x-2 p-4">
          <div className="w-8 h-8 bg-blue-600 rounded-md"></div>
          <span className="text-xl font-bold">AI-mock-interview</span>
        </div>
        <nav className="hidden md:flex items-center space-x-6 p-4">
          <Link href="/explore" className="text-gray-600 hover:text-gray-900">
            Dashboard
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-gray-900">
            Questions
          </Link>
          <Link href="/explore" className="text-gray-600 hover:text-gray-900">
            Upgrade
          </Link>
          <Link href="/explore" className="text-gray-600 hover:text-gray-900">
            How it Works ?
          </Link>
          {/* <Button className="bg-blue-600 text-white hover:bg-blue-700">
            How it works ?
          </Button> */}
        </nav>
      </header>
    </div>
  );
}
