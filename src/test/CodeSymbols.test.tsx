import { describe, it, expect } from 'vitest'
import { CODE_SYMBOLS, CODE_ROMAN_NUMERALS, CODE_LETTERS, CODE_NUMBERS, CODE_CATEGORIES, CODE_TOKEN_SETS, CODE_CATEGORY_LABEL, CODE_LENGTH } from '../config/codeSymbols'

describe('CodeSymbols Configuration', () => {
  describe('Catégories disponibles', () => {
    it('devrait avoir 4 catégories', () => {
      expect(CODE_CATEGORIES).toHaveLength(4)
    })

    it('devrait contenir symbols, letters, numbers, roman_numerals', () => {
      expect(CODE_CATEGORIES).toEqual(['symbols', 'letters', 'numbers', 'roman_numerals'])
    })

    it('tous les labels de catégories doivent être définis', () => {
      CODE_CATEGORIES.forEach((cat) => {
        expect(CODE_CATEGORY_LABEL[cat]).toBeDefined()
        expect(typeof CODE_CATEGORY_LABEL[cat]).toBe('string')
      })
    })

    it('tous les token sets doivent être définis', () => {
      CODE_CATEGORIES.forEach((cat) => {
        expect(CODE_TOKEN_SETS[cat]).toBeDefined()
        expect(Array.isArray(CODE_TOKEN_SETS[cat])).toBe(true)
        expect(CODE_TOKEN_SETS[cat].length).toBeGreaterThan(0)
      })
    })
  })

  describe('Symboles', () => {
    it('devrait avoir au moins 8 symboles', () => {
      expect(CODE_SYMBOLS.length).toBeGreaterThanOrEqual(8)
    })

    it('devrait contenir les symboles de base (▲, ▼, ■, ●)', () => {
      expect(CODE_SYMBOLS).toContain('▲')
      expect(CODE_SYMBOLS).toContain('▼')
      expect(CODE_SYMBOLS).toContain('■')
      expect(CODE_SYMBOLS).toContain('●')
    })

    it('devrait contenir les symboles étendus (★, ☆, ♦)', () => {
      expect(CODE_SYMBOLS).toContain('★')
      expect(CODE_SYMBOLS).toContain('☆')
      expect(CODE_SYMBOLS).toContain('♦')
    })

    it('devrait contenir les triangles angle droit (►, ◄, ▷)', () => {
      expect(CODE_SYMBOLS).toContain('►')
      expect(CODE_SYMBOLS).toContain('◄')
      expect(CODE_SYMBOLS).toContain('▷')
    })

    it('CODE_TOKEN_SETS[symbols] doit être CODE_SYMBOLS', () => {
      expect(CODE_TOKEN_SETS.symbols).toBe(CODE_SYMBOLS)
    })
  })

  describe('Chiffres Romains', () => {
    it('devrait avoir 10 chiffres romains', () => {
      expect(CODE_ROMAN_NUMERALS).toHaveLength(10)
    })

    it('devrait contenir Ⅰ à Ⅹ (Unicode Roman numerals)', () => {
      expect(CODE_ROMAN_NUMERALS).toContain('Ⅰ')
      expect(CODE_ROMAN_NUMERALS).toContain('Ⅱ')
      expect(CODE_ROMAN_NUMERALS).toContain('Ⅲ')
      expect(CODE_ROMAN_NUMERALS).toContain('Ⅳ')
      expect(CODE_ROMAN_NUMERALS).toContain('Ⅴ')
      expect(CODE_ROMAN_NUMERALS).toContain('Ⅵ')
      expect(CODE_ROMAN_NUMERALS).toContain('Ⅶ')
      expect(CODE_ROMAN_NUMERALS).toContain('Ⅷ')
      expect(CODE_ROMAN_NUMERALS).toContain('Ⅸ')
      expect(CODE_ROMAN_NUMERALS).toContain('Ⅹ')
    })

    it('ne doit pas conflictuer avec les lettres', () => {
      CODE_ROMAN_NUMERALS.forEach((numeral) => {
        // Les chiffres romains Unicode ne doivent pas être des lettres A-Z
        expect(/^[A-Z]$/.test(numeral)).toBe(false)
      })
    })

    it('CODE_TOKEN_SETS[roman_numerals] doit être CODE_ROMAN_NUMERALS', () => {
      expect(CODE_TOKEN_SETS.roman_numerals).toBe(CODE_ROMAN_NUMERALS)
    })
  })

  describe('Autres catégories', () => {
    it('CODE_LETTERS doit avoir 26 lettres', () => {
      expect(CODE_LETTERS).toHaveLength(26)
    })

    it('CODE_NUMBERS doit avoir 10 chiffres', () => {
      expect(CODE_NUMBERS).toHaveLength(10)
    })

    it('tous les éléments doivent être des chaînes non-vides', () => {
      CODE_CATEGORIES.forEach((cat) => {
        CODE_TOKEN_SETS[cat].forEach((token) => {
          expect(typeof token).toBe('string')
          expect(token.length).toBeGreaterThan(0)
        })
      })
    })
  })

  describe('Longueur de code', () => {
    it('CODE_LENGTH doit être 4', () => {
      expect(CODE_LENGTH).toBe(4)
    })
  })

  describe('Unicité des symboles et prévention de conflits', () => {
    it('aucun symbole ne doit apparaître dans plusieurs catégories', () => {
      const allSymbols = new Map<string, string>()
      
      CODE_CATEGORIES.forEach((cat) => {
        CODE_TOKEN_SETS[cat].forEach((token) => {
          if (allSymbols.has(token)) {
            throw new Error(`Symbole "${token}" apparaît dans "${allSymbols.get(token)}" et "${cat}"`)
          }
          allSymbols.set(token, cat)
        })
      })

      expect(allSymbols.size).toBeGreaterThan(0)
    })

    it('CODE_ROMAN_NUMERALS ne doit pas conflictuer avec CODE_LETTERS', () => {
      const lettersSet = new Set(CODE_LETTERS)
      CODE_ROMAN_NUMERALS.forEach((numeral) => {
        expect(lettersSet.has(numeral)).toBe(false)
      })
    })
  })

  describe('Vérification de fin de partie', () => {
    it('les codes avec symboles doivent pouvoir être trouvés', () => {
      const symbolCode = CODE_SYMBOLS[0] + CODE_SYMBOLS[1] + CODE_SYMBOLS[2] + CODE_SYMBOLS[3]
      expect(symbolCode.length).toBe(4)
      expect(symbolCode).toBeDefined()
    })

    it('les codes avec chiffres romains doivent pouvoir être trouvés', () => {
      const romanCode = CODE_ROMAN_NUMERALS[0] + CODE_ROMAN_NUMERALS[1] + CODE_ROMAN_NUMERALS[2] + CODE_ROMAN_NUMERALS[3]
      expect(romanCode.length).toBe(4)
      expect(romanCode).toBeDefined()
    })

    it('les codes avec lettres doivent pouvoir être trouvés', () => {
      const letterCode = CODE_LETTERS[0] + CODE_LETTERS[1] + CODE_LETTERS[2] + CODE_LETTERS[3]
      expect(letterCode.length).toBe(4)
      expect(letterCode).toBeDefined()
    })

    it('les codes avec chiffres doivent pouvoir être trouvés', () => {
      const numberCode = CODE_NUMBERS[0] + CODE_NUMBERS[1] + CODE_NUMBERS[2] + CODE_NUMBERS[3]
      expect(numberCode.length).toBe(4)
      expect(numberCode).toBeDefined()
    })
  })
})
