import React from 'react'
import '../assets/styles/styles.css'
import FormInput, { InputTypes } from '../components/form/FormInput';
import { IUser, selectUser } from '../redux/features/userSlice'
import { OnlineIcon, HomeIcon, MoreIcon } from '../components/icons';
import { useSelector } from 'react-redux'
import Logo from './Logo'
interface Props {
    showSearchBar?: boolean,
    showSubHeader?: boolean,
    header?: string,
}
const Header: React.FC<Props> = ({
    showSearchBar,
    showSubHeader,
    header
}) => {
    const user: IUser = useSelector(selectUser)

    const initials = user.given_name.substring(0, 1) + user.family_name.substring(0, 1)
    const fullname = user.given_name + ' ' + user.family_name
    return (
        <>
            <div className="flex w-full justify-between">
                <div className="flex justify-center h-[41px]">
                    <Logo />
                </div>
                <div className='flex flex-row gap-[26px]'>
                    <div className="flex flex-col items-center justify-between h-[41px]">
                        <HomeIcon />
                        <span className="text-[12px] text-[#053F64]">Home</span>
                    </div>
                    <div className="flex flex-col items-center justify-between h-[41px]">
                        <MoreIcon />
                        <span className="text-[12px] text-[#053F64]">More</span>
                    </div>
                </div>

                {initials && fullname && (
                    <div className="">
                        <div className='flex gap-10'>
                            {/* User Profile Info */}
                            <div className="flex space-x-4 pt-3">
                                <span className="flex-row items-center">
                                    <span className="p-3 text-white bg-gray-900 rounded-lg">
                                        {initials}
                                    </span>
                                    <span className='relative -left-2'>
                                        <OnlineIcon />
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
export default Header
