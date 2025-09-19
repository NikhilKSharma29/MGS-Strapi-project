import Image from "next/image";

export default function Experience({ data }) {

  if (data.features) {
    console.log('Features with icons:', data.features.map(f => ({
      id: f.id,
      title: f.title,
      icon: f.icon
    })));
  }
  return (
    <section className="py-16 px-6 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div>
          {/* Badge */}
          <span className="inline-block bg-yellow-200 text-yellow-900 text-sm font-semibold px-4 py-1 rounded-full mb-4">
            {data.badge}
          </span>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            {data.heading}
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-8">{data.description}</p>

          {/* Features */}
          <div className="space-y-6">
            {data.features.map((feature) => (
              <div
                key={feature.id}
                className="flex items-center gap-4 items-center "
              >
                <div className="w-12 h-12 flex items-center justify-center">
                  <Image
                    src={feature.icon}
                    alt={feature.title || 'Feature icon'}
                    width={120}
                    height={120}
                    className="object-contain w-20 h-20"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#15496F]">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Image Grid */}
        <div className="flex justify-center items-center bg-white relative py-6 sm:py-32">
          <div className="grid grid-cols-2 gap-8 rotate-45 absolute">
            <div className="w-30 h-30 sm:w-50 sm:h-50 bg-gray-400/10 rounded-xl  translate-x-[30px] translate-y-[-65px]"></div>
            <div className="w-30 h-30 sm:w-50 sm:h-50 bg-gray-400/10 rounded-xl  translate-x-[30px] translate-y-[-65px]"></div>
            <div className="w-30 h-30 sm:w-50 sm:h-50 bg-gray-400/10 rounded-xl  translate-x-[30px] translate-y-[-65px]"></div>
            <div className="w-30 h-30 sm:w-50 sm:h-50 bg-gray-400/10 rounded-xl  translate-x-[30px] translate-y-[-65px]"></div>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-4 rotate-45 scale-75 sm:scale-100">
            {data.images.map((img, idx) => (
              <div key={idx} className="relative w-36 h-36 sm:w-40 sm:h-40">

                {/* Blue Shadow/Border */}
                <div className="absolute inset-0 bg-[#1C6EA4] rounded-xl rotate-0 translate-x-[6px] translate-y-[-6px] sm:translate-x-[8px] sm:translate-y-[-8px] -z-10" />

                {/* Image Layer */}
                <div className="relative w-full h-full overflow-hidden rounded-xl bg-white">
                  <div className="-rotate-45 w-full h-full scale-150 flex items-center justify-center">
                    <Image
                      src={img.url}
                      alt={`Image ${idx + 1}`}
                      fill
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
