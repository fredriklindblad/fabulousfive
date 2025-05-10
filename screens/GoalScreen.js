// Skärm för målspårning
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Switch, StyleSheet } from 'react-native';
import { getUserGoals, setUserGoalStatus } from '../services/firebase';
import { getAuth } from 'firebase/auth';
import GoalCard from '../components/GoalCard';
import { useTranslation } from 'react-i18next';

export default function GoalScreen() {
  const [goals, setGoals] = useState([]);
  const { t } = useTranslation();
  const userId = getAuth().currentUser?.uid;

  useEffect(() => {
    if (!userId) return;
    getUserGoals(userId).then(setGoals);
  }, [userId]);

  const toggleGoal = async (goal) => {
    const updated = !goal.completed;
    await setUserGoalStatus(goal.id, updated);
    setGoals((prev) =>
      prev.map((g) => (g.id === goal.id ? { ...g, completed: updated } : g))
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('your_goals')}</Text>
      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GoalCard title={item.title}>
            <Switch value={item.completed} onValueChange={() => toggleGoal(item)} />
          </GoalCard>
        )}
        ListEmptyComponent={<Text>{t('no_goals') || 'Inga mål ännu.'}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 }
});
