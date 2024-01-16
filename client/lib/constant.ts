type FormFieldConfig = {
  name: "userName" | "password";
  type: string;
  placeholder: string;
};

type LoginPageConfig = {
  title: string;
  description: string;
  formFieldConfigs: FormFieldConfig[];
  submitButtonText: string;
};

export const LOGIN_PAGE_CONFIG: LoginPageConfig = {
  title: "ACTOR",
  description: "A simplified to mock your APIs",
  formFieldConfigs: [
    {
      name: "userName",
      type: "text",
      placeholder: "Enter your user name",
    },
    {
      name: "password",
      type: "password",
      placeholder: "Enter your password",
    },
  ],
  submitButtonText: "Login",
};
