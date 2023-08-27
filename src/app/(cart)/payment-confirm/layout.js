import React from 'react'

export async function generateMetadata() {
    return {
      title: 'Thanh toán',
    }
  }

const layout = ({children}) => {
  return (
    <>{children}</>
  )
}

export default layout