"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaPinterestP } from "react-icons/fa";

const icons = {
  phone: <Phone className="w-6 h-6 text-blue-500" />,
  mail: <Mail className="w-6 h-6 text-blue-500" />,
  "map-pin": <MapPin className="w-6 h-6 text-blue-500" />,
};

export default function ContactSection({ data }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    // TODO: send form to backend or API
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 px-6">
        {/* Left - Contact Info */}
        <div>
          <span className="inline-block px-4 py-1 mb-6 rounded-full bg-yellow-200 text-gray-900 font-medium text-sm">
            {data.badge}
          </span>

          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            {data.title}
          </h2>
          <p className="text-gray-700 mt-2 mb-6">{data.description}</p>

          <ul className="space-y-6">
            {data.info.map((item, index) => (
              <li key={index} className="flex items-start gap-4">
                <div>
                  <p className="text-gray-700">{item.value}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* Social Icons */}
          <div className="mt-8">

            <div className="flex gap-4">

              <div

                target="_blank"

                className="flex gap-4"

              >
                <a href={data.facebookLink}><FaFacebookF className="w-9 h-9 text-[#154D71] border border-[#154D71] rounded-full p-2 cursor-pointer" /></a>
                <a href={data.instagramLink}><FaInstagram className="w-9 h-9 text-[#154D71] border border-[#154D71] rounded-full p-2 cursor-pointer" /></a>
                <a href={data.linkedinLink}><FaLinkedinIn className="w-9 h-9 text-[#154D71] border border-[#154D71] rounded-full p-2 cursor-pointer" /></a>
                <a href={data.pintrestLink}><FaPinterestP className="w-9 h-9 text-[#154D71] border border-[#154D71] rounded-full p-2 cursor-pointer" /></a>
              </div>

            </div>
          </div>
        </div>

        {/* Right - Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#33A1E0]/10 rounded-2xl p-8 shadow-lg space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Your Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full border-none focus:outline-none bg-white px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">
                Your Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border-none focus:outline-none bg-white px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Enter your subject"
              className="w-full  border-none focus:outline-none bg-white px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Message<span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Enter message here..."
              rows="4"
              className="w-full border-none focus:outline-none bg-white px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="px-6 justify-center py-3 bg-yellow-200 text-gray-900 font-semibold rounded-full hover:bg-yellow-300 transition"
          >
            Submit →
          </button>
        </form>
      </div>
    </section>
  );
}
