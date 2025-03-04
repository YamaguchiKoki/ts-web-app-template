import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	transpilePackages: [
		"@template/contract",
		"@template/domain",
		"@template/database",
		"@template/api",
	],
	// apiパッケージ側の要件で拡張子jsでexportしているため、開発時はwebpackが正しく認識できるようtsで置き換えている
	// TODO: いいやり方を探す
	webpack: (config) => {
		config.resolve.extensionAlias = {
			".js": [".ts", ".js"],
			".mjs": [".mts", ".mjs"],
		};
		return config;
	},
};

export default nextConfig;
