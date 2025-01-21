import SmoothScroll from "@/components/smoothScroll";
import "./globals.css";
import PageWrapper from "./page";

export const metadata = {
  title: "Portfolio | Bukvic Armin",
  description: "Portfolio website by Bukvic Armin. Showcase of my projects and skills.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>👨🏻‍💻</text></svg>"
      />
      <body>
      <SmoothScroll>
        <PageWrapper children={children} />
      </SmoothScroll>
      </body>
    </html>
  );
}
