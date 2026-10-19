export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  videoSrc: string;
  posterSrc: string;
  heroImage?: string;
  year: string;
  duration: string;
  client?: string;
  director?: string;
  cinematographer?: string;
  writer?: string;
  producers?: string;
  cast?: string;
  description: string;
  synopsis?: string;
  tags: string[];
  featured: boolean;
  stills?: string[];
  relatedIds?: string[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  division: string;
  bio: string;
  bioParagraphs?: string[];
  highlights: string[];
  imageSrc: string;
  thumbSrc: string;
  awards?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  category: "Awards" | "Festivals" | "Press" | "Commercials" | "Releases";
  date: string;
  publication: string;
  excerpt: string;
  badge?: string;
  link: string;
}

export interface ContactInquiry {
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  budgetRange?: string;
  message: string;
  createdAt?: string;
}
