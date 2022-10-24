import { ClassNamesArg } from '@emotion/react'
import react from 'react'


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
    className?: string,
    setBackground?: any
}



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

export const BackgroundImageIcon1 = ({className, setBackground}:Props) =>{
    return (
        <>
            <img  onClick={() => { setBackground(bg1) }} className={className} src="/images/BGRectangle1474.png" alt="Background1"/>
        </>
    )
}
export const BackgroundImageIcon2 = ({className, setBackground}:Props) =>{
    return (
        <>
            <img onClick={() => { setBackground(bg2) }} className={className} src="/images/BGRectangle1475.png" alt="Background1"/>
        </>
    )
}
export const BackgroundImageIcon3 = ({className, setBackground}:Props) =>{
    return (
        <>
            <img onClick={() => { setBackground(bg3) }} className={className} src="/images/BGRectangle1476.png" alt="Background1"/>
        </>
    )
}
export const BackgroundImageIcon4 = ({className, setBackground}:Props) =>{
    return (
        <>
            <img onClick={() => { setBackground(bg4) }} className={className} src="/images/BGRectangle1477.png" alt="Background1"/>
        </>
    )
}
export const BackgroundImageIcon5 = ({className, setBackground}:Props) =>{
    return (
        <>
            <img onClick={() => { setBackground(bg5) }} className={className} src="/images/BGRectangle1478.png" alt="Background1"/>
        </>
    )
}
export const BackgroundImageIcon6 = ({className, setBackground}:Props) =>{
    return (
        <>
            <img onClick={() => { setBackground(bg6) }} className={className} src="/images/BGRectangle1479.png" alt="Background1"/>
        </>
    )
}
