import Image from "next/image";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaPinterestP } from "react-icons/fa";
import { getContactInfo } from "../lib/api";

export default async function Footer({ data }) {
  // Fetch contact info on the server
  let contactInfo;
  try {
    contactInfo = await getContactInfo();
  } catch (error) {
    console.error('Failed to fetch contact info:', error);
    // Fallback to props if API fails
    contactInfo = {
      phone: data?.phone || [],
      email: data?.email || '',
      address: data?.address || '',
      siteLogo: data?.logo,
      facebookLink: data?.facebookLink,
      instagramLink: data?.instagramLink,
      linkedinLink: data?.linkedinLink,
      pintrestLink: data?.pintrestLink,
    };
  }


  const getIcon = (icon) => {
    switch (icon) {
      case "facebook":
        return <FaFacebookF />;
      case "instagram":
        return <FaInstagram />;
      case "linkedin":
        return <FaLinkedinIn />;
      case "pinterest":
        return <FaPinterestP />;
      default:
        return null;
    }



  };

  return (
    <footer className="bg-[#15496F] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 ">
        {/* Logo */}
        <div>
          {contactInfo.siteLogo ? (
            <Image
              src={contactInfo.siteLogo}
              alt="MGS Logo"
              className="w-24 mb-4"
              width={96}
              height={40}
              priority
            />
          ) : (
            <p>MGS Logo</p>
          )}
        </div>

        <div className="flex gap-32 ">
          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Links</h4>
            <ul className="space-y-2">
              {data.links.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="hover:underline text-xs">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {data.legal.map((link, i) => (
                <li key={i}>
                  <a className="hover:underline text-xs">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Subscribe */}
        <div>
          <h4 className="font-semibold mb-4">Subscribe Us</h4>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 bg-white rounded-l-md text-black w-full"
            />
            <button className="bg-yellow-200 text-black px-4 rounded-r-md">
              →
            </button>
          </div>
        </div>
      </div>

      {/* Contact Details */}
      <div className="max-w-7xl mx-auto mt-10 grid md:grid-cols-3 gap-8 text-sm">
        <div className="flex items-center gap-2">
          <Image
            src={data.icons.phone}
            alt="Phone"
            width={50}
            height={50}
          />
          <div className="flex flex-col">
            <p className="text-xs text-[#33A1E0] font-semibold">Phone</p>
            <span className="text-xs">
              {Array.isArray(contactInfo.phone) ? contactInfo.phone.join(" / ") : contactInfo.phone}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src={data.icons.email}
            alt="Email"
            width={50}
            height={50}
          />
          <div className="flex flex-col">
            <p className="text-xs text-[#33A1E0] font-semibold">Email</p>
            <span className="text-xs">
              {contactInfo.email}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* < span className=" border rounded-lg rotate-45 h-10 w-10 relative"></span> */}
          <Image
            src={data.icons.address}
            alt="Address"
            width={50}
            height={50}
          />
          <div className="flex flex-col">
            <p className="text-xs text-[#33A1E0] font-semibold">Address</p>
            <span className="text-xs">
              {contactInfo.address}
            </span>
          </div>
        </div>
      </div>
      <hr className="mt-10" />
      {/* Bottom */}
      <div className="max-w-7xl mx-auto mt-10 flex flex-col md:flex-row items-center justify-between">
        <p className="text-xs">{data.copyright}</p>
        <div className="flex gap-4 mt-4 md:mt-0 text-lg">
          <div className="mt-8">

            <div className="flex gap-4">

              <div

                target="_blank"

                className="flex gap-4"

              >
                <a target="_blank" href={contactInfo.facebookLink}><FaFacebookF  className="w-9 h-9 text-white border border-white rounded-full p-2 cursor-pointer" /></a>
                <a target="_blank" href={contactInfo.instagramLink}><FaInstagram className="w-9 h-9 text-white border border-white rounded-full p-2 cursor-pointer" /></a>
                <a target="_blank" href={contactInfo.linkedinLink}><FaLinkedinIn className="w-9 h-9 text-white border border-white rounded-full p-2 cursor-pointer" /></a>
                <a target="_blank" href={contactInfo.pintrestLink}><FaPinterestP className="w-9 h-9 text-white border border-white rounded-full p-2 cursor-pointer" /></a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
