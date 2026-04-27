import { useLocalStorage } from '../../../hooks/useLocalStorage';
import { themes } from '../data/themes';
import { useEffect, useMemo } from 'react';

export function useTheme() {
  const [themeId, setThemeId] = useLocalStorage('rmy-theme', 'default');
  const [customImages, setCustomImages] = useLocalStorage('rmy-custom-theme-images', {});
  const theme = themes.find(t => t.id === themeId) || themes[0];

  // Applique l'attribut data-theme sur <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeId);
  }, [themeId]);

  // Image actuelle : custom ou défaut — recalculée automatiquement
  const currentImage = useMemo(
    () => customImages[themeId] || theme.image,
    [themeId, customImages, theme.image]
  );

  return { theme, themeId, setThemeId, themes, currentImage, customImages, setCustomImages };
}