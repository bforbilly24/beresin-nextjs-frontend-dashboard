const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: '178.128.21.130',
				port: '3000',
				pathname: '/services/uploads/images/**',
			},
		],
	},
	transpilePackages: ['geist'],
};

export default nextConfig;
