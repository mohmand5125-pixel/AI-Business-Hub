/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  seoTitle: string;
  metaDesc: string;
  publishedDate: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
    role: string;
  };
  category: string;
  readTime: string;
  image: string;
  isFeatured?: boolean;
  isMoneyPage?: boolean;
  contentMarkdown?: string; // Rich body with HTML/MD markers
  faqs?: { question: string; answer: string }[];
  h2Sections?: { h2: string; h3s?: string[]; content: string }[];
  keywords?: { primary: string; secondary: string[] };
  affiliateCallouts?: {
    toolName: string;
    logoUrl?: string; // We use descriptive words/icons if missing
    badge?: string;
    description: string;
    pricing: string;
    features: string[];
    affiliateUrl: string;
    ctaText: string;
  }[];
  comparisons?: {
    headers: string[];
    rows: string[][];
  };
}

export interface ContentPlannerDay {
  day: number;
  title: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  searchIntent: 'Informational' | 'Commercial' | 'Transactional' | 'Navigational';
  suggestedLength: number;
  seoTitle: string;
  metaDescription: string;
  internalLinks: string[];
  affiliateOpportunities: string[];
  ctaPlacement: string;
  socialMediaIdeas: string[];
  isWritten?: boolean; // If we actually have a fully readable post
  slug?: string;
  category: string;
}

export interface AITool {
  id: string;
  name: string;
  category: string;
  description: string;
  pricing: {
    tier: string;
    startingAt: string;
    freeTrial: boolean;
  };
  rating: number;
  pros: string[];
  cons: string[];
  affiliateUrl: string;
  badge?: string;
  alternativeOf?: string;
}

export interface DownloadableProduct {
  id: string;
  title: string;
  description: string;
  type: 'Prompt Pack' | 'Template' | 'Calendar' | 'Bundle';
  fileSize: string;
  downloadsCount: number;
  features: string[];
  downloadUrl: string;
}
