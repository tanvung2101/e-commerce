import { newsApisServer } from '@/apis/newApis'
import { Button, Title } from '@/components'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

async function getData(){
    const res  = await fetch(`${process.env.API}/news`)

    if (!res.ok) {
        throw new Error('Failed to fetch data')
      }

    return res .json()
}

const PageNews = async () => {
    const data = await getData()
  return (
    <>
        <div className="bg-light-pink py-5 mb-4">
            <Title className="text-3xl font-bold">tin tức</Title>
        </div>
        <div className="grid grid-cols-3 gap-y-8 mb-4 px-24 max-lg:grid-cols-2 max-lg:pr-10 max-md:grid-cols-1 max-sm:p-0">
            {data.rows.length > 0 && data.rows.map((item) => {
                return (
                    <div key={item.id} className="w-96 flex flex-col items-center justify-center gap-3 px-4 rounded-lg border-[1px] border-slate-300 max-sm:w-full">
                    <div className="w-full h-[350px] max-sm:h-[150px]">
                        <Image
                        src={item.thumbnail}
                        alt={item.title}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover rounded-t-lg"
                        />
                    </div>
                    <p>{item.title}</p>
                    <p>{item.description.length > 200 ? item.description.substring(0, 200) : item.description + "..."}</p>
                    <div className="w-28 mb-4">
                        <Button>
                        <Link href={`/tin-tuc/${item.slug}`}>Xem thêm</Link>
                        </Button>
                    </div>
                    </div>
                )
            })}
        </div>
    </>
  )
}

export default PageNews