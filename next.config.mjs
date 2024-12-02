/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['restapi.beresin.software'],
	},
	transpilePackages: ['geist'],
};

export default nextConfig;
