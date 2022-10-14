import React from 'react'
import '../../assets/styles/styles.css'
import FormInput, { InputTypes } from '../form/FormInput';
import { IUser, selectUser } from '../../redux/features/userSlice'
import { OnlineIcon, HomeIcon, MoreIcon } from '../icons';
import { useSelector } from 'react-redux'
import { Menu, MenuItem } from '@aws-amplify/ui-react';
import Logo from '../Logo'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../redux/features/userSlice'
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
    const user: IUser = useSelector(selectUser)

    const initials = user.given_name.substring(0, 1) + user.family_name.substring(0, 1)
    const fullname = user.given_name + ' ' + user.family_name

    const logout = () => {
        dispatch(logoutUser())
    }
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
                    <div className="">
                        {/* <MoreIcon />
                        <span className="text-[12px] text-[#053F64]">More</span> */}
                        <Menu
                            trigger={
                                <span className='flex flex-col items-center justify-between h-[41px]'>
                                    <MoreIcon />
                                    <span className="text-[12px] text-[#053F64]">More</span>
                                </span>
                            }
                        >
                            <MenuItem>
                                <NavLink
                                    to="/login"
                                >
                                    <span className="text-sm">Home</span>
                                </NavLink>
                            </MenuItem>

                            <MenuItem>
                                <NavLink
                                    to="/contacts"
                                >
                                    <span className="text-sm">Contacts</span>
                                </NavLink>
                            </MenuItem>

                            <MenuItem>
                                <NavLink
                                    to="/schedule-meeting"
                                >
                                    <span className="text-sm">Meetings</span>
                                </NavLink>
                            </MenuItem>

                            <MenuItem>
                                <NavLink
                                    to="/settings"
                                >
                                    <span className="text-sm">Settings</span>
                                </NavLink>
                            </MenuItem>

                            <MenuItem>
                                <div
                                    onClick={logout}
                                >
                                    <span className="text-sm">Logout</span>
                                </div>
                            </MenuItem>
                        </Menu>
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
