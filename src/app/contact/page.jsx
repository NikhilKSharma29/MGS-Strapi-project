import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ContactSection from '../components/contactus/form'
import { contactData } from '../data/contact-page/contact'
import footerData from '../data/footerData'
import Footer from '../components/Footer'
import Map from '../components/contactus/Map'
import { getContactInfo } from '../lib/api'
const page = async() => {
  const info = await getContactInfo();

  const data = {
    ...contactData, // keeps badge, title, description
    info: [
      { type: "Address", value: info.address },
      { type: "Email", value: info.email },
      { type: "Phone", value: info.phone },
    ],
    socials: [
      { name: "Facebook", href: "#", icon: "facebook" },
      { name: "Instagram", href: "#", icon: "instagram" },
      { name: "LinkedIn", href: "#", icon: "linkedin" },
      { name: "Pinterest", href: "#", icon: "pinterest" }
    ]
  };


  return (
    <div>
        <div className="relative w-full h-[350px] flex items-center">
                {/* Background Image */}
                <Image
                    src="/contact-page/Frame 8con.png" // Put your uploaded image in public/axs.png
                    alt="Contact"
                    layout="fill"
                    objectFit="cover"
                    className="absolute inset-0 -z-10"
                />

                {/* Overlay for dark effect */}

                {/* Content */}
                <div className="max-w-7xl px-12 text-white ">
                    <h1 className="text-4xl font-bold">Contact Us</h1>
                    <p className="mt-2 text-sm">
                        <Link href="/" className="hover:underline">Home</Link> {" > "} Contact Us
                    </p>
                </div>
            </div>
            <Map/>
            <ContactSection data={data} />
            <Footer data={footerData}/>

            
    </div>
  )
}

export default page