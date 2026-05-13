/**
 * CompanyLogo Component
 * Displays a company logo with automatic fallback.
 * - CDN icons (16 verified brands): loads from CDN, falls back to SVG on error
 * - All other companies: renders inline SVG immediately (zero network)
 */
import { useState, useCallback, useEffect } from 'react';
import { getCompanyLogoUrl, getFallbackLogoUrl, isSimpleIcon, getCompanyColor } from '../utils/companyLogos';

const CompanyLogo = ({ companyName = 'Company', size = 48, className = '' }) => {
  const name = companyName || 'Company';
  const useCdn = isSimpleIcon(name);
  const brandColor = getCompanyColor(name);

  // CDN icons need error handling; inline SVGs never fail
  const [cdnFailed, setCdnFailed] = useState(false);
  const [loaded, setLoaded] = useState(!useCdn); // inline SVGs are instant

  // Reset when company changes
  useEffect(() => {
    setCdnFailed(false);
    setLoaded(!isSimpleIcon(name));
  }, [name]);

  const src = (useCdn && !cdnFailed)
    ? getCompanyLogoUrl(name)
    : getFallbackLogoUrl(name);

  // CDN icons have transparent bg → show border; SVG badges have colored bg → no border
  const showBorder = useCdn && !cdnFailed;

  const handleError = useCallback(() => {
    setCdnFailed(true);
    setLoaded(true); // fallback SVG will load instantly
  }, []);

  const handleLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <div
      className={`relative flex items-center justify-center shrink-0 overflow-hidden rounded-xl ${
        showBorder ? 'bg-white border border-gray-100 p-1.5' : ''
      } ${className}`}
      style={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
      }}
    >
      <img
        src={src}
        alt={`${name} logo`}
        onError={useCdn ? handleError : undefined}
        onLoad={handleLoad}
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default CompanyLogo;
