/**
 *
 * Security Headers in Next
 * https://nextjs.org/docs/advanced-features/security-headers
 *
 * X-DNS-Prefetch-Control
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
 * controls DNS prefetching, browsers proactively perform domain name resolution in the background
 * reduces latency when the user clicks a link
 *
 * Strict-Transport-Security
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
 * This header informs browsers it should only be accessed using HTTPS
 *
 * X-XSS-Protection
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection
 * stops pages from loading when they detect reflected cross-site scripting (XSS) attacks
 *
 * X-Frame-Options
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
 * to indicate whether or not a browser should be allowed to render a page in a <frame>, <iframe>, <embed> or <object>
 *
 * Permissions-Policy
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
 * allow and deny the use of browser features in its own frame
 *
 * X-Content-Type-Options
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
 * used by the server to indicate that the MIME types advertised in the Content-Type headers should be followed
 *
 * Referrer-Policy
 * https://scotthelme.co.uk/a-new-security-header-referrer-policy/
 *
 * Content-Security-Policy
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
 * helps to detect and mitigate certain types of attacks, including Cross-Site Scripting (XSS) and data injection attacks
 *
 * Pragma
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Pragma
 * Pragma: no-cache - Forces caches to submit the request to the origin server for validation before a cached copy is released.
 *
 * Cache-Control
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
 * instructions that control caching in browsers and shared caches
 *
 * Vary
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Vary
 * Indicates that factors other than request headers influenced the generation of this response. Implies that the response is uncacheable.
 *
 * Last-Modified
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Last-Modified
 * It is used as a validator to determine if the resource is the same as the previously stored one
 *
 */

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    // not required if deployed on vercel, max-age=180days
    key: 'Strict-Transport-Security',
    value: 'max-age=15552000; includeSubDomains; preload'
  },
  {
    // CSP should handle this
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'Permissions-Policy',
    value: 'geolocation=*'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  // {
  //   key: 'Content-Security-Policy',
  //   value: 'default-src https:;'
  // },
  // extra response headers below
  {
    // backwards compatibility with the HTTP/1.0 caches
    key: 'Pragma',
    value: 'no-cache'
  },
  {
    key: 'Cache-Control',
    value: 'no-store, no-cache, max-age=0, must-revalidate, post-check=0, pre-check=0'
  },
  {
    key: 'Vary',
    value: '*'
  },
  {
    key: 'Last-Modified',
    value: new Date().toUTCString()
  }
];

module.exports = securityHeaders;
