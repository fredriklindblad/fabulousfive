// app/(tabs)/feed.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { getFeed } from '@/services/firebase';
import FeedItem from '@/components/FeedItem';
import { useTranslation } from 'react-i18next';
import { GlobalStyles } from '@/globalStyles';

console.log('📥 Rendering FeedScreen');

export default function FeedScreen() {
  const [feed, setFeed] = useState([]);
  const { t } = useTranslation();

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
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.header}>{t('daily_inspiration', 'Dagens inspiration')}</Text>
      <FlatList
        data={feed}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FeedItem title={item.title} description={item.description} />
        )}
        ListEmptyComponent={
          <Text style={GlobalStyles.text}>{t('no_feed_items', 'Inget att visa ännu.')}</Text>
        }
      />
    </View>
  );
}
