/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compiler: {
        styledComponents: true, // Enables styled-components SWC support
    },
    eslint: {
        ignoreDuringBuilds: true
    }
};

export default nextConfig;