import React, { useState, useEffect } from 'react';
import { JobCategory, JobScores, UserChoiceRecord, AIAnalysisReport } from '../types';
import { JOB_TRACKS } from '../data/jobs';
import { RadarChart } from './RadarChart';
import { soundManager } from '../utils/audio';
import {
  Sparkles,
  Award,
  CheckCircle2,
  Share2,
  RotateCcw,
  BookOpen,
  Bot,
  Lightbulb,
  Copy,
  Check,
  Compass,
} from 'lucide-react';

interface FinalReportProps {
  playerName: string;
  scores: JobScores;
  choices: UserChoiceRecord[];
  onPlayAgain: () => void;
  onOpenExplorer: (category?: JobCategory) => void;
}

export const FinalReport: React.FC<FinalReportProps> = ({
  playerName,
  scores,
  choices,
  onPlayAgain,
  onOpenExplorer,
}) => {
  const [copied, setCopied] = useState(false);
  const [isLoadingAI, setIsLoadingAI] = useState(true);
  const [aiReport, setAiReport] = useState<AIAnalysisReport | null>(null);

  // Determine top job category
  const categories: JobCategory[] = [
    'vehicleSw',
    'autonomousAi',
    'electrificationHw',
    'qualitySafety',
    'serviceData',
  ];

  let topJobKey: JobCategory = 'vehicleSw';
  let highestScore = -1;

  for (const cat of categories) {
    if (scores[cat] > highestScore) {
      highestScore = scores[cat];
      topJobKey = cat;
    }
  }

  const topJob = JOB_TRACKS[topJobKey];

  // Pick 2 memorable choices from the gameplay for retrospective
  const pickMemorableChoices = () => {
    if (choices.length === 0) return [];
    // Prioritize events where user made strong impact or pick first & last
    if (choices.length <= 2) return choices;
    // Pick one from day 1~2 and one from day 3~5
    const early = choices.find((c) => c.day <= 2) || choices[0];
    const later = choices.slice().reverse().find((c) => c.day >= 3) || choices[choices.length - 1];
    return [early, later];
  };

  // Generate fallback report if Gemini API is unavailable or offline
  const generateFallbackReport = (): AIAnalysisReport => {
    const memorable = pickMemorableChoices();
    return {
      archetype: topJob.archetype,
      personalizedSummary: `${playerName} 신입사원님은 5일간 넥스트모빌리티의 다양한 위기 상황에서 ${topJob.shortName} 중심의 명확한 기술 철학과 빠른 문제해결력을 입증했습니다. 특히 기술적 이점과 리스크(Trade-off)를 복합적으로 고려하는 균형 감각이 돋보였습니다.`,
      whyFit: `${topJob.title} 직무는 논리적 아키텍처 사고와 ${topJob.shortName}에 대한 깊은 열정을 요구합니다. 플레이어님의 선택 성향은 현업 ${topJob.shortName} 팀의 핵심 인재상과 98% 일치합니다.`,
      top3PreparationTips: topJob.top3PreparationTips,
      retrospectiveHighlights: memorable.map((c) => ({
        eventTitle: c.eventTitle,
        userChoiceText: c.chosenActionText,
        evalComment:
          c.praise ||
          `과제 "${c.eventTitle}"에서 "${c.chosenActionText}"를 선택해 기술적 안정성과 산업 표준을 확보했습니다.`,
        tradeOffNotice:
          c.cons ||
          c.concern ||
          `다만 추가적인 하드웨어 부하, 원가 상승, 일정 조율 등의 현실적 트레이드오프가 수반되었습니다.`,
      })),
      encouragement: `${playerName} 님의 기술적 호기심과 균형 잡힌 엔지니어링 감각이라면 미래 글로벌 모빌리티 혁신의 주역으로 당당히 자리매김할 것입니다!`,
    };
  };

  // Fetch AI Analysis from server
  useEffect(() => {
    soundManager.playCelebration();

    const fetchAnalysis = async () => {
      setIsLoadingAI(true);
      try {
        const memorableChoices = pickMemorableChoices();
        const res = await fetch('/api/analyze-career', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            playerName,
            topJobKey,
            topJobTitle: topJob.title,
            scores,
            choices: memorableChoices,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success && data.analysis) {
            setAiReport(data.analysis);
            setIsLoadingAI(false);
            return;
          }
        }
      } catch (err) {
        console.warn('Using local fallback career analysis:', err);
      }
      // If error or no key, use local fallback
      setAiReport(generateFallbackReport());
      setIsLoadingAI(false);
    };

    fetchAnalysis();
  }, []);

  const report = aiReport || generateFallbackReport();

  const handleShare = () => {
    soundManager.playClick();
    const textToCopy = `[넥스트모빌리티 가상 신입사원 직무 적성 리포트]
신입사원: ${playerName}
나에게 맞는 직무: ${topJob.title}
성향 별칭: ${report.archetype}
모빌리티 신입사원 시뮬레이터에서 내 적성을 찾아보세요!`;

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      })
      .catch(() => {});
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-500 pb-12">
      {/* Top Completion Header */}
      <div className="text-center space-y-2 pt-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold uppercase tracking-wider mb-1">
          <Award className="w-4 h-4 text-cyan-400" />
          5일 인턴십 수료 & 공식 적성 판정서
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          {playerName} 신입사원님을 위한 모빌리티 직무 리포트
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          넥스트모빌리티 10대 실무 프로젝트 의사결정을 기반으로 산출된 맞춤형 분석 결과입니다.
        </p>
      </div>

      {/* Hero: Top Matching Job Card */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/70 border-2 border-cyan-400/60 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-cyan-950/50 overflow-hidden">
        {/* Glow ambient background lights */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/20 border border-cyan-400/40 text-cyan-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
              당신에게 가장 적합한 1순위 직무
            </div>

            <div>
              <div className="text-sm font-semibold text-cyan-300 font-mono">
                {report.archetype}
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
                {topJob.title}
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              "{topJob.tagline}"
            </p>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pt-1">
              {topJob.description}
            </p>
          </div>

          {/* Badge & Quick Stats Pill */}
          <div className="shrink-0 flex flex-col items-center p-6 rounded-2xl bg-slate-950/70 border border-cyan-500/30 shadow-inner">
            <span className="text-xs text-slate-400 mb-1">직무 적합 지수</span>
            <span className="text-4xl sm:text-5xl font-black font-mono text-cyan-400 tracking-tight">
              98<span className="text-xl text-cyan-300 font-normal">%</span>
            </span>
            <span className="text-[11px] text-cyan-300/80 mt-1">최상위 적성 판정</span>

            <button
              onClick={() => onOpenExplorer(topJobKey)}
              className="mt-4 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-semibold flex items-center gap-1 transition-all"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>직무 상세 열람</span>
            </button>
          </div>
        </div>
      </div>

      {/* Radar Chart & Job Tendency Breakdown */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-cyan-400" />
              5개 모빌리티 직무 성향 다이어그램
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              플레이어가 10가지 상황에서 내린 선택지의 누적 직무 성향을 5차원으로 시각화했습니다.
            </p>
          </div>

          <span className="text-xs text-slate-400 font-mono px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 self-start sm:self-center">
            실시간 5대 축 분석
          </span>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 py-2">
          {/* Radar Chart Canvas */}
          <div className="w-full max-w-[380px] flex items-center justify-center">
            <RadarChart scores={scores} size={340} />
          </div>

          {/* Tendency Axis Details */}
          <div className="w-full lg:max-w-xs space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
              직무 영역별 성향 랭킹
            </span>
            {categories
              .slice()
              .sort((a, b) => (scores[b] || 0) - (scores[a] || 0))
              .map((catKey, idx) => {
                const track = JOB_TRACKS[catKey];
                const score = scores[catKey] || 0;
                const isTop = catKey === topJobKey;

                return (
                  <div
                    key={catKey}
                    onClick={() => onOpenExplorer(catKey)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isTop
                        ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-300'
                        : 'bg-slate-950/40 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`w-5 h-5 rounded-md font-mono text-xs font-bold flex items-center justify-center ${
                          isTop ? 'bg-cyan-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold">{track.shortName}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold" style={{ color: track.color }}>
                        {score} pts
                      </span>
                      {isTop && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
                          BEST
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* AI Personalized Comprehensive Feedback (Powered by Gemini API) */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/60 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-xl relative backdrop-blur-md">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  AI 채용 멘토의 심층 맞춤 평가
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Gemini Flash
                </span>
              </div>
              <p className="text-xs text-slate-400">
                실제 5일간의 의사결정 기록을 정밀 분석한 테크 리크루터 피드백
              </p>
            </div>
          </div>

          {isLoadingAI && (
            <span className="text-xs text-indigo-400 flex items-center gap-1.5 font-mono animate-pulse">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              AI 분석 생성 중...
            </span>
          )}
        </div>

        <div className="space-y-4">
          {/* Personalized Summary */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-indigo-500/20 space-y-2">
            <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              5일간의 근무 태도 & 적성 총평
            </span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {report.personalizedSummary}
            </p>
          </div>

          {/* Why Fit */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-cyan-500/20 space-y-2">
            <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-cyan-400" />
              왜 이 직무가 당신에게 최적인가?
            </span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{report.whyFit}</p>
          </div>

          {/* Retrospective on 2 memorable choices */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                인상적이었던 플레이어의 2대 의사결정 심층 회고 (장점 & 주의점)
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                트레이드오프 균형 분석
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {report.retrospectiveHighlights.map((hl, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3 shadow-md"
                >
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      사례 #{idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-200 truncate">
                      {hl.eventTitle}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 font-medium">
                    <strong className="text-slate-400">신입사원의 선택: </strong>
                    {hl.userChoiceText}
                  </p>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-200">
                      <strong className="text-emerald-400 block mb-0.5">👍 탁월했던 점 (Pros):</strong>
                      <span className="leading-relaxed">{hl.evalComment}</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-200">
                      <strong className="text-rose-400 block mb-0.5">⚠️ 주의할 점 & 트레이드오프 (Cons):</strong>
                      <span className="leading-relaxed">
                        {hl.tradeOffNotice ||
                          '현실적인 부품 원가, 일정 지연 가능성 및 후속 검증 비용에 주의해야 합니다.'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top 3 Preparation Roadmap for College Students */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-md space-y-5">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg sm:text-xl font-bold text-white">
              지금 대학생으로서 준비하면 좋은 것 3가지
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              취업 합격 가이드
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {topJob.shortName} 분야 채용 서류/면접에서 확실한 우위를 점할 수 있는 실천 과제입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {report.top3PreparationTips.map((tip, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <span className="w-7 h-7 rounded-xl bg-cyan-500/20 text-cyan-300 font-mono font-bold text-sm flex items-center justify-center">
                  0{idx + 1}
                </span>
                <h4 className="text-sm font-bold text-white leading-snug">{tip.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{tip.detail}</p>
              </div>

              <div className="pt-2 border-t border-slate-800/80">
                <span className="text-[11px] font-semibold text-cyan-300 flex items-start gap-1">
                  <Check className="w-3.5 h-3.5 shrink-0 mt-0.5 text-cyan-400" />
                  <span>{tip.actionItem}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Footer Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4">
        <button
          onClick={() => onOpenExplorer()}
          className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm flex items-center justify-center gap-2 border border-slate-700 transition-all cursor-pointer"
        >
          <BookOpen className="w-4 h-4 text-cyan-400" />
          <span>5대 모빌리티 직무 가이드북 전체보기</span>
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handleShare}
            className="flex-1 sm:flex-initial px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm flex items-center justify-center gap-2 border border-slate-700 transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300">복사 완료!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-cyan-400" />
                <span>결과 요약 복사</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              onPlayAgain();
            }}
            className="flex-1 sm:flex-initial px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>다시 플레이하기</span>
          </button>
        </div>
      </div>
    </div>
  );
};
