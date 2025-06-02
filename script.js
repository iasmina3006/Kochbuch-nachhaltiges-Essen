// script.js
// script.js
const recipes = [
  {
    id: 1,
    title: "Kartoffelsalat mit Kräutern",
    season: "sommer",
    ingredients: ["festkochende Kartoffeln", "Frühlingszwiebeln", "Essig", "Öl", "Senf", "Salz", "Pfeffer", "Petersilie"],
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
  "festkochende Kartoffeln": { co2: 0.2, price: 1.2 },       // kg CO2, €/kg
  "Frühlingszwiebeln": { co2: 0.3, price: 1.5 },
  "Essig": { co2: 0.1, price: 0.8 },
  "Öl": { co2: 3.0, price: 3.5 },
  "Senf": { co2: 1.5, price: 2.0 },
  "Salz": { co2: 0.01, price: 0.2 },
  "Pfeffer": { co2: 5.0, price: 6.0 },
  "Petersilie": { co2: 0.4, price: 1.0 },
  "Mürbeteig": { co2: 2.0, price: 2.5 },
  "Lauch": { co2: 0.3, price: 1.0 },
  "Eier": { co2: 4.8, price: 3.0 },
  "Käse": { co2: 8.5, price: 9.0 },
  "grüner Spargel": { co2: 0.5, price: 4.0 },
  "Radieschen": { co2: 0.2, price: 1.2 },
  "Zitronensaft": { co2: 0.6, price: 2.0 },
  "Olivenöl": { co2: 6.0, price: 6.5 },
  "Tomaten": { co2: 0.4, price: 2.2 },
  "Zwiebel": { co2: 0.1, price: 0.6 },
  "Basilikum": { co2: 0.4, price: 1.2 },
  "Quiche-Teig": { co2: 2.2, price: 2.0 },
  "Zucchini": { co2: 0.3, price: 1.5 },
  "Sahne": { co2: 2.5, price: 1.8 },
  "Biskuitboden": { co2: 2.0, price: 1.5 },
  "Erdbeeren": { co2: 1.1, price: 4.0 },
  "Tortenguss": { co2: 0.5, price: 1.0 },
  "Äpfel": { co2: 0.2, price: 2.0 },
  "Rosinen": { co2: 2.5, price: 3.5 },
  "Nüsse": { co2: 3.2, price: 8.0 },
  "Honig": { co2: 2.4, price: 6.0 },
  "Zimt": { co2: 6.0, price: 20.0 },
  "Hokkaido-Kürbis": { co2: 0.4, price: 1.8 },
  "Gemüsebrühe": { co2: 1.0, price: 1.0 },
  "Kartoffeln": { co2: 0.2, price: 1.2 }
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
      seasonLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

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
  const modal = document.getElementById('recipeModal');
  const modalContent = document.getElementById('modalContent');

  let totalCO2 = 0;
  let totalPrice = 0;

  recipe.ingredients.forEach(ing => {
    const data = ingredientData[ing];
    if (data) {
      totalCO2 += data.co2;
      totalPrice += data.price;
    }
  });


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
      <div class="modal-body">
        <div class="ingredients-section">
          <h3>Zutaten:</h3>
          <ul>${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}</ul>
          <div class="co2-cost-box">
            <h4>CO₂ & Preis (geschätzt):</h4>
            <p><strong>CO₂ gesamt:</strong> ${totalCO2.toFixed(2)} kg</p>
            <p><strong>Preis gesamt:</strong> €${totalPrice.toFixed(2)}</p>
          </div>
        </div>
        <div class="instructions-section">
          <h3>Zubereitung:</h3>
          <div class="instructions">${recipe.instructions.replace(/\n/g, '<br>')}</div>
        </div>
      </div>
    `;

  modal.style.display = 'block';

  document.querySelector('.close').onclick = function() {
    modal.style.display = 'none';
  };

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
}