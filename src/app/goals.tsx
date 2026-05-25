import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GOALS } from '../data/mock';

export default function GoalsScreen() {
  const totalSaved = GOALS.reduce((acc, g) => {
    const num = parseFloat(g.saved.replace(/[$,]/g, ''));
    return acc + (isFinite(num) ? num : 0);
  }, 0);

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'right']}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerBlock}>
            <Text style={styles.crumb}>Plan ahead</Text>
            <Text style={styles.title}>Savings goals</Text>
            <Text style={styles.subtitle}>
              {GOALS.length} active · ${totalSaved.toLocaleString()} saved
            </Text>
          </View>

          <Pressable style={styles.addGoal}>
            <Text style={styles.addGoalIcon}>＋</Text>
            <Text style={styles.addGoalText}>New goal</Text>
          </Pressable>

          {GOALS.map((goal) => (
            <View key={goal.id} style={styles.goalCard}>
              <View style={styles.goalTopRow}>
                <View
                  style={[
                    styles.rowIcon,
                    { backgroundColor: 'rgba(255,255,255,0.18)' },
                  ]}
                >
                  <Text style={styles.rowEmoji}>{goal.emoji}</Text>
                </View>
                <View style={styles.rowLines}>
                  <Text style={styles.goalTitle}>{goal.name}</Text>
                  <Text style={styles.goalSubtitle}>
                    {goal.saved} of {goal.target}
                  </Text>
                </View>
                <Text style={styles.goalPct}>
                  {Math.round(goal.pct * 100)}%
                </Text>
              </View>
              <View style={styles.goalTrack}>
                <View
                  style={[
                    styles.goalFill,
                    {
                      width: `${goal.pct * 100}%`,
                      backgroundColor: goal.color,
                    },
                  ]}
                />
              </View>
              <View style={styles.goalFooter}>
                <Pressable style={styles.goalAction}>
                  <Text style={styles.goalActionText}>Add funds</Text>
                </Pressable>
                <Pressable style={styles.goalAction}>
                  <Text style={styles.goalActionText}>Edit</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F6F7FB',
  },
  safeArea: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 32,
    gap: 16,
  },
  headerBlock: {
    gap: 4,
  },
  crumb: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.6,
  },
  subtitle: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 2,
  },
  addGoal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 18,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#CBD5E1',
  },
  addGoalIcon: {
    fontSize: 18,
    fontWeight: '700',
    color: '#475569',
  },
  addGoalText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
  },
  goalCard: {
    backgroundColor: '#0F172A',
    borderRadius: 18,
    padding: 16,
    gap: 12,
  },
  goalTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowEmoji: {
    fontSize: 18,
  },
  rowLines: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  goalSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 2,
  },
  goalPct: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  goalTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.12)',
    overflow: 'hidden',
  },
  goalFill: {
    height: '100%',
    borderRadius: 3,
  },
  goalFooter: {
    flexDirection: 'row',
    gap: 8,
  },
  goalAction: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
  },
  goalActionText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
});
