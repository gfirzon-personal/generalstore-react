import React from "react"
import TextInputLabel from "../../components/form/TextInputLabel"
import { ThruFormProvider } from "../../contexts/ThruFormContext"
import { forgotPassword, forgotUsername } from "../../utils/ForgotUserClient"
import { useForgotCredentials } from "./useForgotCredentials"

interface IForgotLoginModal {
  modalId: string
  title: string
  prompt: string
}

const inputs = {
  EMAIL_ADDRESS: "emailAddress",
  USERNAME: "username",
}

const ForgotLoginModal: React.FC<IForgotLoginModal> = ({ modalId, title, prompt }: IForgotLoginModal) => {
  const isForgotUsername = modalId === "forgotUsernameModal"

  const { submitData, inputs } = useForgotCredentials(isForgotUsername ? forgotUsername : forgotPassword)

  return (
    <ThruFormProvider
      loading={false}
      onSubmit={async (data) => {
        await submitData(data)
        document.getElementById(`cancel-${modalId}`)?.click()
      }}
    >
      <div
        className="modal fade"
        id={modalId}
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content un-pw-adjust">
            <div className="modal-header">
              <h5 className="modal-title " id="exampleModalLongTitle">
                {title}
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group col">
                <TextInputLabel label={prompt} name={isForgotUsername ? inputs.EMAIL_ADDRESS : inputs.USERNAME} />
              </div>
            </div>
            <div className="modal-footer justify-content-start ml-3">
              <button className="btn btn-thru btn-thru-lg">Send</button>
              <button
                id={`cancel-${modalId}`}
                type="button"
                className="btn btn-Cancel btn-thru-lg"
                data-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </ThruFormProvider>
  )
}

export default ForgotLoginModal
