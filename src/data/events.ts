import { WorkEvent } from '../types';

export const WORK_EVENTS: WorkEvent[] = [
  // ==========================================
  // DAY 1 (오전 / 오후 / 퇴근 전) - 3 Events
  // ==========================================
  {
    id: 1,
    day: 1,
    orderInDay: 1,
    totalInDay: 3,
    timeString: 'Day 1 / 09:30 AM (오전 첫 미팅)',
    title: '출시 2주 전, 배터리 팩 고온 발열 이슈 발생',
    badge: '긴급 테크 이슈 · BMS & 전동화',
    characterId: 'hwLead',
    dialogueBefore:
      '신입사원님, 첫날부터 큰일입니다! 양산 2주 전 고온 고부하 주행 테스트 중 배터리 팩 4번 모듈 온도가 60℃를 돌파했습니다. 사업본부에서는 일정 준수를 외치는데, 신입사원님의 기술적 직관은 어디를 향합니까?',
    situation:
      '출시를 단 2주 앞둔 시점, 극한 부하 시험 중 배터리 특정 모듈에서 국소 과열(Hot-spot)이 감지되었습니다. 원인을 제대로 잡지 못하면 화재 위험(Thermal Runaway)이 있고, 무작정 연기하면 수백억 원의 양산 손실이 발생합니다. 당신의 첫 번째 해결 방안은 무엇입니까?',
    options: [
      {
        id: '1-a',
        label: 'A. 쿨링 제어 로직 펌웨어 긴급 재튜닝',
        actionText:
          'BMS(배터리 관리 시스템)의 냉각 밸브 개폐 주기와 냉각수 펌프 RPM 제어 로직을 긴급 수정하여 소프트웨어 펌웨어로 온도를 억제한다.',
        scoreDeltas: { vehicleSw: 2, electrificationHw: 1 },
        pros: '하드웨어 분해 없이 OTA 또는 펌웨어 업데이트만으로 즉각 온도를 4℃ 이상 낮출 수 있어 양산 일정을 지킬 수 있습니다.',
        cons: '냉각 펌프가 상시 고회전하여 전비(주행가능거리)가 약 3% 감소하고 워터 펌프 부품의 피로 누적 위험이 있습니다.',
        feedbackReaction: {
          characterId: 'swSenior',
          praise: '소프트웨어 로직 튜닝으로 긴급한 화재 리스크를 즉시 잠재운 기민한 대응입니다.',
          concern: '다만 펌프 연속 고부하로 인한 전비 하락과 펌프 내구 수명 단축은 향후 보완 과제입니다.',
          comment:
            '빠른 판단입니다! BMS 냉각 맵 데이터를 최적화해 온도를 즉시 낮췄습니다. 다만 펌프 상시 가동으로 인한 전비 감소와 펌프 내구성 문제는 후속 패치로 해결해야겠네요.',
          tone: 'impressed',
        },
        highlightKeywords: ['BMS 펌웨어', '냉각 밸브 로직', '소프트웨어 제어'],
      },
      {
        id: '1-b',
        label: 'B. 배터리 팩 전수 분해 및 기구적 방열 유로 정밀 점검',
        actionText:
          '셀 팩을 즉시 분해하여 열계면소재(TIM 패드)의 도포 상태와 알루미늄 냉각 채널의 체결 토크 불량 등 물리적 HW 결함을 샅샅이 규명한다.',
        scoreDeltas: { electrificationHw: 3, qualitySafety: 1 },
        pros: '냉각 유로의 에어 포켓이나 TIM 패드 들뜸 등 발열의 물리적 근본 원인을 100% 확실하게 찾아낼 수 있습니다.',
        cons: '팩 분해 및 재조립에 최소 4~5일이 소요되어 양산 준비 일정이 지연되고 분해 공수 비용이 발생합니다.',
        feedbackReaction: {
          characterId: 'hwLead',
          praise: '임기응변에 기대지 않고 물리적 하드웨어의 근본 원인을 파헤친 정석 엔지니어링입니다.',
          concern: '분해와 재조립에 며칠이 소요되어 공장 생산 라인 대기 비용이 다소 증가했습니다.',
          comment:
            '역시 하드웨어의 기본을 아시는군요! 분해 결과 4번 모듈 냉각 유로에 미세 기포가 차 있던 것을 찾아냈습니다. 비록 일정은 3일 밀렸지만 안전은 확실히 잡았습니다.',
          tone: 'enthusiastic',
        },
        highlightKeywords: ['TIM 방열 패드', '냉각 채널 HW', '셀 팩 전수 점검'],
      },
      {
        id: '1-c',
        label: 'C. ISO 26262 안전 프로세스에 따른 출시 공식 연기 및 안전심의회 소집',
        actionText:
          '열폭주 방지 안전 기준에 타협은 없습니다. 양산 일정을 공식 연기하더라도 기능안전 심의위원회를 열어 결함 근본 원인이 해소될 때까지 철저히 검증한다.',
        scoreDeltas: { qualitySafety: 3 },
        pros: '잠재적 화재 리스크와 리콜 비용을 원천 차단하며 회사 브랜드의 안전 신뢰도를 최고 수준으로 지켜냅니다.',
        cons: '출시 연기에 따른 대규모 마케팅 일정 취소 위약금 및 경쟁 신차 대비 시장 선점 기회를 놓칠 수 있습니다.',
        feedbackReaction: {
          characterId: 'safetyManager',
          praise: '신입사원으로서 일정 압박 속에서도 고객 생명과 기능안전을 지킨 용기 있는 결정입니다.',
          concern: '사업부의 출시 지연 손실이 수십억 원에 달해 경영진을 설득할 촘촘한 근거 자료가 필요합니다.',
          comment:
            '타협 없는 안전 의식에 경의를 표합니다! 하지만 사업부의 반발이 거센 만큼, 왜 2주 연기가 수천억 리콜을 막는 현명한 투자였는지를 데이터로 입증해야 합니다.',
          tone: 'cautious',
        },
        highlightKeywords: ['ISO 26262', '열폭주 안전 기준', '기능안전 심의'],
      },
      {
        id: '1-d',
        label: 'D. 원격 텔레매틱스 실차 데이터 로그 분석 및 위험 확률 모델링',
        actionText:
          '현재 필드 주행 중인 500대 시험 차량의 실시간 텔레매틱스 온도·전압 시계열 데이터를 클라우드로 모아 실제 고객 조건에서의 위험 노출 빈도를 통계 모델링한다.',
        scoreDeltas: { serviceData: 2, autonomousAi: 1 },
        pros: '단 한 대의 이상치인지 전수 결함인지를 데이터로 객관화하여 불필요한 전면 리콜이나 생산 중단을 방지합니다.',
        cons: '통계적 확률 모델링에 집중하느라 당장 과열된 4번 모듈의 물리적 위험 처치 시점이 늦어질 수 있습니다.',
        feedbackReaction: {
          characterId: 'serviceLead',
          praise: '빅데이터 기반 통계 모델링으로 감이 아닌 사실(Fact) 중심의 의사결정을 이끌었습니다.',
          concern: '데이터 분석이 진행되는 동안 현장 하드웨어의 즉각적인 응급 처치도 병행되었어야 합니다.',
          comment:
            '데이터로 리스크를 객관화한 점은 훌륭합니다! 0.2%의 극한 주행에서만 발생하는 특수 조건임을 밝혀냈으나, 데이터만 보느라 현장 조치 골든타임을 놓치지 않도록 주의해야 합니다.',
          tone: 'thoughtful',
        },
        highlightKeywords: ['텔레매틱스 빅데이터', '시계열 로그 분석', '위험 확률 모델링'],
      },
    ],
    industryTip: {
      title: 'BMS (Battery Management System)와 열관리',
      subtitle: '전동화 모빌리티의 안전과 수명을 책임지는 핵심 기술',
      summary:
        '전기차 배터리는 고온에서 열폭주(Thermal Runaway) 위험이 있고 저온에서는 충방전 효율이 급감합니다. BMS는 수천 개의 셀 전압·전류·온도를 밀리초(ms) 단위로 감시하며, 냉각 칠러와 PTC 히터를 능동 제어하여 20~35℃ 최적 구간을 유지합니다.',
      keyPoints: [
        'SOC (State of Charge, 잔존용량) & SOH (State of Health, 배터리 건강상태) 정밀 추정',
        '셀 밸런싱(Cell Balancing)을 통한 개별 셀 수명 불균형 해소',
        'TIM(Thermal Interface Material)과 수냉식 쿨링 플레이트 설계의 중요성',
      ],
      fieldRelevance: '현대차, LG에너지솔루션, 삼성SDI, SK온 등 배터리 및 전동화 HW/SW 직무 필수 지식',
    },
  },

  {
    id: 2,
    day: 1,
    orderInDay: 2,
    totalInDay: 3,
    timeString: 'Day 1 / 13:30 PM (오후 긴급 회의)',
    title: '심야 OTA 업데이트 후 "내비게이션 먹통" 고객 민원 폭발',
    badge: 'SW 위기 대응 · SDV & OTA',
    characterId: 'swSenior',
    dialogueBefore:
      '신입사원님, 오늘 새벽 02시에 배포된 v2.4.0 OTA 업데이트 이후 아침 출근길 고객들로부터 내비게이션 멈춤 민원이 쏟아지고 있습니다! 당장 원인을 찾고 조치해야 합니다.',
    situation:
      '차량 인포테인먼트(IVI) 시스템의 내비게이션 화면이 검게 변하고 간헐적으로 공조기 터치 반응이 멈춘다는 보고가 전국에서 접수되었습니다. 운전자의 불편을 넘어 주행 중 운전자 주의 분산 위험이 제기되는 상황, 어떻게 대처하시겠습니까?',
    options: [
      {
        id: '2-a',
        label: 'A. A/B 파티션 듀얼 뱅크 즉시 가동하여 이전 안정 버전으로 롤백',
        actionText:
          '고객 안전과 서비스 연속성을 위해 지체 없이 듀얼 뱅크 복구 시스템을 트리거하여 전국 차량을 이전 검증된 v2.3.9 버전으로 원격 롤백한다.',
        scoreDeltas: { vehicleSw: 2, qualitySafety: 2 },
        pros: '전국 차량을 10분 이내에 오류 이전 상태로 되돌려 고객 불만과 사고 위험을 즉각 소멸시킵니다.',
        cons: '이번 업데이트에 함께 포함되었던 배터리 충전 속도 향상 및 신규 편의 기능도 함께 취소되어 사용자 실망감이 있습니다.',
        feedbackReaction: {
          characterId: 'swSenior',
          praise: 'A/B 파티션 롤백으로 대형 사고 없이 시스템을 즉시 정상화한 교과서적 위기 대응입니다.',
          concern: '동반 배포된 고출력 충전 알고리즘까지 롤백되어 이번 주 충전 효율 개선 약속이 미뤄졌습니다.',
          comment:
            '탁월한 안전 조치입니다! 단 10분 만에 민원을 잠재웠네요. 다만 고객들이 기대했던 충전 속도 향상 패치도 함께 취소되었으니, 원인을 규명해 이번 주 내로 분리 재배포해야 합니다.',
          tone: 'impressed',
        },
        highlightKeywords: ['A/B 파티션', '원격 롤백', '서비스 연속성'],
      },
      {
        id: '2-b',
        label: 'B. 크래시 덤프 로그와 CAN 버스 트래픽 분석 후 긴급 핫픽스 빌드',
        actionText:
          '비정상 종료된 프로세스의 Core Dump 파일과 차량 CAN 버스 메시지를 심층 디버깅하여 UI 스레드를 잠식한 메모리 누수 지점을 찾아내 즉각 핫픽스를 배포한다.',
        scoreDeltas: { vehicleSw: 3 },
        pros: '롤백 없이 근본 버그(메모리 누수)를 찾아 고치므로 신기능을 그대로 유지하고 SW 기술력을 증명할 수 있습니다.',
        cons: '핫픽스 개발, 빌드, 회귀 테스트에 최소 3~4시간이 걸려 그동안 주행 중인 운전자들의 불편과 항의가 지속됩니다.',
        feedbackReaction: {
          characterId: 'swSenior',
          praise: 'GPS 수신 버퍼 누수가 UI 스레드를 블로킹하던 데드락 지점을 완벽하게 짚어냈습니다.',
          concern: '패치 빌드와 테스트가 완료되기까지 4시간 동안 고객 지원 센터에 문의가 폭주했습니다.',
          comment:
            '깊이 있는 엔지니어링 역량입니다! 데드락 루틴을 정확히 찾아 핫픽스를 완성했네요. 하지만 패치가 배포될 때까지 4시간 동안 운전자들의 불편이 이어진 점은 감수해야 할 숙제였습니다.',
          tone: 'enthusiastic',
        },
        highlightKeywords: ['크래시 덤프', 'CAN 버스 분석', '긴급 핫픽스'],
      },
      {
        id: '2-c',
        label: 'C. 클라우드 텔레매틱스 이상 징후 클러스터링 및 영향 차종 분석',
        actionText:
          '클라우드 관제 대시보드에서 장애가 발생한 차량의 하드웨어 트림, 제조 일자, 지역별 통신망 데이터를 SQL로 집계하여 특정 하드웨어 모듈과의 호환성 문제인지 판별한다.',
        scoreDeltas: { serviceData: 3 },
        pros: '전체 차량이 아닌 특정 2024년형 디스플레이 공급사 부품 탑재 차량에만 국한된 문제임을 밝혀 불필요한 전체 리콜을 막습니다.',
        cons: '데이터 집계와 분석에 시간이 걸리며, 영향을 받지 않는 대다수 고객에게도 불안감이 전이될 수 있습니다.',
        feedbackReaction: {
          characterId: 'serviceLead',
          praise: '전수 조치 대신 특정 디스플레이 컨트롤러 탑재 차량으로 타깃을 좁혀 운영 비용을 80% 절감했습니다.',
          concern: '클러스터링 통계가 나오는 동안 일선 서비스센터에서는 어떤 차량이 대상인지 몰라 혼란이 있었습니다.',
          comment:
            '데이터로 특정 트림의 하드웨어 호환성 충돌임을 정확히 규명했습니다! 불필요한 전체 롤백은 막았지만, 통계가 나오는 동안 고객 안내가 다소 지연된 점은 아쉽습니다.',
          tone: 'thoughtful',
        },
        highlightKeywords: ['클라우드 텔레매틱스', '이상 징후 클러스터링', '데이터 분석'],
      },
      {
        id: '2-d',
        label: 'D. 공조 조작 불가에 따른 기능안전 리스크 평가 및 고객 안전 공지',
        actionText:
          '내비게이션 먹통과 함께 앞유리 성에 제거(Defrost) 버튼 터치 불가가 운전자 시야 확보에 미치는 안전 위험을 ISO 26262 관점에서 평가하고 비상 물리 버튼 안내 공지를 즉각 발송한다.',
        scoreDeltas: { qualitySafety: 3 },
        pros: '인포테인먼트 먹통으로 인한 시야 미확보 사고를 방지하고 브랜드의 안전 책임성을 투명하게 공표합니다.',
        cons: '공식 안전 위험 공지가 언론에 보도되며 "결함 차량"이라는 부정적 여론이 일시적으로 형성될 수 있습니다.',
        feedbackReaction: {
          characterId: 'safetyManager',
          praise: '화면 터치 불능이 성에 제거 실패로 이어지는 2차 안전 사고 위험을 사전에 차단했습니다.',
          concern: '대대적인 안전 공지로 인해 언론과 커뮤니티에서 품질 이슈로 확대 보도되었습니다.',
          comment:
            '고객 안전을 최우선으로 물리 버튼 매뉴얼을 공지한 점은 훌륭합니다. 다만 언론에 크게 보도되며 홍보팀이 해명하느라 진땀을 뺐네요. 안전과 대외 신뢰도 간의 줄타기였습니다.',
          tone: 'cautious',
        },
        highlightKeywords: ['ISO 26262 안전 평가', '시야 확보 리스크', '안전 매뉴얼 공지'],
      },
    ],
    industryTip: {
      title: 'SDV (Software-Defined Vehicle)와 OTA 아키텍처',
      subtitle: '무선 업데이트로 스마트폰처럼 진화하는 자동차',
      summary:
        'SDV 시대에는 제동·조향·구동부터 인포테인먼트까지 차량의 모든 ECU가 소프트웨어로 제어됩니다. OTA(Over-The-Air)는 무선 통신을 통해 펌웨어(FOTA)와 소프트웨어(SOTA)를 배포하며, 업데이트 중 통신이 끊겨도 벽돌(Bricking)이 되지 않도록 듀얼 뱅크(A/B 파티션) 롤백 아키텍처가 필수적입니다.',
      keyPoints: [
        'A/B Dual Bank Partition: 활성 파티션(A) 주행 중 백그라운드로 비활성 파티션(B)에 기록',
        '보안 서명(Digital Signature) 및 HSM(Hardware Security Module) 기반 무결성 검증',
        '유엔 유럽경제위원회(UNECE) WP.29 차량 사이버보안 및 소프트웨어 업데이트 규제(UN R156)',
      ],
      fieldRelevance: '현대차그룹(ccOS 개발), 테슬라, HL만도, 42dot 등 SDV 소프트웨어 엔지니어 필수',
    },
  },

  {
    id: 3,
    day: 1,
    orderInDay: 3,
    totalInDay: 3,
    timeString: 'Day 1 / 17:00 PM (퇴근 전 파워트레인 스크럼)',
    title: '원페달 드라이빙 회생제동 튜닝: 전비 vs 승차감 울컥거림',
    badge: '주행 질감 & 전비 · 전동화 HW & SW',
    characterId: 'hwLead',
    dialogueBefore:
      '신입사원님, 오늘 퇴근 전 마지막 안건입니다. 전기차의 주행거리를 늘리기 위해 회생제동(Regenerative Braking) 감속도를 높였더니, 시험 운전자들로부터 "울컥거려 멀미가 난다"는 불만이 접수되었습니다. 어떻게 튜닝하시겠습니까?',
    situation:
      '가속 페달에서 발을 뗐을 때 전기 모터가 발전기로 변환되어 배터리를 충전하는 회생제동 단계 설정 회의입니다. 회생제동 토크를 강하게 걸면 주행거리가 15km 늘어나지만 승차감이 덜컹거리고, 부드럽게 풀면 내연기관처럼 편안하지만 전비가 나빠집니다.',
    options: [
      {
        id: '3-a',
        label: 'A. 감속도 변화율(Jerk)을 완만하게 제어하는 S-Curve 필터링 SW 로직 적용',
        actionText:
          '모터 인버터 제어기에 저크(Jerk) 제한 S-커브 필터 알고리즘을 추가하여 감속 시작과 종료 시 토크 변동을 부드럽게 감쇄시킨다.',
        scoreDeltas: { vehicleSw: 3 },
        pros: '회생제동으로 회수하는 총 에너지양은 거의 유지하면서도 승객이 느끼는 멀미와 울컥거림을 70% 이상 경감시킵니다.',
        cons: '인버터 MCU의 연산 주기가 100㎲(마이크로초) 늘어나 모터 급가속 반응성에 미세한 딜레이가 생길 수 있습니다.',
        feedbackReaction: {
          characterId: 'swSenior',
          praise: '수학적 S-커브 필터링으로 감속 충격을 부드럽게 흡수한 우아한 소프트웨어 해법입니다.',
          concern: '실시간 필터 연산 부하가 증가하여 인버터 제어 루프의 타이밍 마진을 정밀 측정해야 합니다.',
          comment:
            '훌륭한 제어 알고리즘입니다! 멀미 유발 구간을 S-커브로 매끄럽게 다듬었습니다. 다만 인버터 DSP의 연산 여유 마진이 5% 줄어들었으니 연산 최적화를 진행해야 합니다.',
          tone: 'impressed',
        },
        highlightKeywords: ['저크(Jerk) 제한', 'S-Curve 필터링', '모터 토크 제어'],
      },
      {
        id: '3-b',
        label: 'B. 인버터 SiC 전력 모듈 스위칭 주파수 상향 및 하드웨어 방열 강화',
        actionText:
          '저속 저크 현상을 줄이기 위해 SiC 인버터 스위칭 주파수를 10kHz에서 16kHz로 높이고 이에 따른 스위칭 열 손실을 방열 하드웨어로 보강한다.',
        scoreDeltas: { electrificationHw: 3 },
        pros: '모터 고주파 소음(Whine Noise)을 가청 영역 밖으로 밀어내고 극도로 섬세한 모터 전류 토크 제어가 가능해집니다.',
        cons: '스위칭 주파수 상승으로 전력 손실과 발열이 늘어나 냉각 칠러 부하와 인버터 원가가 상승합니다.',
        feedbackReaction: {
          characterId: 'hwLead',
          praise: 'SiC 전력반도체의 고주파 스위칭 성능을 십분 끌어올려 모터 소음과 토크 리플을 한 번에 잡았습니다.',
          concern: '인버터 전력 스위칭 손실로 열이 더 많이 발생하여 방열판 원가가 약 1만 원 상승했습니다.',
          comment:
            '하드웨어 성능을 극한으로 끌어올린 엔지니어다운 발상입니다! 실내 정숙성과 토크 질감이 고급 세단 수준으로 개선되었습니다. 다만 원가 상승 압박은 사업부와 조율해야 합니다.',
          tone: 'enthusiastic',
        },
        highlightKeywords: ['SiC 인버터', '스위칭 주파수', '토크 리플 저감'],
      },
      {
        id: '3-c',
        label: 'C. 운전자 주행 성향 빅데이터 기반 개인화 어댑티브 회생제동 모드 기획',
        actionText:
          '운전자의 가속/감속 페달 조작 습관, 앞차와의 거리 레이더 데이터를 머신러닝으로 학습하여 운전자 맞춤형 자동 회생제동 강도를 추천하는 기능을 기획한다.',
        scoreDeltas: { serviceData: 3 },
        pros: '초보 운전자부터 전비 마니아까지 각자의 취향에 맞는 맞춤형 주행 경험(UX)을 제공하여 만족도를 극대화합니다.',
        cons: '예측 알고리즘이 빗나갈 경우 운전자가 예상치 못한 감속 반응에 당황할 수 있는 사용성 리스크가 있습니다.',
        feedbackReaction: {
          characterId: 'serviceLead',
          praise: '단일 세팅 강제가 아닌 데이터 기반 개인화 UX로 모빌리티 상품 가치를 한 단계 높였습니다.',
          concern: '가끔 AI 예측과 운전자의 직관이 어긋날 때 발생하는 이질감에 대한 안전 대비책이 필요합니다.',
          comment:
            '매우 트렌디한 상품 기획입니다! 테슬라나 현대차의 스마트 회생제동처럼 똑똑하게 적응하네요. 다만 시스템이 의도치 않게 감속할 때 운전자가 놀라지 않도록 직관적인 UI 피드백을 주어야 합니다.',
          tone: 'thoughtful',
        },
        highlightKeywords: ['개인화 회생제동', '주행 성향 머신러닝', '어댑티브 UX'],
      },
    ],
    industryTip: {
      title: '회생제동 (Regenerative Braking)과 전력전자 제어',
      subtitle: '버려지는 운동에너지를 전기에너지로 회수하는 친환경 구동 핵심',
      summary:
        '내연기관 자동차는 브레이크를 밟으면 마찰열로 에너지가 공기 중에 사라지지만, 전기차는 구동 모터를 반대로 발전기처럼 돌려 배터리를 재충전합니다. 도심 주행 시 전체 소비 에너지의 최대 30%를 회생제동으로 회수할 수 있어 전비 향상의 핵심 무기입니다.',
      keyPoints: [
        'One-Pedal Driving: 브레이크 페달 없이 가속 페달만으로 정차까지 제어하는 기술',
        '코스팅(Coasting, 관성주행)과 회생제동 간의 에너지 효율 트레이드오프',
        '모터-인버터 토크 응답성과 승차감(NVH/Jerk) 제어 튜닝 기법',
      ],
      fieldRelevance: '현대모비스 구동제어팀, 만도 브레이크 시스템, 보쉬 회생제동 시스템 개발 필수',
    },
  },

  // ==========================================
  // DAY 2 (오전 / 오후 / 퇴근 전) - 3 Events
  // ==========================================
  {
    id: 4,
    day: 2,
    orderInDay: 1,
    totalInDay: 3,
    timeString: 'Day 2 / 10:00 AM (연구소 시험 트랙)',
    title: '야간 폭우 주행 테스트 중 자율주행 차량의 차선 이탈 현상',
    badge: '인지·판단 실차 시험 · 자율주행/AI',
    characterId: 'aiLead',
    dialogueBefore:
      '신입사원님, 어젯밤 화성 주행시험장에서 악천후 자율주행 테스트를 진행했는데, 폭우와 노면 물반사로 인해 카메라가 차선을 놓치며 제어권 전환 경고(Takeover Request)가 잇달았습니다. 어떻게 해결해야 할까요?',
    situation:
      '자율주행 레벨 3 프로토타입 차량이 시속 100km로 고속도로를 주행하던 중, 갑작스러운 야간 폭우로 인해 노면 차선이 물에 잠겨 전방 카메라의 신뢰도(Confidence Score)가 30% 이하로 급락했습니다. 안전하게 주행을 이어가기 위한 조치는?',
    options: [
      {
        id: '4-a',
        label: 'A. 4D 이미징 레이더 및 고정밀 라이다 가중치를 높이는 센서 퓨전 전환',
        actionText:
          '비전 카메라의 가중치를 낮추고, 빗방울을 투과해 반사파를 수집하는 4D 이미징 레이더와 라이다(LiDAR) 포인트 클라우드 기반의 동적 센서 퓨전 알고리즘으로 전환한다.',
        scoreDeltas: { autonomousAi: 3 },
        pros: '폭우와 물반사 속에서도 도로 가드레일과 지면 높낮이를 3차원으로 복원해 안정적인 가상 주행로를 유지합니다.',
        cons: '라이다 및 4D 레이더 포인트클라우드 연산량이 급증해 중앙 고성능 컴퓨터(HPVC)의 발열과 전력 소모가 늘어납니다.',
        feedbackReaction: {
          characterId: 'aiLead',
          praise: '레이더의 투과력과 라이다의 3차원 공간 복원력을 극대화한 정통 센서 퓨전 솔루션입니다.',
          concern: '센서 퓨전 파이프라인의 연산 시간(Latency)이 35ms로 늘어나 고속 주행 시 타이밍 마진을 점검해야 합니다.',
          comment:
            '완벽한 자율주행 엔지니어링 접근입니다! 물반사 환경에서도 안정적인 가상 차선을 복원했습니다. 다만 고밀도 포인트클라우드 처리로 인해 프로세서 발열이 다소 증가한 점은 쿨링 설계와 함께 다듬어야 합니다.',
          tone: 'enthusiastic',
        },
        highlightKeywords: ['센서 퓨전', '4D 이미징 레이더', '라이다 포인트 클라우드'],
      },
      {
        id: '4-b',
        label: 'B. 고정밀 지도(HD Map)와 차량 GNSS-INS 결합 복합 측위로 경로 보정',
        actionText:
          '센서 시야가 가려지더라도 cm급 정밀도를 가진 HD Map과 차량 관성항법장치(IMU/GNSS)의 Dead Reckoning 오드로칼라이제이션으로 차량 위치를 정밀 보정한다.',
        scoreDeltas: { autonomousAi: 2, serviceData: 1 },
        pros: '외부 센서가 완전히 가려져도 오프라인 정밀 지도를 기반으로 센티미터 오차 내에서 차선을 유지할 수 있습니다.',
        cons: '도로 공사나 차선 변경 구간 등 최신 지도 데이터가 업데이트되지 않은 구간에서는 치명적 오판 위험이 있습니다.',
        feedbackReaction: {
          characterId: 'aiLead',
          praise: '센서 악천후 한계를 고정밀 공간 지도로 스마트하게 메워 차량 위치를 유지했습니다.',
          concern: '지도와 실제 도로 형상이 다른 미공사 구간에 진입할 경우의 위험 방어책이 요구됩니다.',
          comment:
            'HD Map 기반 정밀 측위(Localization)의 강점을 십분 활용했습니다! 도로 차선이 안 보여도 지도로 궤적을 유지했네요. 하지만 도로 공사 구간 같은 동적 환경에서는 센서와 지도의 괴리 리스크를 항상 경계해야 합니다.',
          tone: 'impressed',
        },
        highlightKeywords: ['HD Map', '복합 측위(Localization)', 'GNSS-INS'],
      },
      {
        id: '4-c',
        label: 'C. 비상 조향 토크 및 감속 안전 메커니즘의 ISO 26262 안전 한계 검증',
        actionText:
          '차선 인지 실패 시 즉각 작동해야 하는 최소 위험 궤적(MRM: Minimal Risk Maneuver) 감속 제어기가 ISO 26262 안전 한계치 내에서 동작하는지 실차 데이터를 정밀 감사한다.',
        scoreDeltas: { qualitySafety: 3 },
        pros: '인지 실패 시 차량이 당황하지 않고 비상등을 켜고 안전하게 갓길로 감속 정차하는 페일세이프 생존성을 보장합니다.',
        cons: '고속도로 한복판에서 너무 쉽게 감속 정차를 시작하면 후행 차량과의 추돌 위험이나 운전자 불안감이 발생합니다.',
        feedbackReaction: {
          characterId: 'safetyManager',
          praise: '센서가 실패할 때의 백업 비상 안전 시스템(MRM)을 점검한 훌륭한 기능안전 마인드입니다.',
          concern: '잦은 제어권 포기 및 비상 정차는 자율주행 서비스의 연속성과 신뢰도를 떨어뜨릴 수 있습니다.',
          comment:
            '안전은 타협할 수 없는 가치입니다! 최소위험기동(MRM) 한계를 철저히 검증했습니다. 다만 폭우가 올 때마다 갓길로 차를 세우면 자율주행 상품 가치가 떨어지므로, 인지 지속력도 함께 키워야 합니다.',
          tone: 'approving',
        },
        highlightKeywords: ['ISO 26262', 'MRM 최소위험기동', '안전 메커니즘 검증'],
      },
      {
        id: '4-d',
        label: 'D. 카메라 렌즈 워셔 분사 및 디프로스터 열선 HW 제어기 성능 점검',
        actionText:
          '카메라 전면 윈드실드의 발수 코팅 상태, 고압 워셔액 노즐 분사 타이밍, 렌즈 주변 열선 디프로스터 하드웨어의 발열 전력 소비를 점검하여 물리적 시야를 확보한다.',
        scoreDeltas: { electrificationHw: 2, qualitySafety: 1 },
        pros: '복잡한 소프트웨어 변경 없이 카메라 렌즈 앞의 물방울과 김서림을 기계적으로 제거해 시야를 40% 이상 개선합니다.',
        cons: '워셔액 소모량이 늘어나고, 고속 주행풍 속에서 노즐 압력이 밀려 물방울이 완전히 씻기지 않는 물리적 한계가 있습니다.',
        feedbackReaction: {
          characterId: 'hwLead',
          praise: '알고리즘 이전에 센서 본체의 물리적 환경을 정화하는 하드웨어 솔루션에 집중했습니다.',
          concern: '워셔액 분사 직후 1~2초 동안 오히려 카메라 시야가 일시적으로 더 가려지는 현상이 생겼습니다.',
          comment:
            '센서 클리닝 하드웨어를 정비하여 비전 인지율을 끌어올렸습니다! 다만 고압 워셔 분사 순간 카메라 렌즈가 1초간 뿌옇게 흐려지는 블라인드 구간이 생겼으니 소프트웨어와 분사 타이밍을 맞춰야 합니다.',
          tone: 'thoughtful',
        },
        highlightKeywords: ['센서 클리닝 HW', '디프로스터 열선', '물리적 센서 보호'],
      },
    ],
    industryTip: {
      title: '센서 퓨전 (Sensor Fusion)과 악천후 대응 기술',
      subtitle: '카메라, 레이더, 라이다의 삼위일체 자율주행 인지',
      summary:
        '단일 센서로는 모든 도로 환경을 극복할 수 없습니다. 카메라는 물체 분류(Classification)와 차선 인식에 뛰어나지만 안개/역광/폭우에 취약하고, 레이더는 기상 악화에도 거리·속도를 잘 측정하지만 해상도가 낮습니다. 라이다는 cm급 3차원 정밀도를 제공합니다. 이들을 칼만 필터나 딥러닝 트랜스포머 기반으로 결합하는 것이 센서 퓨전입니다.',
      keyPoints: [
        '카메라(Vision) + 레이더(Radar) + 라이다(LiDAR) 상호 보완 원리',
        '센서 클리닝 시스템(고압 공기/워셔 및 발열 히터)의 전장 하드웨어 설계',
        'ODD (Operational Design Domain, 운행가능영역) 한계 시 MRM(최소위험기동) 안전 전이',
      ],
      fieldRelevance: '자율주행 스타트업, 현대모비스, 삼성전자 반도체/센서, 해외 티어1 자율주행 연구팀',
    },
  },

  {
    id: 5,
    day: 2,
    orderInDay: 2,
    totalInDay: 3,
    timeString: 'Day 2 / 14:00 PM (구매/개발 합동 회의실)',
    title: '핵심 차량용 반도체(MCU) 3주 납기 지연! 생산 중단 위기',
    badge: '공급망 위기 · 임베디드 & 하드웨어',
    characterId: 'leader',
    dialogueBefore:
      '신입사원님, 글로벌 파운드리 팹의 공급 차질로 차세대 바디 제어기(BCU)에 들어가는 32비트 MCU 납기가 3주 지연된다고 통보왔습니다. 다음 달 공장 라인이 멈출 수도 있는 절체절명의 위기입니다!',
    situation:
      '차량 조명, 도어 록, 와이퍼를 총괄하는 바디 제어기(BCU) 마이크로컨트롤러(MCU) 칩셋 공급이 끊겼습니다. 경쟁사 호환 칩셋은 시장에 일부 재고가 있으나, 펌웨어와 회로 기판을 수정해야 합니다. 신입사원인 당신의 대응 전략은?',
    options: [
      {
        id: '5-a',
        label: 'A. 대체 칩셋을 위한 AUTOSAR MCAL 드라이버 빠른 포팅 및 재컴파일',
        actionText:
          '핀 호환 칩셋을 긴급 수급하고, 표준화된 AUTOSAR 아키텍처의 마이크로컨트롤러 추상화 계층(MCAL) 드라이버만 교체 포팅하여 상위 응용 소프트웨어를 즉시 재컴파일한다.',
        scoreDeltas: { vehicleSw: 3 },
        pros: '상위 응용 코드를 한 줄도 수정하지 않고 표준 아키텍처 드라이버만 교체해 1주일 만에 양산 재개 준비를 마칩니다.',
        cons: '대체 MCU 벤더의 독점 타이머(Timer) 및 ADC 인터럽트 루틴에서 미세한 타이밍 지터(Jitter)가 발생할 수 있습니다.',
        feedbackReaction: {
          characterId: 'swSenior',
          praise: 'AUTOSAR 표준 플랫폼의 진가를 발휘해 공급망 위기를 소프트웨어 유연성으로 돌파했습니다.',
          concern: '대체 칩셋의 하드웨어 타이머 특성이 기존 칩과 미세하게 달라 통신 지터 검증을 서둘러야 합니다.',
          comment:
            '현대 모빌리티가 AUTOSAR를 쓰는 이유를 완벽히 보여주었습니다! 단 6일 만에 드라이버를 포팅해 공장 셧다운을 막았습니다. 다만 칩셋 간 타이머 미세 오차는 밤샘 계측으로 검증해야 합니다.',
          tone: 'enthusiastic',
        },
        highlightKeywords: ['AUTOSAR MCAL', '드라이버 포팅', '표준 아키텍처'],
      },
      {
        id: '5-b',
        label: 'B. 대체 칩셋 적용 시 전원 노이즈(EMI/EMC) 및 PCB 회로 재설계 시뮬레이션',
        actionText:
          '대체 반도체의 전력 소모량, 발열, 전자기파 노이즈(EMI/EMC) 특성을 신속 시뮬레이션하고 PCB 다층 기판 배선을 리비전하여 하드웨어 안정성을 담보한다.',
        scoreDeltas: { electrificationHw: 3 },
        pros: '칩셋 변경 시 흔히 발생하는 전자파 간섭이나 리셋 오작동을 사전에 완벽히 방지하여 하드웨어 무결성을 확보합니다.',
        cons: 'PCB 샘플 제작 및 동판 에칭 공정으로 인해 최소 10일의 하드웨어 리드타임이 소요됩니다.',
        feedbackReaction: {
          characterId: 'hwLead',
          praise: '회로 노이즈와 전자기 적합성(EMC)을 선제적으로 시뮬레이션하여 2차 리콜 화근을 뿌리 뽑았습니다.',
          concern: '새 PCB 기판을 발주하고 동판을 찍어내는 동안 10일의 물리적 대기 시간이 소요되었습니다.',
          comment:
            '반도체가 바뀌면 노이즈 특성도 바뀝니다. 철저한 PCB 시뮬레이션 덕분에 계기판 깜빡임 현상을 사전에 방어했습니다! 다만 PCB 샘플 제작 기간 동안 라인 가동률이 일시 하락했습니다.',
          tone: 'impressed',
        },
        highlightKeywords: ['EMI/EMC 노이즈', 'PCB 회로 시뮬레이션', '전원 안정성'],
      },
      {
        id: '5-c',
        label: 'C. AEC-Q100 전장 신뢰성 평가 단축을 위한 패스트트랙 프로토콜 수립',
        actionText:
          '차량용 반도체 신뢰성 표준인 AEC-Q100 규격 시험 항목 중 핵심 필수 항목 위주로 패스트트랙 가속 수명 시험(HALT) 일정을 수립해 품질 승인 기간을 10일로 단축한다.',
        scoreDeltas: { qualitySafety: 3 },
        pros: '3개월 걸리던 전장 신뢰성 승인 기간을 가속 스트레스 시험으로 10일로 줄여 공장 중단 사태를 극적으로 회피합니다.',
        cons: '장기 내구 시험 데이터가 압축 진행되어 10년/16만 km 초장기 환경에서의 보증 리스크를 일부 떠안게 됩니다.',
        feedbackReaction: {
          characterId: 'safetyManager',
          praise: '신뢰성 표준 원칙을 지키면서도 가속 수명 시험으로 일정을 단축해 낸 뛰어난 품질 기획입니다.',
          concern: '초장기 내구 시험 기간이 단축된 만큼, 출고 후 텔레매틱스 원격 모니터링 강화를 전제해야 합니다.',
          comment:
            'AEC-Q100 패스트트랙으로 납기 위기를 극복했습니다! 품질 본부 승인도 마쳤네요. 다만 단축된 테스트 기간을 보완하기 위해 출고 차량의 칩셋 전압을 원격 모니터링하는 후속 조치가 필요합니다.',
          tone: 'approving',
        },
        highlightKeywords: ['AEC-Q100', '가속 수명 시험(HALT)', '전장 신뢰성 승인'],
      },
    ],
    industryTip: {
      title: 'AUTOSAR 표준과 차량용 반도체(MCU) 생태계',
      subtitle: '하드웨어와 소프트웨어를 분리하는 자동차 산업의 운영체제',
      summary:
        '과거에는 차량 부품마다 반도체 제조사별 전용 코드를 짰기 때문에 칩셋이 바뀌면 소프트웨어를 처음부터 다시 개발해야 했습니다. 글로벌 완성차와 부품사들이 연합해 만든 AUTOSAR(AUTomotive Open System ARchitecture)는 BSW(기초 소프트웨어)와 MCAL(칩셋 추상화) 계층을 두어, 칩셋이 교체되어도 응용 SW를 그대로 재사용할 수 있게 만듭니다.',
      keyPoints: [
        'Classic AUTOSAR (마이크로초 실시간 제어) vs Adaptive AUTOSAR (고성능 리눅스/QNX 기반)',
        '차량용 반도체 신뢰성 인증 규격 AEC-Q100 등급 체계',
        '글로벌 반도체 공급망 리스크와 멀티 소싱(Multi-sourcing) 전략',
      ],
      fieldRelevance: '현대오토에버, 보쉬(Bosch), 콘티넨탈, 텔레칩스, 인피니언 등 전장 소프트웨어 필수',
    },
  },

  {
    id: 6,
    day: 2,
    orderInDay: 3,
    totalInDay: 3,
    timeString: 'Day 2 / 17:30 PM (퇴근 전 품질 안전 위원회)',
    title: '자율주행 긴급제동(AEB) 유령 제동(Phantom Braking) 민원 급증',
    badge: '도심 ADAS 안전 · 자율주행 & 품질안전',
    characterId: 'aiLead',
    dialogueBefore:
      '신입사원님, 오늘 퇴근 직전 긴급 보고가 들어왔습니다. 도심 지하차도 입구 그늘이나 도로 위 맨홀 뚜껑을 장애물로 착각해 차가 아무 이유 없이 급정거하는 "유령 제동(Phantom Braking)" 민원이 급증했습니다! 뒤차 추돌 위험이 큽니다.',
    situation:
      '비전 카메라와 레이더가 도로 위의 강한 명암 대비(그림자)나 금속 맨홀 뚜껑을 장애물로 잘못 판정(False Positive)하여 시속 60km에서 급제동이 걸리는 현상입니다. 안전 마진을 너무 좁히면 진짜 보행자를 칠 위험이 있고, 너무 넓히면 유령 제동으로 뒤차가 들이받습니다.',
    options: [
      {
        id: '6-a',
        label: 'A. 시간차 시계열 레이더 도플러 속도 및 수직 높이(Elevation) 필터링 적용',
        actionText:
          '4D 이미징 레이더의 Z축 높이 정보와 도플러(Doppler) 상대속도 데이터를 결합해 도로 바닥에 고정된 정적 금속체(맨홀)를 장애물 목록에서 자동 제외한다.',
        scoreDeltas: { autonomousAi: 3 },
        pros: '도로 바닥의 맨홀이나 그림자로 인한 허위 급제동을 95% 이상 제거하여 주행 안정감을 대폭 개선합니다.',
        cons: '실제 도로 위에 쓰러져 있는 보행자나 낮은 타이어 잔해물 같은 납작한 위험물을 놓칠 위험(False Negative)이 미세하게 생깁니다.',
        feedbackReaction: {
          characterId: 'aiLead',
          praise: '레이더의 수직 각도와 도플러 상대속도를 활용해 맨홀 허위 인식을 기막히게 걸러냈습니다.',
          concern: '도로에 누워 있는 보행자나 낙하물 같은 낮은 객체를 무시하지 않도록 안전 마진을 재점검해야 합니다.',
          comment:
            '레이더의 고도 정보로 맨홀 착각을 깔끔히 지웠습니다! 유령 제동 민원이 즉시 사라졌네요. 하지만 도로 위 실제 낮은 낙하물을 맨홀로 착각해 들이받지 않도록 보완 알고리즘을 덧붙여야 합니다.',
          tone: 'enthusiastic',
        },
        highlightKeywords: ['4D 레이더 높이 정보', '도플러 상대속도', '정적 객체 필터링'],
      },
      {
        id: '6-b',
        label: 'B. 2단계 경보 시스템 도입 (1단계 햅틱/경고음 후 운전자 미반응 시에만 제동)',
        actionText:
          '충돌 위험 지수(TTC: Time-To-Collision) 감지 시 즉각 풀 브레이킹을 걸지 않고, 스티어링 휠 진동과 헤드업 디스플레이 경고를 먼저 0.4초간 제공한 후 감속을 시작한다.',
        scoreDeltas: { qualitySafety: 2, vehicleSw: 1 },
        pros: '운전자가 돌발 상황을 인지하고 조향으로 회피할 기회를 주어 불필요한 급제동으로 인한 후방 추돌 사고를 막습니다.',
        cons: '진짜 돌발 보행자가 튀어나왔을 때 제동 개입 시점이 0.3~0.4초 늦어져 제동 거리가 4~5m 늘어납니다.',
        feedbackReaction: {
          characterId: 'safetyManager',
          praise: '인간 운전자와의 협업(HMI)을 통해 불필요한 급제동 놀람을 방지한 현실적인 안전 프로토콜입니다.',
          concern: '보행자 충돌 시험(Euro NCAP)에서 반응 지연으로 인해 감점이 될 수 있는 규제 리스크가 있습니다.',
          comment:
            '운전자의 제어권을 존중하여 뒤차 추돌을 방어한 좋은 HMI 설계입니다! 다만 보행자 보호 안전 테스트에서는 제동 지연으로 평가 점수가 깎일 수 있으니 세부 튜닝이 필수입니다.',
          tone: 'cautious',
        },
        highlightKeywords: ['2단계 경보 HMI', 'TTC 충돌 여유 시간', '스티어링 햅틱'],
      },
      {
        id: '6-c',
        label: 'C. 유령 제동 발생 위치 GPS 좌표 클라우드 수집 및 크라우드소싱 지도 패치',
        actionText:
          '유령 제동이 빈발하는 전국 50개 지하차도 및 특정 맨홀 지점의 GPS 좌표를 텔레매틱스로 자동 집계해 해당 구역의 비전 민감도를 자동 완화하는 클라우드 맵을 배포한다.',
        scoreDeltas: { serviceData: 3 },
        pros: '소프트웨어 전체 로직을 건드리지 않고도 문제 지점만 정밀 타격하여 민원을 신속하게 해결할 수 있습니다.',
        cons: '클라우드 맵이 아직 구축되지 않은 새로운 도로나 지방 도로에서는 여전히 유령 제동이 발생합니다.',
        feedbackReaction: {
          characterId: 'serviceLead',
          praise: '클라우드 데이터를 활용해 문제가 되는 핫스팟 지역을 핀포인트로 해결한 영리한 플랫폼 접근입니다.',
          concern: '데이터가 없는 신규 도로에서는 근본 해결이 되지 않는 지리적 한계가 존재합니다.',
          comment:
            '신선한 데이터 드리븐 해법입니다! 강남순환고속도로 지하차도 입구의 유령 제동을 맵 패치로 즉시 해결했네요. 하지만 미등록 도로에서의 근본 알고리즘 개선은 병행되어야 합니다.',
          tone: 'thoughtful',
        },
        highlightKeywords: ['GPS 핫스팟 집계', '크라우드소싱 지도', '지리적 민감도 완화'],
      },
    ],
    industryTip: {
      title: '유령 제동 (Phantom Braking)과 ADAS 튜닝의 딜레마',
      subtitle: '오작동(False Positive)과 미작동(False Negative) 사이의 영원한 숙제',
      summary:
        'AEB(Autonomous Emergency Braking, 비상자동제동장치)는 전방 추돌 사고를 40% 이상 줄이는 필수 안전 기술이지만, 그림자나 금속 물체, 날아가는 비닐봉지를 사람으로 오인해 급제동하면 후방 추돌이라는 또 다른 대형 사고를 유발합니다. 이 둘 사이의 균형점을 찾는 것이 ADAS 엔지니어링의 최고 난제입니다.',
      keyPoints: [
        'False Positive (오작동: 없는 장애물에 제동) vs False Negative (미작동: 진짜 장애물 놓침)',
        'TTC (Time To Collision, 충돌 예상 시간) 기반 다단계 경보 및 제동 임계치',
        'Euro NCAP 및 국토교통부 자동차 안전도 평가 비상자동제동 시험 기준',
      ],
      fieldRelevance: '현대차 ADAS제어개발팀, 테슬라 Autopilot팀, 모빌아이, 현대오토에버',
    },
  },

  // ==========================================
  // DAY 3 (오전 / 오후 / 퇴근 전) - 3 Events
  // ==========================================
  {
    id: 7,
    day: 3,
    orderInDay: 1,
    totalInDay: 3,
    timeString: 'Day 3 / 09:30 AM (모빌리티 전략 기획실)',
    title: '신규 도심 초급속 충전소 & 로보택시 허브 입지 선정',
    badge: '인프라 & 플랫폼 · 모빌리티 서비스',
    characterId: 'serviceLead',
    dialogueBefore:
      '신입사원님, 우리 넥스트모빌리티가 서울 강남/여의도/판교 중 50억 원을 투자해 차세대 350kW 초급속 충전 허브와 로보택시 전진기지를 구축할 계획입니다. 최종 입지를 결정할 핵심 기준을 제안해주세요.',
    situation:
      '단순히 땅값이 싸거나 유동인구가 많은 곳만 볼 수 없습니다. 초급속 충전소는 거대한 전력 수전 설비가 필요하고, 미래 로보택시 운행 가능 영역(ODD)과 커넥티드카 고객들의 실시간 충전 동선이 맞물려야 합니다. 당신의 우선순위는?',
    options: [
      {
        id: '7-a',
        label: 'A. 커넥티드카 10만 대 주행 궤적 및 시간대별 대기 수요 빅데이터 분석',
        actionText:
          '차량 텔레매틱스에서 수집된 실제 주행 궤적(GPS 로그), SOC 잔량 분포, 시간대별 호출 출발지-도착지(O/D) 데이터를 공간 군집화(DBSCAN)하여 최적 거점을 선정한다.',
        scoreDeltas: { serviceData: 3 },
        pros: '충전소 가동률과 일일 회전율을 140% 이상 극대화하여 투자비(CAPEX) 회수 기간을 2년 단축할 수 있습니다.',
        cons: '수요가 가장 몰리는 도심 핵심 요지는 토지 매입비와 임대료가 극도로 비싸 초기 자본 부담이 큽니다.',
        feedbackReaction: {
          characterId: 'serviceLead',
          praise: '공간 빅데이터 분석으로 판교 테크노밸리의 퇴근길 충전 수요 밀집 지역을 정확히 짚어냈습니다.',
          concern: '해당 부지의 높은 임대료와 부지 확보 경쟁으로 인한 초기 예산 초과 리스크가 있습니다.',
          comment:
            '데이터가 정답을 알려주었네요! 충전소 예상 가동률이 82%로 치솟았습니다. 다만 판교 부지 임대료가 당초 예산보다 15% 비싸서 재무팀과의 협상이 필요합니다.',
          tone: 'enthusiastic',
        },
        highlightKeywords: ['주행 궤적 빅데이터', 'O/D 데이터 분석', '공간 군집화'],
      },
      {
        id: '7-b',
        label: 'B. 한전 전력망 인입 용량(고압 수전) 및 메가와트급 ESS·냉각 인프라 적합성',
        actionText:
          '350kW 급속 충전기 8기를 동시 가동하기 위한 3MW급 특고압 수전 인프라 가능 여부와 대용량 에너지저장장치(ESS) 및 칠러 냉각 배관 설치 공간을 최우선으로 평가한다.',
        scoreDeltas: { electrificationHw: 3 },
        pros: '전력망 증설 공사 기간(최대 1년)과 전력 인입 수수료 수억 원을 아끼고 개통 즉시 안정적인 출력을 보장합니다.',
        cons: '전력 인입이 용이한 곳은 대개 도심 외곽 변전소 근처라 일반 운전자들의 진입 접근성이 다소 떨어질 수 있습니다.',
        feedbackReaction: {
          characterId: 'hwLead',
          praise: '전력 계통 한계를 꿰뚫어 전력망 수전 공사 지연으로 충전기를 켜지도 못하는 참사를 막았습니다.',
          concern: '변전소 인근 부지라 일반 고객 접근성이 다소 떨어져 유인 마케팅이 추가로 필요합니다.',
          comment:
            '인프라의 물리적 본질을 정확히 보셨습니다! 3MW 전력망을 바로 끌어올 수 있어 개통 일정을 6개월 앞당겼습니다. 다만 고객 접근성이 살짝 떨어지니 내비게이션 경로 추천 프로모션을 연계해야 합니다.',
          tone: 'impressed',
        },
        highlightKeywords: ['특고압 수전 인프라', '3MW급 전력망', 'ESS 및 냉각 배관'],
      },
      {
        id: '7-c',
        label: 'C. 자율주행 로보택시의 진출입 도로 환경 및 ODD(운행가능영역) 안전성',
        actionText:
          '골목길 병목 현상, GPS 전파 음영 지역, 복잡한 비신호 교차로 등을 배제하고, 무인 로보택시가 센서 가림 없이 원활하게 출동 및 복귀할 수 있는 도로 구조를 우선 검토한다.',
        scoreDeltas: { autonomousAi: 3 },
        pros: '향후 레벨 4 무인 로보택시가 비신호 정체 없이 자율주행으로 자동 충전기 복귀를 성공적으로 수행할 수 있습니다.',
        cons: '자율주행 ODD 도로 조건에 지나치게 얽매여 실제 일반 전기차 고객들의 도심 접근 선호지와 괴리가 생길 수 있습니다.',
        feedbackReaction: {
          characterId: 'aiLead',
          praise: '미래 로보택시의 무인 배차와 자동 충전 입출차 동선을 배려한 선견지명 있는 입지 분석입니다.',
          concern: '로보택시 편의성에 집중하느라 현재 돈을 벌어다 줄 일반 승용차 고객들의 충전 동선이 약간 양보되었습니다.',
          comment:
            '자율주행 ODD의 도로 환경을 훌륭하게 반영했습니다! 로보택시 진출입 사고율을 0%로 만들 수 있겠네요. 다만 현재 일반 EV 이용자들의 시내 진입 편의성도 균형 있게 고려해야 합니다.',
          tone: 'approving',
        },
        highlightKeywords: ['자율주행 ODD', '무인 출동 동선', 'GPS 음영 배제'],
      },
    ],
    industryTip: {
      title: 'Plug & Charge (ISO 15118)와 충전 인프라 데이터',
      subtitle: '커넥터만 꽂으면 차량 인증과 결제가 끝나는 미래 충전',
      summary:
        '전기차 충전 경험의 혁신이라 불리는 PnC(Plug & Charge, ISO 15118)는 실물 카드나 앱 태그 없이 차량과 충전기가 TLS 암호화 통신을 통해 차량 식별자(VID)와 전자 서명을 주고받아 자동으로 결제를 처리합니다. 충전소 입지 선정 역시 단순 지리적 위치가 아니라 전력 계통(Grid) 수전 용량과 실시간 플릿(Fleet) 이동 데이터의 융합 분석이 필수입니다.',
      keyPoints: [
        'ISO 15118 국제 표준 및 PKI(공개키 기반구조) 암호화 인증',
        'OCPP (Open Charge Point Protocol) 기반 충전기-클라우드 중앙 관제',
        'V2G (Vehicle-to-Grid) 양방향 충방전 에너지 생태계',
      ],
      fieldRelevance: '현대차 E-pit, 테슬라 수퍼차저, SK일렉링크, 카카오모빌리티 등 충전 플랫폼 기획/개발',
    },
  },

  {
    id: 8,
    day: 3,
    orderInDay: 2,
    totalInDay: 3,
    timeString: 'Day 3 / 14:00 PM (차량 전자 아키텍처 연구실)',
    title: '도메인 제어기 통신 부하 폭증! CAN 버스 점유율 85% 돌파',
    badge: '차량 네트워크 병목 · 차량 SW & 아키텍처',
    characterId: 'swSenior',
    dialogueBefore:
      '신입사원님, 자율주행 센서와 인포테인먼트가 전송하는 패킷이 급증하면서 차체 메인 CAN 버스 점유율이 85%를 넘어섰습니다! 긴급 제동 신호마저 전송 지연(Latency)이 발생할 수 있는 위험 상태입니다.',
    situation:
      '기존 클래식 CAN 2.0 통신 대역폭(최대 1Mbps)이 한계에 도달했습니다. 차량 내 전장 부품들이 주고받는 데이터가 넘쳐나 패킷 충돌과 지연이 발생하고 있습니다. 다음 세대 아키텍처를 위한 당신의 기술적 처방은?',
    options: [
      {
        id: '8-a',
        label: 'A. 대역폭 8배의 CAN-FD 및 Automotive Ethernet(차량용 이더넷) 스택 전환',
        actionText:
          '최대 5Mbps까지 지원하는 CAN-FD로 버스를 업그레이드하고, 대용량 멀티미디어 및 센서 통신 라인을 최대 1Gbps 초고속 차량용 이더넷(TSN/SOME/IP)으로 분리 전환한다.',
        scoreDeltas: { vehicleSw: 3 },
        pros: '차량 내 통신 대역폭을 1,000배 확장하여 향후 10년간의 센서 데이터 폭증에도 끄떡없는 차세대 SDV 아키텍처를 완성합니다.',
        cons: '기존 클래식 ECU들의 트랜시버 칩셋 교체 비용과 차량용 이더넷 케이블 하네스 단가가 올라갑니다.',
        feedbackReaction: {
          characterId: 'swSenior',
          praise: '차세대 존(Zonal) 아키텍처의 정석대로 이더넷과 CAN-FD를 결합해 버스 부하를 단숨에 28%로 내렸습니다.',
          concern: '전장 하네스와 이더넷 PHY 칩셋 단가가 차량당 약 8만 원 상승하여 원가 절감 과제가 주어집니다.',
          comment:
            '차세대 E/E 아키텍처의 정답입니다! 네트워크 병목을 완벽히 뚫었습니다. 다만 새로 도입된 차량용 이더넷 PHY 트랜시버의 부품 단가 상승은 다른 부품 모듈화로 상쇄해야 합니다.',
          tone: 'enthusiastic',
        },
        highlightKeywords: ['CAN-FD', '차량용 이더넷 TSN', 'SOME/IP 통신 스택'],
      },
      {
        id: '8-b',
        label: 'B. 안전 필수 메시지 CAN ID 우선순위 재정렬 및 전송 주기 최적화',
        actionText:
          '제동·조향·에어백 등 기능안전 필수 메시지에 가장 높은 CAN ID 중재 우선순위를 부여하고, 덜 중요한 실내 온도나 조명 상태 메시지의 전송 주기를 10ms에서 100ms로 낮춘다.',
        scoreDeltas: { vehicleSw: 2, qualitySafety: 1 },
        pros: '하드웨어 부품 교체 비용 0원으로 소프트웨어 스케줄링 튜닝만으로 긴급 제동 패킷 지연을 2ms 이하로 보장합니다.',
        cons: '근본적인 대역폭 확장 없이 쥐어짠 대증요법이므로 향후 센서가 1~2개만 더 추가되어도 다시 병목이 재발합니다.',
        feedbackReaction: {
          characterId: 'swSenior',
          praise: '단 한 푼의 추가 원가 없이 소프트웨어 스케줄링만으로 긴급 패킷의 실시간성을 방어했습니다.',
          concern: '대역폭의 물리적 한계는 그대로라 내년 페이스리프트 모델에서 센서가 늘어나면 또 터질 수 있습니다.',
          comment:
            '비용 0원으로 급한 불을 끈 영리한 최적화입니다! 하지만 대역폭 자체가 한계치에 다다른 만큼, 장기적으로는 차세대 통신망 전환 프로젝트를 병행 추진해야 합니다.',
          tone: 'impressed',
        },
        highlightKeywords: ['CAN ID 중재 우선순위', '전송 주기 최적화', '소프트웨어 스케줄링'],
      },
      {
        id: '8-c',
        label: 'C. 엣지 AI 전처리(Edge AI) 도입으로 원시 센서 데이터 전송량 압축',
        actionText:
          '카메라/라이다 원시(Raw) 데이터를 중앙 제어기로 통째로 쏘지 않고, 센서 자체 엣지 NPU에서 객체 바운딩 박스와 거리 정보만 추출하여 경량화된 결과값만 버스에 전송한다.',
        scoreDeltas: { autonomousAi: 3 },
        pros: '중앙 통신 버스 트래픽을 90% 이상 획기적으로 줄여 통신 지연을 없애고 분산 컴퓨팅 효율을 극대화합니다.',
        cons: '센서 모듈마다 고성능 NPU 칩이 추가 탑재되어 개별 센서 부품의 단가와 센서 자체의 발열이 증가합니다.',
        feedbackReaction: {
          characterId: 'aiLead',
          praise: '센서 단에서 경량 딥러닝 전처리를 수행해 네트워크 트래픽을 90% 이상 획기적으로 다이어트했습니다.',
          concern: '개별 센서 모듈마다 엣지 NPU가 추가되어 카메라/라이다 부품 단가가 15% 상승했습니다.',
          comment:
            '최신 분산 AI 아키텍처의 핵심을 짚었습니다! 네트워크 대역폭 문제는 완벽히 해결되었네요. 다만 센서 모듈 자체의 발열과 원가 상승은 구매팀과 면밀히 점검해야 합니다.',
          tone: 'approving',
        },
        highlightKeywords: ['엣지 AI(Edge AI)', '센서 데이터 전처리', '트래픽 경량화'],
      },
    ],
    industryTip: {
      title: '차량 E/E (전기/전자) 아키텍처와 차량용 이더넷',
      subtitle: '분산 ECU에서 중앙 집중형 존(Zonal) 아키텍처로의 진화',
      summary:
        '과거의 자동차는 100개가 넘는 소형 ECU가 복잡한 전선 다발(와이어링 하네스)로 연결된 분산 구조였습니다. SDV 시대에는 차량을 몇 개의 구역(Zone)으로 나누고 중앙 고성능 컴퓨터(HPC)가 초고속 차량용 이더넷(100Mbps~10Gbps)과 CAN-FD로 통신하는 존 아키텍처(Zonal Architecture)로 완전히 재편되고 있습니다.',
      keyPoints: [
        'CAN (최대 1Mbps) vs CAN-FD (최대 5Mbps) vs Automotive Ethernet (100Mbps~10Gbps)',
        'SOME/IP (Scalable service-Oriented MiddlewarE over IP) 서비스 지향 통신',
        'TSN (Time-Sensitive Networking)을 통한 안전 제어 패킷의 시간 확정성(Determinism) 보장',
      ],
      fieldRelevance: '현대차그룹 E/E 아키텍처 개발, 테슬라 중앙 컴퓨터 연구팀, 보쉬, 콘티넨탈',
    },
  },

  {
    id: 9,
    day: 3,
    orderInDay: 3,
    totalInDay: 3,
    timeString: 'Day 3 / 17:00 PM (퇴근 전 C-ITS 사업 미팅)',
    title: 'V2X(차량-사물 통신) 기반 신호등 잔여 시간 알림 서비스 론칭',
    badge: '스마트 시티 & V2X · 커넥티비티 & 서비스',
    characterId: 'serviceLead',
    dialogueBefore:
      '신입사원님, 오늘 퇴근 전 흥미로운 제안이 들어왔습니다. 지자체 교통정보 센터와 연동해 앞 교차로의 신호등이 언제 초록불로 바뀌는지 계기판에 초 단위로 띄워주는 V2X 서비스를 출시하려 합니다. 어떤 통신 아키텍처를 선택하시겠습니까?',
    situation:
      '차량과 도로 인프라가 대화하는 V2X(Vehicle to Everything) 서비스입니다. 기존 5G 상용 이동통신망(C-V2X 클라우드)을 쓰면 전국 어디서나 빠르게 서비스할 수 있지만 통신 지연(100ms)이 있고, 직접 근거리 통신(DSRC/Direct C-V2X)을 쓰면 지연이 10ms 이하로 즉각적이지만 도로변 기지국(RSU) 인프라가 깔린 곳에서만 작동합니다.',
    options: [
      {
        id: '9-a',
        label: 'A. 상용 5G 클라우드 기반 텔레매틱스 서비스 우선 출시 (전국 빠른 커버리지)',
        actionText:
          '별도의 도로변 통신 하드웨어(RSU) 구축을 기다리지 않고, 지자체 교통 신호 API 서버와 차량 5G 모뎀을 클라우드로 연동해 전국 단위로 빠르게 상용화한다.',
        scoreDeltas: { serviceData: 3 },
        pros: '추가 인프라 비용 없이 전국 8개 대도시 5만 개 교차로에 즉시 서비스를 오픈하여 압도적인 사용자 경험을 선점합니다.',
        cons: '이동통신 기지국 트래픽이나 터널 등에서 간헐적으로 0.2~0.5초의 지연(Latency)이 발생해 신호 카운트다운이 1초씩 튈 수 있습니다.',
        feedbackReaction: {
          characterId: 'serviceLead',
          praise: '인프라 구축을 기다리지 않고 5G 클라우드로 전국에 즉각 서비스한 뛰어난 비즈니스 속도전입니다.',
          concern: '통신 지연으로 인해 계기판 신호 카운트가 1초 늦게 바뀌는 순간 운전자 불만이 나올 수 있습니다.',
          comment:
            '시장 선점을 위한 훌륭한 전략입니다! 단숨에 전국 서비스로 출시해 홍보 효과를 톡톡히 누렸네요. 다만 통신 지연 오차를 보정하기 위해 칼만 필터 예측 로직을 클라이언트 계기판에 보강해야 합니다.',
          tone: 'enthusiastic',
        },
        highlightKeywords: ['5G 클라우드 V2X', '전국 빠른 상용화', '플랫폼 선점'],
      },
      {
        id: '9-b',
        label: 'B. 10ms 초저지연 Direct C-V2X (PC5 직결 통신) 및 차량용 통신 모듈 탑재',
        actionText:
          '클라우드를 거치지 않고 신호등 제어기와 차량 통신 칩셋이 직접 수밀리초 내에 통신하는 Direct C-V2X(PC5) 전용 모뎀을 차량 샤크 안테나에 탑재한다.',
        scoreDeltas: { vehicleSw: 2, electrificationHw: 1 },
        pros: '지연시간 10ms 이하의 실시간 확정성을 보장하여 향후 자율주행 차량의 교차로 무정차 통과 제어에도 안전하게 사용 가능합니다.',
        cons: '아직 전국 도로에 Direct V2X RSU(도로변 기지국)가 설치된 교차로가 5% 미만이라 당장 서비스를 쓸 수 있는 곳이 극히 적습니다.',
        feedbackReaction: {
          characterId: 'swSenior',
          praise: '미래 자율주행 교차로 제어까지 바라보고 10ms 초저지연 직결 통신 표준을 택한 정통 기술 선택입니다.',
          concern: '현재 전국에 RSU 기지국이 설치된 곳이 적어 일반 고객들이 "기능이 안 켜진다"고 문의할 수 있습니다.',
          comment:
            '기술적 완성도와 미래 확장성 면에서는 완벽한 선택입니다! 실시간성이 보장되어 자율주행 안전 신호로도 쓸 수 있네요. 다만 지자체의 RSU 인프라 보급 속도에 따라 초기 활성화가 더딜 수 있습니다.',
          tone: 'impressed',
        },
        highlightKeywords: ['Direct C-V2X (PC5)', '10ms 초저지연', '자율주행 교차로 연동'],
      },
      {
        id: '9-c',
        label: 'C. 교통 신호 데이터 위변조 방지 V2X 보안 인증(SCMS) 및 암호화 검증',
        actionText:
          '해커가 신호등 정보를 가짜로 조작하여 초록불로 속이는 사이버 공격을 원천 차단하기 위해 IEEE 1609.2 표준 기반 V2X 보안인증체계(SCMS) 전자서명을 필수 검증한다.',
        scoreDeltas: { qualitySafety: 3 },
        pros: '가짜 신호 패킷 인젝션으로 인한 교차로 충돌 테러를 100% 차단하며 국제 커넥티드카 사이버보안 표준을 충족합니다.',
        cons: '매 신호 패킷마다 암호화 서명을 검증하느라 차량 통신 제어기(TCU)의 CPU 사용량이 20% 증가합니다.',
        feedbackReaction: {
          characterId: 'safetyManager',
          praise: '커넥티드 V2X 통신에서 가장 치명적인 해킹 및 패킷 위변조 리스크를 사전에 원천 차단했습니다.',
          concern: '초당 수십 개의 암호화 서명 검증으로 차량 통신 컨트롤러(TCU) 프로세서 부하가 늘어났습니다.',
          comment:
            '신호등 정보를 해킹당하면 대형 참사로 이어집니다. SCMS 보안 인증을 의무화한 혜안에 박수를 보냅니다! 다만 TCU 암호화 하드웨어 가속기(HSM)를 활용해 연산 지연을 줄여주어야 합니다.',
          tone: 'approving',
        },
        highlightKeywords: ['V2X 보안인증(SCMS)', 'IEEE 1609.2', '사이버보안 검증'],
      },
    ],
    industryTip: {
      title: 'V2X (Vehicle-to-Everything)와 C-ITS 스마트 교통',
      subtitle: '차량이 보이지 않는 코너 너머의 위험과 대화하는 초연결 통신',
      summary:
        'V2X는 차량과 차량(V2V), 차량과 도로 인프라(V2I), 차량과 보행자(V2P)가 서로의 속도, 위치, 신호등 정보를 무선으로 교환하는 기술입니다. 사각지대 돌발 차량 감지, 전방 응급차량 길 터주기, 신호등 잔여 시간 알림 등 안전과 자율주행의 핵심 보조 수단으로 발전하고 있습니다.',
      keyPoints: [
        'DSRC (WAVE 근거리 전용 무선통신) vs Cellular C-V2X (LTE/5G 기반 V2X)',
        'SCMS (Security Credential Management System) 기반 익명 인증 및 전자 서명',
        '자율주행 레벨 4 협조 자율주행(Cooperative Autonomous Driving)의 필수 인프라',
      ],
      fieldRelevance: '국토교통부 C-ITS 사업, 카카오모빌리티, LG전자 VS사업본부, 현대차그룹 통신선행연구',
    },
  },

  // ==========================================
  // DAY 4 (오전 / 오후 / 퇴근 전) - 3 Events
  // ==========================================
  {
    id: 10,
    day: 4,
    orderInDay: 1,
    totalInDay: 3,
    timeString: 'Day 4 / 10:00 AM (기능안전 인증 평가실)',
    title: 'ISO 26262 ASIL-D 조향·제동 2중화(Redundancy) 격론',
    badge: '국제 표준 인증 · 품질/기능안전',
    characterId: 'safetyManager',
    dialogueBefore:
      '신입사원님, 자율주행 레벨 3 상용화를 앞두고 사업부와 설계팀이 대립 중입니다. "조향/제동 모터와 전원선을 2중(Redundancy)으로 넣으면 차량 원가와 무게가 너무 늘어난다"는 사업부와 타협 없는 안전팀 사이에서 어떤 솔루션을 내놓겠습니까?',
    situation:
      '자율주행 중 주 조향 제어기나 전원이 단선되었을 때 운전자가 즉시 개입하지 못하면 대형 인명 사고로 이어집니다. ISO 26262 최고 등급인 ASIL-D를 만족시키면서도 원가 상승을 방어해야 하는 복합 과제입니다.',
    options: [
      {
        id: '10-a',
        label: 'A. Fail-Operational을 위한 전원·통신·액추에이터 완전 2중화 고수',
        actionText:
          'ISO 26262 ASIL-D 안전 목표를 달성하기 위해 듀얼 와인딩(Dual-winding) 모터와 독립 듀얼 ECU, 백업 전원선을 완비한 완전 Fail-Operational 하드웨어 구조를 고수한다.',
        scoreDeltas: { qualitySafety: 3 },
        pros: '주 제어기가 전소되더라도 100% 독립된 보조 제어기가 즉시 핸들을 돌려 글로벌 Euro NCAP 안전 만점 인증을 획득합니다.',
        cons: '조향/제동 전장 모듈당 부품 원가가 약 25만 원 상승하고 배선 무게가 4.2kg 증가합니다.',
        feedbackReaction: {
          characterId: 'safetyManager',
          praise: '조향과 제동은 사람의 생명입니다. 어떤 원가 타협도 거부한 위대한 안전 엔지니어링 결단입니다.',
          concern: '차량 대당 원가가 25만 원 뛰면서 사업본부의 영업이익 목표치 달성에 비상이 걸렸습니다.',
          comment:
            '타협 없는 안전성 고수로 유럽 및 북미 최고 안전 등급 요건을 완벽히 확보했습니다! 다만 원가 상승 부담이 큰 만큼, 플랫폼 통합 양산 수량을 늘려 규모의 경제로 부품 단가를 깎는 전략을 지원해야 합니다.',
          tone: 'enthusiastic',
        },
        highlightKeywords: ['ISO 26262 ASIL-D', 'Fail-Operational', '듀얼 와인딩 모터'],
      },
      {
        id: '10-b',
        label: 'B. 하드웨어 추가 대신 스마트 SW 감시(Watchdog) 및 토크 벡터링 제동 제어',
        actionText:
          '물리적 부품을 무작정 2배로 늘리지 않고, 메인 제어기 고장 시 각 휠의 좌우 차동 제동(Torque Vectoring) 소프트웨어로 차량을 조향시키는 가상 2중화 알고리즘을 제안한다.',
        scoreDeltas: { vehicleSw: 2, qualitySafety: 1 },
        pros: '수백억 원의 하드웨어 부품 추가 원가를 아끼면서도 제동력의 좌우 차이로 핸들을 돌리는 스마트 SW 리던던시를 구현합니다.',
        cons: '제동으로 조향을 대신하므로 급박한 코너링 상황에서 회전 반경이 제한되고 브레이크 패드 마모가 심해집니다.',
        feedbackReaction: {
          characterId: 'swSenior',
          praise: '핸들 모터가 고장 나도 바퀴의 좌우 제동력 차이로 차선을 유지하는 경이로운 제어 소프트웨어 설계입니다.',
          concern: '급커브 길에서는 조향 각도 한계가 존재해 운전자에게 즉시 수동 개입을 경고해야 합니다.',
          comment:
            '천재적인 소프트웨어 아이디어입니다! 듀얼 모터 하드웨어 없이 소프트웨어로 2중화를 구현해 원가를 수백억 원 아꼈네요. 단, 한계 조향각 이상에서는 브레이크만으로 꺾기 어려우므로 즉각적인 비상 경보가 뒤따라야 합니다.',
          tone: 'impressed',
        },
        highlightKeywords: ['토크 벡터링 제어', '가상 2중화(SW Redundancy)', '원가 절감'],
      },
      {
        id: '10-c',
        label: 'C. 12V 저전압 LFP 보조 배터리 통합 전원 모듈 HW 개발',
        actionText:
          '메인 고전압 DC-DC 컨버터 고장 시에도 조향·제동 제어기에 최소 30초간 비상 전력을 공급할 수 있는 고출력 보조 LFP 배터리 팩 전력 하드웨어를 컴팩트하게 패키징한다.',
        scoreDeltas: { electrificationHw: 3 },
        pros: '갑작스러운 고전압 릴레이 차단 상황에서도 30초간 안전 전원을 유지해 갓길 정차 전력을 확실히 공급합니다.',
        cons: '기존 납산 배터리 대비 LFP 배터리 팩과 전용 BMS 보드가 추가되어 배터리 패키징 공간 설계가 빡빡해집니다.',
        feedbackReaction: {
          characterId: 'hwLead',
          praise: '자율주행의 아킬레스건인 저전압 전원 상실 리스크를 잡는 완벽한 LFP 보조 전력 모듈을 패키징했습니다.',
          concern: '보닛 안쪽 엔진룸 전장 배치 공간이 좁아져 기구 설계팀과 공간 쟁탈전이 벌어졌습니다.',
          comment:
            '전원 차단 공포를 완벽히 지워낸 전동화 하드웨어 설계입니다! 비상 전원 신뢰성이 대폭 올라갔네요. 기구 설계팀과 잘 협의해 배터리 패키징 공간을 깔끔하게 마감해야겠습니다.',
          tone: 'approving',
        },
        highlightKeywords: ['LFP 보조 배터리', '비상 전력 모듈', '전동화 패키징'],
      },
    ],
    industryTip: {
      title: 'ISO 26262 기능안전과 ASIL (Automotive Safety Integrity Level)',
      subtitle: '자동차 전장 시스템의 고장 위험을 통제하는 글로벌 안전 바이블',
      summary:
        'ISO 26262는 자동차 전자제어 시스템 오류로 인한 사고를 방지하기 위한 국제 표준입니다. 위험도(Severity), 노출 빈도(Exposure), 제어 가능성(Controllability)을 곱해 QM(품질관리)부터 ASIL A, B, C, D까지 4개 등급을 부여합니다. 조향(Steering)이나 제동(Brake)처럼 고장 시 사망 사고로 이어질 수 있는 시스템은 최고 등급인 ASIL-D를 필수적으로 획득해야 합니다.',
      keyPoints: [
        'Fail-Safe (고장 시 안전하게 정지) vs Fail-Operational (고장 나도 일정 시간 정상 제어 지속)',
        'HARA (Hazard Analysis and Risk Assessment, 위험원 분석 및 리스크 평가)',
        '하드웨어 고장 확률 메트릭(PMHF) 및 싱글 포인트 결함 검출율(SPFM > 99%)',
      ],
      fieldRelevance: '현대모비스, 만도, LG전자 VS사업본부, TÜV Rheinland 인증 엔지니어',
    },
  },

  {
    id: 11,
    day: 4,
    orderInDay: 2,
    totalInDay: 3,
    timeString: 'Day 4 / 14:00 PM (자율주행 AI 시뮬레이션 랩)',
    title: '고속도로 위 특수 적재 트럭을 배경으로 오인식한 AI 모델',
    badge: '코너 케이스 극복 · 자율주행/AI & 안전',
    characterId: 'aiLead',
    dialogueBefore:
      '신입사원님, 아찔한 일이 있었습니다! 오늘 실차 시험 중 거대한 거울과 사다리를 실은 특수 화물 트럭을 자율주행 비전 AI가 도로변 방음벽 배경으로 오인식해 급정거를 못 할 뻔했습니다. 이 치명적인 코너 케이스(Corner Case)를 어떻게 해결할까요?',
    situation:
      '딥러닝 인지 모델이 학습 데이터셋에서 한 번도 본 적 없는 기괴한 외형의 특수 화물 차량을 도로 구조물로 분류했습니다. 실제 도로에는 수만 가지 예측 불가능한 돌발 상황이 존재합니다. 인공지능의 안전성을 끌어올릴 당신의 조치는?',
    options: [
      {
        id: '11-a',
        label: 'A. 3D 생성형 AI 시뮬레이션으로 수만 건의 변형 엣지 케이스 합성 및 재학습',
        actionText:
          '위험 상황의 원시 LiDAR 포인트클라우드와 영상을 기반으로, NeRF/3D 가우시안 스플래팅 기술을 활용해 거울·사다리·특수 적재물 데이터를 대규모로 합성 증강(Augmentation)해 파운데이션 모델을 재학습한다.',
        scoreDeltas: { autonomousAi: 3 },
        pros: '실제 위험 도로를 주행하지 않고도 수만 가지 가상 변형 시나리오를 주입해 특수 화물 인식률을 98.4%까지 비약적으로 상승시킵니다.',
        cons: '생성형 가상 데이터셋 합성과 GPU 클러스터 대규모 파운데이션 모델 재학습에 수천만 원의 클라우드 컴퓨팅 비용이 듭니다.',
        feedbackReaction: {
          characterId: 'aiLead',
          praise: '최신 생성형 AI 시뮬레이션으로 미지의 엣지 케이스를 데이터로 정복해 낸 탁월한 AI 리서치 접근입니다.',
          concern: '수백 대의 A100/H100 GPU 클라우드 학습 비용이 발생하여 AI 연구 예산 집행 결재가 필요합니다.',
          comment:
            '최신 자율주행 트렌드를 완벽히 적용했습니다! 3D 합성 데이터 증강으로 특수 화물 인식 문제를 깔끔히 풀었네요. 다만 대규모 모델 재학습에 들어간 클라우드 서버 비용만큼 확실한 성능 지표를 경영진에 증명해야 합니다.',
          tone: 'enthusiastic',
        },
        highlightKeywords: ['생성형 AI 시뮬레이션', '데이터 증강(Augmentation)', '파운데이션 모델 재학습'],
      },
      {
        id: '11-b',
        label: 'B. 모션 플래닝 궤적 생성 시 미확인 물체에 대한 불확실성(Uncertainty) 회피 로직',
        actionText:
          '인지 모델이 객체를 100% 특정하지 못하더라도, 공간 점유(Occupancy Grid) 지도 상에 물리적 부피가 감지되면 선제적으로 안전 거리를 벌리고 서행하는 방어적 경로 생성 규칙을 수립한다.',
        scoreDeltas: { autonomousAi: 2, vehicleSw: 1 },
        pros: 'AI가 처음 보는 기괴한 물체라도 형태 분류와 상관없이 물리적 부피만으로 즉시 안전 거리를 확보해 충돌을 원천 차단합니다.',
        cons: '도로변에 날리는 큰 종이박스나 연기 등 무해한 물체 앞에서도 지나치게 소극적으로 서행해 주행 흐름을 방해할 수 있습니다.',
        feedbackReaction: {
          characterId: 'aiLead',
          praise: '인공지능의 불완전성을 인정하고 안전한 공간 점유(Occupancy) 모션 플래닝으로 보완한 현명한 판단입니다.',
          concern: '차가 지나치게 소심해져 작은 장애물 앞에서도 감속을 남발하는 답답한 주행감이 생길 수 있습니다.',
          comment:
            '물체 이름이 무엇이든 물리적 덩어리가 있으면 피하는 점유 격자(Occupancy Grid)의 기본에 충실했습니다! 충돌은 완벽히 막았네요. 다만 너무 소심한 서행으로 고속도로 흐름을 끊지 않도록 감속 강도를 세밀하게 다듬어야 합니다.',
          tone: 'impressed',
        },
        highlightKeywords: ['Occupancy Grid', '불확실성(Uncertainty)', '방어적 모션 플래닝'],
      },
      {
        id: '11-c',
        label: 'C. SOTIF(ISO 21448) 및 실차 시험 주행장(PG) 극한 상황 전수 검증 통과 강제',
        actionText:
          '기능의 고장이 없더라도 인지 성능 한계로 발생하는 위험을 다루는 SOTIF(ISO 21448) 프로세스에 따라, HIL(Hardware-in-the-Loop) 시뮬레이션 및 실차 시험장 통과 전까지 배포를 차단한다.',
        scoreDeltas: { qualitySafety: 3 },
        pros: '의도된 기능의 안전성(SOTIF) 국제 인증을 완벽히 통과할 때까지 결함을 엄격히 통제하여 무결점 소프트웨어만 배포합니다.',
        cons: '수십 가지 실차 주행 시험장 테스트 일정이 추가되어 자율주행 정식 릴리즈가 2~3주 지연될 수 있습니다.',
        feedbackReaction: {
          characterId: 'safetyManager',
          praise: '미지의 위험 영역(Area 3)을 기지의 안전 영역(Area 1)으로 치환하는 SOTIF 표준 원칙을 철저히 고수했습니다.',
          concern: '실차 주행시험장(PG) 대관 일정과 검증 시간으로 인해 배포 일정이 2주 뒤로 밀렸습니다.',
          comment:
            '진정한 안전의 수호자다운 결단입니다! SOTIF 프로세스로 극한 상황 검증 관문을 확실하게 세웠습니다. 출시가 2주 늦어지더라도 고객 생명 앞에서는 100번이고 타당한 선택입니다.',
          tone: 'approving',
        },
        highlightKeywords: ['SOTIF (ISO 21448)', 'HIL 시뮬레이션', '위험 영역 축소'],
      },
    ],
    industryTip: {
      title: 'SOTIF (ISO 21448)와 자율주행 코너 케이스 (Corner Cases)',
      subtitle: '기계적 고장이 없어도 발생하는 AI 인지의 한계를 극복하는 안전 기술',
      summary:
        '과거 ISO 26262가 부품의 전기적/기계적 고장(Fault)을 다뤘다면, SOTIF(Safety Of The Intended Functionality, ISO 21448)는 부품이 멀쩡해도 안개, 역광, 기괴한 장애물 등으로 AI 인지 알고리즘이 착각을 일으키는 기능적 한계 위험을 다룹니다. 자율주행 상용화의 마지막 관문은 수많은 엣지 케이스를 데이터 증강과 시뮬레이션으로 극복하는 것입니다.',
      keyPoints: [
        'Occupancy Grid / 3D Voxel 기반 점유 격자 네트워크',
        'NeRF 및 생성형 AI 기반 가상 주행 합성 데이터셋 생성',
        'Shadow Mode: 양산 차량에서 AI 모델을 백그라운드로 돌려 코너 케이스 자동 수집',
      ],
      fieldRelevance: '자율주행 인지/판단 알고리즘 연구원, 현대차 자율주행사업부, 오토노머스에이투지, 모빌아이',
    },
  },

  {
    id: 12,
    day: 4,
    orderInDay: 3,
    totalInDay: 3,
    timeString: 'Day 4 / 17:30 PM (퇴근 전 사이버보안 모의해킹 보고)',
    title: '전장 제어기 모의해킹 침투 취약점 발견! CAN 인젝션 위기',
    badge: '차량 사이버보안 · UNECE WP.29 & 임베디드',
    characterId: 'swSenior',
    dialogueBefore:
      '신입사원님, 오늘 퇴근 전 보안팀으로부터 충격적인 침투 테스트(Pen-test) 결과가 접수되었습니다. OBD-II 단자나 무선 인포테인먼트 취약점을 통해 차체 CAN 버스에 악의적인 위조 제동 명령(CAN Injection)을 찔러 넣을 수 있는 보안 구멍이 발견되었습니다!',
    situation:
      '해커가 무선 통신 모뎀을 탈취한 뒤 내부 CAN 네트워크로 진입해 임의의 가짜 제동/가속 신호를 위조 주입할 수 있는 치명적 보안 결함입니다. 유럽 UNECE CSMS(사이버보안관리체계) 규정을 만족하지 못하면 해외 수출 자체가 전면 금지됩니다.',
    options: [
      {
        id: '12-a',
        label: 'A. 하드웨어 보안 모듈(HSM) 기반 메시지 인증 코드(SecOC) 전수 적용',
        actionText:
          '차량 내 모든 CAN 메시지 끝단에 하드웨어 암호화 칩(HSM)이 생성한 암호화 서명(CMAC 토큰)을 붙여, 인가되지 않은 위조 패킷을 즉시 버리는 SecOC(Secure Onboard Communication)를 적용한다.',
        scoreDeltas: { vehicleSw: 3 },
        pros: '외부 해커가 위조 패킷을 주입해도 암호화 키 서명이 없으면 ECU가 100% 무시하므로 CAN 인젝션 공격을 완벽히 차단합니다.',
        cons: '암호화 토큰 4~8바이트가 CAN 페이로드에 추가되어 버스 대역폭을 소모하고, 저성능 구형 마이컴의 암호 연산 부하가 커집니다.',
        feedbackReaction: {
          characterId: 'swSenior',
          praise: 'AUTOSAR 표준 보안 기술인 SecOC와 HSM을 적용해 커넥티드 차량의 사이버 방패를 완벽히 구축했습니다.',
          concern: 'SecOC 서명 패킷 추가로 CAN 버스 부하가 12% 증가하여 페이로드 압축이 요구됩니다.',
          comment:
            'UNECE 사이버보안 규제를 완벽히 충족하는 정통 보안 아키텍처입니다! 해커의 패킷 위조를 완전히 원천 봉쇄했습니다. 단, 암호화 토큰으로 늘어난 버스 트래픽은 CAN-FD 마이그레이션으로 해소해야 합니다.',
          tone: 'enthusiastic',
        },
        highlightKeywords: ['SecOC', 'HSM 하드웨어 보안 모듈', 'CAN 인젝션 방어'],
      },
      {
        id: '12-b',
        label: 'B. 중앙 보안 게이트웨이(Security Gateway)의 방화벽(Firewall) 패킷 격리',
        actionText:
          '외부 무선망과 연결된 인포테인먼트(IVI) 도메인과 주행 안전과 직결된 파워트레인/샤시 제어 도메인 사이를 물리적/논리적으로 완벽 분리하는 심층 패킷 필터링 방화벽을 구성한다.',
        scoreDeltas: { qualitySafety: 3 },
        pros: '개별 센서 부품의 코드를 바꾸지 않고도 중앙 게이트웨이 단 한 곳에서 외부 네트워크 침투를 원천 격리 차단합니다.',
        cons: '게이트웨이에서 모든 패킷을 전수 딥패킷인스펙션(DPI)하느라 도메인 간 통신 지연(Routing Latency)이 3~5ms 발생합니다.',
        feedbackReaction: {
          characterId: 'safetyManager',
          praise: '인포테인먼트와 안전 제어기 사이의 경계선을 철벽 방화벽으로 차단한 훌륭한 망 분리 아키텍처입니다.',
          concern: '게이트웨이 방화벽의 심층 패킷 검사로 인해 도메인 간 교차 통신 속도가 4ms 느려졌습니다.',
          comment:
            '자동차 네트워크의 비무장지대(DMZ)를 제대로 설계했습니다! 인포테인먼트가 뚫려도 핸들과 브레이크는 절대 건드리지 못하게 격리했습니다. 게이트웨이 검사 지연 시간을 2ms 안으로 줄이는 튜닝을 이어갑시다.',
          tone: 'approving',
        },
        highlightKeywords: ['보안 게이트웨이', '도메인 망 분리', '차량용 방화벽'],
      },
      {
        id: '12-c',
        label: 'C. 클라우드 차량 관제 센터(VSOC) 실시간 이상 트래픽 AI 탐지 시스템 구축',
        actionText:
          '차량 내부에서 비정상적인 버스 폭주나 ID 조작 징후가 포착되면 즉시 텔레매틱스로 클라우드 차량 보안 관제 센터(VSOC)에 전송해 원격 격리 조치하는 관제 파이프라인을 구축한다.',
        scoreDeltas: { serviceData: 3 },
        pros: '알려지지 않은 신종 제로데이(Zero-day) 사이버 공격 패턴까지 클라우드 AI로 실시간 탐지하고 전 차종에 원격 룰을 배포합니다.',
        cons: '지하주차장이나 터널 등 LTE/5G 통신 음영 지역에 차량이 갇혀 있을 때는 원격 보안 관제가 불가능합니다.',
        feedbackReaction: {
          characterId: 'serviceLead',
          praise: '차량 한 대의 보안을 넘어 수십만 대 플릿 전체를 실시간 방어하는 VSOC 클라우드 보안망을 세웠습니다.',
          concern: '통신이 끊긴 음영 지역에서는 실시간 탐지가 동작하지 않는 통신 의존 한계가 있습니다.',
          comment:
            'SDV 시대에 걸맞은 차세대 VSOC(차량보안관제) 플랫폼입니다! 신종 위협을 실시간으로 추적할 수 있겠네요. 다만 통신 음영 지역에서도 자체적으로 이상 패킷을 차단할 수 있는 온보드 IDS를 반드시 함께 갖춰야 합니다.',
          tone: 'thoughtful',
        },
        highlightKeywords: ['VSOC 차량보안관제', '이상 트래픽 AI 탐지', '제로데이 공격 대응'],
      },
    ],
    industryTip: {
      title: '차량 사이버보안 (ISO/SAE 21434 & UNECE R155)',
      subtitle: '달리는 스마트폰을 해킹으로부터 보호하는 자동차 보안 규제',
      summary:
        'SDV(소프트웨어 중심 자동차)가 되면서 차량의 통신 접점(OTA, 블루투스, 5G, V2X)이 폭발적으로 늘어났습니다. 2024년부터 유럽 및 주요국에서는 사이버보안관리체계(CSMS) 인증을 받지 못한 자동차는 판매가 법적으로 금지됩니다. SecOC, 보안 게이트웨이, 하드웨어 보안 모듈(HSM)이 필수 기본 소양입니다.',
      keyPoints: [
        'UNECE WP.29 UN R155 (사이버보안) & R156 (소프트웨어 업데이트) 국제 규제',
        'SecOC (Secure Onboard Communication): CAN 메시지 암호 서명 검증',
        'HSM (Hardware Security Module): 칩셋 내부에 격리된 암호화 키 금고',
      ],
      fieldRelevance: '현대오토에버 사이버보안팀, 아우토크립트, 페스카로, 보쉬 ESCRYPT',
    },
  },

  // ==========================================
  // DAY 5 (오전 / 오후 / 퇴근 전) - 3 Events
  // ==========================================
  {
    id: 13,
    day: 5,
    orderInDay: 1,
    totalInDay: 3,
    timeString: 'Day 5 / 09:30 AM (신규 사업 & 전장 상품 기획실)',
    title: '구독형 기능(FoD): 후륜 조향 각도 확장 서비스 출시',
    badge: '신규 비즈니스 모델 · 서비스 기획 & SW',
    characterId: 'serviceLead',
    dialogueBefore:
      '신입사원님, 우리 회사의 첫 구독형 소프트웨어 상품으로 "후륜 조향(RWS) 각도 10도 확장 서비스"를 론칭하려 합니다. 평소엔 3도만 꺾이지만 구독 시 10도까지 꺾여 좁은 골목길도 유턴이 가능해집니다. 어떤 기획이 가장 매력적일까요?',
    situation:
      'SDV 시대의 새로운 캐시카우로 떠오른 FoD(Feature on Demand) 상품 출시를 준비 중입니다. 사용자 결제 전환율, 차량 내 보안 활성화, 기계적 내구성, 그리고 고속 주행 시 안전 검증까지 모든 측면을 고려해야 합니다.',
    options: [
      {
        id: '13-a',
        label: 'A. 좁은 도심 주차장 진입 시 팝업을 띄우는 맥락 기반(Context-aware) 구독 UX 기획',
        actionText:
          '1개월 무료 체험을 기본 제공하고, 차량 내비게이션이 좁은 골목이나 복합 쇼핑몰 지하주차장에 진입할 때 유턴 편의성을 체감시키는 상황 맥락 기반 인앱 결제 UX를 설계한다.',
        scoreDeltas: { serviceData: 3 },
        pros: '고객이 가장 간절히 필요한 순간에 가치를 경험하게 만들어 유료 구독 전환율을 기존 대비 3.2배 폭증시킵니다.',
        cons: '주행 중 잦은 구독 유도 팝업이 운전자에게 피로감과 주의 분산(Distraction)을 유발할 수 있습니다.',
        feedbackReaction: {
          characterId: 'serviceLead',
          praise: '고객이 가장 절실한 주차 순간에 가치를 체감시킨 기가 막힌 상황 맥락 인앱 마케팅 UX입니다.',
          concern: '주행 중 디스플레이 팝업이 운전 집중을 방해하지 않도록 정차 중에만 노출하는 안전 룰이 필수입니다.',
          comment:
            '수익성을 극대화한 최고의 BM 기획입니다! 결제 전환율이 엄청나겠네요. 다만 주행 중 팝업은 안전 규제 위반이 될 수 있으므로 기어가 P단에 체결되었을 때만 우아하게 노출하도록 설계해야 합니다.',
          tone: 'enthusiastic',
        },
        highlightKeywords: ['상황 맥락 인앱 UX', '무료 체험 프로모션', '구독 전환 퍼널'],
      },
      {
        id: '13-b',
        label: 'B. 원격 활성화 시 보안 게이트웨이 인증 및 암호화 라이선스 키 무결성 구현',
        actionText:
          '해킹이나 임의 펌웨어 조작으로 불법 활성화되지 않도록 클라우드 인증 서버와 차량 보안 게이트웨이(Security Gateway) 간 비대칭 암호화 라이선스 토큰 검증 시스템을 구축한다.',
        scoreDeltas: { vehicleSw: 3 },
        pros: '불법 탈옥(Jailbreak)이나 불법 개조(튜닝)를 통한 무료 탈취를 원천 차단하여 회사의 소프트웨어 지적재산권을 보호합니다.',
        cons: '암호화 라이선스 인증 서버가 다운되거나 오프라인 통신 음영 지역일 때 결제 고객의 기능 활성화가 지연될 수 있습니다.',
        feedbackReaction: {
          characterId: 'swSenior',
          praise: '차량 탈옥과 불법 개조를 막는 비대칭 암호화 기반의 안전한 소프트웨어 라이선스 생태계를 구축했습니다.',
          concern: '인증 서버가 통신 장애를 겪을 때 정상 구매 고객이 기능을 못 쓰는 오프라인 예외 처리(Grace Period)가 필요합니다.',
          comment:
            '소프트웨어 수익 모델의 핵심인 라이선스 무결성을 단단히 지켜냈습니다! 불법 복제를 완벽히 막았네요. 오프라인 음영 지역에서도 7일간은 인증을 유지해주는 유예 기간(Grace Period)을 두면 완벽하겠습니다.',
          tone: 'impressed',
        },
        highlightKeywords: ['보안 게이트웨이', '암호화 라이선스 키', '차량 사이버보안'],
      },
      {
        id: '13-c',
        label: 'C. 후륜 조향 액추에이터 모터의 장기 내구 한계 및 다이나모미터 가혹 테스트',
        actionText:
          '조향 각도를 10도로 늘릴 경우 발생하는 타이로드 피로 누적, 서스펜션 기구적 간섭, 구동 모터 발열 한계를 리그(Rig) 시험기에서 30만 km 가혹 주행 시뮬레이션으로 검증한다.',
        scoreDeltas: { electrificationHw: 3 },
        pros: '소프트웨어로 기능을 열어주었을 때 하드웨어 부품이 조기 파손되거나 모터가 타버리는 보증 수리 대참사를 막습니다.',
        cons: '30만 km 리그 내구 테스트에 3주가 더 소요되어 마케팅팀의 당초 상품 출시 일정이 한 달 연기됩니다.',
        feedbackReaction: {
          characterId: 'hwLead',
          praise: '기구적 내구성 한계를 철저히 검증하여 모터 코일 과열로 인한 리콜 위험을 선제적으로 예방했습니다.',
          concern: '가혹 내구 검증 일정으로 인해 사업부의 분기 FoD 출시 목표 시점이 1개월 지연되었습니다.',
          comment:
            '아무리 멋진 소프트웨어라도 하드웨어 내구성이 받쳐주지 못하면 리콜 폭탄이 됩니다. 액추에이터 과열 한계를 확인하고 모터 냉각 핀을 보강한 훌륭한 하드웨어 조치입니다!',
          tone: 'approving',
        },
        highlightKeywords: ['후륜 조향 액추에이터', '가혹 내구 시험', '기구적 피로 누적 검증'],
      },
    ],
    industryTip: {
      title: 'FoD (Feature on Demand)와 커넥티드카 비즈니스 모델',
      subtitle: '차량을 구매한 뒤에도 원하는 기능을 소프트웨어로 구매하는 시대',
      summary:
        '테슬라의 FSD(Full Self-Driving), 메르세데스 벤츠의 후륜 조향 각도 확장(Rear Axle Steering), 현대차의 라이팅 패턴 및 스트리밍 서비스처럼, 차량 하드웨어는 출고 시 미리 탑재해 두고 고객이 원할 때 무선으로 기능을 활성화하는 비즈니스 모델입니다. 하드웨어 표준화를 통한 제조 원가 절감과 영구적인 소프트웨어 구독 매출을 동시에 창출합니다.',
      keyPoints: [
        'OTA 기반 기능 활성화 및 라이선스 매니지먼트(License Management)',
        '차량 사이버보안 (ISO/SAE 21434) 및 UNECE CSMS(사이버보안관리체계) 필수',
        '고객 수용성을 높이기 위한 마이크로 결제 및 번들링 상품 기획',
      ],
      fieldRelevance: '현대차그룹 TaaS 본부, 테슬라, 카카오모빌리티, 완성차 상품기획팀',
    },
  },

  {
    id: 14,
    day: 5,
    orderInDay: 2,
    totalInDay: 3,
    timeString: 'Day 5 / 13:30 PM (로보택시 통합 관제 센터)',
    title: '도심 로보택시 원격 관제(Teleoperation) 통신 지연 긴급 대응',
    badge: '무인 모빌리티 관제 · 자율주행 & 통신',
    characterId: 'aiLead',
    dialogueBefore:
      '신입사원님, 강남 일대에서 시범 운행 중인 레벨 4 로보택시 중 한 대가 공사 현장 수신호 앞에서 멈춰 섰습니다! 관제사가 원격 화면을 보며 수동 조종으로 우회시키려는데, 5G 패킷 지연이 순간 400ms로 치솟아 원격 핸들이 덜컥거리고 있습니다. 승객이 안에 타고 있습니다!',
    situation:
      '무인 자율주행 차량이 스스로 해결하지 못하는 엣지 케이스를 만났을 때, 원격 관제 센터의 인간 오퍼레이터가 원격 조종(Teleoperation)으로 탈출시켜야 합니다. 통신 지연이 100ms를 초과하면 원격 직접 조향(Direct Driving)은 조종 불능으로 사고 위험이 급증합니다.',
    options: [
      {
        id: '14-a',
        label: 'A. 원격 직접 조향 대신 경유점(Waypoint) 지정 경로 생성 원격 승인 전환',
        actionText:
          '통신 지연 위험이 큰 직접 핸들 조향을 즉시 차단하고, 관제사가 화면에 안전한 우회 궤적 핀(Waypoint) 3개를 찍어주면 차량 온보드 컴퓨터가 스스로 궤적을 추종하게 한다.',
        scoreDeltas: { autonomousAi: 3 },
        pros: '통신 지연이 1초가 넘어도 차량 내부 안전 제어기가 자체 센서로 주변 장애물을 회피하며 달리기 때문에 원격 조종 사고 위험이 0에 수렴합니다.',
        cons: '공사 인부의 미세한 손짓이나 특수한 수신호 환경에서 차량이 궤적 생성을 거부해 탈출이 몇 분 지체될 수 있습니다.',
        feedbackReaction: {
          characterId: 'aiLead',
          praise: '직접 핸들 조종의 위험성을 꿰뚫고 안전한 경유점 가이드 방식(Path Guidance)으로 전환한 교과서적 위기 대응입니다.',
          concern: '차량이 여전히 너무 복잡한 공사 구간에서는 웨이포인트 궤적 생성을 거부하는 상황을 대비해야 합니다.',
          comment:
            '글로벌 로보택시(웨이모, 크루즈)의 업계 표준 안전 프로토콜을 그대로 실천했습니다! 지연 시간이 튀어도 차량 스스로 장애물을 피하게 유도했네요. 완벽한 안전 판단입니다.',
          tone: 'enthusiastic',
        },
        highlightKeywords: ['웨이포인트(Waypoint) 지정', '경로 가이드 승인', '자체 장애물 회피'],
      },
      {
        id: '14-b',
        label: 'B. 5G 통신망 긴급 네트워크 슬라이싱(Network Slicing) QoS 최우선 대역폭 전환',
        actionText:
          '통신사 제휴망과 연동하여 로보택시 비상 관제 패킷에 최상위 품질 등급(QoS Class Identifier)과 전용 네트워크 슬라이스를 즉각 할당하여 핑(Ping)을 15ms로 강제 압축한다.',
        scoreDeltas: { serviceData: 3 },
        pros: '통신망 혼잡과 상관없이 전용 주파수 고속도로를 뚫어 HD 카메라 4채널 영상을 실시간 15ms 초저지연으로 원격 관제 화면에 복원합니다.',
        cons: '통신사 전용 네트워크 슬라이싱 종량제 비용이 매우 비싸서 장기 플릿 운영 비용(OPEX)이 치솟습니다.',
        feedbackReaction: {
          characterId: 'serviceLead',
          praise: '5G 특화망 네트워크 슬라이싱을 즉각 발동해 통신 지연을 15ms로 찍어 누른 스마트한 인프라 협력입니다.',
          concern: 'VIP 전용 통신망 사용료가 비싸서 모든 플릿 차량에 상시 적용하기에는 비용 부담이 큽니다.',
          comment:
            '통신사 인프라를 백분 활용해 고화질 영상을 실시간으로 복구했습니다! 덕분에 관제사가 선명하게 시야를 확보했네요. 다만 비상 상황에서만 슬라이싱을 켜는 동적 비용 제어 로직을 걸어두어야겠습니다.',
          tone: 'impressed',
        },
        highlightKeywords: ['5G 네트워크 슬라이싱', 'QoS 우선순위', '15ms 초저지연 복구'],
      },
      {
        id: '14-c',
        label: 'C. 통신 두절 대비 차량 비상등 점멸 및 정밀 갓길 비상 정차(Safe Stop) 강제',
        actionText:
          '통신 지연이 300ms 이상 지속될 경우 원격 조종을 즉시 포기하고, 차량의 사각지대 라이다 센서로 주변 안전을 확인한 뒤 보도블록 30cm 옆으로 즉각 안전 정차(Safe Stop)시킨다.',
        scoreDeltas: { qualitySafety: 3 },
        pros: '불확실한 원격 통신에 매달리다 발생할 수 있는 보행자 충돌 사고를 100% 원천 차단하는 가장 보수적이고 안전한 결단입니다.',
        cons: '공사 구간 바로 앞에서 차가 멈춰 서면서 뒤따라오던 시내버스와 차량들이 20분간 극심한 정체를 겪게 됩니다.',
        feedbackReaction: {
          characterId: 'safetyManager',
          praise: '통신이 불안정할 때 승객과 보행자의 안전을 위해 차를 안전하게 세운 용기 있는 안전 원칙 고수입니다.',
          concern: '편도 1차로 공사 구간에서 정차하면서 뒤따르던 시내버스가 갇혀 도로 정체 민원이 발생했습니다.',
          comment:
            '인명 사고 위험 앞에서는 도로 정체 민원도 부차적인 문제입니다. 통신 불안 시 즉각 갓길에 안전 정차(Safe Stop)한 원칙에 지지를 보냅니다. 이제 안전 정차 후 현장 안전요원 출동 체계를 보완합시다.',
          tone: 'approving',
        },
        highlightKeywords: ['Safe Stop 안전 정차', '비상등 점멸', '통신 두절 안전 프로토콜'],
      },
    ],
    industryTip: {
      title: '로보택시 원격 관제 (Teleoperation) 기술',
      subtitle: '무인 자율주행의 마지막 안전 안전판(Safety Net)',
      summary:
        '운전자가 없는 레벨 4 로보택시라도 공사 현장의 비정형 수신호나 도로 침수 같은 불가항력적 상황에 부딪히면 멈출 수밖에 없습니다. 이때 원격 관제사가 원격에서 차량 카메라 영상을 보며 안전한 경로를 찍어주거나 직접 조작해 위기를 탈출시키는 관제 시스템(Teleoperation)은 무인 모빌리티 상용화의 핵심 필수 인프라입니다.',
      keyPoints: [
        'Direct Driving (원격 직접 조종) vs Path Guidance (경유점 지정 안전 자율 주행)',
        '5G 네트워크 슬라이싱 및 초저지연 비디오 코덱(WebRTC / H.265 HW 인코딩)',
        '통신 두절 시 자동 발동하는 최소위험기동(MRM) 안전 정차 프로세스',
      ],
      fieldRelevance: '오토노머스에이투지, 모셔널, 카카오모빌리티 로보택시, 현대차 AVP 본부',
    },
  },

  {
    id: 15,
    day: 5,
    orderInDay: 3,
    totalInDay: 3,
    timeString: 'Day 5 / 16:30 PM (최종 임원 회의실)',
    title: '플래그십 SDV "NX-1" 최종 글로벌 양산 승인(Sign-off) 회의',
    badge: '마지막 결전 · 5대 본부 합동 승인',
    characterId: 'leader',
    dialogueBefore:
      '신입사원님, 5일간 정말 훌륭하게 달려왔습니다! 오늘은 우리 회사의 미래를 책임질 플래그십 차량 NX-1의 글로벌 양산 최종 승인 회의입니다. 회사의 미래 경쟁력을 위해 신입사원인 당신이 던질 마지막 핵심 메시지는 무엇입니까?',
    situation:
      '수조 원의 개발비가 투입된 차세대 모빌리티가 세상에 첫발을 내딛는 순간입니다. 5개 개발 본부의 치열한 의견이 교차하는 가운데, 신입사원인 당신의 한마디가 회사의 미래 방향성을 가르는 열쇠가 됩니다!',
    options: [
      {
        id: '15-a',
        label: 'A. "OTA로 영원히 늙지 않는 무중단 소프트웨어 아키텍처 생태계 완성!"',
        actionText:
          '"차량은 출고되는 순간부터 시작입니다! 전 도메인 무선 업데이트와 개방형 개발 플랫폼으로 스마트폰처럼 매달 새로워지는 소프트웨어 완성도로 승부해야 합니다."',
        scoreDeltas: { vehicleSw: 3 },
        pros: '차량의 감가상각을 늦추고 지속적인 유료 소프트웨어 기능 업데이트로 고객 평생 가치(LTV)를 극대화합니다.',
        cons: '출고 후에도 수백 명의 소프트웨어 개발 인력이 지속적인 유지보수와 보안 패치에 투입되어 고정비가 증가합니다.',
        feedbackReaction: {
          characterId: 'swSenior',
          praise: '우리가 지난 5일간 밤새워 코딩한 진짜 이유를 대변해 주었습니다. 넥스트모빌리티는 테슬라를 넘는 SDV 리더가 될 것입니다.',
          concern: '지속적인 OTA 배포를 뒷받침할 글로벌 클라우드 서버 인프라 유지비용이 만만치 않습니다.',
          comment:
            '가슴이 뜁니다! 바로 그 비전이 현대 모빌리티의 미래입니다. 차가 출고된 후에도 지속해서 진화하는 무중단 소프트웨어 생태계를 반드시 완성합시다!',
          tone: 'enthusiastic',
        },
        highlightKeywords: ['무중단 OTA', 'SDV 소프트웨어 생태계', '소프트웨어 중심 가치'],
      },
      {
        id: '15-b',
        label: 'B. "도심 완전 자율주행과 스스로 학습하는 파운데이션 AI 인지 지능!"',
        actionText:
          '"복잡한 도심에서도 사람보다 안전하고 매끄럽게 달리는 엔드투엔드(E2E) 자율주행 AI 지능이야말로 글로벌 경쟁사들을 압도할 핵심 차별점입니다!"',
        scoreDeltas: { autonomousAi: 3 },
        pros: '운전으로부터의 완전한 해방을 제공하여 탑승자가 차 안에서 일하고 휴식하는 모빌리티 공간 혁명을 선점합니다.',
        cons: '수많은 엣지 케이스와 법적 규제 책임 공방으로 인해 완전 자율주행 상용화까지 지속적인 R&D 투자가 필요합니다.',
        feedbackReaction: {
          characterId: 'aiLead',
          praise: '인공지능 엔드투엔드(E2E) 모델이 운전의 패러다임을 바꿀 것이라는 확신에 찬 위대한 선언입니다.',
          concern: '각국 정부의 규제 승인과 사고 발생 시의 법적 책임 소재 정립이라는 큰 숙제가 남아있습니다.',
          comment:
            '전율이 돋네요! 도로 위의 모든 변수를 스스로 학습하는 모빌리티의 두뇌를 향해 우리는 한 걸음 더 나아갈 것입니다. 미래 자율주행 시대를 함께 열어갑시다.',
          tone: 'enthusiastic',
        },
        highlightKeywords: ['E2E 자율주행 AI', '파운데이션 인지 지능', '완전한 이동의 자유'],
      },
      {
        id: '15-c',
        label: 'C. "800V 초고전압과 극한 환경에서도 흔들림 없는 전동화 파워트레인 기본기!"',
        actionText:
          '"화려한 기능도 강력하고 안전한 모터와 배터리가 없으면 껍데기에 불과합니다. 18분 만에 80%를 충전하고 1회 충전 600km를 달리는 극한의 하드웨어 기술력이 핵심입니다!"',
        scoreDeltas: { electrificationHw: 3 },
        pros: '전기차 본연의 주행 성능과 충전 편의성에서 경쟁사를 압도하여 대중 소비자의 신뢰와 구매를 강력히 견인합니다.',
        cons: '고전압 배터리와 고효율 SiC 인버터 기술 경쟁이 치열해지며 소재 원가 상승 압박이 지속됩니다.',
        feedbackReaction: {
          characterId: 'hwLead',
          praise: '모빌리티의 본질인 달리고, 돌고, 서는 뼈대의 압도적 신뢰성을 정확하게 짚어낸 하드웨어 엔지니어의 뚝심입니다.',
          concern: '원자재 가격 변동에 따른 배터리 팩 원가 방어 전략이 경영진의 과제로 남게 됩니다.',
          comment:
            '심장을 울리는 통찰입니다! 화려한 디스플레이도 탄탄한 800V 파워트레인이 없으면 무용지물입니다. 세계 최고 수준의 전동화 기본기로 글로벌 시장을 석권하겠습니다!',
          tone: 'enthusiastic',
        },
        highlightKeywords: ['800V 초고속 충전', '전동화 파워트레인', '하드웨어 엔지니어링'],
      },
      {
        id: '15-d',
        label: 'D. "단 0.0001%의 타협도 없는 ISO 26262 무결점 품질과 인간 존중의 안전!"',
        actionText:
          '"어떤 첨단 기술도 승객의 안전보다 앞설 수는 없습니다. 국제 기능안전 표준과 사이버보안을 완벽히 지켜낸 무결점 품질이야말로 고객이 우리를 믿고 타는 이유입니다!"',
        scoreDeltas: { qualitySafety: 3 },
        pros: '글로벌 최고 수준의 안전 브랜드 명성을 획득하여 리콜 손실을 없애고 장기적인 기업 신뢰도를 보장합니다.',
        cons: '품질 검증 관문이 엄격해져 신기술이나 신기능 도입 속도가 경쟁사 대비 다소 신중해질 수 있습니다.',
        feedbackReaction: {
          characterId: 'safetyManager',
          praise: '기술의 화려함에 현혹되지 않고 인간 존중과 생명의 안전을 맨 앞자리에 둔 숭고한 엔지니어링 철학입니다.',
          concern: '철저한 다중 검증으로 인해 차세대 기능 업데이트 릴리즈 주기가 다소 길어질 수 있습니다.',
          comment:
            '기립박수를 보냅니다. 안전에 대한 당신의 진정성이 넥스트모빌리티를 세계에서 가장 신뢰받는 안전의 상징으로 만들 것입니다. 품질과 안전은 영원한 우리의 약속입니다!',
          tone: 'enthusiastic',
        },
        highlightKeywords: ['ISO 26262 무결점 품질', '인간 존중 안전', '글로벌 신뢰'],
      },
    ],
    industryTip: {
      title: '모빌리티 대융합 (Mobility Convergence)',
      subtitle: '소프트웨어, AI, 배터리, 품질, 서비스가 하나로 융합되는 미래',
      summary:
        '현대의 자동차는 단순한 이동 수단이 아니라 ‘바퀴 달린 고성능 데이터 센터’이자 ‘스마트 충전 에너지 저장소(ESS)’입니다. 소프트웨어, 인공지능, 전동화 하드웨어, 기능안전, 모빌리티 서비스가 오케스트라처럼 조화를 이룰 때 비로소 인류의 이동을 혁신하는 위대한 모빌리티가 완성됩니다.',
      keyPoints: [
        '기계공학 + 컴퓨터공학 + 전자공학 + 산업공학의 초융합 생태계',
        '차량을 넘어 로보틱스, UAM(AAM), 스마트 시티로 확장되는 모빌리티 도메인',
        '직무 간 긴밀한 크로스-펑셔널(Cross-functional) 협업의 필수성',
      ],
      fieldRelevance: '모빌리티 산업 진출을 꿈꾸는 모든 취업 준비생을 위한 최종 나침반',
    },
  },
];
