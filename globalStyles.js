import { StyleSheet } from 'react-native';
import { useThemeContext } from '@/ThemeContext';

export function useGlobalStyles() {
  const { theme } = useThemeContext();
  const isDark = theme === 'dark';

  const colors = {
    background: isDark ? '#1E1E1E' : '#F9F8F6',
    primaryText: isDark ? '#DAC9B9' : '#5D3E17',
    secondaryText: isDark ? '#C2B0A0' : '#967F71',
    cardBackground: isDark ? '#2C2C2C' : '#F1DFDF',
    buttonBackground: isDark ? '#3A302B' : '#F1DFDF',
    buttonText: isDark ? '#F1DFDF' : '#5D3E17',
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
      fontFamily: 'Lato',
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
