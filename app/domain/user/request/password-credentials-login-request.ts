export interface PasswordCredentialsLoginRequest {
  email: string,
  password: string
}

export interface PasswordCredentialsLoginMobileRequest {
  email: string,
  password: string,
  pushToken: string
}
