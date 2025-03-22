
// Types for our data
export interface Ingredient {
  ingredient_name: string;
  background: string;
  usage: string;
  other_names: string[];
  side_effects: string[];
  concerns: string[];
  safe: "safe" | "caution" | "beware";
}

export interface UserProfile {
  name: string;
  allergies: string[];
  medical_conditions: string[];
}

// Sample ingredient data
export const mockIngredients: Ingredient[] = [
  {
    ingredient_name: "Hyaluronic Acid",
    background: "Naturally occurring substance in the human body, particularly concentrated in skin, joints, and eyes. First isolated in 1934 by Karl Meyer.",
    usage: "Hydrating agent and humectant that attracts and retains moisture in the skin.",
    other_names: ["Sodium Hyaluronate", "Hydrolyzed Hyaluronic Acid", "HA"],
    side_effects: ["Rarely causes irritation", "Can cause dryness if used in very dry environments"],
    concerns: ["No major concerns", "Generally recognized as safe"],
    safe: "safe"
  },
  {
    ingredient_name: "Salicylic Acid",
    background: "Beta hydroxy acid derived from willow bark. Has been used medicinally for thousands of years, with ancient civilizations using willow bark tea for pain relief.",
    usage: "Exfoliates inside pores to treat and prevent acne, reduces inflammation and oil production.",
    other_names: ["BHA", "2-Hydroxybenzoic Acid", "Betaine Salicylate"],
    side_effects: ["Dryness", "Peeling", "Irritation", "Sensitivity to sunlight"],
    concerns: ["Not recommended during pregnancy", "Can be too harsh for sensitive skin"],
    safe: "caution"
  },
  {
    ingredient_name: "Hydroquinone",
    background: "Synthetic compound first used medically in the 1960s as a skin-lightening agent. It works by inhibiting the enzyme tyrosinase needed for melanin production.",
    usage: "Skin lightening agent that reduces hyperpigmentation, dark spots, and melasma.",
    other_names: ["1,4-Benzenediol", "Quinol", "Dihydroxybenzene"],
    side_effects: ["Irritation", "Redness", "Dryness", "Possible blue-black darkening with prolonged use"],
    concerns: ["Banned in many countries", "Possible carcinogen", "Not for long-term use", "Requires medical supervision"],
    safe: "beware"
  },
  {
    ingredient_name: "Niacinamide",
    background: "Form of vitamin B3 essential for cellular health. First isolated in the early 1900s from rice bran.",
    usage: "Improves skin barrier function, reduces inflammation, minimizes pores, and evens skin tone.",
    other_names: ["Vitamin B3", "Nicotinamide", "Nicotinic Acid Amide"],
    side_effects: ["Rarely causes mild flushing or redness"],
    concerns: ["Generally well-tolerated even by sensitive skin"],
    safe: "safe"
  },
  {
    ingredient_name: "Retinol",
    background: "Form of vitamin A first isolated in 1913. Revolutionized skincare in the 1970s when its benefits for skin were discovered.",
    usage: "Promotes cell turnover, stimulates collagen production, reduces fine lines and hyperpigmentation.",
    other_names: ["Vitamin A", "Retinoid", "Retinyl Palmitate"],
    side_effects: ["Dryness", "Peeling", "Redness", "Irritation", "Increased sun sensitivity"],
    concerns: ["Not recommended during pregnancy", "Can be irritating for beginners or sensitive skin"],
    safe: "caution"
  }
];

// Sample user profile data
export const defaultUserProfile: UserProfile = {
  name: "Guest User",
  allergies: [],
  medical_conditions: []
};
