const SUPABASE_URL = 'https://ibrafxtbvizizgjyhxzy.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_2oPkaHic8ml4vbBKVXl23Q_gKoP1u6h';
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);



async function loadFood() {
  const { data, error } = await supabaseClient
    .from('food')
    .select('name, kcal, protein, fat, bloat, picture, energy, categorie');

  if (error) {
    console.error('Error:', error.message);
    return;
  }

 function renderCard(item) {
    return `
      <article class="food-card" data-kcal="${item.kcal}" data-protein="${item.protein}" data-fat="${item.fat}" data-bloat="${item.bloat}">
          
          <div class="food-image" style="background-image:url('${item.picture}')"></div>

          ${item.energy ? `
            <div class="energy-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M13 2 L4 14 H11 L10 22 L20 9 H13 L13 2Z" fill="#089236"/>
                </svg>
            </div>
          ` : ''}

          ${item.protein >= 9 ? `
            <svg class="protein-stamp-svg" viewBox="0 0 64 64">
              <g transform="translate(32,32) rotate(-11)">
                <circle cx="0" cy="0" r="27" fill="none" stroke="#8c1717" stroke-width="2.5" opacity="0.8" stroke-dasharray="152 16" stroke-dashoffset="11"/>
                <text x="0" y="-10" text-anchor="middle" font-size="5.5" font-weight="700" letter-spacing="0.8" fill="#8c1717">PROTEIN</text>
                <text x="0" y="6" text-anchor="middle" font-size="16" font-weight="900" fill="#8c1717">${item.protein}g</text>
                <text x="0" y="15" text-anchor="middle" font-size="4.5" font-weight="700" letter-spacing="0.8" fill="#8c1717">PER 100G</text>
              </g>
            </svg>
          ` : ''}

          <div class="food-content">

             <div class="food-title">
    <h3>${item.name}</h3>

    <div class="portion-wrapper">
        <select class="portion-select">
            <option value="100">100g</option>
            <option value="50">50g</option>
            <option value="10">10g</option>
            <option value="custom">Custom...</option>
        </select>

        <div class="custom-portion-box">
            <input type="number" class="custom-portion-input" placeholder="g" min="1">
            <button class="custom-portion-delete" type="button">×</button>
        </div>
    </div>
</div>

              <div class="nutrition">
                  <div><strong class="kcal-value">${item.kcal}</strong>kcal</div>
                  <div><strong class="protein-value">${item.protein}g</strong>protein</div>
                  <div><strong class="fat-value">${item.fat}g</strong>fat</div>
                  <div><strong class="bloat-value">${item.bloat ? 'High' : 'Low'}</strong>bloating</div>
              </div>

          </div>
      </article>
    `;
}

  data.forEach(item => {
    const container = document.getElementById(item.categorie);
    if (!container) return;
    container.innerHTML += renderCard(item);
  });

document.addEventListener('change', function(e) {

    if (!e.target.classList.contains('portion-select')) return;

    const select = e.target;
    const card = select.closest('.food-card');

    if (select.value === 'custom') {

        // Hide dropdown
        select.style.display = 'none';

        // Show custom input
        const customBox = card.querySelector('.custom-portion-box');
        customBox.classList.add('active');

        const input = customBox.querySelector('.custom-portion-input');
        input.focus();

        return;
    }

    updateNutrition(card, Number(select.value));
});


document.addEventListener('input', function(e) {

    if (!e.target.classList.contains('custom-portion-input')) return;

    const input = e.target;
    const card = input.closest('.food-card');

    const amount = Number(input.value);

    if (!amount || amount <= 0) return;

    updateNutrition(card, amount);
});


function updateNutrition(card, amount) {

    const kcal = Number(card.dataset.kcal);
    const protein = Number(card.dataset.protein);
    const fat = Number(card.dataset.fat);

    const multiplier = amount / 100;

    card.querySelector('.kcal-value').textContent =
        Math.round(kcal * multiplier);

    card.querySelector('.protein-value').textContent =
        (protein * multiplier).toFixed(1) + 'g';

    card.querySelector('.fat-value').textContent =
        (fat * multiplier).toFixed(1) + 'g';
}


// Red X
document.addEventListener('click', function(e) {

    if (!e.target.classList.contains('custom-portion-delete')) return;

    const card = e.target.closest('.food-card');

    const customBox = card.querySelector('.custom-portion-box');
    const select = card.querySelector('.portion-select');
    const input = card.querySelector('.custom-portion-input');

    // Remove custom mode
    customBox.classList.remove('active');
    input.value = '';

    // Bring dropdown back
    select.style.display = '';
    select.value = '100';

    // Reset to 100g
    updateNutrition(card, 100);
});



}

loadFood();