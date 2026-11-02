import React, { useState } from 'react';
import { WorkEvent, EventOption } from '../types';
import { CHARACTERS } from '../data/jobs';
import { VisualNovelDialog } from './VisualNovelDialog';
import { soundManager } from '../utils/audio';
import {
  AlertCircle,
  Lightbulb,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  ArrowRight,
  Sparkles,
  ThumbsUp,
  AlertTriangle,
  Scale,
} from 'lucide-react';

interface EventCardProps {
  event: WorkEvent;
  playerName: string;
  onSelectOption: (option: EventOption) => void;
  onContinue: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  playerName,
  onSelectOption,
  onContinue,
}) => {
  const [selectedOption, setSelectedOption] = useState<EventOption | null>(null);
  const [showTipModal, setShowTipModal] = useState(false);

  const character =
    CHARACTERS[event.characterId as keyof typeof CHARACTERS] || CHARACTERS.leader;

  const handleChoose = (opt: EventOption) => {
    if (selectedOption) return; // Prevent double clicking
    setSelectedOption(opt);
    soundManager.playDecisionChime();
    onSelectOption(opt);
  };

  const isResolved = selectedOption !== null;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-5 animate-in fade-in duration-300">
      {/* Top Event Header Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 backdrop-blur-md shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500" />

        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              {event.badge}
            </span>
            <span className="text-xs text-slate-400 font-mono">{event.timeString}</span>
            <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-cyan-200 border border-slate-700 font-mono">
              오늘의 업무 {event.orderInDay} / {event.totalInDay}
            </span>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              setShowTipModal(true);
            }}
            className="text-xs text-cyan-300 hover:text-cyan-200 bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/30 px-3 py-1 rounded-full flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
          >
            <Lightbulb className="w-3.5 h-3.5 text-cyan-400" />
            <span>산업 지식 팁 미리보기</span>
          </button>
        </div>

        <h2 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
          {event.title}
        </h2>
      </div>

      {/* Visual Novel Character Dialogue Box */}
      <VisualNovelDialog
        characterId={
          isResolved
            ? selectedOption.feedbackReaction.characterId
            : event.characterId
        }
        dialogueText={
          isResolved
            ? selectedOption.feedbackReaction.comment
            : event.dialogueBefore.replace('신입사원님', `${playerName} 신입사원님`)
        }
        isChoiceActive={!isResolved}
        onNext={onContinue}
        nextButtonLabel={
          event.orderInDay === event.totalInDay ? `Day ${event.day} 퇴근하기` : '다음 업무로 진행'
        }
      />

      {/* Main Situation Briefing Card */}
      {!isResolved && (
        <div className="bg-slate-900/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl relative backdrop-blur-sm">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
                현장 상황 보고 (Briefing)
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {event.situation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Choices List */}
      {!isResolved ? (
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              신입사원의 의사결정 선택지 (1택)
            </span>
            <span className="text-[11px] text-slate-500">
              *각 선택은 고유의 장점과 현실적 트레이드오프를 가집니다
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {event.options.map((option, idx) => (
              <button
                key={option.id}
                onClick={() => handleChoose(option)}
                className="w-full text-left p-4 sm:p-5 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 hover:border-cyan-400/70 transition-all duration-200 group relative shadow-md hover:shadow-cyan-500/10 active:scale-[0.99] cursor-pointer"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 font-bold text-sm flex items-center justify-center shrink-0 transition-colors">
                    {String.fromCharCode(65 + idx)}
                  </div>

                  <div className="flex-1 space-y-1.5">
                    <div className="text-sm sm:text-base font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                      {option.label}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {option.actionText}
                    </p>

                    {/* Keywords Tag Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {option.highlightKeywords.map((kw, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[11px] bg-slate-800/90 text-slate-400 border border-slate-700/60 group-hover:border-cyan-500/30 group-hover:text-cyan-300/80 transition-colors"
                        >
                          #{kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all shrink-0 self-center" />
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Post-Decision Result: Pros, Cons, and Industry Knowledge Card */
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
          {/* Decision Confirmation Card */}
          <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-cyan-500/20 text-cyan-300">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-cyan-400 font-medium">선택 완료</span>
                <p className="text-sm font-semibold text-slate-200">
                  {selectedOption.label}
                </p>
              </div>
            </div>
            <span className="text-xs text-emerald-400 font-mono font-medium px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
              직무 적성 포인트 반영됨
            </span>
          </div>

          {/* DUAL FEEDBACK: PROS & CONS (좋은 점과 나쁜 점 분석) */}
          <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-cyan-400" />
                <h4 className="text-sm sm:text-base font-bold text-white">
                  실무 의사결정 트레이드오프 분석 (Pros & Cons)
                </h4>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                엔지니어링 피드백
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {/* PROS (좋은 점 / 기대 성과) */}
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 text-xs sm:text-sm font-bold">
                  <ThumbsUp className="w-4 h-4" />
                  <span>👍 이 선택의 좋은 점 (기대 효과 & 강점)</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {selectedOption.pros}
                </p>
                <div className="pt-1 text-[11px] text-emerald-300/80 font-medium">
                  • 멘토 평가: {selectedOption.feedbackReaction.praise}
                </div>
              </div>

              {/* CONS (주의할 점 / 리스크 / 한계) */}
              <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/30 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 text-xs sm:text-sm font-bold">
                  <AlertTriangle className="w-4 h-4" />
                  <span>⚠️ 이 선택의 주의할 점 (리스크 & 한계)</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {selectedOption.cons}
                </p>
                <div className="pt-1 text-[11px] text-rose-300/80 font-medium">
                  • 주의 당부: {selectedOption.feedbackReaction.concern}
                </div>
              </div>
            </div>
          </div>

          {/* Industry Tip Card */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/60 border border-blue-500/30 rounded-2xl p-5 shadow-2xl relative overflow-hidden">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                    실무 테크 노트 (Mobility Tech Note)
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    취업 필수 상식
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-white">
                  {event.industryTip.title}
                </h4>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              {event.industryTip.summary}
            </p>

            <div className="bg-slate-950/60 rounded-xl p-3.5 border border-slate-800 space-y-2 mb-4">
              <span className="text-xs font-bold text-cyan-300">핵심 실무 체크포인트:</span>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {event.industryTip.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold shrink-0">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-xs text-slate-400 flex items-center gap-1.5 border-t border-slate-800/80 pt-3">
              <span className="text-blue-400 font-semibold">기업 연계:</span>
              <span>{event.industryTip.fieldRelevance}</span>
            </div>
          </div>

          {/* Continue Next Button */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={() => {
                soundManager.playClick();
                onContinue();
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <span>
                {event.orderInDay === event.totalInDay
                  ? `Day ${event.day} 퇴근하기`
                  : `오늘의 다음 업무 계속하기 (${event.orderInDay + 1}/${event.totalInDay})`}
              </span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Modal: Industry Tip Modal (if clicked from preview button) */}
      {showTipModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-cyan-500/40 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2 text-cyan-400 font-bold">
                <Lightbulb className="w-5 h-5" />
                <span>산업 지식 팁</span>
              </div>
              <button
                onClick={() => setShowTipModal(false)}
                className="text-slate-400 hover:text-white text-sm px-2 py-1 rounded cursor-pointer"
              >
                닫기
              </button>
            </div>

            <h4 className="text-lg font-bold text-white mb-1">{event.industryTip.title}</h4>
            <p className="text-xs text-cyan-300 mb-3">{event.industryTip.subtitle}</p>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">{event.industryTip.summary}</p>

            <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 space-y-1.5 mb-4 text-xs text-slate-300">
              {event.industryTip.keyPoints.map((pt, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>{pt}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowTipModal(false)}
              className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl text-sm cursor-pointer"
            >
              확인 완료
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
