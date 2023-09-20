'use client';
import { Dialog, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, ChevronRightIcon, ChevronUpDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import {
  Cog6ToothIcon,
  Square3Stack3DIcon,
  StarIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { Fragment, useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { classNames } from './utils';
import { Article } from './components/Article';

const navigation = [
  { name: 'Saved', href: '#', icon: StarIcon, current: false },
  { name: 'Settings', href: '#', icon: Cog6ToothIcon, current: false },
  { name: 'All Feeds', href: '#', icon: Square3Stack3DIcon, current: true },
]
const feeds = [
  { id: 1, name: 'Stackoverflow Blog', href: '#', initial: 'S', current: false },
  { id: 2, name: 'Hacker News', href: '#', initial: 'H', current: false },
  { id: 3, name: 'Martin Fowler', href: '#', initial: 'M', current: false },
]
const statuses = {
  offline: 'text-gray-500 bg-gray-100/10',
  online: 'text-green-400 bg-green-400/10',
  error: 'text-rose-400 bg-rose-400/10',
}
const environments = {
  Preview: 'text-gray-400 bg-gray-400/10 ring-gray-400/20',
  Production: 'text-indigo-400 bg-indigo-400/10 ring-indigo-400/30',
}
const deployments = [
  {
    id: 1,
    href: '#',
    projectName: 'ios-app',
    teamName: 'Planetaria',
    status: 'offline',
    statusText: 'Initiated 1m 32s ago',
    description: 'Deploys from GitHub',
    environment: 'Preview',
  },
  // More deployments...
] as {
  status: keyof typeof statuses
  href: string
  environment: keyof typeof environments
  [key: string]: string | number
}[]

const articles = [
  {
    title: {
      name: 'Can LLMs learn from a single example?',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    description: `I've been working on a new approach to few-shot learning, and I'm excited to share some results.`,
    link: 'https://www.fast.ai/posts/2023-09-04-learning-jumps/',
    feedName: 'Hacker News',
    date: '1h',
    dateTime: 'Wed, 6 Sep 2023 00:40:05 +0000',
  },
  // More items...
]

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [articleOpen, setArticleOpen] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState(0)

  return (
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 xl:hidden" onClose={setSidebarOpen}>
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
                    <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <Sidebar feeds={feeds} navigation={navigation} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <Transition.Root show={articleOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setArticleOpen}>
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
              <Dialog.Panel className="relative mr-16 flex w-full max-w-full flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex justify-center pt-5">
                    <button type="button" className="-m-2.5 p-2.5" onClick={() => setArticleOpen(false)}>
                      <span className="sr-only">Close article</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <Article article={articles[selectedArticle]} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <Sidebar feeds={feeds} navigation={navigation} />
      </div>

      <div className="xl:pl-72">
        {/* Sticky search header */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-gray-900 px-4 shadow-sm sm:px-6 lg:px-8">
          <button type="button" className="-m-2.5 p-2.5 text-white xl:hidden" onClick={() => setSidebarOpen(true)}>
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-5 w-5" aria-hidden="true" />
          </button>

          <header className="flex items-center justify-between border-b border-white/5 w-full px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
            <h2 className="text-base font-semibold leading-7 dark:text-white text-black">All feeds</h2>
          </header>
        </div>

        {/* Feed list */}
        <aside className="bg-gray-800 lg:fixed lg:bottom-0 lg:left-0 lg:top-16 lg:w-96 lg:overflow-y-auto lg:border-l lg:border-white/5 xl:left-auto">
          <ul role="list" className="divide-y divide-white/5">
            {articles.map((item, index) => (
              <li key={item.link} className="px-4 py-4 sm:px-6 lg:px-8" onClick={() => { setArticleOpen(true); setSelectedArticle(index) }}>
                <div className="flex items-center flex-col gap-x-3">
                  <h3 className="flex-auto w-full truncate text-sm font-semibold leading-6 dark:text-white text-black">{item.title.name}</h3>
                  <p id="description" className="flex-auto w-full truncate text-xs dark:text-gray-400 text-gray-800">
                    {item.description}
                  </p>
                </div>
                <p className="mt-3 truncate text-sm dark:text-gray-500 text-gray-800">
                  Published on <span className="dark:text-gray-400 text-gray-800">{item.feedName}</span>
                  <time dateTime={item.dateTime} className="flex-none text-xs m-2 dark:text-gray-600 text-gray-900">
                    {item.date}
                  </time>
                </p>
              </li>
            ))}
          </ul>
        </aside>
        <main className="hidden w-full h-full lg:block lg:fixed lg:left-96 xl:left-[42rem]">
          <Article article={articles[selectedArticle]} />
        </main>
      </div >
    </div >
  )
}
