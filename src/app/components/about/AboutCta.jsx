import Link from "next/link";

export default function AboutCta({ data }) {

  
  return (
    <section className="relative py-20 bg-yellow-100 text-center">
      <div className="absolute inset-0 bg-[url('/pattern-fence.svg')] opacity-20" />

      <div className="relative max-w-3xl mx-auto px-6">
        {/* Badge */}
        <span className="inline-block px-5 py-1 mb-6 rounded-full bg-yellow-200 text-gray-700 font-medium text-sm">
          {data.badge}
        </span>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          {data.title}
        </h2>

        {/* Description */}
        <p className="mt-4 text-lg text-gray-700">
          {data.description}
        </p>

        {/* Button */}
        <div className="mt-8">
          <Link
            href={data.button.link}
            className="inline-block px-6 py-3 rounded-full bg-blue-900 text-white font-semibold hover:bg-blue-800 transition"
          >
            {data.button.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
