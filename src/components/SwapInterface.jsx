import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, TrendingDown, TrendingUp, AlertTriangle, CheckCircle2, ChevronRight, Activity } from 'lucide-react';
import { analyzeSwapRequest } from '../lib/engine';

export default function SwapInterface() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSwap = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsAnalyzing(true);
    setResult(null);
    
    // Simulate API delay for dramatic effect
    setTimeout(() => {
      setResult(analyzeSwapRequest(query));
      setIsAnalyzing(false);
    }, 1200);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="glass-card p-6 md:p-8 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] -z-10" />

        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-3">
            <Activity className="text-emerald-400" />
            Smart Swap Engine
          </h2>
          <p className="text-textSecondary">Tell us what you're craving. We'll find a smarter way to satisfy it.</p>
        </div>

        <form onSubmit={handleSwap} className="relative mb-8">
          <div className="relative flex items-center">
            <Search className="absolute left-4 text-zinc-400 w-6 h-6" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., I want a burger right now..."
              className="w-full bg-zinc-900/50 border border-zinc-700 focus:border-emerald-500/50 rounded-2xl py-4 pl-14 pr-32 text-lg text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
            />
            <button
              type="submit"
              disabled={isAnalyzing || !query.trim()}
              className="absolute right-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white px-6 py-2 rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isAnalyzing ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                  <Activity className="w-5 h-5" />
                </motion.div>
              ) : (
                <>Analyze <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </div>
        </form>

        <AnimatePresence mode="wait">
          {isAnalyzing && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center justify-center py-12"
            >
              <div className="flex flex-col items-center gap-4 text-emerald-400">
                <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
                <p className="text-sm font-medium animate-pulse">Analyzing context & behavioral patterns...</p>
              </div>
            </motion.div>
          )}

          {result && !isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-stretch"
            >
              {/* Original Choice */}
              <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl" />
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white/90">{result.original.name}</h3>
                    <span className="text-sm text-zinc-500 uppercase tracking-wider">{result.original.category}</span>
                  </div>
                  <AlertTriangle className="text-amber-500/80 w-6 h-6" />
                </div>
                
                <div className="space-y-3 mt-6">
                  <div className="flex justify-between items-center py-2 border-b border-zinc-800/50">
                    <span className="text-zinc-400">Calories</span>
                    <span className="font-mono text-zinc-200">{result.original.calories}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-zinc-800/50">
                    <span className="text-zinc-400">Cost</span>
                    <span className="font-mono text-zinc-200">{result.original.cost}</span>
                  </div>
                </div>
              </div>

              {/* Arrow Connector */}
              <div className="hidden md:flex flex-col items-center justify-center px-2">
                <motion.div 
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="bg-zinc-800 p-3 rounded-full border border-zinc-700 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    <ArrowRight className="w-6 h-6 text-emerald-400" />
                  </div>
                </motion.div>
              </div>

              {/* Smart Alternative */}
              <div className="bg-gradient-to-br from-emerald-900/20 to-zinc-900/40 border border-emerald-500/30 rounded-2xl p-6 relative overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-emerald-50">{result.recommendation.name}</h3>
                    <span className="text-sm text-emerald-500/80 uppercase tracking-wider">Smart Swap</span>
                  </div>
                  <CheckCircle2 className="text-emerald-400 w-6 h-6" />
                </div>
                
                <div className="space-y-3 mt-6">
                  <div className="flex justify-between items-center py-2 border-b border-emerald-900/30">
                    <span className="text-zinc-400">Calories</span>
                    <span className="font-mono text-emerald-300 flex items-center gap-1">
                      {result.recommendation.calories}
                      <TrendingDown className="w-3 h-3 text-emerald-500" />
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-emerald-900/30">
                    <span className="text-zinc-400">Impact</span>
                    <span className="text-sm text-emerald-300">{result.recommendation.healthImpact}</span>
                  </div>
                </div>

                <div className="mt-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                  <p className="text-sm text-emerald-100/90 leading-relaxed">
                    <span className="font-semibold block mb-1">Intelligence Insight:</span>
                    {result.recommendation.reason}
                  </p>
                </div>
                
                <button className="w-full mt-6 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-3 rounded-xl transition-colors duration-200 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                  Accept Swap
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
