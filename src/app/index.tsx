import { LinearGradient } from 'expo-linear-gradient';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Defs, LinearGradient as SvgLinearGradient, Path, Stop } from 'react-native-svg';

const ACCOUNTS = [
  {
    name: 'Primary account',
    last4: '1234',
    balance: '$7,420.20',
    color: '#2A2A33',
    emoji: '💳',
  },
  {
    name: 'Savings account',
    last4: '5678',
    balance: '$5,120.30',
    color: '#7C3AED',
    emoji: '🏦',
  },
];

const TRANSACTIONS = [
  {
    name: 'Coffee House',
    when: 'Today, 8:30 AM',
    amount: '-$4.50',
    positive: false,
    color: '#FFE4D6',
    emoji: '☕',
  },
  {
    name: 'Salary',
    when: 'Yesterday',
    amount: '+$3,200.00',
    positive: true,
    color: '#DCFCE7',
    emoji: '💰',
  },
  {
    name: 'Grocery Store',
    when: '2 days ago',
    amount: '-$82.40',
    positive: false,
    color: '#FEF3C7',
    emoji: '🛒',
  },
];

function BalanceChart() {
  return (
    <Svg width="100%" height="80" viewBox="0 0 320 80" preserveAspectRatio="none">
      <Defs>
        <SvgLinearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#4ADE80" stopOpacity="0.35" />
          <Stop offset="1" stopColor="#4ADE80" stopOpacity="0" />
        </SvgLinearGradient>
      </Defs>
      <Path
        d="M0,55 C30,50 50,30 80,32 C110,34 130,55 160,52 C190,49 210,28 240,22 C270,16 295,28 320,18 L320,80 L0,80 Z"
        fill="url(#fill)"
      />
      <Path
        d="M0,55 C30,50 50,30 80,32 C110,34 130,55 160,52 C190,49 210,28 240,22 C270,16 295,28 320,18"
        stroke="#4ADE80"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default function HomeScreen() {
  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.topBar}>
            <Pressable style={styles.iconButton}>
              <Text style={styles.menuIcon}>≡</Text>
            </Pressable>
            <View style={styles.topBarRight}>
              <Pressable style={styles.iconButton}>
                <Text style={styles.bellIcon}>🔔</Text>
                <View style={styles.notifDot} />
              </Pressable>
              <View style={styles.avatar}>
                <Text style={styles.avatarEmoji}>👩🏻</Text>
              </View>
            </View>
          </View>

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
              <Text style={styles.sectionTitle}>Accounts</Text>
              <Text style={styles.sectionLink}>See all</Text>
            </View>

            {ACCOUNTS.map((account) => (
              <View key={account.name} style={styles.rowCard}>
                <View
                  style={[styles.rowIcon, { backgroundColor: account.color }]}
                >
                  <Text style={styles.rowEmoji}>{account.emoji}</Text>
                </View>
                <View style={styles.rowLines}>
                  <Text style={styles.rowTitle}>{account.name}</Text>
                  <Text style={styles.rowSubtitle}>· {account.last4}</Text>
                </View>
                <Text style={styles.rowAmount}>{account.balance}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent transactions</Text>
              <Text style={styles.sectionLink}>See all</Text>
            </View>

            {TRANSACTIONS.map((tx) => (
              <View key={tx.name} style={styles.rowCard}>
                <View
                  style={[styles.rowIcon, { backgroundColor: tx.color }]}
                >
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
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIcon: {
    fontSize: 26,
    color: '#0F172A',
    fontWeight: '300',
  },
  bellIcon: {
    fontSize: 20,
  },
  notifDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 1.5,
    borderColor: '#F6F7FB',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFE0F0',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarEmoji: {
    fontSize: 26,
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
});
