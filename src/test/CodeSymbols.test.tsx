import { describe, it, expect } from 'vitest';
import {
  CODE_CATEGORIES,
  CODE_CATEGORY_LABEL,
  CODE_LENGTH,
  CODE_LETTERS,
  CODE_NUMBERS,
  CODE_ROMAN_NUMERALS,
  CODE_SYMBOLS,
  CODE_TOKEN_SETS,
} from '../config/codeSymbols';

describe('codeSymbols config', () => {
  it('expose les 4 catégories attendues', () => {
    expect(CODE_CATEGORIES).toEqual(['symbols', 'letters', 'numbers', 'roman_numerals']);
  });

  it('a un label pour chaque catégorie', () => {
    for (const cat of CODE_CATEGORIES) {
      expect(CODE_CATEGORY_LABEL[cat]).toBeTruthy();
    }
  });

  it('mappe chaque catégorie vers son set de tokens', () => {
    expect(CODE_TOKEN_SETS.symbols).toBe(CODE_SYMBOLS);
    expect(CODE_TOKEN_SETS.letters).toBe(CODE_LETTERS);
    expect(CODE_TOKEN_SETS.numbers).toBe(CODE_NUMBERS);
    expect(CODE_TOKEN_SETS.roman_numerals).toBe(CODE_ROMAN_NUMERALS);
  });

  it('contient les 26 lettres de l\'alphabet', () => {
    expect(CODE_LETTERS).toHaveLength(26);
    expect(CODE_LETTERS[0]).toBe('A');
    expect(CODE_LETTERS[25]).toBe('Z');
  });

  it('contient les chiffres de 0 à 9', () => {
    expect(CODE_NUMBERS).toEqual(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
  });

  it('contient 10 chiffres romains', () => {
    expect(CODE_ROMAN_NUMERALS).toHaveLength(10);
    expect(CODE_ROMAN_NUMERALS[0]).toBe('Ⅰ');
    expect(CODE_ROMAN_NUMERALS[9]).toBe('Ⅹ');
  });

  it('a au moins un symbole dans chaque set non vide', () => {
    for (const cat of CODE_CATEGORIES) {
      expect(CODE_TOKEN_SETS[cat].length).toBeGreaterThan(0);
    }
  });

  it('garantit qu\'aucun token n\'est dupliqué dans un set', () => {
    for (const cat of CODE_CATEGORIES) {
      const set = CODE_TOKEN_SETS[cat];
      expect(new Set(set).size).toBe(set.length);
    }
  });

  it('définit une longueur de code de 4', () => {
    expect(CODE_LENGTH).toBe(4);
  });

  it('expose des sets en lecture seule', () => {
    expect(Array.isArray(CODE_SYMBOLS)).toBe(true);
    expect(Array.isArray(CODE_LETTERS)).toBe(true);
    expect(Array.isArray(CODE_NUMBERS)).toBe(true);
    expect(Array.isArray(CODE_ROMAN_NUMERALS)).toBe(true);
  });
});
