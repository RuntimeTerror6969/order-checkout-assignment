import { ThemeProvider } from "../context/ThemeContext";
import "../public/styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Hosted Aggregated Payment Checkout</title>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const storedTheme = localStorage.getItem('theme');
                const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const initialTheme = storedTheme || (systemDark ? 'dark' : 'light');
                document.documentElement.classList.add(initialTheme);
              })();
            `,
          }}
        />
      </head>
      <body className="overflow-x-hidden">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
