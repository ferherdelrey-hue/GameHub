import { Game } from './types';

export const GAMES: Game[] = [
  {
    id: '2048',
    title: '2048',
    thumbnail: 'https://picsum.photos/seed/2048/400/300',
    url: 'https://play2048.co/',
    category: 'Puzzle',
    description: 'Join the numbers and get to the 2048 tile!'
  },
  {
    id: 'hextris',
    title: 'Hextris',
    thumbnail: 'https://picsum.photos/seed/hextris/400/300',
    url: 'https://hextris.io/',
    category: 'Arcade',
    description: 'Fast-paced puzzle game inspired by Tetris.'
  },
  {
    id: 'clumsy-bird',
    title: 'Clumsy Bird',
    thumbnail: 'https://picsum.photos/seed/bird/400/300',
    url: 'https://ellisonleao.github.io/clumsy-bird/',
    category: 'Arcade',
    description: 'A Flappy Bird clone.'
  },
  {
    id: 'tower-game',
    title: 'Tower Game',
    thumbnail: 'https://picsum.photos/seed/tower/400/300',
    url: 'https://tower-game.github.io/',
    category: 'Casual',
    description: 'Build the tallest tower possible.'
  },
  {
    id: 'pacman',
    title: 'Pacman',
    thumbnail: 'https://picsum.photos/seed/pacman/400/300',
    url: 'https://macek.github.io/google_pacman/',
    category: 'Classic',
    description: 'The classic arcade game.'
  },
  {
    id: 'snake',
    title: 'Snake',
    thumbnail: 'https://picsum.photos/seed/snake/400/300',
    url: 'https://patorjk.com/games/snake/',
    category: 'Classic',
    description: 'The legendary snake game.'
  },
  {
    id: 'dino',
    title: 'Chrome Dino',
    thumbnail: 'https://picsum.photos/seed/dino/400/300',
    url: 'https://chromedino.com/',
    category: 'Arcade',
    description: 'The famous offline dinosaur game.'
  },
  {
    id: 'paper-io',
    title: 'Paper.io 2',
    thumbnail: 'https://picsum.photos/seed/paper/400/300',
    url: 'https://paper-io.com/',
    category: 'IO',
    description: 'Capture as much territory as possible.'
  }
];
