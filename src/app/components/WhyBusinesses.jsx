import Image from "next/image";

export default function WhyBusinesses({ data }) {
  if (!data) {
    return <p className="text-red-500">No data available.</p>;
  }

  return (
    <section className="relative w-full bg-white">
      <div className="max-w-6xl mx-auto py-16 px-6">
        {/* Heading */}
        <div className="mb-12">
          <span className="inline-block px-4 py-1 mb-4 text-sm bg-yellow-200 rounded-full font-medium">
            Certified Quality & Trusted Partnerships
          </span>
          <h2 className="text-3xl font-bold">{data.title}</h2>
          <p className="text-gray-600 mt-2">{data.subtitle}</p>
        </div>

        {/* Sections */}
        <div className="grid md:grid-cols-3 gap-8">
          {data.sections.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl flex flex-col items-start overflow-hidden"
            >
              {item.image && (
                <div className="w-full mb-4">
                  <Image
                    src={item.image}
                    alt={item.heading}
                    width={400}
                    height={250}
                    className="rounded-2xl object-contain object-center w-full h-56"
                  />
                </div>
              )}
              <h3 className="text-lg font-semibold mb-3">{item.heading}</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                {item.points.map((point, i) => (
                  <li key={i}>✔ {point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
