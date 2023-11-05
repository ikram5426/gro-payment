

export interface NavButtonProps {
  title: string;
  link:string
}

export interface HeroProps{
title:string;
text:string;
link:string;
type:string
}





export interface CardProps{
  title: string;
  imgUrl: string;
  onClick:()=>void
}

interface Button {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  photo: string;
  url: string;
  type: number;
  position: number;
  premium: boolean;
}

interface Element {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  type: number;
  font_type: number;
  font_size: number;
  media_width: number;
  media_height: number;
  media_url: string;
  breadcrumbs: string;
  vertical_spacing: number;
  horizontal_spacing: number;
  position: number;
  font_color: string;
  text: string;
}

export interface DataItem {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  searchTitle: string;
  type: number;
  breadcrumbs: string;
  button_order: string;
  photo: string;
  buttons: Button[]; // Use Button[] instead of any[]
  elements: Element[];
  inApp: any;
}





export interface FilteredData {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  searchTitle: string;
  type: number;
  breadcrumbs: string;
  button_order: string;
  photo: string;
  buttons: Button[];
  elements: Element[];
  inApp: any;
}


