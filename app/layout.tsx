import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "高效建築模型：透視管線、燈光控制與虛擬樓層巡覽",
    description:
        "體驗先進建築模型，清晰展示內部管線結構，並可實時控制燈光開關。用戶可在虛擬樓層中自由移動，進行詳細建築巡覽，提升設計與管理效率。",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html>
            <body>{children}</body>
        </html>
    );
}
