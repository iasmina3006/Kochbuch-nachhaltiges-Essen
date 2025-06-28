// script.js
// script.js
const recipes = [
  {
    id: 1,
    title: "Kartoffelsalat mit Kräutern",
    season: "sommer",
    ingredients: ["Kartoffeln", "Frühlingszwiebeln", "Essig", "Öl", "Senf", "Salz", "Pfeffer", "Petersilie"],
    quantities: [500, 60, 30, 30, 10, 3, 1, 5], // in Gramm
    image: "images/kartoffelsalat.jpg",
    instructions: "1. Kartoffeln kochen, pellen und abkühlen lassen.\n2. In Scheiben schneiden und mit geschnittenen Zwiebeln mischen.\n3. Aus Essig, Öl, Senf und Gewürzen ein Dressing anrühren.\n4. Alles gut vermengen und mit Kräutern garnieren.",
    prepTime: "30 Minuten",
    difficulty: "einfach"
  },
  {
    id: 2,
    title: "Lauchkuchen",
    season: "herbst",
    ingredients: ["Mürbeteig", "Lauch", "Eier", "Käse"],
    quantities: [250, 300, 100, 100], // 2 Eier ≈ 100g
    image: "images/lauchkuchen.jpg",
    instructions: "1. Lauch anbraten, mit Ei-Käse-Mix vermengen.\n2. In Teig geben und 30 Min backen.",
    prepTime: "45 Minuten",
    difficulty: "mittel"
  },
  {
    id: 3,
    title: "Spargelsalat mit Radieschen",
    season: "fruehling",
    ingredients: ["grüner Spargel", "Radieschen", "Zitronensaft", "Olivenöl", "Salz", "Pfeffer", "Petersilie"],
    quantities: [250, 100, 15, 10, 2, 1, 5],
    image: "images/spargelsalat.jpg",
    instructions: "1. Spargel waschen, Enden abschneiden, kurz kochen oder braten.\n2. Radieschen in Scheiben schneiden.\n3. Alles mit Dressing vermengen und mit Kräutern garnieren.",
    prepTime: "25 Minuten",
    difficulty: "einfach"
  },
  {
    id: 4,
    title: "Tomatensalat",
    season: "sommer",
    ingredients: ["Tomaten", "Zwiebel", "Essig", "Öl", "Basilikum"],
    quantities: [300, 60, 15, 15, 5],
    image: "images/tomatensalat.jpg",
    instructions: "1. Tomaten und Zwiebeln schneiden.\n2. Mit Dressing und Kräutern vermengen.",
    prepTime: "15 Minuten",
    difficulty: "einfach"
  },
  {
    id: 5,
    title: "Zucchini-Quiche",
    season: "sommer",
    ingredients: ["Quiche-Teig", "Zucchini", "Sahne", "Eier"],
    quantities: [250, 300, 100, 100],
    image: "images/zucchini-quiche.jpg",
    instructions: "1. Zucchini anbraten, auf Teig verteilen.\n2. Guss darübergießen, backen bei 180°C für 35 Min.",
    prepTime: "50 Minuten",
    difficulty: "mittel"
  },
  {
    id: 6,
    title: "Erdbeerkuchen",
    season: "fruehling",
    ingredients: ["Biskuitboden", "Erdbeeren", "Tortenguss"],
    quantities: [150, 400, 12],
    image: "images/erdbeerkuchen.jpg",
    instructions: "1. Boden mit Erdbeeren belegen.\n2. Guss zubereiten und darübergeben.",
    prepTime: "30 Minuten",
    difficulty: "einfach"
  },
  {
    id: 7,
    title: "Bratapfel",
    season: "winter",
    ingredients: ["Äpfel", "Rosinen", "Nüsse", "Honig", "Zimt"],
    quantities: [300, 30, 30, 20, 2],
    image: "images/bratapfel.jpg",
    instructions: "1. Äpfel aushöhlen, füllen, bei 180°C backen.",
    prepTime: "40 Minuten",
    difficulty: "einfach"
  },
  {
    id: 8,
    title: "Kürbiscremesuppe",
    season: "herbst",
    ingredients: ["Hokkaido-Kürbis", "Zwiebel", "Gemüsebrühe", "Sahne"],
    quantities: [400, 100, 500, 100],
    image: "images/kuerbiscremesuppe.jpg",
    instructions: "1. Kürbis würfeln, anbraten, mit Brühe kochen.\n2. Pürieren, Sahne zugeben, würzen.",
    prepTime: "35 Minuten",
    difficulty: "einfach"
  },
  {
    id: 9,
    title: "Kartoffelgratin",
    season: "winter",
    ingredients: ["Kartoffeln", "Sahne", "Käse", "Salz", "Pfeffer"],
    quantities: [600, 150, 100, 3, 1],
    image: "images/kartoffelgratin.jpg",
    instructions: "1. Kartoffeln hobeln, mit Sahne & Käse schichten.\n2. Backen bei 180°C ca. 40 Minuten.",
    prepTime: "60 Minuten",
    difficulty: "mittel"
  }
];

// Initialisierung
document.addEventListener('DOMContentLoaded', function() {
  renderRecipes();
  renderIngredientFilters();
  setupSeasonFilters();
});

// Rezeptkacheln rendern
function renderRecipes(filteredIngredients = [], season = null) {
  const container = document.getElementById('recipeContainer');
  container.innerHTML = '';

  let filteredRecipes = recipes;

  // Filter nach Zutaten
  if (filteredIngredients.length > 0) {
    filteredRecipes = filteredRecipes.filter(recipe =>
      filteredIngredients.every(ing =>
        recipe.ingredients.some(recipeIng =>
          recipeIng.toLowerCase().includes(ing.toLowerCase())
        )
      )
    );
  }

  // Filter nach Saison
  if (season) {
    filteredRecipes = filteredRecipes.filter(recipe => recipe.season === season);
  }

  if (filteredRecipes.length === 0) {
    container.innerHTML = '<p class="no-results">Keine Rezepte gefunden. Bitte passen Sie Ihre Filter an.</p>';
    return;
  }

  filteredRecipes.forEach(recipe => {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}">
      <div class="recipe-info">
        <h3>${recipe.title}</h3>
        <div class="recipe-meta">
          <span class="season-badge ${recipe.season}">${getSeasonName(recipe.season)}</span>
          <span>${recipe.prepTime}</span>
          <span>${recipe.difficulty}</span>
        </div>
        <p>${recipe.ingredients.slice(0, 3).join(', ')}${recipe.ingredients.length > 3 ? '...' : ''}</p>
      </div>
    `;
    card.addEventListener('click', () => openModal(recipe));
    container.appendChild(card);
  });
}

const ingredientData = {
  "Kartoffeln": { price: 1.2 },       // €/kg
  "Frühlingszwiebeln": { price: 1.5 },
  "Essig": { price: 0.8 },
  "Öl": { price: 3.5 },
  "Senf": { price: 2.0 },
  "Salz": { price: 0.2 },
  "Pfeffer": { price: 6.0 },
  "Petersilie": { price: 1.0 },
  "Mürbeteig": { price: 2.5 },
  "Lauch": { price: 1.0 },
  "Eier": { price: 3.0 },
  "Käse": { price: 9.0 },
  "grüner Spargel": { price: 4.0 },
  "Radieschen": { price: 1.2 },
  "Zitronensaft": { price: 2.0 },
  "Olivenöl": { price: 6.5 },
  "Tomaten": { price: 2.2 },
  "Zwiebel": { price: 0.6 },
  "Basilikum": { price: 1.2 },
  "Quiche-Teig": { price: 2.0 },
  "Zucchini": { price: 1.5 },
  "Sahne": { price: 1.8 },
  "Biskuitboden": { price: 1.5 },
  "Erdbeeren": { price: 4.0 },
  "Tortenguss": { price: 1.0 },
  "Äpfel": { price: 2.0 },
  "Rosinen": { price: 3.5 },
  "Nüsse": { price: 8.0 },
  "Honig": { price: 6.0 },
  "Zimt": { price: 20.0 },
  "Hokkaido-Kürbis": { price: 1.8 },
  "Gemüsebrühe": { price: 1.0 },
  "Kartoffeln": { price: 1.2 }
};


// Hilfsfunktion für Saisonnamen
function getSeasonName(season) {
  const seasons = {
    'fruehling': 'Frühling',
    'sommer': 'Sommer',
    'herbst': 'Herbst',
    'winter': 'Winter'
  };
  return seasons[season] || season;
}

// Zutatenfilter rendern
function renderIngredientFilters() {
  const container = document.querySelector('.ingredient-filter');
  const allIngredients = [...new Set(recipes.flatMap(recipe => recipe.ingredients))];

  allIngredients.forEach(ingredient => {
    const chip = document.createElement('div');
    chip.className = 'filter-chip';
    chip.textContent = ingredient;
    chip.addEventListener('click', () => {
      chip.classList.toggle('active');
      const activeIngredients = [...document.querySelectorAll('.filter-chip.active')]
        .map(chip => chip.textContent);
      renderRecipes(activeIngredients, getActiveSeason());
    });
    container.appendChild(chip);
  });
}

// Saisonfilter einrichten
function setupSeasonFilters() {
  const seasonLinks = document.querySelectorAll('nav a');

  seasonLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();

      // Skip "Reset"
      if (link.textContent === 'Reset') {
        seasonLinks.forEach(l => {
          if (l.textContent !== 'Reset') {
            l.classList.remove('active');
          }
        });

        renderRecipes(); // Zeige alle Rezepte ohne Filter
        return;
      }

      // Deaktiviere alle außer "Reset"
      seasonLinks.forEach(l => {
        if (l.textContent !== 'Reset') {
          l.classList.remove('active');
        }
      });

      // Setze "active" auf angeklickte Saison
      link.classList.add('active');

      // Filterlogik
      let season = null;
      if (link.textContent === 'Frühling') season = 'fruehling';
      else if (link.textContent === 'Sommer') season = 'sommer';
      else if (link.textContent === 'Herbst') season = 'herbst';
      else if (link.textContent === 'Winter') season = 'winter';

      renderRecipes(getActiveIngredients(), season);
    });
  });
}

// Aktive Zutatenfilter auslesen
function getActiveIngredients() {
  return [...document.querySelectorAll('.filter-chip.active')]
    .map(chip => chip.textContent);
}

// Aktive Saison auslesen
function getActiveSeason() {
  const activeLink = document.querySelector('nav a.active');
  if (!activeLink) return null;

  const linkText = activeLink.textContent;
  if (linkText === 'Frühling') return 'fruehling';
  if (linkText === 'Sommer') return 'sommer';
  if (linkText === 'Herbst') return 'herbst';
  if (linkText === 'Winter') return 'winter';
  return null;
}

// Modal für Rezeptdetails
function openModal(recipe) {
  let totalCO2Initial = 0;
  let totalPriceInitial = 0;

  const modal = document.getElementById('recipeModal');
  const modalContent = document.getElementById('modalContent');

  // Kopie der Standardmengen (gramm)
  const ingredientQuantities = [...recipe.quantities]; // wichtig für Reset bei Schließen

  function calculateTotals() {
    let totalPrice = 0;

    recipe.ingredients.forEach((ing, i) => {
      const data = ingredientData[ing];
      const quantity = ingredientQuantities[i] || 0;
      if (data) {
        totalPrice += (data.price / 1000) * quantity;
      }
    });
    return {
      co2: totalCO2Initial.toFixed(2),
      price: totalPrice.toFixed(2)
    };
  }

  const totals = calculateTotals();

  modalContent.innerHTML = `
  <div class="modal-header">
    <h2>${recipe.title}</h2>
    <div class="recipe-meta">
      <span class="season-badge ${recipe.season}">${getSeasonName(recipe.season)}</span>
      <span>${recipe.prepTime}</span>
      <span>${recipe.difficulty}</span>
    </div>
  </div>
  <img src="${recipe.image}" alt="${recipe.title}" class="modal-image">
  <div class="modal-body green-box">
    <div class="modal-columns">
    
      <div class="ingredients-section">
        <h3>Zutaten:</h3>
        <ul class="ingredient-list">
          ${recipe.ingredients.map((ing, i) => `
            <li>
              <span class="ingredient-name">${ing} <span class="unit">(in Gramm)</span></span>
              <div class="quantity-control">
                <input type="number" min="0" step="10" value="${ingredientQuantities[i]}" data-index="${i}" class="quantity-input">
              </div>
            </li>
          `).join('')}
        </ul>
        <button id="calculateCo2" class="btn-primary">CO₂ und Preis berechnen</button>
        <div id="co2Result" class="co2-cost-box">
          <h4>CO₂ & Preis:</h4>
          <p><strong>CO₂ gesamt:</strong> ${totals.co2} kg</p>
          <p><strong>Preis gesamt:</strong> €${totals.price}</p>
        </div>
      </div> <!-- /ingredients-section -->

      <div class="instructions-section">
        <h3>Zubereitung:</h3>
        <div class="instructions">${recipe.instructions.replace(/\n/g, '<br>')}</div>
      </div> <!-- /instructions-section -->
      
    </div> <!-- /modal-columns -->
  </div> <!-- /modal-body -->
`;

  modalContent.querySelectorAll('.quantity-input').forEach(input => {
    input.addEventListener('input', () => {
      const index = +input.dataset.index;
      ingredientQuantities[index] = parseInt(input.value) || 0;
    });
  });

  function updateInputs() {
    modalContent.querySelectorAll('.quantity-input').forEach((input, i) => {
      input.value = ingredientQuantities[i];
    });
  }

  modalContent.querySelector('#calculateCo2').addEventListener('click', async () => {
    let totalCO2 = 0;
    let totalPrice = 0;

    for (let i = 0; i < recipe.ingredients.length; i++) {
      const ing = recipe.ingredients[i];
      const quantity = ingredientQuantities[i];

      const co2PerKg = await fetchCO2FromOpenFoodFacts(ing); // API-Aufruf

      const localData = ingredientData[ing]; // für Preisberechnung weiterhin lokal

      if (co2PerKg !== null) {
        totalCO2 += (co2PerKg) * (quantity / 1000); // Gramm in kg
      }

      if (localData) {
        totalPrice += (localData.price / 1000) * quantity;
      }
    }

    const resultBox = modalContent.querySelector('#co2Result');
    resultBox.innerHTML = `
    <h4>CO₂ & Preis:</h4>
    <p><strong>CO₂ gesamt:</strong> ${totalCO2.toFixed(2)} kg</p>
    <p><strong>Preis gesamt:</strong> €${totalPrice.toFixed(2)}</p>
  `;
  });

  (async () => {
    totalCO2Initial = 0;
    totalPriceInitial = 0;

    for (let i = 0; i < recipe.ingredients.length; i++) {
      const ing = recipe.ingredients[i];
      const quantity = ingredientQuantities[i];

      const co2PerKg = await fetchCO2FromOpenFoodFacts(ing);
      const localData = ingredientData[ing];

      if (co2PerKg !== null) {
        totalCO2Initial += co2PerKg * (quantity / 1000);
      }

      if (localData) {
        totalPriceInitial += (localData.price / 1000) * quantity;
      }
    }

    const resultBox = modalContent.querySelector('#co2Result');
    resultBox.innerHTML = `
    <h4>CO₂ & Preis:</h4>
    <p><strong>CO₂ gesamt:</strong> ${totalCO2Initial.toFixed(2)} kg</p>
    <p><strong>Preis gesamt:</strong> €${totalPriceInitial.toFixed(2)}</p>
  `;
  })();

  modal.style.display = 'block';

  document.querySelector('.close').onclick = function() {
    modal.style.display = 'none';
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
}

async function fetchCO2FromOpenFoodFacts(ingredient) {
  const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(ingredient)}&search_simple=1&action=process&json=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const product = data.products?.[0];

    const co2 =
        product?.ecoscore_data?.agribalyse?.co2_total ||
        product?.ecoscore_data?.adjustments?.origins_of_ingredients?.co2_total;

    return typeof co2 === 'number' ? co2 : null; // CO2 in kg pro kg
  } catch (error) {
    console.error("Fehler beim Abrufen von CO2:", ingredient, error);
    return null;
  }
}
