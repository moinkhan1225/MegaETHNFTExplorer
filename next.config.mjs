/** @type {import('next').NextConfig} */
const nextConfig = {
     images: {
       remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allow all hostnames
        port: "",
        pathname: "/**", // allow all paths
      },
    ],
    // domains: ['via.placeholder.com', 'ipfs.io',"omnihub-v2.fra1.digitaloceanspaces.com"], // add more if needed
  },
};

export default nextConfig;
