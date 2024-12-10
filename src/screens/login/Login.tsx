import React from "react"
import { useAuth } from "../../contexts/AuthContext"
import { useForm } from "react-hook-form"
import { useLoader } from "../../contexts/LoaderContext"
import ForgotLoginModal from "./ForgotLoginModal"

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm()

  const {
    state: { error = {} },
    login,
  } = useAuth()

  const { setLoading } = useLoader()

  // const invalidUsername = error.type === authConstants.BAD_USERNAME
  // const invalidPassword = error.type === authConstants.BAD_PASSWORD

  const onSubmit = async (data: any) => {
    const credentials = {
      username: data.login_username,
      password: data.login_password,
    }

    setLoading(true)
    await login(credentials)
    setLoading(false)
  }

  return (
    <div className="thru-login-container d-flex m-0 p-0">
      <div className="left d-flex flex-column thru-grid-item justify-content-between">
        <div>
          <img className="img-fluid" src="\images\whitelogo_registered.svg" alt="Thru logo" width={200} />
        </div>
        <div className="thru-login-centerTitles justify-content-center">
          <h3 className="thru-login-title">Welcome to the Ramazanova Grocery Store.</h3>
          <h4 className="thru-login-subtitle">
            We are the leading provider of quality grocieries. Since 2021, we have offered
            fresh groceries at reasonable prices.
          </h4>
        </div>
        <div className="thru-login-footer">
          <div className="thru-login-info">
            <div className="thru-login-copyright">
              <small>Copyright © 2021 Thru, Inc.</small>
            </div>
            <div className="thru-login-menu">
              <a target="_blank" rel="noreferrer" href="https://www.thruinc.com/support" className="thru-link">
                Support
              </a>
              <a target="_blank" rel="noreferrer" href="https://www.thruinc.com/contact-us/" className="thru-link">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="right d-flex align-items-center justify-content-center flex-column">
        <div className="thru-login-form">
          <h3 className="thru-signin-title">Login</h3>
          <ForgotLoginModal
            modalId="forgotUsernameModal"
            title="Forgot your username?"
            prompt="Enter your registered email address"
          />
          <ForgotLoginModal
            modalId="forgotPasswordModal"
            title="Forgot your password?"
            prompt="Enter your username and we'll send you a link to reset your password"
          />
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* <div className="thru-login-v2 mt-4 mb-3 login-form-tweak" autoComplete="on"> */}
            <div className="thru-login-v2 mt-4 mb-3 login-form-tweak">
              <div className="form-group ">
                <div className="form-horizontal">
                  {/* <input type="hidden" id="TenantId" name="TenantId" className="form-control" data-toggle="tooltip" defaultValue /> */}
                  <input type="hidden" id="TenantId" name="TenantId" className="form-control" data-toggle="tooltip" />
                  <div className="form-group">
                    <label htmlFor="Username" className="control-label">
                      Username&nbsp;
                      <span className="Thru-required"> *</span>
                    </label>
                    {/* <input type="text" formcontrolname="username" [ngclass]="{ 'is-invalid': submitted && f.username.errors }" className="form-control mt-0" size={80} maxLength={80} required data-toggle="tooltip" autoComplete="login_username" /> */}
                    <input
                      name="login_username"
                      id="login_username"
                      type="text"
                      className="form-control mt-0"
                      size={80}
                      maxLength={80}
                      required
                      data-toggle="tooltip"
                      autoComplete="login_username"
                      ref={register({ required: true })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Password" className="control-label">
                      Password&nbsp;
                      <span className="Thru-required"> *</span>
                    </label>
                    {/* <input type="password" formcontrolname="password" [{'is-invalid': submitted && f.password.errors }" className="form-control" size={80} maxLength={80} required data-toggle="tooltip" autoComplete="login_password" /> */}
                    <input
                      name="login_password"
                      id="login_password"
                      type="password"
                      className="form-control"
                      size={80}
                      maxLength={80}
                      required
                      data-toggle="tooltip"
                      autoComplete="login_password"
                      ref={register({ required: true })}
                    />
                  </div>
                  <div id="error" className="error mt-3" style={{ display: "none", color: "red" }} />
                  {/* *****  THIS NEEDS TO BE IMPLEMENTED  ******/}
                </div>
              </div>
              <div className="thru-login__actions mt-4">
                <button id="btnLogin" className="btn btn-thru w-100" type="submit">
                  Login
                </button>
              </div>
              {/* <div *ngif="error" className="alert alert-danger mt-3 mb-0">{'{'}{'{'}error{'}'}{'}'}</div> */}
              {error.error ? <div className="alert alert-danger mt-3 mb-0">{error.message}</div> : <div />}
              <div className="thru-login-essentials d-flex mt-5 justify-content-center">
                <div className="mr-5">
                  <a href="#" data-toggle="modal" data-target="#forgotUsernameModal">
                    Forgot Username?
                  </a>
                </div>
                <div className="ml-5">
                  <a href="#" data-toggle="modal" data-target="#forgotPasswordModal">
                    Forgot Password?
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
        {/*end sign in form */}
      </div>
      {/*end right*/}
    </div>
  )
}

export default Login
