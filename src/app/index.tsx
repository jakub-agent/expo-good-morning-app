import { useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BalanceChart } from '../components/BalanceChart';
import { SPENDING, TRANSACTIONS } from '../data/mock';

export default function OverviewScreen() {
  const router = useRouter();
  const { category } = useLocalSearchParams<{ category?: string }>();
  const recent = TRANSACTIONS.slice(0, 6);

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'right']}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerBlock}>
            <Text style={styles.greeting}>Good morning,</Text>
            <Text style={styles.greeting}>
              Emma <Text style={styles.wave}>👋</Text>
            </Text>
            <Text style={styles.subgreeting}>Here's your overview</Text>
          </View>

          <LinearGradient
            colors={['#0F2A2E', '#0B1F22']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroCard}
          >
            <View style={styles.heroTopRow}>
              <Text style={styles.heroLabel}>Total balance</Text>
              <Text style={styles.heroEye}>👁</Text>
            </View>

            <View style={styles.heroAmountRow}>
              <Text style={styles.heroAmount}>$12,540.50</Text>
              <View style={styles.heroPill}>
                <Text style={styles.heroPillText}>+8.2%</Text>
              </View>
            </View>

            <Text style={styles.heroFooter}>from last month</Text>

            <View style={styles.chartWrap}>
              <BalanceChart />
            </View>

            <View style={styles.heroActions}>
              <Pressable style={styles.heroAction}>
                <Text style={styles.heroActionIcon}>＋</Text>
                <Text style={styles.heroActionText}>Add money</Text>
              </Pressable>
              <Pressable style={styles.heroAction}>
                <Text style={styles.heroActionIcon}>↗</Text>
                <Text style={styles.heroActionText}>Send</Text>
              </Pressable>
            </View>
          </LinearGradient>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Spending by category</Text>
              <Text style={styles.sectionLink}>This month</Text>
            </View>

            <View style={styles.cardBlock}>
              {SPENDING.map((cat, i) => {
                const active = category === cat.slug;
                return (
                  <Pressable
                    key={cat.slug}
                    onPress={() =>
                      router.setParams({ category: active ? '' : cat.slug })
                    }
                    style={StyleSheet.flatten([
                      styles.spendRow,
                      i < SPENDING.length - 1 && styles.spendRowDivider,
                      active && styles.spendRowActive,
                    ])}
                  >
                    <View style={styles.spendTopRow}>
                      <Text
                        style={[
                          styles.spendLabel,
                          active && styles.spendLabelActive,
                        ]}
                      >
                        {cat.label}
                      </Text>
                      <Text
                        style={[
                          styles.spendAmount,
                          active && styles.spendLabelActive,
                        ]}
                      >
                        {cat.amount}
                      </Text>
                    </View>
                    <View style={styles.barTrack}>
                      <View
                        style={[
                          styles.barFill,
                          {
                            width: `${cat.pct * 100}%`,
                            backgroundColor: cat.color,
                          },
                        ]}
                      />
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent transactions</Text>
              <Text style={styles.sectionLink}>See all</Text>
            </View>

            {recent.map((tx) => (
              <View key={tx.id} style={styles.rowCard}>
                <View style={[styles.rowIcon, { backgroundColor: tx.color }]}>
                  <Text style={styles.rowEmoji}>{tx.emoji}</Text>
                </View>
                <View style={styles.rowLines}>
                  <Text style={styles.rowTitle}>{tx.name}</Text>
                  <Text style={styles.rowSubtitle}>{tx.when}</Text>
                </View>
                <Text
                  style={[
                    styles.rowAmount,
                    { color: tx.positive ? '#10B981' : '#0F172A' },
                  ]}
                >
                  {tx.amount}
                </Text>
              </View>
            ))}
          </View>
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
    gap: 20,
  },
  headerBlock: {
    gap: 2,
  },
  greeting: {
    fontSize: 30,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.6,
    lineHeight: 36,
  },
  wave: {
    fontSize: 26,
  },
  subgreeting: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 6,
    fontWeight: '500',
  },
  heroCard: {
    borderRadius: 24,
    padding: 20,
    gap: 6,
    shadowColor: '#0F2A2E',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 8,
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
    fontWeight: '500',
  },
  heroEye: {
    fontSize: 14,
    opacity: 0.7,
  },
  heroAmountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
  },
  heroAmount: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.8,
  },
  heroPill: {
    backgroundColor: 'rgba(74, 222, 128, 0.18)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  heroPillText: {
    color: '#4ADE80',
    fontSize: 12,
    fontWeight: '700',
  },
  heroFooter: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 12,
    marginTop: -2,
  },
  chartWrap: {
    marginTop: 6,
    marginHorizontal: -6,
  },
  heroActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  heroAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  heroActionIcon: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  heroActionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    gap: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  sectionLink: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  rowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
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
  rowTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  rowSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  rowAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  cardBlock: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  spendRow: {
    paddingVertical: 12,
    paddingHorizontal: 6,
    marginHorizontal: -6,
    gap: 8,
    borderRadius: 10,
  },
  spendRowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E2E8F0',
  },
  spendRowActive: {
    backgroundColor: '#F1F5F9',
    borderBottomColor: 'transparent',
  },
  spendLabelActive: {
    color: '#0F172A',
  },
  spendTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  spendLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  spendAmount: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  barTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F1F5F9',
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
  },
});
