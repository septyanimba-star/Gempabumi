import { motion } from 'framer-motion';
import { Earthquake, getSeverityColor } from '../data/earthquakes';
import { TrendingUp, AlertTriangle, Waves, Activity } from 'lucide-react';

interface StatsPanelProps {
  earthquakes: Earthquake[];
}

export default function StatsPanel({ earthquakes }: StatsPanelProps) {
  const maxMagnitude = Math.max(...earthquakes.map(q => q.magnitude));
  const avgMagnitude = (earthquakes.reduce((sum, q) => sum + q.magnitude, 0) / earthquakes.length).toFixed(1);
  const tsunamiCount = earthquakes.filter(q => q.tsunami).length;
  const criticalCount = earthquakes.filter(q => q.severity === 'critical' || q.severity === 'major').length;

  const magnitudeDistribution = [
    { label: '< 4.5', count: earthquakes.filter(q => q.magnitude < 4.5).length, color: '#16a34a' },
    { label: '4.5-5.5', count: earthquakes.filter(q => q.magnitude >= 4.5 && q.magnitude < 5.5).length, color: '#ca8a04' },
    { label: '5.5-6.5', count: earthquakes.filter(q => q.magnitude >= 5.5 && q.magnitude < 6.5).length, color: '#ea580c' },
    { label: '> 6.5', count: earthquakes.filter(q => q.magnitude >= 6.5).length, color: '#dc2626' },
  ];

  return (
    <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-4 h-full">
      <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
        <Activity className="w-4 h-4 text-orange-400" />
        Statistik Gempa
      </h3>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800/50 rounded-xl p-3 border border-gray-700/30"
        >
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-red-400" />
            <span className="text-[10px] text-gray-500 uppercase tracking-wide">Max Magnitudo</span>
          </div>
          <p className="text-xl font-bold text-red-400">{maxMagnitude}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 rounded-xl p-3 border border-gray-700/30"
        >
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-[10px] text-gray-500 uppercase tracking-wide">Rata-rata</span>
          </div>
          <p className="text-xl font-bold text-orange-400">{avgMagnitude}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gray-800/50 rounded-xl p-3 border border-gray-700/30"
        >
          <div className="flex items-center gap-2 mb-1">
            <Waves className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-[10px] text-gray-500 uppercase tracking-wide">Tsunami</span>
          </div>
          <p className="text-xl font-bold text-blue-400">{tsunamiCount}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800/50 rounded-xl p-3 border border-gray-700/30"
        >
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-3.5 h-3.5 text-yellow-400" />
            <span className="text-[10px] text-gray-500 uppercase tracking-wide">Besar/Kritis</span>
          </div>
          <p className="text-xl font-bold text-yellow-400">{criticalCount}</p>
        </motion.div>
      </div>

      {/* Magnitude Distribution */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-2 font-medium">Distribusi Magnitudo</p>
        <div className="space-y-2">
          {magnitudeDistribution.map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span className="text-[10px] text-gray-400 w-12">{item.label}</span>
              <div className="flex-1 h-4 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.count / earthquakes.length) * 100}%` }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: item.color }}
                />
              </div>
              <span className="text-[10px] text-gray-400 w-4 text-right">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <p className="text-xs text-gray-500 mb-2 font-medium">Aktivitas Terakhir</p>
        <div className="space-y-1.5">
          {earthquakes.slice(0, 4).map((quake) => (
            <div key={quake.id} className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: getSeverityColor(quake.severity) }}
              />
              <span className="text-[10px] text-gray-400 truncate flex-1">
                M{quake.magnitude} - {quake.location.split(',')[0]}
              </span>
              <span className="text-[10px] text-gray-600">{quake.depth}km</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
