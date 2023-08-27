import React from 'react'


export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const id = params.slug
  console.log('id', id)
  const product = await fetch(`${process.env.API}/product/get-by-slug/?productSlug=${id}`).then((res) => res.json())
  // console.log('product',product)
  const image = []
  const productImage = product.productImage.map((item) => image.push(item.image))
 
  return {
    title: product.name,
    openGraph: {
      images: [...image],
      description: product.description,

    },
    icons: {
      icon: product.productImage[0]?.image,
    },
  }
}
 

const LayoutProductDetail = ({children}) => {
  return (
    <>{children}</>
  )
}

export default LayoutProductDetail