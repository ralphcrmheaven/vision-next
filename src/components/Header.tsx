import React from 'react'
import FormInput, { InputTypes } from '../components/form/FormInput';
import { IUser, selectUser } from '../redux/features/userSlice'
import { SearchIcon, OnlineIcon, DownArrowIcon } from '../components/icons';
import { useSelector } from 'react-redux'
interface Props {
    showSearchBar?: boolean
}
const Header: React.FC<Props> = ({
    showSearchBar
}) => {
    const user: IUser = useSelector(selectUser)

    const initials = user.given_name.substring(0, 1) + user.family_name.substring(0, 1)
    const fullname = user.given_name + ' ' + user.family_name
    return (
        <>
            <div className="flex">
                <div className="">
                    <h1 className="text-4xl text-vision-blue">Welcome to Vision</h1>
                    <span className="text-xl italic text-slate-500">
                        See the world right in front of you
                    </span>
                </div>

                {initials && fullname && (
                    <div className="ml-auto">
                        <div className='flex gap-10'>
                            <div className="flex-row items-center space-x-4">
                                <div className="relative w-full">
                                    <FormInput
                                        type={InputTypes.Text}
                                        name="email"
                                        className="w-full px-5 py-3 rounded-xl bg-slate-200  pr-44"
                                        placeholder="Search Keywords"
                                        onChange={e => { }}
                                        required
                                    />
                                    <div className="flex absolute inset-y-0 right-4 items-center pointer-events-none">
                                        <span><SearchIcon /></span>
                                    </div>

                                </div>
                            </div>
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
                                <span className="flex-row items-center">
                                    {fullname}
                                </span>
                                <span className="pt-2 flex-row items-center cursor-pointer">
                                    <DownArrowIcon />
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