import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO = ({
  title,
  description,
  image = 'https://policyperfect.co.in/favicon.png?v=3',
  type = 'website',
  keywords,
  schema,
}) => {
  const location = useLocation();
  const canonicalUrl = `https://policyperfect.co.in${location.pathname}`;

  // Helper: upsert a <meta> tag
  const updateMetaTag = (attribute, value, content) => {
    let element = document.querySelector(`meta[${attribute}="${value}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attribute, value);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  // Helper: upsert a <link> tag
  const updateLinkTag = (rel, href) => {
    let element = document.querySelector(`link[rel="${rel}"]`);
    if (!element) {
      element = document.createElement('link');
      element.setAttribute('rel', rel);
      document.head.appendChild(element);
    }
    element.setAttribute('href', href);
  };

  // Helper: remove all existing schema <script> tags, then inject fresh ones
  const injectSchema = (schemaData) => {
    // Remove any previously injected schema scripts
    document.querySelectorAll('script[type="application/ld+json"]').forEach((el) => el.remove());

    const schemas = Array.isArray(schemaData) ? schemaData : [schemaData];
    schemas.forEach((s) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(s);
      document.head.appendChild(script);
    });
  };

  useEffect(() => {
    // --- document.title ---
    if (title) {
      document.title = title;
    }

    // --- viewport (only add if missing) ---
    if (!document.querySelector('meta[name="viewport"]')) {
      const vp = document.createElement('meta');
      vp.setAttribute('name', 'viewport');
      vp.setAttribute('content', 'width=device-width, initial-scale=1');
      document.head.appendChild(vp);
    }

    // --- Standard meta tags ---
    if (description) {
      updateMetaTag('name', 'description', description);
    }
    if (keywords) {
      updateMetaTag('name', 'keywords', keywords);
    }
    updateMetaTag('name', 'author', 'PolicyPerfect Insurance');
    updateMetaTag(
      'name',
      'robots',
      location.pathname.startsWith('/admin') ? 'noindex, nofollow' : 'index, follow'
    );

    // --- Open Graph ---
    if (title) {
      updateMetaTag('property', 'og:title', title);
    }
    if (description) {
      updateMetaTag('property', 'og:description', description);
    }
    if (image) {
      updateMetaTag('property', 'og:image', image);
    }
    updateMetaTag('property', 'og:url', canonicalUrl);
    updateMetaTag('property', 'og:type', type);
    updateMetaTag('property', 'og:site_name', 'PolicyPerfect');
    updateMetaTag('property', 'og:locale', 'en_IN');

    // --- Twitter Card ---
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    if (title) {
      updateMetaTag('name', 'twitter:title', title);
    }
    if (description) {
      updateMetaTag('name', 'twitter:description', description);
    }
    if (image) {
      updateMetaTag('name', 'twitter:image', image);
    }
    updateMetaTag('name', 'twitter:site', '@policyperfect');

    // --- Canonical link ---
    updateLinkTag('canonical', canonicalUrl);

    // --- JSON-LD Schema ---
    if (schema) {
      injectSchema(schema);
    } else {
      // Remove any stale schema from a previous page
      document.querySelectorAll('script[type="application/ld+json"]').forEach((el) => el.remove());
    }
  }, [title, description, image, type, keywords, schema, canonicalUrl, location.pathname]);

  return null;
};

export default SEO;
