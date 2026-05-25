import { LinearGradient } from 'expo-linear-gradient';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CARDS = [
  {
    id: 'primary',
    label: 'Primary card',
    network: 'Visa',
    last4: '1234',
    holder: 'Emma Bennett',
    expires: '08/29',
    colors: ['#0F2A2E', '#0B1F22'] as const,
    accent: '#4ADE80',
  },
  {
    id: 'travel',
    label: 'Travel card',
    network: 'Mastercard',
    last4: '5678',
    holder: 'Emma Bennett',
    expires: '11/27',
    colors: ['#7C3AED', '#4C1D95'] as const,
    accent: '#F472B6',
  },
];

const LINKED_METHODS = [
  {
    name: 'Apple Pay',
    detail: 'Default for in-store',
    color: '#0F172A',
    emoji: '',
    badge: 'Default',
  },
  {
    name: 'Google Pay',
    detail: 'Linked',
    color: '#E0E7FF',
    emoji: 'G',
    badge: null,
  },
  {
    name: 'PayPal',
    detail: 'emma@example.com',
    color: '#DBEAFE',
    emoji: 'P',
    badge: null,
  },
];

const ACTIONS = [
  { label: 'Freeze card', emoji: '🧊' },
  { label: 'Limits', emoji: '📊' },
  { label: 'Statements', emoji: '📄' },
  { label: 'Support', emoji: '💬' },
];

export default function CardsScreen() {
  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.topBar}>
            <View>
              <Text style={styles.title}>Cards</Text>
              <Text style={styles.subtitle}>Manage your payment methods</Text>
            </View>
            <Pressable style={styles.addButton}>
              <Text style={styles.addButtonIcon}>＋</Text>
            </Pressable>
          </View>

          {CARDS.map((card) => (
            <LinearGradient
              key={card.id}
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
              </View>
            </LinearGradient>
          ))}

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
            <Text style={styles.sectionTitle}>Linked methods</Text>
            <View style={styles.methodsBlock}>
              {LINKED_METHODS.map((method, i) => (
                <View
                  key={method.name}
                  style={[
                    styles.methodRow,
                    i < LINKED_METHODS.length - 1 && styles.methodDivider,
                  ]}
                >
                  <View
                    style={[styles.methodIcon, { backgroundColor: method.color }]}
                  >
                    <Text style={styles.methodIconText}>
                      {method.emoji || ''}
                    </Text>
                  </View>
                  <View style={styles.methodLines}>
                    <Text style={styles.methodName}>{method.name}</Text>
                    <Text style={styles.methodDetail}>{method.detail}</Text>
                  </View>
                  {method.badge && (
                    <View style={styles.methodBadge}>
                      <Text style={styles.methodBadgeText}>{method.badge}</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>

          <Pressable style={styles.addPaymentRow}>
            <Text style={styles.addPaymentIcon}>＋</Text>
            <Text style={styles.addPaymentText}>Add a new payment method</Text>
          </Pressable>
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
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.6,
  },
  subtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
    fontWeight: '500',
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonIcon: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '600',
    marginTop: -2,
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
  methodsBlock: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 14,
  },
  methodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
  },
  methodDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E2E8F0',
  },
  methodIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  methodIconText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  methodLines: {
    flex: 1,
  },
  methodName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  methodDetail: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  methodBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  methodBadgeText: {
    color: '#15803D',
    fontSize: 11,
    fontWeight: '700',
  },
  addPaymentRow: {
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
  addPaymentIcon: {
    fontSize: 18,
    fontWeight: '700',
    color: '#475569',
  },
  addPaymentText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
  },
});
