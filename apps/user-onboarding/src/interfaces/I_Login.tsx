export interface ILoginForm {
  username: string;
  password: string;
  grant_type?: string;
  client_id?: string;
  scope?: string;
}

export interface ILoginFormError {
  username: string;
  password: string;
}

export interface ILoginFormValidations {
  username: string;
  password: string;
}
