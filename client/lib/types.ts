import { LucideIcon } from "lucide-react";

export type FormFieldConfig = {
  name: "userName" | "password";
  type: string;
  placeholder: string;
};

export type LoginPageConfig = {
  title: string;
  description: string;
  formFieldConfigs: FormFieldConfig[];
  submitButtonText: string;
};

export type NavigationItemType = {
  title: string;
  href: string;
  color: string;
  icon: LucideIcon;
};

export type TypeTheatersListData = {
  name: string;
  isAdminTheater: boolean;
  numberOfActs: number;
  createdAt: string;
  theaterId: string;
  onCloneSuccess: any;
};

export type TypeVerse = {
  _id: string;
  name: string;
  response: string;
  responseType: string;
  httpCode: number;
  isActive: boolean;
  actId: string;
};

export type TypeAct = {
  _id: string;
  name: string;
  endPoint: string;
  theaterId: string;
  method: string;
  theaterName?: string | undefined;
  verses: TypeVerse[];
};

export type TypeTheater = {
  _id: string;
  name: string;
  isAdminTheater: boolean;
  description?: string;
  viewerList: string[];
  editorList: string[];
  createdAt: string;
};

export type TypeTheaterDetails = {
  theaterDetails: TypeTheater;
  actDetails: TypeAct[];
};

export type TypePermissionOption = {
  label: string;
  id: string;
};
