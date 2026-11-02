import { JobCategory, JobTrackInfo } from '../types';

export const JOB_TRACKS: Record<JobCategory, JobTrackInfo> = {
  vehicleSw: {
    id: 'vehicleSw',
    title: '차량 SW 개발 (SDV / 임베디드)',
    shortName: '차량 SW',
    archetype: '미래를 코딩하는 SDV 아키텍트',
    tagline: '차량을 바퀴 달린 스마트 디바이스로 진화시키는 소프트웨어 엔지니어',
    color: '#00E5FF',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    iconName: 'Code2',
    description:
      '차량 내 수십 개의 도메인 컨트롤러(DCU)와 고성능 컴퓨터(HPVC)에서 동작하는 운영체제, AUTOSAR 플랫폼, OTA 무선 업데이트, 차량용 이더넷 통신 스택 및 인포테인먼트(IVI) 시스템을 설계하고 구현합니다.',
    coreCompetencies: [
      'C / C++ 임베디드 프로그래밍 & RTOS (FreeRTOS, QNX, Linux)',
      'AUTOSAR (Classic & Adaptive) 플랫폼 아키텍처 이해',
      'CAN, CAN-FD, Automotive Ethernet (SOME/IP, TSN) 프로토콜 분석',
      'A/B 파티션 롤백 및 OTA (Over-The-Air) 무중단 배포 시스템 설계',
    ],
    keyTools: ['Vector CANoe / CANalyzer', 'AUTOSAR Builder', 'Linux Embedded / Yocto', 'Git / Gerrit', 'Jira'],
    top3PreparationTips: [
      {
        title: 'C/C++ 기반 임베디드 리눅스 및 소켓 통신 프로젝트 수행',
        detail:
          '단순 알고리즘 문제를 넘어 라즈베리파이나 STM32 보드에서 멀티스레드, CAN 통신 인터페이스, 소켓 통신을 다루는 미니 프로젝트를 깃허브에 정리해보세요.',
        actionItem: 'STM32 보드 또는 라즈베리파이를 활용한 CAN/소켓 통신 프로젝트 포트폴리오 구축',
      },
      {
        title: 'AUTOSAR 및 차량 통신 네트워크 기본 개념 습득',
        detail:
          '현대 모빌리티 채용 공고의 단골 우대 사항인 AUTOSAR의 계층 구조(BSW, RTE, SWC)와 CAN-FD, SOME/IP 개념을 오픈 강의나 기술 블로그로 요약 정리하세요.',
        actionItem: 'AUTOSAR Classic vs Adaptive 차이점 및 SOME/IP 통신 흐름 블로그 정리',
      },
      {
        title: '차량용 오픈소스 플랫폼(Android Automotive, AGL) 체험',
        detail:
          'Automotive Grade Linux(AGL)나 Android Automotive OS 에뮬레이터를 직접 빌드해보고 인포테인먼트 앱을 구현해보는 것은 강력한 차별점이 됩니다.',
        actionItem: 'Android Automotive OS 에뮬레이터 설치 후 차량용 미디어/계기판 앱 개발 시도',
      },
    ],
    dayInTheLife:
      '오전 스크럼 회의에서 OTA 릴리즈 후보 버전의 CAN 버스 로드율을 점검하고, 오후에는 하드웨어 타깃 보드에 Adaptive AUTOSAR SOME/IP 통신 스택을 포팅하여 실차 통신 지연을 15ms 이하로 최적화합니다.',
    futureVision:
      'SDV(Software-Defined Vehicle) 대전환기를 맞아 차량 가치의 80%가 소프트웨어로 결정되는 시대의 가장 핵심적인 테크 리더로 성장합니다.',
  },

  autonomousAi: {
    id: 'autonomousAi',
    title: '자율주행 / AI 인지·판단·제어',
    shortName: '자율주행/AI',
    archetype: '모빌리티의 두뇌를 설계하는 AI 엔지니어',
    tagline: '센서 데이터와 딥러닝으로 도로 위의 복잡한 세계를 이해하고 주행 궤적을 그리는 개척자',
    color: '#818CF8',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    iconName: 'Cpu',
    description:
      '카메라, 라이다(LiDAR), 레이더 센서 데이터를 융합(Sensor Fusion)하여 차량 주변 객체를 3차원으로 인지하고, 딥러닝과 궤적 최적화 알고리즘을 통해 안전하고 자연스러운 주행 경로(Motion Planning)를 생성합니다.',
    coreCompetencies: [
      '컴퓨터 비전 & 3D 라이다 포인트 클라우드 처리 (PyTorch, TensorRT)',
      '센서 퓨전 (칼만 필터, EKF) 및 고정밀 지도(HD Map) 기반 정밀 측위(Localization)',
      '모션 플래닝 & 제어 이론 (MPC, Pure Pursuit, Lattice Planner)',
      'ROS2, CARLA 자율주행 시뮬레이터 및 HIL(Hardware-in-the-Loop) 실차 검증',
    ],
    keyTools: ['ROS2 (Robot Operating System)', 'CARLA Simulator', 'PyTorch / ONNX', 'C++ / Python', 'CUDA'],
    top3PreparationTips: [
      {
        title: 'CARLA 자율주행 시뮬레이터 기반 자율주행 파이프라인 구현',
        detail:
          '실제 차량을 다루기 힘든 대학생에게 오픈소스 CARLA 시뮬레이터는 최적의 무기입니다. 차선 인식, 장애물 회피, 경로 생성 알고리즘을 직접 돌려보고 영상으로 기록하세요.',
        actionItem: 'CARLA Python API로 우천/야간 도로 장애물 회피 모션 플래닝 데모 영상 제작',
      },
      {
        title: 'ROS2 기반 노드 통신과 포인트클라우드(PCL) 라이브러리 학습',
        detail:
          '자율주행 업계 표준인 ROS2(Humble/Iron)의 토픽/서비스 구조를 익히고, 3D 라이다 데이터를 PCL 라이브러리로 필터링 및 클러스터링하는 과정을 마스터하세요.',
        actionItem: 'LiDAR 점군 데이터(PCD) Voxel Grid 다운샘플링 및 Euclidean 클러스터링 C++ 코드 작성',
      },
      {
        title: '자율주행 경진대회(대학생 자율주행차 경진대회, 모형차 대회) 참가',
        detail:
          '산업통상자원부, 현대차그룹 주최 자율주행 경진대회나 동아리 랩실 프로젝트를 통해 센서 캘리브레이션과 필드 디버깅 경험을 쌓으세요.',
        actionItem: '교내 자율주행/로봇 연구실 학부연구생 지원 또는 학술 동아리 스터디 참여',
      },
    ],
    dayInTheLife:
      '출근 후 야간 폭우 주행 테스트에서 수집된 코너 케이스 로그를 분석하고, 3D Object Detection 모델의 위양성(False Positive)을 줄이기 위해 데이터 증강 파이프라인을 돌려 재학습을 진행합니다.',
    futureVision:
      '레벨 4/5 무인 로보택시, 스마트 셔틀, 자율주행 물류 트럭 등 완전 자율주행 시대의 두뇌를 지배하는 핵심 연구원으로 도약합니다.',
  },

  electrificationHw: {
    id: 'electrificationHw',
    title: '배터리 / 전동화 시스템 HW',
    shortName: '배터리/전동화',
    archetype: '모빌리티의 심장을 빚는 전동화 스페셜리스트',
    tagline: '초고전압 배터리와 모터·인버터를 극한의 효율과 안전성으로 구동하는 하드웨어 거장',
    color: '#34D399',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    iconName: 'Zap',
    description:
      '800V 고전압 배터리 팩 설계, BMS(배터리 관리 시스템) 하드웨어, SiC(탄화규소) 전력반도체 인버터, 전기차 구동 모터(PE 시스템) 및 칠러·냉매 배관 기반의 통합 열관리 시스템을 연구 개발합니다.',
    coreCompetencies: [
      'BMS (배터리 관리 시스템) 아키텍처 및 SOC/SOH 추정 알고리즘',
      '배터리 셀/모듈/팩 기구 설계 및 열폭주 방지 열관리(Thermal Management)',
      '전력전자(Power Electronics): SiC 인버터, OBC(온보드 차저), LDC',
      'MATLAB / Simulink 기반 배터리·모터 파워트레인 모델링',
    ],
    keyTools: ['MATLAB / Simulink', 'Ansys Fluent / Motor-CAD', 'Altium Designer', 'BMS 평가 계측기', '오실로스코프'],
    top3PreparationTips: [
      {
        title: 'MATLAB / Simulink를 활용한 배터리 팩 충방전 및 열 모델링 실습',
        detail:
          'Simscape Driveline 및 Battery 블록을 사용하여 18650/파우치 셀의 등가회로 모델(ECM)과 방열 특성을 시뮬레이션하고, SOC 추정 EKF 필터를 구현해보세요.',
        actionItem: 'Simulink 배터리 SOC 추정 칼만필터 모델 제작 및 보고서 작성',
      },
      {
        title: '전력전자 회로(인버터/컨버터) 기초와 SiC 반도체 트렌드 분석',
        detail:
          '전기차 효율을 좌우하는 SiC MOSFET 기반 인버터 구동 회로의 원리와 스위칭 손실, 게이트 드라이버 설계 기법을 스터디하여 면접 때 전문성을 어필하세요.',
        actionItem: '400V vs 800V 전압 시스템의 장단점 및 SiC 전력반도체 적용 효과 기술 노트 정리',
      },
      {
        title: '자작 자동차 동아리(Formula Student / EV) 파워트레인 제작 참여',
        detail:
          'KSAE 대학생 자작자동차대회 EV 부문에서 배터리 팩 패키징, 퓨즈/릴레이/BMS 배선 및 모터 컨트롤러 튜닝을 직접 손으로 만져본 경험은 최상위 스펙입니다.',
        actionItem: '자작차 대회 전장/파워트레인 팀 참여 또는 오픈하드웨어 BMS 키트 실습',
      },
    ],
    dayInTheLife:
      '고온 챔버에서 극한 부하 방전 테스트 중인 800V 배터리 모듈의 열화상 카메라 계측 데이터를 검토하고, 냉각수 유로 압력 손실을 줄이기 위해 기구 설계팀과 3D CAD를 수정합니다.',
    futureVision:
      '전동화 시대를 넘어 UAM(도심항공교통), 수소 모빌리티, 대용량 ESS 등 친환경 에너지를 구동하는 고전압 하드웨어 최고 권위자로 도약합니다.',
  },

  qualitySafety: {
    id: 'qualitySafety',
    title: '품질 / 기능안전 (ISO 26262 & 검증)',
    shortName: '품질/기능안전',
    archetype: '타협하지 않는 안전의 최종 수호자',
    tagline: '단 0.0001%의 결함도 용납하지 않는 ISO 26262 기능안전 및 무결점 신뢰성 마스터',
    color: '#F472B6',
    badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    iconName: 'ShieldCheck',
    description:
      '국제 기능안전 표준인 ISO 26262(ASIL 등급 분류), 의도된 기능의 안전성(SOTIF ISO 21448), 차량 사이버보안(ISO/SAE 21434)을 기반으로 위험원 분석(HARA), 안전 메커니즘 설계, HIL 시뮬레이션 및 실차 인증 검증을 총괄합니다.',
    coreCompetencies: [
      'ISO 26262 기능안전 프로세스 (HARA, Safety Goal, FSC/TSC)',
      'HIL (Hardware-in-the-Loop) 시뮬레이션 및 실차 신뢰성 평가',
      'FMEA (고장 모드 및 영향 분석) & FTA (고장 수목 분석)',
      '차량 사이버보안 (ISO 21434) 및 법적 형식 승인(Homologation) 규제 이해',
    ],
    keyTools: ['dSPACE / NI HIL 시뮬레이터', 'PTC Integrity / Polarion ALM', 'Ansys medini analyze', 'Vector vTESTstudio', 'CANoe'],
    top3PreparationTips: [
      {
        title: 'ISO 26262 Part 3 (HARA: 위험원 분석 및 리스크 평가) 실무 프로세스 체득',
        detail:
          '자동차 공학에서 안전은 타협이 없습니다. 조향 잠김, 제동 불능 등 위험 상황을 가정하고 ASIL(A~D)을 직접 도출해보는 HARA 가상 과제 포트폴리오를 만들어보세요.',
        actionItem: '전동식 조향장치(MDPS) 가상 고장 시나리오 기반 ASIL-D 도출 HARA 리포트 작성',
      },
      {
        title: 'HIL(Hardware-in-the-Loop) 검증 환경 및 V-모델 개발 프로세스 이해',
        detail:
          'SW 단위 테스트부터 통합 테스트, 가상 제어기 HIL 시뮬레이션, 실차 검증으로 이어지는 V-Model 프로세스를 명확히 이해하고 면접 스토리텔링을 준비하세요.',
        actionItem: 'V-Model 개발 주기와 HIL 시뮬레이터 검증 자동화 개념 1장 정리',
      },
      {
        title: '기능안전 공인 교육(TÜV SÜD / NIPA 등) 수료 및 자격증 준비',
        detail:
          '대학생 대상 정부 지원 무료 기능안전 교육이나 TÜV SÜD 기능안전 전문가(FSCP) 초급 과정을 이수하면 품질/인증 직무 지원 시 엄청난 우대를 받습니다.',
        actionItem: '국가기간 전략산업 또는 대학 연계 ISO 26262 무료 단기 교육 탐색 및 수강',
      },
    ],
    dayInTheLife:
      '조향 제어기 단선 고장 상황을 모사한 HIL 시뮬레이터 장애 주입(Fault Injection) 테스트 결과를 분석하고, 페일세이프(Fail-Safe) 제어기가 50ms 이내에 안전 모드로 전이되었는지 인증 보고서를 결재합니다.',
    futureVision:
      '자율주행 레벨 3~4와 SDV 시대에 인명 사고를 막는 최고위 안전 책임자(Chief Safety Officer)이자 글로벌 형식인증 전문가로 우뚝 섭니다.',
  },

  serviceData: {
    id: 'serviceData',
    title: '모빌리티 서비스 기획 / 데이터 분석',
    shortName: '서비스/데이터',
    archetype: '데이터로 도시의 이동을 혁신하는 모빌리티 전략가',
    tagline: '커넥티드카 데이터와 구독 비즈니스로 새로운 이동의 가치를 창출하는 혁신 기획자',
    color: '#FBBF24',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    iconName: 'TrendingUp',
    description:
      '수십만 대의 커넥티드 차량에서 쏟아지는 텔레매틱스 주행 데이터, 충전 인프라 네트워크, MaaS(Mobility-as-a-Service), 로보택시 플릿 운영, 구독형 기능(FoD)의 비즈니스 모델과 사용자 경험(UX)을 데이터 중심으로 기획합니다.',
    coreCompetencies: [
      'SQL / Python 데이터 분석 (시계열 공간 위치 데이터 GIS 분석)',
      '커넥티드카 서비스 기획 & FoD (Feature on Demand) BM 설계',
      'MaaS / 로보택시 플릿 관제(Fleet Management) 및 공급-수요 매칭 알고리즘',
      '차량 사용자 경험(In-Cabin UX) 및 모빌리티 슈퍼앱 기획',
    ],
    keyTools: ['SQL / PostgreSQL (PostGIS)', 'Python (Pandas, Kepler.gl, GeoPandas)', 'Tableau / Looker Studio', 'Figma', 'Amplitude'],
    top3PreparationTips: [
      {
        title: '서울시/공공데이터포털 모빌리티 공간 빅데이터 분석 프로젝트',
        detail:
          '따릉이, 카카오T 이동 데이터, 전기차 충전소 위치 데이터를 활용하여 지도 위에 시각화하고 최적 충전소 입지나 수요 예측 모델을 만들어 깃허브에 게시하세요.',
        actionItem: 'Kepler.gl / Python으로 전기차 충전 수요 히트맵 및 입지 추천 대시보드 제작',
      },
      {
        title: 'SDV 구독형 기능(FoD) 신규 비즈니스 모델 기획서 작성',
        detail:
          '테슬라 FSD 구독, 메르세데스 후륜조향 구독 사례를 벤치마킹하여, 국내 운전자들의 지갑을 열 수 있는 참신하고 실현 가능한 FoD 기획안을 포트폴리오로 작성하세요.',
        actionItem: '차량 특화 구독 서비스(예: 캠핑 모드 패키지, 동절기 프리미엄 패키지) BM 기획서 작성',
      },
      {
        title: '모빌리티 해커톤 및 데이터 분석 공모전 입상',
        detail:
          '스마트시티 챌린지, 도로교통공단 교통데이터 공모전 등 이동 데이터 관련 공모전에 참여하여 데이터 기반 인사이트 도출 역량을 실적으로 증명하세요.',
        actionItem: 'Dacon / Kaggle 교통·물류 데이터 분석 대회 참가 및 솔루션 공유',
      },
    ],
    dayInTheLife:
      '어제 출시된 초급속 충전소의 회전율과 충전 대기 시간 시계열 데이터를 SQL로 추출하고, 로보택시 시범 운행 지역의 피크타임 배차 성공률을 높이기 위한 재배치 알고리즘을 개선합니다.',
    futureVision:
      '하드웨어 제조사를 넘어 구글, 우버와 경쟁하는 글로벌 모빌리티 서비스 플랫폼의 CPO(Chief Product Officer) 또는 데이터 총괄 디렉터로 성장합니다.',
  },
};

export const CHARACTERS = {
  leader: {
    id: 'leader',
    name: '정민우 팀장',
    role: '총괄 PMO / 신입 멘토링 팀장',
    department: '선행개발본부 PMO',
    avatarBg: 'from-blue-600 to-indigo-700',
    accentColor: '#38BDF8',
    initials: '정',
  },
  swSenior: {
    id: 'swSenior',
    name: '강지영 수석',
    role: 'SDV 아키텍처 파트장',
    department: '차량SW플랫폼개발팀',
    avatarBg: 'from-cyan-600 to-blue-700',
    accentColor: '#22D3EE',
    initials: '강',
  },
  aiLead: {
    id: 'aiLead',
    name: '최도현 책임',
    role: '자율주행 인지/판단 리드',
    department: '자율주행AI연구소',
    avatarBg: 'from-indigo-600 to-violet-700',
    accentColor: '#A78BFA',
    initials: '최',
  },
  hwLead: {
    id: 'hwLead',
    name: '박성훈 파트장',
    role: '배터리/전동화 수석연구원',
    department: '전동화파워트레인개발팀',
    avatarBg: 'from-emerald-600 to-teal-700',
    accentColor: '#34D399',
    initials: '박',
  },
  safetyManager: {
    id: 'safetyManager',
    name: '한서연 팀장',
    role: '기능안전(ISO 26262) 총괄',
    department: '품질보증/기능안전센터',
    avatarBg: 'from-rose-600 to-pink-700',
    accentColor: '#FB7185',
    initials: '한',
  },
  serviceLead: {
    id: 'serviceLead',
    name: '윤재호 디렉터',
    role: '모빌리티 서비스 기획 총괄',
    department: '모빌리티플랫폼사업부',
    avatarBg: 'from-amber-600 to-orange-700',
    accentColor: '#FBBF24',
    initials: '윤',
  },
};
