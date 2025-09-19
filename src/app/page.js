import React from "react";
import Hero from "./components/Hero";
// import heroData from "./data/hero";
import Experience from "./components/Experience";
import experienceData from "./data/experience";
import productsData from "./data/products";
import Products from "./components/Products";
import { whyBusinesses } from "./data/whyBusinesses";
import WhyBusinesses from "./components/WhyBusinesses";
import caseStudiesData from "./data/caseStudies";
import CaseStudies from "./components/CaseStudies";
import blogPostsData from "./data/blogPosts";
import BlogSection from "./components/BlogSection";
import comparisonData from "./data/comparison";
import Comparison from "./components/Comparison";
import footerData from "./data/footerData";
import Footer from "./components/Footer";
import {
  getBlogSection,
  getCaseStudies,
  getComparisonSection,
  getExperienceData,
  getFooterData,
  getHeroData,
  getProductsData,
  getWhyBusinesses,
} from "./lib/api";

const page =  async() => {
  const heroData =  await getHeroData();
  const expData = await getExperienceData();
  const products = await getProductsData();
  const whyBusiness = await getWhyBusinesses();
  const caseStudies = await getCaseStudies();
  const blogSection = await getBlogSection();
  const comparisonSection = await getComparisonSection();

  return (
    <div className="overflow-hidden">
      <Hero data={heroData} />
      <Experience data={expData} />
      <Products data={products} />
      <WhyBusinesses data={whyBusiness} />
      <CaseStudies data={caseStudies} />
      <BlogSection data={blogSection} />
      <Comparison data={comparisonSection} />
      <Footer data={footerData} />
    </div>
  );
};

export default page;
