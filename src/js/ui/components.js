// =========== Loading Spinner Design ============
/*
<div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>
*/

// =========== Empty State Design ============
/*
<div class="flex flex-col items-center justify-center py-12 text-center">
    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
    </div>
    <p class="text-gray-500 text-lg">No recipes found</p>
    <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
</div>
*/



export class Ui {
  constructor() {
    this.mealContainer = document.getElementById('recipes-grid');
    this.categoryMeal = document.getElementById('categories-grid')
    this.mealContent = document.getElementById('meal-details')
    this.mealsArea = document.getElementById('area')
    this.productsGrid = document.getElementById('products-grid')
    this.productCategory = document.getElementById('product-categories')
    this.productDetailes = document.getElementById('product-detail-modal')
    this.logMeal = document.getElementById('log-meal-modal')
    this.loggedItemList = document.getElementById('logged-items-list')
  }
  displayMeals(Meals) {
    this.mealContainer.innerHTML = ` `;
    if (Meals && Meals.length > 0) {
      let mealsHTML = ` `;
      Meals.forEach(meal => {
        const mealCard = `<div id='mealContent'
              class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              data-meal-id="${meal.id}"
            >
              <div class="relative h-48 overflow-hidden">
                <img
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="${meal.thumbnail}"
                  alt="Teriyaki Chicken Casserole"
                  loading="lazy"
                />
                <div class="absolute bottom-3 left-3 flex gap-2">
                  <span
                    class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
                  >
                    ${meal.category}
                  </span>
                  ${meal.area == null ? '' : `<span
                    class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white"
                  >
                    ${meal.area}
                  </span>
                `}
                </div>
              </div>
              <div class="p-4">
                <h3
                  class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
                >
                  ${meal.name}
                </h3>
                <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                  ${meal.instructions}
                </p>
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-gray-900">
                    <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                    ${meal.category}
                  </span>
                  <span class="font-semibold text-gray-500">
                    <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                    ${meal.area}
                  </span>
                </div>
              </div>
            </div>`
        mealsHTML += mealCard;
      });
      this.mealContainer.innerHTML = mealsHTML
    }
    else {
      this.mealContainer.innerHTML = `<div class="flex flex-col items-center justify-center py-12 text-center">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <i class="text-2xl text-gray-400" data-fa-i2svg=""><svg class="svg-inline--fa fa-magnifying-glass" data-prefix="fas" data-icon="magnifying-glass" role="img" viewBox="0 0 512 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg></i>
            </div>
            <p class="text-gray-500 text-lg">No recipes found. Try a different search term.</p>
        </div>`
    }
  }
  dispalyCategory(categorys) {
    this.categoryMeal.innerHTML = ``;
    let categoriesHTML = ` `;
    categorys.forEach(category => {
      const randomColorClass = this.getRandomColor();
      const categoryCard = `
            <div
              class="category-card bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-3 border border-emerald-200 hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all group"
              data-category="${category.name}"
            >
              <div class="flex items-center gap-2.5">
                <div
                  class="text-white w-9 h-9 ${randomColorClass} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm"
                >
                  <i class="fa-solid fa-drumstick-bite"></i>
                </div>
                <div>
                  <h3 class="text-sm font-bold text-gray-900">${category.name}</h3>
                </div>
              </div>
            </div>
            `
      categoriesHTML += categoryCard;
    });
    this.categoryMeal.innerHTML = categoriesHTML;
  }
  displayArea(Areas) {
    this.mealsArea.innerHTML = `<button
              class="px-4 py-2 bg-emerald-600 text-white rounded-full font-medium text-sm whitespace-nowrap hover:bg-emerald-700 transition-all"
            >
              All Recipes
            </button> `;
    let cards = ` `;
    Areas.forEach(area => {
      const cardArea = `
      <button
              class="px-4 py-2 bg-gray-100 text-gray-700 rounded-full shrink-0 font-medium text-sm whitespace-nowrap hover:bg-gray-200 transition-all"
            >
              ${area.name}
            </button>`
      cards += cardArea;
    });
    this.mealsArea.innerHTML += cards;
  }
  displayContentMeal(meal, nut) {

    let tagsHTML = '';
    if (meal.tags && meal.tags.length > 0) {
      tagsHTML = meal.tags.map(tag => `
          <span class="px-3 py-1 bg-emerald-500 text-white text-sm font-semibold rounded-full">
              ${tag}
          </span>
      `).join('');
    }


    let ingredientsHTML = meal.ingredients.map(item => `
      <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
          <input type="checkbox" class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300" />
          <span class="text-gray-700">
              <span class="font-medium text-gray-900">${item.measure}</span> ${item.ingredient}
          </span>
      </div>`).join('');


    let instructionsHTML = '';
    if (meal.instructions && Array.isArray(meal.instructions)) {
      instructionsHTML = meal.instructions.map((step, index) => `
              <div class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <div class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                      ${index + 1}
                  </div>
                  <p class="text-gray-700 leading-relaxed pt-2">
                      ${step}
                  </p>
              </div>
          `).join('');
    }
    let youtubeEmbedUrl = meal.youtube ? meal.youtube.replace("watch?v=", "embed/") : "";


    this.mealContent.innerHTML = `
          <div class="max-w-7xl mx-auto">
            <!-- Back Button -->
            <button id="back-to-meals-btn" class="flex items-center gap-2 text-gray-600 hover:text-emerald-600 font-medium mb-6 transition-colors">
              <i class="fa-solid fa-arrow-left"></i>
              <span>Back to Recipes</span>
            </button>

            <!-- Hero Section -->
            <div class="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
              <div class="relative h-80 md:h-96">
                <img src="${meal.thumbnail}" alt="${meal.name}" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div class="absolute bottom-0 left-0 right-0 p-8">
                  <div class="flex items-center gap-3 mb-3">
                    ${tagsHTML}
                  </div>
                  <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">${meal.name}</h1>
                  <div class="flex items-center gap-6 text-white/90">
                    <span class="flex items-center gap-2">
                      <i class="fa-solid fa-clock"></i>
                      <span>30 min</span>
                    </span>
                    <span class="flex items-center gap-2">
                      <i class="fa-solid fa-utensils"></i>
                      <span>${nut.servings} Servings</span>
                    </span>
                    <span class="flex items-center gap-2">
                      <i class="fa-solid fa-fire"></i>
                      <span>${nut.perServing.calories} Cal/Serving</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-wrap gap-3 mb-8">
              <button id="log-meal-btn" class="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all" data-meal-id="${meal.id}">
                <i class="fa-solid fa-clipboard-list"></i>
                <span>Log This Meal</span>
              </button>
            </div>

            <!-- Main Content Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <!-- Left Column - Ingredients & Instructions -->
              <div class="lg:col-span-2 space-y-8">

                <!-- Ingredients -->
                <div class="bg-white rounded-2xl shadow-lg p-6">
                  <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <i class="fa-solid fa-list-check text-emerald-600"></i>
                    Ingredients
                    <span class="text-sm font-normal text-gray-500 ml-auto">${meal.ingredients ? meal.ingredients.length : 0} items</span>
                  </h2>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    ${ingredientsHTML}
                  </div>
                </div>

                <!-- Instructions -->
                <div class="bg-white rounded-2xl shadow-lg p-6">
                  <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <i class="fa-solid fa-shoe-prints text-emerald-600"></i>
                    Instructions
                  </h2>
                  <div class="space-y-4">
                    ${instructionsHTML}
                  </div>
                </div>

                <!-- Video Section (يظهر بس لو فيه لينك يوتيوب) -->
                ${youtubeEmbedUrl ? `
                <div class="bg-white rounded-2xl shadow-lg p-6">
                  <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <i class="fa-solid fa-video text-red-500"></i>
                    Video Tutorial
                  </h2>
                  <div class="relative aspect-video rounded-xl overflow-hidden bg-gray-100">
                    <iframe src="${youtubeEmbedUrl}" class="absolute inset-0 w-full h-full" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                  </div>
                </div>` : ''}

              </div>

              <!-- Right Column - Nutrition -->
              <div class="space-y-6">
                <!-- سيبتلك كود الـ Nutrition زي ما هو عشان لو حبيت تخليه ديناميكي بعدين بنفس الفكرة -->
                <div class="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                  <h2 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <i class="fa-solid fa-chart-pie text-emerald-600"></i>
                    Nutrition Facts
                  </h2>
                 <div id="nutrition-facts-container">
                      <p class="text-sm text-gray-500 mb-4">Per serving</p>
                      
                      <div class="text-center py-4 mb-4 bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl">
                          <p class="text-sm text-gray-600">Calories per serving</p>
                          <p class="text-4xl font-bold text-emerald-600">${nut.perServing.calories}</p>
                          <p class="text-xs text-gray-500 mt-1">Total: ${nut.totals.calories} cal</p>
                      </div>
                      
                      <div class="space-y-4">
                          <div class="flex items-center justify-between">
                              <div class="flex items-center gap-2">
                                  <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
                                  <span class="text-gray-700">Protein</span>
                              </div>
                              <span class="font-bold text-gray-900">${nut.perServing.protein}g</span>
                          </div>
                          <div class="w-full bg-gray-100 rounded-full h-2">
                              <div class="bg-emerald-500 h-2 rounded-full" style="width: ${Math.min(nut.perServing.protein || 0, 100)}%"></div>
                          </div>
                          
                          <div class="flex items-center justify-between">
                              <div class="flex items-center gap-2">
                                  <div class="w-3 h-3 rounded-full bg-blue-500"></div>
                                  <span class="text-gray-700">Carbs</span>
                              </div>
                              <span class="font-bold text-gray-900">${nut.perServing.carbs}g</span>
                          </div>
                          <div class="w-full bg-gray-100 rounded-full h-2">
                              <div class="bg-blue-500 h-2 rounded-full" style="width: ${Math.min(nut.perServing.carbs || 0, 100)}%"></div>
                          </div>
                          
                          <div class="flex items-center justify-between">
                              <div class="flex items-center gap-2">
                                  <div class="w-3 h-3 rounded-full bg-purple-500"></div>
                                  <span class="text-gray-700">Fat</span>
                              </div>
                              <span class="font-bold text-gray-900">${nut.perServing.fat}g</span>
                          </div>
                          <div class="w-full bg-gray-100 rounded-full h-2">
                              <div class="bg-purple-500 h-2 rounded-full" style="width: ${Math.min(nut.perServing.fat || 0, 100)}%"></div>
                          </div>
                          
                          <div class="flex items-center justify-between">
                              <div class="flex items-center gap-2">
                                  <div class="w-3 h-3 rounded-full bg-orange-500"></div>
                                  <span class="text-gray-700">Fiber</span>
                              </div>
                              <span class="font-bold text-gray-900">${nut.perServing.fiber}g</span>
                          </div>
                          <div class="w-full bg-gray-100 rounded-full h-2">
                              <div class="bg-orange-500 h-2 rounded-full" style="width: ${Math.min(nut.perServing.fiber || 0, 100)}%"></div>
                          </div>
                          
                          <div class="flex items-center justify-between">
                              <div class="flex items-center gap-2">
                                  <div class="w-3 h-3 rounded-full bg-pink-500"></div>
                                  <span class="text-gray-700">Sugar</span>
                              </div>
                              <span class="font-bold text-gray-900">${nut.perServing.sugar}g</span>
                          </div>
                          <div class="w-full bg-gray-100 rounded-full h-2">
                              <div class="bg-pink-500 h-2 rounded-full" style="width: ${Math.min(nut.perServing.sugar || 0, 100)}%"></div>
                          </div>
                          
                          <div class="flex items-center justify-between">
                              <div class="flex items-center gap-2">
                                  <div class="w-3 h-3 rounded-full bg-red-500"></div>
                                  <span class="text-gray-700">Saturated Fat</span>
                              </div>
                              <span class="font-bold text-gray-900">${nut.perServing.saturatedFat}g</span>
                          </div>
                          <div class="w-full bg-gray-100 rounded-full h-2">
                              <div class="bg-red-500 h-2 rounded-full" style="width: ${Math.min(nut.perServing.saturatedFat || 0, 100)}%"></div>
                          </div>
                      </div>
             
                      <div class="mt-6 pt-6 border-t border-gray-100">
                          <h3 class="text-sm font-semibold text-gray-900 mb-3">Other</h3>
                          <div class="grid grid-cols-2 gap-3 text-sm">
                              <div class="flex justify-between">
                                  <span class="text-gray-600">Cholesterol</span>
                                  <span class="font-medium">  ${nut.perServing.cholesterol}mg</span>
                              </div>
                              <div class="flex justify-between">
                                  <span class="text-gray-600">Sodium</span>
                                  <span class="font-medium">${nut.perServing.sodium}mg</span>
                              </div>
                          </div>
                      </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
      `;

  }
  displayProudcts(products) {
    this.productsGrid.innerHTML = ` `
    if (products && products.length > 0) {
      let productHtml = ` `
      products.forEach(product => {
        const productCard = `
                     <div
                class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                data-barcode="${product.barcode}}"
              >
                <div
                  class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden"
                >
                  <img
                    class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                  />

                  <!-- Nutri-Score Badge -->
                  <div
                    class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase"
                  >
                    Nutri-Score ${product.nutritionGrade}
                  </div>

                  <!-- NOVA Badge -->
                  <div
                    class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                    title="NOVA 2"
                  >
                    ${product.novaGroup}
                  </div>
                </div>

                <div class="p-4">
                  <p
                    class="text-xs text-emerald-600 font-semibold mb-1 truncate"
                  >
                     ${product.brand}
                  </p>
                  <h3
                    class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors"
                  >
                     ${product.name}
                  </h3>

                  <div
                    class="flex items-center gap-3 text-xs text-gray-500 mb-3"
                  >
                   <!-- 
                   <span
                     ><i class="fa-solid fa-weight-scale mr-1"></i>250g</span
                   >

                 -->
                    <span
                      ><i class="fa-solid fa-fire mr-1"></i>${product.nutrients.calories} kcal/100g</span
                    >
                  </div>

                  <!-- Mini Nutrition -->
                  <div class="grid grid-cols-4 gap-1 text-center">
                    <div class="bg-emerald-50 rounded p-1.5">
                      <p class="text-xs font-bold text-emerald-700">${product.nutrients.protein.toFixed(2)}g</p>
                      <p class="text-[10px] text-gray-500">Protein</p>
                    </div>
                    <div class="bg-blue-50 rounded p-1.5">
                      <p class="text-xs font-bold text-blue-700">${product.nutrients.carbs.toFixed(2)}g</p>
                      <p class="text-[10px] text-gray-500">Carbs</p>
                    </div>
                    <div class="bg-purple-50 rounded p-1.5">
                      <p class="text-xs font-bold text-purple-700">${product.nutrients.fat.toFixed(2)}g</p>
                      <p class="text-[10px] text-gray-500">Fat</p>
                    </div>
                    <div class="bg-orange-50 rounded p-1.5">
                      <p class="text-xs font-bold text-orange-700">${product.nutrients.sugar.toFixed(2)}g</p>
                      <p class="text-[10px] text-gray-500">Sugar</p>
                    </div>
                  </div>
                </div>
              </div>
        
        
        `
        productHtml += productCard

      })
      this.productsGrid.innerHTML = productHtml;
    } else {
      this.productsGrid.innerHTML = `<div id="products-empty" class="py-12">
                    <div class="text-center">
                        <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="text-3xl text-gray-400" data-fa-i2svg=""><svg class="svg-inline--fa fa-box-open" data-prefix="fas" data-icon="box-open" role="img" viewBox="0 0 640 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M560.3 237.2c10.4 11.8 28.3 14.4 41.8 5.5 14.7-9.8 18.7-29.7 8.9-44.4l-48-72c-2.8-4.2-6.6-7.7-11.1-10.2L351.4 4.7c-19.3-10.7-42.8-10.7-62.2 0L88.8 116c-5.4 3-9.7 7.4-12.6 12.8L27.7 218.7c-12.6 23.4-3.8 52.5 19.6 65.1l33 17.7 0 53.3c0 23 12.4 44.3 32.4 55.7l176 99.7c19.6 11.1 43.5 11.1 63.1 0l176-99.7c20.1-11.4 32.4-32.6 32.4-55.7l0-117.5zm-240-9.8L170.2 144 320.3 60.6 470.4 144 320.3 227.4zm-41.5 50.2l-21.3 46.2-165.8-88.8 25.4-47.2 161.7 89.8z"></path></svg></i>
                        </div>
                        <p class="text-gray-500 text-lg mb-2">No products to display</p>
                        <p class="text-gray-400 text-sm">Search for a product or browse by category</p>
                    </div>
                </div>`
    }
  }
  displayCategoryProducts(category) {
    this.productCategory.innerHTML = ``;
    let categories = ``
    if (category && category.length > 0) {
      category.forEach(category => {
        const randomColorClass = this.getRandomColor();
        let style = this.getCategoryStyle(category.name);
        let categoryproduct = `
        <button
                  class="product-category-btn flex-shrink-0 px-4 py-2 ${randomColorClass} text-emerald-700 rounded-lg text-sm font-medium whitespace-nowrap hover:bg-emerald-200 transition-all " data-category="${category.id}"
                >
                  <i class="fa-solid ${style.icon} mr-1.5"></i>${category.name}
                </button>
        `
        categories += categoryproduct;

      })
      this.productCategory.innerHTML = categories;
    }

  }
  getRandomColor() {
    const colors = [
      "bg-gradient-to-br from-emerald-400 to-green-500",
      "bg-gradient-to-br from-blue-400 to-indigo-500",
      "bg-gradient-to-br from-purple-400 to-pink-500",
      "bg-gradient-to-br from-amber-400 to-orange-500",
      "bg-gradient-to-br from-rose-400 to-red-500",
      "bg-gradient-to-br from-teal-400 to-cyan-500"
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }
  getCategoryStyle(categoryName) {
    const styles = {
      "Breakfast Cereals": { icon: "fa-wheat-awn", color: "bg-orange-500" },
      "Beverages": { icon: "fa-bottle-water", color: "bg-blue-500" },
      "Snacks": { icon: "fa-cookie-bite", color: "bg-purple-500" },
      "Dairy Products": { icon: "fa-cheese", color: "bg-blue-400" },
      "Fruits": { icon: "fa-apple-whole", color: "bg-red-500" },
      "Vegetables": { icon: "fa-carrot", color: "bg-green-500" },
      "Breads": { icon: "fa-bread-slice", color: "bg-amber-600" },
      "Meats": { icon: "fa-drumstick-bite", color: "bg-red-600" }
    };

    return styles[categoryName] || { icon: "fa-box", color: "bg-gray-500" };
  }
  displayProductDetailes(product) {

    const getNutriScoreStyle = (grade) => {
      const g = grade ? grade.toLowerCase() : '';
      if (g === 'a') {
        return { text: 'Excellent', mainColor: '#059669', bgLight: '#d1fae5' };
      } else if (g === 'b' || g === 'c') {
        return { text: 'Good', mainColor: '#d97706', bgLight: '#fef3c7' };
      } else if (g === 'd' || g === 'e') {
        return { text: 'Bad', mainColor: '#dc2626', bgLight: '#fee2e2' };
      } else {
        return { text: 'Unknown', mainColor: '#6b7280', bgLight: '#f3f4f6' };
      }
    };

    const getNovaStyle = (group) => {
      const n = String(group);
      if (n === '1') {
        return { text: 'Unprocessed', mainColor: '#059669', bgLight: '#d1fae5' };
      } else if (n === '2' || n === '3') {
        return { text: 'Processed', mainColor: '#d97706', bgLight: '#fef3c7' };
      } else if (n === '4') {
        return { text: 'Ultra-processed', mainColor: '#dc2626', bgLight: '#fee2e2' };
      } else {
        return { text: 'Unknown', mainColor: '#6b7280', bgLight: '#f3f4f6' };
      }
    };
    const nutriStyle = getNutriScoreStyle(product.nutritionGrade);
    const novaStyle = getNovaStyle(product.novaGroup);
    this.productDetailes.innerHTML = `
    <div class="bg-white rounded-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">

        <div class="p-6">
          <!-- Header -->
          <div class="flex items-start gap-6 mb-6">
            <div
              class="w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">

              <img id="product-modal-img" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                src="${product.image}" alt="${product.name}"
                loading="lazy" />

            </div>
            <div class="flex-1">
              <p class="text-sm text-emerald-600 font-semibold mb-1">${product.brand}</p>
              <h2 id="product-modal-name" class="text-2xl font-bold text-gray-900 mb-2">${product.name}</h2>
              <p class="text-sm text-gray-500 mb-3"></p>

              <div class="flex items-center gap-3">

                <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg" style="background-color: ${nutriStyle.bgLight}">
                  <span class="w-8 h-8 rounded flex items-center justify-center text-white font-bold" style="background-color: ${nutriStyle.mainColor}">
                    ${product.nutritionGrade ? product.nutritionGrade.toUpperCase() : '?'}
                  </span>
                  <div>
                    <p class="text-xs font-bold" style="color: ${nutriStyle.mainColor}">Nutri-Score</p>
                    <p class="text-[10px] text-gray-600">${nutriStyle.text}</p>
                  </div>
                </div>

                <!-- NOVA -->
                <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg" style="background-color: ${novaStyle.bgLight}">
                  <span class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style="background-color: ${novaStyle.mainColor}">
                    ${product.novaGroup || '?'}
                  </span>
                  <div>
                    <p class="text-xs font-bold text-gray-600" ">NOVA</p>
                    <p class="text-[10px] text-gray-600">Ultra-processed</p>
                  </div>
                </div>

              </div>
            </div>
            <button class="close-product-modal text-gray-400 hover:text-gray-600" fdprocessedid="8gw1vj">
              <i class="fa-solid fa-x"></i>
            </button>
          </div>

          <!-- Nutrition Facts -->
          <div class="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 mb-6 border border-emerald-200">
            <h3 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i class="fa-solid fa-chart-pie"></i>
              Nutrition Facts <span class="text-sm font-normal text-gray-500">(per 100g)</span>
            </h3>

            <div class="text-center mb-4 pb-4 border-b border-emerald-200">
              <p id="product-modal-cal" class="text-4xl font-bold text-gray-900">${product.nutrients.calories.toFixed(2)}</p>
              <p class="text-sm text-gray-500">Calories</p>
            </div>

            <div class="grid grid-cols-4 gap-4">
              <div class="text-center">
                <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div class="bg-emerald-500 h-2 rounded-full" style="width: ${Math.min(product.nutrients.protein || 0, 75)}%"></div>
                </div>
                <p id="product-modal-protein" class="text-lg font-bold text-emerald-600">${product.nutrients.protein.toFixed(2)}g</p>
                <p class="text-xs text-gray-500">Protein</p>
              </div>
              <div class="text-center">
                <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div class="bg-blue-500 h-2 rounded-full" style="width: ${Math.min(product.nutrients.carbs || 0, 75)}%"></div>
                </div>
                <p id="product-modal-carbs" class="text-lg font-bold text-blue-600">${product.nutrients.carbs.toFixed(2)}g</p>
                <p class="text-xs text-gray-500">Carbs</p>
              </div>
              <div class="text-center">
                <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div class="bg-purple-500 h-2 rounded-full" style="width: ${Math.min(product.nutrients.fat || 0, 75)}%"></div>
                </div>
                <p id="product-modal-fat" class="text-lg font-bold text-purple-600">${product.nutrients.fat.toFixed(2)}g</p>
                <p class="text-xs text-gray-500">Fat</p>
              </div>
              <div class="text-center">
                <div class="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div class="bg-orange-500 h-2 rounded-full" style="width: ${Math.min(product.nutrients.sugar || 0, 75)}%"></div>
                </div>
                <p class="text-lg font-bold text-orange-600">${product.nutrients.sugar.toFixed(2)}g</p>
                <p class="text-xs text-gray-500">Sugar</p>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-emerald-200">
              <div class="text-center">
                <p class="text-sm font-semibold text-gray-900">0.00g</p>
                <p class="text-xs text-gray-500">Saturated Fat</p>
              </div>
              <div class="text-center">
                <p class="text-sm font-semibold text-gray-900">${product.nutrients.fiber.toFixed(2)}g</p>
                <p class="text-xs text-gray-500">Fiber</p>
              </div>
              <div class="text-center">
                <p class="text-sm font-semibold text-gray-900">0.00g</p>
                <p class="text-xs text-gray-500">Salt</p>
              </div>
            </div>
          </div>

          <!-- Additional Info -->




          <!-- Actions -->
          <div class="flex gap-3">
            <button id="log-product-btn"
              class="add-product-to-log flex-1 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-all"
              data-barcode="5449000000996" fdprocessedid="ziylgj">
              <i class="fa-solid fa-plus"></i>Log This Food
            </button>
            <button
              class="close-product-modal flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
              fdprocessedid="d6ruzk">
              Close
            </button>
          </div>
        </div>

      </div>
    `;
    this.productDetailes.classList.remove('hidden');
    this.productDetailes.classList.add('flex');
  }
  displayLogMeal(meal, nut) {
    this.logMeal.classList.remove('hidden')
    this.logMeal.innerHTML = `
      <div class="bg-white rounded-2xl p-6 max-w-md w-full mx-4">
        <div class="flex items-center gap-4 mb-6">
          <img src="${meal.thumbnail}" alt="${meal.name}"
            class="w-16 h-16 rounded-xl object-cover">
          <div>
            <h3 class="text-xl font-bold text-gray-900">Log This Meal</h3>
            <p class="text-gray-500 text-sm">${meal.name}</p>
          </div>
        </div>

        <div class="mb-6">
          <label class="block text-sm font-semibold text-gray-700 mb-2">Number of Servings</label>
          <div class="flex items-center gap-3">
            <button id="decrease-servings"
              class="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
              fdprocessedid="amavue">
             <i class="fa-solid fa-minus"></i>
            </button>
            <input type="number" id="meal-servings" value="1" min="0.5" max="10" step="0.5"
              class="w-20 text-center text-xl font-bold border-2 border-gray-200 rounded-lg py-2"
              fdprocessedid="0ynlmr">
            <button id="increase-servings"
              class="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
              fdprocessedid="fhu6l">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>


        <div class="bg-emerald-50 rounded-xl p-4 mb-6">
          <p class="text-sm text-gray-600 mb-2">Estimated nutrition per serving:</p>
          <div class="grid grid-cols-4 gap-2 text-center">
            <div>
         
              <p class="text-lg font-bold text-emerald-600" id="modal-calories">${nut.perServing.calories}</p>
              <p class="text-xs text-gray-500">Calories</p>
            </div>
            <div>
              <p class="text-lg font-bold text-blue-600" id="modal-protein">${nut.perServing.protein}g</p>
              <p class="text-xs text-gray-500">Protein</p>
            </div>
            <div>
              <p class="text-lg font-bold text-amber-600" id="modal-carbs">${nut.perServing.carbs}g</p>
              <p class="text-xs text-gray-500">Carbs</p>
            </div>
            <div>
              <p class="text-lg font-bold text-purple-600" id="modal-fat">${nut.perServing.fat}g</p>
              <p class="text-xs text-gray-500">Fat</p>
            </div>
          </div>
        </div>

        <div class="flex gap-3">
          <button id="cancel-log-meal"
            class="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
            fdprocessedid="9y6sj">
            Cancel
          </button>
          <button id="confirm-log-meal"
            class="flex-1 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all"
            fdprocessedid="0td7go">
            <i class="fa-solid fa-clipboard-list"></i>
            Log Meal
          </button>
        </div>
      </div>
    `

  }
  updateNutritionBars(totals, goals) {
    const calValueElement = document.getElementById('today-cal-value');
    if (!calValueElement) return;

    calValueElement.textContent = `${Math.round(totals.cal)} / ${goals.cal} kcal`;
    const calPercentage = Math.min((totals.cal / goals.cal) * 100, 100);
    document.getElementById('today-cal-bar').style.width = `${calPercentage}%`;
    // document.getElementById('today-cal-percent').textContent = `${Math.round(calPercentage)}%`;

    document.getElementById('today-pro-value').textContent = `${Math.round(totals.pro)} / ${goals.pro} g`;
    const proPercentage = Math.min((totals.pro / goals.pro) * 100, 100);
    document.getElementById('today-pro-bar').style.width = `${proPercentage}%`;
    // document.getElementById('today-pro-percent').textContent = `${Math.round(proPercentage)}%`;

    document.getElementById('today-carb-value').textContent = `${Math.round(totals.carb)} / ${goals.carb} g`;
    const carbPercentage = Math.min((totals.carb / goals.carb) * 100, 100);
    document.getElementById('today-carb-bar').style.width = `${carbPercentage}%`;
    // document.getElementById('today-carb-percent').textContent = `${Math.round(carbPercentage)}%`;

    document.getElementById('today-fat-value').textContent = `${Math.round(totals.fat)} / ${goals.fat} g  `;
    const fatPercentage = Math.min((totals.fat / goals.fat) * 100, 100);
    document.getElementById('today-fat-bar').style.width = `${fatPercentage}%`;
    // document.getElementById('today-fat-percent').textContent = `${Math.round(fatPercentage)}%`;
  }
  displayLoggedItems(logArray) {


    if (logArray.length === 0) {
      this.loggedItemList.innerHTML = `<div class="text-center py-8 text-gray-500">
                <i class="fa-solid fa-utensils text-4xl mb-3 text-gray-300"></i>
                <p class="font-medium">No meals logged today</p>
                <p class="text-sm mb-3">
                  Add meals from the Meals page or scan products
                </p>
                <div class="flex justify-center gap-3 ">
                        <a href="#"id="empty-meals-btn" class="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all">
                            <i class="fa-solid fa-plus"></i>
                            Browse Recipes
                        </a>
                        <a href="#" id="empty-scanner-btn" class="nav-link inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
                           <i class="fa-solid fa-barcode"></i>
                            Scan Product
                        </a>
                    </div>
              </div>`;
      return;
    }

    let html = '';
    logArray.forEach(item => {
      html += `
        <div class="flex items-center justify-between w-full p-3 mb-3 bg-white border border-gray-100 rounded-xl shadow-sm">
            
            <div class="flex items-center gap-4">
                <img src="${item.thumbnail}" alt="${item.name}" class="w-14 h-14 rounded-xl object-cover">
                <div>
                    <p class="font-semibold text-gray-900">${item.name}</p>
                    <p class="text-sm text-gray-500">
                        ${item.servings} serving
                        <span class="mx-1">•</span> <span class="text-emerald-600">${item.type}</span>
                    </p>
                    <p class="text-xs text-gray-400 mt-1">${item.time}</p>
                </div>
            </div>

            <div class="flex items-center gap-4">
                <div class="text-right">
                    <p class="text-lg font-bold text-emerald-600">${item.calories}</p>
                    <p class="text-xs text-gray-500">kcal</p>
                </div>
                <div class="hidden md:flex gap-2 text-xs text-gray-500">
                    <span class="px-2 py-1 bg-blue-50 rounded">${item.protein}g P</span>
                    <span class="px-2 py-1 bg-amber-50 rounded">${item.carbs}g C</span>
                    <span class="px-2 py-1 bg-purple-50 rounded">${item.fat}g F</span>
                </div>
                <button class="remove-foodlog-item text-gray-400 hover:text-red-500 transition-all p-2" data-id="${item.id}">
                    <i class="fa-solid fa-trash-can text-lg"></i>
                </button>
            </div>

        </div>
        `;
    });
    this.loggedItemList.innerHTML = html;
  }
  renderWeeklyOverview(weekDays, summary) {
    const daysContainer = document.getElementById('weekly-days-container');
    const avgElem = document.getElementById('weekly-avg-cal');
    const itemsElem = document.getElementById('weekly-total-items');
    const goalElem = document.getElementById('weekly-days-goal');

    if (!daysContainer) return; 

    let html = '<div class="flex justify-between items-center w-full gap-2">';
    
    weekDays.forEach(day => {
       
        const bgClass = day.isToday ? 'bg-indigo-50 border border-indigo-100' : 'bg-transparent';
        const calColor = day.calories > 0 ? 'text-emerald-600' : 'text-gray-400';
        
        html += `
        <div class="flex-1 flex flex-col items-center justify-center py-3 rounded-xl ${bgClass}">
            <p class="text-sm text-gray-500">${day.dayName}</p>
            <p class="text-lg font-bold text-gray-900 mb-2">${day.dayNum}</p>
            <p class="text-lg font-bold ${calColor}">${day.calories}</p>
            <p class="text-xs text-gray-400">kcal</p>
            ${day.items > 0 ? `<p class="text-[10px] text-gray-500 mt-1">${day.items} items</p>` : `<p class="text-[10px] text-transparent mt-1">-</p>`}
        </div>
        `;
    });
    html += '</div>';
    
    daysContainer.innerHTML = html;

    if (avgElem) avgElem.textContent = `${summary.avg} kcal`;
    if (itemsElem) itemsElem.textContent = `${summary.totalItems} items`;
    if (goalElem) goalElem.textContent = `${summary.daysOnGoal} / 7`;
}
showLoader(containerElement) {
    if (!containerElement) return;
  containerElement.innerHTML =
  `<div class="text-center py-8">
                <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 mb-4">
                    <i class="fa-solid fa-calculator animate-pulse text-emerald-600 text-xl"></i>
                </div>
                <p class="text-gray-700 font-medium mb-1">Calculating Nutrition</p>
                <p class="text-sm text-gray-500">Analyzing ingredients...</p>
                <div class="mt-4 flex justify-center">
                    <div class="flex space-x-1">
                        <div class="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
                        <div class="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
                        <div class="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
                    </div>
                </div>
            </div>
  
  `
  }
}
