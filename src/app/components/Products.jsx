"use client";
import Image from "next/image";
import { useState } from "react";
import { STRAPI_URL } from "@/app/lib/api";

export default function Products({ data }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    product: "",
  });
  const handleGetQuote = (e) => {
    e.preventDefault();
    // Show modal instead of immediately submitting
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setFormData((prev) => ({
      ...prev,
      product: product.title,
    }));
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    handleCloseModal();
  };

  // Helper to safely get Strapi image URL
  const getImageUrl = (imageObj) => {
    if (!imageObj) return "/placeholder.png";
    // Check if the URL is already absolute
    if (imageObj.url && (imageObj.url.startsWith('http') || imageObj.url.startsWith('//'))) {
      return imageObj.url;
    }
    // For local development with Strapi
    return imageObj.url ? `${STRAPI_URL}${imageObj.url}` : "/placeholder.png";
  };

  return (
    <section className="py-16 px-6 lg:px-20 bg-blue-50">
      <div className="max-w-7xl mx-auto text-center">
        {/* Badge */}
        <span className="inline-block bg-yellow-200 text-yellow-900 text-sm font-semibold px-4 py-1 rounded-full mb-4">
          {data.badge}
        </span>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
          {data.heading}
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-12">{data.description}</p>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col text-left"
            >
              {/* Image */}
              <div className="relative w-full h-52">
                <Image
                  src={getImageUrl(item.image)}
                  alt={item.image?.alternativeText || item.title || 'Product image'}
                  fill
                  loading="lazy"
                  className="object-cover object-center rounded-2xl"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-md font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>

                {/* Specs */}
                <ul className="text-xs text-gray-600 flex-1 space-y-1 mb-4">
                  {item.specs && (
                    <li>
                      <strong>Specs:</strong> {item.specs}
                    </li>
                  )}
                  {item.bundle && (
                    <li>
                      <strong>Bundle:</strong> {item.bundle}
                    </li>
                  )}
                  {item.coating && (
                    <li>
                      <strong>Coating:</strong> {item.coating}
                    </li>
                  )}
                  {item.length && (
                    <li>
                      <strong>Length:</strong> {item.length}
                    </li>
                  )}
                  {item.height && (
                    <li>
                      <strong>Height:</strong> {item.height}
                    </li>
                  )}
                  {item.capacity && (
                    <li>
                      <strong>Capacity:</strong> {item.capacity}
                    </li>
                  )}
                  {item.packing && (
                    <li>
                      <strong>Packing:</strong> {item.packing}
                    </li>
                  )}
                  {item.coil && (
                    <li>
                      <strong>Coil:</strong> {item.coil}
                    </li>
                  )}
                  {item.application && (
                    <li>
                      <strong>Application:</strong> {item.application}
                    </li>
                  )}
                 
                </ul>

                {/* Button */}
                <button
                  onClick={() => handleOpenModal(item)}
                  className="mt-auto bg-yellow-200 hover:bg-yellow-300 text-gray-900 font-medium px-4 py-2 rounded-4xl transition"
                >
                  Request Quote →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Catalog Button */}
        <div className="mt-10">
          <a
           
            className="inline-block bg-yellow-200 hover:bg-yellow-400 text-gray-900 font-medium px-6 py-3 rounded-4xl shadow-md transition"
          >
            Download Catalog ↓
          </a>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-5xl w-full overflow-hidden flex flex-col">

            {/* Header Bar (Full Width) */}
            <div className="bg-[#1E4A68] text-white flex justify-between items-center px-6 py-3">
              <h3 className="text-base font-medium">Request a Quote</h3>
              <button onClick={handleCloseModal} className="hover:text-gray-200">
                ✕
              </button>
            </div>

            {/* Content Area */}
            <div className="flex flex-col md:flex-row">

              {/* Left Side Image */}
              <div className="md:w-[45%] relative">
                {selectedProduct && (
                  <Image
                    src={getImageUrl(selectedProduct.image)}
                    alt={
                      selectedProduct.image?.data?.attributes?.alternativeText ||
                      selectedProduct.title
                    }
                    width={600}
                    height={600}
                    loading="lazy"
                    className="object-cover h-full w-full rounded-2xl px-6 py-4 "
                  />
                )}
              </div>

              {/* Right Side Form */}
              <div className="md:w-[55%] p-6 md:p-8 overflow-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">Product Enquiry</h3>
                <p className="text-sm text-gray-500 mb-6">
                  Fill in your requirements and our team will get back with the best price.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Your Name*"
                      className="w-full px-4 py-2 bg-gray-100 rounded-md focus:ring-2 focus:ring-yellow-200 focus:border-yellow-300"
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Your Email*"
                      className="w-full px-4 py-2 bg-gray-100 rounded-md focus:ring-2 focus:ring-yellow-200 focus:border-yellow-300"
                    />
                  </div>

                  {/* Company + Product */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Company Name (optional)"
                      className="w-full px-4 py-2 bg-gray-100 rounded-md focus:ring-2 focus:ring-yellow-200 focus:border-yellow-300"
                    />
                    <select
                      name="product"
                      value={formData.product}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-100 rounded-md focus:ring-2 focus:ring-yellow-200 focus:border-yellow-300"
                    >
                      <option>Mild Steel Wire (HB / HHB / Annealed)</option>
                      <option>Galvanized Iron Chain Link Fence</option>
                      <option>Mild Steel Binding Wire</option>
                      <option>Galvanized Iron Barbed Wire</option>
                      <option>Galvanized Iron Wire</option>
                      <option>Wire Nails / Panel Pins</option>
                    </select>
                  </div>

                  {/* Quantity */}
                  <input
                    type="text"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    placeholder="Quantity Required"
                    className="w-full px-4 py-2 bg-gray-100 rounded-md focus:ring-2 focus:ring-yellow-200 focus:border-yellow-300"
                  />

                  {/* Message */}
                  <textarea
                    name="message"
                    rows="3"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Message*"
                    className="w-full px-4 py-2 bg-gray-100 rounded-md focus:ring-2 focus:ring-yellow-200 focus:border-yellow-300"
                  />

                  {/* Submit Button */}
                  <div className="pt-2 flex items-center justify-center">
                    <button
                    onClick={handleGetQuote}
                      type="submit"
                      className=" bg-yellow-200 hover:bg-yellow-300 text-gray-900 font-medium px-6 py-3 rounded-full shadow-md transition flex items-center justify-center w-fit"
                    >
                      Get My Quote →
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
 {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center ">
            <h2 className="text-xl font-bold mb-3">
              Wait! Don’t Leave Without Your Best Price
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              Get our latest price list & product catalog instantly and secure
              the best rates on steel wires & products.
            </p>

            <ul className="text-center text-sm text-gray-700 mb-4 space-y-1">
              <li>📄 Exclusive Discounts on Bulk Orders</li>
              <li>📦 Custom Packaging & Sizes Available</li>
              <li>🚚 On-Time Nationwide Delivery</li>
            </ul>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border px-3 py-2 rounded-full mb-3 focus:outline-none focus:ring"
            />

            <p className="text-xs text-green-600 mb-4">
              No spam. Only genuine offers and product updates.
            </p>

            <div className="flex justify-between">
              <button
                onClick={closeModal}
                className="px-6 py-2 border border-red-500 rounded-full text-red-500 font-medium hover:bg-gray-100"
              >
                Cancel
              </button>
              <button className="px-6 py-2 bg-yellow-200 rounded-full font-medium hover:bg-yellow-300">
                Send Me the Best Price →
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
