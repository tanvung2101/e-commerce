import configPageApis from '@/apis/configPageApis';
import { Title } from '@/components';
import { CONTENT_PAGE } from '@/constants';
import Image from 'next/image';
import React from 'react'

export async function generateMetadata({ params, searchParams }, parent) {
  console.log('dgfsfgfh',params)
  return {
    title: 'Giới thiệu',
  }
}


async function getData(){
    const params = {
        pageCode: [
          CONTENT_PAGE.INTRODUCE_PAGE,
          CONTENT_PAGE.INTRODUCE_PAGE_CUSTOMER,
          CONTENT_PAGE.INTRODUCE_PAGE_STORY,
        ],
      };
      const data = configPageApis.getListConfigPageContent(params)
      if (!data) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
      }
     
      return data
}

const PageAboutUs = async () => {
    const content = await getData()
  return (
    <>
        <div className="bg-light-pink py-5 ">
        <Title className="text-3xl font-bold">giới thiệu</Title>
      </div>
      <div className="px-40 mt-10 max-md:px-16 max-lg:px-20 max-sm:px-4 max-sm:mt-0">
        <div className="flex justify-center gap-32 max-md:flex-col max-md:gap-8">
          <div className="mt-8">
            <h2 className="uppercase text-3xl font-bold max-md:mb-2 max-sm:text-2xl">
              giới thiệu về <span className="text-regal-red">sheshi</span>
            </h2>
            <span
              className="text-lg"
              dangerouslySetInnerHTML={{
                __html: content.data?.find(
                  (item) => item?.pageCode === CONTENT_PAGE.INTRODUCE_PAGE
                ).content,
              }}
            ></span>
          </div>
          <div className="pt-16 max-md:pt-2 max-lg:pt-16">
            {content.data && (
              <Image
                src={
                  content.data?.find(
                    (item) => item?.pageCode === CONTENT_PAGE.INTRODUCE_PAGE
                  ).image
                }
                alt=""
                width={2500}
                height={400}
              ></Image>
            )}
          </div>
        </div>
        <div className="flex flex-row-reverse justify-center gap-32 max-md:flex-col max-md:gap-8">
          <div className="mt-8">
            <h2 className="uppercase text-3xl font-bold max-md:mb-2 max-sm:text-2xl">
              giới thiệu về <span className="text-regal-red">sheshi</span>
            </h2>
            <span
              className="text-lg"
              dangerouslySetInnerHTML={{
                __html: content.data?.find(
                  (item) => item?.pageCode === CONTENT_PAGE.INTRODUCE_PAGE
                ).content,
              }}
            ></span>
          </div>
          <div className="pt-16 max-md:pt-2 max-lg:pt-16">
            {content.data && (
              <Image
                src={
                  content.data?.find(
                    (item) => item?.pageCode === CONTENT_PAGE.INTRODUCE_PAGE
                  ).image
                }
                alt=""
                width={2500}
                height={400}
              ></Image>
            )}
          </div>
        </div>
        <div className="flex justify-center gap-32 mt-10 mb-16 max-md:flex-col max-md:gap-8">
          <div className="mt-8">
            <h2 className="uppercase text-3xl font-bold">
              giới thiệu về <span className="text-regal-red">sheshi</span>
            </h2>
            <span
              className="text-lg"
              dangerouslySetInnerHTML={{
                __html: content.data?.find(
                  (item) => item?.pageCode === CONTENT_PAGE.INTRODUCE_PAGE
                ).content,
              }}
            ></span>
          </div>
          <div className="pt-16 max-md:pt-2 max-lg:pt-16">
            {content.data && (
              <Image
                src={
                  content.data?.find(
                    (item) => item?.pageCode === CONTENT_PAGE.INTRODUCE_PAGE
                  ).image
                }
                alt=""
                width={2500}
                height={400}
              ></Image>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default PageAboutUs