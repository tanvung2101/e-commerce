import HeaderUser from '@/components/HeaderUser'
import './globals.css'
import { Inter } from 'next/font/google'
import { Footer } from '@/components'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ReduxProvider } from '@/redux/provider';
import Init from '@/components/Init';
import "react-toastify/dist/ReactToastify.css";
import sheshicosmetic from '../../public/sheshicosmetic.jpg'
// import sheshicosmetic from '../../public/sheshicosmetic.jpg'
import logosheshe from '../../public/logosheshe.png'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CÔNG TY CỔ PHẦN TẬP ĐOÀN SHESHI',
    description: "SHESHI là thương hiệu mỹ phẩm cao cấp được xây dựng từ tâm huyết của những con người có kinh nghiệm lâu năm trong lĩnh vực làm đẹp và mỹ phẩm. Những sản phẩm tại SHESHI đều đã được trải qua nhiều công đoạn dày công nghiên cứu và phát triển để đem đến cho khách hàng những sản phẩm chất lượng tốt nhất.",
    image: sheshicosmetic.src,
    href: '../../public/logosheshe.png',
    openGraph: {
      images: [sheshicosmetic.src],
      href: [logosheshe.src]
    },
}



export default function RootLayout({ children }) {
  return (
      <html lang="en">
          <body id='next' >
            <ReduxProvider>
              <HeaderUser></HeaderUser>
                <Init>
                  {children}
                </Init>
              <Footer></Footer>
            </ReduxProvider>
          </body>
      </html>
  )
}
