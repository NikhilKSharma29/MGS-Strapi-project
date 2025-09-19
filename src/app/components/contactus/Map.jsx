import Image from "next/image";
import React from "react";

const Map = () => {
  return (
    <div className="w-full h-[400px] my-10 px-4">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3678.8582577401985!2d75.84467737349779!3d22.770640925686255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396303b42bf77f41%3A0x52ab27cfe8972889!2sMaa%20Gayatri%20Steel%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1757853259042!5m2!1sen!2sin"
        className="w-full h-full rounded-xl shadow-lg"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Map;
