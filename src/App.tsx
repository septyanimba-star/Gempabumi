import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Activity, MapPin, Clock, Waves, Shield, Bell, ChevronRight, BarChart3 } from 'lucide-react';
import { recentEarthquakes, getSeverityColor, getSeverityLabel, formatTime, Earthquake } from './data/earthquakes';
import EarthquakeMap from './components/EarthquakeMap';
import StatsPanel from './components/StatsPanel';

function App() {
  const [selectedQuake, setSelectedQuake] = useState<Earthquake | null>(null);
  const [showNotification, setShowNotification] = useState(false);
  const [latestQuake, setLatestQuake] = useState<Earthquake>(recentEarthquakes[0]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Simulate notification for critical earthquake
    const criticalQuake = recentEarthquakes.find(q => q.severity === 'critical');
    if (criticalQuake) {
      setTimeout(() => {
        setShowNotification(true);
        setLatestQuake(criticalQuake);
      }, 2000);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Notification Banner */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-50 bg-red-600 border-b-2 border-red-400 shadow-2xl"
          >
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
                transition={{ repeat: Infinity, duration: 0.5, repeatDelay: 2 }}
              >
                <AlertTriangle className="w-6 h-6 text-yellow-300" />
              </motion.div>
              <div className="flex-1">
                <p className="font-bold text-sm md:text-base">⚠️ PERINGATAN DINI GEMPA BUMI</p>
                <p className="text-xs md:text-sm text-red-100">
                  Gempa M{latestQuake.magnitude} - {latestQuake.location} | Kedalaman {latestQuake.depth} km
                  {latestQuake.tsunami && ' | ⚠️ POTENSI TSUNAMI'}
                </p>
              </div>
              <button
                onClick={() => setShowNotification(false)}
                className="text-white/70 hover:text-white text-xl font-bold px-2"
              >
                ×
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                  Gempa Bumi Indonesia
                </h1>
                <p className="text-xs text-gray-400">Sistem Peringatan Dini</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
                <Clock className="w-4 h-4" />
                <span>{currentTime.toLocaleTimeString('id-ID')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-orange-400" />
                <span className="hidden md:inline text-sm text-gray-300">Notif Aktif</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Current Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="bg-gradient-to-r from-red-950/50 to-orange-950/50 border border-red-800/50 rounded-2xl p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-16 h-16 md:w-20 md:h-20 bg-red-600/20 border-2 border-red-500 rounded-full flex items-center justify-center"
                >
                  <span className="text-2xl md:text-3xl font-bold text-red-400">
                    {latestQuake.magnitude}
                  </span>
                </motion.div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 bg-red-600/30 text-red-300 text-xs font-bold rounded-full border border-red-500/50">
                      {getSeverityLabel(latestQuake.severity)}
                    </span>
                    {latestQuake.tsunami && (
                      <span className="px-2 py-0.5 bg-blue-600/30 text-blue-300 text-xs font-bold rounded-full border border-blue-500/50 flex items-center gap-1">
                        <Waves className="w-3 h-3" /> TSUNAMI
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg md:text-xl font-bold">{latestQuake.location}</h2>
                  <p className="text-sm text-gray-400">
                    Kedalaman: {latestQuake.depth} km | Dirasakan: {latestQuake.felt}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatTime(latestQuake.timestamp)}
                  </p>
                </div>
              </div>
              <div className="md:ml-auto flex gap-2">
                <button className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Lihat Detail
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <EarthquakeMap
              earthquakes={recentEarthquakes}
              onSelectQuake={setSelectedQuake}
            />
          </div>
          <div>
            <StatsPanel earthquakes={recentEarthquakes} />
          </div>
        </div>

        {/* Earthquake List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-orange-400" />
            <h2 className="text-lg font-bold">Notifikasi Gempa Terbaru</h2>
          </div>
          <div className="space-y-3">
            {recentEarthquakes.map((quake, index) => (
              <motion.div
                key={quake.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedQuake(quake)}
                className="bg-gray-900/60 border border-gray-800 rounded-xl p-4 hover:border-gray-700 cursor-pointer transition-all hover:bg-gray-900/80 group"
              >
                <div className="flex items-center gap-4">
                  {/* Magnitude Badge */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${getSeverityColor(quake.severity)}20`, border: `1px solid ${getSeverityColor(quake.severity)}50` }}
                  >
                    <span className="text-lg font-bold" style={{ color: getSeverityColor(quake.severity) }}>
                      {quake.magnitude}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
                      <h3 className="font-medium text-sm md:text-base truncate">{quake.location}</h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
                      <span>Kedalaman: {quake.depth} km</span>
                      <span>•</span>
                      <span>{formatTime(quake.timestamp)}</span>
                      {quake.tsunami && (
                        <>
                          <span>•</span>
                          <span className="text-blue-400 flex items-center gap-1">
                            <Waves className="w-3 h-3" /> Tsunami
                          </span>
                        </>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{quake.felt}</p>
                  </div>

                  {/* Severity Label */}
                  <div className="hidden md:flex flex-col items-end gap-1">
                    <span
                      className="px-2 py-0.5 text-xs font-bold rounded-full"
                      style={{ backgroundColor: `${getSeverityColor(quake.severity)}20`, color: getSeverityColor(quake.severity) }}
                    >
                      {getSeverityLabel(quake.severity)}
                    </span>
                    <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
            <h3 className="font-bold text-sm text-orange-400 mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4" /> Tips Keselamatan
            </h3>
            <ul className="text-xs text-gray-400 space-y-1.5">
              <li>• Berlindung di bawah meja yang kokoh</li>
              <li>• Jauhi jendela dan benda yang bisa jatuh</li>
              <li>• Jika di luar, jauhi gedung tinggi</li>
              <li>• Siapkan tas darurat di rumah</li>
            </ul>
          </div>
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
            <h3 className="font-bold text-sm text-blue-400 mb-2 flex items-center gap-2">
              <Waves className="w-4 h-4" /> Peringatan Tsunami
            </h3>
            <ul className="text-xs text-gray-400 space-y-1.5">
              <li>• Gempa &gt;7 SR di laut bisa memicu tsunami</li>
              <li>• Segera pindah ke dataran tinggi</li>
              <li>• Jauhi pantai minimal 1 km</li>
              <li>• Ikuti arahan BMKG dan pemerintah</li>
            </ul>
          </div>
          <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5">
            <h3 className="font-bold text-sm text-green-400 mb-2 flex items-center gap-2">
              <Activity className="w-4 h-4" /> Skala MMI
            </h3>
            <ul className="text-xs text-gray-400 space-y-1.5">
              <li>• I-II: Tidak terasa</li>
              <li>• III-IV: Terasa ringan</li>
              <li>• V-VI: Cukup kuat, benda bergoyang</li>
              <li>• VII+: Kuat, kerusakan bangunan</li>
            </ul>
          </div>
        </motion.div>
      </main>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedQuake && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedQuake(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Detail Gempa</h3>
                <button
                  onClick={() => setSelectedQuake(null)}
                  className="text-gray-400 hover:text-white text-xl"
                >
                  ×
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div
                    className="w-20 h-20 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${getSeverityColor(selectedQuake.severity)}20`, border: `2px solid ${getSeverityColor(selectedQuake.severity)}` }}
                  >
                    <span className="text-3xl font-bold" style={{ color: getSeverityColor(selectedQuake.severity) }}>
                      {selectedQuake.magnitude}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-lg">{selectedQuake.location}</p>
                    <span
                      className="inline-block px-2 py-0.5 text-xs font-bold rounded-full mt-1"
                      style={{ backgroundColor: `${getSeverityColor(selectedQuake.severity)}20`, color: getSeverityColor(selectedQuake.severity) }}
                    >
                      {getSeverityLabel(selectedQuake.severity)}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Kedalaman</p>
                    <p className="font-bold">{selectedQuake.depth} km</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Koordinat</p>
                    <p className="font-bold text-sm">{selectedQuake.coordinates.lat.toFixed(2)}, {selectedQuake.coordinates.lng.toFixed(2)}</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Waktu</p>
                    <p className="font-bold text-sm">{new Date(selectedQuake.timestamp).toLocaleString('id-ID')}</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Tsunami</p>
                    <p className={`font-bold ${selectedQuake.tsunami ? 'text-blue-400' : 'text-green-400'}`}>
                      {selectedQuake.tsunami ? '⚠️ Ya' : '✓ Tidak'}
                    </p>
                  </div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Intensitas Dirasakan</p>
                  <p className="font-bold">{selectedQuake.felt}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs text-gray-500">
            © 2026 Gempa Bumi Indonesia - Sistem Peringatan Dini | Data simulasi untuk demonstrasi
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Sumber data referensi: BMKG (Badan Meteorologi, Klimatologi, dan Geofisika)
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
