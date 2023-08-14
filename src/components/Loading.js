import Image from 'next/image'
import React from 'react'
import image from '../resources/images/Ellipsis-1s-200px.gif'

const Loading = () => {
    return (
        <div className='w-full h-screen flex items-start justify-center'>
            <Image src={image.src} alt='' width={100} height={100} />
        </div>
    )
}

export default Loading