import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
}

export const SEO = ({
    title = "VASLIX | Autonomous Revenue Infrastructure",
    description = "The elite AI infrastructure for autonomous voice agents, CRM orchestration, and revenue automation. Engineered for infinite scale.",
    image = "/og-image.png",
    url = "https://vaslix.ai"
}: SEOProps) => {
    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{title}</title>
            <meta name="description" content={description} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />

            {/* Schema.org for Google */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "SoftwareApplication",
                    "name": "VASLIX",
                    "operatingSystem": "Web",
                    "applicationCategory": "BusinessApplication",
                    "description": description,
                    "offers": {
                        "@type": "Offer",
                        "price": "2500.00",
                        "priceCurrency": "USD"
                    }
                })}
            </script>
        </Helmet>
    );
};
