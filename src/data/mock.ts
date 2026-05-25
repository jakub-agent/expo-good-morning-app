export type AccountId = 'primary' | 'savings';
export type CardId = 'primary' | 'travel';

export type Account = {
  id: AccountId;
  name: string;
  last4: string;
  balance: string;
  iban: string;
  openedOn: string;
  monthlyAvg: string;
  color: string;
  emoji: string;
};

export type Card = {
  id: CardId;
  label: string;
  network: 'Visa' | 'Mastercard';
  last4: string;
  holder: string;
  expires: string;
  cvv: string;
  dailyLimit: string;
  autopay: 'On' | 'Off';
  colors: readonly [string, string];
  accent: string;
};

export type Transaction = {
  id: string;
  name: string;
  when: string;
  amount: string;
  positive: boolean;
  color: string;
  emoji: string;
  accountId: AccountId;
  cardId?: CardId;
};

export type Bill = {
  id: string;
  name: string;
  when: string;
  amount: string;
  color: string;
  emoji: string;
  autopay: boolean;
};

export type Goal = {
  id: string;
  name: string;
  saved: string;
  target: string;
  pct: number;
  color: string;
  emoji: string;
};

export const ACCOUNTS: Account[] = [
  {
    id: 'primary',
    name: 'Primary account',
    last4: '1234',
    balance: '$7,420.20',
    iban: 'DE89 •••• •••• 1234',
    openedOn: 'Mar 2021',
    monthlyAvg: '$6,820.00',
    color: '#2A2A33',
    emoji: '💳',
  },
  {
    id: 'savings',
    name: 'Savings account',
    last4: '5678',
    balance: '$5,120.30',
    iban: 'DE89 •••• •••• 5678',
    openedOn: 'Jul 2022',
    monthlyAvg: '$4,950.00',
    color: '#7C3AED',
    emoji: '🏦',
  },
];

export const CARDS: Card[] = [
  {
    id: 'primary',
    label: 'Primary card',
    network: 'Visa',
    last4: '1234',
    holder: 'Emma Bennett',
    expires: '08/29',
    cvv: '•••',
    dailyLimit: '$2,000',
    autopay: 'On',
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
    cvv: '•••',
    dailyLimit: '$3,500',
    autopay: 'Off',
    colors: ['#7C3AED', '#4C1D95'] as const,
    accent: '#F472B6',
  },
];

export const TRANSACTIONS: Transaction[] = [
  {
    id: 't1',
    name: 'Coffee House',
    when: 'Today, 8:30 AM',
    amount: '-$4.50',
    positive: false,
    color: '#FFE4D6',
    emoji: '☕',
    accountId: 'primary',
    cardId: 'primary',
  },
  {
    id: 't2',
    name: 'Salary',
    when: 'Yesterday',
    amount: '+$3,200.00',
    positive: true,
    color: '#DCFCE7',
    emoji: '💰',
    accountId: 'primary',
  },
  {
    id: 't3',
    name: 'Grocery Store',
    when: '2 days ago',
    amount: '-$82.40',
    positive: false,
    color: '#FEF3C7',
    emoji: '🛒',
    accountId: 'primary',
    cardId: 'primary',
  },
  {
    id: 't4',
    name: 'Uber',
    when: '3 days ago',
    amount: '-$18.20',
    positive: false,
    color: '#E0E7FF',
    emoji: '🚗',
    accountId: 'primary',
    cardId: 'travel',
  },
  {
    id: 't5',
    name: 'Netflix',
    when: '4 days ago',
    amount: '-$15.99',
    positive: false,
    color: '#FEE2E2',
    emoji: '🎬',
    accountId: 'primary',
    cardId: 'primary',
  },
  {
    id: 't6',
    name: 'Refund — Amazon',
    when: '5 days ago',
    amount: '+$42.10',
    positive: true,
    color: '#DCFCE7',
    emoji: '📦',
    accountId: 'primary',
  },
  {
    id: 't7',
    name: 'Gym membership',
    when: '6 days ago',
    amount: '-$29.00',
    positive: false,
    color: '#CFFAFE',
    emoji: '🏋️',
    accountId: 'primary',
    cardId: 'primary',
  },
  {
    id: 't8',
    name: 'Transfer to Savings',
    when: '7 days ago',
    amount: '+$500.00',
    positive: true,
    color: '#DCFCE7',
    emoji: '💸',
    accountId: 'savings',
  },
  {
    id: 't9',
    name: 'Hotel — Tokyo',
    when: '10 days ago',
    amount: '-$320.00',
    positive: false,
    color: '#FCE7F3',
    emoji: '🏨',
    accountId: 'primary',
    cardId: 'travel',
  },
  {
    id: 't10',
    name: 'Interest',
    when: '14 days ago',
    amount: '+$12.40',
    positive: true,
    color: '#DCFCE7',
    emoji: '✨',
    accountId: 'savings',
  },
];

export type SpendingCategory = {
  slug: string;
  label: string;
  amount: string;
  pct: number;
  color: string;
};

export const SPENDING: SpendingCategory[] = [
  { slug: 'food', label: 'Food & drinks', amount: '$320.40', pct: 0.78, color: '#F97316' },
  { slug: 'transport', label: 'Transport', amount: '$142.10', pct: 0.42, color: '#3B82F6' },
  { slug: 'shopping', label: 'Shopping', amount: '$210.80', pct: 0.55, color: '#A855F7' },
  { slug: 'bills', label: 'Bills', amount: '$480.00', pct: 0.92, color: '#10B981' },
];

export type CategoryPurchase = {
  id: string;
  merchant: string;
  detail: string;
  when: string;
  amount: string;
  emoji: string;
  color: string;
};

export const CATEGORY_PURCHASES: Record<string, CategoryPurchase[]> = {
  food: [
    { id: 'fp1', merchant: 'Coffee House', detail: 'Latte + croissant', when: 'Today, 8:30 AM', amount: '-$4.50', emoji: '☕', color: '#FFE4D6' },
    { id: 'fp2', merchant: 'Whole Foods', detail: 'Groceries', when: 'Yesterday', amount: '-$62.10', emoji: '🥑', color: '#DCFCE7' },
    { id: 'fp3', merchant: 'Sushi Place', detail: 'Dinner — Sat', when: '2 days ago', amount: '-$48.00', emoji: '🍣', color: '#FEE2E2' },
    { id: 'fp4', merchant: 'Bakery Corner', detail: 'Sourdough loaf', when: '3 days ago', amount: '-$8.20', emoji: '🥖', color: '#FEF3C7' },
    { id: 'fp5', merchant: 'Pizza Roma', detail: 'Margherita', when: '5 days ago', amount: '-$22.50', emoji: '🍕', color: '#FEE2E2' },
    { id: 'fp6', merchant: 'Tea Lab', detail: 'Matcha set', when: '1 wk ago', amount: '-$14.00', emoji: '🍵', color: '#DCFCE7' },
  ],
  transport: [
    { id: 'tp1', merchant: 'Uber', detail: 'Airport ride', when: 'Today', amount: '-$28.40', emoji: '🚗', color: '#E0E7FF' },
    { id: 'tp2', merchant: 'Metro card', detail: 'Top-up', when: '2 days ago', amount: '-$25.00', emoji: '🚇', color: '#CFFAFE' },
    { id: 'tp3', merchant: 'Lyft', detail: 'Late night', when: '4 days ago', amount: '-$18.20', emoji: '🚙', color: '#E0E7FF' },
    { id: 'tp4', merchant: 'Citi Bike', detail: 'Monthly pass', when: '1 wk ago', amount: '-$19.00', emoji: '🚲', color: '#DCFCE7' },
    { id: 'tp5', merchant: 'Shell', detail: 'Fuel', when: '10 days ago', amount: '-$51.50', emoji: '⛽', color: '#FEF3C7' },
  ],
  shopping: [
    { id: 'sp1', merchant: 'Amazon', detail: 'Headphones', when: 'Today', amount: '-$89.99', emoji: '📦', color: '#FEF3C7' },
    { id: 'sp2', merchant: 'Uniqlo', detail: 'Light jacket', when: '2 days ago', amount: '-$59.90', emoji: '🧥', color: '#E0E7FF' },
    { id: 'sp3', merchant: 'Apple', detail: 'Charging cable', when: '4 days ago', amount: '-$19.00', emoji: '🔌', color: '#F1F5F9' },
    { id: 'sp4', merchant: 'Muji', detail: 'Stationery', when: '6 days ago', amount: '-$22.50', emoji: '✏️', color: '#FEF3C7' },
    { id: 'sp5', merchant: 'IKEA', detail: 'Desk lamp', when: '2 wks ago', amount: '-$39.99', emoji: '💡', color: '#FFE4D6' },
  ],
  bills: [
    { id: 'bp1', merchant: 'Rent — Landlord', detail: 'May', when: 'Today', amount: '-$1,200.00', emoji: '🏠', color: '#E0E7FF' },
    { id: 'bp2', merchant: 'ConEd', detail: 'Electricity', when: '3 days ago', amount: '-$84.30', emoji: '💡', color: '#FEF3C7' },
    { id: 'bp3', merchant: 'Spectrum', detail: 'Internet', when: '5 days ago', amount: '-$59.99', emoji: '🌐', color: '#CFFAFE' },
    { id: 'bp4', merchant: 'AT&T', detail: 'Phone plan', when: '7 days ago', amount: '-$45.00', emoji: '📱', color: '#FCE7F3' },
    { id: 'bp5', merchant: 'Netflix + Hulu', detail: 'Streaming bundle', when: '10 days ago', amount: '-$24.99', emoji: '🎬', color: '#FEE2E2' },
  ],
};

export function getSpendingCategory(slug: string | undefined): SpendingCategory | undefined {
  return SPENDING.find((s) => s.slug === slug);
}

export const BILLS: Bill[] = [
  {
    id: 'b1',
    name: 'Rent',
    when: 'Due in 3 days',
    amount: '$1,200.00',
    color: '#E0E7FF',
    emoji: '🏠',
    autopay: false,
  },
  {
    id: 'b2',
    name: 'Electricity',
    when: 'Due in 6 days',
    amount: '$84.30',
    color: '#FEF3C7',
    emoji: '💡',
    autopay: true,
  },
  {
    id: 'b3',
    name: 'Internet',
    when: 'Due in 9 days',
    amount: '$59.99',
    color: '#CFFAFE',
    emoji: '🌐',
    autopay: true,
  },
  {
    id: 'b4',
    name: 'Phone plan',
    when: 'Due in 12 days',
    amount: '$45.00',
    color: '#FCE7F3',
    emoji: '📱',
    autopay: true,
  },
  {
    id: 'b5',
    name: 'Streaming bundle',
    when: 'Due in 18 days',
    amount: '$24.99',
    color: '#FEE2E2',
    emoji: '🎬',
    autopay: true,
  },
];

export const GOALS: Goal[] = [
  {
    id: 'g1',
    name: 'Vacation — Japan',
    saved: '$2,400',
    target: '$5,000',
    pct: 0.48,
    color: '#F472B6',
    emoji: '✈️',
  },
  {
    id: 'g2',
    name: 'Emergency fund',
    saved: '$3,800',
    target: '$6,000',
    pct: 0.63,
    color: '#34D399',
    emoji: '🛟',
  },
  {
    id: 'g3',
    name: 'New laptop',
    saved: '$900',
    target: '$2,200',
    pct: 0.41,
    color: '#60A5FA',
    emoji: '💻',
  },
];

export const NOTIFICATIONS = [
  {
    id: 'n1',
    title: 'Salary received',
    detail: '+$3,200.00 to Primary account',
    when: 'Yesterday',
    emoji: '💰',
    color: '#DCFCE7',
  },
  {
    id: 'n2',
    title: 'Rent due soon',
    detail: '$1,200.00 in 3 days',
    when: 'Today',
    emoji: '🏠',
    color: '#FEE2E2',
  },
  {
    id: 'n3',
    title: 'Goal progress',
    detail: 'Japan trip — 48% saved',
    when: '2 days ago',
    emoji: '✈️',
    color: '#FCE7F3',
  },
  {
    id: 'n4',
    title: 'Card used',
    detail: 'Travel card · Hotel Tokyo',
    when: '10 days ago',
    emoji: '💳',
    color: '#E0E7FF',
  },
];

export function getAccount(id: string | undefined): Account | undefined {
  return ACCOUNTS.find((a) => a.id === id);
}

export function getCard(id: string | undefined): Card | undefined {
  return CARDS.find((c) => c.id === id);
}

export function transactionsForAccount(id: AccountId): Transaction[] {
  return TRANSACTIONS.filter((t) => t.accountId === id);
}

export function transactionsForCard(id: CardId): Transaction[] {
  return TRANSACTIONS.filter((t) => t.cardId === id);
}
