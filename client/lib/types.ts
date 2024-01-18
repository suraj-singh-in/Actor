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

export type TypeTheatersListData = {
  name: string;
  isAdminTheater: boolean;
  numberOfActs: number;
  createdAt: string;
  theaterId: string;
};
