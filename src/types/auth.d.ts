type LoginErrorCode =
  | "INITIALIZED_PASSWORD"
  | "PASSWORD_HAS_EXPIRED"
  | "ID_PASSWORD_DOES_NOT_MATCH";

interface AuthToken {
  access_token: string;
  refresh_token: string;
}

interface StaffInfo {
  id: number;
  username: string;
  name: string;
  staffgroup: number;
}

interface AuthenticationResponse extends Partial<AuthToken> {
  detail?: string;
  error_code?: LoginErrorCode;
  staff?: StaffInfo;
  isError?: boolean;
}

interface LoginForm {
  username: string;
  password: string;
  service_name: string;
}

interface ChangePasswordForm {
  old_password: string;
  new_password: string;
  confirm_new_password: string;
}

type ChangePasswordProps = Pick<AuthenticationResponse, "staff" | "detail">;

type ChangePasswordSuccess = Pick<AuthenticationResponse, "detail"> & {
  ok: true;
};

interface ChangePasswordError {
  ok: false;
  old_password?: string[];
  new_password?: string[];
}

type ChangePasswordResponse = ChangePasswordSuccess | ChangePasswordError;

interface Credentials {
  exp: number;
  iat: number;
  userId: string;
}

type PartialCredentials = Partial<Credentials>;
