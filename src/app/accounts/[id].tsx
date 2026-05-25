import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BalanceChart } from '../../components/BalanceChart';
import { getAccount, transactionsForAccount, type AccountId } from '../../data/mock';

export default function AccountDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const account = getAccount(id);

  if (!account) {
    return (
      <View style={styles.root}>
        <SafeAreaView style={styles.safeArea} edges={['top', 'right']}>
          <Text style={styles.notFound}>Account not found</Text>
        </SafeAreaView>
      </View>
    );
  }

  const transactions = transactionsForAccount(account.id as AccountId);
  const isPrimary = account.id === 'primary';

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'right']}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerBlock}>
            <Text style={styles.crumb}>Accounts</Text>
            <Text style={styles.title}>{account.name}</Text>
            <Text style={styles.subtitle}>•••• {account.last4} · {account.iban}</Text>
          </View>

          <LinearGradient
            colors={isPrimary ? ['#0F2A2E', '#0B1F22'] : ['#4C1D95', '#2E1065']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroCard}
          >
            <View style={styles.heroTopRow}>
              <Text style={styles.heroLabel}>Available balance</Text>
              <Text style={styles.heroEye}>👁</Text>
            </View>

            <View style={styles.heroAmountRow}>
              <Text style={styles.heroAmount}>{account.balance}</Text>
              <View style={styles.heroPill}>
                <Text style={styles.heroPillText}>+2.1%</Text>
              </View>
            </View>

            <Text style={styles.heroFooter}>vs. last month</Text>

            <View style={styles.chartWrap}>
              <BalanceChart stroke={isPrimary ? '#4ADE80' : '#F472B6'} fillStart={isPrimary ? '#4ADE80' : '#F472B6'} />
            </View>

            <View style={styles.heroActions}>
              <Pressable style={styles.heroAction}>
                <Text style={styles.heroActionIcon}>↗</Text>
                <Text style={styles.heroActionText}>Transfer</Text>
              </Pressable>
              <Pressable style={styles.heroAction}>
                <Text style={styles.heroActionIcon}>＋</Text>
                <Text style={styles.heroActionText}>Top up</Text>
              </Pressable>
              <Pressable style={styles.heroAction}>
                <Text style={styles.heroActionIcon}>📄</Text>
                <Text style={styles.heroActionText}>Statement</Text>
              </Pressable>
            </View>
          </LinearGradient>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Transactions</Text>
              <Text style={styles.sectionLink}>{transactions.length} this month</Text>
            </View>

            {transactions.map((tx) => (
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
  notFound: {
    fontSize: 16,
    color: '#64748B',
    padding: 20,
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
    fontSize: 14,
    fontWeight: '700',
  },
  heroActionText: {
    color: '#FFFFFF',
    fontSize: 13,
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
});
