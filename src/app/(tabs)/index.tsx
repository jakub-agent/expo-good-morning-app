import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BalanceChart } from "@/components/balance-chart";

const ACCOUNTS = [
  {
    name: "Primary account",
    last4: "1234",
    balance: "$7,420.20",
    color: "#2A2A33",
    emoji: "💳",
  },
  {
    name: "Savings account",
    last4: "5678",
    balance: "$5,120.30",
    color: "#7C3AED",
    emoji: "🏦",
  },
];

const TRANSACTIONS = [
  {
    name: "Coffee House",
    when: "Today, 8:30 AM",
    amount: "-$4.50",
    positive: false,
    color: "#FFE4D6",
    emoji: "☕",
  },
  {
    name: "Salary",
    when: "Yesterday",
    amount: "+$3,200.00",
    positive: true,
    color: "#DCFCE7",
    emoji: "💰",
  },
  {
    name: "Grocery Store",
    when: "2 days ago",
    amount: "-$82.40",
    positive: false,
    color: "#FEF3C7",
    emoji: "🛒",
  },
  {
    name: "Uber",
    when: "3 days ago",
    amount: "-$18.20",
    positive: false,
    color: "#E0E7FF",
    emoji: "🚗",
  },
  {
    name: "Netflix",
    when: "4 days ago",
    amount: "-$15.99",
    positive: false,
    color: "#FEE2E2",
    emoji: "🎬",
  },
  {
    name: "Refund — Amazon",
    when: "5 days ago",
    amount: "+$42.10",
    positive: true,
    color: "#DCFCE7",
    emoji: "📦",
  },
  {
    name: "Gym membership",
    when: "6 days ago",
    amount: "-$29.00",
    positive: false,
    color: "#CFFAFE",
    emoji: "🏋️",
  },
];

const SPENDING = [
  { label: "Food & drinks", amount: "$320.40", pct: 0.78, color: "#F97316" },
  { label: "Transport", amount: "$142.10", pct: 0.42, color: "#3B82F6" },
  { label: "Shopping", amount: "$210.80", pct: 0.55, color: "#A855F7" },
  { label: "Bills", amount: "$480.00", pct: 0.92, color: "#10B981" },
];

const BILLS = [
  {
    name: "Rent",
    when: "Due in 3 days",
    amount: "$1,200.00",
    color: "#E0E7FF",
    emoji: "🏠",
  },
  {
    name: "Electricity",
    when: "Due in 6 days",
    amount: "$84.30",
    color: "#FEF3C7",
    emoji: "💡",
  },
  {
    name: "Internet",
    when: "Due in 9 days",
    amount: "$59.99",
    color: "#CFFAFE",
    emoji: "🌐",
  },
];

const GOALS = [
  {
    name: "Vacation — Japan",
    saved: "$2,400",
    target: "$5,000",
    pct: 0.48,
    color: "#F472B6",
    emoji: "✈️",
  },
  {
    name: "Emergency fund",
    saved: "$3,800",
    target: "$6,000",
    pct: 0.63,
    color: "#34D399",
    emoji: "🛟",
  },
];

export default function HomeScreen() {
  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
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

          <Link href="/chart" asChild>
            <Link.Trigger withAppleZoom>
              <Pressable style={styles.heroCard}>
                <LinearGradient
                  colors={["#0F2A2E", "#0B1F22"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.heroCardGradient}
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
                    <View style={styles.heroAction}>
                      <Text style={styles.heroActionIcon}>＋</Text>
                      <Text style={styles.heroActionText}>Add money</Text>
                    </View>
                    <View style={styles.heroAction}>
                      <Text style={styles.heroActionIcon}>↗</Text>
                      <Text style={styles.heroActionText}>Send</Text>
                    </View>
                  </View>
                </LinearGradient>
              </Pressable>
            </Link.Trigger>
            <Link.Preview />
          </Link>

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
                    { color: tx.positive ? "#10B981" : "#0F172A" },
                  ]}
                >
                  {tx.amount}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Spending by category</Text>
              <Text style={styles.sectionLink}>This month</Text>
            </View>

            <View style={styles.cardBlock}>
              {SPENDING.map((cat, i) => (
                <View
                  key={cat.label}
                  style={[
                    styles.spendRow,
                    i < SPENDING.length - 1 && styles.spendRowDivider,
                  ]}
                >
                  <View style={styles.spendTopRow}>
                    <Text style={styles.spendLabel}>{cat.label}</Text>
                    <Text style={styles.spendAmount}>{cat.amount}</Text>
                  </View>
                  <View style={styles.barTrack}>
                    <View
                      style={[
                        styles.barFill,
                        {
                          width: `${cat.pct * 100}%`,
                          backgroundColor: cat.color,
                        },
                      ]}
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Upcoming bills</Text>
              <Text style={styles.sectionLink}>See all</Text>
            </View>

            {BILLS.map((bill) => (
              <View key={bill.name} style={styles.rowCard}>
                <View style={[styles.rowIcon, { backgroundColor: bill.color }]}>
                  <Text style={styles.rowEmoji}>{bill.emoji}</Text>
                </View>
                <View style={styles.rowLines}>
                  <Text style={styles.rowTitle}>{bill.name}</Text>
                  <Text style={styles.rowSubtitle}>{bill.when}</Text>
                </View>
                <Text style={styles.rowAmount}>{bill.amount}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Savings goals</Text>
              <Text style={styles.sectionLink}>See all</Text>
            </View>

            {GOALS.map((goal) => (
              <View key={goal.name} style={styles.goalCard}>
                <View style={styles.goalTopRow}>
                  <View
                    style={[
                      styles.rowIcon,
                      { backgroundColor: "rgba(255,255,255,0.18)" },
                    ]}
                  >
                    <Text style={styles.rowEmoji}>{goal.emoji}</Text>
                  </View>
                  <View style={styles.rowLines}>
                    <Text style={styles.goalTitle}>{goal.name}</Text>
                    <Text style={styles.goalSubtitle}>
                      {goal.saved} of {goal.target}
                    </Text>
                  </View>
                  <Text style={styles.goalPct}>
                    {Math.round(goal.pct * 100)}%
                  </Text>
                </View>
                <View style={styles.goalTrack}>
                  <View
                    style={[
                      styles.goalFill,
                      {
                        width: `${goal.pct * 100}%`,
                        backgroundColor: goal.color,
                      },
                    ]}
                  />
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
    backgroundColor: "#F6F7FB",
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topBarRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  menuIcon: {
    fontSize: 26,
    color: "#0F172A",
    fontWeight: "300",
  },
  bellIcon: {
    fontSize: 20,
  },
  notifDot: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF4444",
    borderWidth: 1.5,
    borderColor: "#F6F7FB",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFE0F0",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatarEmoji: {
    fontSize: 26,
  },
  headerBlock: {
    gap: 2,
  },
  greeting: {
    fontSize: 30,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: -0.6,
    lineHeight: 36,
  },
  wave: {
    fontSize: 26,
  },
  subgreeting: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 6,
    fontWeight: "500",
  },
  heroCard: {
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#0F2A2E",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 8,
  },
  heroCardGradient: {
    padding: 20,
    gap: 6,
  },
  heroTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heroLabel: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 13,
    fontWeight: "500",
  },
  heroEye: {
    fontSize: 14,
    opacity: 0.7,
  },
  heroAmountRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 4,
  },
  heroAmount: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: -0.8,
  },
  heroPill: {
    backgroundColor: "rgba(74, 222, 128, 0.18)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  heroPillText: {
    color: "#4ADE80",
    fontSize: 12,
    fontWeight: "700",
  },
  heroFooter: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 12,
    marginTop: -2,
  },
  chartWrap: {
    marginTop: 6,
    marginHorizontal: -6,
  },
  heroActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },
  heroAction: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  heroActionIcon: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  heroActionText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  section: {
    gap: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    paddingHorizontal: 2,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
    letterSpacing: -0.2,
  },
  sectionLink: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "500",
  },
  rowCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
  },
  rowIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  rowEmoji: {
    fontSize: 18,
  },
  rowLines: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },
  rowSubtitle: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 2,
  },
  rowAmount: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
  },
  cardBlock: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  spendRow: {
    paddingVertical: 12,
    gap: 8,
  },
  spendRowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E2E8F0",
  },
  spendTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  spendLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },
  spendAmount: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0F172A",
  },
  barTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "#F1F5F9",
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 3,
  },
  goalCard: {
    backgroundColor: "#0F172A",
    borderRadius: 18,
    padding: 14,
    gap: 12,
  },
  goalTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  goalTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  goalSubtitle: {
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
    marginTop: 2,
  },
  goalPct: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  goalTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.12)",
    overflow: "hidden",
  },
  goalFill: {
    height: "100%",
    borderRadius: 3,
  },
});
