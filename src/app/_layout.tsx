import { Link, useGlobalSearchParams, usePathname } from 'expo-router';
import { SplitView } from 'expo-router/unstable-split-view';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-screens/experimental';
import {
  ACCOUNTS,
  BILLS,
  CARDS,
  CATEGORY_PURCHASES,
  GOALS,
  NOTIFICATIONS,
  getAccount,
  getCard,
  getSpendingCategory,
} from '../data/mock';

type SidebarRow = {
  label: string;
  href: string;
  emoji?: string;
  subtitle?: string;
};

const CATEGORIES: SidebarRow[] = [
  { label: 'Overview', href: '/', emoji: '🏠' },
  { label: 'Accounts', href: '/accounts/primary', emoji: '🏦' },
  { label: 'Cards', href: '/cards/primary', emoji: '💳' },
  { label: 'Bills', href: '/bills', emoji: '🧾' },
  { label: 'Savings goals', href: '/goals', emoji: '🎯' },
];
const SETTINGS_ROW: SidebarRow = { label: 'Settings', href: '/settings', emoji: '⚙️' };

function categoryFromPath(pathname: string): string {
  if (pathname.startsWith('/accounts')) return '/accounts/primary';
  if (pathname.startsWith('/cards')) return '/cards/primary';
  if (pathname.startsWith('/bills')) return '/bills';
  if (pathname.startsWith('/goals')) return '/goals';
  if (pathname.startsWith('/settings')) return '/settings';
  return '/';
}

function SidebarRowItem({
  row,
  active,
  variant = 'compact',
}: {
  row: SidebarRow;
  active: boolean;
  variant?: 'compact' | 'rich';
}) {
  return (
    <Link href={row.href as never} asChild>
      <Pressable
        style={StyleSheet.flatten([
          variant === 'rich' ? styles.richRow : styles.row,
          active && (variant === 'rich' ? styles.richRowActive : styles.rowActive),
        ])}
      >
        {row.emoji && (
          <View
            style={
              variant === 'rich' ? styles.richRowEmojiWrap : styles.rowEmojiWrap
            }
          >
            <Text
              style={variant === 'rich' ? styles.richRowEmoji : styles.rowEmoji}
            >
              {row.emoji}
            </Text>
          </View>
        )}
        <View style={styles.richRowLines}>
          <Text
            style={[
              variant === 'rich' ? styles.richRowLabel : styles.rowLabel,
              active &&
              (variant === 'rich'
                ? styles.richRowLabelActive
                : styles.rowLabelActive),
            ]}
          >
            {row.label}
          </Text>
          {variant === 'rich' && row.subtitle && (
            <Text
              style={[
                styles.richRowSubtitle,
                active && styles.richRowSubtitleActive,
              ]}
            >
              {row.subtitle}
            </Text>
          )}
        </View>
      </Pressable>
    </Link>
  );
}

function Sidebar({
  inspectorVisible,
  onToggleInspector,
}: {
  inspectorVisible: boolean;
  onToggleInspector: () => void;
}) {
  const pathname = usePathname();
  const activeCategory = categoryFromPath(pathname);

  return (
    <SafeAreaView style={styles.sidebar} edges={{ top: false, left: true }}>
      <ScrollView
        contentContainerStyle={styles.sidebarScroll}
        contentInsetAdjustmentBehavior='automatic'
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.brandBlock}>
          <View style={styles.brandLogo}>
            <Text style={styles.brandLogoText}>W</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.brandName}>Wallet</Text>
            <Text style={styles.brandSubtitle}>Emma Bennett</Text>
          </View>
          <Pressable
            onPress={onToggleInspector}
            style={styles.inspectorToggle}
            accessibilityLabel={inspectorVisible ? 'Hide inspector' : 'Show inspector'}
          >
            <Text style={styles.inspectorToggleIcon}>
              {inspectorVisible ? '⇥' : '⇤'}
            </Text>
          </Pressable>
        </View>

        {CATEGORIES.map((row) => (
          <SidebarRowItem
            key={row.href}
            row={row}
            active={activeCategory === row.href}
          />
        ))}

        <View style={styles.divider} />
        <SidebarRowItem
          row={SETTINGS_ROW}
          active={activeCategory === SETTINGS_ROW.href}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

function SupplementaryHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View style={supplementaryStyles.header}>
      <Text style={supplementaryStyles.headerTitle}>{title}</Text>
      {subtitle && <Text style={supplementaryStyles.headerSubtitle}>{subtitle}</Text>}
    </View>
  );
}

function AccountsSupplementary({ pathname }: { pathname: string }) {
  return (
    <>
      <SupplementaryHeader
        title="Accounts"
        subtitle={`${ACCOUNTS.length} accounts`}
      />
      {ACCOUNTS.map((a) => (
        <SidebarRowItem
          key={a.id}
          row={{
            label: a.name,
            href: `/accounts/${a.id}`,
            emoji: a.emoji,
            subtitle: a.balance,
          }}
          active={pathname === `/accounts/${a.id}`}
          variant="rich"
        />
      ))}
    </>
  );
}

function CardsSupplementary({ pathname }: { pathname: string }) {
  return (
    <>
      <SupplementaryHeader title="Cards" subtitle={`${CARDS.length} cards`} />
      {CARDS.map((c) => (
        <SidebarRowItem
          key={c.id}
          row={{
            label: c.label,
            href: `/cards/${c.id}`,
            emoji: '💳',
            subtitle: `${c.network} · •••• ${c.last4}`,
          }}
          active={pathname === `/cards/${c.id}`}
          variant="rich"
        />
      ))}
    </>
  );
}

function BillsSupplementary() {
  return (
    <>
      <SupplementaryHeader
        title="Upcoming"
        subtitle={`${BILLS.length} bills this month`}
      />
      {BILLS.map((bill) => (
        <View key={bill.id} style={supplementaryStyles.listCard}>
          <View
            style={[supplementaryStyles.listIcon, { backgroundColor: bill.color }]}
          >
            <Text style={supplementaryStyles.listEmoji}>{bill.emoji}</Text>
          </View>
          <View style={styles.richRowLines}>
            <Text style={supplementaryStyles.listTitle}>{bill.name}</Text>
            <Text style={supplementaryStyles.listSubtitle}>{bill.when}</Text>
          </View>
          <Text style={supplementaryStyles.listAmount}>{bill.amount}</Text>
        </View>
      ))}
    </>
  );
}

function GoalsSupplementary() {
  return (
    <>
      <SupplementaryHeader
        title="In progress"
        subtitle={`${GOALS.length} active goals`}
      />
      {GOALS.map((goal) => (
        <View key={goal.id} style={supplementaryStyles.goalCard}>
          <View style={supplementaryStyles.goalTopRow}>
            <Text style={supplementaryStyles.listEmoji}>{goal.emoji}</Text>
            <Text style={supplementaryStyles.goalTitle}>{goal.name}</Text>
            <Text style={supplementaryStyles.goalPct}>
              {Math.round(goal.pct * 100)}%
            </Text>
          </View>
          <View style={supplementaryStyles.goalTrack}>
            <View
              style={[
                supplementaryStyles.goalFill,
                { width: `${goal.pct * 100}%`, backgroundColor: goal.color },
              ]}
            />
          </View>
          <Text style={supplementaryStyles.goalSub}>
            {goal.saved} of {goal.target}
          </Text>
        </View>
      ))}
    </>
  );
}

const SETTINGS_SECTIONS = [
  { label: 'Profile', emoji: '👤', subtitle: 'Personal information' },
  { label: 'Preferences', emoji: '⚙️', subtitle: 'Notifications, theme' },
  { label: 'Security', emoji: '🔒', subtitle: 'Password, 2FA, devices' },
  { label: 'About', emoji: '📜', subtitle: 'Help, terms, privacy' },
];

function SettingsSupplementary() {
  return (
    <>
      <SupplementaryHeader title="Settings" subtitle="Sections" />
      {SETTINGS_SECTIONS.map((s) => (
        <View key={s.label} style={supplementaryStyles.staticRow}>
          <View
            style={[supplementaryStyles.listIcon, { backgroundColor: '#E0E7FF' }]}
          >
            <Text style={supplementaryStyles.listEmoji}>{s.emoji}</Text>
          </View>
          <View style={styles.richRowLines}>
            <Text style={supplementaryStyles.listTitle}>{s.label}</Text>
            <Text style={supplementaryStyles.listSubtitle}>{s.subtitle}</Text>
          </View>
          <Text style={supplementaryStyles.chevron}>›</Text>
        </View>
      ))}
    </>
  );
}

function OverviewSupplementary() {
  const totalBalance = ACCOUNTS.length;
  return (
    <>
      <SupplementaryHeader title="Quick stats" subtitle="At a glance" />
      <View style={supplementaryStyles.statCard}>
        <Text style={supplementaryStyles.statLabel}>Total balance</Text>
        <Text style={supplementaryStyles.statValue}>$12,540.50</Text>
        <Text style={supplementaryStyles.statTrend}>+8.2% from last month</Text>
      </View>
      <View style={supplementaryStyles.statRow}>
        <View style={supplementaryStyles.statHalf}>
          <Text style={supplementaryStyles.statHalfLabel}>Accounts</Text>
          <Text style={supplementaryStyles.statHalfValue}>{totalBalance}</Text>
        </View>
        <View style={supplementaryStyles.statHalf}>
          <Text style={supplementaryStyles.statHalfLabel}>Cards</Text>
          <Text style={supplementaryStyles.statHalfValue}>{CARDS.length}</Text>
        </View>
      </View>

      <SupplementaryHeader title="Notifications" />
      {NOTIFICATIONS.slice(0, 3).map((n) => (
        <View key={n.id} style={supplementaryStyles.staticRow}>
          <View
            style={[supplementaryStyles.listIcon, { backgroundColor: n.color }]}
          >
            <Text style={supplementaryStyles.listEmoji}>{n.emoji}</Text>
          </View>
          <View style={styles.richRowLines}>
            <Text style={supplementaryStyles.listTitle}>{n.title}</Text>
            <Text style={supplementaryStyles.listSubtitle}>{n.detail}</Text>
          </View>
        </View>
      ))}
    </>
  );
}

function Supplementary() {
  const pathname = usePathname();
  return (
    <View style={supplementaryStyles.root}>
      <SafeAreaView style={supplementaryStyles.safe} edges={{ top: true, left: true }}>
        <ScrollView
          contentContainerStyle={supplementaryStyles.scroll}
          showsVerticalScrollIndicator={false}
        >
          {pathname.startsWith('/accounts') ? (
            <AccountsSupplementary pathname={pathname} />
          ) : pathname.startsWith('/cards') ? (
            <CardsSupplementary pathname={pathname} />
          ) : pathname.startsWith('/bills') ? (
            <BillsSupplementary />
          ) : pathname.startsWith('/goals') ? (
            <GoalsSupplementary />
          ) : pathname.startsWith('/settings') ? (
            <SettingsSupplementary />
          ) : (
            <OverviewSupplementary />
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function InspectorMetaRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={inspectorStyles.metaRow}>
      <Text style={inspectorStyles.metaLabel}>{label}</Text>
      <Text style={inspectorStyles.metaValue}>{value}</Text>
    </View>
  );
}

function AccountInspector({ accountId }: { accountId: string }) {
  const account = getAccount(accountId);
  if (!account) return <ActivityInspector />;
  return (
    <View style={inspectorStyles.section}>
      <Text style={inspectorStyles.sectionTitle}>Account info</Text>
      <View style={inspectorStyles.card}>
        <InspectorMetaRow label="Number" value={`•••• ${account.last4}`} />
        <InspectorMetaRow label="IBAN" value={account.iban} />
        <InspectorMetaRow label="Opened" value={account.openedOn} />
        <InspectorMetaRow label="Monthly avg" value={account.monthlyAvg} />
      </View>
      <Text style={inspectorStyles.sectionTitle}>Status</Text>
      <View style={inspectorStyles.card}>
        <InspectorMetaRow label="Type" value="Personal" />
        <InspectorMetaRow label="Currency" value="USD" />
        <InspectorMetaRow label="Verified" value="Yes" />
      </View>
    </View>
  );
}

function CardInspector({ cardId }: { cardId: string }) {
  const card = getCard(cardId);
  if (!card) return <ActivityInspector />;
  return (
    <View style={inspectorStyles.section}>
      <Text style={inspectorStyles.sectionTitle}>Card info</Text>
      <View style={inspectorStyles.card}>
        <InspectorMetaRow label="Number" value={`•••• ${card.last4}`} />
        <InspectorMetaRow label="Expires" value={card.expires} />
        <InspectorMetaRow label="CVV" value={card.cvv} />
        <InspectorMetaRow label="Network" value={card.network} />
      </View>
      <Text style={inspectorStyles.sectionTitle}>Limits</Text>
      <View style={inspectorStyles.card}>
        <InspectorMetaRow label="Daily limit" value={card.dailyLimit} />
        <InspectorMetaRow label="Autopay" value={card.autopay} />
        <InspectorMetaRow label="Contactless" value="Enabled" />
      </View>
    </View>
  );
}

function CategoryInspector({ slug }: { slug: string }) {
  const category = getSpendingCategory(slug);
  const purchases = CATEGORY_PURCHASES[slug] ?? [];
  if (!category) return <ActivityInspector />;
  return (
    <View style={inspectorStyles.section}>
      <View style={inspectorStyles.categoryHeader}>
        <View
          style={[
            inspectorStyles.categoryDot,
            { backgroundColor: category.color },
          ]}
        />
        <View style={{ flex: 1 }}>
          <Text style={inspectorStyles.categoryTitle}>{category.label}</Text>
          <Text style={inspectorStyles.categoryMeta}>
            {purchases.length} purchases · {category.amount}
          </Text>
        </View>
      </View>
      <View style={inspectorStyles.card}>
        {purchases.map((p, i) => (
          <View
            key={p.id}
            style={[
              inspectorStyles.notifRow,
              i < purchases.length - 1 && inspectorStyles.notifDivider,
            ]}
          >
            <View style={[inspectorStyles.notifIcon, { backgroundColor: p.color }]}>
              <Text style={inspectorStyles.notifEmoji}>{p.emoji}</Text>
            </View>
            <View style={inspectorStyles.notifLines}>
              <Text style={inspectorStyles.notifTitle}>{p.merchant}</Text>
              <Text style={inspectorStyles.notifDetail}>{p.detail}</Text>
              <Text style={inspectorStyles.notifWhen}>{p.when}</Text>
            </View>
            <Text style={inspectorStyles.purchaseAmount}>{p.amount}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function ActivityInspector() {
  return (
    <View style={inspectorStyles.section}>
      <Text style={inspectorStyles.sectionTitle}>Recent activity</Text>
      <View style={inspectorStyles.card}>
        {NOTIFICATIONS.map((n, i) => (
          <View
            key={n.id}
            style={[
              inspectorStyles.notifRow,
              i < NOTIFICATIONS.length - 1 && inspectorStyles.notifDivider,
            ]}
          >
            <View style={[inspectorStyles.notifIcon, { backgroundColor: n.color }]}>
              <Text style={inspectorStyles.notifEmoji}>{n.emoji}</Text>
            </View>
            <View style={inspectorStyles.notifLines}>
              <Text style={inspectorStyles.notifTitle}>{n.title}</Text>
              <Text style={inspectorStyles.notifDetail}>{n.detail}</Text>
              <Text style={inspectorStyles.notifWhen}>{n.when}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

function Inspector({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();
  const params = useGlobalSearchParams<{ category?: string }>();
  const accountMatch = pathname.match(/^\/accounts\/([^/]+)/);
  const cardMatch = pathname.match(/^\/cards\/([^/]+)/);
  const categorySelected =
    pathname === '/' &&
    typeof params.category === 'string' &&
    params.category.length > 0;

  return (
    <SafeAreaView style={inspectorStyles.root} edges={{ top: true, right: true }}>
      <View style={inspectorStyles.topBar}>
        <Pressable
          onPress={onClose}
          style={inspectorStyles.closeButton}
          accessibilityLabel="Hide inspector"
        >
          <Text style={inspectorStyles.closeIcon}>✕</Text>
        </Pressable>
      </View>
      <ScrollView
        contentContainerStyle={inspectorStyles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {categorySelected ? (
          <CategoryInspector slug={params.category as string} />
        ) : accountMatch ? (
          <AccountInspector accountId={accountMatch[1]} />
        ) : cardMatch ? (
          <CardInspector cardId={cardMatch[1]} />
        ) : (
          <ActivityInspector />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function useAutoOpenInspectorOnCategory(
  setInspectorVisible: (v: boolean) => void,
) {
  const params = useGlobalSearchParams<{ category?: string }>();
  const slug = typeof params.category === 'string' ? params.category : '';
  useEffect(() => {
    if (slug.length > 0) {
      setInspectorVisible(true);
    }
  }, [slug, setInspectorVisible]);
}

export default function RootLayout() {
  const [inspectorVisible, setInspectorVisible] = useState(true);
  useAutoOpenInspectorOnCategory(setInspectorVisible);
  return (
    <>
      <StatusBar style="dark" />
      <SplitView
        topColumnForCollapsing="primary"
        preferredSplitBehavior="tile"
        preferredDisplayMode="twoBesideSecondary"
        showInspector={inspectorVisible}
        onInspectorHide={() => setInspectorVisible(false)}
      >
        <SplitView.Column>
          <Sidebar
            inspectorVisible={inspectorVisible}
            onToggleInspector={() => setInspectorVisible((v) => !v)}
          />
        </SplitView.Column>
        <SplitView.Column>
          <Supplementary />
        </SplitView.Column>
        <SplitView.Inspector>
          <Inspector onClose={() => setInspectorVisible(false)} />
        </SplitView.Inspector>
      </SplitView>
    </>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    flex: 1,
    backgroundColor: '#F1F2F6',
  },
  sidebarScroll: {
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 24,
    gap: 4,
  },
  brandBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 8,
    paddingVertical: 12,
    marginBottom: 8,
  },
  brandLogo: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandLogoText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  brandName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  brandSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
    marginTop: 2,
  },
  inspectorToggle: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  inspectorToggleIcon: {
    fontSize: 16,
    color: '#0F172A',
    fontWeight: '700',
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  rowActive: {
    backgroundColor: '#0F172A',
  },
  rowEmojiWrap: {
    width: 26,
    height: 26,
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowEmoji: {
    fontSize: 14,
  },
  rowLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    flex: 1,
  },
  rowLabelActive: {
    color: '#FFFFFF',
  },
  spacer: {
    height: 16,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#CBD5E1',
    marginVertical: 12,
    marginHorizontal: 10,
  },
  richRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
  },
  richRowActive: {
    backgroundColor: '#0F172A',
  },
  richRowEmojiWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  richRowEmoji: {
    fontSize: 18,
  },
  richRowLines: {
    flex: 1,
  },
  richRowLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  richRowLabelActive: {
    color: '#FFFFFF',
  },
  richRowSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
    marginTop: 2,
  },
  richRowSubtitleActive: {
    color: 'rgba(255,255,255,0.7)',
  },
});

const supplementaryStyles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F6F7FB',
  },
  safe: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 24,
    gap: 8,
  },
  header: {
    paddingHorizontal: 6,
    paddingTop: 12,
    paddingBottom: 4,
    gap: 2,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
  },
  listCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
  },
  staticRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
  },
  listIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listEmoji: {
    fontSize: 18,
  },
  listTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  listSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  listAmount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  chevron: {
    fontSize: 20,
    color: '#CBD5E1',
    marginTop: -2,
  },
  goalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    gap: 8,
  },
  goalTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  goalTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  goalPct: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  goalTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F1F5F9',
    overflow: 'hidden',
  },
  goalFill: {
    height: '100%',
    borderRadius: 3,
  },
  goalSub: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
  },
  statCard: {
    backgroundColor: '#0F172A',
    borderRadius: 14,
    padding: 14,
    gap: 4,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.6)',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.4,
  },
  statTrend: {
    fontSize: 12,
    color: '#4ADE80',
    fontWeight: '600',
  },
  statRow: {
    flexDirection: 'row',
    gap: 8,
  },
  statHalf: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    gap: 4,
  },
  statHalfLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  statHalfValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.4,
  },
});

const inspectorStyles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F6F7FB',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 4,
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 14,
    fontWeight: '700',
    color: '#475569',
  },
  scroll: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 24,
    gap: 16,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.7,
    paddingHorizontal: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 14,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E2E8F0',
  },
  metaLabel: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  metaValue: {
    fontSize: 13,
    color: '#0F172A',
    fontWeight: '600',
  },
  notifRow: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 12,
  },
  notifDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E2E8F0',
  },
  notifIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifEmoji: {
    fontSize: 16,
  },
  notifLines: {
    flex: 1,
  },
  notifTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  notifDetail: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  notifWhen: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 4,
    fontWeight: '500',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
  categoryDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  categoryMeta: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
    marginTop: 2,
  },
  purchaseAmount: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
});
