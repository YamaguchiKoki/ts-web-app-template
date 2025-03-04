import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/provider/query-provider";
import { Toaster } from "sonner";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Template",
	description: "This is a template for a web application",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="ja">
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased`}
				>
					<Toaster />
					<QueryProvider>{children}</QueryProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
