// export type TProject = {
//   _id?: string;
//   title: string;
//   descriptions: string;
//   liveLink: string;
//   image?: string;
//   githubClient?: string;
//   githubServer?: string;
//   techStack?: string[];
//   features?: string[];
//   category?: string;
//   isTeamProject?: boolean;
//   contributors?: string[];
//   videoDemo?: string;
//   createdAt: string;
//   updatedAt: string;
// };

import { TProject } from "@/components/dashboardComponents/projects/projectSchema";

export type TProjects = {
  _id?: string;
  pName: string;
  pTitle: string;
  pDescription?: string;
  pLogoLink?: string;
  pLiveClientLink?: string;
  pLiveServerLink?: string;
  pClientRepoLink?: string;
  pServerRepoLink?: string;
  pOverviewVideoLink?: string[];
  pImageLink?: string[];
  pTechStack?: string[];
  pCategory?: ProjectCategory;
  pVisibility?: ProjectVisibility;
  pPricingType?: ProjectPricingType;
  pType?: TWebsiteType;
  pFeatures?: TProjectFeature[];
  pContributors?: TPContributors[];
  pReviewAvgRating?: string;
  pReviews?: string[];
  createdAt?: string;
  updatedAt?: string;
};

// Project Feature Type
export type TProjectFeature = {
  pFeatureTitle?: string;
  pFeatureDescriptions?: string[];
  pFeaturesDescriptionWithTitle?: TProjectDescriptionTitle[];
};

// Project description Title Type
export type TProjectDescriptionTitle = {
  pDescriptionTitle?: string;
  pDescriptionPoints?: string;
};

// Project Category Enum
export enum ProjectCategory {
  FEATURE = "Feature",
  RECENT = "Recent",
  UPCOMING = "Upcoming",
  ALFA = "Alfa",
  SUBSCRIPTION = "Subscription",
}

// Project Visibility Enum
export enum ProjectVisibility {
  PUBLIC = "Public",
  PRIVATE = "Private",
}

// Project Pricing Type Enum
export enum ProjectPricingType {
  FREE = "Free",
  PAID = "Paid",
}

// Contibutor type
export type TPContributors = {
  name?: string;
  role?: string;
  profileLink?: string;
  portfolioLink?: string;
  gitHubLink?: string;
};

// Project review type
export type TProjectReview = {
  reviewerName?: string;
  reating?: string;
  reviewText?: string;
  reviewDate?: string;
};

// Project Type Enum
export enum TWebsiteType {
  BUSINESS_CORPORATE = "Business & Corporate",
  ECOMMERCE = "E-Commerce",
  BLOG_NEWS = "Blog & News",
  PORTFOLIO_PERSONAL = "Portfolio & Personal",
  EDUCATION = "Education",
  HEALTH_MEDICAL = "Health & Medical",
  REAL_ESTATE = "Real Estate",
  FOOD_RESTAURANT = "Food & Restaurant",
  MEDIA_ENTERTAINMENT = "MEDIA & Entertainment",
  SOCIAL_COMMUNITY = "Social & Community",
  JOB_CAREER = "Job & Career",
  FINANCE = "Finance",
  TRAVEL_HOSPITALITY = "Travel & Hospitality",
  TOOLS_SAAS = "Tools & SaaS",
  GOVERNMENT_NONPROFIT = "Government & Non-Profit",
  RELIGIOUS_CULTURAL = "Religious & Cultural",
  TECHNOLOGY = "Technology & IT",
  SPORTS_FITNESS = "Sports & Fitness",
  BEAUTY_FASHION = "Beauty & Fashion",
  ART_DESIGN = "Art & Design",
  EVENT_CONFERENCE = "Event & Conference",
  NON_PROFIT = "Non-Profit",
}

export const defaultProjectValues: TProject = {
  pName: "",
  pTitle: "",
  pDescription: "",
  pLogoLink: undefined, // <-- empty string নয়
  pLiveClientLink: undefined, // <-- empty string নয়
  pLiveServerLink: undefined,
  pClientRepoLink: undefined,
  pServerRepoLink: undefined,

  pOverviewVideoLink: [],
  pImageLink: [],
  pTechStack: [],
  pCategory: undefined,
  pVisibility: undefined,
  pPricingType: undefined,
  pType: undefined,
  pFeatures: [],
  pContributors: [],
  pReviewAvgRating: "",
  pReviews: [],
};

// extra feture

export const PROJECTCATEGORIES = [
  { label: "FEATURE", value: "Feature" },
  { label: "RECENT", value: "Recent" },
  { label: "UPCOMING", value: "Upcoming" },
  { label: "ALFA", value: "Alfa" },
  { label: "SUBSCRIPTION", value: "Subscription" },
] as const;

export const PROJECTVSISIVILITY = [
  { label: "PUBLIC", value: "Public" },
  { label: "PRIVATE", value: "Private" },
] as const;

export const PROJECTPRICING = [
  { label: "FREE", value: "Free" },
  { label: "PAID", value: "Paid" },
] as const;

export const WEBSITE_TYPE_OPTIONS = [
  { label: "BUSINESS_CORPORATE", value: "Business & Corporate" },
  { label: "ECOMMERCE", value: "E-Commerce" },
  { label: "BLOG_NEWS", value: "Blog & News" },
  { label: "PORTFOLIO_PERSONAL", value: "Portfolio & Personal" },
  { label: "EDUCATION", value: "Education" },
  { label: "HEALTH_MEDICAL", value: "Health & Medical" },
  { label: "REAL_ESTATE", value: "Real Estate" },
  { label: "FOOD_RESTAURANT", value: "Food & Restaurant" },
  { label: "MEDIA_ENTERTAINMENT", value: "Media & Entertainment" },
  { label: "SOCIAL_COMMUNITY", value: "Social & Community" },
  { label: "JOB_CAREER", value: "Job & Career" },
  { label: "FINANCE", value: "Finance" },
  { label: "TRAVEL_HOSPITALITY", value: "Travel & Hospitality" },
  { label: "TOOLS_SAAS", value: "Tools & SaaS" },
  { label: "GOVERNMENT_NONPROFIT", value: "Government & Non-Profit" },
  { label: "RELIGIOUS_CULTURAL", value: "Religious & Cultural" },
  { label: "TECHNOLOGY", value: "Technology & IT" },
  { label: "SPORTS_FITNESS", value: "Sports & Fitness" },
  { label: "BEAUTY_FASHION", value: "Beauty & Fashion" },
  { label: "ART_DESIGN", value: "Art & Design" },
  { label: "EVENT_CONFERENCE", value: "Event & Conference" },
  { label: "NON_PROFIT", value: "Non-Profit" },
] as const;
