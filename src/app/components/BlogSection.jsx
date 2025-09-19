import Image from "next/image";

export default function BlogSection({ data }) {
  return (
    <section className="py-16 px-6 lg:px-20 bg-gray-100">
      <div className="max-w-7xl mx-auto text-left">
        {/* Badge */}
        <span className="inline-block bg-yellow-200 text-yellow-900 text-sm font-semibold px-4 py-1 rounded-full mb-4">
          {data.badge}
        </span>
        <div className="flex gap-12">
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
            {data.heading}
          </h2>

          {/* Description */}
          <p className="text-gray-900 mb-12 max-w-lg">{data.description}</p>
        </div>

        {/* Blog Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.posts?.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden text-left "
            >
              {/* Image */}
              <div className="relative w-full h-56 rounded overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover object-center p-3 rounded"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Title */}
                <h3 className="text-md font-semibold text-gray-900 mb-2">
                  {post.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-gray-600 mb-4">{post.description}</p>

                {/* Button */}
                <a
                  href={post.link}
                  className="inline-block border rounded-2xl px-3 py-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
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
