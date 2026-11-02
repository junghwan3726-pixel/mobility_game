import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT) || 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  // Shared Gemini client utility with telemetry header
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  // API Endpoint: Analyze career choices and generate personalized feedback
  app.post('/api/analyze-career', async (req, res) => {
    try {
      const { playerName, topJobKey, topJobTitle, scores, choices } = req.body;

      if (!process.env.GEMINI_API_KEY) {
        console.warn('GEMINI_API_KEY is not set. Returning fallback analysis.');
        return res.json({ success: false, fallback: true, message: 'API key not configured' });
      }

      const prompt = `
당신은 현대/기아, 테슬라, 현대모비스, LG에너지솔루션, 오토노머스에이투지 등 글로벌 모빌리티 산업의 최고 수준 인사담당자이자 기술 리크루터입니다.
모빌리티 취업 준비 대학생인 신입사원 "${playerName || '플레이어'}"님이 5일간 가상 모빌리티 회사 '넥스트모빌리티'에서 실무 15대 의사결정 과제(하루 3개)를 수행했습니다.

[분석 대상 데이터]
- 최종 판정 1위 직무: ${topJobTitle} (${topJobKey})
- 직무별 점수 지표:
  * 차량 SW 개발: ${scores?.vehicleSw ?? 0}
  * 자율주행/AI: ${scores?.autonomousAi ?? 0}
  * 배터리/전동화 HW: ${scores?.electrificationHw ?? 0}
  * 품질/기능안전: ${scores?.qualitySafety ?? 0}
  * 모빌리티 서비스 기획/데이터: ${scores?.serviceData ?? 0}

- 플레이어가 내린 대표적인 선택 기록들:
${JSON.stringify(choices?.slice(0, 15) || [], null, 2)}

[요청 사항]
1. 취업 준비생의 자존감을 높이고 모빌리티 엔지니어로서의 가슴 뛰는 비전을 주는 친절하고 전문적인 톤앤매너로 작성하세요.
2. 플레이어가 실제 수행한 선택 2가지를 콕 집어 분석할 때, 반드시 **"이 선택의 뛰어난 장점(Pros)"**뿐만 아니라 **"현업에서 주의해야 할 현실적 리스크/트레이드오프(Cons & Blind spots)"**를 균형 있게 피드백해 주세요. 엔지니어링은 언제나 트레이드오프의 예술이기 때문입니다.
3. 대학생이 지금 당장 실천할 수 있는 취업 준비 전략 3가지를 구체적인 키워드(예: AUTOSAR, ROS2, MATLAB/Simulink, ISO 26262 교육, 공모전, 오픈소스 기여 등)와 함께 제시해 주세요.
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction:
            '당신은 모빌리티 산업 취업 멘토이자 친절하고 날카로운 통찰력을 지닌 테크 리크루터입니다. 지원자의 선택에 대해 좋은 점(강점)과 아쉬운 점/트레이드오프(현실적 한계)를 균형 있게 분석해 JSON 포맷으로 전달하세요.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              archetype: {
                type: Type.STRING,
                description: '플레이어의 업무 스타일을 표현하는 매력적인 별칭 (예: 미래를 코딩하는 SDV 아키텍트)',
              },
              personalizedSummary: {
                type: Type.STRING,
                description: '플레이어의 5일간 근무 태도와 의사결정 패턴에 대한 총평 (2~3문장)',
              },
              whyFit: {
                type: Type.STRING,
                description: '왜 이 직무가 플레이어의 적성에 가장 완벽하게 부합하는지에 대한 분석 (2문장)',
              },
              top3PreparationTips: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING, description: '준비 팁 소제목' },
                    detail: { type: Type.STRING, description: '구체적인 학습 및 준비 방법' },
                    actionItem: { type: Type.STRING, description: '지금 바로 실천할 수 있는 한 가지 액션' },
                  },
                  required: ['title', 'detail', 'actionItem'],
                },
                description: '대학생이 지금 준비하면 좋은 3가지 실천 과제',
              },
              retrospectiveHighlights: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    eventTitle: { type: Type.STRING, description: '인상 깊었던 업무 이벤트 제목' },
                    userChoiceText: { type: Type.STRING, description: '플레이어가 내린 선택 내용' },
                    evalComment: { type: Type.STRING, description: '선택의 뛰어난 장점 및 긍정적 측면' },
                    tradeOffNotice: { type: Type.STRING, description: '이 선택 시 수반되는 현실적 리스크, 한계 및 주의할 점' },
                  },
                  required: ['eventTitle', 'userChoiceText', 'evalComment', 'tradeOffNotice'],
                },
                description: '플레이 중 했던 인상적인 선택 2개에 대한 심층 회고 코멘트 (장점과 트레이드오프)',
              },
              encouragement: {
                type: Type.STRING,
                description: '모빌리티 혁신을 이끌 신입사원에게 전하는 격려 메시지 (1~2문장)',
              },
            },
            required: [
              'archetype',
              'personalizedSummary',
              'whyFit',
              'top3PreparationTips',
              'retrospectiveHighlights',
              'encouragement',
            ],
          },
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json({ success: true, analysis: parsed });
    } catch (err: unknown) {
      const error = err as Error;
      console.error('Gemini career analysis error:', error?.message || error);
      return res.status(500).json({
        success: false,
        error: error?.message || 'Gemini analysis failed',
      });
    }
  });

  // Mount Vite middlewares in development or serve static files in production
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 NextMobility server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
