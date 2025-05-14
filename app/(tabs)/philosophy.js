import { View, Text, StyleSheet } from 'react-native';
import { useGlobalStyles } from '@/globalStyles';
import { useTranslation } from 'react-i18next';

export default function PhilosophyScreen() {
  const { styles, colors } = useGlobalStyles();
  const { t } = useTranslation();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.primaryText }]}>
        {t('philosophy', 'Vår filosofi')}
      </Text>
      <Text style={[styles.text, { color: colors.primaryText }]}>
        Fabulous Five är skapat med kärlek för att inspirera till mer glädje, stillhet och energi i vardagen.
      </Text>
    </View>
  );
}
