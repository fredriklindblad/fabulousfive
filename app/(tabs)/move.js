import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { getMove } from '@/services/firebase';
import MoveItem from '@/components/MoveItem';
import { useTranslation } from 'react-i18next';
import { useGlobalStyles } from '@/globalStyles';
import PhilosophyBox from '@/components/PhilosophyBox';

export default function MoveScreen() {
  const [move, setMove] = useState([]);
  const { t } = useTranslation();
  const { styles, colors } = useGlobalStyles();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMove();
        console.log('✅ Move data:', data);
        setMove(data);
      } catch (err) {
        console.error('❌ Move error:', err);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <PhilosophyBox
        title="Vår filosofi"
        text="Vi tror på stillhet som ett sätt att återknyta till oss själva. Genom meditation, reflektion och närvaro kan vi skapa balans och lugn i vardagen."
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[local.container, { minHeight: Dimensions.get('window').height }]}
      >
        <Text style={[local.title, { color: colors.primaryText }]}>
          {t('daily_inspiration', 'Dagens inspiration')}
        </Text>

        {move.length > 0 ? (
          move.map((item) => (
            <MoveItem
              key={item.id}
              title={item.title}
              description={item.description}
            />
          ))
        ) : (
          <Text style={[styles.text, { marginTop: 12 }]}>
            {t('no_move_items', 'Inget att visa ännu.')}
          </Text>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const local = StyleSheet.create({
  container: {
    paddingTop: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Lato',
    marginBottom: 16,
  },
});
