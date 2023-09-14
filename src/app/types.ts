import { ForwardRefExoticComponent, SVGProps, RefAttributes } from "react";

export type Feed = {
  id: number;
  name: string;
  href: string;
  initial: string;
  current: boolean;
}

export type Navigation = {
  name: string;
  href: string;
  icon: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref"> & {
    title?: string | undefined;
    titleId?: string | undefined;
  } & RefAttributes<SVGSVGElement>>;
  current: boolean;
}

export type NavigationItem = {
  name: string;
  href: string;
  icon: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref"> & {
    title?: string | undefined;
    titleId?: string | undefined;
  } & RefAttributes<SVGSVGElement>>;
  current: boolean;
}

export type Article = {
  title: {
    name: string;
    imageUrl: string;
  };
  description: string;
  link: string;
  feedName: string;
  date: string;
  dateTime: string;
}