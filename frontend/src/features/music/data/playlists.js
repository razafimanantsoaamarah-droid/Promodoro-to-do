import { Music, Music2, CloudRain, Headphones } from 'lucide-react';

export const playlists = [
  {
    id: 'lofi',
    name: 'Lo-Fi Chill',
    icon: Music,
    tracks: [
      { title: 'Chill Study', url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk' },
      { title: 'Lo-Fi Hip Hop', url: 'https://www.youtube.com/watch?v=n61ULEU7CO0' },
    ],
  },
  {
    id: 'classical',
    name: 'Classique',
    icon: Music2,
    tracks: [
      { title: 'Mozart Focus', url: 'https://www.youtube.com/watch?v=oy2zDJPIgwc' },
    ],
  },
  {
    id: 'nature',
    name: 'Nature',
    icon: CloudRain,
    tracks: [
      { title: 'Rain Sounds', url: 'https://www.youtube.com/watch?v=mPZkdNFkNps' },
    ],
  },
  {
    id: 'electronic',
    name: 'Électro',
    icon: Headphones,
    tracks: [
      { title: 'Deep Focus', url: 'https://www.youtube.com/watch?v=5yx6BWlEVcY' },
    ],
  },
];
