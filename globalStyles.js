import { StyleSheet } from 'react-native';
import { useThemeContext } from '@/contexts/ThemeContext';

export function useGlobalStyles() {
  const { theme } = useThemeContext();
  const isDark = theme === 'dark';

  const colors = {
    background: isDark ? '#1E1E1E' : '#FFFFFF',              // Huvudbakgrund svart/vit
    primaryText: isDark ? '#E6E6E6' : '#5D3E17',              // Brun text
    secondaryText: isDark ? '#B0A49A' : '#967F71',            // Mjuk brungrå text
    cardBackground: isDark ? '#2C2C2C' : '#FFFFFF',           // Kort = vit i ljusläge
    buttonBackground: isDark ? '#3A302B' : '#5D3E17',         // Alltid brun knapp
    buttonText: isDark ? '#FFFFFF' : '#FFFFFF',              // Vit text på knappar
    border: isDark ? '#E6E6E6' : '#5D3E17',                   // Brun border
    philosophyBackground: isDark ? '#3A302B' : '#DAC9B9',         // Bakgrund för filosofi
    philosophyBorder: isDark ? '#E6E6E6' : '#5D3E17',         // Border för filosofi
    cardShadow: isDark ? '#000000' : '#E6E6E6',               // Skugga för kort
  };


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 20,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.primaryText,
      fontFamily: 'LatoBold',
      marginBottom: 20,
      textAlign: 'center',
    },
    text: {
      fontSize: 16,
      color: colors.primaryText,
      fontFamily: 'Lato',
    },
    card: {
      backgroundColor: colors.cardBackground,
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
    },
    cardTitle: {
      fontWeight: 'bold',
      fontSize: 16,
      color: colors.primaryText,
      fontFamily: 'Lato',
    },
    cardText: {
      color: colors.primaryText,
      fontFamily: 'Lato',
    },
    buttonPrimary: {
      backgroundColor: colors.buttonBackground,
      padding: 12,
      borderRadius: 8,
    },
    buttonText: {
      color: colors.buttonText,
      fontFamily: 'Lato',
      textAlign: 'center',
    }
  });

  return { styles, colors, theme };
}
