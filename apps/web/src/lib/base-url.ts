export function getBaseURL() {
	// const isProd = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";
	// const url = isProd
	// 	? process.env.VERCEL_PROJECT_PRODUCTION_URL
	// 	: process.env.VERCEL_URL;

	// return url ? `https://${url}` : `http://localhost:${process.env.PORT || 8787}`;
	//TODO: 方針決定後変更
	return "http://localhost:8787";
}
