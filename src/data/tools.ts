/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AITool } from '../types';

export const AI_TOOLS_DB: AITool[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT (OpenAI)',
    category: 'AI Productivity',
    description: 'The industry-leading conversational AI model for multi-format problem solving, custom GPT creation, analysis, and comprehensive text tasks.',
    pricing: {
      tier: 'Freemium',
      startingAt: '$20/mo',
      freeTrial: true,
    },
    rating: 4.8,
    pros: [
      'Incredibly adaptive context reasoning',
      'Advanced Custom GPT creator ecosystem',
      'Robust code interpreter and data analysis'
    ],
    cons: [
      'Occasional peak hours performance limits',
      'Interface lacks folder organization for chat histories'
    ],
    affiliateUrl: 'https://openai.com/chatgpt',
    badge: 'Standard Champion',
    alternativeOf: 'Manual typing and data parsing'
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    category: 'AI Productivity',
    description: 'An advanced multi-modal powerhouse that integrates natively with Google Workspace, spreadsheet automations, and live web research grounding.',
    pricing: {
      tier: 'Freemium',
      startingAt: '$20/mo',
      freeTrial: true,
    },
    rating: 4.7,
    pros: [
      'Largest token window in commercial models (2M+ tokens)',
      'Flawless real-time web search and live grounding',
      'Native Workspace integrations (Docs, Gmail, Sheets)'
    ],
    cons: [
      'Can be overly conversational/wordy unless guided with structured prompts',
      'UI has slightly fewer customization plugins than competitors'
    ],
    affiliateUrl: 'https://gemini.google.com',
    badge: 'Research King',
    alternativeOf: 'Standard Google Search'
  },
  {
    id: 'claude',
    name: 'Claude (Anthropic)',
    category: 'AI Content Creation',
    description: 'Beloved for its highly editorial writing style, pristine code synthesis, and powerful canvas-like Projects and Artifacts UI elements.',
    pricing: {
      tier: 'Freemium',
      startingAt: '$20/mo',
      freeTrial: true,
    },
    rating: 4.9,
    pros: [
      'Most natural, organic, and non-generic writing voice',
      'Artifacts interface is a game-changer for dev and wireframing',
      'Pristine adherence to nuanced layout and prompt instructions'
    ],
    cons: [
      'Strict daily message limits on premium Pro tier',
      'No native direct live internet search capability (requires third party integration)'
    ],
    affiliateUrl: 'https://anthropic.com/claude',
    badge: 'Best For Copywriting',
    alternativeOf: 'Hiring costly freelance copywriters'
  },
  {
    id: 'jasper',
    name: 'Jasper AI',
    category: 'AI Marketing Tools',
    description: 'Enterprise brand-voice platform featuring collaborative workflows, marketing campaign accelerators, and multi-channel content wizards.',
    pricing: {
      tier: 'Paid',
      startingAt: '$39/mo',
      freeTrial: true,
    },
    rating: 4.6,
    pros: [
      'Learns and strictly enforces specific brand guidelines/voice',
      'Integrated Plagiarism check and SEO Surfer integration',
      'Templates built specifically for high-conversion marketing funnels'
    ],
    cons: [
      'Relatively high starting price for solo freelancers',
      'Steeper learning curve to configure automated workflows'
    ],
    affiliateUrl: 'https://www.jasper.ai',
    badge: 'Enterprise Choice',
    alternativeOf: 'Hire agency copywriters'
  },
  {
    id: 'zapier',
    name: 'Zapier Central & AI',
    category: 'AI Automation',
    description: 'The golden connector of cloud software, now powered by AI bots and conversational logic to construct custom API multi-step work paths without code.',
    pricing: {
      tier: 'Freemium',
      startingAt: '$19.99/mo',
      freeTrial: true,
    },
    rating: 4.5,
    pros: [
      'Connects with 6,000+ business applications',
      'Natural-language trigger and action setup',
      'Copilot features generate complex Python/JS code snippets instantly'
    ],
    cons: [
      'Multi-step zaps can get expensive on high-volume runs',
      'Error logging sometimes lacks detailed API debugging readouts'
    ],
    affiliateUrl: 'https://zapier.com',
    badge: 'Automation King',
    alternativeOf: 'Hiring custom software builders'
  },
  {
    id: 'make',
    name: 'Make.com',
    category: 'AI Automation',
    description: 'A visually stunning automation canvas allowing complex routing, high-performance data processing, and affordable granular execution tiers.',
    pricing: {
      tier: 'Freemium',
      startingAt: '$9/mo',
      freeTrial: true,
    },
    rating: 4.7,
    pros: [
      'Highly visual drag-and-drop scenario plotting',
      'Immense cost savings compared to Zapier on heavy data loops',
      'Excellent raw JSON body and API endpoint handling'
    ],
    cons: [
      'Far more technical to learn for absolute beginners',
      'Slightly fewer direct native SaaS connectors than Zapier'
    ],
    affiliateUrl: 'https://www.make.com',
    badge: 'Best Value Automation',
    alternativeOf: 'Zapier'
  },
  {
    id: 'manychat',
    name: 'ManyChat AI',
    category: 'AI Customer Support',
    description: 'Instagram, Messenger, and WhatsApp chat logic allowing automated DM-to-lead captures, instant product recommendations, and conversion paths.',
    pricing: {
      tier: 'Freemium',
      startingAt: '$15/mo',
      freeTrial: true,
    },
    rating: 4.6,
    pros: [
      'Officially approved Meta messaging API partner',
      'Convert comment-mentions directly into automated DM funnels',
      'Seamless hand-off from automated bot to human agents'
    ],
    cons: [
      'Strictly bound to major social platforms',
      'Requires meticulous testing of button triggers to satisfy guidelines'
    ],
    affiliateUrl: 'https://manychat.com',
    badge: 'Social Commerce Pick',
    alternativeOf: 'Cold DMing hundreds of prospects manually'
  },
  {
    id: 'intercom-fin',
    name: 'Intercom (Fin AI)',
    category: 'AI Customer Support',
    description: 'Next-gen enterprise support bot resolving 50%+ of client questions instantly with highly reliable base knowledge-base indexing.',
    pricing: {
      tier: 'Paid',
      startingAt: '$39/mo + $0.99/resolution',
      freeTrial: true,
    },
    rating: 4.8,
    pros: [
      'Drastically reduces human support ticket pipelines',
      'No hallucinations; strictly grounded on imported help materials',
      'Beautiful modern custom chat widgets and layouts'
    ],
    cons: [
      'Cost per active AI resolution can accumulate rapidly',
      'Requires clean documentation articles beforehand to achieve high resolution'
    ],
    affiliateUrl: 'https://www.intercom.com',
    badge: 'Enterprise Support Leader',
    alternativeOf: 'Hiring round-the-clock remote help desks'
  },
  {
    id: 'shopify-magic',
    name: 'Shopify Magic',
    category: 'AI for E-commerce',
    description: 'Native AI toolset embedded across Shopify stores to automate custom product specs, rewrite emails, and design high-converting visual banners.',
    pricing: {
      tier: 'Free',
      startingAt: '$0 (Included)',
      freeTrial: false,
    },
    rating: 4.4,
    pros: [
      '100% free and integrated with any Shopify tier',
      'Instant write-ups matching various tones (Sophisticated, Playful, Persuasive)',
      'Automated smart chat responses in Shopify Inbox'
    ],
    cons: [
      'Only accessible within the proprietary Shopify dashboard ecosystem',
      'Lacks advanced standalone catalog batch formatting custom features'
    ],
    affiliateUrl: 'https://shopify.com',
    badge: 'Ecomm Essential',
    alternativeOf: 'Manual catalog writing'
  },
  {
    id: 'brightlocal-ai',
    name: 'BrightLocal AI',
    category: 'AI for Local Businesses',
    description: 'Optimizes Google Business Profiles, tracks regional SEO keywords, and uses AI writers to respond professionally to local client reviews.',
    pricing: {
      tier: 'Paid',
      startingAt: '$39/mo',
      freeTrial: true,
    },
    rating: 4.6,
    pros: [
      'Specialized focus on local map packs and physical SEO ranking',
      'Generates automated review responder drafts matching user emotion',
      'Monitors competitor visual grid rankings accurately'
    ],
    cons: [
      'Interface dashboard has many panels and looks busy for first-timers',
      'Main structural focus is localized physical businesses rather than digital'
    ],
    affiliateUrl: 'https://www.brightlocal.com',
    badge: 'Local Maps MVP',
    alternativeOf: 'Paying local marketing agencies massive monthly audits'
  },
  {
    id: 'descript',
    name: 'Descript AI',
    category: 'AI Content Creation',
    description: 'Video and audio editing suite as simple as editing a text transcript. Auto-strips filler words (um, ah) and creates digital voice clones.',
    pricing: {
      tier: 'Freemium',
      startingAt: '$12/mo',
      freeTrial: true,
    },
    rating: 4.8,
    pros: [
      'Editing transcription instantly updates physical media cuts',
      'Overdub tool allows inserting spoken phrases using AI clone of your voice',
      'Studio Sound cancels all surrounding background noise in one action'
    ],
    cons: [
      'High system application memory usage on localized exports',
      'Transcription parsing requires manual spelling checks on complex phrases'
    ],
    affiliateUrl: 'https://www.descript.com',
    badge: 'Creator Choice',
    alternativeOf: 'Premium editing software lines'
  },
  {
    id: 'surfer-seo',
    name: 'Surfer SEO',
    category: 'AI Marketing Tools',
    description: 'An analytical SEO workflow mapping keyword hubs, structural article skeletons, and providing real-time relevance metrics for high rank placement.',
    pricing: {
      tier: 'Paid',
      startingAt: '$89/mo',
      freeTrial: false,
    },
    rating: 4.7,
    pros: [
      'Excellent content-score engine grading keywords, structures, and images',
      'Competitor audit reports matching real SERP results in under 5 minutes',
      'Surfer AI write tool creates article draft fully optimized for keywords'
    ],
    cons: [
      'Expensive plans for individual blog starts',
      'Sometimes encourages word stuffing if scores are chased blindly'
    ],
    affiliateUrl: 'https://surferseo.com',
    badge: 'Best For SEO Bloggers',
    alternativeOf: 'Manual keyword extraction from page sources'
  }
];

export const CATEGORIES_LIST = [
  'AI Marketing Tools',
  'AI Content Creation',
  'AI Productivity',
  'AI Customer Support',
  'AI Sales Tools',
  'AI Automation',
  'AI for E-commerce',
  'AI for Local Businesses'
];
