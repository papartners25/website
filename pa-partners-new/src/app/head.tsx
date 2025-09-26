export default function Head() {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "PA Partners",
    url: "https://papartners.co",
    sameAs: [
      "https://www.linkedin.com/", // update as needed
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PA Partners",
    url: "https://papartners.co",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}



