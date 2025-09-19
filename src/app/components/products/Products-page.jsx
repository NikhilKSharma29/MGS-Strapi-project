// ProductGrid.jsx
"use client"
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { STRAPI_URL } from "../../lib/api";

const ProductGrid = ({data, pageRes}) => {
  const router = useRouter();
  return (
    <div className="bg-white py-12 px-6 md:px-16">
      <div className="text-left mb-12">
        <span className="text-blue-600 font-medium border rounded-full px-4 py-2">Our Products</span>
        <h2 className="text-4xl font-bold text-gray-900 mt-2">
        {pageRes.intro}
        </h2>
        <p className="text-gray-600 max-w-2xl  mt-4">
        Designed for construction, industrial, and commercial use, manufactured to meet strict ISO and IS standards with reliable nationwide and export supply.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 relative">
            <Image
             src={`${STRAPI_URL}${product.cover}`}
             alt={product.title}
             width={500}
             height={300}
             className="w-full h-full object-cover"
             priority={true}
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="p-5 absolute bottom-0 left-0 right-0">
              <h3 className="text-md font-semibold text-white font-bold">{product.title}</h3>
              <p className="text-gray-600 mt-2 text-sm text-white">{product.description}</p>
              <Link href={`/products/${product.slug}`}
                
               className="mt-4 justify-center inline-flex items-center px-4 py-2 bg-yellow-200 hover:bg-yellow-400 text-gray-900 text-sm font-medium rounded-2xl transition w-full">
                View More Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
