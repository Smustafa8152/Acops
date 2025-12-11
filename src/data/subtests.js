// ACOPS Cognitive Assessment Battery - 8 Subtests
// Ages 4-8 years

export const subtests = [
  {
    id: 'zoids-friends',
    code: 'ZF',
    nameAr: 'أصدقاء الزويدز',
    nameEn: 'Zoids Friends',
    description: 'اختبار الذاكرة البصرية للألوان',
    type: 'visual-memory',
    ageRange: [4, 8],
    totalItems: 12,
    trainingItems: 2,
    stimulusTime: 5, // seconds
    colors: ['red', 'blue', 'yellow', 'green', 'orange', 'purple'],
    colorNamesAr: {
      red: 'أحمر',
      blue: 'أزرق',
      yellow: 'أصفر',
      green: 'أخضر',
      orange: 'برتقالي',
      purple: 'بنفسجي'
    }
  },
  {
    id: 'toy-box',
    code: 'TB',
    nameAr: 'صندوق الألعاب',
    nameEn: 'Toy Box',
    description: 'اختبار الذاكرة البصرية للأشكال',
    type: 'visual-memory',
    ageRange: [4, 8],
    totalItems: 12,
    trainingItems: 2,
    stimulusTime: 5,
    shapes: ['circle', 'square', 'triangle', 'rectangle'],
    shapeNamesAr: {
      circle: 'دائرة',
      square: 'مربع',
      triangle: 'مثلث',
      rectangle: 'مستطيل'
    }
  },
  {
    id: 'rabbits',
    code: 'RB',
    nameAr: 'الأرانب',
    nameEn: 'Rabbits',
    description: 'اختبار الذاكرة المكانية',
    type: 'spatial-memory',
    ageRange: [4, 8],
    totalItems: 12,
    trainingItems: 2,
    stimulusTime: 3,
    gridSize: 9 // 3x3 grid
  },
  {
    id: 'zoids-letters',
    code: 'ZL',
    nameAr: 'حروف الزويدز',
    nameEn: 'Zoids Letters',
    description: 'اختبار الذاكرة البصرية-اللفظية',
    type: 'visual-verbal',
    ageRange: [4, 8],
    totalItems: 12,
    trainingItems: 2,
    stimulusTime: 5,
    letters: ['ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س']
  },
  {
    id: 'zoids-letter-names',
    code: 'ZLN',
    nameAr: 'أسماء حروف الزويدز',
    nameEn: 'Zoids Letter Names',
    description: 'اختبار الذاكرة السمعية-اللفظية',
    type: 'auditory-verbal',
    ageRange: [4, 8],
    totalItems: 12,
    trainingItems: 2,
    stimulusTime: 0, // Audio only
    letterNames: ['ألف', 'باء', 'تاء', 'ثاء', 'جيم', 'حاء', 'خاء', 'دال', 'ذال', 'راء', 'زاي', 'سين']
  },
  {
    id: 'races',
    code: 'RC',
    nameAr: 'السباقات',
    nameEn: 'Races',
    description: 'اختبار الذاكرة التسلسلية',
    type: 'sequential-memory',
    ageRange: [4, 8],
    totalItems: 12,
    trainingItems: 2,
    stimulusTime: 5,
    animals: ['rabbit', 'cat', 'dog', 'bird', 'horse'],
    animalNamesAr: {
      rabbit: 'أرنب',
      cat: 'قطة',
      dog: 'كلب',
      bird: 'عصفور',
      horse: 'حصان'
    }
  },
  {
    id: 'rhymes',
    code: 'RH',
    nameAr: 'القوافي',
    nameEn: 'Rhymes',
    description: 'اختبار الوعي الفونولوجي',
    type: 'phonological',
    ageRange: [4, 8],
    totalItems: 12,
    trainingItems: 2,
    stimulusTime: 0 // Word display only
  },
  {
    id: 'wock',
    code: 'WK',
    nameAr: 'ووك',
    nameEn: 'Wock',
    description: 'اختبار التمييز الصوتي',
    type: 'sound-discrimination',
    ageRange: [4, 8],
    totalItems: 12,
    trainingItems: 2,
    stimulusTime: 0 // Two audio clips
  }
];

// Helper function to get subtest by ID
export const getSubtestById = (id) => {
  return subtests.find(st => st.id === id);
};

// Helper function to get all subtest IDs in order
export const getSubtestOrder = () => {
  return subtests.map(st => st.id);
};

// Helper to convert numbers to Arabic numerals
export const toArabicNumerals = (num) => {
  const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(num).split('').map(d => arabicNumerals[parseInt(d)]).join('');
};
