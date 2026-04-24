import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Brain, Clock, Zap, Target, TrendingUp, Flame } from 'lucide-react';
import { mockUserProfile, getSmartNudges } from '../lib/engine';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [nudge, setNudge] = useState(null);

  useEffect(() => {
    // Simulate real-time context checking
    const currentHour = new Date().getHours();
    const activeNudge = getSmartNudges(currentHour);
    if (activeNudge) {
      setNudge(activeNudge);
    }
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 space-y-8">
      
      {/* Smart Nudge Alert */}
      {nudge && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-2xl border ${
            nudge.type === 'warning' 
              ? 'bg-amber-500/10 border-amber-500/30 text-amber-200' 
              : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-200'
          } flex items-start gap-4 shadow-lg backdrop-blur-md`}
        >
          <div className={`p-2 rounded-full ${nudge.type === 'warning' ? 'bg-amber-500/20' : 'bg-cyan-500/20'}`}>
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-lg">{nudge.title}</h4>
            <p className="opacity-80 mt-1">{nudge.message}</p>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Health Score Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-1 glass-card p-6 flex flex-col items-center justify-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none" />
          
          <h3 className="text-zinc-400 font-medium mb-6 self-start flex items-center gap-2">
            <Target className="w-4 h-4" /> Health Intelligence Score
          </h3>
          
          <div className="relative w-48 h-48 flex items-center justify-center">
            {/* Animated SVG Circle */}
            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
              <circle
                cx="96" cy="96" r="88"
                className="stroke-zinc-800"
                strokeWidth="12" fill="none"
              />
              <motion.circle
                initial={{ strokeDasharray: "0 1000" }}
                animate={{ strokeDasharray: `${(mockUserProfile.healthScore / 100) * 553} 1000` }}
                transition={{ duration: 2, ease: "easeOut" }}
                cx="96" cy="96" r="88"
                className="stroke-emerald-500"
                strokeWidth="12" fill="none" strokeLinecap="round"
              />
            </svg>
            <div className="text-center z-10">
              <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-400">
                {mockUserProfile.healthScore}
              </span>
              <span className="block text-emerald-400 font-medium mt-1">Excellent</span>
            </div>
          </div>

          <div className="mt-8 w-full grid grid-cols-2 gap-4">
            <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800/50">
              <div className="text-zinc-400 text-sm mb-1 flex items-center gap-1"><Flame className="w-3 h-3 text-orange-500"/> Streak</div>
              <div className="text-xl font-semibold text-white">{mockUserProfile.streak} Days</div>
            </div>
            <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800/50">
              <div className="text-zinc-400 text-sm mb-1 flex items-center gap-1"><TrendingUp className="w-3 h-3 text-emerald-500"/> Trend</div>
              <div className="text-xl font-semibold text-emerald-400">+4%</div>
            </div>
          </div>
        </motion.div>

        {/* Charts & Insights */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Chart Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card p-6 h-[300px] flex flex-col"
          >
            <h3 className="text-zinc-400 font-medium mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4" /> Weekly Decision Quality
            </h3>
            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockUserProfile.weeklyImprovement}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px' }}
                    itemStyle={{ color: '#10b981' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorScore)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Habit Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockUserProfile.habits.map((habit, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + (idx * 0.1) }}
                className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-5 hover:bg-zinc-800/40 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="p-2 bg-zinc-800 rounded-lg">
                    <Clock className="w-4 h-4 text-cyan-400" />
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    habit.frequency === 'High' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {habit.frequency} Freq
                  </span>
                </div>
                <h4 className="text-white font-medium mb-1">{habit.type}</h4>
                <p className="text-zinc-500 text-sm">Detected primarily between <span className="text-zinc-300">{habit.time}</span></p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
