// Product details data used by product-detail.html
// Each product has: name, category, image path, description, benefits list,
// usage tip, a quick fun/nutrition fact, and a general precaution note.

const productDetails = {

  "tulsi": {
    name: "Tulsi (Holy Basil)",
    category: "Herb",
    img: "img/product/HerbsSection/Tulsi.jpg",
    description: "Tulsi, also known as Holy Basil, is one of the most respected herbs in natural health practices. It is widely used to support the immune system and to help the body cope with everyday stress. In many households it is grown as a sacred plant and used daily in teas and home remedies.",
    benefits: [
      "Helps boost immunity and protect against infections",
      "Useful in relieving cold, cough and fever",
      "Helps reduce stress and supports mental wellness",
      "Contains natural antioxidants"
    ],
    usage: "Commonly consumed as fresh leaves, herbal tea, or as a supplement. Consult a healthcare provider for the right dosage.",
    quickFact: "Just 2-3 fresh Tulsi leaves chewed daily is a common traditional immunity ritual in many Indian homes.",
    precautions: "Generally safe in food amounts, but avoid high medicinal doses if pregnant, nursing, or on blood-thinning/diabetes medication without consulting a doctor."
  },

  "ginger": {
    name: "Ginger",
    category: "Herb",
    img: "img/product/HerbsSection/product_Ginger.jpg",
    description: "Ginger is a widely used natural remedy known for supporting digestion and easing common cold and cough symptoms. Its warming nature makes it a popular addition to teas during the winter and monsoon seasons.",
    benefits: [
      "Improves digestion and reduces bloating",
      "Helpful in weight control",
      "Relieves cold, cough and sore throat",
      "Has natural anti-inflammatory properties"
    ],
    usage: "Can be used fresh in cooking, as ginger tea, or as a supplement.",
    quickFact: "Ginger tea with a dash of honey is one of the most common home remedies for a sore throat.",
    precautions: "Large amounts may cause heartburn or stomach discomfort. People on blood thinners should consult a doctor before regular use."
  },

  "neem": {
    name: "Neem",
    category: "Herb",
    img: "img/product/HerbsSection/Neem.jpg",
    description: "Neem is a traditional herb known for purifying properties and its role in supporting healthy skin. It has been used for centuries in skincare routines and home remedies across South Asia.",
    benefits: [
      "Helps purify blood naturally",
      "Improves skin health and clarity",
      "Supports the body's natural detox process",
      "Has natural antibacterial properties"
    ],
    usage: "Available as neem leaves, powder, capsules, or oil for topical use.",
    quickFact: "Neem oil is a popular natural ingredient in soaps and skincare products because of its purifying reputation.",
    precautions: "Not recommended in medicinal doses for pregnant women or young children. Do a patch test before topical use to check for skin sensitivity."
  },

  "cinnamon": {
    name: "Cinnamon",
    category: "Herb",
    img: "img/product/HerbsSection/Cinnamon.jpg",
    description: "Cinnamon is a common kitchen spice that is also valued for helping to manage blood sugar levels as part of a balanced diet. Its warm aroma also makes it a favorite in teas and desserts.",
    benefits: [
      "Helps control blood sugar levels",
      "Supports healthy digestion",
      "Has natural anti-inflammatory properties",
      "Rich in antioxidants"
    ],
    usage: "Can be added to tea, warm milk, or sprinkled over food in moderate amounts.",
    quickFact: "A small pinch of cinnamon in your morning tea or coffee is an easy way to add it to your routine.",
    precautions: "Excess intake, especially of Cassia cinnamon, over a long period is not advised. Use in moderate, food-level amounts."
  },

  "giloy": {
    name: "Giloy",
    category: "Herb",
    img: "img/product/HerbsSection/Giloy.jpg",
    description: "Giloy is a well-known herb in traditional wellness practices, often used to support immunity, especially during fevers. It is commonly taken as a herbal decoction (kadha) during seasonal illness.",
    benefits: [
      "Helps reduce fever naturally",
      "Strengthens overall immunity",
      "Supports the body's detox process",
      "May help improve digestion"
    ],
    usage: "Commonly consumed as juice, powder, or herbal decoction (kadha).",
    quickFact: "Giloy is sometimes called 'Amrita' in traditional texts, meaning the root of immortality.",
    precautions: "Consult a doctor before use if you have an autoimmune condition, low blood sugar, or are on other medications."
  },

  "fennel": {
    name: "Fennel (Saunf)",
    category: "Herb",
    img: "img/product/HerbsSection/FennelSeeds.jpg",
    description: "Fennel seeds are a popular after-meal remedy known for easing digestion and freshening breath. They have a naturally sweet, aromatic flavor that makes them easy to include in daily meals.",
    benefits: [
      "Relieves gas and digestion related discomfort",
      "Helps freshen breath naturally",
      "May support healthy weight management",
      "Contains natural antioxidants"
    ],
    usage: "Chew a small amount after meals or brew as a herbal tea.",
    quickFact: "Fennel seeds are a common mouth-freshener served after meals at Indian restaurants.",
    precautions: "Generally safe in food amounts. Very high doses are not recommended during pregnancy without medical advice."
  },

  "isabgol": {
    name: "Isabgol (Psyllium Husk)",
    category: "Herb",
    img: "img/product/HerbsSection/Isabgol.jpeg",
    description: "Isabgol, or psyllium husk, is one of the best-known natural remedies for constipation and general gut health. Its high fiber content helps add bulk and ease bowel movement naturally.",
    benefits: [
      "Best natural remedy for constipation",
      "High in dietary fiber",
      "Supports overall digestive health",
      "May help maintain healthy cholesterol levels"
    ],
    usage: "Mix with a glass of water or milk and consume as advised, preferably before bedtime.",
    quickFact: "Isabgol absorbs water and swells up, which is why it should always be taken with plenty of liquid.",
    precautions: "Always take with enough water; taking it dry or with too little liquid can cause choking or blockage. Avoid if you have difficulty swallowing."
  },

  "triphala": {
    name: "Triphala",
    category: "Herb",
    img: "img/product/HerbsSection/triphla.jpg",
    description: "Triphala is a traditional blend of three fruits, well known for cleansing the digestive system naturally. It has been used for generations as a gentle, everyday wellness tonic.",
    benefits: [
      "Cleans the digestive system naturally",
      "Supports the body's detox process",
      "May help support eye health",
      "Rich in natural antioxidants"
    ],
    usage: "Usually taken as powder mixed with warm water, or as tablets/capsules.",
    quickFact: "Triphala literally means 'three fruits' and is made from Amla, Bibhitaki, and Haritaki.",
    precautions: "May have a mild laxative effect; start with a small amount. Avoid during pregnancy without medical guidance."
  },

  "garlic": {
    name: "Garlic",
    category: "Herb",
    img: "img/product/HerbsSection/garlic.jpeg",
    description: "Garlic is a widely used natural ingredient known to support heart health and healthy blood pressure levels. It has a strong flavor and aroma that comes from its natural sulfur compounds.",
    benefits: [
      "Helps support healthy blood pressure",
      "Supports heart health",
      "Boosts overall immunity",
      "Has natural antibacterial properties"
    ],
    usage: "Best consumed fresh, either raw or cooked, as part of daily meals.",
    quickFact: "Crushing or chopping garlic and letting it sit for a few minutes before cooking helps activate its beneficial compounds.",
    precautions: "May interact with blood-thinning medication. Avoid large raw doses on an empty stomach if you have a sensitive digestive system."
  },

  "turmeric": {
    name: "Turmeric",
    category: "Herb",
    img: "img/product/HerbsSection/product_Turmeric.jpg",
    description: "Turmeric is a powerful natural ingredient, widely valued for its antioxidant and immunity-boosting properties. Its active compound, curcumin, is the subject of a lot of ongoing wellness research.",
    benefits: [
      "Powerful natural antioxidant",
      "Boosts immunity",
      "Has natural anti-inflammatory properties",
      "Supports faster wound healing"
    ],
    usage: "Commonly used in cooking, or consumed as turmeric milk (haldi doodh).",
    quickFact: "Adding a pinch of black pepper to turmeric is a well-known trick that helps improve its absorption in the body.",
    precautions: "High supplemental doses may affect blood sugar or interact with blood thinners; use food-level amounts unless advised by a doctor."
  },

  "ashwagandha": {
    name: "Ashwagandha",
    category: "Herb",
    img: "img/product/HerbsSection/product_Ashwagandha.jpg",
    description: "Ashwagandha is a well-known adaptogenic herb, traditionally used to help the body manage stress and maintain energy levels. It has become popular worldwide as a natural wellness supplement.",
    benefits: [
      "Helps reduce stress naturally",
      "Improves immunity",
      "Supports energy and strength",
      "May support better sleep quality"
    ],
    usage: "Commonly available as powder or capsules; follow recommended dosage.",
    quickFact: "Ashwagandha's name comes from Sanskrit words meaning 'smell of horse', referring to both its root's scent and its traditional link to strength.",
    precautions: "Avoid during pregnancy and breastfeeding, and consult a doctor if you have thyroid issues or are on sedative medication."
  },

  "green-tea": {
    name: "Green Tea",
    category: "Herb",
    img: "img/product/HerbsSection/greenTea.jpg",
    description: "Green tea is a popular natural beverage known for boosting metabolism and supporting weight management. It is minimally processed, which helps it retain more natural antioxidants than other teas.",
    benefits: [
      "Boosts metabolism",
      "Supports healthy weight loss",
      "Rich in antioxidants",
      "May support heart health"
    ],
    usage: "Best consumed as a warm beverage, 1-2 cups a day.",
    quickFact: "Green tea naturally contains a small amount of caffeine, generally less than coffee or black tea.",
    precautions: "Contains caffeine, so avoid excess intake late in the day or if sensitive to caffeine. Limit intake during pregnancy."
  },

  "aloe-vera": {
    name: "Aloe Vera",
    category: "Herb",
    img: "img/product/HerbsSection/AloeVera.jpg",
    description: "Aloe Vera is widely used for its soothing properties, supporting both skin health and digestion. Its gel is a common natural ingredient in skincare products and home remedies.",
    benefits: [
      "Improves skin health and hydration",
      "Supports healthy digestion",
      "Has natural soothing properties",
      "Rich in vitamins and antioxidants"
    ],
    usage: "Used topically as gel for skin, or consumed as juice in moderate amounts.",
    quickFact: "Fresh Aloe Vera gel is often applied directly to minor sunburns for a soothing, cooling effect.",
    precautions: "Only use the inner gel, not the outer leaf latex, for oral consumption. Avoid oral use during pregnancy without medical advice."
  },

  "amla": {
    name: "Amla (Indian Gooseberry)",
    category: "Herb",
    img: "img/product/HerbsSection/amla.jpg",
    description: "Amla is one of the richest natural sources of Vitamin C, known for boosting immunity and supporting healthy skin and hair. It has a distinctive sour-tangy taste and is used in many traditional recipes.",
    benefits: [
      "Rich in Vitamin C",
      "Boosts immunity",
      "Improves digestion",
      "Supports healthy skin and hair"
    ],
    usage: "Can be eaten fresh, as juice, powder, or murabba (preserve).",
    quickFact: "Gram for gram, Amla contains far more Vitamin C than most citrus fruits like oranges.",
    precautions: "May have a mild acidic effect on an empty stomach for some people; those with acidity issues should consume in moderation."
  },

  "mint": {
    name: "Mint (Pudina)",
    category: "Herb",
    img: "img/product/HerbsSection/mint.jpg",
    description: "Mint is a refreshing herb known for aiding digestion and cooling the body naturally. Its fresh aroma also makes it a popular addition to summer drinks and chutneys.",
    benefits: [
      "Aids digestion",
      "Reduces acidity",
      "Keeps the body cool",
      "Freshens breath naturally"
    ],
    usage: "Used fresh in chutneys, juices, or brewed as mint tea.",
    quickFact: "Mint leaves are a key ingredient in many summer coolers because of their natural cooling sensation.",
    precautions: "Excess mint may worsen acid reflux in some individuals. Use in normal culinary amounts."
  },

  "apple": {
    name: "Apple",
    category: "Fruit",
    img: "img/product/FruitsSection/apple.jpg",
    description: "Apple is a widely loved fruit known for its role in supporting heart health and healthy blood sugar levels. It is naturally high in fiber, which helps you feel fuller for longer.",
    benefits: [
      "Good for heart health",
      "Supports healthy blood sugar levels",
      "Improves digestion",
      "Helps maintain a healthy weight"
    ],
    usage: "Best eaten fresh as a whole fruit, ideally with the skin on.",
    quickFact: "Most of an apple's fiber and antioxidants are concentrated in and just under its skin.",
    precautions: "Wash thoroughly before eating to remove surface residue, and avoid eating the seeds, which contain trace amounts of a natural toxin."
  },

  "guava": {
    name: "Guava",
    category: "Fruit",
    img: "img/product/FruitsSection/Guava.jpg",
    description: "Guava is rich in Vitamin C and is a great natural way to support immunity and digestion. It is also naturally high in dietary fiber compared to many other common fruits.",
    benefits: [
      "Rich in Vitamin C",
      "Boosts immunity",
      "Supports healthy digestion",
      "Good source of dietary fiber"
    ],
    usage: "Best eaten fresh, ripe and washed thoroughly.",
    quickFact: "One medium guava can contain more Vitamin C than several oranges combined.",
    precautions: "Wash well before eating; eating too many seeds at once may be harder to digest for some people."
  },

  "orange": {
    name: "Orange",
    category: "Fruit",
    img: "img/product/FruitsSection/Orange.jpg",
    description: "Orange is a citrus fruit well known for boosting immunity and helping fight common cold and flu symptoms. Its juicy segments make it a refreshing, hydrating snack.",
    benefits: [
      "Boosts immunity",
      "Helps fight cold and flu",
      "Improves skin health",
      "Rich in Vitamin C"
    ],
    usage: "Best consumed fresh as a fruit or freshly squeezed juice.",
    quickFact: "Eating the whole orange gives you more fiber than drinking only its juice.",
    precautions: "The acidity may bother sensitive teeth or stomachs; rinse mouth after eating if prone to acid sensitivity."
  },

  "strawberry": {
    name: "Strawberry",
    category: "Fruit",
    img: "img/product/FruitsSection/Strawberry.jpg",
    description: "Strawberries are rich in antioxidants and are known to support both skin and heart health. Despite their sweetness, they are relatively low in natural sugar compared to many other fruits.",
    benefits: [
      "Rich in antioxidants",
      "Improves skin health",
      "Supports heart health",
      "Good source of Vitamin C"
    ],
    usage: "Best eaten fresh, washed thoroughly before consumption.",
    quickFact: "Strawberries are technically not true berries botanically, but they're one of the most popular fruits worldwide.",
    precautions: "Wash thoroughly before eating, as strawberries can carry surface residue and are best eaten unpeeled."
  },

  "kiwi": {
    name: "Kiwi",
    category: "Fruit",
    img: "img/product/FruitsSection/kiwi.jpg",
    description: "Kiwi is a nutrient-dense fruit rich in antioxidants that supports immunity and digestion. Its bright green flesh and tiny edible seeds make it as fun to eat as it is nutritious.",
    benefits: [
      "Rich in antioxidants",
      "Boosts immunity",
      "Aids digestion",
      "Good source of Vitamin C and fiber"
    ],
    usage: "Best eaten fresh, sliced or peeled.",
    quickFact: "Kiwi skin is edible too, and eating it adds extra fiber, though most people prefer to peel it.",
    precautions: "Some people may have a mild allergic reaction to kiwi; try a small amount first if eating it for the first time."
  },

  "papaya": {
    name: "Papaya",
    category: "Fruit",
    img: "img/product/FruitsSection/papaya-fruit.jpg",
    description: "Papaya is known for supporting healthy digestion and is a good addition to a weight management diet. It contains natural enzymes that are often linked to easier digestion of proteins.",
    benefits: [
      "Improves digestion",
      "Supports weight management",
      "Good for skin health",
      "Rich in vitamins and enzymes"
    ],
    usage: "Best eaten fresh and ripe, in moderate portions.",
    quickFact: "Papaya contains an enzyme called papain, which is often used commercially to tenderize meat.",
    precautions: "Unripe or semi-ripe papaya should be avoided during pregnancy. Ripe papaya in moderate amounts is generally fine."
  },

  "pear": {
    name: "Pear",
    category: "Fruit",
    img: "img/product/FruitsSection/Pear.jpeg",
    description: "Pear is a high-fiber fruit that supports healthy digestion and heart health. Its mild sweetness and soft texture make it a gentle option for most digestive systems.",
    benefits: [
      "High in dietary fiber",
      "Aids digestion",
      "Supports heart health",
      "Helps maintain healthy blood sugar levels"
    ],
    usage: "Best eaten fresh as a whole fruit.",
    quickFact: "Most of a pear's fiber is in the skin, so eating it unpeeled offers more nutritional benefit.",
    precautions: "Wash thoroughly before eating whole with the skin on."
  },

  "fig": {
    name: "Fig (Anjeer)",
    category: "Fruit",
    img: "img/product/FruitsSection/fig.jpeg",
    description: "Figs are naturally sweet and are commonly used as a remedy for constipation due to their high fiber content. They can be enjoyed fresh in season or dried year-round.",
    benefits: [
      "Relieves constipation",
      "Rich in dietary fiber",
      "Supports bone health",
      "Good natural source of energy"
    ],
    usage: "Can be eaten fresh or dried, soaked overnight for easier digestion.",
    quickFact: "Dried figs are more calorie-dense than fresh figs, so portion size matters more with the dried version.",
    precautions: "Dried figs are higher in natural sugar; those managing blood sugar should eat them in moderation."
  },

  "banana": {
    name: "Banana",
    category: "Fruit",
    img: "img/product/FruitsSection/Banana1.jpg",
    description: "Banana is an energy-rich fruit known to support healthy blood pressure and muscle function. Its natural sugars combined with fiber make it a convenient, quick source of energy.",
    benefits: [
      "Provides instant energy",
      "Helps support healthy blood pressure",
      "Improves digestion",
      "Supports muscle health"
    ],
    usage: "Best eaten fresh as a whole fruit, ideal before or after physical activity.",
    quickFact: "Bananas are naturally rich in potassium, which is why they're a popular snack for athletes.",
    precautions: "People managing blood sugar or kidney conditions should be mindful of portion size due to natural sugar and potassium content."
  },

  "pomegranate": {
    name: "Pomegranate",
    category: "Fruit",
    img: "img/product/FruitsSection/Pomegranate.jpg",
    description: "Pomegranate is rich in antioxidants and is known for supporting healthy blood circulation and heart health. Its juicy seeds, called arils, are eaten whole for maximum benefit.",
    benefits: [
      "Improves blood circulation",
      "Rich in antioxidants",
      "Supports heart health",
      "Good source of Vitamin C"
    ],
    usage: "Best eaten fresh as seeds or as freshly squeezed juice.",
    quickFact: "A single pomegranate can contain several hundred juicy seeds, called arils.",
    precautions: "Pomegranate juice may interact with certain medications; check with a doctor if you're on regular prescription medicine."
  },

  "lemon": {
    name: "Lemon",
    category: "Fruit",
    img: "img/product/FruitsSection/lemon.jpg",
    description: "Lemon is a citrus fruit widely used to support weight loss and to help detoxify the body naturally. Its tangy flavor makes it a versatile addition to both food and drinks.",
    benefits: [
      "Helps support weight loss",
      "Rich in Vitamin C",
      "Supports natural detoxification",
      "Boosts immunity"
    ],
    usage: "Commonly consumed as warm lemon water, added to meals, or in beverages.",
    quickFact: "Lemon juice is often used as a natural substitute for vinegar in home cooking and cleaning.",
    precautions: "Its acidity can affect tooth enamel over time; it's best to rinse your mouth with water after drinking lemon water."
  },

  "watermelon": {
    name: "Watermelon",
    category: "Fruit",
    img: "img/product/FruitsSection/watermelon.jpeg",
    description: "Watermelon is a hydrating fruit that supports skin health and can be a helpful part of a weight management plan. Its high water content makes it especially refreshing in hot weather.",
    benefits: [
      "Hydrates the body",
      "Supports healthy weight management",
      "Improves skin health",
      "Low in calories, high in water content"
    ],
    usage: "Best eaten fresh and chilled as a whole fruit or in fruit salads.",
    quickFact: "Watermelon is made up of about 90% water, making it one of the most hydrating fruits around.",
    precautions: "Those managing blood sugar should be mindful of portion size, as watermelon has a naturally high glycemic index despite being low in calories."
  }

};
