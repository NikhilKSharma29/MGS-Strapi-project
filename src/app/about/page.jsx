import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { aboutSectionData } from '../data/aboutSection/about'
import AboutSection from '../components/about/AboutSection'
import AboutCta from '../components/about/AboutCta'
import { aboutCtaData } from '../data/aboutSection/aboutCta'
import { contactData } from '../data/aboutSection/contact'
import ContactSection from '../components/about/ContactSection'
import Footer from '../components/Footer'
import footerData from '../data/footerData'
import { getAboutPage } from '../lib/api'
import { STRAPI_URL } from '../lib/api'

const page = async() => {

    const aboutRes = await getAboutPage();

   
    return (
        <div>
            <div className="relative w-full h-[350px] flex items-center">
                {/* Background Image */}
                <Image
                    src={`${STRAPI_URL}${aboutRes.bannerImage?.url || ""}`} // Put your uploaded image in public/axs.png
                    alt="About Background"
                    layout="fill"
                    objectFit="cover"
                    className="absolute inset-0 -z-10"
                />

                {/* Overlay for dark effect */}

                {/* Content */}
                <div className="max-w-7xl px-12 text-white ">
                    <h1 className="text-4xl font-bold">{aboutRes.title}</h1>
                    <p className="mt-2 text-sm">
                        <Link href="/" className="hover:underline">Home</Link> {" > "} {aboutRes.title}
                    </p>
                </div>
            </div>
            <AboutSection data={aboutRes.whyChooseUs} />
            <AboutCta data={aboutCtaData} />
            <ContactSection data={{
              ...contactData,
              socials: [
                { name: "Facebook", href: "#", icon: "facebook" },
                { name: "Instagram", href: "#", icon: "instagram" },
                { name: "LinkedIn", href: "#", icon: "linkedin" },
                { name: "Pinterest", href: "#", icon: "pinterest" }
              ]
            }} />
            <Footer data={footerData} />
        </div>
    )
}

export default page