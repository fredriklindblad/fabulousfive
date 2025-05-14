import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getMove } from '@/services/firebase';
import MoveItem from '@/components/MoveItem';
import { useTranslation } from 'react-i18next';
import { useGlobalStyles } from '@/globalStyles'; // ⬅️ ny

console.log('📥 Rendering MoveScreen');

export default function MoveScreen() {
  const [move, setMove] = useState([]);
  const { t } = useTranslation();
  const { styles, colors } = useGlobalStyles(); // ⬅️ hook

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
      <FlatList
        contentContainerStyle={{
          padding: 24,
          paddingBottom: 64,
        }}
        data={move}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <Text style={[styles.header, { marginBottom: 16 }]}>
            {t('daily_inspiration', 'Dagens inspiration')}
          </Text>
        }
        renderItem={({ item }) => (
          <MoveItem title={item.title} description={item.description} />
        )}
        ListEmptyComponent={
          <Text style={styles.text}>
            {t('no_move_items', 'Inget att visa ännu.')}
          </Text>
        }
      />
    </View>
  );
}
