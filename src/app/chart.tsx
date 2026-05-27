import Download from '@expo/material-symbols/download.xml';
import Info from '@expo/material-symbols/info.xml';
import Notifications from '@expo/material-symbols/notifications.xml';
import Share from '@expo/material-symbols/share.xml';
import { Link, Stack, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BalanceChart } from '@/components/balance-chart';

const RANGES = ['1D', '1W', '1M', '3M', '6M', '1Y', 'All'] as const;
type Range = (typeof RANGES)[number];

const STATS = [
  {
    label: 'Change',
    value: '+$952.60',
    sub: '+8.2%',
    color: '#10B981',
    bg: '#DCFCE7',
    emoji: '📈',
  },
  {
    label: 'Highest',
    value: '$12,640.20',
    sub: 'May 28',
    color: '#2563EB',
    bg: '#DBEAFE',
    emoji: '🏆',
  },
  {
    label: 'Lowest',
    value: '$11,320.10',
    sub: 'May 14',
    color: '#F97316',
    bg: '#FFEDD5',
    emoji: '🚩',
  },
];

const BREAKDOWN = [
  {
    label: 'Cash accounts',
    amount: '$12,120.50',
    pct: 0.967,
    pctLabel: '96.7% of total',
    color: '#10B981',
    bg: '#DCFCE7',
    emoji: '💵',
  },
  {
    label: 'Savings',
    amount: '$5,120.30',
    pct: 0.408,
    pctLabel: '40.8% of total',
    color: '#7C3AED',
    bg: '#EDE9FE',
    emoji: '📊',
  },
  {
    label: 'Cards credit',
    amount: '$420.00',
    pct: 0.033,
    pctLabel: '3.3% of total',
    color: '#2563EB',
    bg: '#DBEAFE',
    emoji: '💳',
  },
];

const ACTIVITY = [
  {
    label: 'Money in',
    date: 'May 28, 2025',
    amount: '+$650.00',
    positive: true,
    color: '#10B981',
    bg: '#DCFCE7',
    emoji: '↗',
  },
  {
    label: 'Spending',
    date: 'May 24, 2025',
    amount: '-$120.45',
    positive: false,
    color: '#EF4444',
    bg: '#FEE2E2',
    emoji: '↘',
  },
  {
    label: 'Transfer',
    date: 'May 21, 2025',
    amount: '+$300.00',
    positive: true,
    color: '#2563EB',
    bg: '#DBEAFE',
    emoji: '⇄',
  },
];

export default function ChartScreen() {
  const router = useRouter();
  const [range, setRange] = useState<Range>('1M');

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <View style={styles.topBar}>
          <Pressable
            style={styles.closeButton}
            onPress={() => router.back()}
            hitSlop={12}
          >
            <Text style={styles.closeIcon}>✕</Text>
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <Link.AppleZoomTarget>
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
                  <Text style={styles.heroPillText}>↗ 8.2%</Text>
                </View>
              </View>

              <Text style={styles.heroFooter}>from last month</Text>

              <View style={styles.chartWrap}>
                <View style={styles.tooltip}>
                  <Text style={styles.tooltipText}>$12,540.50</Text>
                </View>
                <View style={styles.tooltipLine} />
                <View style={styles.tooltipDot} />
                <BalanceChart height={160} strokeWidth={3} />
              </View>

              <View style={styles.rangeBar}>
                {RANGES.map((r) => {
                  const active = r === range;
                  return (
                    <Pressable
                      key={r}
                      onPress={() => setRange(r)}
                      style={[styles.rangeChip, active && styles.rangeChipActive]}
                    >
                      <Text
                        style={[
                          styles.rangeText,
                          active && styles.rangeTextActive,
                        ]}
                      >
                        {r}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </LinearGradient>
          </Link.AppleZoomTarget>

          <View style={styles.statsRow}>
            {STATS.map((stat) => (
              <View key={stat.label} style={styles.statCard}>
                <View
                  style={[styles.statIcon, { backgroundColor: stat.bg }]}
                >
                  <Text style={styles.statEmoji}>{stat.emoji}</Text>
                </View>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <Text style={[styles.statValue, { color: stat.color }]}>
                  {stat.value}
                </Text>
                <Text style={styles.statSub}>{stat.sub}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Balance breakdown</Text>
              <Text style={styles.sectionLink}>View details ›</Text>
            </View>

            <View style={styles.breakdownRow}>
              {BREAKDOWN.map((item) => (
                <View key={item.label} style={styles.breakdownCard}>
                  <View
                    style={[
                      styles.breakdownIcon,
                      { backgroundColor: item.bg },
                    ]}
                  >
                    <Text style={styles.breakdownEmoji}>{item.emoji}</Text>
                  </View>
                  <Text style={styles.breakdownLabel}>{item.label}</Text>
                  <Text style={styles.breakdownAmount}>{item.amount}</Text>
                  <View style={styles.breakdownTrack}>
                    <View
                      style={[
                        styles.breakdownFill,
                        {
                          width: `${item.pct * 100}%`,
                          backgroundColor: item.color,
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.breakdownPct}>{item.pctLabel}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.banner}>
            <View style={styles.bannerIcon}>
              <Text style={styles.bannerIconText}>📈</Text>
            </View>
            <View style={styles.bannerText}>
              <Text style={styles.bannerTitle}>Great job! 🎉</Text>
              <Text style={styles.bannerBody}>
                Your balance is up{' '}
                <Text style={styles.bannerBold}>$952.60 (8.2%)</Text> this
                month.
              </Text>
            </View>
            <Text style={styles.bannerCheck}>✅</Text>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent balance activity</Text>
              <Text style={styles.sectionLink}>See all ›</Text>
            </View>

            <View style={styles.activityList}>
              {ACTIVITY.map((item) => (
                <View key={item.label} style={styles.activityRow}>
                  <View
                    style={[
                      styles.activityIcon,
                      { backgroundColor: item.bg },
                    ]}
                  >
                    <Text
                      style={[styles.activityEmoji, { color: item.color }]}
                    >
                      {item.emoji}
                    </Text>
                  </View>
                  <View style={styles.activityLines}>
                    <Text style={styles.activityLabel}>{item.label}</Text>
                    <Text style={styles.activityDate}>{item.date}</Text>
                  </View>
                  <Text
                    style={[
                      styles.activityAmount,
                      { color: item.positive ? '#10B981' : '#0F172A' },
                    ]}
                  >
                    {item.amount}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <Stack.Toolbar backgroundColor="#0F2A2E" tintColor="#FFFFFF">
        <Stack.Toolbar.Button accessibilityLabel="Share" onPress={() => {}}>
          <Stack.Toolbar.Icon src={Share} />
          <Stack.Toolbar.Label>Share</Stack.Toolbar.Label>
        </Stack.Toolbar.Button>
        <Stack.Toolbar.Button accessibilityLabel="Export" onPress={() => {}}>
          <Stack.Toolbar.Icon src={Download} />
          <Stack.Toolbar.Label>Export</Stack.Toolbar.Label>
        </Stack.Toolbar.Button>
        <Stack.Toolbar.Button accessibilityLabel="Alerts" onPress={() => {}}>
          <Stack.Toolbar.Icon src={Notifications} />
          <Stack.Toolbar.Label>Alerts</Stack.Toolbar.Label>
        </Stack.Toolbar.Button>
        <Stack.Toolbar.Button accessibilityLabel="Info" onPress={() => {}}>
          <Stack.Toolbar.Icon src={Info} />
          <Stack.Toolbar.Label>Info</Stack.Toolbar.Label>
        </Stack.Toolbar.Button>
      </Stack.Toolbar>
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
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  closeIcon: {
    fontSize: 18,
    color: '#0F172A',
    fontWeight: '500',
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 32,
    gap: 16,
  },
  heroCard: {
    borderRadius: 24,
    padding: 20,
    gap: 6,
    shadowColor: '#0F2A2E',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 22,
    elevation: 10,
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
    fontSize: 16,
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
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -0.9,
  },
  heroPill: {
    backgroundColor: 'rgba(74, 222, 128, 0.18)',
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 10,
  },
  heroPillText: {
    color: '#4ADE80',
    fontSize: 12,
    fontWeight: '700',
  },
  heroFooter: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 12,
  },
  chartWrap: {
    marginTop: 12,
    marginHorizontal: -4,
    position: 'relative',
  },
  tooltip: {
    position: 'absolute',
    top: -2,
    right: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    zIndex: 2,
  },
  tooltipText: {
    color: '#0F172A',
    fontSize: 12,
    fontWeight: '700',
  },
  tooltipLine: {
    position: 'absolute',
    right: 50,
    top: 14,
    bottom: 0,
    width: 1,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255,255,255,0.35)',
    borderStyle: 'dashed',
    zIndex: 1,
  },
  tooltipDot: {
    position: 'absolute',
    right: 46,
    top: 28,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4ADE80',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    zIndex: 3,
  },
  rangeBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 12,
    padding: 4,
    marginTop: 8,
  },
  rangeChip: {
    flex: 1,
    paddingVertical: 6,
    alignItems: 'center',
    borderRadius: 8,
  },
  rangeChipActive: {
    backgroundColor: '#4ADE80',
  },
  rangeText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontWeight: '600',
  },
  rangeTextActive: {
    color: '#0F172A',
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    gap: 4,
  },
  statIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  statEmoji: {
    fontSize: 14,
  },
  statLabel: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  statSub: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
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
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  sectionLink: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '500',
  },
  breakdownRow: {
    flexDirection: 'row',
    gap: 10,
  },
  breakdownCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    gap: 4,
  },
  breakdownIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  breakdownEmoji: {
    fontSize: 14,
  },
  breakdownLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  breakdownAmount: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.2,
    marginTop: 2,
  },
  breakdownTrack: {
    height: 5,
    borderRadius: 3,
    backgroundColor: '#F1F5F9',
    overflow: 'hidden',
    marginTop: 6,
  },
  breakdownFill: {
    height: '100%',
    borderRadius: 3,
  },
  breakdownPct: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '500',
    marginTop: 4,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#DCFCE7',
    borderRadius: 18,
    padding: 14,
  },
  bannerIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerIconText: {
    fontSize: 18,
  },
  bannerText: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
  },
  bannerBody: {
    fontSize: 12,
    color: '#0F172A',
    marginTop: 2,
  },
  bannerBold: {
    fontWeight: '700',
    color: '#047857',
  },
  bannerCheck: {
    fontSize: 22,
  },
  activityList: {
    gap: 8,
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
  },
  activityIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityEmoji: {
    fontSize: 16,
    fontWeight: '700',
  },
  activityLines: {
    flex: 1,
  },
  activityLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
  },
  activityDate: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 1,
  },
  activityAmount: {
    fontSize: 14,
    fontWeight: '700',
  },
});
