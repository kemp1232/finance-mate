export const DEFAULT_CATEGORY_NAMES = [
  "Food",
  "Coffee",
  "Groceries",
  "Transportation",
  "Shopping",
  "Bills",
  "Health",
  "Entertainment",
  "Travel",
  "Subscriptions",
  "Income",
  "Other",
] as const;

export type DefaultCategoryName = (typeof DEFAULT_CATEGORY_NAMES)[number];
