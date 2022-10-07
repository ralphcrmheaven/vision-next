import React, { useState } from 'react'
import { VInput, VLabel, VButton } from '../components/ui';
export default function Profile() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const onUpdateProfileClick = () => {
        console.log('firstName: ' + firstName)
        console.log('lastName: ' + lastName)
        console.log('email: ' + email)
        console.log('password: ' + password)
        console.log('confirmPassword: ' + confirmPassword)
    }
    return (

        <div className="">

            <div className='text-lg text-vision-blue font-semibold mb-10'>
                Your Profile
            </div>

            <div className='flex flex-col items-center h-full px-16'>

                <div className='pb-4'>
                    <span className="flex-col items-center">
                        <span className="p-4 text-white bg-gray-900 rounded-lg">
                            PC
                        </span>
                    </span>
                </div>

                <div className='font-medium text-[10px] underline text-[#747474] pb-5'>
                    Change profile photo
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
        </div>

    )
}