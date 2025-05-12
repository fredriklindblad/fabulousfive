// globalStyles.js
import { StyleSheet } from 'react-native';

export const GlobalColors = {
  background: '#DAC9B9',
  primaryText: '#5D3E17',
  secondaryText: '#967F71',
  cardBackground: '#F1DFDF',
  buttonBackground: '#F1DFDF',
  buttonText: '#5D3E17',
};

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalColors.background,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: GlobalColors.primaryText,
    fontFamily: 'Lato',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: GlobalColors.primaryText,
    fontFamily: 'Lato',
  },
  card: {
    backgroundColor: GlobalColors.cardBackground,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: GlobalColors.primaryText,
    fontFamily: 'Lato',
  },
  cardText: {
    color: GlobalColors.primaryText,
    fontFamily: 'Lato',
  },
  buttonPrimary: {
    backgroundColor: GlobalColors.buttonBackground,
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: GlobalColors.buttonText,
    fontFamily: 'Lato',
    textAlign: 'center',
  }
});
