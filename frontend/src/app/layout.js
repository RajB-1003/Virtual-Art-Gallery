import { Inter } from "next/font/google";
import "./globals.css";
import Link from 'next/link';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Virtual Art Gallery",
  description: "platform for digital art collections",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="navbar glass">
          <div className="nav-content">
            <Link href="/" className="logo">ArtGallery</Link>
            <div className="nav-links">
              <Link href="/artists" className="nav-link">Artists</Link>
              <Link href="/artworks" className="nav-link">Artworks</Link>
              <Link href="/galleries" className="nav-link">Galleries</Link>
              <Link href="/dashboard" className="nav-link">Dashboard</Link>
            </div>
          </div>
        </nav>
        <div className="container">
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
