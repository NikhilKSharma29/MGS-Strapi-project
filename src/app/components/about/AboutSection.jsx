import Image from "next/image";
import { STRAPI_URL } from "@/app/lib/api";

export default function AboutSection({ data }) {

  if (!data) return null;
  return (
    <section className="relative  py-16 bg-[url('/grid-bg.svg')] bg-repeat">
      <div className="max-w-7xl mx-auto px-12 grid md:grid-cols-2 gap-6 items-center">

        {/* Left Content */}
        <div>
          <span className="inline-block px-4 py-1 rounded-full bg-yellow-200 text-sm font-medium mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-snug">
            {data.heading}
          </h2>
          {data.paragraphs?.map((para, index) => (
            <p key={index || para.id} className="mt-3 text-gray-700">
              {para.paragraphs}
            </p>
          ))}
        </div>

        {/* Right Images */}
        <div className="relative flex justify-center">
          <div className="relative flex flex-col md:flex-row items-center">

            {/* Top / Left Image */}
            <div className="">
              <Image
                src={`${STRAPI_URL}${data.image?.url || ""}`}
                alt={data.image?.alternativeText || ""}
                width={350}
                height={350}
                className="object-cover"
              />
            </div>

            {/* Bottom / Right Image */}


            {/* Center Icon */}

          </div>
        </div>



      </div>
    </section>
  );
}
