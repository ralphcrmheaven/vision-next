import {
  Modal,
  ModalBody,
  ModalHeader,
} from 'amazon-chime-sdk-component-library-react'

import bg0 from '../../assets/images/bg0.jpg'
import bg1 from '../../assets/images/bg1.jpg'
import bg2 from '../../assets/images/bg2.jpg'
import bg3 from '../../assets/images/bg3.jpg'
import bg4 from '../../assets/images/bg4.jpg'
import bg5 from '../../assets/images/bg5.jpg'
import bg6 from '../../assets/images/bg6.jpg'
import bg7 from '../../assets/images/bg7.jpg'
import bg8 from '../../assets/images/bg8.jpg'
import bg9 from '../../assets/images/bg9.jpg'
import bg10 from '../../assets/images/bg10.jpg'
import bg11 from '../../assets/images/bg11.jpg'
import bg12 from '../../assets/images/bg12.jpg'

interface Props {
  showModal: Boolean
  setShowModal: Function
  setBackground: Function
}

const SelectBackgroundImagesModal = (props: Props) => {
  if (!props.showModal) return <></>

  const bgs: string[] = [
    bg0,
    bg1,
    bg2,
    bg3,
    bg4,
    bg5,
    bg6,
    bg7,
    bg8,
    bg9,
    bg10,
    bg11,
    bg12,
  ]

  const selectBackground = (bg: string) => {
    props.setBackground(bg !== bg0 ? bg : '')
    props.setShowModal(false)
  }

  return (
    <Modal size="lg" onClose={() => props.setShowModal(!props.showModal)}>
      <ModalHeader title="Select background image" />
      <ModalBody className="overflow-y-auto h-310px">
        <div className="container grid grid-cols-3 gap-2 mx-auto pb-20px">
          {bgs.map((bg) => {
            return (
              <>
                <div
                  onClick={() => selectBackground(bg)}
                  className="relative w-full bg-center bg-cover border-2 rounded cursor-pointer h-36 hover:drop-shadow-md hover:left-2px hover:bottom-2px"
                  style={{ backgroundImage: `url("${bg}")` }}
                >
                  {/* <img src={bg} alt="bg" /> */}
                </div>
              </>
            )
          })}
        </div>
      </ModalBody>
    </Modal>
  )
}

export default SelectBackgroundImagesModal
