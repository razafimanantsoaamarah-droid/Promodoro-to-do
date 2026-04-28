import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Music, Play, Pause, SkipForward, Volume2, VolumeX, Plus, Trash2, Search, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '../../../components/shared/ui/Button';
import { useLocalStorage } from '../../../hooks/useLocalStorage';

const PIXABAY_KEY = import.meta.env.VITE_PIXABAY_API_KEY || '';

const defaultTracks = [
  { id: '1', title: 'Lo-Fi Chill', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: '2', title: 'Piano Doux', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: '3', title: 'Ambiance', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
];

export const MusicPlayer = () => {
  const [tracks, setTracks] = useLocalStorage('rmy-music-playlist', defaultTracks);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume] = useState(0.5);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [showPlayer, setShowPlayer] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [audioError, setAudioError] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const audioRef = useRef(null);
  const searchTimeout = useRef(null);
  const initRef = useRef(false);

  const current = tracks[currentTrack] || {};

  // Initialisation unique de l'élément audio
  useEffect(() => {
    if (!initRef.current) {
      initRef.current = true;
      const audio = new Audio();
      audio.volume = volume;
      audio.loop = false;
      audio.preload = 'auto';
      
      audio.addEventListener('ended', () => {
        setCurrentTrack(prev => (prev + 1) % tracks.length);
        setIsPlaying(true);
      });
      
      audio.addEventListener('error', () => {
        setAudioError(true);
        setIsPlaying(false);
      });
      
      audio.addEventListener('playing', () => {
        setAudioError(false);
      });
      
      audioRef.current = audio;
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  // Changement de piste
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !tracks[currentTrack]) return;
    
    setAudioError(false);
    audio.src = tracks[currentTrack].url;
    audio.load();
    
    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          setIsPlaying(false);
          setAudioError(true);
        });
      }
    }
  }, [currentTrack]);

  // Play/Pause
  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !audio.src || audio.src === window.location.href) return;
    
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            setAudioError(true);
            setIsPlaying(false);
          });
      }
    }
  }, [isPlaying]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const nextTrack = () => {
    setCurrentTrack(prev => (prev + 1) % tracks.length);
    setIsPlaying(true);
  };

  const selectTrack = (idx) => {
    setCurrentTrack(idx);
    setTimeout(() => {
      setIsPlaying(true);
    }, 100);
  };

  const addTrack = (e) => {
    e.preventDefault();
    if (!newUrl.trim()) return;
    setTracks(prev => [...prev, {
      id: Date.now().toString(),
      title: newTitle.trim() || 'Piste sans titre',
      url: newUrl.trim(),
    }]);
    setNewUrl('');
    setNewTitle('');
    setShowAddForm(false);
  };

  const addFromSearch = (track) => {
    if (tracks.some(t => t.url === track.url)) return;
    setTracks(prev => [...prev, track]);
    setShowSearch(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const removeTrack = (index, e) => {
    e.stopPropagation();
    const newTracks = tracks.filter((_, i) => i !== index);
    setTracks(newTracks);
    if (currentTrack >= newTracks.length) setCurrentTrack(0);
    if (newTracks.length === 0) {
      setIsPlaying(false);
      if (audioRef.current) audioRef.current.pause();
    }
  };

  const searchMusic = useCallback(async (query) => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    try {
      if (PIXABAY_KEY) {
        const response = await fetch(
          `https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${encodeURIComponent(query)}&category=music&per_page=15`
        );
        const data = await response.json();

        const results = data.hits
          .filter(hit => hit.previewURL)
          .map(hit => ({
            id: `pixabay-${hit.id}`,
            title: hit.tags ? hit.tags.split(',')[0].trim() : 'Piste audio',
            url: hit.previewURL,
            author: hit.user,
            duration: hit.duration,
          }));

        setSearchResults(results);
      } else {
        const filtered = defaultTracks.filter(t =>
          t.title.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filtered.map(t => ({
          ...t,
          author: 'SoundHelix',
          duration: 180,
        })));
      }
    } catch (err) {
      console.error('Erreur recherche:', err);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      if (value.trim().length >= 2) {
        searchMusic(value);
      } else {
        setSearchResults([]);
      }
    }, 500);
  };

  const formatDuration = (seconds) => {
    if (!seconds) return '--:--';
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative">
      <Button
        variant="glass"
        onClick={() => setShowPlayer(!showPlayer)}
        className="p-2 rounded-full"
        icon={
          <div className="relative">
            <Music size={18} className={isPlaying ? 'text-[var(--accent)] animate-pulse' : 'text-slate-400'} />
            {isPlaying && <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[var(--accent)] rounded-full" />}
          </div>
        }
      />

      {showPlayer && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl z-50 flex flex-col" style={{ maxHeight: '36rem' }}>
          <div className="flex items-center justify-between p-4 pb-2 shrink-0">
            <span className="text-xs font-black uppercase tracking-wider text-white">Focus Music</span>
            <button onClick={() => setShowPlayer(false)} className="text-slate-400 hover:text-white text-xs font-bold">✕</button>
          </div>

          {tracks.length > 0 && (
            <div className="px-4 pb-3 shrink-0">
              <div className="bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-3">
                <p className="text-[10px] font-bold uppercase text-[var(--accent)] mb-0.5">En cours</p>
                <p className="text-xs text-white font-medium truncate mb-2">{current.title}</p>
                
                {audioError && (
                  <div className="flex items-center gap-2 text-amber-400 text-[10px] mb-2 bg-amber-500/10 p-2 rounded-lg">
                    <AlertCircle size={12} />
                    <span>Impossible de lire cette piste. Essayez-en une autre.</span>
                  </div>
                )}

                <div className="flex items-center justify-center gap-4">
                  <button onClick={toggleMute} className="text-slate-400 hover:text-white">
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                  <button 
                    onClick={togglePlay} 
                    className="w-12 h-12 rounded-full bg-[var(--accent)] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition"
                  >
                    {isPlaying ? <Pause size={22} fill="white" /> : <Play size={22} fill="white" className="ml-0.5" />}
                  </button>
                  <button onClick={nextTrack} className="text-slate-400 hover:text-white">
                    <SkipForward size={18} />
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="px-4 pb-2 shrink-0">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Rechercher (lo-fi, jazz, piano...)"
                value={searchQuery}
                onChange={handleSearchInput}
                onFocus={() => setShowSearch(true)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs outline-none focus:border-[var(--accent)] placeholder:text-slate-500"
              />
              {isSearching && <Loader2 size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--accent)] animate-spin" />}
            </div>
          </div>

          {showSearch && searchResults.length > 0 && (
            <div className="px-4 mb-2">
              <p className="text-[10px] font-bold uppercase text-[var(--accent)] mb-2">Résultats ({searchResults.length})</p>
              <div className="max-h-32 overflow-y-auto space-y-1 custom-scrollbar">
                {searchResults.map(track => (
                  <div
                    key={track.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition group cursor-pointer"
                    onClick={() => addFromSearch(track)}
                  >
                    <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/20 flex items-center justify-center shrink-0">
                      <Music size={14} className="text-[var(--accent)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-white truncate">{track.title}</p>
                      <p className="text-[10px] text-slate-500">{track.author} • {formatDuration(track.duration)}</p>
                    </div>
                    <Plus size={14} className="text-[var(--accent)] opacity-0 group-hover:opacity-100 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="px-4 flex-1 min-h-0">
            <p className="text-[10px] font-bold uppercase text-[var(--text-muted)] mb-2">Playlist ({tracks.length})</p>
            <div className="overflow-y-auto max-h-36 custom-scrollbar space-y-1 pr-1">
              {tracks.map((track, idx) => (
                <div
                  key={track.id || idx}
                  onClick={() => selectTrack(idx)}
                  className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition ${
                    idx === currentTrack ? 'bg-[var(--accent)]/20 border border-[var(--accent)]/30' : 'hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <span className={`text-xs truncate flex-1 ${idx === currentTrack ? 'text-white font-bold' : 'text-slate-400'}`}>{track.title}</span>
                  {idx === currentTrack && isPlaying && (
                    <span className="flex items-center gap-0.5 mr-1">
                      <span className="w-0.5 h-3 bg-[var(--accent)] rounded-full animate-pulse" />
                      <span className="w-0.5 h-3 bg-[var(--accent)] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                      <span className="w-0.5 h-3 bg-[var(--accent)] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                    </span>
                  )}
                  <button onClick={(e) => removeTrack(idx, e)} className="p-1 text-slate-500 hover:text-rose-400 shrink-0"><Trash2 size={12} /></button>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 pt-3 border-t border-white/5 shrink-0">
            <button onClick={() => setShowAddForm(!showAddForm)} className="w-full py-2 text-xs text-slate-400 hover:text-white transition flex items-center justify-center gap-2">
              <Plus size={14} /> {showAddForm ? 'Fermer' : 'Ajouter URL manuellement'}
            </button>
            {showAddForm && (
              <form onSubmit={addTrack} className="space-y-2 mt-2">
                <input placeholder="Titre" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs outline-none" />
                <input placeholder="URL du fichier MP3" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs outline-none" />
                <Button type="submit" variant="primary" className="w-full py-1.5 text-xs font-bold">Ajouter</Button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};