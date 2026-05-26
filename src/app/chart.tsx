import { Link, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BalanceChart } from '@/components/balance-chart';

export default function ChartScreen() {
  const router = useRouter();

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

        <View style={styles.centerWrap}>
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
                  <Text style={styles.heroPillText}>+8.2%</Text>
                </View>
              </View>

              <Text style={styles.heroFooter}>from last month</Text>

              <View style={styles.chartWrap}>
                <BalanceChart height={180} strokeWidth={3.5} />
              </View>
            </LinearGradient>
          </Link.AppleZoomTarget>
        </View>
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
  centerWrap: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  heroCard: {
    borderRadius: 28,
    padding: 24,
    gap: 8,
    shadowColor: '#0F2A2E',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.25,
    shadowRadius: 28,
    elevation: 12,
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
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
    marginTop: 6,
  },
  heroAmount: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: '800',
    letterSpacing: -1,
  },
  heroPill: {
    backgroundColor: 'rgba(74, 222, 128, 0.18)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  heroPillText: {
    color: '#4ADE80',
    fontSize: 13,
    fontWeight: '700',
  },
  heroFooter: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 13,
  },
  chartWrap: {
    marginTop: 14,
    marginHorizontal: -8,
  },
});
