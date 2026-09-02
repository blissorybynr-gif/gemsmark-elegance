export type Blog = {
  slug: string;
  title: string;
  stone: string;
  birthstone?: string;
  excerpt: string;
  body: string[];
  image: string;
};

const img = (id: string) => `https://i.etsystatic.com/62419654/r/il/${id}`;

export const blogs: Blog[] = [
  {
    slug: "amethyst",
    title: "Amethyst: The Regal Purple Quartz",
    stone: "Amethyst",
    birthstone: "February",
    excerpt:
      "A rich purple quartz long associated with calm, clarity and protection — once considered as precious as diamonds and rubies.",
    body: [
      "A rich purple quartz, amethyst has long been associated with calm, clarity, and protection. It was once considered as precious as diamonds and rubies, worn by royalty and clergy alike.",
      "Today it remains one of the most popular gemstones for rings thanks to its deep, regal color that pairs beautifully with the cool tone of silver.",
    ],
    image: img("53d9d1/7957639660/il_794xN.7957639660_5ezm.jpg"),
  },
  {
    slug: "moonstone",
    title: "Moonstone: Shimmer, Intuition and New Beginnings",
    stone: "Moonstone",
    birthstone: "June (alternate)",
    excerpt:
      "A soft, glowing shimmer that shifts as it catches the light — a quality known as adularescence.",
    body: [
      "Moonstone has a soft, glowing shimmer that seems to shift as it catches the light — a quality known as \"adularescence\".",
      "It's often linked to intuition, balance, and new beginnings, making it a popular choice for meaningful gifts. Its milky, ethereal look feels especially at home in silver settings.",
    ],
    image: img("46fab6/8506676787/il_794xN.8506676787_9tut.jpg"),
  },
  {
    slug: "turquoise",
    title: "Turquoise: One of the Oldest Gemstones in Jewelry",
    stone: "Turquoise",
    birthstone: "December",
    excerpt:
      "A distinctive blue-green stone treasured across cultures for thousands of years, from ancient Egypt to the American Southwest.",
    body: [
      "One of the oldest gemstones used in jewelry, turquoise has a distinctive blue-green color that has been treasured across cultures for thousands of years — from ancient Egypt to the Southwestern United States.",
      "It's often associated with protection and good fortune, and its earthy color makes it a striking contrast against polished silver.",
    ],
    image: img("f69ca4/8453805946/il_794xN.8453805946_jh7o.jpg"),
  },
  {
    slug: "garnet",
    title: "Garnet: Deep Red Warmth and Safe Travels",
    stone: "Garnet",
    birthstone: "January",
    excerpt:
      "Best known for its deep red tone, garnet also occurs in green, orange and purple — and was believed to protect travelers.",
    body: [
      "Best known for its deep red tone, garnet actually comes in a range of colors, including green, orange, and purple.",
      "Historically it was believed to protect travelers and symbolize friendship and trust. Its warm, wine-like color offers a beautiful contrast to the coolness of silver.",
    ],
    image: img("f24289/7929820019/il_794xN.7929820019_pe5v.jpg"),
  },
  {
    slug: "citrine",
    title: "Citrine: The Stone of Light",
    stone: "Citrine",
    excerpt:
      "A warm yellow-to-orange hue associated with positivity, warmth and abundance.",
    body: [
      "With its warm yellow-to-orange hue, citrine is often called the \"stone of light\" and is associated with positivity, warmth, and abundance.",
      "It's a durable, affordable alternative to yellow diamonds and adds a sunny pop of color to any ring design.",
    ],
    image: img("945768/7948296817/il_794xN.7948296817_c148.jpg"),
  },
  {
    slug: "peridot",
    title: "Peridot: Born in the Earth's Mantle",
    stone: "Peridot",
    birthstone: "August",
    excerpt:
      "A fresh, lime-green stone formed deep within the earth's mantle and prized since ancient times.",
    body: [
      "Peridot's fresh, lime-green color makes it instantly recognizable. Formed deep within the earth's mantle, this stone has been prized since ancient times and is thought to bring good health and restful sleep.",
      "It looks especially vivid set against bright, polished silver.",
    ],
    image: img("53d9d1/7957639660/il_794xN.7957639660_5ezm.jpg"),
  },
  {
    slug: "aquamarine",
    title: "Aquamarine: Water of the Sea",
    stone: "Aquamarine",
    birthstone: "March",
    excerpt:
      "A soft, clear blue reminiscent of ocean shallows — traditionally linked to calm, courage and clear communication.",
    body: [
      "Named after the Latin words for \"water of the sea\", aquamarine has a soft, clear blue tone reminiscent of ocean shallows.",
      "It's traditionally been associated with calm, courage, and clear communication — a gentle, elegant stone for everyday wear.",
    ],
    image: img("46fab6/8506676787/il_794xN.8506676787_9tut.jpg"),
  },
  {
    slug: "rose-quartz",
    title: "Rose Quartz: The Stone of Unconditional Love",
    stone: "Rose Quartz",
    excerpt:
      "Soft pink and slightly translucent — a romantic choice for anniversaries and special occasions.",
    body: [
      "Known as the stone of unconditional love, rose quartz has a soft pink, slightly translucent appearance.",
      "It's a gentle, romantic choice for rings and a popular gift for anniversaries or special occasions.",
    ],
    image: img("782e79/7947439516/il_794xN.7947439516_l2gk.jpg"),
  },
  {
    slug: "labradorite",
    title: "Labradorite: Flashes of Blue, Green and Gold",
    stone: "Labradorite",
    excerpt:
      "Prized for labradorescence — flashes of colour that appear and disappear as the stone moves in the light.",
    body: [
      "Labradorite is prized for its \"labradorescence\" — flashes of blue, green, and gold that seem to appear and disappear as the stone moves in the light.",
      "Its mysterious, ever-changing sheen makes it a favorite for those who want a truly one-of-a-kind piece.",
    ],
    image: img("db28cc/8458863306/il_794xN.8458863306_2opz.jpg"),
  },
  {
    slug: "opal",
    title: "Opal: A Play of Colour Unlike Any Other",
    stone: "Opal",
    birthstone: "October",
    excerpt:
      "Tiny flashes of rainbow hues shift within the stone — no two opals look exactly alike.",
    body: [
      "Opal is famous for its play of color — tiny flashes of rainbow hues shifting within the stone. No two opals look exactly alike, making each ring genuinely unique.",
      "It's associated with creativity, inspiration, and hope.",
    ],
    image: img("945768/7948296817/il_794xN.7948296817_c148.jpg"),
  },
  {
    slug: "topaz",
    title: "Topaz: Strength, Confidence and Clarity",
    stone: "Topaz",
    birthstone: "November (alternate)",
    excerpt:
      "Available in a wide range of colours, with blue and golden tones among the most popular for jewelry.",
    body: [
      "Topaz is available in a wide range of colors, though blue and golden tones are among the most popular for jewelry.",
      "It's associated with strength and confidence, and its clarity gives it a bright, polished look in silver settings.",
    ],
    image: img("f4102d/8009432199/il_794xN.8009432199_6m21.jpg"),
  },
  {
    slug: "agate",
    title: "Agate: Natural Bands, Grounding Energy",
    stone: "Agate",
    excerpt:
      "Striking natural bands and patterns — no two agate stones ever look exactly alike.",
    body: [
      "Agate is known for its striking natural bands and patterns, with no two stones ever looking exactly alike. It comes in a wide range of colors, from earthy browns and greys to deep reds and blues.",
      "It's often associated with strength, balance, and grounding energy, and its unique, layered look makes every ring feel truly one-of-a-kind.",
    ],
    image: img("3cd3d0/7607356455/il_794xN.7607356455_kvha.jpg"),
  },
  {
    slug: "emerald",
    title: "Emerald: Wisdom, Growth and Renewal",
    stone: "Emerald",
    birthstone: "May",
    excerpt:
      "A deep, saturated green treasured throughout history and worn by royalty.",
    body: [
      "Emerald's deep, saturated green has made it one of the most treasured gemstones throughout history, worn by royalty and associated with wisdom, growth, and renewal.",
      "Its rich color makes a striking statement in silver settings, especially for those drawn to bold, classic jewelry.",
    ],
    image: img("6de45b/8463562170/il_794xN.8463562170_ta5t.jpg"),
  },
  {
    slug: "dur-e-najaf",
    title: "Dur-e-Najaf: A Stone of Peace and Blessing",
    stone: "Dur e Najaf",
    excerpt:
      "A translucent white-to-grey stone with a soft, glass-like shimmer and deep spiritual significance.",
    body: [
      "Dur-e-Najaf is a beloved translucent white-to-grey stone with a soft, glass-like shimmer, historically sourced near Najaf, Iraq.",
      "It holds deep spiritual and cultural significance, particularly in South Asian and Shia Muslim traditions, and is commonly worn as a ring stone believed to bring peace, protection, and blessings to its wearer. Its gentle, understated glow pairs beautifully with silver.",
    ],
    image: img("db28cc/8458863306/il_794xN.8458863306_2opz.jpg"),
  },
  {
    slug: "ruby",
    title: "Ruby: Passion, Protection and Vitality",
    stone: "Ruby",
    birthstone: "July",
    excerpt:
      "A vivid red symbol of passion and vitality — and one of the most durable gemstones for everyday wear.",
    body: [
      "Ruby's vivid red color has made it a symbol of passion, protection, and vitality for centuries.",
      "As one of the most durable gemstones, it holds up well to everyday wear, and its bold color makes it a popular choice for both engagement-style rings and statement pieces.",
    ],
    image: img("f4102d/8009432199/il_794xN.8009432199_6m21.jpg"),
  },
  {
    slug: "sapphire",
    title: "Sapphire: Wisdom, Loyalty and Nobility",
    stone: "Sapphire",
    birthstone: "September",
    excerpt:
      "Most associated with deep blue, but also found in pink, yellow and white — hard-wearing and timeless.",
    body: [
      "While most associated with deep blue, sapphire also occurs in shades of pink, yellow, and white.",
      "It has long symbolized wisdom, loyalty, and nobility, and its hardness and durability make it an excellent choice for rings meant for daily wear.",
    ],
    image: img("51519a/7637528036/il_794xN.7637528036_jath.jpg"),
  },
  {
    slug: "black-onyx",
    title: "Black Onyx: Bold, Modern Contrast",
    stone: "Black Onyx",
    excerpt:
      "A deep, solid black that offers bold contrast against silver — grounding and protective.",
    body: [
      "With its deep, solid black color, onyx offers a bold, modern contrast to silver.",
      "It's often associated with strength, protection, and grounding energy, making it a popular choice for both minimalist and statement rings.",
    ],
    image: img("3cd3d0/7607356455/il_794xN.7607356455_kvha.jpg"),
  },
  {
    slug: "caring-for-gemstone-silver-rings",
    title: "Caring for Gemstone Silver Rings",
    stone: "Care Guide",
    excerpt:
      "However captivating a gemstone is, it needs a little care to stay that way. Five simple habits keep your ring looking new.",
    body: [
      "Avoid harsh chemicals — remove rings before applying perfume, lotion, or cleaning products.",
      "Store separately — keep gemstone rings in a soft pouch or lined box to prevent scratching.",
      "Clean gently — use a soft, dry cloth for silver, and a mild soap-and-water solution for most stones (avoid this for porous stones like turquoise and opal).",
      "Take off before activities — remove rings before swimming, exercising, or doing housework to protect both the stone and the setting.",
      "Get periodic checks — have prongs and settings checked occasionally to make sure stones stay secure.",
      "Whether you're drawn to the calm of moonstone, the warmth of citrine, or the ever-changing shimmer of labradorite, there's a gemstone to match every personality and occasion. Browse our collection to find the silver ring that speaks to you — or reach out if you'd like a custom piece made with your favorite stone.",
    ],
    image: img("f69ca4/8453805946/il_794xN.8453805946_jh7o.jpg"),
  },
];

export const getBlog = (slug: string) => blogs.find((b) => b.slug === slug);
