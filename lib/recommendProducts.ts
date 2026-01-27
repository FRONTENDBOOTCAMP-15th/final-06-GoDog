// 설문 타입
export interface SurveyFormData {
  size: string; // "소형견 (~7kg)" | "중형견 (7~25kg)" | "대형견 (25kg~)"
  age: string; // "puppy" | "adult" | "senior"
  bodyType: string; // "thin" | "ideal" | "overweight" | "obese"
  allergies: string[]; // ["없음"] | ["닭고기", "곡물", ...]
  healthConcerns: string[]; // ["없음"] | ["피부 / 모질", ...]
  protein: string; // "상관없음" | "닭고기" | "오리" | "양고기" | "연어"
  grainPreference: string; // "상관없음" | "그레인프리 선호"
}

// 확장된 설문 타입 (기존 SurveyFormData + 추가된 항목)
export interface ExtendedSurveyFormData {
  size: string; // "소형견 (~7kg)" | "중형견 (7~25kg)" | "대형견 (25kg~)"
  age: string; // "puppy" | "adult" | "senior"
  neutered: string; // "예" | "아니요"
  activityLevel: string; // "적음" | "보통" | "많음"
  bodyType: string; // "thin" | "ideal" | "overweight" | "obese"
  currentFeedIssues: string[]; // ["기호성이 낮아요", ...] (데이터 수집용, 로직 미반영)
  allergies: string[]; // ["없음"] | ["닭고기", "곡물", ...]
  healthConcerns: string[]; // ["없음"] | ["피부 / 모질", ...]
  diagnosedDiseases: string[]; // ["없음"] | ["신장 질환", ...] (필터링 추가)
  protein: string; // "상관없음" | "닭고기" | ...
  grainPreference: string; // "상관없음" | "그레인프리 선호"
  foodType: string; // "건식 사료" | "습식 사료" | ... (필터링 추가)
}

// 상품 데이터 타입
export interface ProductData {
  price: number;
  quantity: number;
  name: string;
  content: string;
  shippingFees?: number;
  mainImages?: { path: string; name: string }[];
  show?: boolean;
  extra: {
    code: string;
    weight: number;
    size: string[];
    lifeStage: string[];
    bodyType: string[];
    activityLevel: string[];
    neutered: "both" | "yes" | "no";
    mainProtein: string[];
    grainFree: boolean;
    foodType: "건식" | "습식";
    healthBenefits: string[];
    kcalPer100g: number;
    ingredients: {
      contains: string[];
      avoid: string[];
    };
    avoidIf: {
      allergies: string[];
      diseases: string[];
    };
    specialFeatures: string[];
    nutrition: {
      protein: number;
      fat: number;
      moisture: number;
    };
    detailImages?: { path: string; name: string }[];
  };
}

// 상품 데이터
const dogFoodData: ProductData[] = [
  {
    price: 45000,
    quantity: 127,
    name: "스몰퍼피 치킨앤라이스",
    content:
      "DHA와 EPA가 풍부하게 함유되어 성장기 강아지의 두뇌 발달과 시력 형성을 촉진하며, 학습 능력 향상에도 도움을 줍니다. 칼슘과 인이 1.2:1의 최적 비율로 설계되어 소형견 특유의 빠른 골격 성장을 안정적으로 지원합니다.",
    mainImages: [{ path: "/images/products", name: "small_puppy_chicken_rice.jpg" }],
    extra: {
      code: "PUP-S-01",
      weight: 600,
      size: ["소형견"],
      lifeStage: ["퍼피"],
      bodyType: ["마름", "적정"],
      activityLevel: ["보통", "많음"],
      neutered: "both",
      mainProtein: ["닭고기"],
      grainFree: false,
      foodType: "건식",
      healthBenefits: [],
      kcalPer100g: 400,
      ingredients: {
        contains: ["닭고기", "쌀"],
        avoid: [],
      },
      avoidIf: {
        allergies: ["닭고기", "밀/곡물"],
        diseases: [],
      },
      specialFeatures: ["퍼피 전용", "소형견 키블", "DHA 함유"],
      nutrition: { protein: 32, fat: 18, moisture: 10 },
    },
  },
  {
    price: 47000,
    quantity: 89,
    name: "미디엄퍼피 치킨앤오트밀",
    content:
      "중형견의 성장 속도에 맞춰 칼슘과 인의 균형을 최적화하여 뼈와 관절이 건강하게 발달하도록 설계되었습니다. 오트밀은 소화가 부드럽고 식이섬유가 풍부하여 성장기 강아지의 민감한 장 건강을 보호합니다.",
    mainImages: [{ path: "/images/products", name: "medium_puppy_chicken_oatmeal.jpg" }],
    extra: {
      code: "PUP-M-01",
      weight: 1000,
      size: ["중형견"],
      lifeStage: ["퍼피"],
      bodyType: ["마름", "적정"],
      activityLevel: ["보통", "많음"],
      neutered: "both",
      mainProtein: ["닭고기"],
      grainFree: false,
      foodType: "건식",
      healthBenefits: ["소화/장 건강"],
      kcalPer100g: 390,
      ingredients: {
        contains: ["닭고기", "귀리"],
        avoid: [],
      },
      avoidIf: {
        allergies: ["닭고기", "밀/곡물"],
        diseases: [],
      },
      specialFeatures: ["퍼피 전용"],
      nutrition: { protein: 30, fat: 17, moisture: 10 },
    },
  },
  {
    price: 52000,
    quantity: 43,
    name: "라지퍼피 치킨앤브라운라이스",
    content:
      "글루코사민과 콘드로이틴이 함유되어 대형견 특유의 빠른 체중 증가로 인한 관절 부담을 줄이고, 어린 시절부터 튼튼한 관절 기반을 형성합니다. 대형견 퍼피에게 적합한 380kcal의 적정 칼로리 설계로 급격한 성장을 방지합니다.",
    mainImages: [{ path: "/images/products", name: "large_puppy_chicken_brownrice.jpg" }],
    extra: {
      code: "PUP-L-01",
      weight: 1500,
      size: ["대형견"],
      lifeStage: ["퍼피"],
      bodyType: ["마름", "적정"],
      activityLevel: ["보통", "많음"],
      neutered: "both",
      mainProtein: ["닭고기"],
      grainFree: false,
      foodType: "건식",
      healthBenefits: ["관절/뼈 건강"],
      kcalPer100g: 380,
      ingredients: {
        contains: ["닭고기", "현미"],
        avoid: [],
      },
      avoidIf: {
        allergies: ["닭고기", "밀/곡물"],
        diseases: [],
      },
      specialFeatures: ["퍼피 전용", "관절 영양 강화"],
      nutrition: { protein: 28, fat: 14, moisture: 10 },
    },
  },
  {
    price: 55000,
    quantity: 62,
    name: "퍼피 연어앤고구마 그레인프리",
    content:
      "오메가-3 지방산이 풍부한 연어를 주원료로 사용하여 성장기 강아지의 피부 장벽을 강화하고 윤기 있는 모질 발달을 촉진합니다. 곡물을 완전히 배제한 그레인프리 설계로 곡물에 민감한 어린 강아지의 소화기를 보호합니다.",
    mainImages: [{ path: "/images/products", name: "puppy_gf_salmon_sweetpotato.jpg" }],
    extra: {
      code: "PUP-GF-01",
      weight: 1000,
      size: ["소형견", "중형견", "대형견"],
      lifeStage: ["퍼피"],
      bodyType: ["마름", "적정"],
      activityLevel: ["보통", "많음"],
      neutered: "both",
      mainProtein: ["연어"],
      grainFree: true,
      foodType: "건식",
      healthBenefits: ["피부/모질"],
      kcalPer100g: 395,
      ingredients: {
        contains: ["연어", "고구마", "연어오일"],
        avoid: ["밀", "옥수수", "쌀", "곡물 전체"],
      },
      avoidIf: {
        allergies: ["생선"],
        diseases: [],
      },
      specialFeatures: ["퍼피 전용", "그레인프리", "오메가3 풍부", "저자극성"],
      nutrition: { protein: 30, fat: 16, moisture: 10 },
    },
  },
  {
    price: 43000,
    quantity: 156,
    name: "스몰어덜트 치킨앤라이스",
    content:
      "소형견의 작은 입에 맞춘 미니 사이즈 알갱이로 설계되어 씹기 편하고, 한 번에 적정량을 섭취할 수 있어 과식을 방지합니다. 소형견은 체중 대비 높은 대사율을 가지고 있어 고단백·고칼로리 설계로 에너지 요구량을 충족시킵니다.",
    mainImages: [{ path: "/images/products", name: "small_adult_chicken_rice.jpg" }],
    extra: {
      code: "ADT-S-01",
      weight: 600,
      size: ["소형견"],
      lifeStage: ["성견"],
      bodyType: ["적정"],
      activityLevel: ["보통", "많음"],
      neutered: "both",
      mainProtein: ["닭고기"],
      grainFree: false,
      foodType: "건식",
      healthBenefits: [],
      kcalPer100g: 370,
      ingredients: {
        contains: ["닭고기", "쌀"],
        avoid: [],
      },
      avoidIf: {
        allergies: ["닭고기", "밀/곡물"],
        diseases: [],
      },
      specialFeatures: ["소형견 키블"],
      nutrition: { protein: 28, fat: 16, moisture: 10 },
    },
  },
  {
    price: 44000,
    quantity: 97,
    name: "스몰어덜트 오리앤귀리",
    content:
      "오리고기는 닭고기와 다른 단백질 구조를 가지고 있어 닭고기 알러지가 있는 소형견에게 훌륭한 대체 단백질원이 됩니다. 귀리는 수용성 식이섬유인 베타글루칸이 풍부하여 장 건강을 개선하고 혈당을 안정적으로 유지합니다.",
    mainImages: [{ path: "/images/products", name: "small_adult_duck_oat.jpg" }],
    extra: {
      code: "ADT-S-02",
      weight: 600,
      size: ["소형견"],
      lifeStage: ["성견"],
      bodyType: ["적정"],
      activityLevel: ["보통"],
      neutered: "both",
      mainProtein: ["오리고기"],
      grainFree: false,
      foodType: "건식",
      healthBenefits: ["소화/장 건강"],
      kcalPer100g: 365,
      ingredients: {
        contains: ["오리고기", "귀리"],
        avoid: [],
      },
      avoidIf: {
        allergies: ["밀/곡물"],
        diseases: [],
      },
      specialFeatures: ["소형견 키블", "저자극성"],
      nutrition: { protein: 27, fat: 15, moisture: 10 },
    },
  },
  {
    price: 46000,
    quantity: 78,
    name: "미디엄어덜트 치킨앤보리",
    content:
      "중형견의 체중과 활동량에 최적화된 영양 밸런스로 설계되어 과체중이나 영양 부족 없이 이상적인 체형을 유지할 수 있습니다. 보리는 저혈당 지수 탄수화물로 에너지를 천천히 방출하여 활동적인 중형견이 하루 종일 안정적인 에너지를 유지합니다.",
    mainImages: [{ path: "/images/products", name: "medium_adult_chicken_barley.jpg" }],
    extra: {
      code: "ADT-M-01",
      weight: 1000,
      size: ["중형견"],
      lifeStage: ["성견"],
      bodyType: ["적정"],
      activityLevel: ["보통", "많음"],
      neutered: "both",
      mainProtein: ["닭고기"],
      grainFree: false,
      foodType: "건식",
      healthBenefits: [],
      kcalPer100g: 360,
      ingredients: {
        contains: ["닭고기", "보리"],
        avoid: [],
      },
      avoidIf: {
        allergies: ["닭고기", "밀/곡물"],
        diseases: [],
      },
      specialFeatures: [],
      nutrition: { protein: 26, fat: 14, moisture: 10 },
    },
  },
  {
    price: 47000,
    quantity: 51,
    name: "미디엄어덜트 양고기앤현미",
    content:
      "양고기는 L-카르니틴이 자연적으로 풍부하고 소화가 잘 되는 단백질원으로, 민감한 소화기를 가진 중형견에게 적합합니다. 현미는 도정하지 않아 식이섬유, 비타민B군, 미네랄이 풍부하며 천천히 소화되어 포만감을 오래 유지시킵니다.",
    mainImages: [{ path: "/images/products", name: "medium_adult_lamb_brownrice.jpg" }],
    extra: {
      code: "ADT-M-02",
      weight: 1000,
      size: ["중형견"],
      lifeStage: ["성견"],
      bodyType: ["적정", "과체중"],
      activityLevel: ["보통"],
      neutered: "both",
      mainProtein: ["양고기"],
      grainFree: false,
      foodType: "건식",
      healthBenefits: ["소화/장 건강"],
      kcalPer100g: 355,
      ingredients: {
        contains: ["양고기", "현미"],
        avoid: [],
      },
      avoidIf: {
        allergies: ["양고기", "밀/곡물"],
        diseases: [],
      },
      specialFeatures: ["저자극성"],
      nutrition: { protein: 25, fat: 14, moisture: 10 },
    },
  },
  {
    price: 50000,
    quantity: 36,
    name: "라지어덜트 치킨앤현미",
    content:
      "글루코사민 800mg과 콘드로이틴 400mg이 함유되어 대형견의 무거운 체중을 지탱하는 관절과 연골 건강을 적극적으로 보호합니다. 대형견에게 적합한 350kcal의 적정 칼로리로 설계되어 과체중을 예방하고 관절에 가해지는 부담을 최소화합니다.",
    mainImages: [{ path: "/images/products", name: "large_adult_chicken_brownrice.jpg" }],
    extra: {
      code: "ADT-L-01",
      weight: 1500,
      size: ["대형견"],
      lifeStage: ["성견"],
      bodyType: ["적정", "과체중"],
      activityLevel: ["보통", "많음"],
      neutered: "both",
      mainProtein: ["닭고기"],
      grainFree: false,
      foodType: "건식",
      healthBenefits: ["관절/뼈 건강"],
      kcalPer100g: 350,
      ingredients: {
        contains: ["닭고기", "현미"],
        avoid: [],
      },
      avoidIf: {
        allergies: ["닭고기", "밀/곡물"],
        diseases: [],
      },
      specialFeatures: ["관절 영양 강화"],
      nutrition: { protein: 25, fat: 12, moisture: 10 },
    },
  },
  {
    price: 52000,
    quantity: 29,
    name: "라지어덜트 연어앤감자",
    content:
      "오메가-3와 오메가-6 지방산이 이상적인 비율로 함유되어 대형견의 넓은 피부 면적을 건강하게 유지하고 풍성한 모질을 가꿔줍니다. 연어는 생체이용률이 높은 고품질 단백질원으로, 대형견의 큰 근육량을 유지합니다.",
    mainImages: [{ path: "/images/products", name: "large_adult_salmon_potato.jpg" }],
    extra: {
      code: "ADT-L-02",
      weight: 1500,
      size: ["대형견"],
      lifeStage: ["성견"],
      bodyType: ["적정"],
      activityLevel: ["보통", "많음"],
      neutered: "both",
      mainProtein: ["연어"],
      grainFree: false,
      foodType: "건식",
      healthBenefits: ["피부/모질"],
      kcalPer100g: 345,
      ingredients: {
        contains: ["연어", "감자", "연어오일"],
        avoid: [],
      },
      avoidIf: {
        allergies: ["생선", "밀/곡물"],
        diseases: [],
      },
      specialFeatures: ["오메가3 풍부"],
      nutrition: { protein: 24, fat: 12, moisture: 10 },
    },
  },
  {
    price: 54000,
    quantity: 47,
    name: "스킨케어 연어앤고구마",
    content:
      "오메가-3, 오메가-6, 오메가-9 지방산이 황금 비율로 함유되어 피부 세포막을 강화하고, 건조하거나 민감한 피부의 장벽 기능을 회복시킵니다. 비오틴과 아연이 강화되어 모낭 건강을 개선하고, 푸석하거나 빠지기 쉬운 털을 윤기 있고 탄력 있는 건강한 모질로 가꿔줍니다.",
    mainImages: [{ path: "/images/products", name: "skincare_salmon_sweetpotato.jpg" }],
    extra: {
      code: "FNC-SK-01",
      weight: 1000,
      size: ["소형견", "중형견", "대형견"],
      lifeStage: ["성견"],
      bodyType: ["적정"],
      activityLevel: ["적음", "보통", "많음"],
      neutered: "both",
      mainProtein: ["연어"],
      grainFree: true,
      foodType: "건식",
      healthBenefits: ["피부/모질"],
      kcalPer100g: 360,
      ingredients: {
        contains: ["연어", "고구마", "연어오일", "아마씨"],
        avoid: ["밀", "옥수수", "쌀", "곡물 전체"],
      },
      avoidIf: {
        allergies: ["생선"],
        diseases: [],
      },
      specialFeatures: ["그레인프리", "오메가3 풍부", "저자극성"],
      nutrition: { protein: 26, fat: 15, moisture: 10 },
    },
  },
  {
    price: 53000,
    quantity: 68,
    name: "다이제스티브 오리앤귀리",
    content:
      "특허받은 프로바이오틱스 균주가 장내 유익균 증식을 촉진하여 소화 기능을 개선하고, 무른 변이나 설사 증상을 완화하는 데 도움을 줍니다. 프리바이오틱스인 FOS와 MOS가 장 점막을 보호하고 영양소 흡수율을 높입니다.",
    mainImages: [{ path: "/images/products", name: "digestive_duck_oat.jpg" }],
    extra: {
      code: "FNC-DG-01",
      weight: 1000,
      size: ["소형견", "중형견", "대형견"],
      lifeStage: ["성견"],
      bodyType: ["적정"],
      activityLevel: ["적음", "보통"],
      neutered: "both",
      mainProtein: ["오리고기"],
      grainFree: false,
      foodType: "건식",
      healthBenefits: ["소화/장 건강"],
      kcalPer100g: 355,
      ingredients: {
        contains: ["오리고기", "귀리", "비트펄프"],
        avoid: [],
      },
      avoidIf: {
        allergies: ["밀/곡물"],
        diseases: [],
      },
      specialFeatures: ["저자극성"],
      nutrition: { protein: 25, fat: 13, moisture: 10 },
    },
  },
  {
    price: 55000,
    quantity: 32,
    name: "조인트케어 치킨앤현미",
    content:
      "글루코사민 1,200mg이 연골 조직의 주요 구성 성분을 보충하여 닳아진 연골을 보호하고, 관절의 충격 흡수 능력을 유지합니다. 콘드로이틴 설페이트가 관절액의 점성을 높여 뼈와 뼈 사이의 마찰을 줄이고 부드러운 움직임이 가능하도록 합니다.",
    mainImages: [{ path: "/images/products", name: "jointcare_chicken_brownrice.jpg" }],
    extra: {
      code: "FNC-JT-01",
      weight: 1200,
      size: ["중형견", "대형견"],
      lifeStage: ["성견"],
      bodyType: ["적정", "과체중"],
      activityLevel: ["보통", "많음"],
      neutered: "both",
      mainProtein: ["닭고기"],
      grainFree: false,
      foodType: "건식",
      healthBenefits: ["관절/뼈 건강"],
      kcalPer100g: 350,
      ingredients: {
        contains: ["닭고기", "현미", "크랜베리"],
        avoid: [],
      },
      avoidIf: {
        allergies: ["닭고기", "밀/곡물"],
        diseases: [],
      },
      specialFeatures: ["관절 영양 강화"],
      nutrition: { protein: 26, fat: 12, moisture: 10 },
    },
  },
  {
    price: 56000,
    quantity: 24,
    name: "조인트케어 연어앤감자",
    content:
      "연어에 풍부한 오메가-3 지방산(EPA, DHA)이 관절 내 염증 물질 생성을 억제하여 관절염으로 인한 통증과 뻣뻣함을 자연스럽게 완화합니다. 글루코사민과 콘드로이틴이 복합적으로 작용하여 연골 손상을 예방합니다.",
    mainImages: [{ path: "/images/products", name: "jointcare_salmon_potato.jpg" }],
    extra: {
      code: "FNC-JT-02",
      weight: 1200,
      size: ["중형견", "대형견"],
      lifeStage: ["성견"],
      bodyType: ["적정", "과체중"],
      activityLevel: ["보통", "많음"],
      neutered: "both",
      mainProtein: ["연어"],
      grainFree: false,
      foodType: "건식",
      healthBenefits: ["관절/뼈 건강"],
      kcalPer100g: 345,
      ingredients: {
        contains: ["연어", "감자", "연어오일"],
        avoid: [],
      },
      avoidIf: {
        allergies: ["생선", "밀/곡물"],
        diseases: [],
      },
      specialFeatures: ["관절 영양 강화", "오메가3 풍부"],
      nutrition: { protein: 25, fat: 12, moisture: 10 },
    },
  },
  {
    price: 48000,
    quantity: 73,
    name: "웨이트케어 치킨앤보리",
    content:
      "100g당 310kcal의 저칼로리 설계로 평소 급여량을 유지하면서도 자연스럽게 칼로리 섭취를 줄여 건강한 체중 감량을 도와줍니다. L-카르니틴이 체내 지방을 에너지원으로 전환하는 대사 과정을 촉진하여 축적된 체지방을 효과적으로 연소시킵니다.",
    mainImages: [{ path: "/images/products", name: "weightcare_chicken_barley.jpg" }],
    extra: {
      code: "FNC-WT-01",
      weight: 1000,
      size: ["소형견", "중형견", "대형견"],
      lifeStage: ["성견"],
      bodyType: ["과체중", "비만"],
      activityLevel: ["적음", "보통"],
      neutered: "yes",
      mainProtein: ["닭고기"],
      grainFree: false,
      foodType: "건식",
      healthBenefits: ["체중 관리"],
      kcalPer100g: 310,
      ingredients: {
        contains: ["닭고기", "보리", "비트펄프"],
        avoid: [],
      },
      avoidIf: {
        allergies: ["닭고기", "밀/곡물"],
        diseases: [],
      },
      specialFeatures: ["저칼로리"],
      nutrition: { protein: 28, fat: 8, moisture: 10 },
    },
  },
  {
    price: 50000,
    quantity: 41,
    name: "웨이트케어 칠면조앤고구마",
    content:
      "칠면조는 닭고기보다 지방 함량이 30% 이상 낮으면서도 단백질 함량은 높아 근육량을 유지하면서 체중을 감량하는 데 이상적입니다. 100g당 305kcal로 가장 낮은 칼로리를 자랑하여 심한 비만이나 빠른 체중 감량이 필요한 강아지에게 특히 적합합니다.",
    mainImages: [{ path: "/images/products", name: "weightcare_turkey_sweetpotato.jpg" }],
    extra: {
      code: "FNC-WT-02",
      weight: 1000,
      size: ["소형견", "중형견", "대형견"],
      lifeStage: ["성견"],
      bodyType: ["과체중", "비만"],
      activityLevel: ["적음", "보통"],
      neutered: "yes",
      mainProtein: ["칠면조"],
      grainFree: true,
      foodType: "건식",
      healthBenefits: ["체중 관리"],
      kcalPer100g: 305,
      ingredients: {
        contains: ["칠면조", "고구마"],
        avoid: ["밀", "옥수수", "쌀", "곡물 전체"],
      },
      avoidIf: {
        allergies: ["칠면조"],
        diseases: [],
      },
      specialFeatures: ["저칼로리", "그레인프리"],
      nutrition: { protein: 30, fat: 7, moisture: 10 },
    },
  },
  {
    price: 46000,
    quantity: 82,
    name: "스몰시니어 치킨앤현미",
    content:
      "글루코사민과 콘드로이틴이 나이가 들면서 자연스럽게 닳아지는 관절 연골을 보호하고, 노령견의 이동성과 활동성을 유지하는 데 도움을 줍니다. 340kcal의 낮은 칼로리 설계로 활동량이 줄어든 노령 소형견의 체중 증가를 방지합니다.",
    mainImages: [{ path: "/images/products", name: "small_senior_chicken_brownrice.jpg" }],
    extra: {
      code: "SNR-S-01",
      weight: 600,
      size: ["소형견"],
      lifeStage: ["시니어"],
      bodyType: ["적정", "과체중"],
      activityLevel: ["적음", "보통"],
      neutered: "both",
      mainProtein: ["닭고기"],
      grainFree: false,
      foodType: "건식",
      healthBenefits: ["관절/뼈 건강"],
      kcalPer100g: 340,
      ingredients: {
        contains: ["닭고기", "현미"],
        avoid: [],
      },
      avoidIf: {
        allergies: ["닭고기", "밀/곡물"],
        diseases: [],
      },
      specialFeatures: ["시니어 전용", "소형견 키블", "관절 영양 강화", "저칼로리"],
      nutrition: { protein: 25, fat: 11, moisture: 10 },
    },
  },
  {
    price: 47000,
    quantity: 59,
    name: "스몰시니어 오리앤귀리",
    content:
      "프로바이오틱스와 프리바이오틱스가 노화로 인해 약해진 장 기능을 개선하고, 변비나 설사 등 노령견에게 흔한 소화 문제를 예방합니다. 오리고기는 닭고기에 알러지가 생긴 노령견에게 새로운 단백질원을 제공합니다.",
    mainImages: [{ path: "/images/products", name: "small_senior_duck_oat.jpg" }],
    extra: {
      code: "SNR-S-02",
      weight: 600,
      size: ["소형견"],
      lifeStage: ["시니어"],
      bodyType: ["적정", "과체중"],
      activityLevel: ["적음", "보통"],
      neutered: "both",
      mainProtein: ["오리고기"],
      grainFree: false,
      foodType: "건식",
      healthBenefits: ["소화/장 건강"],
      kcalPer100g: 335,
      ingredients: {
        contains: ["오리고기", "귀리", "비트펄프"],
        avoid: [],
      },
      avoidIf: {
        allergies: ["밀/곡물"],
        diseases: [],
      },
      specialFeatures: ["시니어 전용", "소형견 키블", "저자극성"],
      nutrition: { protein: 24, fat: 11, moisture: 10 },
    },
  },
  {
    price: 52000,
    quantity: 37,
    name: "미디엄시니어 연어앤현미",
    content:
      "연어의 오메가-3 지방산이 노화로 건조해지기 쉬운 피부에 수분을 공급하고, 탈모와 비듬을 줄여 건강한 피부와 모질을 유지합니다. 글루코사민, 콘드로이틴, MSM의 관절 복합 성분이 노령견의 관절 건강을 종합적으로 케어합니다.",
    mainImages: [{ path: "/images/products", name: "medium_senior_salmon_brownrice.jpg" }],
    extra: {
      code: "SNR-M-01",
      weight: 1000,
      size: ["중형견"],
      lifeStage: ["시니어"],
      bodyType: ["적정", "과체중"],
      activityLevel: ["적음", "보통"],
      neutered: "both",
      mainProtein: ["연어"],
      grainFree: false,
      foodType: "건식",
      healthBenefits: ["피부/모질", "관절/뼈 건강"],
      kcalPer100g: 330,
      ingredients: {
        contains: ["연어", "현미", "연어오일", "크랜베리"],
        avoid: [],
      },
      avoidIf: {
        allergies: ["생선", "밀/곡물"],
        diseases: [],
      },
      specialFeatures: ["시니어 전용", "관절 영양 강화", "오메가3 풍부", "항산화 성분"],
      nutrition: { protein: 24, fat: 10, moisture: 10 },
    },
  },
  {
    price: 54000,
    quantity: 22,
    name: "라지시니어 치킨앤현미",
    content:
      "고함량의 글루코사민과 콘드로이틴이 대형 노령견의 무거운 체중으로 인해 더욱 빨리 닳는 관절을 집중적으로 보호하고 케어합니다. 지방 함량을 낮추어 노화로 기능이 저하된 심장과 순환계에 부담을 줄이고, 타우린이 강화되어 있습니다.",
    mainImages: [{ path: "/images/products", name: "large_senior_chicken_brownrice.jpg" }],
    extra: {
      code: "SNR-L-01",
      weight: 1500,
      size: ["대형견"],
      lifeStage: ["시니어"],
      bodyType: ["적정", "과체중", "비만"],
      activityLevel: ["적음", "보통"],
      neutered: "both",
      mainProtein: ["닭고기"],
      grainFree: false,
      foodType: "건식",
      healthBenefits: ["관절/뼈 건강"],
      kcalPer100g: 325,
      ingredients: {
        contains: ["닭고기", "현미"],
        avoid: [],
      },
      avoidIf: {
        allergies: ["닭고기", "밀/곡물"],
        diseases: ["심장 질환"],
      },
      specialFeatures: ["시니어 전용", "관절 영양 강화", "저칼로리"],
      nutrition: { protein: 23, fat: 10, moisture: 10 },
    },
  },
  {
    price: 56000,
    quantity: 18,
    name: "라지시니어 연어앤감자",
    content:
      "연어의 DHA와 EPA가 노화로 인한 인지 기능 저하를 늦추고 뇌 건강을 지원하여 노령견이 또렷한 정신 상태를 유지하도록 돕습니다. 관절과 피부 건강을 동시에 케어하는 복합 설계로, 대형 노령견의 삶의 질을 종합적으로 높입니다.",
    mainImages: [{ path: "/images/products", name: "large_senior_salmon_potato.jpg" }],
    extra: {
      code: "SNR-L-02",
      weight: 1500,
      size: ["대형견"],
      lifeStage: ["시니어"],
      bodyType: ["적정", "과체중", "비만"],
      activityLevel: ["적음", "보통"],
      neutered: "both",
      mainProtein: ["연어"],
      grainFree: false,
      foodType: "건식",
      healthBenefits: ["관절/뼈 건강", "피부/모질"],
      kcalPer100g: 320,
      ingredients: {
        contains: ["연어", "감자", "연어오일", "크랜베리"],
        avoid: [],
      },
      avoidIf: {
        allergies: ["생선", "밀/곡물"],
        diseases: [],
      },
      specialFeatures: ["시니어 전용", "관절 영양 강화", "오메가3 풍부", "저칼로리", "항산화 성분"],
      nutrition: { protein: 22, fat: 9, moisture: 10 },
    },
  },
  {
    price: 58000,
    quantity: 27,
    name: "싱글프로틴 양고기앤고구마",
    content:
      "양고기 하나만을 단백질원으로 사용하는 싱글 프로틴 설계로 어떤 단백질이 알러지를 유발하는지 정확히 파악하고 원인을 차단할 수 있습니다. 곡물, 닭고기, 생선을 모두 배제한 그레인프리 레시피로 복합적인 음식 알러지나 민감성을 가진 강아지도 안심하고 급여할 수 있습니다.",
    mainImages: [{ path: "/images/products", name: "lid_lamb_sweetpotato.jpg" }],
    extra: {
      code: "LID-01",
      weight: 1000,
      size: ["소형견", "중형견", "대형견"],
      lifeStage: ["성견"],
      bodyType: ["적정"],
      activityLevel: ["적음", "보통", "많음"],
      neutered: "both",
      mainProtein: ["양고기"],
      grainFree: true,
      foodType: "건식",
      healthBenefits: ["소화/장 건강", "피부/모질"],
      kcalPer100g: 350,
      ingredients: {
        contains: ["양고기", "고구마"],
        avoid: ["밀", "옥수수", "쌀", "곡물 전체"],
      },
      avoidIf: {
        allergies: ["양고기"],
        diseases: [],
      },
      specialFeatures: ["그레인프리", "저자극성", "싱글프로틴"],
      nutrition: { protein: 24, fat: 13, moisture: 10 },
    },
  },
  {
    price: 59000,
    quantity: 19,
    name: "싱글프로틴 연어앤타피오카",
    content:
      "연어만을 단일 동물성 단백질원으로 사용하여 닭고기, 소고기, 양고기 등 육류에 알러지가 있는 강아지를 위한 대안을 제공합니다. 타피오카는 글루텐이 전혀 없고 알러지 유발 가능성이 극히 낮은 탄수화물원으로, 곡물이나 감자에 민감한 강아지에게도 적합합니다.",
    mainImages: [{ path: "/images/products", name: "lid_salmon_tapioca.jpg" }],
    extra: {
      code: "LID-02",
      weight: 1000,
      size: ["소형견", "중형견", "대형견"],
      lifeStage: ["성견"],
      bodyType: ["적정"],
      activityLevel: ["적음", "보통", "많음"],
      neutered: "both",
      mainProtein: ["연어"],
      grainFree: true,
      foodType: "건식",
      healthBenefits: ["피부/모질"],
      kcalPer100g: 345,
      ingredients: {
        contains: ["연어", "타피오카", "연어오일"],
        avoid: ["밀", "옥수수", "쌀", "곡물 전체"],
      },
      avoidIf: {
        allergies: ["생선"],
        diseases: [],
      },
      specialFeatures: ["그레인프리", "저자극성", "오메가3 풍부", "싱글프로틴"],
      nutrition: { protein: 24, fat: 14, moisture: 10 },
    },
  },
  {
    price: 57000,
    quantity: 31,
    name: "싱글프로틴 오리앤감자",
    content:
      "오리고기만을 단일 동물성 단백질로 사용하여 닭고기, 생선, 양고기 등 여러 단백질에 동시에 알러지가 있는 복합 알러지 강아지도 안전하게 급여할 수 있습니다. 곡물, 닭고기, 생선을 모두 함유하지 않아 가장 흔한 알러지 유발 원료를 완벽히 배제하였습니다.",
    mainImages: [{ path: "/images/products", name: "lid_duck_potato.jpg" }],
    extra: {
      code: "LID-03",
      weight: 1000,
      size: ["소형견", "중형견", "대형견"],
      lifeStage: ["성견"],
      bodyType: ["적정"],
      activityLevel: ["적음", "보통", "많음"],
      neutered: "both",
      mainProtein: ["오리고기"],
      grainFree: true,
      foodType: "건식",
      healthBenefits: ["소화/장 건강"],
      kcalPer100g: 350,
      ingredients: {
        contains: ["오리고기", "감자"],
        avoid: ["밀", "옥수수", "쌀", "곡물 전체"],
      },
      avoidIf: {
        allergies: [],
        diseases: [],
      },
      specialFeatures: ["그레인프리", "저자극성", "싱글프로틴"],
      nutrition: { protein: 25, fat: 13, moisture: 10 },
    },
  },
];

// 추천 결과 타입
export interface RecommendationResult {
  code: string;
  score: number;
}

/**
 * 코드로 제품 데이터 조회 (extra.code로 검색)
 */
export function getProductByCode(code: string): ProductData | null {
  return dogFoodData.find((p) => p.extra.code === code) || null;
}

/**
 * 설문 데이터 매핑 함수들
 */
function mapSurveySize(surveySize: string): string {
  if (surveySize.includes("소형")) return "소형견";
  if (surveySize.includes("중형")) return "중형견";
  if (surveySize.includes("대형")) return "대형견";
  return "";
}

function mapSurveyAge(surveyAge: string): string {
  const ageMap: Record<string, string> = {
    puppy: "퍼피",
    adult: "성견",
    senior: "시니어",
  };
  return ageMap[surveyAge] || "";
}

function mapSurveyBodyType(surveyBodyType: string): string {
  const bodyMap: Record<string, string> = {
    thin: "마름",
    ideal: "적정",
    overweight: "과체중",
    obese: "비만",
  };
  return bodyMap[surveyBodyType] || "";
}

function mapSurveyAllergies(surveyAllergies: string[]): string[] {
  if (surveyAllergies.includes("없음")) return [];
  const allergenMap: Record<string, string> = {
    닭고기: "닭고기",
    곡물: "밀/곡물",
    "밀/곡물": "밀/곡물",
    생선: "생선",
    양고기: "양고기",
    소고기: "소고기",
    오리: "오리고기",
    달걀: "달걀",
    유제품: "유제품",
    "완두콩·콩류": "완두콩",
  };
  return surveyAllergies.map((a) => allergenMap[a] || a).filter(Boolean);
}

function mapSurveyHealthConcerns(surveyConcerns: string[]): string[] {
  if (surveyConcerns.includes("없음")) return [];
  const concernMap: Record<string, string> = {
    "피부 / 모질": "피부/모질",
    "소화 / 장 건강": "소화/장 건강",
    "관절 / 뼈 건강": "관절/뼈 건강",
    "체중 관리": "체중 관리",
  };
  return surveyConcerns
    .map((c) => {
      if (c.includes("피부")) return "피부/모질";
      if (c.includes("소화")) return "소화/장 건강";
      if (c.includes("관절")) return "관절/뼈 건강";
      if (c.includes("체중")) return "체중 관리";
      return "";
    })
    .filter(Boolean);
}

function mapSurveyProtein(surveyProtein: string): string | null {
  const proteinMap: Record<string, string> = {
    닭고기: "닭고기",
    오리: "오리고기",
    오리고기: "오리고기",
    양고기: "양고기",
    연어: "연어",
    소고기: "소고기",
    칠면조: "칠면조",
  };
  return surveyProtein === "상관없음" ? null : proteinMap[surveyProtein] || null;
}

function mapSurveyDiseases(surveyDiseases: string[]): string[] {
  if (surveyDiseases.includes("없음")) return [];
  return surveyDiseases.filter((d) => d !== "기타 질환 있음 (상세 불필요)");
}

function mapSurveyFoodType(surveyFoodType: string): string | null {
  if (surveyFoodType.includes("건식")) return "건식";
  if (surveyFoodType.includes("습식")) return "습식";
  return null;
}

/**
 * 1단계: 필수 필터링 (Safety First)
 */
function filterBySafety(
  products: ProductData[],
  mappedAllergies: string[],
  mappedDiseases: string[],
  grainPreference: string,
): ProductData[] {
  return products.filter((product) => {
    if (mappedAllergies.some((allergy) => product.extra.avoidIf.allergies.includes(allergy))) {
      return false;
    }
    if (mappedDiseases.some((disease) => product.extra.avoidIf.diseases.includes(disease))) {
      return false;
    }
    if (grainPreference === "그레인프리(Grain Free) 선호" && product.extra.grainFree === false) {
      return false;
    }
    return true;
  });
}

/**
 * 2단계: 적합성 필터링 (Basic Matching)
 */
function filterBySuitability(
  products: ProductData[],
  mappedSize: string,
  mappedAge: string,
  mappedFoodType: string | null,
): ProductData[] {
  return products.filter((product) => {
    if (mappedSize && !product.extra.size.includes(mappedSize)) return false;
    if (mappedAge && !product.extra.lifeStage.includes(mappedAge)) return false;
    if (mappedFoodType && product.extra.foodType !== mappedFoodType) return false;
    return true;
  });
}

/**
 * 3단계: 점수 계산 (Scoring)
 */
function calculateScore(product: ProductData, formData: ExtendedSurveyFormData): number {
  let score = 0;

  const mappedHealthConcerns = mapSurveyHealthConcerns(formData.healthConcerns);
  const mappedBodyType = mapSurveyBodyType(formData.bodyType);
  const mappedProtein = mapSurveyProtein(formData.protein);
  const mappedAllergies = mapSurveyAllergies(formData.allergies);

  // 1. 건강 고민 매칭 (+10점/개)
  mappedHealthConcerns.forEach((concern) => {
    if (product.extra.healthBenefits.includes(concern)) {
      score += 10;
    }
  });

  // 2. 체중 관리 로직
  const isOverweight = ["과체중", "비만"].includes(formData.bodyType);
  const isThin = formData.bodyType === "마름";

  if (isOverweight) {
    if (product.extra.healthBenefits.includes("체중 관리")) score += 8;
    if (product.extra.kcalPer100g <= 320) score += 5;
    if (product.extra.kcalPer100g > 380) score -= 5;
  }
  if (isThin) {
    if (product.extra.kcalPer100g >= 380) score += 5;
    if (product.extra.healthBenefits.includes("체중 관리")) score -= 3;
  }

  // 3. 중성화 여부
  if (formData.neutered === "예") {
    if (product.extra.healthBenefits.includes("체중 관리") || product.extra.kcalPer100g <= 330) {
      score += 6;
    }
  } else if (formData.neutered === "아니요") {
    if (product.extra.kcalPer100g >= 370) score += 4;
  }

  // 4. 활동량
  if (formData.activityLevel === "많음" && product.extra.kcalPer100g >= 380) score += 3;
  if (formData.activityLevel === "적음" && product.extra.kcalPer100g <= 340) score += 3;

  // 5. 단백질 선호 (+7점)
  if (mappedProtein && product.extra.mainProtein.includes(mappedProtein)) {
    score += 7;
  }

  // 6. 체형 매칭 (+4점)
  if (product.extra.bodyType.includes(mappedBodyType)) {
    score += 4;
  }

  // 7. 복합 알러지 + 싱글프로틴 (+8점)
  if (mappedAllergies.length >= 2 && product.extra.specialFeatures.includes("싱글프로틴")) {
    score += 8;
  }

  // 8. 기타 알러지 + 저자극성 (+5점)
  if (
    formData.allergies.includes("기타 알러지 있음 (구체적 원료 미상)") &&
    product.extra.specialFeatures.includes("저자극성")
  ) {
    score += 5;
  }

  return score;
}

/**
 * 🚀 메인 추천 함수
 */
export function recommendProducts(formData: ExtendedSurveyFormData): RecommendationResult[] | null {
  const mappedSize = mapSurveySize(formData.size);
  const mappedAge = mapSurveyAge(formData.age);
  const mappedAllergies = mapSurveyAllergies(formData.allergies);
  const mappedDiseases = mapSurveyDiseases(formData.diagnosedDiseases);
  const mappedFoodType = mapSurveyFoodType(formData.foodType);

  let products = [...dogFoodData];

  products = filterBySafety(products, mappedAllergies, mappedDiseases, formData.grainPreference);
  products = filterBySuitability(products, mappedSize, mappedAge, mappedFoodType);

  if (products.length === 0) return null;

  const scoredProducts = products.map((product) => ({
    code: product.extra.code,
    score: calculateScore(product, formData),
  }));

  scoredProducts.sort((a, b) => b.score - a.score);

  return scoredProducts.slice(0, 5);
}

/**
 * URL 생성 함수 (Extended 타입 지원)
 */
export function createResultUrl(
  results: RecommendationResult[] | null,
  formData?: ExtendedSurveyFormData,
): string {
  if (!results || results.length === 0) return `/survey/result`;

  const params = new URLSearchParams();
  params.set("top", results.map((r) => r.code).join(","));

  if (formData) {
    params.set("size", formData.size.replace(/\s*\(.*\)/, ""));
    params.set("age", formData.age);
    params.set("protein", formData.protein);

    const healthConcerns = formData.healthConcerns.filter((c) => c !== "없음");
    const simpleHealth = mapSurveyHealthConcerns(healthConcerns);
    if (simpleHealth.length > 0) {
      params.set("health", simpleHealth.join(","));
    }
  }

  return `/survey/result?${params.toString()}`;
}

export function parseResultCodes(codeParam: string | null): string[] | null {
  if (!codeParam) return null;
  return decodeURIComponent(codeParam).split(",");
}
