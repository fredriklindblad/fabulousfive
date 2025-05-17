import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';
import { getMove } from '@/services/firebase';
import MoveItem from '@/components/MoveItem';
import { useTranslation } from 'react-i18next';
import { useGlobalStyles } from '@/globalStyles';
import PhilosophyCard from '@/components/PhilosophyCard';

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
      {/* 💡 Filosofiruta */}
      <View style={local.philosophyWrapper}>
        <PhilosophyCard
          title="Vår filosofi"
          text="Rörelse är inte bara träning – det är ett sätt att leva, känna, vara."
          image="https://source.unsplash.com/300x300/?movement"
          variant="topRight"
          modalContent="Vi tror på rörelse som ett uttryck för livskraft. Regelbunden fysisk aktivitet stärker både kroppen och sinnet. Det handlar inte om prestation – utan om närvaro och kontakt med kroppen."
        />
      </View>

      <FlatList
        contentContainerStyle={{ padding: 24, paddingBottom: 64 }}
        data={move}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <Text
            style={[
              styles.header,
              {
                marginBottom: 16,
                marginTop: Dimensions.get('window').width * 0.5 + 40, // för att inte krocka med boxen
              },
            ]}
          >
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

const local = StyleSheet.create({
  philosophyWrapper: {
    position: 'absolute',
    top: 24,
    left: 24,
    width: Dimensions.get('window').width * 0.5,
    aspectRatio: 1,
    zIndex: 1,
  },
});
