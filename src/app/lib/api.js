export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

export async function getHeroData() {
  const res = await fetch(`${STRAPI_URL}/api/heroes?populate[backgroundImage]=true&populate[heroImage]=true`, {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store", // so it always fetches fresh data
  });

  if (!res.ok) {
    throw new Error("Failed to fetch hero data from Strapi");
  }

  const json = await res.json();

  // Make sure we have at least one hero
  if (!json.data || json.data.length === 0) {
    throw new Error("No hero data found in Strapi");
  }

  const hero = json.data[0]; // first entry from collection

  return {
    badge: hero.badge,
    title: hero.title,
    description: hero.description,
    primaryButton: {
      text: hero.primaryButtonText,
      link: hero.primaryButtonLink,
    },
    secondaryButton: {
      text: hero.secondaryButtonText,
      link: hero.secondaryButtonLink,
    },
    backgroundImage: hero.backgroundImage ? `${STRAPI_URL}${hero.backgroundImage.url}` : null,
    heroImage: hero.heroImage ? `${STRAPI_URL}${hero.heroImage.url}` : null,
  };
}

export async function getExperienceData() {
  const res = await fetch(`${STRAPI_URL}/api/experiences?populate=*`, {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch experience data from Strapi");
  }

  const json = await res.json();
  console.log('Experience API Response:', JSON.stringify(json, null, 2));

  if (!json.data || json.data.length === 0) {
    throw new Error("No experience data found in Strapi");
  }

  const exp = json.data[0]; // First entry from collection
  console.log('Experience data:', JSON.stringify(exp, null, 2));

  // Define the icon paths that match the features
  const featureIcons = [
    "/experience/Group 2.png",
    "/experience/Group 2a.png",
    "/experience/Group 2aa.png"
  ];

  return {
    badge: exp.badge,
    heading: exp.heading,
    description: exp.description,
    features:
      exp.features?.map((f, idx) => ({
        id: f.id || idx + 1,
        title: f.title || "",
        description: f.description || "",
        // Use the corresponding icon from the hardcoded array, or fallback to null
        icon: featureIcons[idx] || null
      })) || [],
    images:
      exp.images?.map((img) => ({
        id: img.id,
        url: `${STRAPI_URL}${img.url}`,
        width: img.width,
        height: img.height,
        alt: img.alternativeText || img.name,
      })) || [],
  };
}

export async function getProductsData() {
  const res = await fetch(`${STRAPI_URL}/api/products?populate=image`, {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products data from Strapi");
  }

  const json = await res.json();

  if (!json.data || json.data.length === 0) {
    throw new Error("No products found in Strapi");
  }

  // Normalize products
  return {
    badge: "Our Products",
    heading: "High-Quality Steel & Wire Solutions",
    description: "Explore our wide range of products.",
    catalogButton: {
      label: "Download Catalog",
      link: "/catalog.pdf",
    },
    items: json.data.map((item) => {
      const imageUrl = item.image?.url
        ? `${STRAPI_URL}${item.image.url}`
        : "/placeholder.png";

      return {
        id: item.id,
        title: item.title,
        specs: item.specs,
        bundle: item.bundle,
        coating: item.coating,
        length: item.length,
        height: item.height,
        capacity: item.capacity,
        packing: item.packing,
        application: item.application,
        coil: item.coil,
        image: {
          url: imageUrl,
          alternativeText: item.image?.alternativeText || item.title,
        },
      };
    }),
  };
}

export async function getWhyBusinesses() {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/whybusinesses?populate=sections.image`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 10 }, // for ISR in Next.js
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch Why Businesses data");
    }

    const json = await res.json();

    if (!json.data || json.data.length === 0) {
      return null; // nothing in DB
    }

    // ✅ Strapi returns an array of entries — let's take the first one
    const entry = json.data[0];

    return {
      title: entry.title,
      subtitle: entry.subtitle,
      sections:
        entry.sections?.map((section) => ({
          heading: section.heading,
          // ✅ image is directly available (no `.data.attributes`)
          image: section.image
            ? `${STRAPI_URL}${section.image.url}`
            : null,
          points:
            section.points?.map((point) => point.children?.[0]?.text || "") ||
            [],
        })) || [],
    };
  } catch (error) {
    console.error("Error fetching WhyBusinesses:", error);
    return null;
  }
}

// Case Studies

export async function getCaseStudies() {
  try {
    const res = await fetch(
        `${STRAPI_URL}/api/casestudies?populate=items.image`,
      {
        headers: { "Content-Type": "application/json" },
        next: { revalidate: 10 },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch Case Studies");

    const json = await res.json();

    if (!json.data || json.data.length === 0) return null;

    const entry = json.data[0];

    return {
      badge: entry.badge,
      heading: entry.heading,
      description: entry.description,
      items: entry.items?.map((item) => ({
        id: item.id,
        title: item.title,
        category: item.category,
        challenge: item.challenge,
        solution: item.solution,
        link: item.link,
        image: item.image
          ? `${STRAPI_URL}${item.image.url}`
          : "",
      })),
    };
  } catch (err) {
    console.error("Error fetching Case Studies:", err);
    return null;
  }
}

export async function getBlogSection() {
  const res = await fetch(
    `${STRAPI_URL}/api/blog-sections?populate[blog_posts][populate]=Image`,
    { cache: "no-store" }
  );

  const json = await res.json();
  const section = json.data[0];

  if (!section) return null;

  return {
    badge: section.Badge,
    heading: section.Heading,
    description: section.Description,
    posts: section.blog_posts.map((post) => ({
      id: post.id,
      title: post.Title,
      description: post.Description,
      image: post.Image?.url
        ? `${process.env.NEXT_PUBLIC_STRAPI_URL.replace("/api", "")}${
            post.Image.url
          }`
        : "/placeholder.png",
      link: post.Link || "#",
    })),
  };
}

export async function getComparisonSection() {
  const res = await fetch(
    `${STRAPI_URL}/api/comparison-sections?populate=tablerow`,
    { cache: "no-store" }
  );

  const json = await res.json();
  const section = json.data[0];

  if (!section) return null;

  return {
    badge: section.Badge,
    title: section.Title,
    subtitle: section.Subtitle,
    tableHeaders: section.TableHeaders || ["Feature / Value", "MGS", "Others"],
    rows: section.tablerow.map((row) => ({
      feature: row.Feature,
      mgs: row.MGS,
      others: row.Others,
    })),
  };
}

// utils/getFooter.js
export async function getFooterData() {
  const res = await fetch(
    `${STRAPI_URL}/api/footers?populate[logo]=*&populate[icons][populate]=*`,
    {
      next: { revalidate: 60 }, // ISR
    }
  );
  const json = await res.json();

  const footer = json.data[0];

  return {
    logo: footer.logo?.url ? `${STRAPI_URL}${footer.logo.url}` : null,
    phone: footer.phone.split("/").map((p) => p.trim()), // convert string -> array
    email: footer.email,
    address: footer.address,
    copyright: footer.copyright,
    icons: {
      phone: `${STRAPI_URL}${footer.icons[0]?.phoneIcon?.url}`,
      email: `${STRAPI_URL}${footer.icons[0]?.emailIcon?.url}`,
      address: `${STRAPI_URL}${footer.icons[0]?.addressIcon?.url}`,
    },
  };
}


// utils/getContactInfo.js
export async function getContactInfo() {
  const res = await fetch(`${STRAPI_URL}/api/contact-pages?populate=*`, {
    cache: "no-store", // always fetch fresh
  });

  const json = await res.json();
  const contact = json.data[0]; // first item

  return {
    address: contact.address,
    phone: contact.phone,
    email: contact.email,
    siteLogo: contact.siteLogo ? STRAPI_URL + contact.siteLogo.url  : null,
    facebookLink: contact.facebookLink,
    instagramLink: contact.instagramLink,
    linkedinLink: contact.linkedinLink,
    pintrestLink: contact.pintrestLink,
    
  };
}




// products page
export async function getProductsPage() {
  const res = await fetch(
    `${STRAPI_URL}/api/products-Page?populate=bannerImage`,
    { cache: "no-store" }
  );
  const json = await res.json();
  const page = json.data;

  return {
    id: page.id,
    title: page.pageTitle,
    intro: page.introText,
    banner: page.bannerImage?.url || null, // ✅ flatten the image URL
  };
}

// products list
export async function getProductsList() {
  const res = await fetch(
    `${STRAPI_URL}/api/products-listings?populate[cover]=true`,
    {
      cache: "no-store", // always fetch fresh
    }
  );

  const json = await res.json();
  const products = json.data || [];

  return products.map((product) => ({
    id: product.id,
    title: product.title,              // ✅ directly from response
    description: product.description,  // ✅ directly from response
    cover: product.cover?.url || null, // ✅ image url is at product.cover.url
    slug: product.Slug,
  }));
}
// Fetch all product slugs
export async function getProductSlugs() {
  const res = await fetch(`${STRAPI_URL}/api/products-lists`, {
    cache: "no-store",
  });
  const json = await res.json();
  return json.data.map((item) => item.slug);
}

// Fetch a single product by slug
export async function getProductBySlug(slug) {
  const res = await fetch(
    `${STRAPI_URL}/api/products-listings?filters[Slug][$eq]=${slug}&populate[cover]=true&populate[section1][populate]=*&populate[techspec]=true&populate[applications][populate]=*&populate[PackagingCustomization][populate][itemlist][populate]=*`,
    { cache: "no-store" }
  );
  
  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }
  
  const json = await res.json();
  const product = json.data[0];

  if (!product) return null;

  return {
    id: product.id,
    title: product.title,
    description: product.description,
    slug: product.Slug,
    cover: product.cover?.url || null,
    // Add all the missing fields from your API response
    section1: product.section1 || [],
    techspec: product.techspec || [],
    applications: product.applications || [],
    PackagingCustomization: product.PackagingCustomization || []
  };
}

//about us page
export async function getAboutPage() {
  const res = await fetch(`${STRAPI_URL}/api/about-pages?populate[0]=bannerImage&populate[1]=whyChooseus.paragraphs&populate[2]=whyChooseus.image`, {
    cache: "no-store",
  });
  const json = await res.json();
  const about = json.data[0]; // first item in array

  return {
    title: about.pageTitle,
    bannerImage: about.bannerImage,
    whyChooseUs: about.whyChooseus 
  }
}
