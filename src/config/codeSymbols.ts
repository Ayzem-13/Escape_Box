export type CodeCategory = 'symbols' | 'letters' | 'numbers' | 'roman_numerals';

export const CODE_SYMBOLS: readonly string[] = ['▲', '▼', '■', '●', '◆', '►', '◄', '▷', '★', '☆', '♦', '◇', '◈', '▬', '▭', '▮'];

export const CODE_LETTERS: readonly string[] = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
  'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
  'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
  'Y', 'Z',
];

export const CODE_NUMBERS: readonly string[] = [
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
];

export const CODE_ROMAN_NUMERALS: readonly string[] = [
  'Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ', 'Ⅵ', 'Ⅶ', 'Ⅷ', 'Ⅸ', 'Ⅹ',
];

export const CODE_CATEGORY_LABEL: Record<CodeCategory, string> = {
  symbols: 'Symboles',
  letters: 'Lettres',
  numbers: 'Chiffres',
  roman_numerals: 'Chiffres romains',
};

export const CODE_TOKEN_SETS: Record<CodeCategory, readonly string[]> = {
  symbols: CODE_SYMBOLS,
  letters: CODE_LETTERS,
  numbers: CODE_NUMBERS,
  roman_numerals: CODE_ROMAN_NUMERALS,
};

export const CODE_LENGTH = 4;

export const CODE_CATEGORIES: readonly CodeCategory[] = ['symbols', 'letters', 'numbers', 'roman_numerals'];
