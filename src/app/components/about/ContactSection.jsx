"use client";

import { getContactInfo } from "@/app/lib/api";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function ContactSection({ data }) {
  const [contactInfo, setContactInfo] = useState({
    phone: '',
    email: '',
    address: '',
    loading: true,
    error: null
  });
  
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

  // Fetch contact info on component mount
  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const data = await getContactInfo();
        setContactInfo({
          ...data,
          loading: false,
          error: null
        });
      } catch (err) {
        console.error('Failed to fetch contact info:', err);
        setContactInfo(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to load contact information'
        }));
      }
    };

    fetchContactInfo();
  }, []);

  // Prepare contact info items for rendering
  const contactItems = [
    { 
      type: 'Phone',
      value: contactInfo.phone || '8602003719 / 9302105259',
      icon: '/footer/footer iconph.png'
    },
    { 
      type: 'Email',
      value: contactInfo.email || 'maagayatriststeelindore@gmail.com',
      icon: '/footer/footericonemail.png'
    },
    { 
      type: 'Address',
      value: contactInfo.address || '3-A, Sector E, Industrial Area, Sanwer Road, Indore (M.P.)',
      icon: '/footer/footericon3.png'
    },
  ];

 

  if (contactInfo.error) {
    return <div className="py-16 text-center text-red-500">{contactInfo.error}</div>;
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 px-6">
        {/* Left - Contact Info */}
        <div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            {data.title}
          </h2>
          <p className="text-gray-700 mt-2 mb-6">{data.description}</p>

          <ul className="space-y-6">
            {contactItems.map((item, index) => (
              <li key={index} className="flex items-start gap-4">
                <div className="mt-1">
                  <Image
                    src={item.icon}
                    alt={item.type}
                    width={24}
                    height={24}
                    className="w-12 h-12"
                  />
                </div>
                <div className="space-y-1">
                  <p className="font-semibold text-[#33A1E0]">{item.type}</p>
                  <p className="text-gray-700">{item.value}</p>
                </div>
              </li>
            ))}
          </ul>
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
