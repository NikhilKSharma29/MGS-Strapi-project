import Image from "next/image";

export default function CaseStudies({ data }) {
    return (
        <section className="py-16 px-6 lg:px-20 bg-white  relative ">
  <div className="absolute inset-0">
    <div className="h-1/2 bg-blue-50"></div>
    <div className="h-1/2 bg-transparent"></div>
  </div>


            <div className="relative max-w-7xl mx-auto text-center text-white">
                {/* Badge */}

                <div className="flex flex-col items-start">
                    <span className="inline-block bg-yellow-200 text-yellow-900 text-sm font-semibold px-4 py-1 rounded-full mb-4">
                        {data.badge}
                    </span>

                    {/* Heading */}
                    <h2 className="text-3xl md:text-4xl text-black text-left font-extrabold mb-3">
                        {data.heading}
                    </h2>

                    {/* Description */}
                    <p className="text-black mb-12 text-left">{data.description}</p>
                </div>
                {/* Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.items.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
                        >
                            {/* Image */}
                            <div className="relative w-full h-56 rounded-2xl overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover rounded-2xl p-3"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-3 text-left flex-1 flex flex-col">
                                {/* Category */}
                                <span
                                    className={`w-fit bg-yellow-200 text-yellow-900 text-xs font-semibold px-3 py-1 rounded-full mb-2 `}
                                >
                                    {item.category}
                                </span>

                                {/* Title */}
                                <h3 className="text-md font-semibold text-gray-900 mb-2">
                                    {item.title}
                                </h3>

                                {/* Challenge */}
                                <p className="text-xs text-red-600 mb-1">
                                    <strong>Challenge:</strong> <span className="text-gray-600">{item.challenge}</span>
                                </p>

                                {/* Solution */}
                                <p className="text-xs text-green-600 mb-3">
                                    <strong>Solution:</strong> <span className="text-gray-600">{item.solution}</span>
                                </p>

                                {/* Button */}
                                <a
                                    href={item.link}
                                    className="mt-auto inline-block text-blue-600 hover:text-blue-800 text-sm font-medium border w-fit rounded-2xl px-3 py-1"
                                >
                                    Read more →
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
