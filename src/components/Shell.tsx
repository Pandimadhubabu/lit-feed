import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import "@/globals.css";
import { Dialog, Transition } from "@headlessui/react";
import {
  Cog6ToothIcon,
  Square3Stack3DIcon,
  StarIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Fragment, ReactNode, useState } from "react";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Lit Feed!",
  description: "Yet another feed reader",
};

const navigation = [
  { name: "Articles", link: "/", icon: Square3Stack3DIcon },
  { name: "Saved", link: "/saved", icon: StarIcon },
  { name: "Settings", link: "/settings", icon: Cog6ToothIcon },
];

export default function Shell({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 xl:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <Sidebar />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <Header setSidebarOpen={setSidebarOpen} />

      {/* Static sidebar for desktop */}
      <div className="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <Sidebar />
      </div>

      <div className="xl:pl-72">{children}</div>
    </div>
  );
}
