import { CertificateModel } from "../types/ForgotCredentialsModel";
import client from "./ApiClient";

const _forgotUser = "/ForgotUser";

const forgotUsername = (forgotCredentialsModel: CertificateModel) => {
  return client<any>(`${_forgotUser}/username`, {
    method: "POST",
    body: forgotCredentialsModel,
  });
};

const forgotPassword = (forgotCredentialsModel: CertificateModel) => {
  return client<any>(`${_forgotUser}/password`, {
    method: "POST",
    body: forgotCredentialsModel,
  });
};

export { forgotUsername, forgotPassword };
