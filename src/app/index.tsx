import { LinearGradient } from 'expo-linear-gradient';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const RECENT_ITEMS = [
  {
    color: '#FF6B9D',
    emoji: '🎨',
    title: 'Design system polish',
    subtitle: 'Updated color tokens · 2h',
  },
  {
    color: '#FFB627',
    emoji: '📊',
    title: 'Weekly metrics report',
    subtitle: 'Engagement up 12% · 5h',
  },
  {
    color: '#4ECDC4',
    emoji: '🚀',
    title: 'Launch checklist',
    subtitle: '3 tasks remaining · 1d',
  },
  {
    color: '#A78BFA',
    emoji: '🌱',
    title: 'New onboarding flow',
    subtitle: 'Draft ready for review · 2d',
  },
];

const CHART_BARS = [
  { height: 38, color: '#FF6B9D' },
  { height: 56, color: '#FFB627' },
  { height: 30, color: '#4ECDC4' },
  { height: 72, color: '#A78BFA' },
  { height: 48, color: '#FF8C66' },
  { height: 88, color: '#5EE2D6' },
  { height: 64, color: '#FFD93D' },
];

export default function HomeScreen() {
  return (
    <LinearGradient
      colors={['#FFE5EC', '#E8D5FF', '#D5F0FF']}
      locations={[0, 0.5, 1]}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Good morning!</Text>
              <Text style={styles.subgreeting}>Here is your day ✨</Text>
            </View>
            <View style={styles.avatar}>
              <Text style={styles.avatarEmoji}>☀️</Text>
            </View>
          </View>

          <LinearGradient
            colors={['#FF6B9D', '#A78BFA']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroCard}
          >
            <View style={styles.heroTopRow}>
              <View style={styles.heroIcon}>
                <Text style={styles.heroIconEmoji}>📈</Text>
              </View>
              <View style={styles.heroLines}>
                <Text style={styles.heroTitle}>This week</Text>
                <Text style={styles.heroSubtitle}>
                  You're 24% ahead of last week
                </Text>
              </View>
            </View>

            <View style={styles.chart}>
              {CHART_BARS.map((bar, i) => (
                <View
                  key={i}
                  style={[
                    styles.chartBar,
                    { height: bar.height, backgroundColor: bar.color },
                  ]}
                />
              ))}
            </View>

            <Pressable style={styles.cta}>
              <Text style={styles.ctaText}>See details</Text>
            </Pressable>
          </LinearGradient>

          <View style={styles.recentHeader}>
            <Text style={styles.recentTitle}>Recent</Text>
            <Text style={styles.recentLink}>See all</Text>
          </View>

          <View style={styles.recentList}>
            {RECENT_ITEMS.map((item) => (
              <View key={item.title} style={styles.recentItem}>
                <View
                  style={[styles.recentIcon, { backgroundColor: item.color }]}
                >
                  <Text style={styles.recentEmoji}>{item.emoji}</Text>
                </View>
                <View style={styles.recentLines}>
                  <Text style={styles.recentItemTitle}>{item.title}</Text>
                  <Text style={styles.recentItemSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
    gap: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 34,
    fontWeight: '800',
    color: '#1A1033',
    letterSpacing: -0.5,
  },
  subgreeting: {
    fontSize: 15,
    color: '#5B4D7A',
    marginTop: 4,
    fontWeight: '500',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF6B9D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  avatarEmoji: {
    fontSize: 26,
  },
  heroCard: {
    borderRadius: 28,
    padding: 22,
    gap: 20,
    shadowColor: '#A78BFA',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
    elevation: 10,
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  heroIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroIconEmoji: {
    fontSize: 24,
  },
  heroLines: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  heroSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 100,
    paddingHorizontal: 4,
  },
  chartBar: {
    width: 22,
    borderRadius: 8,
  },
  cta: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 22,
  },
  ctaText: {
    color: '#A23A6E',
    fontWeight: '700',
    fontSize: 14,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  recentTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1033',
    letterSpacing: -0.3,
  },
  recentLink: {
    fontSize: 14,
    fontWeight: '600',
    color: '#A78BFA',
  },
  recentList: {
    gap: 12,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#1A1033',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  recentIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recentEmoji: {
    fontSize: 22,
  },
  recentLines: {
    flex: 1,
  },
  recentItemTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1033',
  },
  recentItemSubtitle: {
    fontSize: 13,
    color: '#7A6B99',
    marginTop: 2,
  },
});
