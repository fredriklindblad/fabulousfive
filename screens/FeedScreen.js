// Skärm för att visa feed
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getFeed } from '../services/firebase';
import FeedItem from '../components/FeedItem';
import { useTranslation } from 'react-i18next';
import { GlobalStyles } from '../globalStyles';

export default function FeedScreen() {
  const [feed, setFeed] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    getFeed().then(setFeed).catch((err) => console.log("Feed error:", err));
  }, []);

  return (
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.header}>{t('daily_inspiration')}</Text>
      <FlatList
        data={feed}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FeedItem title={item.title} description={item.description} />
        )}
        ListEmptyComponent={
          <Text style={GlobalStyles.text}>{t('no_feed_items') || 'Inget att visa ännu.'}</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DAC9B9', // fallback bakgrund om GlobalStyles saknas
  },
  header: {
    color: '#DBBEC0', // färg på rubriken om GlobalStyles inte laddar
  },
});
