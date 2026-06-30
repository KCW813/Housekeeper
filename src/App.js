import { useState, useEffect } from "react";

// ─── Default data ─────────────────────────────────────────────────────────────
const DEFAULT_PROFILE = {
  housekeeperName: "Yuri",
  housekeeperDays: ["Monday", "Thursday"],
  familyMembers: "Husband, two college-age boys home for summer",
  dietaryNotes: "No shellfish. Boys love hearty portions. Husband prefers lighter dinners.",
  standardTasks: "Full laundry, vacuum all rooms, mop kitchen and bathroom floors, clean bathrooms, wipe counters",
  extraNotes: "Boys tend to leave dishes in their rooms. Summer means more outdoor entertaining.",
};

const DEFAULT_RECIPES = [
  {
    id: "r1",
    name: "Lemon Herb Roasted Chicken",
    category: "Poultry",
    cookTime: "1 hr 15 min",
    notes: "Family favorite. Serve with roasted potatoes.",
    ingredients: "whole chicken, lemons, rosemary, thyme, garlic, olive oil, potatoes, green beans",
    detailedIngredients: [
      "1 whole chicken (4–5 lbs)",
      "2 lemons — 1 thinly sliced, 1 halved",
      "4 cloves garlic, minced",
      "3 tbsp olive oil, divided",
      "2 tsp fresh rosemary, finely chopped",
      "2 tsp fresh thyme leaves",
      "1½ tsp kosher salt",
      "½ tsp black pepper",
      "1½ lbs baby potatoes, halved",
      "½ lb green beans, trimmed",
    ],
    instructions: [
      "Preheat oven to 425°F. Pat the chicken completely dry inside and out with paper towels — this is the key to crispy skin.",
      "Mix olive oil, garlic, rosemary, thyme, salt, and pepper in a small bowl. Rub the mixture all over the chicken and under the skin on the breast.",
      "Stuff the cavity with the halved lemon and any leftover herb sprigs. Tie the legs together with kitchen twine if you have it.",
      "Toss potatoes with a drizzle of olive oil, salt, and pepper. Spread them in a single layer in a large roasting pan.",
      "Set the chicken on top of the potatoes, breast-side up. Lay lemon slices over the breast.",
      "Roast at 425°F for 30 minutes, then reduce the temperature to 375°F.",
      "At the 45-minute mark, add green beans to the pan around the potatoes, tossing them in the pan juices.",
      "Continue roasting until a thermometer in the thickest part of the thigh reads 165°F — about 1 hour 15 minutes total. The juices should run clear.",
      "Rest the chicken on a cutting board for 10 minutes before carving. Serve with the roasted vegetables and spoon the pan juices over everything.",
    ],
    tips: "The drier the chicken before seasoning, the crispier the skin. You can season the bird up to 24 hours ahead and leave it uncovered in the fridge — it tastes even better. Leftovers make great sandwiches or chicken salad.",
  },
  {
    id: "r2",
    name: "Pasta Bolognese",
    category: "Pasta",
    cookTime: "1 hr",
    notes: "Boys love this. Make a double batch.",
    ingredients: "ground beef, crushed tomatoes, onion, carrots, celery, red wine, spaghetti, parmesan",
    detailedIngredients: [
      "1 lb ground beef (80/20)",
      "1 lb spaghetti",
      "1 can (28 oz) crushed tomatoes",
      "1 medium onion, finely diced",
      "2 medium carrots, finely diced",
      "2 stalks celery, finely diced",
      "4 cloves garlic, minced",
      "2 tbsp tomato paste",
      "½ cup dry red wine",
      "½ cup whole milk",
      "2 tbsp olive oil",
      "1 tsp salt, plus more to taste",
      "½ tsp black pepper",
      "½ tsp dried oregano",
      "Parmesan cheese, freshly grated, for serving",
    ],
    instructions: [
      "Heat olive oil in a large heavy pot over medium heat. Add onion, carrots, and celery. Cook, stirring often, for 8–10 minutes until very soft.",
      "Add garlic and tomato paste. Cook 2 minutes, stirring constantly.",
      "Increase heat to medium-high. Add ground beef and break it apart. Cook until no pink remains, about 8 minutes. Drain excess fat if needed.",
      "Pour in red wine. Stir and cook until mostly evaporated, about 3–4 minutes.",
      "Add crushed tomatoes, salt, pepper, and oregano. Stir well to combine.",
      "Reduce heat to low. Partially cover and simmer 45 minutes, stirring every 10–15 minutes.",
      "Stir in the milk and simmer uncovered 10 more minutes. Taste and adjust salt.",
      "Cook spaghetti in heavily salted boiling water until al dente per package directions. Before draining, scoop out 1 cup of pasta water.",
      "Drain pasta and toss with the sauce, adding splashes of reserved pasta water as needed to loosen. Serve topped with freshly grated Parmesan.",
    ],
    tips: "This doubles easily — make a full double batch and freeze half in zip-lock bags for up to 3 months. The milk is not a mistake; it mellows the acidity and makes the sauce silky. The sauce tastes even better the next day.",
  },
  {
    id: "r3",
    name: "BBQ Pulled Pork",
    category: "Pork",
    cookTime: "8 hrs slow cooker",
    notes: "Start early morning. Serve with coleslaw and buns.",
    ingredients: "pork shoulder, BBQ sauce, brown sugar, apple cider vinegar, garlic powder, onion powder, buns, coleslaw mix",
    detailedIngredients: [
      "4–5 lbs pork shoulder (Boston butt), bone-in or boneless",
      "1½ cups BBQ sauce, plus more for serving",
      "2 tbsp brown sugar",
      "¼ cup apple cider vinegar",
      "1 tsp garlic powder",
      "1 tsp onion powder",
      "1 tsp smoked paprika",
      "1½ tsp salt",
      "½ tsp black pepper",
      "½ cup chicken broth",
      "8 brioche or hamburger buns",
      "1 bag (16 oz) coleslaw mix",
      "½ cup mayonnaise",
      "1 tbsp sugar",
      "Salt and pepper to taste",
    ],
    instructions: [
      "START EARLY — at least 8 hours before dinner. Mix brown sugar, garlic powder, onion powder, smoked paprika, salt, and pepper. Rub all over the pork shoulder.",
      "Place pork in the slow cooker. Pour chicken broth and 2 tbsp apple cider vinegar around (not over) the pork. Do not add BBQ sauce yet.",
      "Cook on LOW for 8–10 hours (or HIGH for 5–6 hours) until the meat falls apart when poked with a fork.",
      "About 30 minutes before serving, make the coleslaw: combine coleslaw mix, mayonnaise, remaining apple cider vinegar, sugar, salt, and pepper. Toss well and refrigerate.",
      "Transfer pork to a large cutting board. Use two forks to shred all the meat, discarding large fat pieces and bones.",
      "Skim excess fat from the slow cooker juices. Return shredded pork to the juices and stir in BBQ sauce.",
      "Cook on HIGH for 20–30 more minutes with the lid off to let flavors meld.",
      "Toast buns if desired. Pile pulled pork on buns and top with coleslaw. Set out extra BBQ sauce for the table.",
    ],
    tips: "START THIS BEFORE 9am for a 6pm dinner. The pork can stay on the WARM setting for up to 2 hours after cooking. Leftovers freeze perfectly in zip-lock bags for up to 3 months. Add ½ tsp liquid smoke to the slow cooker for extra smoky flavor.",
  },
  {
    id: "r4",
    name: "Sheet Pan Salmon",
    category: "Fish",
    cookTime: "20 min",
    notes: "Great lighter option. Good for Thursdays.",
    ingredients: "salmon fillets, asparagus, lemon, olive oil, dill, garlic, capers",
    detailedIngredients: [
      "4 salmon fillets (6 oz each), skin-on",
      "1 lb asparagus, tough ends snapped off",
      "1 lemon — half sliced into thin rounds, half for juice",
      "3 tbsp olive oil, divided",
      "3 cloves garlic, minced",
      "2 tbsp fresh dill, chopped (or 1 tsp dried)",
      "2 tbsp capers, drained",
      "Zest of ½ lemon",
      "1 tsp salt, divided",
      "½ tsp black pepper, divided",
    ],
    instructions: [
      "Preheat oven to 400°F. Line a large sheet pan with parchment paper or foil.",
      "Toss asparagus with 1½ tbsp olive oil, ½ tsp salt, and ¼ tsp pepper. Spread in a single layer on one side of the pan.",
      "Place salmon fillets skin-side down on the other side of the pan, leaving a little space between each fillet.",
      "Mix the remaining 1½ tbsp olive oil, garlic, dill, capers, lemon zest, and a squeeze of lemon juice in a small bowl. Spoon evenly over each salmon fillet.",
      "Lay lemon rounds on top of the salmon. Season everything with remaining salt and pepper.",
      "Roast at 400°F for 12–15 minutes, until the salmon flakes easily with a fork and the asparagus is tender-crisp.",
      "Serve immediately with extra lemon wedges for squeezing.",
    ],
    tips: "Don't overcook — salmon is done when it just starts to flake. Check at 12 minutes. Leftovers are excellent served cold over a green salad the next day. This is the quickest dinner on the menu, ideal for a busy Thursday.",
  },
  {
    id: "r5",
    name: "Chicken Tacos",
    category: "Mexican",
    cookTime: "25 min",
    notes: "Casual and crowd-pleasing. Set out all toppings.",
    ingredients: "chicken thighs, taco seasoning, tortillas, avocado, salsa, shredded cheese, sour cream, lime, cilantro",
    detailedIngredients: [
      "2 lbs boneless, skinless chicken thighs",
      "2 tbsp taco seasoning (store-bought is fine)",
      "2 tbsp olive oil",
      "1 tsp salt",
      "12 small flour or corn tortillas",
      "2 ripe avocados, sliced or mashed",
      "1 cup salsa or fresh pico de gallo",
      "1½ cups shredded Mexican-blend cheese",
      "1 cup sour cream",
      "2 limes, cut into wedges",
      "½ cup fresh cilantro, roughly chopped",
      "Optional: shredded lettuce, sliced jalapeños, hot sauce",
    ],
    instructions: [
      "Pat chicken thighs dry with paper towels. Sprinkle taco seasoning and salt over both sides, pressing to help it stick.",
      "Heat olive oil in a large skillet over medium-high heat. Add chicken thighs in a single layer (cook in batches if they don't all fit).",
      "Cook 5–6 minutes per side without moving, until cooked through and well browned. Internal temperature should reach 165°F.",
      "Transfer chicken to a cutting board and let rest 5 minutes, then chop or shred into bite-sized pieces.",
      "Warm tortillas: wrap a stack in a damp paper towel and microwave 60–90 seconds, or heat each one in a dry skillet for 30 seconds per side.",
      "Set up a taco bar: arrange all toppings in separate bowls — avocado, salsa, cheese, sour cream, cilantro, lime wedges, and any extras.",
      "Serve the chicken in the skillet or a bowl and let everyone build their own tacos.",
    ],
    tips: "Lay out all toppings buffet-style — the family loves building their own. The chicken can be cooked and chopped up to 2 hours ahead; store covered in the fridge and rewarm in the skillet with a splash of chicken broth before serving. Flour tortillas hold together better with heavy fillings; corn tortillas are more authentic.",
  },
  {
    id: "r6",
    name: "Beef Stir Fry",
    category: "Asian",
    cookTime: "20 min",
    notes: "Quick weeknight option. Serve over rice.",
    ingredients: "flank steak, broccoli, bell peppers, snap peas, soy sauce, ginger, garlic, sesame oil, rice",
    detailedIngredients: [
      "1½ lbs flank steak, sliced very thin against the grain",
      "1 tbsp cornstarch",
      "2 cups broccoli florets",
      "1 red bell pepper, thinly sliced",
      "1 cup snap peas, strings removed",
      "3 cloves garlic, minced",
      "1 tbsp fresh ginger, grated",
      "3 tbsp soy sauce",
      "2 tbsp oyster sauce",
      "1 tbsp sesame oil",
      "2 tbsp vegetable oil, divided",
      "2 cups jasmine rice",
      "Sesame seeds and sliced green onions for garnish",
    ],
    instructions: [
      "Start the rice: combine 2 cups rice with 3 cups water in a pot, bring to a boil, then reduce to the lowest heat, cover, and cook 18 minutes. Keep covered and off heat until serving.",
      "Slice the steak very thin (about ¼ inch thick) against the grain — freezing it for 20 minutes first makes this easier. Toss with cornstarch and 1 tbsp soy sauce. Let sit 10 minutes.",
      "Mix remaining 2 tbsp soy sauce, oyster sauce, and sesame oil together in a small bowl. Set aside.",
      "Heat a large wok or wide skillet over the highest heat possible until it just starts to smoke. Add 1 tbsp vegetable oil.",
      "Add beef in a single layer. Do NOT stir for 1 full minute — let it sear and get brown. Then stir-fry 1–2 minutes more until just cooked through. Remove beef to a plate.",
      "Add remaining 1 tbsp oil to the wok. Add broccoli and bell pepper. Stir-fry 3 minutes over high heat.",
      "Add snap peas, garlic, and ginger. Stir-fry 1 minute more until fragrant.",
      "Return beef to the wok. Pour the sauce over everything. Toss together over high heat for 30–60 seconds until everything is coated and glossy.",
      "Serve immediately over rice. Garnish with sesame seeds and green onions.",
    ],
    tips: "The secret to stir-fry is very high heat — do not turn it down. Have every ingredient prepped and within arm's reach before you start cooking because it moves fast. Slicing the beef while slightly frozen makes thin slices much easier. For extra heat, add ½ tsp chili flakes with the garlic.",
  },
  {
    id: "r7",
    name: "Chicken Soup",
    category: "Soup",
    cookTime: "1 hr 30 min",
    notes: "Great for making ahead. Freezes beautifully.",
    ingredients: "whole chicken, carrots, celery, onion, garlic, chicken broth, egg noodles, parsley, bay leaves",
    detailedIngredients: [
      "1 whole chicken (about 4 lbs), or 3 lbs bone-in, skin-on chicken pieces",
      "3 large carrots, peeled and diced",
      "4 stalks celery, diced",
      "1 large onion, diced",
      "5 cloves garlic, minced",
      "8 cups chicken broth",
      "2 bay leaves",
      "1 tsp dried thyme",
      "1½ tsp salt, plus more to taste",
      "½ tsp black pepper",
      "8 oz wide egg noodles",
      "½ cup fresh parsley, chopped",
      "1 tbsp olive oil",
    ],
    instructions: [
      "Heat olive oil in a large stockpot over medium heat. Add onion, carrots, and celery. Cook 7–8 minutes, stirring occasionally, until softened.",
      "Add garlic and cook 1 minute more, stirring constantly.",
      "Add the whole chicken (or pieces), broth, bay leaves, thyme, salt, and pepper. Bring to a boil.",
      "Reduce heat to low. Use a spoon to skim off any foam that rises to the surface in the first few minutes.",
      "Cover and simmer on low for 1 hour, until the chicken is very tender and nearly falling off the bone.",
      "Remove the chicken to a cutting board. Let it cool for 10–15 minutes until cool enough to handle. Remove and discard the skin, bones, and bay leaves.",
      "Shred or chop the chicken meat into bite-sized pieces.",
      "Bring the pot back to a medium simmer. Add egg noodles and cook according to package directions, usually 7–9 minutes.",
      "Stir in the shredded chicken and fresh parsley. Taste and adjust salt. Serve hot.",
    ],
    tips: "Freeze this soup without the noodles — they get mushy when frozen. Add fresh noodles when reheating. Freezes for up to 3 months in zip-lock bags. A double batch takes barely more time and is absolutely worth it. The soup thickens as it sits; add a splash of broth when reheating.",
  },
];

const TASK_LIBRARY = [
  {
    category: "Laundry",
    tasks: [
      { id: "tl-l1", text: "Full laundry — all bedrooms" },
      { id: "tl-l2", text: "Wash and fold bedding" },
      { id: "tl-l3", text: "Iron clothing as needed" },
      { id: "tl-l4", text: "Wash and dry towels" },
      { id: "tl-l5", text: "Put away all folded laundry" },
    ],
  },
  {
    category: "Kitchen",
    tasks: [
      { id: "tl-k1", text: "Wipe down counters and appliances" },
      { id: "tl-k2", text: "Clean out refrigerator" },
      { id: "tl-k3", text: "Empty and reset dishwasher" },
      { id: "tl-k4", text: "Mop kitchen floor" },
      { id: "tl-k5", text: "Clean stovetop and oven exterior" },
      { id: "tl-k6", text: "Wipe cabinet fronts and drawer handles" },
    ],
  },
  {
    category: "Bathrooms",
    tasks: [
      { id: "tl-b1", text: "Scrub all bathrooms" },
      { id: "tl-b2", text: "Restock soap and paper goods" },
      { id: "tl-b3", text: "Clean mirrors and fixtures" },
      { id: "tl-b4", text: "Scrub toilets and sinks" },
      { id: "tl-b5", text: "Wash bath mats" },
    ],
  },
  {
    category: "Living Areas",
    tasks: [
      { id: "tl-v1", text: "Vacuum all rooms" },
      { id: "tl-v2", text: "Dust surfaces and shelves" },
      { id: "tl-v3", text: "Vacuum stairs" },
      { id: "tl-v4", text: "Clean windows — interior" },
      { id: "tl-v5", text: "Wipe down baseboards" },
      { id: "tl-v6", text: "Tidy common areas and put items away" },
    ],
  },
  {
    category: "Bedrooms",
    tasks: [
      { id: "tl-r1", text: "Make all beds" },
      { id: "tl-r2", text: "Tidy and organize closets" },
      { id: "tl-r3", text: "Vacuum bedroom floors" },
      { id: "tl-r4", text: "Collect and remove dishes from bedrooms" },
      { id: "tl-r5", text: "Dust ceiling fans in bedrooms" },
    ],
  },
  {
    category: "Outdoor & Seasonal",
    tasks: [
      { id: "tl-o1", text: "Wipe down patio furniture" },
      { id: "tl-o2", text: "Sweep porch and entryway" },
      { id: "tl-o3", text: "Clean ceiling fans" },
      { id: "tl-o4", text: "Wipe sliding glass doors — inside and out" },
      { id: "tl-o5", text: "Sweep and hose down patio" },
      { id: "tl-o6", text: "Shake out and clean doormats" },
    ],
  },
  {
    category: "Meal Prep",
    tasks: [
      { id: "tl-m1", text: "Prep and store ingredients for the week" },
      { id: "tl-m2", text: "Wash and prep produce" },
      { id: "tl-m3", text: "Load/unload dishwasher after meal prep" },
      { id: "tl-m4", text: "Label and date all prepped containers" },
      { id: "tl-m5", text: "Clear and wipe down prep surfaces" },
    ],
  },
];

const DEFAULT_TEMPLATES = [
  { id: "t1", name: "Deep Clean Monday", tasks: ["Full laundry — all bedrooms including boys", "Vacuum all rooms including stairs", "Mop kitchen and bathroom floors", "Scrub all bathrooms thoroughly", "Wipe down all kitchen counters and appliances", "Prep and store ingredients for 3 meals"] },
  { id: "t2", name: "Light Thursday", tasks: ["Touch-up vacuum main living areas", "Clean all bathrooms", "Restock paper goods and soap dispensers", "Fold and put away any remaining laundry", "Wipe kitchen counters and stovetop"] },
  { id: "t3", name: "Summer Extras", tasks: ["Wipe down patio furniture", "Clean ceiling fans throughout house", "Wipe sliding glass doors inside and out", "Sweep and hose down patio"] },
];

const DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const CATEGORIES = ["Poultry","Beef","Pork","Fish","Pasta","Mexican","Asian","Soup","Salad","Vegetarian","Other"];

// ─── Storage ──────────────────────────────────────────────────────────────────
function load(key, fallback) {
  try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : fallback; } catch { return fallback; }
}
function save(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

// ─── AI helpers ───────────────────────────────────────────────────────────────
async function callClaude(system, user, onChunk) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1500,
      system,
      messages: [{ role: "user", content: user }]
    })
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`API ${res.status}: ${errText.slice(0,200)}`);
  }
  const data = await res.json();
  const text = data.content.map(b => b.text || "").join("");
  if (onChunk) onChunk(text);
  return text;
}

async function callClaudeJSON(system, user) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 1500,
      system,
      messages: [{ role: "user", content: user }]
    })
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`API ${res.status}: ${errText.slice(0,200)}`);
  }
  const data = await res.json();
  if (data.error) throw new Error(`Anthropic error: ${JSON.stringify(data.error)}`);
  if (!data.content) throw new Error(`Unexpected response: ${JSON.stringify(data).slice(0,200)}`);
  let text = data.content.map(b => b.text || "").join("");
  text = text.replace(/```json\n?/g,"").replace(/```\n?/g,"").trim();
  const jsonStart = text.search(/[\[{]/);
  const jsonEnd = Math.max(text.lastIndexOf("}"), text.lastIndexOf("]"));
  if (jsonStart !== -1 && jsonEnd !== -1) {
    text = text.slice(jsonStart, jsonEnd + 1);
  }
  try {
    return JSON.parse(text);
  } catch (e) {
    throw new Error(`JSON parse failed. Response was: ${text.slice(0,200)}`);
  }
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --teal-dark:   #1e6e69;
    --teal-mid:    #2a9d8f;
    --teal-light:  #7fcdb9;
    --teal-pale:   #e8f7f3;
    --teal-faint:  #f4faf9;
    --cream:       #fefcf9;
    --ink:         #1a2e2b;
    --ink-mid:     #3d5a56;
    --ink-soft:    #6b8f8a;
    --ink-faint:   #a8c5c0;
    --border:      #d4ece7;
    --border-soft: #e8f5f2;
    --gold:        #e9c46a;
    --gold-light:  #fdf3d7;
    --red-soft:    #fce8e8;
    --red:         #c0392b;
    --radius-sm:   6px;
    --radius-md:   10px;
    --radius-lg:   14px;
    --shadow-sm:   0 1px 4px rgba(30,110,105,0.08);
    --shadow-md:   0 4px 16px rgba(30,110,105,0.12);
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--teal-faint);
    color: var(--ink);
    min-height: 100vh;
  }

  /* ── Layout ── */
  .app { max-width: 780px; margin: 0 auto; padding-bottom: 60px; }

  /* ── Header ── */
  .header {
    background: linear-gradient(135deg, #122b28 0%, #1a5c57 38%, #228077 70%, #2c9e90 100%);
    padding: 24px 32px 22px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: none;
    box-shadow: 0 6px 28px rgba(18,43,40,0.35);
    position: relative;
    overflow: hidden;
  }
  /* Top-right golden glow */
  .header::before {
    content: '';
    position: absolute;
    top: -55px; right: -35px;
    width: 200px; height: 200px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(233,196,106,0.22) 0%, transparent 68%);
    pointer-events: none;
  }
  /* Bottom-left soft teal glow */
  .header-glow {
    position: absolute;
    bottom: -45px; left: -20px;
    width: 150px; height: 150px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(127,205,185,0.14) 0%, transparent 70%);
    pointer-events: none;
  }
  /* Gold gradient bar at bottom */
  .header-gold-bar {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 4px;
    background: linear-gradient(90deg, #b8924a 0%, var(--gold) 30%, #f5e09e 55%, var(--gold) 75%, #b8924a 100%);
    pointer-events: none;
  }
  .header-brand { position: relative; z-index: 1; }
  .header-brand h1 {
    font-family: 'Playfair Display', serif;
    font-size: 24px;
    font-weight: 600;
    color: #fff;
    letter-spacing: -0.01em;
    text-shadow: 0 1px 8px rgba(0,0,0,0.2);
  }
  .header-brand p {
    font-size: 10px;
    color: rgba(127,205,185,0.9);
    margin-top: 3px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .header-actions { display: flex; gap: 8px; position: relative; z-index: 1; }

  /* ── Buttons ── */
  .btn { font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all 0.15s; border-radius: var(--radius-sm); font-size: 13px; display: inline-flex; align-items: center; gap: 6px; }
  .btn-ghost { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.22); color: #fff; padding: 7px 13px; backdrop-filter: blur(4px); }
  .btn-ghost:hover { background: rgba(255,255,255,0.16); border-color: rgba(255,255,255,0.35); }
  .btn-gold { background: linear-gradient(135deg, #d4a843 0%, var(--gold) 50%, #f0d07a 100%); border: none; color: #1a2e2b; padding: 7px 14px; font-weight: 600; box-shadow: 0 2px 8px rgba(233,196,106,0.35); }
  .btn-gold:hover { filter: brightness(1.08); box-shadow: 0 3px 12px rgba(233,196,106,0.45); }
  .btn-teal { background: var(--teal-dark); border: none; color: #fff; padding: 8px 16px; font-weight: 500; }
  .btn-teal:hover { background: var(--teal-mid); }
  .btn-outline { background: #fff; border: 1px solid var(--border); color: var(--ink-mid); padding: 7px 13px; }
  .btn-outline:hover { border-color: var(--teal-mid); color: var(--ink); }
  .btn-danger { background: transparent; border: 1px solid #f0d0d0; color: var(--red); padding: 7px 13px; }
  .btn-danger:hover { background: var(--red-soft); }
  .btn:disabled { opacity: 0.45; cursor: not-allowed; }
  .btn-full { width: 100%; justify-content: center; padding: 13px; font-size: 14px; }
  .btn-generate {
    width: 100%;
    background: linear-gradient(135deg, #122b28 0%, #1a5c57 45%, var(--teal-mid) 100%);
    border: none;
    color: #fff;
    padding: 15px;
    font-family: 'Playfair Display', serif;
    font-size: 15px;
    border-radius: var(--radius-md);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
    transition: all 0.2s;
    box-shadow: 0 3px 14px rgba(18,43,40,0.28);
    letter-spacing: 0.01em;
    position: relative;
    overflow: hidden;
  }
  .btn-generate::before {
    content: '';
    position: absolute;
    top: 0; left: -80%;
    width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent);
    transform: skewX(-15deg);
    transition: left 0.5s ease;
  }
  .btn-generate:hover { transform: translateY(-1px); box-shadow: 0 6px 22px rgba(18,43,40,0.35); }
  .btn-generate:hover::before { left: 130%; }
  .btn-generate:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  /* ── Nav ── */
  .nav { display: flex; background: #fff; border-bottom: 1px solid var(--border); padding: 0 32px; box-shadow: 0 1px 6px rgba(30,110,105,0.05); }
  .nav-btn { font-family: 'DM Sans', sans-serif; font-size: 13px; padding: 13px 16px; border: none; background: transparent; color: var(--ink-soft); cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -1px; transition: all 0.15s; white-space: nowrap; border-radius: var(--radius-sm) var(--radius-sm) 0 0; }
  .nav-btn.active { color: var(--teal-dark); border-bottom-color: var(--teal-mid); font-weight: 500; background: var(--teal-faint); }
  .nav-btn:hover:not(.active) { color: var(--ink); background: var(--teal-faint); }

  /* ── Content ── */
  .content { padding: 24px 32px 0; }

  /* ── Visit tabs ── */
  .visit-bar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
  .visit-tabs { display: flex; gap: 6px; }
  .vtab { font-family: 'DM Sans', sans-serif; font-size: 13px; padding: 7px 18px; border-radius: 20px; border: 1px solid var(--border); background: transparent; color: var(--ink-soft); cursor: pointer; transition: all 0.15s; }
  .vtab.active { background: var(--teal-dark); color: #fff; border-color: var(--teal-dark); box-shadow: 0 2px 8px rgba(30,110,105,0.25); }
  .vtab:hover:not(.active) { border-color: var(--teal-mid); color: var(--ink); }

  /* ── Greeting ── */
  .greeting {
    background: #fff;
    border: 1px solid var(--border);
    border-left: 3px solid var(--teal-mid);
    border-radius: var(--radius-md);
    padding: 13px 16px;
    margin-bottom: 18px;
    font-size: 14px;
    line-height: 1.65;
    color: var(--ink-mid);
    min-height: 50px;
    box-shadow: var(--shadow-sm);
  }
  .greeting-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--teal-mid); font-weight: 500; margin-bottom: 4px; }
  .streaming::after { content: '|'; animation: blink 0.8s step-end infinite; color: var(--teal-mid); }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }

  /* ── Cards ── */
  .card { background: #fff; border: 1px solid var(--border); border-radius: var(--radius-md); overflow: hidden; box-shadow: var(--shadow-sm); }
  .section { margin-bottom: 20px; }
  .section-hd { display: flex; align-items: center; justify-content: space-between; margin-bottom: 9px; }
  .section-title { font-family: 'Playfair Display', serif; font-size: 15px; font-weight: 500; color: var(--ink); display: flex; align-items: center; gap: 7px; }
  .section-sub { font-size: 11px; color: var(--ink-faint); }

  /* ── Tasks ── */
  .task-toolbar { display: flex; gap: 7px; margin-bottom: 9px; flex-wrap: wrap; }
  .task-row { display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-bottom: 1px solid var(--border-soft); transition: background 0.1s; }
  .task-row:last-child { border-bottom: none; }
  .task-row:hover { background: var(--teal-faint); }
  .task-check { width: 18px; height: 18px; border-radius: 4px; border: 1.5px solid var(--teal-light); cursor: pointer; flex-shrink: 0; display: flex; align-items: center; justify-content: center; transition: all 0.15s; background: transparent; }
  .task-check.done { background: var(--teal-mid); border-color: var(--teal-mid); }
  .task-text { font-size: 14px; color: var(--ink); flex: 1; line-height: 1.4; }
  .task-text.done { text-decoration: line-through; color: var(--ink-faint); }
  .tag-select { font-family: 'DM Sans', sans-serif; font-size: 11px; border: 1px solid var(--border); border-radius: 4px; padding: 2px 5px; color: var(--ink-soft); background: #fff; cursor: pointer; outline: none; }
  .task-del { background: none; border: none; cursor: pointer; color: var(--ink-faint); font-size: 16px; padding: 0 3px; transition: color 0.15s; flex-shrink: 0; }
  .task-del:hover { color: var(--red); }
  .add-row { padding: 9px 14px; display: flex; align-items: center; gap: 9px; border-top: 1px dashed var(--border); }
  .add-input { flex: 1; border: none; background: transparent; font-family: 'DM Sans', sans-serif; font-size: 13px; color: var(--ink); outline: none; }
  .add-input::placeholder { color: var(--ink-faint); }
  .add-btn { background: none; border: none; cursor: pointer; color: var(--teal-mid); font-size: 22px; line-height: 1; padding: 0; transition: color 0.15s; }
  .add-btn:hover { color: var(--teal-dark); }

  /* ── Meals ── */
  .meal-card { background: #fff; border: 1px solid var(--border); border-radius: var(--radius-md); padding: 13px 15px; display: flex; align-items: flex-start; gap: 13px; margin-bottom: 10px; transition: box-shadow 0.15s; box-shadow: var(--shadow-sm); }
  .meal-card:hover { box-shadow: var(--shadow-md); }
  .meal-day { background: linear-gradient(135deg, #1a5c57, var(--teal-mid)); color: #fff; font-size: 11px; font-weight: 500; padding: 4px 10px; border-radius: 12px; flex-shrink: 0; font-family: 'DM Sans', sans-serif; letter-spacing: 0.04em; margin-top: 1px; box-shadow: 0 2px 6px rgba(30,110,105,0.2); }
  .meal-body { flex: 1; }
  .meal-name { font-size: 14px; font-weight: 500; color: var(--ink); margin-bottom: 2px; }
  .meal-notes { font-size: 12px; color: var(--ink-soft); line-height: 1.4; }
  .meal-cat { font-size: 10px; color: var(--teal-mid); font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 3px; }
  .swap-btn { font-family: 'DM Sans', sans-serif; font-size: 12px; padding: 5px 11px; border-radius: var(--radius-sm); border: 1px solid var(--border); background: transparent; color: var(--ink-soft); cursor: pointer; transition: all 0.15s; flex-shrink: 0; }
  .swap-btn:hover { border-color: var(--teal-mid); color: var(--ink); }
  .swap-btn:disabled { opacity: 0.4; cursor: not-allowed; }

  /* ── Shopping ── */
  .shop-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 20px; padding: 14px 16px; }
  .shop-item { display: flex; align-items: center; gap: 8px; padding: 5px 0; font-size: 13px; color: var(--ink-mid); border-bottom: 0.5px solid var(--border-soft); cursor: pointer; transition: color 0.12s; }
  .shop-item:nth-last-child(-n+2) { border-bottom: none; }
  .shop-item.checked { text-decoration: line-through; color: var(--ink-faint); }
  .shop-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--teal-mid); flex-shrink: 0; transition: background 0.12s; }
  .shop-item.checked .shop-dot { background: var(--ink-faint); }

  /* ── Recipe box ── */
  .recipe-toolbar { display: flex; gap: 8px; margin-bottom: 14px; flex-wrap: wrap; align-items: center; }
  .search-input { flex: 1; min-width: 140px; border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 8px 12px; font-family: 'DM Sans', sans-serif; font-size: 13px; color: var(--ink); background: #fff; outline: none; }
  .search-input:focus { border-color: var(--teal-mid); }
  .filter-sel { border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 8px 10px; font-family: 'DM Sans', sans-serif; font-size: 13px; color: var(--ink); background: #fff; outline: none; cursor: pointer; }
  .recipes-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px,1fr)); gap: 11px; }
  .recipe-card { background: #fff; border: 1px solid var(--border); border-radius: var(--radius-md); padding: 13px; cursor: default; transition: border-color 0.15s, box-shadow 0.15s; }
  .recipe-card:hover { border-color: var(--teal-light); box-shadow: var(--shadow-sm); }
  .recipe-cat { font-size: 10px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--teal-mid); font-weight: 500; margin-bottom: 4px; }
  .recipe-name { font-family: 'Playfair Display', serif; font-size: 14px; font-weight: 500; color: var(--ink); margin-bottom: 4px; line-height: 1.3; }
  .recipe-meta { font-size: 11px; color: var(--ink-faint); margin-bottom: 5px; }
  .recipe-notes { font-size: 12px; color: var(--ink-soft); line-height: 1.4; margin-bottom: 6px; }
  .recipe-ing { font-size: 11px; color: var(--ink-faint); line-height: 1.4; }
  .recipe-actions { display: flex; gap: 5px; margin-top: 9px; }
  .recipe-btn { font-family: 'DM Sans', sans-serif; font-size: 11px; padding: 4px 9px; border-radius: 5px; border: 1px solid var(--border); background: transparent; color: var(--ink-soft); cursor: pointer; transition: all 0.15s; }
  .recipe-btn:hover { border-color: var(--teal-mid); color: var(--ink); }
  .recipe-btn.del:hover { border-color: var(--red); color: var(--red); }
  .recipe-btn.view { background: var(--teal-faint); border-color: var(--teal-light); color: var(--teal-dark); font-weight: 500; }
  .recipe-btn.view:hover { background: var(--teal-pale); border-color: var(--teal-mid); }
  .add-recipe-card { background: #fff; border: 1px dashed var(--teal-light); border-radius: var(--radius-md); padding: 13px; cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 130px; gap: 6px; transition: all 0.15s; }
  .add-recipe-card:hover { background: var(--teal-pale); border-color: var(--teal-mid); }
  .add-recipe-card span:first-child { font-size: 26px; color: var(--teal-mid); }
  .add-recipe-card span:last-child { font-size: 13px; color: var(--teal-mid); font-weight: 500; }

  /* ── Modals ── */
  .overlay { position: fixed; inset: 0; background: rgba(26,46,43,0.55); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 20px; backdrop-filter: blur(2px); }
  .panel { background: var(--cream); border-radius: var(--radius-lg); width: 100%; max-width: 500px; max-height: 90vh; overflow-y: auto; padding: 26px; box-shadow: 0 8px 40px rgba(18,43,40,0.25); }
  .panel h2 { font-family: 'Playfair Display', serif; font-size: 19px; font-weight: 500; color: var(--ink); margin-bottom: 18px; }
  .panel-section { font-size: 11px; text-transform: uppercase; letter-spacing: 0.07em; color: var(--teal-mid); font-weight: 500; margin: 16px 0 9px; border-top: 1px solid var(--border); padding-top: 14px; }
  .panel-section:first-of-type { border-top: none; padding-top: 0; margin-top: 0; }
  .field { margin-bottom: 12px; }
  .field label { display: block; font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--ink-soft); font-weight: 500; margin-bottom: 4px; }
  .field input, .field textarea, .field select { width: 100%; border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 8px 11px; font-family: 'DM Sans', sans-serif; font-size: 13px; color: var(--ink); background: #fff; outline: none; transition: border-color 0.15s; resize: vertical; }
  .field input:focus, .field textarea:focus { border-color: var(--teal-mid); }
  .field-hint { font-size: 11px; color: var(--ink-faint); margin-top: 3px; line-height: 1.4; }
  .field-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .panel-actions { display: flex; gap: 9px; margin-top: 18px; }
  .panel-save { flex: 1; background: linear-gradient(135deg, #1a5c57, var(--teal-mid)); border: none; border-radius: var(--radius-sm); padding: 10px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; color: #fff; cursor: pointer; transition: all 0.15s; box-shadow: 0 2px 8px rgba(30,110,105,0.2); }
  .panel-save:hover { filter: brightness(1.08); box-shadow: 0 3px 12px rgba(30,110,105,0.3); }
  .panel-cancel { flex: 1; background: transparent; border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 10px; font-family: 'DM Sans', sans-serif; font-size: 13px; color: var(--ink-soft); cursor: pointer; transition: all 0.15s; }
  .panel-cancel:hover { border-color: var(--ink-soft); }

  /* ── Import tabs ── */
  .import-tabs { display: flex; border-bottom: 1px solid var(--border); margin-bottom: 16px; }
  .itab { font-family: 'DM Sans', sans-serif; font-size: 12px; padding: 8px 13px; border: none; background: transparent; color: var(--ink-soft); cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -1px; transition: all 0.15s; }
  .itab.active { color: var(--teal-dark); border-bottom-color: var(--teal-mid); font-weight: 500; }
  .itab:hover:not(.active) { color: var(--ink); }
  .drop-zone { border: 2px dashed var(--border); border-radius: var(--radius-md); padding: 28px 18px; text-align: center; cursor: pointer; transition: all 0.2s; background: #fff; }
  .drop-zone:hover { border-color: var(--teal-mid); background: var(--teal-pale); }
  .drop-zone input[type=file] { display: none; }
  .import-result { background: #fff; border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 10px 12px; margin-bottom: 8px; display: flex; align-items: flex-start; justify-content: space-between; gap: 10px; }
  .import-result.selected { border-color: var(--teal-mid); border-width: 2px; }
  .import-sel-btn { font-family: 'DM Sans', sans-serif; font-size: 11px; padding: 4px 9px; border-radius: 5px; border: 1px solid var(--border); background: transparent; color: var(--ink-soft); cursor: pointer; flex-shrink: 0; transition: all 0.15s; }
  .import-sel-btn.on { border-color: var(--teal-mid); color: var(--teal-dark); background: var(--teal-pale); }

  /* ── Template cards ── */
  .tmpl-card { background: #fff; border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 11px 13px; margin-bottom: 8px; transition: border-color 0.15s, box-shadow 0.15s; }
  .tmpl-card:hover { border-color: var(--teal-light); box-shadow: var(--shadow-sm); }
  .tmpl-name { font-size: 13px; font-weight: 500; color: var(--ink); margin-bottom: 4px; }
  .tmpl-preview { font-size: 11px; color: var(--ink-soft); line-height: 1.5; }

  /* ── Print sheet ── */
  .print-panel { background: #fff; border-radius: var(--radius-lg); width: 100%; max-width: 600px; max-height: 90vh; overflow-y: auto; padding: 34px; box-shadow: 0 8px 40px rgba(18,43,40,0.25); }
  .print-hd { border-bottom: 2px solid var(--ink); padding-bottom: 12px; margin-bottom: 20px; }
  .print-hd h2 { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 600; color: var(--ink); }
  .print-hd p { font-size: 12px; color: var(--ink-soft); margin-top: 2px; }
  .print-section { margin-bottom: 20px; }
  .print-section h3 { font-family: 'Playfair Display', serif; font-size: 14px; color: var(--ink); border-bottom: 1px solid var(--border); padding-bottom: 5px; margin-bottom: 9px; }
  .print-task { font-size: 13px; color: var(--ink); padding: 4px 0; display: flex; gap: 9px; }
  .print-task::before { content: "☐"; color: var(--teal-mid); flex-shrink: 0; }
  .print-meal { font-size: 13px; padding: 8px 0 10px; border-bottom: 0.5px solid var(--border-soft); }
  .print-meal:last-child { border-bottom: none; }
  .print-meal-top { display: flex; gap: 10px; align-items: baseline; }
  .print-meal-day { color: var(--teal-dark); font-weight: 500; min-width: 34px; flex-shrink: 0; }
  .print-meal-details { margin-top: 7px; padding-left: 44px; }
  .print-meal-details-label { font-size: 11px; font-weight: 600; color: var(--teal-dark); text-transform: uppercase; letter-spacing: 0.04em; margin: 6px 0 3px; }
  .print-meal-ing { font-size: 11.5px; color: var(--ink); line-height: 1.6; columns: 2; gap: 12px; }
  .print-meal-ing li { break-inside: avoid; list-style: none; padding-left: 12px; position: relative; }
  .print-meal-ing li::before { content: "–"; position: absolute; left: 0; color: var(--teal-mid); }
  .print-meal-steps { font-size: 11.5px; color: var(--ink); line-height: 1.6; margin: 0; padding: 0; list-style: none; }
  .print-meal-steps li { padding: 2px 0 2px 22px; position: relative; }
  .print-meal-steps li .step-num { position: absolute; left: 0; width: 16px; height: 16px; border-radius: 50%; background: var(--teal-mid); color: #fff; font-size: 9px; font-weight: 700; display: inline-flex; align-items: center; justify-content: center; top: 3px; }
  .print-shop-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3px 18px; }
  .print-shop-item { font-size: 13px; color: var(--ink); padding: 4px 0; display: flex; gap: 8px; align-items: center; }
  .print-shop-item::before { content: "○"; color: var(--teal-mid); font-size: 10px; }

  /* ── Task Library Panel ── */
  .tl-panel { background: var(--cream); border-radius: var(--radius-lg); width: 100%; max-width: 580px; max-height: 92vh; display: flex; flex-direction: column; box-shadow: 0 8px 40px rgba(18,43,40,0.28); }
  .tl-header { background: linear-gradient(135deg, #122b28 0%, #1a5c57 50%, var(--teal-mid) 100%); padding: 20px 24px 16px; border-radius: var(--radius-lg) var(--radius-lg) 0 0; flex-shrink: 0; }
  .tl-title { font-family: 'Playfair Display', serif; font-size: 19px; font-weight: 600; color: #fff; margin-bottom: 4px; }
  .tl-subtitle { font-size: 12px; color: rgba(127,205,185,0.9); }
  .tl-search-row { padding: 12px 16px; background: #fff; border-bottom: 1px solid var(--border); flex-shrink: 0; display: flex; align-items: center; gap: 8px; }
  .tl-search { flex: 1; border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 8px 12px; font-family: 'DM Sans', sans-serif; font-size: 13px; color: var(--ink); outline: none; }
  .tl-search:focus { border-color: var(--teal-mid); }
  .tl-counter { font-size: 12px; font-weight: 600; color: var(--teal-dark); background: var(--teal-faint); border: 1px solid var(--teal-pale); border-radius: 12px; padding: 3px 10px; white-space: nowrap; }
  .tl-body { overflow-y: auto; flex: 1; padding: 8px 0; }
  .tl-cat { border-bottom: 1px solid var(--border-soft); }
  .tl-cat-hd { display: flex; align-items: center; gap: 10px; padding: 10px 16px; cursor: pointer; user-select: none; background: transparent; border: none; width: 100%; text-align: left; }
  .tl-cat-hd:hover { background: var(--teal-faint); }
  .tl-cat-name { font-size: 13px; font-weight: 600; color: var(--teal-dark); flex: 1; }
  .tl-cat-meta { font-size: 11px; color: var(--ink-faint); }
  .tl-cat-chevron { font-size: 11px; color: var(--ink-faint); transition: transform 0.15s; }
  .tl-cat-chevron.open { transform: rotate(90deg); }
  .tl-select-all { font-size: 11px; color: var(--teal-mid); cursor: pointer; border: none; background: none; padding: 0; font-family: 'DM Sans', sans-serif; text-decoration: underline; }
  .tl-select-all:hover { color: var(--teal-dark); }
  .tl-tasks { padding: 2px 16px 8px; }
  .tl-task-row { display: flex; align-items: center; gap: 10px; padding: 7px 0; border-bottom: 0.5px solid var(--border-soft); cursor: pointer; }
  .tl-task-row:last-child { border-bottom: none; }
  .tl-task-row:hover .tl-task-text { color: var(--teal-dark); }
  .tl-checkbox { width: 17px; height: 17px; border-radius: 4px; border: 1.5px solid var(--border); flex-shrink: 0; display: flex; align-items: center; justify-content: center; transition: all 0.12s; background: #fff; }
  .tl-checkbox.checked { background: var(--teal-mid); border-color: var(--teal-mid); }
  .tl-checkbox.checked::after { content: "✓"; color: #fff; font-size: 11px; font-weight: 700; }
  .tl-task-text { font-size: 13px; color: var(--ink); line-height: 1.4; }
  .tl-footer { padding: 14px 16px; border-top: 1px solid var(--border); display: flex; gap: 9px; flex-shrink: 0; background: #fff; border-radius: 0 0 var(--radius-lg) var(--radius-lg); }

  /* ── Recipe Detail Modal ── */
  .recipe-detail-panel { background: var(--cream); border-radius: var(--radius-lg); width: 100%; max-width: 620px; max-height: 92vh; overflow-y: auto; box-shadow: 0 8px 40px rgba(18,43,40,0.28); display: flex; flex-direction: column; }
  .recipe-detail-header { background: linear-gradient(135deg, #122b28 0%, #1a5c57 50%, var(--teal-mid) 100%); padding: 22px 24px 18px; border-radius: var(--radius-lg) var(--radius-lg) 0 0; position: relative; flex-shrink: 0; }
  .recipe-detail-title { font-family: 'Playfair Display', serif; font-size: 21px; font-weight: 600; color: #fff; line-height: 1.2; margin-bottom: 6px; padding-right: 36px; }
  .recipe-detail-meta { font-size: 12px; color: rgba(127,205,185,0.9); display: flex; gap: 14px; }
  .recipe-detail-close { position: absolute; top: 14px; right: 14px; width: 28px; height: 28px; border-radius: 50%; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25); color: #fff; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.15s; }
  .recipe-detail-close:hover { background: rgba(255,255,255,0.28); }
  .recipe-detail-body { padding: 22px 24px; overflow-y: auto; }
  .recipe-detail-section { margin-bottom: 22px; }
  .recipe-detail-section-title { font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: var(--teal-dark); font-weight: 600; margin-bottom: 10px; padding-bottom: 6px; border-bottom: 2px solid var(--teal-pale); }
  .recipe-notes-box { background: var(--teal-faint); border-left: 3px solid var(--teal-light); border-radius: 0 var(--radius-sm) var(--radius-sm) 0; padding: 10px 13px; font-size: 13px; color: var(--ink-mid); font-style: italic; line-height: 1.55; }
  .recipe-ing-list { list-style: none; }
  .recipe-ing-item { display: flex; align-items: flex-start; gap: 10px; padding: 6px 0; font-size: 14px; color: var(--ink); border-bottom: 0.5px solid var(--border-soft); line-height: 1.4; }
  .recipe-ing-item:last-child { border-bottom: none; }
  .recipe-ing-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--teal-mid); flex-shrink: 0; margin-top: 6px; }
  .recipe-step { display: flex; gap: 13px; padding: 9px 0; font-size: 14px; color: var(--ink); border-bottom: 0.5px solid var(--border-soft); line-height: 1.55; align-items: flex-start; }
  .recipe-step:last-child { border-bottom: none; }
  .recipe-step-num { width: 24px; height: 24px; border-radius: 50%; background: linear-gradient(135deg, #1a5c57, var(--teal-mid)); color: #fff; font-size: 11px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px; }
  .recipe-tips-box { background: var(--gold-light); border: 1px solid rgba(233,196,106,0.45); border-left: 3px solid var(--gold); border-radius: var(--radius-sm); padding: 11px 13px; font-size: 13px; color: var(--ink-mid); line-height: 1.6; }

  /* ── PDF / Share button strip ── */
  .pdf-strip { display: flex; gap: 9px; margin-top: 10px; }
  .btn-share { flex: 1; background: linear-gradient(135deg, #122b28 0%, #1a5c57 50%, var(--teal-mid) 100%); border: none; border-radius: var(--radius-sm); padding: 10px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; color: #fff; cursor: pointer; transition: all 0.15s; display: flex; align-items: center; justify-content: center; gap: 7px; box-shadow: 0 2px 8px rgba(18,43,40,0.2); }
  .btn-share:hover { filter: brightness(1.1); box-shadow: 0 4px 14px rgba(18,43,40,0.3); }
  .btn-share:disabled { opacity: 0.5; cursor: not-allowed; }

  /* ── Spinner ── */
  .spinner { width: 15px; height: 15px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite; }
  .spinner-teal { border-color: rgba(42,157,143,0.25); border-top-color: var(--teal-mid); }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── Toast ── */
  .toast { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); background: var(--teal-dark); color: #fff; padding: 10px 20px; border-radius: 20px; font-size: 13px; z-index: 200; animation: toastIn 0.2s ease; box-shadow: var(--shadow-md); }
  .install-banner { position: fixed; bottom: 0; left: 0; right: 0; background: var(--teal-dark); color: #fff; padding: 14px 16px; display: flex; align-items: center; gap: 12px; z-index: 300; box-shadow: 0 -4px 20px rgba(0,0,0,0.2); animation: toastIn 0.25s ease; }
  .install-banner-text { flex: 1; font-size: 13.5px; line-height: 1.4; }
  .install-banner-text strong { display: block; font-size: 14px; margin-bottom: 2px; }
  .install-banner-btns { display: flex; gap: 8px; flex-shrink: 0; }
  .install-btn { background: #e9c46a; color: #1a2e2b; border: none; border-radius: 20px; padding: 7px 16px; font-size: 13px; font-weight: 600; cursor: pointer; }
  .install-dismiss { background: transparent; color: rgba(255,255,255,0.7); border: 1px solid rgba(255,255,255,0.3); border-radius: 20px; padding: 7px 12px; font-size: 13px; cursor: pointer; }
  @keyframes toastIn { from { opacity:0; transform:translateX(-50%) translateY(8px); } }

  /* ── Misc ── */
  .empty { text-align: center; padding: 36px 20px; color: var(--ink-faint); }
  .empty span { display: block; font-size: 30px; margin-bottom: 9px; }
  .hint { font-size: 12px; color: var(--ink-soft); line-height: 1.55; margin-bottom: 12px; }

  @media (max-width: 600px) {
    .header { padding: 18px 18px 18px; }
    .header-brand h1 { font-size: 20px; }
    .nav { padding: 0 18px; overflow-x: auto; }
    .content { padding: 16px 18px 0; }
    .shop-grid { grid-template-columns: 1fr; }
    .recipes-grid { grid-template-columns: 1fr; }
    .field-2col { grid-template-columns: 1fr; }
    .print-shop-grid { grid-template-columns: 1fr; }
  }
`;

// ═══════════════════════════════════════════════════════════════════════════════
export default function HouseHelper() {
  const today = new Date();
  const todayName = DAYS[today.getDay()];

  // ── Core state ─────────────────────────────────────────────────────────────
  const [profile, setProfile]   = useState(() => load("hh_profile", DEFAULT_PROFILE));
  const [recipes, setRecipes]   = useState(() => load("hh_recipes", DEFAULT_RECIPES));
  const [templates, setTemplates] = useState(() => load("hh_templates", DEFAULT_TEMPLATES));
  const [activeTab, setActiveTab] = useState("planner");
  const [activeDay, setActiveDay] = useState(() => (load("hh_profile", DEFAULT_PROFILE).housekeeperDays || ["Monday"])[0]);

  // Plan state
  const [tasks, setTasks]       = useState(() => load(`hh_tasks_${(load("hh_profile", DEFAULT_PROFILE).housekeeperDays || ["Monday"])[0]}`, []));
  const [meals, setMeals]       = useState(() => load(`hh_meals_${(load("hh_profile", DEFAULT_PROFILE).housekeeperDays || ["Monday"])[0]}`, []));
  const [shopping, setShopping] = useState(() => load(`hh_shop_${(load("hh_profile", DEFAULT_PROFILE).housekeeperDays || ["Monday"])[0]}`, []));
  const [greeting, setGreeting] = useState(() => load(`hh_greet_${(load("hh_profile", DEFAULT_PROFILE).housekeeperDays || ["Monday"])[0]}`, ""));
  const [checkedShop, setCheckedShop] = useState({});

  // UI state
  const [generating, setGenerating]   = useState(false);
  const [lastError, setLastError]     = useState("");
  const [streamingGreet, setStreamingGreet] = useState(false);
  const [swapping, setSwapping]       = useState(null);
  const [addingMeal, setAddingMeal]   = useState(false);
  const [refreshingShop, setRefreshingShop] = useState(false);
  const [newTask, setNewTask]         = useState("");
  const [toast, setToast]             = useState("");

  // Panel state
  const [showSettings, setShowSettings]     = useState(false);
  const [showTaskPanel, setShowTaskPanel]   = useState(false);
  const [taskPanelTab, setTaskPanelTab]     = useState("bulk");
  const [showRecipeForm, setShowRecipeForm] = useState(false);
  const [viewingRecipe, setViewingRecipe]     = useState(null);
  const [generatingDetails, setGeneratingDetails] = useState(null); // recipe id currently being AI-filled
  const [showImport, setShowImport]         = useState(false);
  const [showPrint, setShowPrint]           = useState(false);
  const [editingRecipe, setEditingRecipe]   = useState(null);

  // Task panel
  const [bulkText, setBulkText]         = useState("");
  const [aiPrompt, setAiPrompt]         = useState("");
  const [aiTaskBusy, setAiTaskBusy]     = useState(false);
  const [newTmplName, setNewTmplName]   = useState("");

  // Recipe form
  const [draftRecipe, setDraftRecipe] = useState({ name:"", category:"Poultry", cookTime:"", notes:"", ingredients:"", detailedIngredients:"", instructions:"", tips:"" });

  // Import
  const [importTab, setImportTab]       = useState("name");
  const [importBusy, setImportBusy]     = useState(false);
  const [importResults, setImportResults] = useState([]);
  const [selectedImports, setSelectedImports] = useState("all");
  const [importPasteText, setImportPasteText] = useState("");
  const [importNameText, setImportNameText]   = useState("");
  const [importBulkText, setImportBulkText]   = useState("");
  const [importPhoto, setImportPhoto]   = useState(null);

  // Settings draft
  const [draftProfile, setDraftProfile] = useState(profile);

  // Recipe search
  const [recipeSearch, setRecipeSearch] = useState("");
  const [recipeFilter, setRecipeFilter] = useState("All");

  // ── NEW: Template editing state ────────────────────────────────────────────
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [editTmplName, setEditTmplName]       = useState("");
  const [editTmplTasks, setEditTmplTasks]     = useState([]);
  const [newEditTask, setNewEditTask]         = useState("");

  // ── NEW: PDF/Share state ───────────────────────────────────────────────────
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [showTaskLibrary, setShowTaskLibrary] = useState(false);
  const [selectedLibraryTasks, setSelectedLibraryTasks] = useState({});
  const canNativeShare = typeof navigator !== "undefined" && !!navigator.share;

  // ── Persistence ────────────────────────────────────────────────────────────
  useEffect(() => { save("hh_profile", profile); }, [profile]);
  useEffect(() => { save("hh_recipes", recipes); }, [recipes]);
  useEffect(() => { save("hh_templates", templates); }, [templates]);
  useEffect(() => { save(`hh_tasks_${activeDay}`, tasks); }, [tasks, activeDay]);
  useEffect(() => { save(`hh_meals_${activeDay}`, meals); }, [meals, activeDay]);
  useEffect(() => { save(`hh_shop_${activeDay}`, shopping); }, [shopping, activeDay]);
  useEffect(() => { save(`hh_greet_${activeDay}`, greeting); }, [greeting, activeDay]);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2600); };

  // ── PWA install prompt ────────────────────────────────────────────────────
  useEffect(() => {
    const dismissed = localStorage.getItem("hh_install_dismissed");
    if (dismissed) return;
    const handler = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
      setShowInstallBanner(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === "accepted") {
      localStorage.setItem("hh_install_dismissed", "1");
    }
    setInstallPrompt(null);
    setShowInstallBanner(false);
  };

  const dismissInstallBanner = () => {
    localStorage.setItem("hh_install_dismissed", "1");
    setShowInstallBanner(false);
  };

  // ── Switch visit day ────────────────────────────────────────────────────────
  const switchDay = (day) => {
    setActiveDay(day);
    setTasks(load(`hh_tasks_${day}`, []));
    setMeals(load(`hh_meals_${day}`, []));
    setShopping(load(`hh_shop_${day}`, []));
    setGreeting(load(`hh_greet_${day}`, ""));
    setCheckedShop({});
  };

  // ── Recipe context for AI ───────────────────────────────────────────────────
  const recipeContext = () => recipes.length
    ? recipes.map(r => `"${r.name}" (${r.category}, cook: ${r.cookTime}) — ${r.notes}. Ingredients: ${r.ingredients}`).join("\n")
    : "No saved recipes yet.";

  const mealHistory = meals.length ? meals.map(m => m.name).join(", ") : "";

  // ── Generate full plan ──────────────────────────────────────────────────────
  const generatePlan = async () => {
    setGenerating(true);
    setGreeting("");
    setStreamingGreet(true);
    setCheckedShop({});
    try {
      const result = await callClaudeJSON(
        "You are a household management assistant. Return ONLY valid JSON, no markdown.",
        `Generate a meal plan for a housekeeper visit on ${activeDay}.

Household: ${profile.familyMembers}
Housekeeper: ${profile.housekeeperName}
Today: ${todayName}
Dietary notes: ${profile.dietaryNotes}
Extra notes: ${profile.extraNotes}

RECIPE BOX (choose 3 meals from this list to prepare):
${recipeContext()}

Return this exact JSON:
{
  "meals": [
    { "id": "1", "day": "Tue", "name": "recipe name exactly as in box", "category": "category", "notes": "brief prep note for housekeeper" }
  ],
  "shopping": ["ingredient 1 with quantity", "ingredient 2 with quantity"]
}

Rules:
- Choose exactly 3 meals from the Recipe Box. Vary by category.
- Shopping list: 10-14 specific ingredients with rough quantities for all 3 meals combined.
- Assign meals to realistic weekdays (Tue-Fri).`
      );

      setMeals(result.meals || []);
      setShopping(result.shopping || []);

      await callClaude(
        "You are a warm household assistant. Write a 2-sentence friendly note for the homemaker about the meals being prepared this week. Be specific, mention one or two meals by name. Conversational, not formal.",
        `Housekeeper: ${profile.housekeeperName}. Visit: ${activeDay}. Meals planned: ${(result.meals||[]).map(m=>m.name).join(", ")}.`,
        (partial) => setGreeting(partial)
      );
    } catch (e) {
      const msg = e?.message || String(e);
      setLastError(msg);
      showToast("Generation failed — see error below");
      console.error("Generation error:", e);
    }
    setStreamingGreet(false);
    setGenerating(false);
  };

  // ── Task actions ────────────────────────────────────────────────────────────
  const toggleTask  = (id) => setTasks(ts => ts.map(t => t.id===id ? {...t,done:!t.done} : t));
  const deleteTask  = (id) => setTasks(ts => ts.filter(t => t.id!==id));
  const changeTag   = (id, tag) => setTasks(ts => ts.map(t => t.id===id ? {...t,tag} : t));
  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks(ts => [...ts, { id: Date.now().toString(), text: newTask.trim(), tag:"routine", done:false }]);
    setNewTask("");
  };
  const addBulkTasks = () => {
    const lines = bulkText.split("\n").map(l=>l.trim()).filter(Boolean);
    if (!lines.length) return;
    setTasks(ts => [...ts, ...lines.map(text => ({ id: Date.now().toString()+Math.random(), text, tag:"routine", done:false }))]);
    setBulkText("");
    showToast(`${lines.length} task${lines.length>1?"s":""} added`);
    setShowTaskPanel(false);
  };
  const suggestTasks = async () => {
    if (!aiPrompt.trim()) return;
    setAiTaskBusy(true);
    try {
      const result = await callClaudeJSON(
        "You are a household task assistant. Return ONLY JSON, no markdown.",
        `Suggest tasks for: "${aiPrompt}". Household: ${profile.familyMembers}. Visit: ${activeDay}. Existing tasks: ${tasks.map(t=>t.text).join(", ")||"none"}. Return: { "tasks": [{ "text": "...", "tag": "routine|priority|seasonal" }] } — 2-5 tasks, no repeats.`
      );
      setTasks(ts => [...ts, ...(result.tasks||[]).map(t => ({ id:Date.now().toString()+Math.random(), text:t.text, tag:t.tag||"routine", done:false }))]);
      showToast(`${(result.tasks||[]).length} tasks added`);
      setAiPrompt("");
      setShowTaskPanel(false);
    } catch { showToast("Could not generate tasks — try again"); }
    setAiTaskBusy(false);
  };
  const loadTemplate = (tmpl) => {
    const existing = tasks.map(t=>t.text.toLowerCase());
    const toAdd = tmpl.tasks.filter(t=>!existing.includes(t.toLowerCase())).map(text => ({ id:Date.now().toString()+Math.random(), text, tag:"routine", done:false }));
    setTasks(ts => [...ts, ...toAdd]);
    showToast(`Loaded "${tmpl.name}" — ${toAdd.length} tasks added`);
    setShowTaskPanel(false);
  };
  const saveAsTemplate = () => {
    if (!newTmplName.trim()) { showToast("Enter a name first"); return; }
    if (!tasks.length) { showToast("No tasks to save"); return; }
    setTemplates(ts => [...ts, { id:Date.now().toString(), name:newTmplName.trim(), tasks:tasks.map(t=>t.text) }]);
    setNewTmplName("");
    showToast("Template saved");
  };

  // ── Task Library ───────────────────────────────────────────────────────────
  const [tlSearch, setTlSearch] = useState("");
  const [tlOpenCats, setTlOpenCats] = useState(() => Object.fromEntries(TASK_LIBRARY.map(c => [c.category, true])));

  const tlToggleTask = (id) =>
    setSelectedLibraryTasks(prev => ({ ...prev, [id]: !prev[id] }));

  const tlToggleCat = (cat) => {
    const ids = TASK_LIBRARY.find(c => c.category === cat).tasks.map(t => t.id);
    const allChecked = ids.every(id => selectedLibraryTasks[id]);
    setSelectedLibraryTasks(prev => {
      const next = { ...prev };
      ids.forEach(id => { next[id] = !allChecked; });
      return next;
    });
  };

  const tlSelectedCount = Object.values(selectedLibraryTasks).filter(Boolean).length;

  const addLibraryTasks = () => {
    const existing = tasks.map(t => t.text.toLowerCase());
    const toAdd = TASK_LIBRARY
      .flatMap(c => c.tasks)
      .filter(t => selectedLibraryTasks[t.id] && !existing.includes(t.text.toLowerCase()))
      .map(t => ({ id: Date.now().toString() + Math.random(), text: t.text, tag: "routine", done: false }));
    setTasks(ts => [...ts, ...toAdd]);
    setShowTaskLibrary(false);
    setSelectedLibraryTasks({});
    setTlSearch("");
    showToast(`${toAdd.length} task${toAdd.length !== 1 ? "s" : ""} added`);
  };

  // ── NEW: Template editing ───────────────────────────────────────────────────
  const openEditTemplate = (tmpl) => {
    setEditingTemplate(tmpl);
    setEditTmplName(tmpl.name);
    setEditTmplTasks([...tmpl.tasks]);
    setNewEditTask("");
  };
  const saveEditedTemplate = () => {
    if (!editTmplName.trim()) { showToast("Enter a template name"); return; }
    setTemplates(ts => ts.map(t =>
      t.id === editingTemplate.id ? { ...t, name: editTmplName.trim(), tasks: editTmplTasks } : t
    ));
    setEditingTemplate(null);
    showToast("Template saved");
  };
  const addEditTask = () => {
    if (!newEditTask.trim()) return;
    setEditTmplTasks(ts => [...ts, newEditTask.trim()]);
    setNewEditTask("");
  };
  const removeEditTask = (idx) => setEditTmplTasks(ts => ts.filter((_, i) => i !== idx));

  // ── NEW: PDF generation + share/download ───────────────────────────────────
  const generateAndSharePDF = async () => {
    setGeneratingPdf(true);
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "pt", format: "letter" });
      const pageW = 612;
      const margin = 50;
      const contentW = pageW - margin * 2;

      // ── Header block ──
      // Dark teal background
      doc.setFillColor(18, 43, 40);
      doc.rect(0, 0, pageW, 88, "F");
      // Lighter teal right-side gradient effect (approximated as a second rect)
      doc.setFillColor(34, 128, 119);
      doc.rect(pageW * 0.55, 0, pageW * 0.45, 88, "F");
      // Subtle gold glow circle top-right
      doc.setFillColor(233, 196, 106);
      doc.setGState(new doc.GState({ opacity: 0.12 }));
      doc.circle(pageW - 30, -10, 90, "F");
      doc.setGState(new doc.GState({ opacity: 1 }));
      // Gold accent bar
      doc.setFillColor(233, 196, 106);
      doc.rect(0, 85, pageW, 3, "F");

      // Brand: House Helper
      doc.setFont("helvetica", "bold");
      doc.setFontSize(26);
      doc.setTextColor(255, 255, 255);
      doc.text("House Helper", margin, 42);

      // Tagline
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(127, 205, 185);
      doc.text("HOUSEKEEPER PREP ASSISTANT", margin, 57);

      // Right side: name + day
      const dateStr = today.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
      doc.setFont("helvetica", "bold");
      doc.setFontSize(15);
      doc.setTextColor(255, 255, 255);
      doc.text(`${profile.housekeeperName} — ${activeDay}`, pageW - margin, 40, { align: "right" });
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(127, 205, 185);
      doc.text(dateStr, pageW - margin, 55, { align: "right" });

      let y = 112;

      // ── Helper: section header ──
      const sectionHeader = (label) => {
        if (y > 700) { doc.addPage(); y = 48; }
        doc.setFillColor(30, 110, 105);
        doc.roundedRect(margin, y, contentW, 26, 4, 4, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(255, 255, 255);
        doc.text(label, margin + 12, y + 17);
        y += 36;
      };

      // ── Helper: page break check ──
      const checkPage = (needed = 20) => {
        if (y + needed > 755) { doc.addPage(); y = 48; }
      };

      // ── Tasks section ──
      if (tasks.length > 0) {
        sectionHeader("Tasks for " + profile.housekeeperName);
        tasks.forEach((task) => {
          checkPage(20);
          // Checkbox square
          doc.setDrawColor(168, 197, 192);
          doc.setLineWidth(1);
          doc.rect(margin + 1, y + 1, 11, 11);
          // Task text
          doc.setFont("helvetica", "normal");
          doc.setFontSize(11);
          doc.setTextColor(26, 46, 43);
          const taskLabel = task.text + (task.tag !== "routine" ? `  [${task.tag}]` : "");
          const lines = doc.splitTextToSize(taskLabel, contentW - 22);
          doc.text(lines, margin + 18, y + 10);
          y += lines.length * 14 + 7;
        });
        y += 12;
      }

      // ── Meals section ──
      if (meals.length > 0) {
        sectionHeader("Meals to Prepare");
        meals.forEach((meal) => {
          const rec = recipes.find(r => r.name.toLowerCase() === meal.name.toLowerCase());
          const ings = rec?.detailedIngredients?.length ? rec.detailedIngredients : null;
          const steps = rec?.instructions?.length ? rec.instructions : null;

          checkPage(28);
          // Day badge
          doc.setFillColor(30, 110, 105);
          doc.roundedRect(margin, y + 1, 32, 16, 3, 3, "F");
          doc.setFont("helvetica", "bold");
          doc.setFontSize(8);
          doc.setTextColor(255, 255, 255);
          doc.text((meal.day || "").toUpperCase(), margin + 16, y + 12, { align: "center" });
          // Meal name
          doc.setFont("helvetica", "bold");
          doc.setFontSize(12);
          doc.setTextColor(26, 46, 43);
          doc.text(meal.name || "", margin + 40, y + 12);
          y += 20;
          // Category
          if (meal.category) {
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            doc.setTextColor(42, 157, 143);
            doc.text(meal.category.toUpperCase(), margin + 40, y + 2);
            y += 10;
          }
          // Notes
          if (meal.notes) {
            checkPage(14);
            doc.setFont("helvetica", "italic");
            doc.setFontSize(10);
            doc.setTextColor(107, 143, 138);
            const noteLines = doc.splitTextToSize(meal.notes, contentW - 44);
            doc.text(noteLines, margin + 40, y + 2);
            y += noteLines.length * 12 + 2;
          }

          // ── Ingredients ──
          if (ings) {
            checkPage(22);
            y += 4;
            doc.setFont("helvetica", "bold");
            doc.setFontSize(9);
            doc.setTextColor(30, 110, 105);
            doc.text("INGREDIENTS", margin + 40, y + 8);
            y += 14;
            ings.forEach((ing) => {
              checkPage(14);
              doc.setFillColor(42, 157, 143);
              doc.circle(margin + 46, y + 4, 2, "F");
              doc.setFont("helvetica", "normal");
              doc.setFontSize(9.5);
              doc.setTextColor(26, 46, 43);
              const ingLines = doc.splitTextToSize(ing, contentW - 60);
              doc.text(ingLines, margin + 54, y + 7);
              y += ingLines.length * 12 + 1;
            });
            y += 4;
          }

          // ── Instructions ──
          if (steps) {
            checkPage(22);
            y += 2;
            doc.setFont("helvetica", "bold");
            doc.setFontSize(9);
            doc.setTextColor(30, 110, 105);
            doc.text("INSTRUCTIONS", margin + 40, y + 8);
            y += 14;
            steps.forEach((step, idx) => {
              checkPage(20);
              // Step number circle
              doc.setFillColor(30, 110, 105);
              doc.circle(margin + 48, y + 5, 7, "F");
              doc.setFont("helvetica", "bold");
              doc.setFontSize(7);
              doc.setTextColor(255, 255, 255);
              doc.text(String(idx + 1), margin + 48, y + 8, { align: "center" });
              // Step text
              doc.setFont("helvetica", "normal");
              doc.setFontSize(9.5);
              doc.setTextColor(26, 46, 43);
              const stepLines = doc.splitTextToSize(step, contentW - 68);
              doc.text(stepLines, margin + 60, y + 8);
              y += Math.max(stepLines.length * 12, 16) + 2;
            });
            y += 4;
          }

          y += 6;
          // Divider
          doc.setDrawColor(212, 236, 231);
          doc.setLineWidth(0.5);
          doc.line(margin, y, margin + contentW, y);
          y += 10;
        });
        y += 6;
      }

      // ── Shopping section ──
      if (shopping.length > 0) {
        sectionHeader("Shopping List");
        const colW = (contentW - 16) / 2;
        const half = Math.ceil(shopping.length / 2);
        for (let i = 0; i < half; i++) {
          checkPage(18);
          const rowY = y;
          // Left item
          doc.setFillColor(42, 157, 143);
          doc.circle(margin + 5, rowY + 6, 3, "F");
          doc.setFont("helvetica", "normal");
          doc.setFontSize(10);
          doc.setTextColor(26, 46, 43);
          const leftLines = doc.splitTextToSize(shopping[i] || "", colW - 14);
          doc.text(leftLines, margin + 14, rowY + 9);
          // Right item
          if (shopping[i + half]) {
            const rx = margin + colW + 16;
            doc.setFillColor(42, 157, 143);
            doc.circle(rx + 5, rowY + 6, 3, "F");
            const rightLines = doc.splitTextToSize(shopping[i + half], colW - 14);
            doc.text(rightLines, rx + 14, rowY + 9);
          }
          y += Math.max(leftLines.length, 1) * 13 + 5;
        }
      }

      // ── Footer on every page ──
      const totalPages = doc.internal.getNumberOfPages();
      for (let p = 1; p <= totalPages; p++) {
        doc.setPage(p);
        doc.setDrawColor(212, 236, 231);
        doc.setLineWidth(0.5);
        doc.line(margin, 768, margin + contentW, 768);
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(168, 197, 192);
        doc.text("House Helper", margin, 780);
        doc.text(`${p} of ${totalPages}`, pageW - margin, 780, { align: "right" });
        if (greeting) {
          const greetLines = doc.splitTextToSize(greeting, contentW - 60);
          doc.setFont("helvetica", "italic");
          doc.setFontSize(8);
          doc.text(greetLines[0] || "", margin + 60, 780, { maxWidth: contentW - 120 });
        }
      }

      // ── Share or download ──
      const fileName = `HouseHelper-${activeDay}-${profile.housekeeperName}.pdf`;
      const blob = doc.output("blob");

      if (canNativeShare) {
        const file = new File([blob], fileName, { type: "application/pdf" });
        try {
          await navigator.share({
            files: [file],
            title: `House Helper — ${activeDay} Plan`,
            text: `Visit instructions for ${profile.housekeeperName}`,
          });
        } catch (shareErr) {
          if (shareErr.name !== "AbortError") {
            // Share was dismissed or failed — fall back to download
            triggerDownload(blob, fileName);
          }
        }
      } else {
        triggerDownload(blob, fileName);
        showToast("PDF downloaded");
      }
    } catch (err) {
      console.error("PDF error:", err);
      showToast("PDF generation failed — try again");
    }
    setGeneratingPdf(false);
  };

  const triggerDownload = (blob, fileName) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // ── Meal actions ────────────────────────────────────────────────────────────
  const swapMeal = async (meal) => {
    setSwapping(meal.id);
    try {
      const result = await callClaudeJSON(
        "You are a meal suggestion assistant. Return ONLY JSON, no markdown.",
        `Suggest ONE different meal to replace "${meal.name}" for ${meal.day}.
Family: ${profile.familyMembers}. Dietary: ${profile.dietaryNotes}.
Recipe box:\n${recipeContext()}
Already planned: ${meals.map(m=>m.name).join(", ")}.
Return: { "name":"...", "category":"...", "notes":"brief prep note" }`
      );
      setMeals(ms => ms.map(m => m.id===meal.id ? {...m, name:result.name, category:result.category, notes:result.notes} : m));
      showToast("Meal swapped");
    } catch { showToast("Swap failed — try again"); }
    setSwapping(null);
  };

  const addMeal = async () => {
    setAddingMeal(true);
    try {
      const usedDays = meals.map(m=>m.day);
      const result = await callClaudeJSON(
        "You are a meal suggestion assistant. Return ONLY JSON, no markdown.",
        `Suggest ONE additional meal. ${profile.dietaryNotes}. Recipe box:\n${recipeContext()}. Already planned: ${meals.map(m=>m.name).join(", ")}. Days used: ${usedDays.join(", ")}. Return: { "day":"Mon/Tue/Wed/Thu/Fri/Sat", "name":"...", "category":"...", "notes":"..." }`
      );
      setMeals(ms => [...ms, { id:Date.now().toString(), day:result.day, name:result.name, category:result.category, notes:result.notes }]);
    } catch { showToast("Could not add meal — try again"); }
    setAddingMeal(false);
  };

  const refreshShopping = async () => {
    if (!meals.length) return;
    setRefreshingShop(true);
    try {
      const result = await callClaudeJSON(
        "You are a grocery list assistant. Return ONLY JSON, no markdown.",
        `Shopping list for: ${meals.map(m=>m.name).join(", ")}. Family: ${profile.familyMembers}. Return: { "shopping":["item with quantity",...] } — 10-14 items.`
      );
      setShopping(result.shopping||[]);
      setCheckedShop({});
      showToast("Shopping list refreshed");
    } catch { showToast("Could not refresh — try again"); }
    setRefreshingShop(false);
  };

  // ── Recipe CRUD ─────────────────────────────────────────────────────────────
  const openNewRecipe = () => {
    setDraftRecipe({ name:"", category:"Poultry", cookTime:"", notes:"", ingredients:"", detailedIngredients:"", instructions:"", tips:"" });
    setEditingRecipe(null);
    setShowRecipeForm(true);
  };
  const openEditRecipe = (r) => {
    setDraftRecipe({
      ...r,
      detailedIngredients: (r.detailedIngredients || []).join("\n"),
      instructions: (r.instructions || []).join("\n"),
      tips: r.tips || "",
    });
    setEditingRecipe(r.id);
    setShowRecipeForm(true);
  };
  const saveRecipe = () => {
    if (!draftRecipe.name.trim()) { showToast("Please enter a recipe name"); return; }
    const ingLines = draftRecipe.detailedIngredients
      .split("\n").map(l => l.trim()).filter(Boolean);
    const stepLines = draftRecipe.instructions
      .split("\n").map(l => l.trim()).filter(Boolean);
    const saved = {
      ...draftRecipe,
      detailedIngredients: ingLines,
      instructions: stepLines,
      tips: draftRecipe.tips.trim(),
      // Keep flat ingredients string in sync for the shopping-list AI context
      ingredients: ingLines.length > 0 ? ingLines.join(", ") : draftRecipe.ingredients,
    };
    if (editingRecipe) {
      setRecipes(rs => rs.map(r => r.id===editingRecipe ? {...saved, id:editingRecipe} : r));
      showToast("Recipe updated");
    } else {
      setRecipes(rs => [...rs, {...saved, id:Date.now().toString()}]);
      showToast("Recipe added");
    }
    setShowRecipeForm(false);
  };
  const generateFullDetails = async (recipe) => {
    setGeneratingDetails(recipe.id);
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 3000,
          system: "You are a professional recipe writer. Return ONLY valid JSON, no markdown, no extra text.",
          messages: [{ role: "user", content:
            `Generate complete detailed recipe information for "${recipe.name}" (${recipe.category}, cook time: ${recipe.cookTime || "unknown"}).
Return exactly this JSON object:
{
  "detailedIngredients": ["2 lbs chicken thighs, boneless and skinless", "4 cloves garlic, minced"],
  "instructions": ["Step text without a number prefix", "Next step text"],
  "tips": "One or two sentences about serving or storage."
}
Rules:
- detailedIngredients: 8-14 items, each with exact quantities for a family of 4.
- instructions: 6-10 clearly written steps a non-cook can follow. Do NOT include step numbers in the text.
- tips: 1-2 sentences on serving, storage, or a useful shortcut.`
          }]
        })
      });
      const data = await response.json();
      if (data.error) throw new Error(JSON.stringify(data.error));
      let text = data.content.map(b => b.text || "").join("");
      text = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      const start = text.indexOf("{");
      const end = text.lastIndexOf("}");
      if (start !== -1 && end !== -1) text = text.slice(start, end + 1);
      const result = JSON.parse(text);
      const ingLines = result.detailedIngredients || [];
      const updated = {
        ...recipe,
        detailedIngredients: ingLines,
        instructions: result.instructions || [],
        tips: result.tips || recipe.tips || "",
        ingredients: ingLines.length > 0 ? ingLines.join(", ") : recipe.ingredients,
      };
      setRecipes(rs => rs.map(r => r.id === recipe.id ? updated : r));
      // Keep the detail view fresh if it's open for this recipe
      setViewingRecipe(prev => prev?.id === recipe.id ? updated : prev);
      showToast("Full recipe details added");
    } catch (e) {
      console.error("Generate details error:", e);
      showToast("Could not generate details — try again");
    }
    setGeneratingDetails(null);
  };

  const deleteRecipe = (id) => { setRecipes(rs => rs.filter(r=>r.id!==id)); showToast("Recipe removed"); };

  const filteredRecipes = recipes.filter(r => {
    const q = recipeSearch.toLowerCase();
    return (r.name.toLowerCase().includes(q) || r.notes.toLowerCase().includes(q)) &&
           (recipeFilter==="All" || r.category===recipeFilter);
  });

  // ── Recipe import ───────────────────────────────────────────────────────────
  const IMPORT_SYS = "You are a professional recipe writer and extraction assistant. Return ONLY valid JSON arrays, no markdown, no extra text.";
  const IMPORT_PROMPT_SUFFIX = `Return a JSON array where each element has exactly these fields:
{
  "name": "Recipe Name",
  "category": "Poultry|Beef|Pork|Fish|Pasta|Mexican|Asian|Soup|Salad|Vegetarian|Other",
  "cookTime": "e.g. 45 min or 1 hr 30 min",
  "notes": "One or two sentence family-friendly note about the dish",
  "ingredients": "comma-separated ingredient names (no quantities) for reference",
  "detailedIngredients": [
    "2 lbs chicken thighs, boneless and skinless",
    "4 cloves garlic, minced"
  ],
  "instructions": [
    "Preheat oven to 400°F and line a sheet pan with parchment.",
    "Pat chicken dry and season all over with salt and pepper."
  ],
  "tips": "Serving suggestion or storage tip, 1-2 sentences."
}
Rules: detailedIngredients must include exact quantities. instructions must have 6-10 clearly written steps a non-cook can follow. Do not number the steps — just write the text.`;

  const parseImport = async (contentBlocks) => {
    setImportBusy(true);
    setImportResults([]);
    setSelectedImports("all");
    try {
      const response = await fetch("/api/chat", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-6",
          max_tokens:4000,
          system: IMPORT_SYS,
          messages:[{ role:"user", content:[...contentBlocks, { type:"text", text: IMPORT_PROMPT_SUFFIX }] }]
        })
      });
      const data = await response.json();
      let text = data.content.map(b=>b.text||"").join("");
      text = text.replace(/```json\n?/g,"").replace(/```\n?/g,"").trim();
      const jsonStart = text.search(/\[/);
      const jsonEnd = text.lastIndexOf("]");
      if (jsonStart !== -1 && jsonEnd !== -1) text = text.slice(jsonStart, jsonEnd + 1);
      const list = JSON.parse(text);
      setImportResults(list.map((r,i) => ({
        id: `imp_${i}_${Date.now()}`,
        name: r.name || "Untitled",
        category: r.category || "Other",
        cookTime: r.cookTime || "",
        notes: r.notes || "",
        ingredients: r.ingredients || (r.detailedIngredients || []).join(", "),
        detailedIngredients: r.detailedIngredients || [],
        instructions: r.instructions || [],
        tips: r.tips || "",
      })));
    } catch { showToast("Could not read recipe — try again"); }
    setImportBusy(false);
  };

  const handlePhotoImport = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setImportPhoto(e.target.result);
      const base64 = e.target.result.split(",")[1];
      parseImport([{ type:"image", source:{ type:"base64", media_type:file.type||"image/jpeg", data:base64 } }]);
    };
    reader.readAsDataURL(file);
  };

  const isSelected = (id) => selectedImports==="all" || !!selectedImports[id];
  const toggleImportSelect = (id) => {
    if (selectedImports==="all") {
      const obj = {};
      importResults.forEach(r => { obj[r.id] = r.id!==id; });
      setSelectedImports(obj);
    } else {
      setSelectedImports(s => ({...s, [id]:!s[id]}));
    }
  };
  const addImportedRecipes = () => {
    const toAdd = importResults.filter(r => isSelected(r.id));
    if (!toAdd.length) { showToast("Select at least one recipe"); return; }
    setRecipes(rs => [...rs, ...toAdd.map(r => ({...r, id:Date.now().toString()+Math.random()}))]);
    showToast(`${toAdd.length} recipe${toAdd.length>1?"s":""} added`);
    setShowImport(false);
    setImportResults([]);
    setImportPasteText(""); setImportNameText(""); setImportBulkText(""); setImportPhoto(null);
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{STYLES}</style>
      <div className="app">

        {/* Header */}
        <div className="header">
          <div className="header-glow" />
          <div className="header-gold-bar" />
          <div className="header-brand">
            <h1>House Helper</h1>
            <p>Housekeeper Prep Assistant</p>
          </div>
          <div className="header-actions">
            <button className="btn btn-ghost" onClick={() => { setDraftProfile({...profile}); setShowSettings(true); }}>
              &#9881; Profile
            </button>
            <button
              className="btn btn-share"
              onClick={generateAndSharePDF}
              disabled={generatingPdf || (!tasks.length && !meals.length)}
              style={{padding:"7px 13px", fontSize:13}}
            >
              {generatingPdf
                ? <><div className="spinner" style={{width:13,height:13,borderWidth:2}}/>Generating…</>
                : canNativeShare ? "⬆ Share Plan" : "⬇ Download PDF"
              }
            </button>
            <button className="btn btn-gold" onClick={() => setShowPrint(true)} disabled={!tasks.length && !meals.length}>
              Print Sheet
            </button>
          </div>
        </div>

        {/* Nav */}
        <div className="nav">
          <button className={`nav-btn ${activeTab==="planner"?"active":""}`} onClick={() => setActiveTab("planner")}>📋 Visit Planner</button>
          <button className={`nav-btn ${activeTab==="recipes"?"active":""}`} onClick={() => setActiveTab("recipes")}>🍽 Recipe Box ({recipes.length})</button>
          <button className={`nav-btn ${activeTab==="preferences"?"active":""}`} onClick={() => setActiveTab("preferences")}>❤️ Preferences</button>
        </div>

        {/* ═══════════════════════ PLANNER TAB ═══════════════════════ */}
        {activeTab === "planner" && (
          <div className="content">
            {/* Visit day tabs */}
            <div className="visit-bar">
              <div className="visit-tabs">
                {(profile.housekeeperDays||["Monday"]).map(day => (
                  <button key={day} className={`vtab ${activeDay===day?"active":""}`} onClick={() => switchDay(day)}>{day}</button>
                ))}
              </div>
              <span style={{fontSize:12,color:"var(--ink-faint)"}}>Today is {todayName}</span>
            </div>

            {/* Greeting */}
            <div className="greeting">
              <div className="greeting-label">✦ Assistant</div>
              {greeting
                ? <div className={streamingGreet?"streaming":""}>{greeting}</div>
                : <div style={{color:"var(--ink-faint)",fontSize:14}}>Build your task list above, then click Generate Meal Plan — I'll pick 3 meals from your Recipe Box and create a shopping list automatically.</div>
              }
            </div>

            {/* ── Tasks to Be Performed ── */}
            <div className="section">
              <div className="section-hd">
                <div className="section-title">🧹 Tasks to Be Performed</div>
                {tasks.length > 0 && (
                  <span className="section-sub">{tasks.filter(t=>t.done).length}/{tasks.length} done</span>
                )}
              </div>
              <div style={{display:"flex",gap:7,marginBottom:tasks.length ? 9 : 0,flexWrap:"wrap"}}>
                <button className="btn btn-outline" style={{fontSize:12,padding:"5px 11px"}} onClick={() => { setSelectedLibraryTasks({}); setShowTaskLibrary(true); }}>✓ Create Task List</button>
                <button className="btn btn-outline" style={{fontSize:12,padding:"5px 11px"}} onClick={() => { setShowTaskPanel(true); setTaskPanelTab("templates"); }}>📁 Load a template</button>
                <button className="btn btn-outline" style={{fontSize:12,padding:"5px 11px"}} onClick={() => { setShowTaskPanel(true); setTaskPanelTab("bulk"); }}>📋 Paste a list</button>
                <button className="btn btn-outline" style={{fontSize:12,padding:"5px 11px"}} onClick={() => { setShowTaskPanel(true); setTaskPanelTab("ai"); }}>✦ AI suggest</button>
                {tasks.length > 0 && (
                  <button className="btn btn-danger" style={{fontSize:12,padding:"5px 11px",marginLeft:"auto"}} onClick={() => { if(window.confirm("Clear all tasks?")) setTasks([]); }}>Clear all</button>
                )}
              </div>
              {tasks.length > 0 && (
                <div className="card">
                  {tasks.map(task => (
                    <div className="task-row" key={task.id}>
                      <div className={`task-check ${task.done?"done":""}`} onClick={() => toggleTask(task.id)}>
                        {task.done && <span style={{color:"#fff",fontSize:10,fontWeight:700}}>✓</span>}
                      </div>
                      <span className={`task-text ${task.done?"done":""}`}>{task.text}</span>
                      <select className="tag-select" value={task.tag} onChange={e => changeTag(task.id, e.target.value)}>
                        <option value="routine">routine</option>
                        <option value="priority">priority</option>
                        <option value="seasonal">seasonal</option>
                      </select>
                      <button className="task-del" onClick={() => deleteTask(task.id)}>×</button>
                    </div>
                  ))}
                  <div className="add-row">
                    <input className="add-input" placeholder="Type a task and press Enter…" value={newTask}
                      onChange={e => setNewTask(e.target.value)} onKeyDown={e => e.key==="Enter" && addTask()} />
                    <button className="add-btn" onClick={addTask}>+</button>
                  </div>
                </div>
              )}
            </div>

            {/* Error display */}
            {lastError && (
              <div style={{background:"#fce8e8",border:"1px solid #f0c0c0",borderRadius:"var(--radius-md)",padding:"12px 16px",marginBottom:16,fontSize:13,color:"#8b0000",lineHeight:1.6}}>
                <div style={{fontWeight:500,marginBottom:4}}>⚠ Error details:</div>
                <div style={{fontFamily:"monospace",fontSize:12,wordBreak:"break-all"}}>{lastError}</div>
                <button onClick={() => setLastError("")} style={{marginTop:8,fontSize:11,background:"none",border:"1px solid #f0c0c0",borderRadius:4,padding:"3px 8px",cursor:"pointer",color:"#8b0000"}}>Dismiss</button>
              </div>
            )}

            {/* Generate Meal Plan button */}
            <button className="btn-generate" onClick={generatePlan} disabled={generating}>
              {generating ? <><div className="spinner"/>Generating {activeDay} Meal Plan…</> : `✦ Generate ${activeDay} Meal Plan`}
            </button>

            {/* Meals */}
            {meals.length > 0 && (
              <div className="section">
                <div className="section-hd">
                  <div className="section-title">🍽 Meals to Prepare</div>
                </div>
                {meals.map(meal => (
                  <div className="meal-card" key={meal.id}>
                    <span className="meal-day">{meal.day}</span>
                    <div className="meal-body">
                      <div className="meal-cat">{meal.category}</div>
                      <div className="meal-name">{meal.name}</div>
                      {meal.notes && <div className="meal-notes">{meal.notes}</div>}
                    </div>
                    <button className="swap-btn" onClick={() => swapMeal(meal)} disabled={swapping===meal.id}>
                      {swapping===meal.id ? "…" : "Swap"}
                    </button>
                  </div>
                ))}
                <button
                  className="btn btn-outline btn-full"
                  style={{marginTop:4,borderStyle:"dashed",color:"var(--teal-mid)",borderColor:"var(--teal-light)"}}
                  onClick={addMeal}
                  disabled={addingMeal}
                >{addingMeal ? "Suggesting…" : "+ Suggest another meal"}</button>
              </div>
            )}

            {/* Shopping */}
            {shopping.length > 0 && (
              <div className="section">
                <div className="section-hd">
                  <div className="section-title">🛒 Shopping List</div>
                  <button className="btn btn-outline" style={{fontSize:12,padding:"4px 10px"}} onClick={refreshShopping} disabled={refreshingShop}>
                    {refreshingShop ? "Refreshing…" : "↺ Refresh"}
                  </button>
                </div>
                <div className="card">
                  <div className="shop-grid">
                    {shopping.map((item,i) => (
                      <div key={i} className={`shop-item ${checkedShop[i]?"checked":""}`} onClick={() => setCheckedShop(c=>({...c,[i]:!c[i]}))}>
                        <span className="shop-dot"/>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Action bar */}
            {(tasks.length > 0 || meals.length > 0) && (
              <div style={{display:"flex",gap:9,marginTop:20,paddingTop:18,borderTop:"1px solid var(--border)"}}>
                <button className="btn btn-danger" style={{flex:1}} onClick={() => { if(window.confirm("Clear the entire plan?")){ setTasks([]); setMeals([]); setShopping([]); setGreeting(""); setCheckedShop({}); } }}>
                  🗑 Clear Plan
                </button>
                <button className="btn btn-teal" style={{flex:2}} onClick={() => setShowPrint(true)}>
                  📋 Preview & Print
                </button>
              </div>
            )}
          </div>
        )}

        {/* ═══════════════════════ RECIPE BOX TAB ═══════════════════════ */}
        {activeTab === "recipes" && (
          <div className="content">
            <p className="hint">Save your family's favorite meals here. When you generate a plan, the AI picks 3 meals from this list and builds the shopping list automatically.</p>
            <div className="recipe-toolbar">
              <input className="search-input" placeholder="Search recipes…" value={recipeSearch} onChange={e => setRecipeSearch(e.target.value)} />
              <select className="filter-sel" value={recipeFilter} onChange={e => setRecipeFilter(e.target.value)}>
                <option value="All">All categories</option>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
              <button className="btn btn-gold" onClick={() => { setShowImport(true); setImportResults([]); setImportPhoto(null); setImportPasteText(""); setImportNameText(""); setImportBulkText(""); }}>
                + Import
              </button>
            </div>
            <div className="recipes-grid">
              {filteredRecipes.map(r => (
                <div className="recipe-card" key={r.id}>
                  <div className="recipe-cat">{r.category}</div>
                  <div className="recipe-name">{r.name}</div>
                  {r.cookTime && <div className="recipe-meta">Cook time: {r.cookTime}</div>}
                  {r.notes && <div className="recipe-notes">{r.notes}</div>}
                  {(!r.detailedIngredients?.length || !r.instructions?.length) && (
                    <button
                      className="recipe-btn"
                      style={{marginTop:8,width:"100%",justifyContent:"center",color:"var(--teal-dark)",borderColor:"var(--teal-light)",background:"var(--teal-faint)",display:"flex",alignItems:"center",gap:5}}
                      disabled={generatingDetails === r.id}
                      onClick={() => generateFullDetails(r)}
                    >
                      {generatingDetails === r.id
                        ? <><span className="spinner spinner-teal" style={{width:11,height:11,borderWidth:1.5}}/>Generating…</>
                        : "✦ Generate Full Details"}
                    </button>
                  )}
                  <div className="recipe-actions">
                    <button className="recipe-btn view" onClick={() => setViewingRecipe(r)}>View Recipe</button>
                    <button className="recipe-btn" onClick={() => openEditRecipe(r)}>Edit</button>
                    <button className="recipe-btn del" onClick={() => deleteRecipe(r.id)}>Remove</button>
                  </div>
                </div>
              ))}
              <div className="add-recipe-card" onClick={openNewRecipe}>
                <span>+</span>
                <span>Add a recipe</span>
              </div>
            </div>
            {filteredRecipes.length===0 && recipes.length>0 && (
              <div className="empty"><span>🔍</span>No recipes match your search.</div>
            )}
          </div>
        )}

        {/* ═══════════════════════ PREFERENCES TAB ═══════════════════════ */}
        {activeTab === "preferences" && (
          <div className="content">
            <p className="hint">Your food preferences are sent to the AI every time it suggests meals or generates a plan. The more detail you add, the better the suggestions.</p>
            <PreferencesPanel profile={profile} setProfile={setProfile} showToast={showToast} />
          </div>
        )}
      </div>

      {/* ═══ SETTINGS PANEL ═══ */}
      {showSettings && (
        <div className="overlay" onClick={e => e.target===e.currentTarget && setShowSettings(false)}>
          <div className="panel">
            <h2>Household Profile</h2>
            <div className="panel-section">Household</div>
            <div className="field">
              <label>Housekeeper's Name</label>
              <input value={draftProfile.housekeeperName} onChange={e => setDraftProfile(p=>({...p,housekeeperName:e.target.value}))} />
            </div>
            <div className="field">
              <label>Family Members</label>
              <input value={draftProfile.familyMembers} onChange={e => setDraftProfile(p=>({...p,familyMembers:e.target.value}))} />
            </div>
            <div className="field">
              <label>Visit Days (comma separated)</label>
              <input value={(draftProfile.housekeeperDays||[]).join(", ")} onChange={e => setDraftProfile(p=>({...p,housekeeperDays:e.target.value.split(",").map(d=>d.trim()).filter(Boolean)}))} />
            </div>
            <div className="panel-section">Tasks</div>
            <div className="field">
              <label>Standard Tasks (baseline for every visit)</label>
              <textarea rows={3} value={draftProfile.standardTasks} onChange={e => setDraftProfile(p=>({...p,standardTasks:e.target.value}))} />
            </div>
            <div className="field">
              <label>Extra Notes</label>
              <textarea rows={2} value={draftProfile.extraNotes} onChange={e => setDraftProfile(p=>({...p,extraNotes:e.target.value}))} />
              <div className="field-hint">Seasonal reminders, recurring situations, anything worth noting</div>
            </div>
            <div className="panel-actions">
              <button className="panel-cancel" onClick={() => setShowSettings(false)}>Cancel</button>
              <button className="panel-save" onClick={() => { setProfile(draftProfile); setShowSettings(false); showToast("Profile saved"); }}>Save</button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ TASK PANEL ═══ */}
      {showTaskPanel && (
        <div className="overlay" onClick={e => e.target===e.currentTarget && setShowTaskPanel(false)}>
          <div className="panel">
            <h2>Add Tasks</h2>
            <div className="import-tabs">
              {[["bulk","📋 Paste a List"],["ai","✦ AI Suggest"],["templates","📁 Templates"]].map(([k,label]) => (
                <button key={k} className={`itab ${taskPanelTab===k?"active":""}`} onClick={() => setTaskPanelTab(k)}>{label}</button>
              ))}
            </div>

            {taskPanelTab==="bulk" && (
              <div>
                <p className="hint">One task per line. All will be added at once. Great for pasting from your Notes app.</p>
                <textarea style={{width:"100%",border:"1px solid var(--border)",borderRadius:"var(--radius-sm)",padding:"9px 11px",fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"var(--ink)",background:"#fff",outline:"none",resize:"vertical",minHeight:110,marginBottom:8}}
                  placeholder={"One task per line:\n\nClean all bathrooms\nWash boys' laundry\nVacuum upstairs\nWipe patio furniture"}
                  value={bulkText} onChange={e => setBulkText(e.target.value)} />
                {bulkText.trim() && <div style={{fontSize:12,color:"var(--teal-mid)",marginBottom:8,fontWeight:500}}>{bulkText.trim().split("\n").filter(l=>l.trim()).length} tasks to add</div>}
                <div className="panel-actions">
                  <button className="panel-cancel" onClick={() => setShowTaskPanel(false)}>Cancel</button>
                  <button className="panel-save" onClick={addBulkTasks} disabled={!bulkText.trim()}>Add to List</button>
                </div>
              </div>
            )}

            {taskPanelTab==="ai" && (
              <div>
                <p className="hint">Describe a situation and the AI adds relevant tasks — it already knows what's on your list and won't repeat anything.</p>
                <input style={{width:"100%",border:"1px solid var(--border)",borderRadius:"var(--radius-sm)",padding:"9px 11px",fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"var(--ink)",background:"#fff",outline:"none",marginBottom:8}}
                  placeholder="e.g. The boys are having friends over Friday, or It needs a deep clean…"
                  value={aiPrompt} onChange={e => setAiPrompt(e.target.value)}
                  onKeyDown={e => e.key==="Enter" && suggestTasks()} />
                <div className="panel-actions">
                  <button className="panel-cancel" onClick={() => setShowTaskPanel(false)}>Cancel</button>
                  <button className="panel-save" onClick={suggestTasks} disabled={aiTaskBusy||!aiPrompt.trim()}>
                    {aiTaskBusy ? "Thinking…" : "Suggest Tasks"}
                  </button>
                </div>
              </div>
            )}

            {taskPanelTab==="templates" && (
              <div>
                <p className="hint">Load a saved checklist in one click, or save your current task list as a new template.</p>
                {templates.map(tmpl => (
                  <div className="tmpl-card" key={tmpl.id}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:5}}>
                      <span className="tmpl-name">{tmpl.name}</span>
                      <div style={{display:"flex",gap:5}}>
                        <button className="recipe-btn" onClick={() => loadTemplate(tmpl)}>Load</button>
                        <button className="recipe-btn" onClick={() => { setShowTaskPanel(false); openEditTemplate(tmpl); }}>Edit</button>
                        <button className="recipe-btn del" onClick={() => { setTemplates(ts=>ts.filter(t=>t.id!==tmpl.id)); showToast("Template removed"); }}>Remove</button>
                      </div>
                    </div>
                    <div className="tmpl-preview">{tmpl.tasks.slice(0,3).join(" · ")}{tmpl.tasks.length>3?` · +${tmpl.tasks.length-3} more`:""}</div>
                  </div>
                ))}
                <div style={{borderTop:"1px dashed var(--border)",paddingTop:13,marginTop:8}}>
                  <div style={{fontSize:12,color:"var(--ink-soft)",marginBottom:7,fontWeight:500}}>Save current task list as a template:</div>
                  <div style={{display:"flex",gap:7}}>
                    <input style={{flex:1,border:"1px solid var(--border)",borderRadius:"var(--radius-sm)",padding:"8px 10px",fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"var(--ink)",background:"#fff",outline:"none"}}
                      placeholder="Template name, e.g. Deep Clean Monday"
                      value={newTmplName} onChange={e => setNewTmplName(e.target.value)}
                      onKeyDown={e => e.key==="Enter" && saveAsTemplate()} />
                    <button className="panel-save" style={{flex:"0 0 auto",padding:"8px 14px"}} onClick={saveAsTemplate}>Save</button>
                  </div>
                  <div style={{fontSize:11,color:"var(--ink-faint)",marginTop:4}}>Saves all {tasks.length} tasks currently on the {activeDay} plan</div>
                </div>
                <div className="panel-actions" style={{marginTop:14}}>
                  <button className="panel-cancel" onClick={() => setShowTaskPanel(false)}>Done</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══ EDIT TEMPLATE PANEL ═══ */}
      {editingTemplate && (
        <div className="overlay" onClick={e => e.target===e.currentTarget && setEditingTemplate(null)}>
          <div className="panel" style={{maxWidth:520}}>
            <h2>Edit Template</h2>

            <div className="field" style={{marginBottom:16}}>
              <label>Template Name</label>
              <input
                value={editTmplName}
                onChange={e => setEditTmplName(e.target.value)}
                placeholder="e.g. Deep Clean Monday"
              />
            </div>

            <div style={{fontSize:11,textTransform:"uppercase",letterSpacing:"0.06em",color:"var(--ink-soft)",fontWeight:500,marginBottom:8}}>
              Tasks ({editTmplTasks.length})
            </div>

            <div className="card" style={{marginBottom:12,maxHeight:300,overflowY:"auto"}}>
              {editTmplTasks.length === 0 && (
                <div style={{padding:"16px 14px",fontSize:13,color:"var(--ink-faint)"}}>No tasks yet — add one below.</div>
              )}
              {editTmplTasks.map((task, idx) => (
                <div className="task-row" key={idx}>
                  <span className="task-text" style={{flex:1}}>{task}</span>
                  <button className="task-del" onClick={() => removeEditTask(idx)} title="Remove task">×</button>
                </div>
              ))}
              <div className="add-row">
                <input
                  className="add-input"
                  placeholder="Add a task and press Enter…"
                  value={newEditTask}
                  onChange={e => setNewEditTask(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && addEditTask()}
                />
                <button className="add-btn" onClick={addEditTask}>+</button>
              </div>
            </div>

            <div className="panel-actions">
              <button className="panel-cancel" onClick={() => setEditingTemplate(null)}>Cancel</button>
              <button className="panel-save" onClick={saveEditedTemplate}>Save Template</button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ RECIPE DETAIL VIEW ═══ */}
      {viewingRecipe && (
        <div className="overlay" onClick={e => e.target === e.currentTarget && setViewingRecipe(null)}>
          <div className="recipe-detail-panel">

            {/* Sticky header */}
            <div className="recipe-detail-header">
              <button className="recipe-detail-close" onClick={() => setViewingRecipe(null)}>×</button>
              <div className="recipe-detail-title">{viewingRecipe.name}</div>
              <div className="recipe-detail-meta">
                <span>{viewingRecipe.category}</span>
                {viewingRecipe.cookTime && <><span>·</span><span>⏱ {viewingRecipe.cookTime}</span></>}
              </div>
            </div>

            <div className="recipe-detail-body">

              {/* Family Notes */}
              {viewingRecipe.notes && (
                <div className="recipe-detail-section">
                  <div className="recipe-detail-section-title">Family Notes</div>
                  <div className="recipe-notes-box">{viewingRecipe.notes}</div>
                </div>
              )}

              {/* Ingredients */}
              {viewingRecipe.detailedIngredients?.length > 0 ? (
                <div className="recipe-detail-section">
                  <div className="recipe-detail-section-title">Ingredients</div>
                  <ul className="recipe-ing-list">
                    {viewingRecipe.detailedIngredients.map((ing, i) => (
                      <li key={i} className="recipe-ing-item">
                        <span className="recipe-ing-dot" />
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : viewingRecipe.ingredients ? (
                <div className="recipe-detail-section">
                  <div className="recipe-detail-section-title">Ingredients</div>
                  <div style={{fontSize:14,color:"var(--ink)",lineHeight:1.6}}>{viewingRecipe.ingredients}</div>
                </div>
              ) : null}

              {/* Instructions */}
              {viewingRecipe.instructions?.length > 0 && (
                <div className="recipe-detail-section">
                  <div className="recipe-detail-section-title">Instructions</div>
                  {viewingRecipe.instructions.map((step, i) => (
                    <div key={i} className="recipe-step">
                      <span className="recipe-step-num">{i + 1}</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tips */}
              {viewingRecipe.tips && (
                <div className="recipe-detail-section">
                  <div className="recipe-detail-section-title">Tips &amp; Serving</div>
                  <div className="recipe-tips-box">{viewingRecipe.tips}</div>
                </div>
              )}

              <div style={{display:"flex",gap:9,marginTop:8}}>
                <button className="panel-cancel" style={{flex:1}} onClick={() => setViewingRecipe(null)}>Close</button>
                <button className="panel-save" style={{flex:1}} onClick={() => { setViewingRecipe(null); openEditRecipe(viewingRecipe); }}>Edit Recipe</button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ═══ RECIPE FORM ═══ */}
      {showRecipeForm && (
        <div className="overlay" onClick={e => e.target===e.currentTarget && setShowRecipeForm(false)}>
          <div className="panel">
            <h2>{editingRecipe ? "Edit Recipe" : "Add a Recipe"}</h2>
            <div className="field">
              <label>Recipe Name</label>
              <input placeholder="e.g. Mom's Pot Roast" value={draftRecipe.name} onChange={e => setDraftRecipe(r=>({...r,name:e.target.value}))} />
            </div>
            <div className="field-2col">
              <div className="field">
                <label>Category</label>
                <select value={draftRecipe.category} onChange={e => setDraftRecipe(r=>({...r,category:e.target.value}))}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="field">
                <label>Cook Time</label>
                <input placeholder="e.g. 1 hr" value={draftRecipe.cookTime} onChange={e => setDraftRecipe(r=>({...r,cookTime:e.target.value}))} />
              </div>
            </div>
            <div className="field">
              <label>Family Notes</label>
              <textarea rows={2} placeholder="e.g. Boys love this. Double the recipe. Good for Sundays." value={draftRecipe.notes} onChange={e => setDraftRecipe(r=>({...r,notes:e.target.value}))} />
              <div className="field-hint">Brief note shown on the recipe card and to the housekeeper</div>
            </div>
            <div className="field">
              <label>Detailed Ingredients</label>
              <textarea rows={6} placeholder={"One ingredient per line with quantity, e.g:\n2 lbs chicken thighs, boneless\n4 cloves garlic, minced\n3 tbsp olive oil"} value={draftRecipe.detailedIngredients} onChange={e => setDraftRecipe(r=>({...r,detailedIngredients:e.target.value}))} />
              <div className="field-hint">One ingredient per line — quantities will appear in the full recipe view</div>
            </div>
            <div className="field">
              <label>Step-by-Step Instructions</label>
              <textarea rows={8} placeholder={"One step per line, e.g:\nPreheat oven to 400°F and line a sheet pan with parchment.\nPat chicken dry and season all over with salt and pepper.\nRoast 25–30 minutes until golden and cooked through."} value={draftRecipe.instructions} onChange={e => setDraftRecipe(r=>({...r,instructions:e.target.value}))} />
              <div className="field-hint">One step per line — steps are numbered automatically in the recipe view</div>
            </div>
            <div className="field">
              <label>Tips &amp; Serving Suggestions</label>
              <textarea rows={2} placeholder="e.g. Great served with crusty bread. Leftovers freeze well for up to 3 months." value={draftRecipe.tips} onChange={e => setDraftRecipe(r=>({...r,tips:e.target.value}))} />
              <div className="field-hint">Optional — shown in a highlighted box at the bottom of the recipe</div>
            </div>
            <div className="panel-actions">
              <button className="panel-cancel" onClick={() => setShowRecipeForm(false)}>Cancel</button>
              <button className="panel-save" onClick={saveRecipe}>{editingRecipe?"Save Changes":"Add Recipe"}</button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ IMPORT MODAL ═══ */}
      {showImport && (
        <div className="overlay" onClick={e => e.target===e.currentTarget && setShowImport(false)}>
          <div className="panel" style={{maxWidth:540}}>
            <h2>Import Recipes</h2>
            <div className="import-tabs">
              {[["name","✏️ By Name"],["paste","📋 Paste Text"],["photo","📷 From Photo"],["bulk","📦 Bulk List"]].map(([k,label]) => (
                <button key={k} className={`itab ${importTab===k?"active":""}`} onClick={() => { setImportTab(k); setImportResults([]); }}>{label}</button>
              ))}
            </div>

            {importTab==="name" && (
              <div>
                <p className="hint">Type a recipe name and the AI fills in the details — category, ingredients, cook time, and notes.</p>
                <input style={{width:"100%",border:"1px solid var(--border)",borderRadius:"var(--radius-sm)",padding:"9px 11px",fontFamily:"'DM Sans',sans-serif",fontSize:14,color:"var(--ink)",background:"#fff",outline:"none"}}
                  placeholder="e.g. Mom's Chicken Soup, Beef Tacos, Shrimp Scampi…"
                  value={importNameText} onChange={e => setImportNameText(e.target.value)}
                  onKeyDown={e => e.key==="Enter" && parseImport([{type:"text",text:`Recipe name: "${importNameText}". Generate details for this one recipe.`}])} />
                <button className="panel-save" style={{width:"100%",marginTop:10}} disabled={importBusy||!importNameText.trim()}
                  onClick={() => parseImport([{type:"text",text:`Recipe name: "${importNameText}". Generate details for this one recipe.`}])}>
                  {importBusy ? "Looking up…" : "Fill In Recipe Details"}
                </button>
              </div>
            )}

            {importTab==="paste" && (
              <div>
                <p className="hint">Copy a recipe from any website, email, or document and paste it below. Works with one recipe or several at once.</p>
                <textarea style={{width:"100%",border:"1px solid var(--border)",borderRadius:"var(--radius-sm)",padding:"9px 11px",fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"var(--ink)",background:"#fff",outline:"none",resize:"vertical",minHeight:120,marginBottom:8}}
                  placeholder="Paste recipe text here…" value={importPasteText} onChange={e => setImportPasteText(e.target.value)} />
                <button className="panel-save" style={{width:"100%"}} disabled={importBusy||!importPasteText.trim()}
                  onClick={() => parseImport([{type:"text",text:`Extract recipes from this text:\n${importPasteText}`}])}>
                  {importBusy ? "Reading…" : "Extract Recipe"}
                </button>
              </div>
            )}

            {importTab==="photo" && (
              <div>
                <p className="hint">Take a photo of a recipe card or cookbook page. The AI reads it and fills everything in.</p>
                <label>
                  <div className="drop-zone" onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();handlePhotoImport(e.dataTransfer.files[0]);}}>
                    {importPhoto
                      ? <img src={importPhoto} alt="recipe" style={{maxWidth:"100%",maxHeight:160,borderRadius:6,objectFit:"contain"}} />
                      : <><div style={{fontSize:32,marginBottom:8}}>📷</div><div style={{fontSize:14,fontWeight:500,color:"var(--ink)",marginBottom:3}}>Tap to choose a photo</div><div style={{fontSize:12,color:"var(--ink-faint)"}}>JPG, PNG, or HEIC</div></>
                    }
                    <input type="file" accept="image/*" onChange={e => handlePhotoImport(e.target.files[0])} />
                  </div>
                </label>
                {importBusy && <div style={{textAlign:"center",padding:"12px 0",color:"var(--ink-soft)",fontSize:13}}>Reading image…</div>}
              </div>
            )}

            {importTab==="bulk" && (
              <div>
                <p className="hint">One recipe name per line — the AI generates details for all of them at once.</p>
                <textarea style={{width:"100%",border:"1px solid var(--border)",borderRadius:"var(--radius-sm)",padding:"9px 11px",fontFamily:"'DM Sans',sans-serif",fontSize:13,color:"var(--ink)",background:"#fff",outline:"none",resize:"vertical",minHeight:120,marginBottom:8}}
                  placeholder={"One name per line:\n\nLemon Herb Chicken\nPasta Bolognese\nBBQ Ribs\nVegetable Stir Fry"} value={importBulkText} onChange={e => setImportBulkText(e.target.value)} />
                {importBulkText.trim() && <div style={{fontSize:12,color:"var(--teal-mid)",marginBottom:8,fontWeight:500}}>{importBulkText.trim().split("\n").filter(l=>l.trim()).length} recipes to import</div>}
                <button className="panel-save" style={{width:"100%"}} disabled={importBusy||!importBulkText.trim()}
                  onClick={() => parseImport([{type:"text",text:`Generate recipe details for each of these names, one object per recipe:\n${importBulkText}`}])}>
                  {importBusy ? "Generating…" : "Generate All Details"}
                </button>
              </div>
            )}

            {/* Results */}
            {importResults.length > 0 && (
              <div style={{marginTop:16}}>
                <div style={{fontSize:11,textTransform:"uppercase",letterSpacing:"0.06em",color:"var(--teal-mid)",fontWeight:500,marginBottom:8}}>
                  {importResults.length} recipe{importResults.length>1?"s":""} found — select which to add:
                </div>
                {importResults.map(r => (
                  <div key={r.id} className={`import-result ${isSelected(r.id)?"selected":""}`}>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13,fontWeight:500,color:"var(--ink)"}}>{r.name}</div>
                      <div style={{fontSize:11,color:"var(--ink-faint)",marginTop:2}}>{r.category}{r.cookTime?` · ${r.cookTime}`:""}</div>
                      {r.ingredients && <div style={{fontSize:11,color:"var(--ink-faint)",marginTop:2}}>{r.ingredients}</div>}
                      {r.notes && <div style={{fontSize:12,color:"var(--ink-soft)",marginTop:3}}>{r.notes}</div>}
                    </div>
                    <button className={`import-sel-btn ${isSelected(r.id)?"on":""}`} onClick={() => toggleImportSelect(r.id)}>
                      {isSelected(r.id)?"✓ Selected":"Select"}
                    </button>
                  </div>
                ))}
                <div className="panel-actions" style={{marginTop:12}}>
                  <button className="panel-cancel" onClick={() => setShowImport(false)}>Cancel</button>
                  <button className="panel-save" onClick={addImportedRecipes}>
                    Add {importResults.filter(r=>isSelected(r.id)).length} to Recipe Box
                  </button>
                </div>
              </div>
            )}

            {!importBusy && !importResults.length && (
              <div className="panel-actions" style={{marginTop:16}}>
                <button className="panel-cancel" onClick={() => setShowImport(false)}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══ PRINT SHEET ═══ */}
      {showPrint && (
        <div className="overlay" onClick={e => e.target===e.currentTarget && setShowPrint(false)}>
          <div className="print-panel">
            <div className="print-hd">
              <h2>Instructions for {profile.housekeeperName} — {activeDay}</h2>
              <p>{today.toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</p>
            </div>
            {tasks.length > 0 && (
              <div className="print-section">
                <h3>🧹 Tasks</h3>
                {tasks.map(t => <div className="print-task" key={t.id}>{t.text}{t.tag!=="routine"?<span style={{fontSize:11,color:"var(--ink-faint)"}}> ({t.tag})</span>:""}</div>)}
              </div>
            )}
            {meals.length > 0 && (
              <div className="print-section">
                <h3>🍽 Meals to Prepare</h3>
                {meals.map(m => {
                  const rec = recipes.find(r => r.name.toLowerCase() === m.name.toLowerCase());
                  const ings = rec?.detailedIngredients?.length ? rec.detailedIngredients : null;
                  const steps = rec?.instructions?.length ? rec.instructions : null;
                  return (
                    <div className="print-meal" key={m.id}>
                      <div className="print-meal-top">
                        <span className="print-meal-day">{m.day}</span>
                        <span><strong>{m.name}</strong>{m.notes ? ` — ${m.notes}` : ""}</span>
                      </div>
                      {(ings || steps) && (
                        <div className="print-meal-details">
                          {ings && <>
                            <div className="print-meal-details-label">Ingredients</div>
                            <ul className="print-meal-ing">
                              {ings.map((ing, i) => <li key={i}>{ing}</li>)}
                            </ul>
                          </>}
                          {steps && <>
                            <div className="print-meal-details-label">Instructions</div>
                            <ol className="print-meal-steps">
                              {steps.map((step, i) => (
                                <li key={i}><span className="step-num">{i+1}</span>{step}</li>
                              ))}
                            </ol>
                          </>}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            {shopping.length > 0 && (
              <div className="print-section">
                <h3>🛒 Shopping List</h3>
                <div className="print-shop-grid">
                  {shopping.map((item,i) => <div className="print-shop-item" key={i}>{item}</div>)}
                </div>
              </div>
            )}
            {greeting && <div style={{fontSize:12,color:"var(--ink-soft)",fontStyle:"italic",marginTop:10,borderTop:"1px solid var(--border)",paddingTop:10}}>{greeting}</div>}

            <div style={{display:"flex",gap:9,marginTop:18,borderTop:"1px solid var(--border)",paddingTop:14}}>
              <button className="panel-cancel" onClick={() => setShowPrint(false)}>Close</button>
              <button
                className="btn-share"
                onClick={generateAndSharePDF}
                disabled={generatingPdf}
                style={{flex:1}}
              >
                {generatingPdf
                  ? <><div className="spinner" style={{width:13,height:13,borderWidth:2}}/>Generating PDF…</>
                  : canNativeShare ? "⬆ Share as PDF" : "⬇ Download PDF"
                }
              </button>
              <button className="panel-save" onClick={() => window.print()} style={{flex:"0 0 auto",padding:"10px 16px"}}>
                🖨 Print
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ TASK LIBRARY PANEL ═══ */}
      {showTaskLibrary && (
        <div className="overlay" onClick={e => e.target === e.currentTarget && setShowTaskLibrary(false)}>
          <div className="tl-panel">
            {/* Header */}
            <div className="tl-header">
              <div className="tl-title">Select Tasks for {activeDay}'s Visit</div>
              <div className="tl-subtitle">Check the tasks you want to add to today's plan</div>
            </div>

            {/* Search + counter */}
            <div className="tl-search-row">
              <input
                className="tl-search"
                type="text"
                placeholder="Search tasks…"
                value={tlSearch}
                onChange={e => setTlSearch(e.target.value)}
                autoFocus
              />
              <span className="tl-counter">{tlSelectedCount} selected</span>
            </div>

            {/* Category list */}
            <div className="tl-body">
              {TASK_LIBRARY.map(cat => {
                const q = tlSearch.toLowerCase();
                const visible = cat.tasks.filter(t => !q || t.text.toLowerCase().includes(q));
                if (!visible.length) return null;
                const isOpen = tlOpenCats[cat.category] !== false;
                const checkedInCat = visible.filter(t => selectedLibraryTasks[t.id]).length;
                const allInCat = visible.every(t => selectedLibraryTasks[t.id]);
                return (
                  <div className="tl-cat" key={cat.category}>
                    <button
                      className="tl-cat-hd"
                      onClick={() => setTlOpenCats(prev => ({ ...prev, [cat.category]: !isOpen }))}
                    >
                      <span className={`tl-cat-chevron ${isOpen ? "open" : ""}`}>▶</span>
                      <span className="tl-cat-name">{cat.category}</span>
                      {checkedInCat > 0 && (
                        <span className="tl-cat-meta">{checkedInCat}/{visible.length} selected</span>
                      )}
                      <button
                        className="tl-select-all"
                        onClick={e => { e.stopPropagation(); tlToggleCat(cat.category); }}
                      >
                        {allInCat ? "Deselect all" : "Select all"}
                      </button>
                    </button>
                    {isOpen && (
                      <div className="tl-tasks">
                        {visible.map(task => (
                          <div
                            className="tl-task-row"
                            key={task.id}
                            onClick={() => tlToggleTask(task.id)}
                          >
                            <div className={`tl-checkbox ${selectedLibraryTasks[task.id] ? "checked" : ""}`} />
                            <span className="tl-task-text">{task.text}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="tl-footer">
              <button className="panel-cancel" onClick={() => { setShowTaskLibrary(false); setSelectedLibraryTasks({}); setTlSearch(""); }}>
                Cancel
              </button>
              <button
                className="panel-save"
                disabled={tlSelectedCount === 0}
                onClick={addLibraryTasks}
                style={tlSelectedCount === 0 ? { opacity: 0.45 } : {}}
              >
                Add {tlSelectedCount > 0 ? tlSelectedCount : ""} Task{tlSelectedCount !== 1 ? "s" : ""} to Plan
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="toast">{toast}</div>}

      {showInstallBanner && (
        <div className="install-banner">
          <div className="install-banner-text">
            <strong>Add to Home Screen</strong>
            Install House Helper for the best experience — works offline too.
          </div>
          <div className="install-banner-btns">
            <button className="install-btn" onClick={handleInstall}>Install</button>
            <button className="install-dismiss" onClick={dismissInstallBanner}>Not now</button>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Preferences Panel ────────────────────────────────────────────────────────
function PreferencesPanel({ profile, setProfile, showToast }) {
  const [draft, setDraft] = useState({...profile});
  const save = () => { setProfile(draft); showToast("Preferences saved"); };
  return (
    <div className="card" style={{padding:"18px 20px"}}>
      <div className="field">
        <label>Foods the family loves</label>
        <textarea rows={3} placeholder="e.g. Italian food, grilled meats, Mexican food, pasta, hearty stews, anything with cheese…" value={draft.dietaryNotes} onChange={e => setDraft(d=>({...d,dietaryNotes:e.target.value}))} />
        <div className="field-hint">Cuisines, ingredients, cooking styles — the more specific the better</div>
      </div>
      <div className="field" style={{marginTop:12}}>
        <label>Dietary rules and restrictions</label>
        <textarea rows={3} placeholder="e.g. No shellfish. Boys eat large portions. Husband prefers lighter dinners on weekdays. No pork on Fridays…" value={draft.extraNotes} onChange={e => setDraft(d=>({...d,extraNotes:e.target.value}))} />
        <div className="field-hint">Allergies, portion preferences, health considerations, religious restrictions</div>
      </div>
      <button className="btn btn-teal" style={{marginTop:14,padding:"10px 20px"}} onClick={save}>Save Preferences</button>
    </div>
  );
}

export { HouseHelper as App };
