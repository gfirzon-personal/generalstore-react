import React, { useCallback, useEffect } from "react"
import { useForm } from "react-hook-form"
//import PropertyContainer from ".../../../components/screen-container/PropertyContainer";
import PropertyContainer from "../../../components/screen-container/PropertyContainer"
import { useData } from "../../../utils/useData"
import { getUserProfile, updateUserProfile } from "../../../utils/AccountClient"
import CancelButton from "../../../components/cancel-button/CancelButton"
import { toast } from "react-toastify"
import { useLoader } from "../../../contexts/LoaderContext"
import { ProfileModel } from "../../../types/ProfileModel"
import TextInputLabel from "../../../components/form/TextInputLabel"
import { useAuth } from "../../../contexts/AuthContext"
import { ThruFormProvider } from "../../../contexts/ThruFormContext"
import { showToast } from "../../../utils/ErrorUtils"

const inputs = {
  ID: "id",
  FIRST_NAME: "firstName",
  LAST_NAME: "lastName",
  USERNAME: "username",
  EMAIL: "emailAddress",
  PHONE: "phone",
  TITLE: "title",
}

const UserProfile: React.FC<IUserProfile> = () => {
  const form = useForm()

  const getUserProfileCall = useCallback(() => getUserProfile(), [])
  const { data: userProfileData, makeRequest: getUserProfileData }: any = useData(getUserProfileCall, {
    requestOnMount: false,
    requestCache: true,
  })

  console.log({ userProfileData: userProfileData })

  useEffect(() => {
    //if (userId > 0) {
    getUserProfileData()
    //}
  }, [getUserProfileData])

  const loading = !userProfileData

  const { setLoading } = useLoader()
  const { state: authData } = useAuth()

  console.log({ userState: authData })

  const onSubmit = async (data: any) => {
    const user: ProfileModel = {
      id: +authData.user.clientId,
      firstName: data[inputs.FIRST_NAME],
      lastName: data[inputs.LAST_NAME],
      username: data[inputs.USERNAME],
      emailAddress: data[inputs.EMAIL],
      phone: data[inputs.PHONE],
      title: data[inputs.TITLE],
    }

    const func = updateUserProfile

    setLoading(true)
    func(user)
      .client()
      .then((res: any) => {
        if (res.status === 200) {
          toast.success("Successfully updated profile.")
        } else {
          throw new Error(`Error updating profile ${res.status}`)
        }
      })
      .catch((e: any) => {
        showToast("Failed to update profile.", e)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <PropertyContainer title="Profile" description="update my profile settings">
      <ThruFormProvider loading={loading} customForm={form} onSubmit={onSubmit}>
        <div className="row Thru-Edit-Continer">
          <div className="col-lg-12">
            <div className="form-group mb-4">
              <TextInputLabel
                label="First Name"
                name={inputs.FIRST_NAME}
                defaultValue={userProfileData?.firstName}
                maxLength={128}
                placeholder="enter first name"
                required
              />
            </div>
            <div className="form-group mb-4">
              <TextInputLabel
                label="Last Name"
                name={inputs.LAST_NAME}
                defaultValue={userProfileData?.lastName}
                placeholder="enter last name"
                maxLength={128}
                required
              />
            </div>
            <div className="form-group mb-4">
              <TextInputLabel
                label="Title"
                name={inputs.TITLE}
                maxLength={128}
                placeholder="enter title"
                defaultValue={userProfileData?.title}
              />
            </div>
            <div className="form-group mb-4">
              <TextInputLabel
                label="Username"
                name={inputs.USERNAME}
                maxLength={128}
                placeholder="enter username"
                defaultValue={userProfileData?.username}
              />
            </div>
            <div className="form-group mb-4">
              <TextInputLabel
                label="Email"
                name={inputs.EMAIL}
                maxLength={128}
                placeholder="enter email address"
                defaultValue={userProfileData?.emailAddress}
              />
            </div>
            <div className="form-group mb-4">
              <TextInputLabel
                label="Phone"
                name={inputs.PHONE}
                maxLength={128}
                placeholder="enter phone"
                defaultValue={userProfileData?.phone}
              />
            </div>
          </div>
        </div>
        <div className="Thru-portlet-footer border-top">
          <div className="row">
            <div className="col d-flex">
              <div className="mr-3">
                <button id="btnProfileSave" className="btn btn-Save btn-thru-lg">
                  Save
                </button>
              </div>
              <CancelButton isDirty={form.formState.isDirty} to="/" />
            </div>
          </div>
        </div>
      </ThruFormProvider>
    </PropertyContainer>
  )
}

interface IUserProfile {}

export default UserProfile
