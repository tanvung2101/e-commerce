"use client"

import React from 'react'
import Slider from 'react-slick';

const SliderSlick = ({children, setting, ...props}) => {
  return (
    <Slider {...setting} {...props}>
        {children}
    </Slider>
  )
}

export default SliderSlick