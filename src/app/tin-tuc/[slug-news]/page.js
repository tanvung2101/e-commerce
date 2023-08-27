import {Title } from '@/components';

export async function generateMetadata({ params, searchParams }, parent) {
    // read route params
    const slugNews = params['slug-news']
    // console.log('id',id)
    const res = await fetch(`${process.env.API}/news/getNewsBySlug/${slugNews}`)
    .then((res) => res.json());
    console.log('res',res)
   
    return {
      title: res.title,
      openGraph: {
        description: res.descriptionSEO,
      },
    }
  }

async function getData(context) {
    const res = await fetch(`${process.env.API}/news/getNewsBySlug/${context}`);
    return res.json()
}

const PageSlugNews = async ({ params }) => {
    const detailNews = await getData(params['slug-news'])
    // console.log(params['slug-news'], detailNews)
    return (
        <>
            <div className="bg-light-pink py-5 mb-4">
                <Title className="text-3xl font-bold">tin tức</Title>
            </div>
            <div className='py-16 px-28'>
                <h4 className='text-2xl'>{detailNews.title}</h4>
                <div className='text-base'>{detailNews.slug}</div>
            </div>
        </>
    )
}

export default PageSlugNews