import { University, Landmark } from './types';
import { IMAGES } from './images';

// Coordinates System: 0-1000 (X), 0-800 (Y)
// Based on realistic Almaty layout approximation
export const universities: University[] = [
  {
    id: '1',
    name: 'Nazarbayev University',
    city: 'Astana',
    rating: 4.9,
    image: IMAGES.universities.nazarbayev.main,
    description: 'Флагман высшего образования в Казахстане. Исследовательский университет с международными стандартами.',
    founded: 2010,
    studentCount: '7,000+',
    ranking: 1,
    partners: 100,
    grantScore: 135,
    cost: 3000000,
    specialtiesCount: 50,
    coordinates: { x: 50, y: 50 }, // Not shown on Almaty map
    mapLink: 'https://goo.gl/maps/abc', // Example
    gallery: IMAGES.universities.nazarbayev.gallery
  },
  {
    id: '2',
    name: 'Al-Farabi KazNU',
    city: 'Almaty',
    rating: 4.8,
    image: IMAGES.universities.kaznu.main,
    description: 'Ведущий классический университет. Огромный кампус "КазГУград" на Тимирязева.',
    founded: 1934,
    studentCount: '25,000+',
    ranking: 2,
    partners: 400,
    grantScore: 120,
    cost: 1200000,
    specialtiesCount: 180,
    // Located near Timiryazev/Esentai
    coordinates: { x: 420, y: 600 }, 
    mapLink: 'https://goo.gl/maps/kaznu',
    gallery: IMAGES.universities.kaznu.gallery
  },
  {
    id: '3',
    name: 'Satbayev University',
    city: 'Almaty',
    rating: 4.7,
    image: IMAGES.universities.satbayev.main,
    description: 'Главный технический вуз страны. Политех.',
    founded: 1934,
    studentCount: '15,000+',
    ranking: 4,
    partners: 150,
    grantScore: 110,
    cost: 1100000,
    specialtiesCount: 150,
    // Satpayev / Baitursynov
    coordinates: { x: 550, y: 520 },
    mapLink: 'https://goo.gl/maps/satbayev',
    gallery: IMAGES.universities.satbayev.gallery
  },
  {
    id: '4',
    name: 'L.N. Gumilyov ENU',
    city: 'Astana',
    rating: 4.6,
    image: IMAGES.universities.enu.main,
    description: 'Евразийский национальный университет имени Л.Н. Гумилева.',
    founded: 1996,
    studentCount: '20,000+',
    ranking: 3,
    partners: 200,
    grantScore: 115,
    cost: 950000,
    specialtiesCount: 200,
    coordinates: { x: 50, y: 50 }, // Astana
    mapLink: 'https://goo.gl/maps/enu',
    gallery: IMAGES.universities.enu.gallery
  },
  {
    id: '5',
    name: 'KBTU',
    city: 'Almaty',
    rating: 4.7,
    image: IMAGES.universities.kbtu.main,
    description: 'Казахстанско-Британский технический университет. Здание бывшего правительства.',
    founded: 2001,
    studentCount: '5,000+',
    ranking: 5,
    partners: 80,
    grantScore: 125,
    cost: 1800000,
    specialtiesCount: 40,
    // Tole Bi / Abylai Khan
    coordinates: { x: 570, y: 350 },
    mapLink: 'https://goo.gl/maps/kbtu',
    gallery: IMAGES.universities.kbtu.gallery
  }
];

export const landmarks: Landmark[] = [
  {
    id: 'l1',
    name: 'Esentai Mall',
    type: 'mall',
    coordinates: { x: 490, y: 680 }, // Al-Farabi
    image: IMAGES.landmarks.esentai
  },
  {
    id: 'l2',
    name: 'Kok Tobe',
    type: 'attraction',
    coordinates: { x: 800, y: 500 }, // East mountains
    image: IMAGES.landmarks.koktobe
  },
  {
    id: 'l3',
    name: 'Medeu',
    type: 'attraction',
    coordinates: { x: 880, y: 750 }, // Far south-east
    image: IMAGES.landmarks.medeu
  },
  {
    id: 'l4',
    name: 'Mega Alma-Ata',
    type: 'mall',
    coordinates: { x: 320, y: 620 }, // Rozybakiev
    image: IMAGES.landmarks.mega
  }
];