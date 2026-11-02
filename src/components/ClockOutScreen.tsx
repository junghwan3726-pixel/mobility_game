import React, { useEffect } from 'react';
import { UserChoiceRecord } from '../types';
import { CHARACTERS } from '../data/jobs';
import { soundManager } from '../utils/audio';
import {
  Moon,
  TrendingUp,
  Award,
  ChevronRight,
  Sparkles,
  CalendarCheck,
  ThumbsUp,
  AlertTriangle,
} from 'lucide-react';

interface ClockOutScreenProps {
  day: number;
  playerName: string;
  todayChoices: UserChoiceRecord[];
  onStartNextDay: () => void;
}

export const ClockOutScreen: React.FC<ClockOutScreenProps> = ({
  day,
  playerName,
  todayChoices,
  onStartNextDay,
}) => {
  useEffect(() => {
    soundManager.playClockOutFanfare();
  }, []);

  const eveningMessages: Record<number, string> = {
    1: '첫날 3가지 실무 과제(배터리 발열, OTA 롤백, 회생제동 튜닝)를 훌륭하게 완수하셨습니다! 기술의 장단점을 고루 짚는 엔지니어링 감각이 돋보였습니다. 푹 쉬고 내일 뵙죠!',
    2: '야간 빗길 자율주행, 반도체 공급망 위기, 그리고 도심 유령 제동(AEB) 민원까지! 2일 차에 이미 현업 1년 차 못지않은 판단력을 발휘해주셨습니다. 고생 많으셨습니다!',
    3: '초급속 충전소 입지 선정, CAN 버스 병목 해결, V2X 스마트 교차로 서비스까지! 소프트웨어와 하드웨어의 균형 잡힌 시각이 빛났습니다. 편안한 저녁 보내세요.',
    4: 'ISO 26262 ASIL-D 기능안전 논쟁, AI 코너 케이스 검증, 사이버보안 모의해킹 방어까지 해결하셨군요. 내일은 드디어 NX-1 최종 글로벌 승인과 대망의 직무 적성 리포트가 발표됩니다!',
    5: '5일간 총 15개의 넥스트모빌리티 핵심 프로젝트를 모두 완수하셨습니다. 이제 신입사원님의 잠재력과 적성을 집대성한 최종 리포트를 확인해볼 시간입니다!',
  };

  const currentMessage = eveningMessages[day] || eveningMessages[1];

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-400">
      {/* Clock-out Hero Card */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950/70 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-center">
        {/* Glow ambient background lights */}
        <div className="absolute top-0 right-1/4 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex p-3 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-4 shadow-inner">
          <Moon className="w-8 h-8 text-indigo-400 animate-bounce" />
        </div>

        <div className="space-y-1 mb-2">
          <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-indigo-400">
            DAY {day} / 5 오늘 업무(총 3건) 완료
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {playerName} 신입사원님, 오늘 하루도 수고 많으셨습니다!
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          넥스트모빌리티 개발팀과 함께 3가지 핵심 과제에서 장점과 리스크를 고려한 결단을 내렸습니다.
        </p>

        {/* Team Leader Evening Encouragement */}
        <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-indigo-500/20 text-left flex items-start gap-3 sm:gap-4">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 p-[2px] shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-[9px] flex items-center justify-center text-white font-bold text-base">
              정
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-cyan-300">{CHARACTERS.leader.name}</span>
              <span className="text-[11px] text-slate-500">{CHARACTERS.leader.role}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              "{currentMessage}"
            </p>
          </div>
        </div>
      </div>

      {/* Today's Competency Growth Summary & Decision Review */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">
              오늘 수행한 3대 과제 & 의사결정 회고
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            성향 성장 진행 중
          </span>
        </div>

        <div className="space-y-4">
          {todayChoices.map((choice, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700 transition-all space-y-2.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    과제 #{choice.eventId}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-200">
                    {choice.eventTitle}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    <Award className="w-3 h-3" />
                    판단력 +1
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 font-medium">
                <strong className="text-cyan-400">선택한 방안: </strong>
                {choice.chosenActionText}
              </p>

              {/* Pros & Cons summary in clock out */}
              {(choice.pros || choice.cons) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
                  {choice.pros && (
                    <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-emerald-200 flex items-start gap-1.5">
                      <ThumbsUp className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{choice.pros}</span>
                    </div>
                  )}
                  {choice.cons && (
                    <div className="p-2.5 rounded-lg bg-rose-950/30 border border-rose-500/20 text-rose-200 flex items-start gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{choice.cons}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Progress pill tracker */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <CalendarCheck className="w-4 h-4 text-emerald-400" />
            총 5일 중 <strong className="text-white font-mono">{day}일 차</strong> 수료 (과제 {todayChoices.length}개 완료)
          </span>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((d) => (
              <div
                key={d}
                className={`w-7 h-2 rounded-full transition-all ${
                  d <= day ? 'bg-cyan-400' : 'bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Start Next Day Button */}
      <div className="pt-2">
        <button
          onClick={() => {
            soundManager.playClick();
            onStartNextDay();
          }}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-extrabold text-base sm:text-lg flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
        >
          <span>{day === 5 ? '최종 직무 적성 리포트 확인하기' : `Day ${day + 1} 출근하기 (과제 3개 진행)`}</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
