import React, { useState, useEffect, useRef } from 'react';
import { Character } from '../types';
import { CHARACTERS } from '../data/jobs';
import { soundManager } from '../utils/audio';
import { ChevronRight, FastForward } from 'lucide-react';

interface VisualNovelDialogProps {
  characterId: string;
  customCharacterName?: string;
  dialogueText: string;
  onFinishTyping?: () => void;
  onNext?: () => void;
  nextButtonLabel?: string;
  isChoiceActive?: boolean;
}

export const VisualNovelDialog: React.FC<VisualNovelDialogProps> = ({
  characterId,
  customCharacterName,
  dialogueText,
  onFinishTyping,
  onNext,
  nextButtonLabel = '다음',
  isChoiceActive = false,
}) => {
  const character: Character =
    CHARACTERS[characterId as keyof typeof CHARACTERS] || CHARACTERS.leader;

  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const textIndexRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    textIndexRef.current = 0;

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      textIndexRef.current += 1;
      const currentText = dialogueText.slice(0, textIndexRef.current);
      setDisplayedText(currentText);

      // Play soft sound occasionally
      if (textIndexRef.current % 3 === 0) {
        soundManager.playTypingTick();
      }

      if (textIndexRef.current >= dialogueText.length) {
        if (timerRef.current) clearInterval(timerRef.current);
        setIsTyping(false);
        if (onFinishTyping) onFinishTyping();
      }
    }, 24);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [dialogueText, onFinishTyping]);

  const handleSkipTyping = () => {
    if (isTyping) {
      if (timerRef.current) clearInterval(timerRef.current);
      setDisplayedText(dialogueText);
      setIsTyping(false);
      soundManager.playClick();
      if (onFinishTyping) onFinishTyping();
    } else if (onNext && !isChoiceActive) {
      soundManager.playClick();
      onNext();
    }
  };

  const displayName = customCharacterName || character.name;

  return (
    <div
      onClick={handleSkipTyping}
      className="w-full relative group cursor-pointer transition-all duration-300"
    >
      {/* Visual Novel Container with Glassmorphism */}
      <div className="relative bg-slate-900/90 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-4 sm:p-5 shadow-2xl shadow-cyan-950/40 hover:border-cyan-400/50 transition-colors">
        {/* Glow Accent Line at Top */}
        <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80" />

        <div className="flex items-start gap-3 sm:gap-4">
          {/* Character Avatar Portrait */}
          <div className="relative shrink-0">
            <div
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${character.avatarBg} p-[2px] shadow-lg ring-2 ring-cyan-500/30 ring-offset-2 ring-offset-slate-900 flex items-center justify-center`}
            >
              <div className="w-full h-full rounded-[10px] bg-slate-950/40 flex flex-col items-center justify-center text-white">
                <span className="text-xl sm:text-2xl font-bold font-mono tracking-wider">
                  {character.initials}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-cyan-200/80 font-medium scale-90">
                  NEXT
                </span>
              </div>
            </div>
            {/* Live Indicator pulse */}
            <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500 border border-slate-900"></span>
            </span>
          </div>

          {/* Dialogue Body & Nameplate */}
          <div className="flex-1 min-w-0">
            {/* Nameplate & Department */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <div className="px-2.5 py-0.5 rounded-md bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-bold text-sm tracking-wide shadow-sm">
                {displayName}
              </div>
              <span className="text-xs text-slate-400 font-medium">
                {character.role} · <span className="text-slate-500">{character.department}</span>
              </span>
            </div>

            {/* Typewriter Text Display */}
            <div className="text-slate-100 text-sm sm:text-base leading-relaxed tracking-normal font-normal min-h-[48px]">
              {displayedText}
              {isTyping && (
                <span className="inline-block w-2 h-4 ml-1 bg-cyan-400 animate-pulse align-middle" />
              )}
            </div>
          </div>
        </div>

        {/* Footer Bar with status & action cues */}
        <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 select-none">
          <div className="flex items-center gap-2">
            {isTyping ? (
              <span className="inline-flex items-center gap-1 text-cyan-400/80 text-[11px]">
                <FastForward className="w-3 h-3 animate-spin" /> 화면을 클릭하면 대화가 즉시 표시됩니다
              </span>
            ) : isChoiceActive ? (
              <span className="text-amber-400/90 font-medium text-[11px]">
                💡 상황을 검토하고 아래에서 최선의 해결책을 선택하세요
              </span>
            ) : (
              <span className="text-slate-400 text-[11px]">대화창을 클릭하여 계속 진행하세요</span>
            )}
          </div>

          {/* Proceed Button if not a choice moment */}
          {!isChoiceActive && !isTyping && onNext && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                soundManager.playClick();
                onNext();
              }}
              className="px-3 py-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-lg flex items-center gap-1 text-xs shadow-md shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <span>{nextButtonLabel}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
