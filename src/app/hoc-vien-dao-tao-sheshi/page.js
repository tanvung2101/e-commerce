import configPageApis from '@/apis/configPageApis';
import { Title } from '@/components';
import SliderSlick from '@/components/SliderSlick';
import { CONTENT_PAGE, SLIDE_PAGE } from '@/constants';
import Image from 'next/image';
import React from 'react'
import { GrNext, GrPrevious } from 'react-icons/gr';


export async function getData() {
    const contents = await configPageApis.getListConfigPageContent({
      pageCode: [
        CONTENT_PAGE.SCHOOL_PAGE_OVERVIEW,
        CONTENT_PAGE.SCHOOL_PAGE_PROCESS,
      ],
    });
    const images = await configPageApis.getListConfigPageSlide({
      pageCode: [SLIDE_PAGE.SCHOOL_PAGE],
    });
    const data = { contents: contents.data, images: images.data };
  
    return data
  }

const Academy = async () => {
    const data = await getData()
    const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
        <div {...props}>
          <GrPrevious></GrPrevious>
        </div>
      );
      const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
        <div {...props}>
          <GrNext></GrNext>
        </div>
      );
      const settings_gal = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        prevArrow: <SlickArrowLeft />,
        nextArrow: <SlickArrowRight />,
        className: "center",
        centerMode: true,
        responsive: [
          {
            breakpoint: 1198,
            settings: {
              infinite: true,
              slidesToShow: 3,
              slidesToScroll: 3,
              rows: 1,
            },
          },
          {
            breakpoint: 576,
            settings: {
              infinite: true,
              slidesToShow: 1,
              slidesToScroll: 1,
              rows: 1,
            },
          },
        ],
      };
    console.log(data)
  return (
    <>
        <div className="bg-light-pink py-5">
        <Title className="text-4xl font-bold max-sm:text-2xl max-sm:px-8">
          học viện đào tạo thẩm mĩ sheshi
        </Title>
      </div>
      <section className="mt-14 mb-14 max-sm:mt-6">
        <div className="mx-32 flex items-center gap-20 mb-16 max-lg:gap-5 max-lg:mx-0 max-lg:px-1 max-lg:flex-col">
          <div className="w-full flex-col items-center px-10 max-lg:items-start max-lg:px-0">
            <div className="mb-5 ">
              <span className="text-lg font-medium">Học viện Đào tạo</span>
              <h2 className="text-5xl font-bold mb-3">Đào tạo thẩm mĩ </h2>
              <strong className="uppercase text-5xl text-regal-red font-bold">
                sheshi
              </strong>
            </div>
            <div
              className="text-lg font-sans leading-8 mb-10 max-sm:mb-2"
              dangerouslySetInnerHTML={{
                __html: data.contents.find(
                  (content) =>
                    content.pageCode === CONTENT_PAGE.SCHOOL_PAGE_OVERVIEW
                ).content,
              }}
            ></div>
            <div className="max-h-[700px] max-lg:h-[500px] max-lg:mt-5 max-sm:h-[200px]">
              <Image
                src={data.contents.find(
                  (content) =>
                    content.pageCode === CONTENT_PAGE.SCHOOL_PAGE_OVERVIEW
                ).image || ''}
                alt=""
                width={300}
                height={500}
                className="w-full h-full object-cover"
              ></Image>
            </div>
          </div>
          <div className="w-full flex flex-col items-center px-10 max-lg:mb-5 max-lg:px-1 max-lg:flex-col-reverse max-sm:mb-0">
            <div className="h-[700px] mt-10 max-lg:h-[500px] max-lg:mt-5 max-sm:h-[200px]">
              <Image
                src={data.contents.find(
                  (content) =>
                    content.pageCode === CONTENT_PAGE.SCHOOL_PAGE_PROCESS
                ).image || ''}
                alt=""
                width={500}
                height={500}
                className="w-full h-full object-cover max-lg:h-[500px] max-sm:h-[200px]"
              ></Image>
            </div>
            <div
              className="text-lg font-sans leading-8 mt-8 max-lg:mt-2"
              dangerouslySetInnerHTML={{
                __html: data.contents.find(
                  (content) =>
                    content.pageCode === CONTENT_PAGE.SCHOOL_PAGE_PROCESS
                ).content,
              }}
            ></div>
          </div>
        </div>
        <SliderSlick setting={settings_gal}>
          {data.images.map((item) => (
            <div key={item.id} className="">
              <Image
                src={item?.image || ""}
                alt=""
                width={400}
                height={300}
              // className="w-[80%] h-[80%] object-cover"
              ></Image>
            </div>
          ))}
        </SliderSlick>
      </section>
    </>
  )
}

export default Academy