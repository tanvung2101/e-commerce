import Image from 'next/image'
import { getCookie, getCookies } from 'cookies-next';
import configPageApis from '@/apis/configPageApis';
import { CONTENT_PAGE, GLOBAL_STATUS, SLIDE_PAGE } from '@/constants';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { CartSlide, ItemSlide, Title } from '@/components';
import Link from 'next/link';
import SliderSlick from '@/components/SliderSlick';
import feed1 from "../public/feed1.jpg";
import productsApis from '@/apis/productApis';
import { newsApisServer } from '@/apis/newApis';
// import { useRouter } from 'next/navigation';


const OUTSTANDING_PRODUCTS = 1;
async function getData() {
  const contents = await configPageApis.getListConfigPageContent({
    pageCode: [CONTENT_PAGE.SCHOOL_PAGE_OVERVIEW],
  });
  const images = await configPageApis.getListConfigPageSlide({
    pageCode: [
      SLIDE_PAGE.HOME_PAGE_ADVERTMENT,
      SLIDE_PAGE.HOME_PAGE_MAIN_PC,
      SLIDE_PAGE.HOME_PAGE_MAIN_SMARTPHONE,
    ],
  });
  const imagePc = images?.data?.filter(
    (image) => image.pageCode === SLIDE_PAGE.HOME_PAGE_MAIN_PC
  );
  const imageSmp = images?.data?.filter(
    (image) => image.pageCode === SLIDE_PAGE.HOME_PAGE_MAIN_SMARTPHONE
  );
  if (imageSmp.length !== imageSmp.length) return;
  const slideImageHome = imagePc.map((imgPc, i) => ({
    id: i,
    urlPc: imgPc.image,
    urlSmp: imageSmp[i].image,
  }));
  const slideImageAdvert = images?.data?.filter(
    (image) => image.pageCode === SLIDE_PAGE.HOME_PAGE_ADVERTMENT
  );
  const data = { contents: contents.data, slideImageHome, slideImageAdvert };
 
  if (!data) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return data
}
async function getDataNewProduct() {
  const params = {
    size: 5,
    getMainImage: true,
    status: GLOBAL_STATUS.ACTIVE,
  };

  const result = await productsApis.getAllProducts(params)
 
  if (!result) {
    throw new Error('Failed to fetch data')
  }
 
  return result.data.rows
}
async function getOutstandingProducts() {
  const params = {
    size: 5,
    outstanding: OUTSTANDING_PRODUCTS,
    getMainImage: true,
    status: GLOBAL_STATUS.ACTIVE,
  };
  // console.log(params)

  const result = await productsApis.getAllProducts(params)
 
  if (!result) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return result.data.rows
}

async function fetchGetNew() {
  const res  = await fetch(`${process.env.API}/news`, { next: { revalidate: 3600 } })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
      }

    return res .json()
}

export default async function Home() {
 const data = await getData()
 const { contents, slideImageHome, slideImageAdvert } = data;
 const product = await getOutstandingProducts()
 const productNew = await getDataNewProduct()
 console.log('productNew',productNew)
 const news = await fetchGetNew()

const SlickArrowLeft = () => (
  <div >
    <GrPrevious></GrPrevious>
  </div>
);
const SlickArrowRight = () => (
  <div >
    <GrNext></GrNext>
  </div>
);
const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  prevArrow: <SlickArrowLeft />,
  nextArrow: <SlickArrowRight />,
  responsive: [
    {
      breakpoint: 1198,
      settings: {
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        rows: 1,
        dots: false,
      },
    },
    {
      breakpoint: 576,
      settings: {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        rows: 1,
        dots: false,
      },
    },
  ],
};
const setting = {
  // dots: true,
  infinite: false,
  speed: 400,
  className: "cart-slide",
  slidesToShow: 3,
  slidesToScroll: 3,
  prevArrow: <SlickArrowLeft />,
  nextArrow: <SlickArrowRight />,
  responsive: [
    {
      breakpoint: 1198,
      settings: {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        rows: 1,
        dots: false,
      },
    },
    {
      breakpoint: 576,
      settings: {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        rows: 1,
        dots: false,
      },
    },
  ],
};
const settingsSlideImage = {
  dots: false,
  infinite: false,
  className: "slide-home",
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: <SlickArrowLeft className="slick-prev1" />,
  nextArrow: <SlickArrowRight />,
};
const settings_news = {
  infinite: true,
  speed: 500,
  className: "center",
  centerMode: true,
  centerPadding: "60px",
  slidesToShow: 3,
  slidesToScroll: 3,
  prevArrow: <SlickArrowLeft />,
  nextArrow: <SlickArrowRight />,
  responsive: [
    {
      breakpoint: 1198,
      settings: {
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        rows: 1,
        dots: false,
      },
    },
    {
      breakpoint: 576,
      settings: {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        rows: 1,
        dots: false,
      },
    },
  ],
};
const get_news = {
  dots: true,
  infinite: false,
  className: "get_news",
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  prevArrow: <SlickArrowLeft />,
  nextArrow: <SlickArrowRight />,
  responsive: [
    {
      breakpoint: 1198,
      settings: {
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        rows: 1,
        dots: false,
      },
    },
    {
      breakpoint: 576,
      settings: {
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        rows: 1,
        dots: false,
      },
    },
  ],
};
  return (
    <>
      <div className="mx-auto">
        <SliderSlick setting={settingsSlideImage}>
          {slideImageHome.map((item) => {
            return (
              <div key={item.id} className="bg-light-pink min-h-[400px] max-md:max-h-[650px]">
                {/* <div className="min-w-full h-[800px] max-md:h-full"> */}
                <Image
                  src={item?.urlPc || ""}
                  alt=""
                  width={500}
                  height={500}
                  // fill={true}
                  className="w-full object-cover"
                ></Image>
                {/* </div> */}
              </div>
            );
          })}
        </SliderSlick>
      </div>
      {/* SẢN PHẨM NỔI BẬT */}
      <div className="pt-16 pb-16 bg-light-pink ">
        <Title className="mb-5 max-md:mb-16">sản phẩm nổi bật</Title>
        <div className="my-10 px-14">
          <SliderSlick setting={settings}>
            {product?.length > 0 &&
              product?.map((item) => {
                // console.log('item',item)
                return (
                  <div key={item?.id}>
                    <ItemSlide propProduct={item}></ItemSlide>
                  </div>
                );
              })}
          </SliderSlick>
        </div>
        <Link
          href='/san-pham'
          className="block max-w-[100px] p-2 mx-auto rounded-lg bg-regal-red text-center text-light-pink"
        >
          xem thêm
        </Link>
      </div>
      {/* HỌC VIỆN ĐÀO TẠO SHESHI */}
      <div className="mt-14 mb-10 px-28 flex gap-10 max-lg:px-5 max-lg:flex-col max-lg:h-auto max-md:items-center max-md:h-auto max-sm:px-2">
        {contents.length > 0 &&
          contents.map((item) => {
            // console.log("item", item);
            return (
              <div className="max-w-[60%] max-sm:max-w-full" key={item.id}>
                <h3 className="mb-5 text-3xl font-bold uppercase text-regal-red max-lg:text-center max-sm:block">
                  học viện đào tạo sheshi
                </h3>
                <div
                  className="mb-5 font-sans text-lg font-normal max-lg:text-center"
                  dangerouslySetInnerHTML={{ __html: item?.content }}
                ></div>
                <Link
                  href="/hoc-vien-dao-tao-sheshi"
                  className="block text-lg font-bold uppercase text-regal-red hover:text-yellow-200 max-lg:text-center"
                >
                  Xem chi tiết
                </Link>
              </div>
            );
          })}
        <div className="w-[40%] max-h-[500px] mt-5 max-lg:w-[90%] mb-14 h-[300px] max-sm:max-w-full max-sm:mb-2">
          <iframe
            width="560"
            height="314"
            src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fsheshipharma%2Fvideos%2F709801732988589%2F&show_text=false&width=560&t=0"
            title="Học viện đào tạo Meta Group"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="h-full w-full block"
          ></iframe>
        </div>
      </div>
       {/* SHESHI CHUYỂN GIAO CÔNG NGHỆ CỦA TẬP ĐOÀN MỸ PHẨM ML.S HÀN QUỐC */}
       <div className="py-14 bg-light-pink">
        <Title className="text-3xl mb-14 max-lg:font-normal max-lg:text-xl max-lg:px-5">
          {/* {slideImageAdvert[0]?.title} */}
        </Title>
        <SliderSlick setting={settings_news}>
          {slideImageAdvert.map((item) => (
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
      </div>
      {/* SẢN PHẨM MỚI */}
      <div className="mt-10">
          <div>
              <h2 className="mb-5 text-2xl font-bold text-center uppercase text-regal-red">
                sản phẩm mới
              </h2>
              <div className="my-10 px-14">
                <div className="my-10 px-14">
                  <SliderSlick setting={settings}>
                    {productNew?.length > 0 &&
                      productNew?.map((item) => {
                              // console.log('item',item)
                        return (
                            <div key={item.id}>
                              <ItemSlide propProduct={item}></ItemSlide>
                            </div>
                      );
                    })}
                  </SliderSlick>
                </div>
              </div>
              <Link
                href='/san-pham'
                className="block max-w-[100px] p-2 mx-auto rounded-lg bg-regal-red text-center text-light-pink"
              >
                xem thêm
              </Link>
          </div>
          <section className="py-10 bg-[#fdf2ec] mt-16">
            <h3 className="uppercase text-center text-2xl text-regal-red">tin tức</h3>
            <div className="my-10 px-14">
              <div className="my-10">
                <SliderSlick setting={get_news}>
                  {news.rows.length > 0 && news.rows.map((item) => {
                    return (
                      <div key={item.id} >
                        <div className="w-[90%] flex flex-col items-center justify-center gap-3 px-6 pt-5 pb-8 rounded-xl border-[1px] border-slate-300 bg-white active:bg-red-400 max-sm:w-full">
                          <div className="w-full h-[250px] max-md:h-[150px]">
                            <Image
                              src={item.thumbnail}
                              alt={item.title}
                              width={200}
                              height={300}
                              className="w-full h-full object-cover rounded-t-lg"
                            />
                          </div>
                          <p className="text-center text-lg font-bold">{item.title}</p>
                          <p className="text-center font-medium">{item.description.length > 200 ? item.description.substring(0, 200) : item.description + "..."}</p>
                          <div className="w-28 mb-10">
                            <button className="px-3 py-2 bg-regal-red rounded-md text-white">
                              <Link href={`/tin-tuc/${item.slug}`}>Xem thêm</Link>
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </SliderSlick>
              </div>
            </div>
          </section>
          <div className="mt-20">
            <h2 className="mb-5 text-2xl font-bold text-center uppercase text-regal-red">
              cảm nhận khách hàng
            </h2>
            <p className="text-center w-[800px] max-sm:max-w-full mx-auto max-sm:text-center">
              Cảm nhận của khách hàng đã sử dụng sản phẩm và dịch vụ mỹ phẩm
              SHESHI. Bạn thì sao? Hãy cho chúng tôi biết cảm nhận của bạn về sản
              phẩm hoặc đến với chúng tôi để cảm nhận và trải nghiệm sản phẩm.
            </p>
          </div>
          <div className="mb-20">
            <SliderSlick setting={setting}>
              <CartSlide
                src={`${feed1.src}`}
                width={50}
                height={50}
                name="mrs.m lê thúy"
                comment="Cảm nhận của khách hàng đã sử dụng sản phẩm và dịch vụ mỹ phẩm
                    SHESHI. Bạn thì sao? Hãy cho chúng tôi biết cảm nhận của bạn
                    về sản phẩm hoặc đến với chúng tôi để cảm nhận và trải nghiệm
                    sản phẩm."
                face="facebook"
                className="hover:shadow-md"
              ></CartSlide>
              <CartSlide
                src={`${feed1.src}`}
                width={50}
                height={50}
                name="mrs.m lê thúy"
                comment="Cảm nhận của khách hàng đã sử dụng sản phẩm và dịch vụ mỹ phẩm
                    SHESHI. Bạn thì sao? Hãy cho chúng tôi biết cảm nhận của bạn
                    về sản phẩm hoặc đến với chúng tôi để cảm nhận và trải nghiệm
                    sản phẩm."
                face="facebook"
                className="hover:shadow-md"
              ></CartSlide>
              <CartSlide
                src={`${feed1?.src}`}
                width={50}
                height={50}
                name="mrs.m lê thúy"
                comment="Cảm nhận của khách hàng đã sử dụng sản phẩm và dịch vụ mỹ phẩm
                    SHESHI. Bạn thì sao? Hãy cho chúng tôi biết cảm nhận của bạn
                    về sản phẩm hoặc đến với chúng tôi để cảm nhận và trải nghiệm
                    sản phẩm."
                face="facebook"
                className="hover:shadow-md"
              ></CartSlide>
              <CartSlide
                src={`${feed1?.src}`}
                width={50}
                height={50}
                name="mrs.m lê thúy"
                comment="Cảm nhận của khách hàng đã sử dụng sản phẩm và dịch vụ mỹ phẩm
                    SHESHI. Bạn thì sao? Hãy cho chúng tôi biết cảm nhận của bạn
                    về sản phẩm hoặc đến với chúng tôi để cảm nhận và trải nghiệm
                    sản phẩm."
                face="facebook"
                className="hover:shadow-md"
              ></CartSlide>
              <CartSlide
                src={`${feed1?.src}`}
                width={50}
                height={50}
                name="mrs.m lê thúy"
                comment="Cảm nhận của khách hàng đã sử dụng sản phẩm và dịch vụ mỹ phẩm
                    SHESHI. Bạn thì sao? Hãy cho chúng tôi biết cảm nhận của bạn
                    về sản phẩm hoặc đến với chúng tôi để cảm nhận và trải nghiệm
                    sản phẩm."
                face="facebook"
                className="hover:shadow-md"
              ></CartSlide>
              <CartSlide
                src={`${feed1?.src}`}
                width={50}
                height={50}
                name="mrs.m lê thúy"
                comment="Cảm nhận của khách hàng đã sử dụng sản phẩm và dịch vụ mỹ phẩm
                    SHESHI. Bạn thì sao? Hãy cho chúng tôi biết cảm nhận của bạn
                    về sản phẩm hoặc đến với chúng tôi để cảm nhận và trải nghiệm
                    sản phẩm."
                face="facebook"
                className="hover:shadow-md"
              ></CartSlide>
              <CartSlide
                src={`${feed1?.src}`}
                width={50}
                height={50}
                name="mrs.m lê thúy"
                comment="Cảm nhận của khách hàng đã sử dụng sản phẩm và dịch vụ mỹ phẩm
                    SHESHI. Bạn thì sao? Hãy cho chúng tôi biết cảm nhận của bạn
                    về sản phẩm hoặc đến với chúng tôi để cảm nhận và trải nghiệm
                    sản phẩm."
                face="facebook"
                className="hover:shadow-md"
              ></CartSlide>
              <CartSlide
                src={`${feed1?.src}`}
                width={50}
                height={50}
                name="mrs.m lê thúy"
                comment="Cảm nhận của khách hàng đã sử dụng sản phẩm và dịch vụ mỹ phẩm
                    SHESHI. Bạn thì sao? Hãy cho chúng tôi biết cảm nhận của bạn
                    về sản phẩm hoặc đến với chúng tôi để cảm nhận và trải nghiệm
                    sản phẩm."
                face="facebook"
                className="hover:shadow-md"
              ></CartSlide>
            </SliderSlick>
          </div>
      </div>
    </>
  )
}
