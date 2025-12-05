
export interface University {
  id: string;
  name: string;
  city: string;
  rating: number;
  image: string;
  description: string;
  founded: number;
  studentCount: string;
  ranking: number;
  partners: number;
  grantScore: number;
  cost: number;
  specialtiesCount: number;
  coordinates: { x: number; y: number };
  mapLink: string;
  gallery: string[];
}

export interface Review {
  id: string;
  user: string;
  avatar: string;
  role: string;
  rating: number;
  comment: string;
}

export interface Landmark {
  id: string;
  name: string;
  type: 'park' | 'mall' | 'attraction' | 'transport';
  coordinates: { x: number; y: number };
  image: string; // Added image support for landmarks
}

export type UserRole = 'user' | 'employee' | 'admin';

export enum TabType {
  ABOUT = 'about',
  PROGRAMS = 'programs',
  ADMISSION = 'admission',
  REVIEWS = 'reviews',
}
