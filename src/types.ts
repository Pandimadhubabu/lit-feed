import { ForwardRefExoticComponent, SVGProps, RefAttributes } from "react";

export type NavigationItem = {
  name: Name;
  link: PageLink;
  icon: ForwardRefExoticComponent<
    Omit<SVGProps<SVGSVGElement>, "ref"> & {
      title?: Title;
      titleId?: ID;
    } & RefAttributes<SVGSVGElement>
  >;
};

export type ID = string;
export type Name = string;
export type PageLink = string;
export type Href = string;
export type Title = string;
export type Summary = string;
export type Email = string;
export type Duration = string;
export type DateTime = string;
export interface Feed extends Identifiable {
  id: ID;
  userId: User["id"];
  image?: Href;
  href: Href;
  name: Name;
  unread: number;
  updatedAt: DateTime;
}

export interface Article extends Identifiable {
  id: ID;
  feedId: Feed["id"];
  feedName: Feed["name"];
  href: Href;
  image?: Href;
  title: Title;
  summary: Summary;
  duration?: Duration;
  isRead: boolean;
  isSaved: boolean;
  content?: string;
  date?: DateTime;
}

export interface User extends Identifiable {
  id: string;
  email: string;
  name: string;
  picture: string;
  oauthId: string;
  isEmailVerified: boolean;
  nickname: string;
  updatedAt: DateTime;
}

export interface Identifiable {
  id: ID;
}
