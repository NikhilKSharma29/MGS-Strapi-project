import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ProductGrid from '../components/products/Products-page'
import productsData from '../data/products'
import Footer from '../components/Footer'
import footerData from '../data/footerData'
import products from '../data/productsData/productsData'
import { getProductsList, getProductsPage } from '../lib/api'
import { STRAPI_URL } from '../lib/api'

const page = async() => {

  const pageRes = await getProductsPage();
  const productsRes = await getProductsList();
  return (
    <div>
         <div className="relative w-full h-[350px] flex items-center">
                {/* Background Image */}
                <Image
                    src={`${STRAPI_URL}${pageRes.banner}`} // Put your uploaded image in public/axs.png
                    alt="Products"
                    layout="fill"
                    objectFit="cover"
                    className="absolute inset-0 -z-10"
                />

                {/* Overlay for dark effect */}

                {/* Content */}
                <div className="max-w-7xl px-12 text-white ">
                    <h1 className="text-4xl font-bold">{pageRes.title}</h1>
                    <p className="mt-2 text-sm">
                        <Link href="/" className="hover:underline">Home</Link> {" > "} {pageRes.title}
                    </p>
                </div>
            </div>
            <ProductGrid data ={productsRes} pageRes={pageRes}  />
            <Footer data={footerData}/>

    </div>
  )
}

export default page