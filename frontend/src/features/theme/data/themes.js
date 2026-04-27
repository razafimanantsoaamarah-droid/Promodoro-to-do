import { Moon, Cpu, Leaf, Circle, Sparkles } from 'lucide-react';

import defaultImg from '../../../assets/themes/default.png';
import cyberpunkImg from '../../../assets/themes/cyberpunk.png';
import natureImg from '../../../assets/themes/nature.png';
import galaxyImg from '../../../assets/themes/galaxy.png';
import minimalImg from '../../../assets/themes/minimal.png';

export const themes = [
  {
    id: 'default',
    name: 'RMY Dark',
    icon: Moon,
    image: defaultImg,
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    icon: Cpu,
    image: cyberpunkImg,
  },
  {
    id: 'nature',
    name: 'Nature',
    icon: Leaf,
    image: natureImg,
  },
  {
    id: 'minimal',
    name: 'Minimal',
    icon: Circle,
    image: minimalImg,
  },
  {
    id: 'galaxy',
    name: 'Galaxy',
    icon: Sparkles,
    image: galaxyImg,
  },
];