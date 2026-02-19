import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pawil Nails — Spa de Uñas en Castelldefels",
  description: "Pawil Nails es un Spa de Uñas ubicado en Castelldefels. El mejor servicio, la mejor calidad, al mejor precio. Manicura, pedicura, acrílico, gel, nail art y más.",
  keywords: "uñas, manicura, pedicura, nail art, acrílico, gel, Castelldefels, Barcelona, spa uñas",
  icons: {
    icon: "/images/logo.jpg",
    apple: "/images/logo.jpg",
  },
  openGraph: {
    title: "Pawil Nails — Spa de Uñas en Castelldefels",
    description: "Tus uñas cuentan historias. El mejor servicio, la mejor calidad, al mejor precio.",
    type: "website",
    images: ["/images/logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700&family=Inter:wght@300;400;500;600;700;800&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
