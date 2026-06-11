import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO = ({ title, description, image = 'https://policyperfect.co.in/favicon.png?v=3', type = 'website' }) => {
  const location = useLocation();
  const canonicalUrl = `https://policyperfect.co.in${location.pathname}`;

  useEffect(() => {
    if (title) {
      document.title = title;
      updateMetaTag('property', 'og:title', title);
      updateMetaTag('name', 'twitter:title', title);
    }
    
    if (description) {
      updateMetaTag('name', 'description', description);
      updateMetaTag('property', 'og:description', description);
      updateMetaTag('name', 'twitter:description', description);
    }
    
    // Dynamically update canonical link and meta URL tags
    updateLinkTag('canonical', canonicalUrl);
    updateMetaTag('property', 'og:url', canonicalUrl);
    updateMetaTag('name', 'twitter:url', canonicalUrl);
    
    // Dynamically manage crawlers via meta robots
    if (location.pathname === '/admin') {
      updateMetaTag('name', 'robots', 'noindex, nofollow');
    } else {
      updateMetaTag('name', 'robots', 'index, follow');
    }
    
    if (image) {
      updateMetaTag('property', 'og:image', image);
      updateMetaTag('name', 'twitter:image', image);
    }
    
    if (type) {
      updateMetaTag('property', 'og:type', type);
    }
  }, [title, description, canonicalUrl, image, type, location.pathname]);

  const updateMetaTag = (attribute, value, content) => {
    let element = document.querySelector(`meta[${attribute}="${value}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attribute, value);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  const updateLinkTag = (rel, href) => {
    let element = document.querySelector(`link[rel="${rel}"]`);
    if (!element) {
      element = document.createElement('link');
      element.setAttribute('rel', rel);
      document.head.appendChild(element);
    }
    element.setAttribute('href', href);
  };

  return null;
};

export default SEO;

