import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BILLS } from '../data/mock';

export default function BillsScreen() {
  const total = BILLS.reduce((acc, b) => {
    const num = parseFloat(b.amount.replace(/[$,]/g, ''));
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
            <Text style={styles.crumb}>This month</Text>
            <Text style={styles.title}>Upcoming bills</Text>
            <Text style={styles.subtitle}>
              {BILLS.length} bills · ${total.toFixed(2)} total
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <View style={styles.summaryCol}>
              <Text style={styles.summaryLabel}>Due this week</Text>
              <Text style={styles.summaryValue}>$1,284.30</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryCol}>
              <Text style={styles.summaryLabel}>Autopay</Text>
              <Text style={styles.summaryValue}>
                {BILLS.filter((b) => b.autopay).length}/{BILLS.length}
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>All bills</Text>
            {BILLS.map((bill) => (
              <View key={bill.id} style={styles.rowCard}>
                <View style={[styles.rowIcon, { backgroundColor: bill.color }]}>
                  <Text style={styles.rowEmoji}>{bill.emoji}</Text>
                </View>
                <View style={styles.rowLines}>
                  <Text style={styles.rowTitle}>{bill.name}</Text>
                  <Text style={styles.rowSubtitle}>{bill.when}</Text>
                </View>
                <View style={styles.rowRight}>
                  <Text style={styles.rowAmount}>{bill.amount}</Text>
                  {bill.autopay && (
                    <View style={styles.autopayBadge}>
                      <Text style={styles.autopayText}>Auto</Text>
                    </View>
                  )}
                </View>
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
  summaryCard: {
    backgroundColor: '#0F172A',
    borderRadius: 18,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryCol: {
    flex: 1,
    gap: 4,
  },
  summaryDivider: {
    width: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  summaryLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.4,
  },
  section: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.2,
    paddingHorizontal: 2,
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
  rowRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  rowAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  autopayBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  autopayText: {
    color: '#15803D',
    fontSize: 10,
    fontWeight: '700',
  },
});
