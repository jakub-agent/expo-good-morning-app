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
import { getCard, transactionsForCard, type CardId } from '../../data/mock';

const ACTIONS = [
  { label: 'Freeze', emoji: '🧊' },
  { label: 'Limits', emoji: '📊' },
  { label: 'PIN', emoji: '🔢' },
  { label: 'Statements', emoji: '📄' },
];

export default function CardDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const card = getCard(id);

  if (!card) {
    return (
      <View style={styles.root}>
        <SafeAreaView style={styles.safeArea} edges={['top', 'right']}>
          <Text style={styles.notFound}>Card not found</Text>
        </SafeAreaView>
      </View>
    );
  }

  const transactions = transactionsForCard(card.id as CardId);

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'right']}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerBlock}>
            <Text style={styles.crumb}>Cards</Text>
            <Text style={styles.title}>{card.label}</Text>
            <Text style={styles.subtitle}>{card.network} · •••• {card.last4}</Text>
          </View>

          <LinearGradient
            colors={card.colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            <View style={styles.cardTopRow}>
              <Text style={styles.cardLabel}>{card.label}</Text>
              <Text style={[styles.cardNetwork, { color: card.accent }]}>
                {card.network}
              </Text>
            </View>

            <Text style={styles.cardNumber}>•••• •••• •••• {card.last4}</Text>

            <View style={styles.cardBottomRow}>
              <View>
                <Text style={styles.cardMeta}>Card holder</Text>
                <Text style={styles.cardMetaValue}>{card.holder}</Text>
              </View>
              <View>
                <Text style={styles.cardMeta}>Expires</Text>
                <Text style={styles.cardMetaValue}>{card.expires}</Text>
              </View>
              <View>
                <Text style={styles.cardMeta}>CVV</Text>
                <Text style={styles.cardMetaValue}>{card.cvv}</Text>
              </View>
            </View>
          </LinearGradient>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick actions</Text>
            <View style={styles.actionsGrid}>
              {ACTIONS.map((action) => (
                <Pressable key={action.label} style={styles.actionTile}>
                  <Text style={styles.actionEmoji}>{action.emoji}</Text>
                  <Text style={styles.actionLabel}>{action.label}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent on this card</Text>
            {transactions.length === 0 ? (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyText}>No transactions yet</Text>
              </View>
            ) : (
              transactions.map((tx) => (
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
              ))
            )}
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
  card: {
    borderRadius: 22,
    padding: 20,
    gap: 18,
    shadowColor: '#0F2A2E',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 8,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 13,
    fontWeight: '500',
  },
  cardNetwork: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  cardNumber: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 2,
  },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardMeta: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  cardMetaValue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
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
  actionsGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  actionTile: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    gap: 6,
  },
  actionEmoji: {
    fontSize: 22,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0F172A',
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
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '500',
  },
});
