import { NativeTabs } from "expo-router/unstable-native-tabs";
import { StyleSheet, Text, View } from "react-native";

const FOOD_SPENT = 420;
const FOOD_BUDGET = 600;

function FoodBudgetAccessory() {
  const pct = Math.min(FOOD_SPENT / FOOD_BUDGET, 1);

  return (
    <View style={styles.accessory}>
      <View style={styles.iconBubble}>
        <Text style={styles.iconEmoji}>🍔</Text>
      </View>
      <View style={styles.middle}>
        <View style={styles.topLine}>
          <Text style={styles.label}>Food budget</Text>
          <Text style={styles.amount}>
            <Text style={styles.amountStrong}>${FOOD_SPENT}</Text>
            <Text style={styles.amountDim}> / ${FOOD_BUDGET}</Text>
          </Text>
        </View>
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${pct * 100}%` }]} />
        </View>
      </View>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <NativeTabs minimizeBehavior="onScrollDown">
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: "house", selected: "house.fill" }}
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="cards">
        <NativeTabs.Trigger.Label>Cards</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: "creditcard", selected: "creditcard.fill" }}
        />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="settings">
        <NativeTabs.Trigger.Label>Settings</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf={{ default: "gearshape", selected: "gearshape.fill" }}
        />
      </NativeTabs.Trigger>
      <NativeTabs.BottomAccessory>
        <FoodBudgetAccessory />
      </NativeTabs.BottomAccessory>
    </NativeTabs>
  );
}

const styles = StyleSheet.create({
  accessory: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  iconBubble: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#FFE4D6",
    alignItems: "center",
    justifyContent: "center",
  },
  iconEmoji: {
    fontSize: 18,
  },
  middle: {
    flex: 1,
    gap: 6,
  },
  topLine: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0F172A",
    letterSpacing: -0.1,
  },
  amount: {
    fontSize: 13,
  },
  amountStrong: {
    fontWeight: "700",
    color: "#0F172A",
  },
  amountDim: {
    color: "#94A3B8",
    fontWeight: "500",
  },
  track: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "#F1F5F9",
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 3,
    backgroundColor: "#F97316",
  },
});
