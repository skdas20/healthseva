import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import MainLayout from '@/components/MainLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'HealthSeva - Premium Healthcare at Your Fingertips',
  description: 'Experience world-class medical care with our cutting-edge telemedicine platform. Connect with certified doctors, book appointments, and manage your health journey seamlessly.',
  keywords: 'healthcare, telemedicine, doctors, medical consultation, health services, emergency care, specialist appointments',
  authors: [{ name: 'HealthSeva Team' }],
  creator: 'HealthSeva',
  publisher: 'HealthSeva',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://healthseva.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'es-ES': '/es-ES',
    },
  },
  openGraph: {
    title: 'HealthSeva - Premium Healthcare at Your Fingertips',
    description: 'Experience world-class medical care with our cutting-edge telemedicine platform. Connect with certified doctors, book appointments, and manage your health journey seamlessly.',
    url: 'https://healthseva.com',
    siteName: 'HealthSeva',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'HealthSeva - Premium Healthcare Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HealthSeva - Premium Healthcare at Your Fingertips',
    description: 'Experience world-class medical care with our cutting-edge telemedicine platform.',
    creator: '@healthseva',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-verification-code',
    yandex: 'yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'HealthSeva',
              description: 'Premium healthcare services and telemedicine platform',
              url: 'https://healthseva.com',
              logo: 'https://healthseva.com/logo.png',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+1-800-HEALTH',
                contactType: 'customer service',
                availableLanguage: ['English', 'Spanish'],
              },
              sameAs: [
                'https://facebook.com/healthseva',
                'https://twitter.com/healthseva',
                'https://instagram.com/healthseva',
                'https://linkedin.com/company/healthseva',
              ],
              address: {
                '@type': 'PostalAddress',
                streetAddress: '123 Healthcare Ave',
                addressLocality: 'Medical City',
                addressRegion: 'HC',
                postalCode: '12345',
                addressCountry: 'US',
              },
            }),
          }}
        />
        
        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#3B82F6" />
        <meta name="msapplication-TileColor" content="#3B82F6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="HealthSeva" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <div id="root">
          <MainLayout>
            {children}
          </MainLayout>
        </div>
        
        {/* Portal for modals */}
        <div id="modal-root" />
        
        {/* Scripts */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'HealthSeva',
              url: 'https://healthseva.com',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://healthseva.com/search?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
