// globalStyles.js
import { StyleSheet } from 'react-native';

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DAC9B9',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#967F71',
    fontFamily: 'Lato',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: '#967F71',
    fontFamily: 'Lato',
  },
  card: {
    backgroundColor: '#F1DFDF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#967F71',
    fontFamily: 'Lato',
  },
  cardText: {
    color: '#967F71',
    fontFamily: 'Lato',
  }
});
