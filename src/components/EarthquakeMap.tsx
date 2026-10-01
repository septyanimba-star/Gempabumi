import { motion } from 'framer-motion';
import { Earthquake, getSeverityColor } from '../data/earthquakes';

interface EarthquakeMapProps {
  earthquakes: Earthquake[];
  onSelectQuake: (quake: Earthquake) => void;
}

export default function EarthquakeMap({ earthquakes, onSelectQuake }: EarthquakeMapProps) {
  // Indonesia approximate bounding box for mapping
  // Lat: -11 to 6, Lng: 95 to 141
  const mapBounds = {
    minLat: -11,
    maxLat: 6,
    minLng: 95,
    maxLng: 141
  };

  const toMapCoords = (lat: number, lng: number) => {
    const x = ((lng - mapBounds.minLng) / (mapBounds.maxLng - mapBounds.minLng)) * 100;
    const y = ((mapBounds.maxLat - lat) / (mapBounds.maxLat - mapBounds.minLat)) * 100;
    return { x: Math.max(2, Math.min(98, x)), y: Math.max(2, Math.min(98, y)) };
  };

  return (
    <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-4 h-full min-h-[350px]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-sm flex items-center gap-2">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          Peta Gempa Terkini
        </h3>
        <span className="text-xs text-gray-500">{earthquakes.length} gempa tercatat</span>
      </div>
      
      <div className="relative w-full h-[300px] bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/50">
        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Indonesia simplified outline (SVG path approximation) */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Sumatra */}
          <path
            d="M 5,25 L 8,28 L 10,35 L 13,42 L 16,48 L 18,52 L 20,55 L 18,50 L 15,43 L 12,36 L 9,30 L 7,26 Z"
            fill="rgba(34, 197, 94, 0.15)"
            stroke="rgba(34, 197, 94, 0.3)"
            strokeWidth="0.3"
          />
          {/* Java */}
          <path
            d="M 22,62 L 28,63 L 34,64 L 40,64 L 44,63 L 42,65 L 36,66 L 30,65 L 24,64 Z"
            fill="rgba(34, 197, 94, 0.15)"
            stroke="rgba(34, 197, 94, 0.3)"
            strokeWidth="0.3"
          />
          {/* Kalimantan */}
          <path
            d="M 30,30 L 38,28 L 45,30 L 48,35 L 46,42 L 42,48 L 36,50 L 32,45 L 28,38 L 29,33 Z"
            fill="rgba(34, 197, 94, 0.15)"
            stroke="rgba(34, 197, 94, 0.3)"
            strokeWidth="0.3"
          />
          {/* Sulawesi */}
          <path
            d="M 52,30 L 55,28 L 58,32 L 56,38 L 58,42 L 55,45 L 52,40 L 50,35 L 51,32 Z"
            fill="rgba(34, 197, 94, 0.15)"
            stroke="rgba(34, 197, 94, 0.3)"
            strokeWidth="0.3"
          />
          {/* Papua */}
          <path
            d="M 72,30 L 80,28 L 88,30 L 92,35 L 90,42 L 85,48 L 78,50 L 72,45 L 70,38 L 71,33 Z"
            fill="rgba(34, 197, 94, 0.15)"
            stroke="rgba(34, 197, 94, 0.3)"
            strokeWidth="0.3"
          />
          {/* Maluku */}
          <path
            d="M 62,38 L 65,36 L 68,38 L 66,42 L 63,44 L 61,41 Z"
            fill="rgba(34, 197, 94, 0.15)"
            stroke="rgba(34, 197, 94, 0.3)"
            strokeWidth="0.3"
          />
          {/* Nusa Tenggara */}
          <path
            d="M 46,65 L 50,64 L 54,65 L 58,64 L 62,65 L 60,67 L 54,67 L 48,67 Z"
            fill="rgba(34, 197, 94, 0.15)"
            stroke="rgba(34, 197, 94, 0.3)"
            strokeWidth="0.3"
          />
        </svg>

        {/* Earthquake markers */}
        {earthquakes.map((quake) => {
          const coords = toMapCoords(quake.coordinates.lat, quake.coordinates.lng);
          const size = Math.max(8, quake.magnitude * 3);
          
          return (
            <motion.div
              key={quake.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="absolute cursor-pointer group"
              style={{
                left: `${coords.x}%`,
                top: `${coords.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => onSelectQuake(quake)}
            >
              {/* Pulse ring */}
              {quake.severity === 'critical' || quake.severity === 'major' ? (
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    width: size * 2.5,
                    height: size * 2.5,
                    left: -(size * 2.5 - size) / 2,
                    top: -(size * 2.5 - size) / 2,
                    border: `2px solid ${getSeverityColor(quake.severity)}`,
                    opacity: 0.3
                  }}
                  animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
              ) : null}
              
              {/* Main dot */}
              <div
                className="rounded-full shadow-lg"
                style={{
                  width: size,
                  height: size,
                  backgroundColor: getSeverityColor(quake.severity),
                  boxShadow: `0 0 ${size}px ${getSeverityColor(quake.severity)}80`
                }}
              />
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 whitespace-nowrap shadow-xl">
                  <p className="text-xs font-bold">{quake.location}</p>
                  <p className="text-xs text-gray-400">M{quake.magnitude} | {quake.depth} km</p>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Legend */}
        <div className="absolute bottom-2 left-2 bg-gray-900/90 rounded-lg p-2 border border-gray-700/50">
          <p className="text-[10px] text-gray-400 mb-1 font-medium">Magnitudo</p>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="text-[9px] text-gray-500">&lt;5</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full" />
              <span className="text-[9px] text-gray-500">5-6</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-orange-500 rounded-full" />
              <span className="text-[9px] text-gray-500">6-7</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3.5 h-3.5 bg-red-500 rounded-full" />
              <span className="text-[9px] text-gray-500">&gt;7</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
