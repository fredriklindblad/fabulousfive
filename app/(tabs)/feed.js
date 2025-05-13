import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getFeed } from '@/services/firebase';
import FeedItem from '@/components/FeedItem';
import { useTranslation } from 'react-i18next';
import { useGlobalStyles } from '@/globalStyles'; // ⬅️ ny

console.log('📥 Rendering FeedScreen');

export default function FeedScreen() {
  const [feed, setFeed] = useState([]);
  const { t } = useTranslation();
  const { styles, colors } = useGlobalStyles(); // ⬅️ hook

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFeed();
        console.log('✅ Feed data:', data);
        setFeed(data);
      } catch (err) {
        console.error('❌ Feed error:', err);
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
        data={feed}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <Text style={[styles.header, { marginBottom: 16 }]}>
            {t('daily_inspiration', 'Dagens inspiration')}
          </Text>
        }
        renderItem={({ item }) => (
          <FeedItem title={item.title} description={item.description} />
        )}
        ListEmptyComponent={
          <Text style={styles.text}>
            {t('no_feed_items', 'Inget att visa ännu.')}
          </Text>
        }
      />
    </View>
  );
}
