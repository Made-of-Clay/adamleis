type PageMeta = {
  title: string;
  description?: string | undefined;
  canonicalUrl?: string | undefined;
};

type PageOgMeta = {
  title: string;
  description?: string | undefined;
  type: "website";
  url?: string | undefined;
  image?: string | undefined;
  imageAlt?: string | undefined;
  imageWidth?: string | undefined;
  imageHeight?: string | undefined;
};

type PageTwitterMeta = {
  title: string;
  description?: string | undefined;
  card: "summary_large_image";
  site?: string | undefined;
  creator?: string | undefined;
  image?: string | undefined;
  imageAlt?: string | undefined;
};

type BlogPostOgMeta = {
  title: string;
  description?: string | undefined;
  type: "article";
  url?: string | undefined;
  author?: string | undefined;
  publishDate: string;
  image?: string | undefined;
  imageAlt?: string | undefined;
  imageWidth?: string | undefined;
  imageHeight?: string | undefined;
};

type BlogPostTwitterMeta = {
  title: string;
  description?: string | undefined;
  card: "summary_large_image";
  site?: string | undefined;
  creator?: string | undefined;
  image?: string | undefined;
  imageAlt?: string | undefined;
};

export function getPageMeta({
  title: pageTitle,
  description,
  baseUrl,
  ogImageAbsoluteUrl,
  ogImageAltText,
  ogImageWidth,
  ogImageHeight,
  siteOwnerTwitterHandle,
  contentAuthorTwitterHandle,
}: {
  title: string;
  description: string;
  baseUrl?: string;
  ogImageAbsoluteUrl?: string; // should always be absolute
  ogImageAltText?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  siteOwnerTwitterHandle?: string;
  contentAuthorTwitterHandle?: string;
}): { meta: PageMeta; og: PageOgMeta; twitter: PageTwitterMeta } {
  if (!pageTitle) {
    throw Error("title is required for page SEO");
  }
  if (ogImageAbsoluteUrl) {
    ogImageAltText = !ogImageAltText
      ? `Preview image for ${pageTitle}`
      : ogImageAltText;
    // ogImageWidth = !ogImageWidth ? 1200 : ogImageWidth;
    // ogImageHeight = !ogImageHeight ? 627 : ogImageHeight;
  }

  const meta: PageMeta = { title: pageTitle, description: description };

  const og: PageOgMeta = {
    title: pageTitle,
    description: description,
    type: "website",
    url: baseUrl,
    image: ogImageAbsoluteUrl,
    imageAlt: ogImageAltText,
    imageWidth: ogImageWidth ? String(ogImageWidth) : undefined,
    imageHeight: ogImageHeight ? String(ogImageHeight) : undefined,
  };

  const twitter: PageTwitterMeta = {
    title: pageTitle,
    description: description,
    card: "summary_large_image",
    site: siteOwnerTwitterHandle,
    creator: contentAuthorTwitterHandle || siteOwnerTwitterHandle,
    image: ogImageAbsoluteUrl,
    imageAlt: ogImageAltText,
  };

  return {
    meta,
    og,
    twitter,
  };
}

export function getBlogPostMeta({
  title: pageTitle,
  description,
  canonicalUrl,
  pageUrl,
  authorName,
  publishDate,
  ogImageAbsoluteUrl,
  ogImageAltText,
  ogImageWidth,
  ogImageHeight,
  siteOwnerTwitterHandle,
  contentAuthorTwitterHandle,
}: {
  title: string;
  description: string;
  canonicalUrl?: string;
  pageUrl?: string;
  authorName?: string;
  publishDate: string;
  ogImageAbsoluteUrl?: string; // should always be absolute
  ogImageAltText?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  siteOwnerTwitterHandle?: string;
  contentAuthorTwitterHandle?: string;
}): { meta: PageMeta; og: BlogPostOgMeta; twitter: BlogPostTwitterMeta } {
  if (!pageTitle) {
    throw Error("title is required for page SEO");
  }
  if (ogImageAbsoluteUrl && !ogImageAltText) {
    ogImageAltText = `Preview image for ${pageTitle}`;
  }

  const meta: PageMeta = {
    title: pageTitle,
    description: description,
    canonicalUrl,
  };

  const og: BlogPostOgMeta = {
    title: pageTitle,
    description: description,
    type: "article",
    url: pageUrl,
    author: authorName,
    publishDate: publishDate,
    image: ogImageAbsoluteUrl,
    imageAlt: ogImageAltText,
    imageWidth: ogImageWidth ? String(ogImageWidth) : undefined,
    imageHeight: ogImageHeight ? String(ogImageHeight) : undefined,
  };

  const twitter: BlogPostTwitterMeta = {
    title: pageTitle,
    description: description,
    card: "summary_large_image",
    site: siteOwnerTwitterHandle,
    creator: contentAuthorTwitterHandle || siteOwnerTwitterHandle,
    image: ogImageAbsoluteUrl,
    imageAlt: ogImageAltText,
  };

  return {
    meta,
    og,
    twitter,
  };
}
