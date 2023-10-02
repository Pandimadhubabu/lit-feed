import { Dialog, Transition } from "@headlessui/react";
import {
  Cog6ToothIcon,
  Square3Stack3DIcon,
  StarIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import type { NextPage } from "next";
import { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { Fragment, ReactElement, ReactNode, useState } from "react";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const navigation = [
  { name: "Articles", link: "/", icon: Square3Stack3DIcon },
  { name: "Saved", link: "/saved", icon: StarIcon },
  { name: "Settings", link: "/settings", icon: Cog6ToothIcon },
];

type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export default function App({
  Component,
  pageProps,
}: AppProps & {
  Component: NextPageWithLayout;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedFeed, setSelectedFeed] = useState(0);
  const [selectedNavigation, setSelectedNavigation] = useState(0);

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
                <Sidebar
                  navigation={navigation}
                  selectedNavigation={selectedNavigation}
                  onNavigationChange={setSelectedNavigation}
                  selectedFeed={selectedFeed}
                  onFeedChange={setSelectedFeed}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <Header setSidebarOpen={setSidebarOpen} selectedFeed={selectedFeed} />

      {/* Static sidebar for desktop */}
      <div className="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <Sidebar
          navigation={navigation}
          selectedNavigation={selectedNavigation}
          onNavigationChange={setSelectedNavigation}
          selectedFeed={selectedFeed}
          onFeedChange={setSelectedFeed}
        />
      </div>

      <div className="xl:pl-72">
        <Component {...pageProps} />
      </div>
    </div>
  );
}
