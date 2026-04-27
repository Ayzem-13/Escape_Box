export interface Contributor {
  name: string;
  role?: string;
  quote: string;
}

export const CREDITS_TAGLINE = 'Fait avec passion ❤';

export const CONTRIBUTORS: Contributor[] = [
  {
    name: 'Léo Giner',
    quote: 'Toujours là pour pousser le projet plus loin.',
  },
  {
    name: 'Axel Roubaud',
    quote: 'Du café, du clavier et beaucoup d\'idées.',
  },
  {
    name: 'Clément Marie',
    quote: 'Pour que chaque énigme ait sa juste dose de mystère.',
  },
  {
    name: 'Charles Daw',
    quote: 'Architecte des indices et des fausses pistes.',
  },
  {
    name: 'Nakib',
    quote: 'Quand le détail fait la différence.',
  },
  {
    name: 'Missak',
    quote: 'Le sens du défi, version artisan.',
  },

];
