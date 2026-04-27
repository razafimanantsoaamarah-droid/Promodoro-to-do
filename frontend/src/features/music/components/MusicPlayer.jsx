import React, { useState } from 'react';
import { Music, SkipForward, ExternalLink, ChevronLeft } from 'lucide-react';
import { Button } from '../../../shared/ui/Button';
import { playlists } from '../data/playlists';
import { useTheme } from '../../theme/hooks/useTheme';

export const MusicPlayer = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(0);

  const current = selectedPlaylist?.tracks[currentTrack];

  return (
    <div className="relative">
      <Button
        variant="glass"
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 rounded-full"
        icon={<Music size={20} className={selectedPlaylist ? `text-${theme.accent}-400` : 'text-slate-400'} />}
      />

      {isOpen && (
        <div className={`absolute bottom-full right-0 mb-4 w-72 ${theme.background} backdrop-blur-2xl border ${theme.border} rounded-2xl p-5 shadow-2xl transition-all duration-500`}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-black uppercase tracking-widest text-white">Musique</span>
            <div className={`h-1.5 w-1.5 rounded-full bg-${theme.accent}-500 animate-pulse`} />
          </div>

          {!selectedPlaylist ? (
            <div className="space-y-1">
              {playlists.map(p => {
                const Icon = p.icon; 
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPlaylist(p)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:${theme.cardBg} text-left transition-all group`}
                  >
                    <div className="text-slate-500 group-hover:text-white transition-colors">
                      <Icon size={18} />
                    </div>
                    <span className="text-sm text-slate-300 group-hover:text-white font-medium">{p.name}</span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="space-y-3">
              <button 
                onClick={() => { setSelectedPlaylist(null); setCurrentTrack(0); }} 
                className="flex items-center gap-1 text-[10px] uppercase font-bold text-slate-500 hover:text-white transition-colors"
              >
                <ChevronLeft size={12} /> Retour
              </button>
              
              <div className={`${theme.cardBg} p-3 rounded-xl border ${theme.border}`}>
                <div className="flex items-center gap-2 mb-2">
                  {React.createElement(selectedPlaylist.icon, { size: 14, className: `text-${theme.accent}-400` })}
                  <p className={`text-[10px] font-black uppercase tracking-widest text-${theme.accent}-400`}>
                    {selectedPlaylist.name}
                  </p>
                </div>
                
                {current && (
                  <>
                    <p className="text-sm text-white font-bold truncate mb-3">{current.title}</p>
                    <div className="flex gap-2">
                      <Button 
                        variant="primary" 
                        className="flex-1 py-2 text-[10px] font-bold"
                        onClick={() => window.open(current.url, '_blank')} 
                        icon={<ExternalLink size={14} />}
                      >
                        LECTURE
                      </Button>
                      <Button 
                        variant="glass" 
                        className="p-2"
                        onClick={() => setCurrentTrack(prev => (prev + 1) % selectedPlaylist.tracks.length)}
                        icon={<SkipForward size={14} />} 
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
