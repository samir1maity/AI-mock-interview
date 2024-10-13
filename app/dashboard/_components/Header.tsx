"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Cpu } from "lucide-react";

export default function Header() {
  const [profilePopupEnabled, setProfilePopupEnabled] =
    useState<boolean>(false);

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
    // <div className="h-32 bg-white">
    //   <header className="bg-white">
    //     <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
    //       <div className="flex h-16 items-center justify-between">
    //         <div className="flex-1 md:flex md:items-center md:gap-12">
    //           <a className="block text-teal-600" href="#">
    //             <span className="sr-only">Home</span>
    //             <svg
    //               className="h-8"
    //               viewBox="0 0 28 24"
    //               fill="none"
    //               xmlns="http://www.w3.org/2000/svg"
    //             >
    //               <path
    //                 d="M0.41 10.3847C1.14777 7.4194 2.85643 4.7861 5.2639 2.90424C7.6714 1.02234 10.6393 0 13.695 0C16.7507 0 19.7186 1.02234 22.1261 2.90424C24.5336 4.7861 26.2422 7.4194 26.98 10.3847H25.78C23.7557 10.3549 21.7729 10.9599 20.11 12.1147C20.014 12.1842 19.9138 12.2477 19.81 12.3047H19.67C19.5662 12.2477 19.466 12.1842 19.37 12.1147C17.6924 10.9866 15.7166 10.3841 13.695 10.3841C11.6734 10.3841 9.6976 10.9866 8.02 12.1147C7.924 12.1842 7.8238 12.2477 7.72 12.3047H7.58C7.4762 12.2477 7.376 12.1842 7.28 12.1147C5.6171 10.9599 3.6343 10.3549 1.61 10.3847H0.41ZM23.62 16.6547C24.236 16.175 24.9995 15.924 25.78 15.9447H27.39V12.7347H25.78C24.4052 12.7181 23.0619 13.146 21.95 13.9547C21.3243 14.416 20.5674 14.6649 19.79 14.6649C19.0126 14.6649 18.2557 14.416 17.63 13.9547C16.4899 13.1611 15.1341 12.7356 13.745 12.7356C12.3559 12.7356 11.0001 13.1611 9.86 13.9547C9.2343 14.416 8.4774 14.6649 7.7 14.6649C6.9226 14.6649 6.1657 14.416 5.54 13.9547C4.4144 13.1356 3.0518 12.7072 1.66 12.7347H0V15.9447H1.61C2.39051 15.924 3.154 16.175 3.77 16.6547C4.908 17.4489 6.2623 17.8747 7.65 17.8747C9.0377 17.8747 10.392 17.4489 11.53 16.6547C12.1468 16.1765 12.9097 15.9257 13.69 15.9447C14.4708 15.9223 15.2348 16.1735 15.85 16.6547C16.9901 17.4484 18.3459 17.8738 19.735 17.8738C21.1241 17.8738 22.4799 17.4484 23.62 16.6547ZM23.62 22.3947C24.236 21.915 24.9995 21.664 25.78 21.6847H27.39V18.4747H25.78C24.4052 18.4581 23.0619 18.886 21.95 19.6947C21.3243 20.156 20.5674 20.4049 19.79 20.4049C19.0126 20.4049 18.2557 20.156 17.63 19.6947C16.4899 18.9011 15.1341 18.4757 13.745 18.4757C12.3559 18.4757 11.0001 18.9011 9.86 19.6947C9.2343 20.156 8.4774 20.4049 7.7 20.4049C6.9226 20.4049 6.1657 20.156 5.54 19.6947C4.4144 18.8757 3.0518 18.4472 1.66 18.4747H0V21.6847H1.61C2.39051 21.664 3.154 21.915 3.77 22.3947C4.908 23.1889 6.2623 23.6147 7.65 23.6147C9.0377 23.6147 10.392 23.1889 11.53 22.3947C12.1468 21.9165 12.9097 21.6657 13.69 21.6847C14.4708 21.6623 15.2348 21.9135 15.85 22.3947C16.9901 23.1884 18.3459 23.6138 19.735 23.6138C21.1241 23.6138 22.4799 23.1884 23.62 22.3947Z"
    //                 fill="currentColor"
    //               />
    //             </svg>
    //           </a>
    //         </div>

    //         <div className="md:flex md:items-center md:gap-12">
    //           <nav aria-label="Global" className="hidden md:block">
    //             <ul className="flex items-center gap-6 text-sm">
    //               {items.map((item) => (
    //                 <>
    //                   <li>
    //                     <Link
    //                       className="text-gray-500 transition hover:text-gray-500/75"
    //                       href={item.path}
    //                     >
    //                       {item.name}
    //                     </Link>
    //                   </li>
    //                 </>
    //               ))}
    //             </ul>
    //           </nav>

    //           <div className="hidden md:relative md:block">
    //             <button
    //               type="button"
    //               className="overflow-hidden rounded-full border border-gray-300 shadow-inner"
    //               onClick={() => setProfilePopupEnabled((p) => !p)}
    //             >
    //               <span className="sr-only">Toggle dashboard menu</span>

    //               <img
    //                 src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    //                 alt=""
    //                 className="size-10 object-cover"
    //               />
    //             </button>
    //             {profilePopupEnabled ? (
    //               <>
    //                 <div
    //                   className="absolute end-0 z-10 mt-0.5 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
    //                   role="menu"
    //                 >
    //                   <div className="p-2">
    //                     <a
    //                       href="#"
    //                       className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
    //                       role="menuitem"
    //                     >
    //                       My profile
    //                     </a>

    //                     <a
    //                       href="#"
    //                       className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
    //                       role="menuitem"
    //                     >
    //                       Billing summary
    //                     </a>

    //                     <a
    //                       href="#"
    //                       className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
    //                       role="menuitem"
    //                     >
    //                       Team settings
    //                     </a>
    //                   </div>

    //                   <div className="p-2">
    //                     <form method="POST" action="#">
    //                       <button
    //                         type="submit"
    //                         className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
    //                         role="menuitem"
    //                       >
    //                         <svg
    //                           xmlns="http://www.w3.org/2000/svg"
    //                           fill="none"
    //                           viewBox="0 0 24 24"
    //                           strokeWidth="1.5"
    //                           stroke="currentColor"
    //                           className="size-4"
    //                         >
    //                           <path
    //                             strokeLinecap="round"
    //                             strokeLinejoin="round"
    //                             d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
    //                           />
    //                         </svg>
    //                         Logout
    //                       </button>
    //                     </form>
    //                   </div>
    //                 </div>
    //               </>
    //             ) : null}
    //           </div>

    //           <div className="block md:hidden">
    //             <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
    //               <svg
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 className="size-5"
    //                 fill="none"
    //                 viewBox="0 0 24 24"
    //                 stroke="currentColor"
    //                 strokeWidth="2"
    //               >
    //                 <path
    //                   strokeLinecap="round"
    //                   strokeLinejoin="round"
    //                   d="M4 6h16M4 12h16M4 18h16"
    //                 />
    //               </svg>
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </header>
    // </div>

    <header className="p-4 md:p-6 backdrop-blur-sm sticky top-0 z-50">
      <nav className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Cpu className="h-6 w-6 text-white" />
          <span className="text-xl font-bold text-grey-900">InterviewAI</span>
        </Link>
        <div className="hidden md:flex space-x-4">
          {items.map((item) => (
            <Link
              href={item.path}
              className="text-grey-900 hover:text-blue-200 transition-colors"
              key={item.id}
            >
              {item.name}
            </Link>
          ))}

          {/* <Link href="/pricing" className="text-grey-900 hover:text-blue-200 transition-colors">
          Pricing
        </Link>
        <Link href="/contact" className="text-grey-900 hover:text-blue-200 transition-colors">
          Contact
        </Link> */}
        </div>
        <Button
          variant="outline"
          className="text-grey-900 text-blue-600 hover:bg-blue-50"
        >
          Sign Up
        </Button>
      </nav>
    </header>
  );
}
