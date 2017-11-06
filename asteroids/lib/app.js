import GameView from './game_view';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const gameView = new GameView(ctx);
gameView.start();
