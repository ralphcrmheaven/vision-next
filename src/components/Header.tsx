import React, { useState } from 'react'
import '../assets/styles/styles.css'
import FormInput, { InputTypes } from '../components/form/FormInput';
import { IUser, logoutUser, selectUser } from '../redux/features/userSlice'
import { SearchIcon, OnlineIcon, DownArrowIcon } from '../components/icons';
import { useDispatch, useSelector } from 'react-redux'
import { LogoutIcon } from '@heroicons/react/outline';

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
    const dispatch = useDispatch()

    const logout = () => {
        dispatch(logoutUser())
    }

    const user: IUser = useSelector(selectUser)

    const [opendDropdown, setOpenDropdown] = useState(false);

    const initials = user.given_name.substring(0, 1) + user.family_name.substring(0, 1)
    const fullname = user.given_name + ' ' + user.family_name
    return (
        <>
            <div className="flex flex-wrap-reverse">
                <div className="mt-5 sm:mt-5 md:mt-5 lg:mt-0">
                    <h1 className="text-4xl text-vision-blue font-bold">{header}</h1>
                    {
                        showSubHeader && (
                            <span className="text-xl italic text-slate-500">
                                See the world right in front of you
                            </span>
                        )
                    }

                </div>

                {initials && fullname && (
                    <div className="ml-auto">
                        <div className='flex gap-10'>
                            {
                                showSearchBar && (
                                    <div className="flex-row items-center space-x-4">
                                        <div className="relative w-full">
                                            <FormInput
                                                type={InputTypes.Text}
                                                name="email"
                                                className="w-80 px-5 py-3 rounded-xl bg-slate-200  pr-14"
                                                placeholder="Search Keywords"
                                                onChange={e => { }}
                                                required
                                            />
                                            <div className="flex absolute inset-y-0 right-4 items-center pointer-events-none">
                                                <span><SearchIcon /></span>
                                            </div>

                                        </div>
                                    </div>
                                )
                            }

                            {/* User Profile Info */}
                            
                            <div className="relative inline-block text-left">
                                <div onClick={() => setOpenDropdown(!opendDropdown)}>
                                    <div className="flex space-x-4 pt-3 text-vision-blue">
                                        <span className="flex-row items-center">
                                            <span className="p-3 text-white bg-gray-900 rounded-lg">
                                                {initials}
                                            </span>
                                            <span className='relative -left-2'>
                                                <OnlineIcon />
                                            </span>
                                        </span>
                                        <span className="flex-row items-center">
                                            {fullname}
                                        </span>
                                        <span className="pt-2 flex-row items-center cursor-pointer">
                                            <DownArrowIcon />
                                        </span>
                                    </div>
                                </div>
                                    {opendDropdown && (
                                        <div className="absolute border border-gray-400 rounded-2xl right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                                            <div className="py-1" role="none">
                                            <a href="#" onClick={logout} className="flex align-center text-gray-700 block px-4 py-2 text-sm bg-white hover:bg-gray-100" role="menuitem" id="menu-item-0">
                                                <LogoutIcon className="h-5 text-vision-light-blue" />
                                                <span className="ml-3">Logout</span>
                                            </a>
                                            {/* <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" id="menu-item-1">Support</a>
                                            <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" id="menu-item-2">License</a> */}
                                            
                                            </div>
                                        </div>
                                    )}
                               
                                </div>
                            
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
export default Header
