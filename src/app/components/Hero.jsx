import Image from "next/image";


export default function Hero({ data }) {
  return (
    <section className="relative text-white overflow-hidden">
     
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={data.backgroundImage}
          alt="Background"
          fill
          style={{ objectFit: "cover" }}
          className="opacity-100"
          priority
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#154D71]/100 via-[#154D71]/70 to-[#154D71]/20"></div>

      {/* Content */}
      <div className="relative container mx-auto px-6 lg:px-12 pt-32 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
        
        {/* Left Content */}
        <div className="max-w-xl">
          <span className="inline-block bg-black/40 text-yellow-200 px-4 py-1 rounded-full text-sm font-medium mb-4">
            {data.badge}
          </span>

          <h1 className="text-4xl text-white md:text-5xl font-bold leading-tight mb-6">
            {data.title}
          </h1>

          <p className="text-base md:text-lg text-gray-200 mb-8">
            {data.description}
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              
              className="px-6 py-3 bg-yellow-200 text-black font-semibold rounded-full shadow-md hover:bg-yellow-300 transition"
            >
              {data.primaryButton.text}
            </a>
            <a
            
              className="flex items-center gap-2 px-6 py-3 border border-yellow-200 text-yellow-200 rounded-full hover:bg-yellow-200 hover:text-black transition"
            >
              {data.secondaryButton.text}
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] top-12">
          <Image
            src={data.heroImage}
            alt="Hero"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
      </div>
    </section>
  );
}
