import { useFeeds } from "@/hooks/useFeeds";
import { usePath } from "@/hooks/usePath";
import { useSegments } from "@/hooks/useSegments";
import { classNames, getFeedLink } from "@/utils";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  Cog6ToothIcon,
  FunnelIcon,
  PencilSquareIcon,
  Square3Stack3DIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";

const navigation = [
  { name: "Articles", link: "/", icon: Square3Stack3DIcon },
  { name: "Saved", link: "/saved", icon: StarIcon },
  { name: "Filters", link: "/filters", icon: FunnelIcon },
  { name: "Settings", link: "/settings", icon: Cog6ToothIcon },
];
export function Sidebar() {
  const { user, isLoading: isUserLoading, error: userError } = useUser();
  const { feeds, isLoading: isFeedLoading, error: feedError } = useFeeds();
  const [segmentName, feedId] = useSegments();
  const path = usePath();
  const [selectedNavigation, setSelectedNavigation] = useState(0);
  const [selectedFeed, setSelectedFeed] = useState(0);

  useEffect(() => {
    setSelectedNavigation(navigation.findIndex((item) => item.link === path));

    setSelectedFeed(feeds.findIndex((feed) => getFeedLink(feed) === path));
  }, [feeds, path]);

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 ring-1 ring-white/10">
      <div className="flex h-16 shrink-0 items-center">
        <svg
          width="50px"
          height="50px"
          viewBox="-33 0 255 255"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid"
        >
          <defs>
            <style
              dangerouslySetInnerHTML={{
                __html: `
              .cls-3 {
                fill: url(#linear-gradient-1);
              }

              .cls-4 {
                fill: #fc9502;
              }

              .cls-5 {
                fill: #fce202;
              }
            `,
              }}
            ></style>

            <linearGradient
              id="linear-gradient-1"
              gradientUnits="userSpaceOnUse"
              x1="94.141"
              y1="255"
              x2="94.141"
              y2="0.188"
            >
              <stop offset="0" stopColor="#ff4c0d" />
              <stop offset="1" stopColor="#fc9502" />
            </linearGradient>
          </defs>
          <g id="fire">
            <path
              d="M187.899,164.809 C185.803,214.868 144.574,254.812 94.000,254.812 C42.085,254.812 -0.000,211.312 -0.000,160.812 C-0.000,154.062 -0.121,140.572 10.000,117.812 C16.057,104.191 19.856,95.634 22.000,87.812 C23.178,83.513 25.469,76.683 32.000,87.812 C35.851,94.374 36.000,103.812 36.000,103.812 C36.000,103.812 50.328,92.817 60.000,71.812 C74.179,41.019 62.866,22.612 59.000,9.812 C57.662,5.384 56.822,-2.574 66.000,0.812 C75.352,4.263 100.076,21.570 113.000,39.812 C131.445,65.847 138.000,90.812 138.000,90.812 C138.000,90.812 143.906,83.482 146.000,75.812 C148.365,67.151 148.400,58.573 155.999,67.813 C163.226,76.600 173.959,93.113 180.000,108.812 C190.969,137.321 187.899,164.809 187.899,164.809 Z"
              id="path-1"
              className="cls-3"
              fillRule="evenodd"
            />
            <path
              d="M94.000,254.812 C58.101,254.812 29.000,225.711 29.000,189.812 C29.000,168.151 37.729,155.000 55.896,137.166 C67.528,125.747 78.415,111.722 83.042,102.172 C83.953,100.292 86.026,90.495 94.019,101.966 C98.212,107.982 104.785,118.681 109.000,127.812 C116.266,143.555 118.000,158.812 118.000,158.812 C118.000,158.812 125.121,154.616 130.000,143.812 C131.573,140.330 134.753,127.148 143.643,140.328 C150.166,150.000 159.127,167.390 159.000,189.812 C159.000,225.711 129.898,254.812 94.000,254.812 Z"
              id="path-2"
              className="cls-4"
              fillRule="evenodd"
            />
            <path
              d="M95.000,183.812 C104.250,183.812 104.250,200.941 116.000,223.812 C123.824,239.041 112.121,254.812 95.000,254.812 C77.879,254.812 69.000,240.933 69.000,223.812 C69.000,206.692 85.750,183.812 95.000,183.812 Z"
              id="path-3"
              className="cls-5"
              fillRule="evenodd"
            />
          </g>
        </svg>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item, index) => (
                <li key={item.name}>
                  <Link
                    href={item.link}
                    className={classNames(
                      selectedNavigation === index
                        ? "bg-gray-800 text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-800",
                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer"
                    )}
                  >
                    <item.icon
                      className="h-6 w-6 shrink-0"
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <div className="flex justify-between text-xs font-semibold leading-6 text-gray-400">
              Your feeds
              <PencilSquareIcon
                className="h-4 w-4 ml-1.5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <ul role="list" className="-mx-2 mt-2 space-y-1">
              {isFeedLoading
                ? [0, 1, 2].map((index) => (
                    <li
                      key={index}
                      className="animate-pulse flex justify-between p-2"
                    >
                      <span className="h-6 w-6 shrink-0 rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white"></span>
                      <div className="w-full m-2 h-2 bg-slate-200 rounded"></div>
                    </li>
                  ))
                : feeds.map((feed, index) => (
                    <li key={feed.name}>
                      <Link
                        href={getFeedLink(feed)}
                        className={classNames(
                          selectedFeed === index
                            ? "bg-gray-800 text-white"
                            : "text-gray-400 hover:text-white hover:bg-gray-800",
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer"
                        )}
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                          {feed.image ? (
                            <img className="h-4 w-4" src={feed.image} alt="" />
                          ) : (
                            <></>
                          )}
                        </span>
                        <span className="truncate">{feed.name}</span>
                      </Link>
                    </li>
                  ))}
            </ul>
          </li>
          {!isUserLoading ? (
            <li className="-mx-6 mt-auto">
              <a
                href="#"
                className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
              >
                {!!user?.picture && (
                  <img
                    className="h-8 w-8 rounded-full bg-gray-800"
                    src={user?.picture}
                    alt=""
                  />
                )}
                <span className="sr-only">Your profile</span>
                <span aria-hidden="true">{user?.nickname}</span>
              </a>
            </li>
          ) : (
            <></>
          )}
        </ul>
      </nav>
    </div>
  );
}
