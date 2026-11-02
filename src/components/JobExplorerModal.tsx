import React, { useState } from 'react';
import { JOB_TRACKS } from '../data/jobs';
import { JobCategory } from '../types';
import { soundManager } from '../utils/audio';
import {
  X,
  Code2,
  Cpu,
  Zap,
  ShieldCheck,
  TrendingUp,
  Briefcase,
  CheckCircle,
  Clock,
  Sparkles,
} from 'lucide-react';

interface JobExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialJobCategory?: JobCategory;
}

export const JobExplorerModal: React.FC<JobExplorerModalProps> = ({
  isOpen,
  onClose,
  initialJobCategory = 'vehicleSw',
}) => {
  const [activeCategory, setActiveCategory] = useState<JobCategory>(initialJobCategory);

  if (!isOpen) return null;

  const currentJob = JOB_TRACKS[activeCategory];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2':
        return <Code2 className="w-5 h-5" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5" />;
      case 'Zap':
        return <Zap className="w-5 h-5" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5" />;
      default:
        return <Briefcase className="w-5 h-5" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                모빌리티 핵심 5대 직무 가이드북
              </h3>
              <p className="text-xs text-slate-400">
                대학생 취업 준비생을 위한 실무 직무 분석 & 로드맵
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation for 5 Jobs */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 p-2 gap-1.5 overflow-x-auto scrollbar-none shrink-0">
          {(Object.keys(JOB_TRACKS) as JobCategory[]).map((catKey) => {
            const track = JOB_TRACKS[catKey];
            const isActive = activeCategory === catKey;
            return (
              <button
                key={catKey}
                onClick={() => {
                  soundManager.playClick();
                  setActiveCategory(catKey);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {getIcon(track.iconName)}
                <span>{track.shortName}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* Track Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 to-slate-900 border border-slate-800 relative overflow-hidden">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${currentJob.badgeColor}`}
              >
                {currentJob.archetype}
              </span>
            </div>
            <h4 className="text-xl sm:text-2xl font-extrabold text-white mb-1">
              {currentJob.title}
            </h4>
            <p className="text-xs sm:text-sm text-cyan-300/90 font-medium mb-3">
              "{currentJob.tagline}"
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentJob.description}
            </p>
          </div>

          {/* Grid: Core Competencies & Key Tools */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Core Competencies */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
              <h5 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                현업 필수 핵심 역량 (Core Skills)
              </h5>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                {currentJob.coreCompetencies.map((comp, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold shrink-0">•</span>
                    <span>{comp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Tools */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
              <h5 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                주요 사용 소프트웨어 & 툴
              </h5>
              <div className="flex flex-wrap gap-2 pt-1">
                {currentJob.keyTools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl text-xs font-mono font-medium bg-slate-800/80 text-cyan-200 border border-slate-700"
                  >
                    {tool}
                  </span>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-800/80 text-xs text-slate-400 flex items-start gap-2">
                <Clock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-300 font-semibold">현업 하루 일과 예시: </span>
                  {currentJob.dayInTheLife}
                </div>
              </div>
            </div>
          </div>

          {/* Top 3 Preparation Tips for College Students */}
          <div className="space-y-3">
            <h5 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              대학생이 지금 준비하면 좋은 3가지 실천 로드맵
            </h5>

            <div className="grid grid-cols-1 gap-3">
              {currentJob.top3PreparationTips.map((tip, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-950/40 border border-slate-800/90 hover:border-cyan-500/30 transition-colors space-y-1.5"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <h6 className="text-xs sm:text-sm font-bold text-slate-200">{tip.title}</h6>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed pl-7">{tip.detail}</p>
                  <div className="pl-7 pt-1">
                    <span className="inline-block px-2 py-0.5 rounded text-[11px] font-medium bg-cyan-950/70 text-cyan-300 border border-cyan-500/20">
                      🎯 실천 액션: {tip.actionItem}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex justify-end shrink-0">
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm transition-all"
          >
            가이드북 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
