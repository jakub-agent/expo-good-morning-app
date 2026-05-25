import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Row = {
  label: string;
  emoji: string;
  color: string;
  value?: string;
  toggle?: boolean;
};

const ACCOUNT_ROWS: Row[] = [
  { label: 'Personal information', emoji: '👤', color: '#E0E7FF' },
  { label: 'Email', emoji: '✉️', color: '#FEF3C7', value: 'emma@example.com' },
  { label: 'Phone number', emoji: '📱', color: '#DCFCE7', value: '+1 (415) •••• 482' },
];

const PREFERENCES_ROWS: Row[] = [
  { label: 'Notifications', emoji: '🔔', color: '#FEE2E2', toggle: true },
  { label: 'Face ID', emoji: '🪪', color: '#CFFAFE', toggle: true },
  { label: 'Dark mode', emoji: '🌙', color: '#E0E7FF', toggle: false },
  { label: 'Language', emoji: '🌐', color: '#FFE4D6', value: 'English (US)' },
];

const SECURITY_ROWS: Row[] = [
  { label: 'Change password', emoji: '🔒', color: '#FECACA' },
  { label: 'Two-factor auth', emoji: '🛡️', color: '#DCFCE7', value: 'On' },
  { label: 'Devices', emoji: '💻', color: '#E0E7FF', value: '3 active' },
];

const ABOUT_ROWS: Row[] = [
  { label: 'Help center', emoji: '❓', color: '#FEF3C7' },
  { label: 'Terms of service', emoji: '📜', color: '#E0E7FF' },
  { label: 'Privacy policy', emoji: '🛟', color: '#DCFCE7' },
];

function Section({ title, rows }: { title: string; rows: Row[] }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.card}>
        {rows.map((row, i) => (
          <View
            key={row.label}
            style={[
              styles.row,
              i < rows.length - 1 && styles.rowDivider,
            ]}
          >
            <View style={[styles.icon, { backgroundColor: row.color }]}>
              <Text style={styles.iconEmoji}>{row.emoji}</Text>
            </View>
            <Text style={styles.rowLabel}>{row.label}</Text>
            {row.toggle !== undefined ? (
              <Switch
                value={row.toggle}
                trackColor={{ false: '#E2E8F0', true: '#0F172A' }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#E2E8F0"
              />
            ) : row.value ? (
              <View style={styles.rowRight}>
                <Text style={styles.rowValue}>{row.value}</Text>
                <Text style={styles.chevron}>›</Text>
              </View>
            ) : (
              <Text style={styles.chevron}>›</Text>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

export default function SettingsScreen() {
  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Settings</Text>

          <View style={styles.profileCard}>
            <View style={styles.profileAvatar}>
              <Text style={styles.profileAvatarEmoji}>👩🏻</Text>
            </View>
            <View style={styles.profileLines}>
              <Text style={styles.profileName}>Emma Bennett</Text>
              <Text style={styles.profileMeta}>Premium member · since 2023</Text>
            </View>
            <Pressable style={styles.editButton}>
              <Text style={styles.editButtonText}>Edit</Text>
            </Pressable>
          </View>

          <Section title="Account" rows={ACCOUNT_ROWS} />
          <Section title="Preferences" rows={PREFERENCES_ROWS} />
          <Section title="Security" rows={SECURITY_ROWS} />
          <Section title="About" rows={ABOUT_ROWS} />

          <Pressable style={styles.signOut}>
            <Text style={styles.signOutText}>Sign out</Text>
          </Pressable>

          <Text style={styles.version}>Version 1.0.0</Text>
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
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.6,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
  },
  profileAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFE0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarEmoji: {
    fontSize: 32,
  },
  profileLines: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  profileMeta: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 3,
  },
  editButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
  },
  editButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
  },
  section: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    paddingHorizontal: 6,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 14,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
  },
  rowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E2E8F0',
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconEmoji: {
    fontSize: 16,
  },
  rowLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rowValue: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '500',
  },
  chevron: {
    fontSize: 22,
    color: '#CBD5E1',
    fontWeight: '400',
    marginTop: -2,
  },
  signOut: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
  },
  signOutText: {
    color: '#EF4444',
    fontSize: 15,
    fontWeight: '700',
  },
  version: {
    textAlign: 'center',
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
  },
});
