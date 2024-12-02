/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https', 
				hostname: 'restapi.beresin.software',
				port: '443', 
				pathname: '/services/uploads/images/**',
			},
		],
	},
	transpilePackages: ['geist'],
};

export default nextConfig;
