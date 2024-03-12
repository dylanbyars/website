/** @type {import('next').NextConfig} */
module.exports = {
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  pageExtensions: ["page.tsx"], // only files in /pages with a name of `foo.page.tsx` are transformed into navigable routes
}
