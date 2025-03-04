import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	transpilePackages: [
		"@template/contract",
		"@template/domain",
		"@template/database",
		"@template/api",
	],
	experimental: {
		esmExternals: true,
	},
};

export default nextConfig;
