export interface Earthquake {
  id: string;
  magnitude: number;
  depth: number;
  location: string;
  coordinates: { lat: number; lng: number };
  timestamp: string;
  felt: string;
  tsunami: boolean;
  severity: 'minor' | 'moderate' | 'major' | 'critical';
}

export const recentEarthquakes: Earthquake[] = [
  {
    id: '1',
    magnitude: 6.2,
    depth: 10,
    location: 'Manado, Sulawesi Utara',
    coordinates: { lat: 1.47, lng: 124.82 },
    timestamp: '2026-01-15T08:23:45Z',
    felt: 'IV-V MMI (Cukup Kuat)',
    tsunami: false,
    severity: 'major'
  },
  {
    id: '2',
    magnitude: 5.4,
    depth: 35,
    location: 'Jayapura, Papua',
    coordinates: { lat: -2.53, lng: 140.72 },
    timestamp: '2026-01-15T06:12:30Z',
    felt: 'III-IV MMI (Lemah)',
    tsunami: false,
    severity: 'moderate'
  },
  {
    id: '3',
    magnitude: 7.1,
    depth: 15,
    location: 'Banda Aceh, Aceh',
    coordinates: { lat: 5.55, lng: 95.32 },
    timestamp: '2026-01-14T22:45:10Z',
    felt: 'VI-VII MMI (Kuat)',
    tsunami: true,
    severity: 'critical'
  },
  {
    id: '4',
    magnitude: 4.8,
    depth: 50,
    location: 'Yogyakarta, DIY',
    coordinates: { lat: -7.80, lng: 110.36 },
    timestamp: '2026-01-14T18:30:00Z',
    felt: 'II-III MMI (Tidak Dirasakan)',
    tsunami: false,
    severity: 'minor'
  },
  {
    id: '5',
    magnitude: 5.9,
    depth: 25,
    location: 'Mataram, Nusa Tenggara Barat',
    coordinates: { lat: -8.58, lng: 116.10 },
    timestamp: '2026-01-14T14:15:22Z',
    felt: 'IV MMI (Sederhana)',
    tsunami: false,
    severity: 'moderate'
  },
  {
    id: '6',
    magnitude: 6.5,
    depth: 20,
    location: 'Ambon, Maluku',
    coordinates: { lat: -3.69, lng: 128.18 },
    timestamp: '2026-01-14T10:05:33Z',
    felt: 'V-VI MMI (Kuat)',
    tsunami: false,
    severity: 'major'
  },
  {
    id: '7',
    magnitude: 4.2,
    depth: 60,
    location: 'Bandung, Jawa Barat',
    coordinates: { lat: -6.92, lng: 107.61 },
    timestamp: '2026-01-13T20:45:00Z',
    felt: 'II MMI (Tidak Dirasakan)',
    tsunami: false,
    severity: 'minor'
  },
  {
    id: '8',
    magnitude: 5.1,
    depth: 40,
    location: 'Padang, Sumatera Barat',
    coordinates: { lat: -0.95, lng: 100.35 },
    timestamp: '2026-01-13T16:30:15Z',
    felt: 'III-IV MMI (Lemah)',
    tsunami: false,
    severity: 'moderate'
  },
  {
    id: '9',
    magnitude: 6.8,
    depth: 12,
    location: 'Biak, Papua',
    coordinates: { lat: -1.05, lng: 136.00 },
    timestamp: '2026-01-13T12:00:00Z',
    felt: 'V-VI MMI (Kuat)',
    tsunami: true,
    severity: 'major'
  },
  {
    id: '10',
    magnitude: 4.5,
    depth: 45,
    location: 'Makassar, Sulawesi Selatan',
    coordinates: { lat: -5.13, lng: 119.41 },
    timestamp: '2026-01-13T08:20:00Z',
    felt: 'II-III MMI (Tidak Dirasakan)',
    tsunami: false,
    severity: 'minor'
  }
];

export const getSeverityColor = (severity: string): string => {
  switch (severity) {
    case 'critical': return '#dc2626';
    case 'major': return '#ea580c';
    case 'moderate': return '#ca8a04';
    case 'minor': return '#16a34a';
    default: return '#6b7280';
  }
};

export const getSeverityLabel = (severity: string): string => {
  switch (severity) {
    case 'critical': return 'KRITIS';
    case 'major': return 'BESAR';
    case 'moderate': return 'SEDANG';
    case 'minor': return 'RINGAN';
    default: return 'TIDAK DIKETAHUI';
  }
};

export const formatTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffHours < 1) return 'Baru saja';
  if (diffHours < 24) return `${diffHours} jam lalu`;
  return `${diffDays} hari lalu`;
};
