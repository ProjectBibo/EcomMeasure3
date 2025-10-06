import React from "react";
import { Helmet } from "react-helmet-async";

export default function SEO({
  title = "EcomMeasure – Data-gedreven website optimalisatie",
  description = "EcomMeasure helpt webshops groeien met GA4, Consent Mode en UX optimalisaties.",
  url = "https://www.ecommeasure.com",
  image = "/og-image.png",
}) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="EcomMeasure, GA4, Google Analytics, Consent Mode, UX Research, CRO, website optimalisatie" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
