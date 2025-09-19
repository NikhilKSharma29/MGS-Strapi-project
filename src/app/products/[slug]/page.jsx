import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/app/components/Footer";
import footerData from "@/app/data/footerData";
import { getProductBySlug, getProductsList } from "@/app/lib/api";
import { STRAPI_URL } from "@/app/lib/api";

export default async function ProductDetails({ params }) {
  const productSlug = await getProductBySlug(params.slug);
  const productlist = await getProductsList();
  
  if (!productSlug) return notFound();

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative w-full h-[250px] md:h-[350px] flex items-center">
        <Image
          src={`${STRAPI_URL}${productSlug.cover}`}
          alt={productSlug.title}
          fill
          className="absolute inset-0 -z-10 object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#154D71]/100 via-[#154D71]/70 to-[#154D71]/20 -z-10"></div>

        <div className="max-w-7xl px-4 md:px-12 text-white w-full">
          <h1 className="text-2xl md:text-4xl font-bold">{productSlug.title}</h1>
          <p className="mt-2 text-xs md:text-sm">
            <Link href="/" className="hover:underline">Home</Link> {" > "} 
            <Link href="/products" className="hover:underline">Products</Link> {" > "} 
            <span className="text-yellow-300">{productSlug.title}</span>
          </p>
        </div>
      </div>

      {/* Section 1 - Dynamic from API */}
      {productSlug.section1 && productSlug.section1.map((section, index) => (
        <section key={index} className="max-w-7xl mx-auto px-4 md:px-12 lg:px-24 py-8 md:py-12">
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Left Content */}
            <div className="flex-1 space-y-6 text-center md:text-left">
              <span className="inline-block border border-sky-900 text-sky-900 px-4 py-1 rounded-full text-sm font-semibold">
                Why Choose Our {productSlug.title}?
              </span>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                {section.heading}
              </h2>

              <p className="text-gray-600 leading-relaxed max-w-md mx-auto md:mx-0">
                {section.description}
              </p>

              {section.keyfeature && section.keyfeature.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold mb-2">Key Features:</h2>
                  <ul className="list-disc list-inside text-gray-600 text-sm">
                    {section.keyfeature.map((feature, featureIndex) => (
                      <li key={featureIndex}>{feature.points}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Right Image */}
            <div className="flex-1">
              {section.image && (
                <Image
                  src={`${STRAPI_URL}${section.image.url}`}
                  alt={section.image.alternativeText || section.heading}
                  width={600}
                  height={400}
                  className="rounded-2xl object-cover w-full h-auto shadow-lg"
                />
              )}
            </div>
          </div>
        </section>
      ))}

      {/* Section 2 - Technical Specifications (Dynamic) */}
      {productSlug.techspec && productSlug.techspec.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 md:px-12 lg:px-24 py-8 md:py-12">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Technical Specifications</h1>
          <div className="overflow-x-auto -mx-4 md:mx-0">
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden text-sm md:text-base">
              {/* Header */}
              <thead>
                <tr className="bg-[#33A1E0]/10 text-black">
                  <th className="px-6 py-3 text-left font-semibold w-1/2">
                    Specification
                  </th>
                  <th className="px-6 py-3 text-left font-semibold w-1/2">
                    Details
                  </th>
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {productSlug.techspec.map((spec, index) => (
                  <tr
                    key={index}
                    className="even:bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <td className="px-6 py-4 text-gray-900">{spec.Specification}</td>
                    <td className="px-6 py-4 text-gray-700">{spec.Details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Section 3 - Applications (Dynamic) */}
      {productSlug.applications && productSlug.applications.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 md:px-12 lg:px-24 py-12 md:py-16">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">Applications</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-2 sm:px-0">
              {productSlug.applications.map((item, index) => (
                <div
                  key={index}
                  className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Image */}
                  <div className="aspect-w-16 aspect-h-9 w-full">
                    <Image
                      src={`${STRAPI_URL}${item.image.url}`}
                      alt={item.image.alternativeText || item.title}
                      width={500}
                      height={350}
                      className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Gradient + Caption */}
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4">
                    <h3 className="text-white font-semibold text-sm sm:text-base md:text-lg">
                      {item.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section 4 - Packaging & Customization (Dynamic) */}
      {productSlug.PackagingCustomization && productSlug.PackagingCustomization.length > 0 && (
        <div className="flex flex-col gap-4 max-w-7xl mx-auto px-4 md:px-12 lg:px-24 py-8 md:py-10">
          <h1 className="text-2xl md:text-3xl text-center sm:text-left font-bold">Packaging & Customization</h1>
          
          {productSlug.PackagingCustomization.map((pkg, pkgIndex) => (
            <div key={pkgIndex}>
              <p className="text-gray-600 text-center sm:text-left mx-auto md:mx-0 mb-6">
                {pkg.descriptionhead}
              </p>
              
              {pkg.itemlist && pkg.itemlist.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pkg.itemlist.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className="relative rounded-2xl overflow-hidden shadow-lg"
                    >
                      {/* If you have images for itemlist, add them here */}
                      {option.image && (
                        <Image
                          src={`${STRAPI_URL}${option.image.url}`}
                          alt={option.image.alternativeText || option.imagetext}
                          width={600}
                          height={400}
                          className="w-full h-full object-cover"
                        />
                      )}

                      {/* Text overlay */}
                      <div className={`${option.image ? 'absolute bottom-0' : 'relative'} w-full p-4 ${option.image ? 'bg-gradient-to-t from-black/80 via-black/50 to-transparent' : 'bg-gray-100'}`}>
                        <p className={`${option.image ? 'text-white' : 'text-gray-800'} text-lg font-medium`}>
                          {option.imagetext}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Section 5 - CTA (Static) */}
      <div className="max-w-7xl py-8 md:py-16 px-4 md:px-12 lg:px-24">
        <div className="bg-[#FFF9C4] rounded-3xl py-12 md:py-16 px-6 md:px-12 lg:px-24 mx-auto text-center relative overflow-hidden h-auto min-h-[300px] md:h-[350px] flex items-center justify-center">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10 bg-[url('/images/pattern.png')] bg-repeat"></div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-6">
            {/* Small top button */}
            <button className="px-6 py-2 border border-[#d4c800] rounded-full text-sm font-medium text-[#444] bg-white/60 hover:bg-white transition">
              Enquire Now
            </button>

            {/* Main heading */}
            <h2 className="text-3xl md:text-4xl font-bold text-black">
              Ready to Place Your Order?
            </h2>

            {/* Subtitle */}
            <p className="text-lg text-gray-700">
              Get high-quality {productSlug.title.toLowerCase()} tailored to your industrial needs.
            </p>

            {/* Main CTA button */}
            <button className="mt-4 px-6 py-3 bg-[#1a4c66] text-white font-medium rounded-full shadow-md hover:bg-[#163d52] transition flex items-center gap-2">
              Request A Quote →
            </button>
          </div>
        </div>
      </div>

      {/* Section 6 - Related Products (Dynamic) */}
      <section className="max-w-7xl mx-auto px-4 md:px-12 lg:px-24 py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Related Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productlist.slice(0, 3).map((product) => (
            <div key={product.id} className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 relative">
              <Image
                src={`${STRAPI_URL}${product.cover}`}
                alt={product.title}
                width={500}
                height={300}
                className="w-full h-full object-cover"
                priority={false}
              />
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <div className="p-5 absolute bottom-0 left-0 right-0">
                <h3 className="text-md font-semibold text-white font-bold">{product.title}</h3>
                <p className="text-gray-600 mt-2 text-sm text-white">{product.description}</p>
                <Link 
                  href={`/products/${product.slug}`}
                  className="mt-4 justify-center inline-flex items-center px-4 py-2 bg-yellow-200 hover:bg-yellow-400 text-gray-900 text-sm font-medium rounded-2xl transition w-full">
                  View More Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <Footer data={footerData} />
    </div>
  );
}