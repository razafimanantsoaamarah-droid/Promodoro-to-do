import soundFile from '../assets/sound-milay.mp3';

export const playNotification = () => {
  const audio = new Audio(soundFile);
  audio.volume = 1;
  audio.play().catch(e => console.log('Audio play failed:', e));
};