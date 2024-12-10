import React from "react"

interface IModalContext {
  isModalOpen: boolean
  setIsModalOpen: (isOpen: boolean) => void
  closeModal: () => void
  modalBody?: React.ReactNode
  modalHeader?: React.ReactNode
  createModal: (body: React.ReactNode) => void
}

const ModalContext = React.createContext<IModalContext | undefined>(undefined)

interface IModalProvider {
  children: React.ReactNode
}

const ModalProvider: React.FC<IModalProvider> = ({
  children,
}: IModalProvider) => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)
  const [modalBody, setModalBody] = React.useState<React.ReactNode>()

  function closeModal() {
    setIsModalOpen(false)
  }

  function createModal(body: React.ReactNode) {
    setModalBody(body)
    setIsModalOpen(true)
  }

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
        closeModal,
        modalBody,
        createModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

function useModal() {
  const context = React.useContext(ModalContext)
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider")
  }
  return context
}

export { ModalProvider, useModal }
