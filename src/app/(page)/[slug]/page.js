import configPageApis from '@/apis/configPageApis';
import pageData from '@/apis/pagesApi';
import { Title } from '@/components';
import React from 'react'


async function getData(pageCode) {
  const pageShow = pageData.getPageBySlug(pageCode);
  const data = await configPageApis.getListConfigPageContent({
    pageCode:pageShow.content
  });
  if (!data) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return data.data
}

const Page = async ({params }) => {
  const data = await getData(params.slug);
  const pageShow = pageData.getPageBySlug(params.slug);
  return (
    <div>
      <div className="bg-light-pink py-5">
        <Title className="uppercase">{pageShow.display}</Title>
      </div>
      <div className="px-24 my-10 text-base max-lg:px-10 max-sm:px-4">
        {data && data.map((item) =>(
          <div key={item.id} className="pages__content__text leading-8 font-sans" dangerouslySetInnerHTML={{ __html: item.content }}></div>
        ))}
      </div>
    </div>
  )
}

export default Page