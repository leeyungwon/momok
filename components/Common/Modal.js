import {
  ModalContainer,
  ModalInner,
  ModalHeader,
  Title,
  CloseButton,
  ModalBody,
} from '~/styles/common/modal'

const Modal = ({
  children,
  title,
  handleIsShowModal,
}) => {
  const handleCloseModal = () => {
    if (!handleIsShowModal || typeof handleIsShowModal !== 'function') {
      return
    }

    handleIsShowModal(false)
  }

  return (
    <ModalContainer onClick={handleCloseModal}>
      <ModalInner onClick={e => {e.stopPropagation()}}>
        <ModalHeader>
          <Title>{title}</Title>
          {typeof handleIsShowModal === 'function' &&
            <CloseButton
              onClick={handleCloseModal}
            >×</CloseButton>
          }
        </ModalHeader>
        <ModalBody>
          {children}
        </ModalBody>
      </ModalInner>
    </ModalContainer>
  )
}

export default Modal
