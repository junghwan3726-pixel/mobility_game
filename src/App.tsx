import React, { useState } from 'react';
import {
  GameStage,
  JobCategory,
  JobScores,
  UserChoiceRecord,
  EventOption,
} from './types';
import { WORK_EVENTS } from './data/events';
import { JOB_TRACKS, CHARACTERS } from './data/jobs';
import { EventCard } from './components/EventCard';
import { ClockOutScreen } from './components/ClockOutScreen';
import { FinalReport } from './components/FinalReport';
import { JobExplorerModal } from './components/JobExplorerModal';
import { VisualNovelDialog } from './components/VisualNovelDialog';
import { soundManager } from './utils/audio';
import {
  Volume2,
  VolumeX,
  BookOpen,
  Car,
  ChevronRight,
  Sparkles,
  User,
  Calendar,
  Layers,
} from 'lucide-react';

export default function App() {
  const [stage, setStage] = useState<GameStage>('start');
  const [playerName, setPlayerName] = useState<string>('김신입');
  const [currentEventIndex, setCurrentEventIndex] = useState<number>(0);
  const [onboardingStep, setOnboardingStep] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(soundManager.getMuted());
  const [isExplorerOpen, setIsExplorerOpen] = useState<boolean>(false);
  const [explorerCategory, setExplorerCategory] = useState<JobCategory>('vehicleSw');

  const [scores, setScores] = useState<JobScores>({
    vehicleSw: 0,
    autonomousAi: 0,
    electrificationHw: 0,
    qualitySafety: 0,
    serviceData: 0,
  });

  const [choiceHistory, setChoiceHistory] = useState<UserChoiceRecord[]>([]);

  // Sound toggle handler
  const handleToggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
    if (!muted) soundManager.playClick();
  };

  // Open job explorer
  const handleOpenExplorer = (category?: JobCategory) => {
    if (category) setExplorerCategory(category);
    setIsExplorerOpen(true);
  };

  // Start game from start screen
  const handleStartGame = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    soundManager.playClick();
    if (!playerName.trim()) setPlayerName('김신입');
    setStage('onboarding');
    setOnboardingStep(0);
  };

  // Onboarding dialogues
  const onboardingDialogues = [
    `반갑습니다, ${playerName} 님! 넥스트모빌리티 선행개발본부에 입사하신 것을 진심으로 축하드립니다. 저는 5일간 신입 온보딩 멘토를 맡은 정민우 팀장입니다.`,
    '우리 회사는 SDV(소프트웨어 중심 자동차), 레벨3/4 자율주행, 800V 고전압 전동화 파워트레인, 커넥티드 모빌리티 서비스를 아우르는 차세대 모빌리티 혁신 기업입니다.',
    '앞으로 5일 동안 매일 3건씩, 총 15가지 긴박한 실무 프로젝트 의사결정을 직접 주도하게 됩니다. 모든 선택에는 장점과 리스크(Trade-off)가 공존합니다. 당신의 공학적 판단과 균형 감각을 믿고 결단을 내려주세요!',
  ];

  const handleNextOnboarding = () => {
    if (onboardingStep < onboardingDialogues.length - 1) {
      setOnboardingStep((prev) => prev + 1);
    } else {
      setStage('event');
      setCurrentEventIndex(0);
    }
  };

  // When option selected in an event
  const handleSelectOption = (option: EventOption) => {
    const currentEvt = WORK_EVENTS[currentEventIndex];

    // Apply score deltas
    setScores((prev) => {
      const next = { ...prev };
      if (option.scoreDeltas.vehicleSw) next.vehicleSw += option.scoreDeltas.vehicleSw;
      if (option.scoreDeltas.autonomousAi) next.autonomousAi += option.scoreDeltas.autonomousAi;
      if (option.scoreDeltas.electrificationHw)
        next.electrificationHw += option.scoreDeltas.electrificationHw;
      if (option.scoreDeltas.qualitySafety) next.qualitySafety += option.scoreDeltas.qualitySafety;
      if (option.scoreDeltas.serviceData) next.serviceData += option.scoreDeltas.serviceData;
      return next;
    });

    // Record history
    const char =
      CHARACTERS[option.feedbackReaction.characterId as keyof typeof CHARACTERS] ||
      CHARACTERS.leader;

    const newRecord: UserChoiceRecord = {
      eventId: currentEvt.id,
      day: currentEvt.day,
      eventTitle: currentEvt.title,
      chosenOptionId: option.id,
      chosenActionText: option.actionText,
      scoreDeltas: option.scoreDeltas,
      feedbackComment: option.feedbackReaction.comment,
      characterName: char.name,
      pros: option.pros,
      cons: option.cons,
      praise: option.feedbackReaction.praise,
      concern: option.feedbackReaction.concern,
    };

    setChoiceHistory((prev) => [...prev, newRecord]);
  };

  // When continuing from an event
  const handleContinueEvent = () => {
    const currentEvt = WORK_EVENTS[currentEventIndex];

    if (currentEvt.orderInDay === currentEvt.totalInDay) {
      // All tasks for today are done -> go to Clock-Out screen
      setStage('clock_out');
    } else {
      // Go to next event of the day
      setCurrentEventIndex((prev) => prev + 1);
    }
  };

  // Start next day from clock-out screen
  const handleStartNextDay = () => {
    const currentEvt = WORK_EVENTS[currentEventIndex];
    if (currentEvt.day === 5) {
      // Finished Day 5 -> Final Report
      setStage('final_report');
    } else {
      // Advance to next day's first event
      setCurrentEventIndex((prev) => prev + 1);
      setStage('event');
    }
  };

  // Play again
  const handlePlayAgain = () => {
    setScores({
      vehicleSw: 0,
      autonomousAi: 0,
      electrificationHw: 0,
      qualitySafety: 0,
      serviceData: 0,
    });
    setChoiceHistory([]);
    setCurrentEventIndex(0);
    setStage('start');
  };

  const totalEventsCount = WORK_EVENTS.length;
  const currentEvent = WORK_EVENTS[currentEventIndex] || WORK_EVENTS[0];
  const currentDay = currentEvent ? currentEvent.day : 1;
  const todayChoices = choiceHistory.filter((c) => c.day === currentDay);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950 relative overflow-x-hidden">
      {/* Background Ambience Lines */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div
          className="w-full h-full opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #00E5FF 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* Global Navigation Header */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 py-3 shrink-0">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          {/* Logo & Company Title */}
          <div
            onClick={stage !== 'start' ? undefined : () => handlePlayAgain()}
            className="flex items-center gap-2.5 cursor-pointer select-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 p-[2px] shadow-md shadow-cyan-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-cyan-400">
                <Car className="w-5 h-5" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-sm sm:text-base tracking-wider text-white">
                  NEXT<span className="text-cyan-400">MOBILITY</span>
                </span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  RPG
                </span>
              </div>
              <span className="text-[10px] text-slate-400 block -mt-0.5">
                가상 신입사원 직무 체험
              </span>
            </div>
          </div>

          {/* Center Progress pill (only during game) */}
          {stage !== 'start' && stage !== 'final_report' && (
            <div className="hidden sm:flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>DAY {currentDay} / 5</span>
              </div>
              <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300"
                  style={{ width: `${((currentEventIndex + 1) / totalEventsCount) * 100}%` }}
                />
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                과제 {currentEventIndex + 1} / {totalEventsCount}
              </span>
            </div>
          )}

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            {/* Player Name Pill */}
            {stage !== 'start' && (
              <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <User className="w-3.5 h-3.5 text-cyan-400" />
                <span>신입사원</span>
                <strong className="text-white font-semibold">{playerName}</strong>
              </div>
            )}

            {/* Job Explorer Modal Button */}
            <button
              onClick={() => handleOpenExplorer()}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              title="5대 직무 가이드북"
            >
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">직무 가이드</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={handleToggleSound}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer"
              title={isMuted ? '음소거 해제' : '음소거'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-slate-500" />
              ) : (
                <Volume2 className="w-4 h-4 text-cyan-400" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Sub-progress Bar */}
        {stage !== 'start' && stage !== 'final_report' && (
          <div className="sm:hidden mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold text-cyan-300">
              Day {currentDay} / 5 (업무 {currentEvent.orderInDay}/{currentEvent.totalInDay})
            </span>
            <div className="flex-1 mx-3 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-cyan-400 transition-all duration-300"
                style={{ width: `${((currentEventIndex + 1) / totalEventsCount) * 100}%` }}
              />
            </div>
            <span className="text-[11px] font-mono">
              {currentEventIndex + 1}/{totalEventsCount}
            </span>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 z-10 px-4 sm:px-6 py-6 sm:py-8 flex flex-col justify-center max-w-6xl w-full mx-auto">
        {/* ========================================================= */}
        {/* STAGE 1: START SCREEN */}
        {/* ========================================================= */}
        {stage === 'start' && (
          <div className="w-full max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500 my-auto">
            {/* Start Hero */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold shadow-sm">
                <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
                <span>모빌리티 취준생을 위한 실무 롤플레잉 게임</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                가상 신입사원 직무 체험
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  넥스트모빌리티 시뮬레이터
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
                당신은 가상의 첨단 모빌리티 혁신 기업 <strong>'넥스트모빌리티'</strong>의
                신입사원입니다. 5일 동안 <strong>하루 3건(총 15건)</strong>의 실제 현업 위기 상황을 해결하며,
                장점과 한계(Trade-off)를 검토하고 나에게 꼭 맞는 <strong>모빌리티 직무 적성 리포트</strong>를 발견해보세요!
              </p>
            </div>

            {/* 5 Track Preview Chips */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 backdrop-blur-sm space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-cyan-400" />
                체험 가능한 모빌리티 핵심 5대 직무
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {(Object.keys(JOB_TRACKS) as JobCategory[]).map((catKey) => {
                  const track = JOB_TRACKS[catKey];
                  return (
                    <div
                      key={catKey}
                      onClick={() => handleOpenExplorer(catKey)}
                      className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-cyan-500/40 text-left transition-all cursor-pointer group"
                    >
                      <div
                        className="w-2.5 h-2.5 rounded-full mb-1.5"
                        style={{ backgroundColor: track.color }}
                      />
                      <span className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 block truncate">
                        {track.shortName}
                      </span>
                      <span className="text-[10px] text-slate-400 line-clamp-1">
                        {track.archetype.split(' ')[0]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Player Entry Form */}
            <div className="bg-slate-900/90 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500" />

              <form onSubmit={handleStartGame} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs sm:text-sm font-bold text-slate-300 flex items-center gap-2">
                    <User className="w-4 h-4 text-cyan-400" />
                    <span>신입사원 성함 (닉네임) 입력</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      maxLength={10}
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value)}
                      placeholder="예: 김신입, 박모빌, 이엔지니어"
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-semibold text-base sm:text-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all placeholder:text-slate-600"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                      {['김신입', '이지능', '박배터리', '최안전'].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setPlayerName(preset)}
                          className="px-2 py-1 rounded text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    *입력하신 성함으로 사원증 및 최종 AI 적성 리포트가 발급됩니다. (5일간 하루 3개 과제, 총 15개 과제)
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-black text-base sm:text-lg flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  <span>넥스트모빌리티 입사하기</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* STAGE 2: ONBOARDING (입사 첫날 팀장 면담) */}
        {/* ========================================================= */}
        {stage === 'onboarding' && (
          <div className="w-full max-w-3xl mx-auto space-y-6 animate-in fade-in zoom-in-95 duration-400 my-auto">
            {/* Header Briefing */}
            <div className="text-center space-y-2">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold uppercase tracking-wider">
                DAY 1 / 출근 09:00 AM · 신입사원 오리엔테이션
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                선행개발본부 PMO 첫 미팅
              </h2>
            </div>

            {/* Visual Novel Dialogue */}
            <VisualNovelDialog
              characterId="leader"
              dialogueText={onboardingDialogues[onboardingStep]}
              onNext={handleNextOnboarding}
              nextButtonLabel={
                onboardingStep < onboardingDialogues.length - 1
                  ? '다음 이야기'
                  : '첫 번째 업무 착수하기'
              }
            />

            {/* Interactive Badge / Step Indicator */}
            <div className="flex items-center justify-between text-xs text-slate-400 px-2">
              <span>오리엔테이션 진행 {onboardingStep + 1} / 3</span>
              <div className="flex gap-1.5">
                {[0, 1, 2].map((s) => (
                  <div
                    key={s}
                    className={`w-6 h-1.5 rounded-full transition-all ${
                      s <= onboardingStep ? 'bg-cyan-400' : 'bg-slate-800'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* STAGE 3: WORK EVENT (Day 1 ~ Day 5 업무 진행) */}
        {/* IMPORTANT: key={currentEvent.id} forces React to reset internal state for each event */}
        {/* ========================================================= */}
        {stage === 'event' && currentEvent && (
          <EventCard
            key={currentEvent.id}
            event={currentEvent}
            playerName={playerName}
            onSelectOption={handleSelectOption}
            onContinue={handleContinueEvent}
          />
        )}

        {/* ========================================================= */}
        {/* STAGE 4: CLOCK-OUT (퇴근 화면) */}
        {/* ========================================================= */}
        {stage === 'clock_out' && (
          <ClockOutScreen
            day={currentDay}
            playerName={playerName}
            todayChoices={todayChoices}
            onStartNextDay={handleStartNextDay}
          />
        )}

        {/* ========================================================= */}
        {/* STAGE 5: FINAL REPORT (최종 결과 리포트) */}
        {/* ========================================================= */}
        {stage === 'final_report' && (
          <FinalReport
            playerName={playerName}
            scores={scores}
            choices={choiceHistory}
            onPlayAgain={handlePlayAgain}
            onOpenExplorer={handleOpenExplorer}
          />
        )}
      </main>

      {/* Global Job Explorer Modal */}
      <JobExplorerModal
        isOpen={isExplorerOpen}
        onClose={() => setIsExplorerOpen(false)}
        initialJobCategory={explorerCategory}
      />

      {/* Footer */}
      <footer className="py-4 border-t border-slate-900 text-center text-xs text-slate-500 shrink-0">
        <p>
          NextMobility Simulator · 모빌리티 SW / 자율주행 / 전동화 / 품질안전 / 모빌리티 서비스
          커리어 롤플레잉
        </p>
      </footer>
    </div>
  );
}
