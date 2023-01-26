import React, { useRef, useState } from 'react'
import { VInput, VLabel, VButton } from '../components/ui';
import CustomModal from './modals/CustomModal';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";


const dataUrlToFile = (url: string, fileName: string) => {
    const [mediaType, data] = url.split(",");
  
    const mime = mediaType.match(/:(.*?);/)?.[0];
  
    var n = data.length;
  
    const arr = new Uint8Array(n);
  
    while (n--) {
      arr[n] = data.charCodeAt(n);
    }
  
    return new File([arr], fileName, { type: mime });
  };

export default function Profile() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [openModal, setOpenModal] = useState(false)

    const [profileImage, setProfileImage] = useState('')
    const [profilePhoto, setProfilePhoto] = useState<any>()

    const [cropper, setCropper] = useState<any>();

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const onUpdateProfileClick = () => {
        console.log('firstName: ' + firstName)
        console.log('lastName: ' + lastName)
        console.log('email: ' + email)
        console.log('password: ' + password)
        console.log('confirmPassword: ' + confirmPassword)
    }

    const onChangeFile = (e: any) => {
        e.preventDefault();

        let files;
        if (e.dataTransfer) {
          files = e.dataTransfer.files;
        } else if (e.target) {
          files = e.target.files;
        }

        setProfilePhoto(files[0]);

        const reader = new FileReader();
        reader.onload = () => {
            setProfileImage(reader.result as any);
        };
        reader.readAsDataURL(files[0]);

        setOpenModal(true)
    }

    const getCropData = () => {
        if (typeof cropper !== "undefined") {
            const imageUrl = cropper.getCroppedCanvas().toDataURL();
            const file = dataUrlToFile(imageUrl, "profile.png")
            setProfilePhoto(file)
            setProfileImage(imageUrl);
            setOpenModal(false);
        }
    };

    return (

        <div className="">

            {/* <div className='text-lg font-semibold mb-10'>
                Your Profile
            </div> */}

            <div className='flex flex-col items-center h-full px-0 sm:px-0 md:px-16 lg:px-48'>

                <div className="flex flex-col items-center">
                    <div className='pb-4'>
                        <span className="flex-col items-center">
                            {!profileImage ? (
                                <label htmlFor="profile" className="flex justify-center items-center w-16 h-16 text-white bg-gray-900 rounded-lg">
                                 PC
                                </label>
                            ) : (
                                <label htmlFor="profile">
                                    <img className='flex justify-center items-center w-16 h-16 rounded-lg' src={profileImage} alt="" />
                                </label>
                                
                            )} 
                        </span>
                    </div>

                    <label htmlFor="profile" className='font-medium text-[10px] underline text-[#747474] pb-5'>
                        Change profile photo
                    </label>

                    <input type="file" onChange={onChangeFile} id='profile' name='profile' className="hidden" />
                </div>

                <div className='flex flex-row justify-center gap-2 w-full'>

                    <div className='w-1/2'>
                        <div className="mb-4">
                            <VLabel htmlFor="firstname" className="mb-1 text-xs text-[#747474] font-medium">FIRST NAME</VLabel>
                            <VInput className="bg-[#ECECEC] border-[#E0E0E0]" id="firstname" value={firstName} onChange={(e: any) => setFirstName(e.target.value)} />
                        </div>
                    </div>

                    <div className='w-1/2'>
                        <div className="mb-5">
                            <VLabel htmlFor="lastname" className="mb-1 text-xs text-[#747474] font-medium">LAST NAME</VLabel>
                            <VInput className="bg-[#ECECEC] border-[#E0E0E0]" id="lastname" value={lastName} onChange={(e: any) => setLastName(e.target.value)} />
                        </div>
                    </div>

                </div>

                <div className='w-full'>
                    <div className="mb-5 ">
                        <VLabel htmlFor="email" className="mb-1 text-xs text-[#747474] font-medium">EMAIL</VLabel>
                        <VInput className="bg-[#ECECEC] border-[#E0E0E0]" id="email" value={email} onChange={(e: any) => setEmail(e.target.value)} />
                    </div>
                </div>

                <div className='w-full'>
                    <div className="mb-5 ">
                        <VLabel htmlFor="email" className="mb-1 text-xs text-[#747474] font-medium">PASSWORD</VLabel>
                        <VInput className="bg-[#ECECEC] border-[#E0E0E0]" type="password" id="email" value={password} onChange={(e: any) => setPassword(e.target.value)} />
                    </div>
                </div>

                <div className='w-full'>
                    <div className="mb-5 ">
                        <VLabel htmlFor="email" className="mb-1 text-xs text-[#747474] font-medium">CONFIRM PASSWORD</VLabel>
                        <VInput className="bg-[#ECECEC] border-[#E0E0E0]" type="password" id="email" value={confirmPassword} onChange={(e: any) => setConfirmPassword(e.target.value)} />
                    </div>
                </div>

                <div className='w-full'>
                    <div className="mb-5 ">
                        <VButton
                            className='w-100'
                            // isLoading={isLoading}
                            // loadingText={loadingText}
                            onClick={(e: any) => onUpdateProfileClick()}
                        >
                            Update Profile
                        </VButton>
                    </div>
                </div>
            </div>


            <CustomModal open={openModal} closeModal={() => setOpenModal(false)}>
                <div className='mt-8'>
                        <div>
                            <Cropper
                                src={profileImage}
                                zoomTo={0.5}
                                initialAspectRatio={1}
                                preview=".img-preview"
                                viewMode={1}
                                minCropBoxHeight={10}
                                minCropBoxWidth={10}
                                background={false}
                                responsive={true}
                                autoCropArea={1}
                                checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                                onInitialized={(instance) => {
                                    setCropper(instance);
                                }}
                                guides={true}
                            />
                            <button className="w-100  v-ui-button mt-5" onClick={getCropData}>Crop Image</button>
                        </div>
                   
                    
                    
                </div>
  
            </CustomModal>
  
        </div>

    )
}