"use client"
import productsApis from "@/apis/productApis";
import { ItemSlide } from "@/components";
import { GLOBAL_STATUS } from "@/constants";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const Search = () => {
    const [product, setProduct] = useState()
    const searchParams = useSearchParams()
    const search = searchParams.get('keyword')

const getData = useCallback( async() => {
    const params = {
        name: search,
        getMainImage: true,
        status: GLOBAL_STATUS.ACTIVE,
    };
    const data = await productsApis.getAllProductsClient(params);
    setProduct(data.rows)
}, [search])

  useEffect(() => {
    getData()
  }, [getData])
//   const { data } = product;
//   const { params } = product;
//   if (params === undefined) return params === ''

  if(!product) return null
  return (
    <>
      <h1 className="mt-20 mb-8 text-center text-4xl text-black">Tìm kiếm</h1>
      <p className="mt-4 text-center text-lg ">{`Kết quả tìm kiếm cho "${search}"`}</p>
      <div className="px-8 grid grid-cols-4 my-8 max-md:grid-cols-2 max-[576]:grid-cols-1 max-[576]:px-2">
        {product.length > 0 &&
          product.map((item) => {
            console.log('ítemmm', item)
            return (
              <ItemSlide
                key={item.id}
                propProduct={item}
              />
            );
          })}
      </div>
    </>
  );
};

// export async function getServerSideProps(content) {
//   const params = {
//     name: content.query.keyword,
//     getMainImage: true,
//     status: GLOBAL_STATUS.ACTIVE,
//   };
//   const data = await productsApis.getAllProducts(params);

//   return {
//     props: {
//       product: { data: data.data, params: content.query.keyword },
//     },
//   };
// }

export default Search;
