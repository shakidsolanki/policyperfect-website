import { useEffect } from 'react';

const SEO = ({ title, description, url = 'https://policyperfect.co.in/', image = 'https://policyperfect.co.in/favicon.png?v=3', type = 'website' }) => {
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
    
    if (url) {
      updateMetaTag('property', 'og:url', url);
      updateMetaTag('name', 'twitter:url', url);
    }
    
    if (image) {
      updateMetaTag('property', 'og:image', image);
      updateMetaTag('name', 'twitter:image', image);
    }
    
    if (type) {
      updateMetaTag('property', 'og:type', type);
    }
  }, [title, description, url, image, type]);

  const updateMetaTag = (attribute, value, content) => {
    let element = document.querySelector(`meta[${attribute}="${value}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attribute, value);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  return null;
};

export default SEO;
