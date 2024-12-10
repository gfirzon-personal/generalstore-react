// import { ModalBackdropStyle, ModalHeader, ModalStyle } from '../theme/Styles'

import React from 'react'
import { useModal } from '../../contexts/ModalContext'

// import { css } from 'emotion'


function Modal() {
    const { closeModal, isModalOpen, modalBody } = useModal()

    const keydownClose = React.useCallback(e => {
        if (e.key === "Escape") {
            // closeModal()
        }
    }, [closeModal])

    React.useEffect(() => {
        document.addEventListener("keydown", keydownClose)

        return () => document.removeEventListener("keydown", keydownClose)
    }, [keydownClose])

    if (!isModalOpen) {
        return null
    }

    return (
        isModalOpen &&
        <> { modalBody} </>
    )
}

export default Modal
