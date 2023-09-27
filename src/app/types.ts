import { ForwardRefExoticComponent, SVGProps, RefAttributes } from "react";

export type Navigation = {
  name: Name;
  href: Href;
  icon: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref"> & {
    title?: Title;
    titleId?: ID;
  } & RefAttributes<SVGSVGElement>>;
}

export type NavigationItem = {
  name: Name;
  href: Href;
  icon: ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref"> & {
    title?: Title;
    titleId?: ID;
  } & RefAttributes<SVGSVGElement>>;
}

export type ID = string
export type Name = string
export type Href = string
export type Title = string
export type Description = string
export type Date = string
export type DateTime = string
export type Email = string

export type Feed = {
  id: ID;
  name: Name;
  link: Href;
  iconUrl: Href;
}

export type Article = {
  id: ID;
  title: Title;
  description: Description;
  link: Href;
  name: Name;
  date: Date;
  dateTime: DateTime;
}

export type User = {
  name: Name;
  email: Email;
  imageUrl: Href;
  id: ID;
}
