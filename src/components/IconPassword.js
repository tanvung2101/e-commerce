import React from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

const IconPassword = ({ onClick = () => {}, hiddentPass = false }) => {
    return (
        <span
            className="absolute right-0 -translate-x-1/2 -translate-y-1/2 top-1/2 cursor-pointer"
            onClick={onClick}
        >
            {hiddentPass ? 
                <AiOutlineEye className="opacity-60"></AiOutlineEye>
            : 
                <AiOutlineEyeInvisible className="opacity-60"></AiOutlineEyeInvisible>
            }
        </span>
    )
}

export default IconPassword