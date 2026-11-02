import React from 'react';
import { JobScores } from '../types';

interface RadarChartProps {
  scores: JobScores;
  className?: string;
  size?: number;
}

interface AxisDef {
  key: keyof JobScores;
  label: string;
  shortLabel: string;
  color: string;
}

const AXES: AxisDef[] = [
  { key: 'vehicleSw', label: '차량 SW 개발', shortLabel: '차량 SW', color: '#00E5FF' },
  { key: 'autonomousAi', label: '자율주행/AI', shortLabel: '자율주행/AI', color: '#818CF8' },
  { key: 'electrificationHw', label: '배터리/전동화 HW', shortLabel: '배터리/전동화', color: '#34D399' },
  { key: 'qualitySafety', label: '품질/기능안전', shortLabel: '품질/기능안전', color: '#FB7185' },
  { key: 'serviceData', label: '모빌리티 서비스/데이터', shortLabel: '서비스/데이터', color: '#FBBF24' },
];

export const RadarChart: React.FC<RadarChartProps> = ({ scores, className = '', size = 360 }) => {
  const center = size / 2;
  const radius = size * 0.38;
  const numAxes = AXES.length;
  const angleStep = (Math.PI * 2) / numAxes;
  // Rotate so first vertex points straight up (angle = -PI/2)
  const startAngle = -Math.PI / 2;

  // Find max possible score or actual max to scale proportionally
  const scoreValues = Object.values(scores);
  const maxScore = Math.max(...scoreValues, 8); // at least 8 to keep proportion nice

  // Helper to convert polar to cartesian
  const getCoordinates = (valueNormalized: number, index: number) => {
    const angle = startAngle + index * angleStep;
    const r = radius * Math.max(0.12, Math.min(1, valueNormalized));
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  // Concentric polygon points
  const gridLevels = [0.25, 0.5, 0.75, 1.0];

  const getPolygonPoints = (level: number) => {
    return AXES.map((_, i) => {
      const angle = startAngle + i * angleStep;
      const r = radius * level;
      return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
    }).join(' ');
  };

  // Data polygon points
  const dataPoints = AXES.map((axis, i) => {
    const val = scores[axis.key] || 0;
    const norm = val / maxScore;
    const coord = getCoordinates(norm, i);
    return `${coord.x},${coord.y}`;
  }).join(' ');

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible select-none drop-shadow-xl"
      >
        <defs>
          <linearGradient id="radarFillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#6366F1" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#34D399" stopOpacity="0.3" />
          </linearGradient>
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0F172A" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Center Glow */}
        <circle cx={center} cy={center} r={radius * 1.1} fill="url(#centerGlow)" />

        {/* Background Grid Rings */}
        {gridLevels.map((lvl, idx) => (
          <polygon
            key={idx}
            points={getPolygonPoints(lvl)}
            fill="transparent"
            stroke="#334155"
            strokeWidth="1"
            strokeDasharray={idx === gridLevels.length - 1 ? undefined : '2,3'}
            className="transition-all duration-300"
          />
        ))}

        {/* Axis Spokes from center */}
        {AXES.map((_, i) => {
          const angle = startAngle + i * angleStep;
          const outerX = center + radius * Math.cos(angle);
          const outerY = center + radius * Math.sin(angle);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={outerX}
              y2={outerY}
              stroke="#475569"
              strokeWidth="1.2"
              strokeOpacity="0.7"
            />
          );
        })}

        {/* Data Shape with Gradient and Glow */}
        <polygon
          points={dataPoints}
          fill="url(#radarFillGrad)"
          stroke="#00E5FF"
          strokeWidth="2.5"
          className="transition-all duration-700 ease-out filter drop-shadow-[0_0_8px_rgba(0,229,255,0.6)]"
        />

        {/* Data Vertex Dots */}
        {AXES.map((axis, i) => {
          const val = scores[axis.key] || 0;
          const norm = val / maxScore;
          const coord = getCoordinates(norm, i);
          return (
            <g key={axis.key}>
              <circle
                cx={coord.x}
                cy={coord.y}
                r="6"
                fill={axis.color}
                stroke="#0F172A"
                strokeWidth="2"
                className="transition-all duration-500 hover:scale-125 cursor-pointer filter drop-shadow-[0_0_6px_currentColor]"
              />
              <circle cx={coord.x} cy={coord.y} r="2" fill="#FFFFFF" />
            </g>
          );
        })}

        {/* Axis Labels outside the polygon */}
        {AXES.map((axis, i) => {
          const angle = startAngle + i * angleStep;
          const labelDist = radius + 32;
          const lx = center + labelDist * Math.cos(angle);
          const ly = center + labelDist * Math.sin(angle);

          // Anchor alignment logic
          let textAnchor: 'middle' | 'start' | 'end' = 'middle';
          if (Math.cos(angle) > 0.3) textAnchor = 'start';
          else if (Math.cos(angle) < -0.3) textAnchor = 'end';

          const val = scores[axis.key] || 0;
          const percent = Math.min(100, Math.round((val / (maxScore || 1)) * 100));

          return (
            <g key={`lbl-${axis.key}`} className="cursor-default">
              <text
                x={lx}
                y={ly - 6}
                textAnchor={textAnchor}
                fill="#E2E8F0"
                fontSize="12"
                fontWeight="600"
                className="font-medium tracking-tight"
              >
                {axis.label}
              </text>
              <text
                x={lx}
                y={ly + 10}
                textAnchor={textAnchor}
                fill={axis.color}
                fontSize="11"
                fontWeight="700"
                className="font-mono"
              >
                적합도 {percent}%
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
