/**
 * NutriPlan - Main Entry Point
 * 
 * This is the main entry point for the application.
 * Import your modules and initialize the app here.
 */
import { ApiFetch } from "./api.js";
import { Ui } from "./ui/components.js";
const recipesGrid = document.getElementById('recipes-grid');
const searchSection = document.getElementById('search-filters-section');
const categoriesSection = document.getElementById('meal-categories-section');
const allRecipesSection = document.getElementById('all-recipes-section');
const mealDetailsSection = document.getElementById('meal-details');
const areaMeal = document.getElementById('area');
const categoriesMeals = document.getElementById('categories-grid');
const searchInput = document.getElementById('search-input');
const productsSection = document.getElementById('products-section');
const foodlogSection = document.getElementById('foodlog-section');
const navMealsBtn = document.getElementById('nav-meals-btn');
const navScannerBtn = document.getElementById('nav-scanner-btn');
const navFoodlogBtn = document.getElementById('nav-foodlog-btn');
const categoryProduct = document.getElementById('product-categories');
const nutriScore = document.querySelectorAll('.nutri-score-filter');
showHomePage();
let meal;
let nut;
//display meals
const api = new ApiFetch("https://nutriplan-api.vercel.app/api");
const dataMeals = await api.fetch("/meals/random?count=25");
const meals = dataMeals.results;
const uiDis = new Ui();
uiDis.displayMeals(meals);



//display categories

const dataCategory = await api.fetch("/meals/categories");
const categories = dataCategory.results;
uiDis.dispalyCategory(categories);

//display Areas
const dataAreas = await api.fetch("/meals/areas");
const areas = dataAreas.results;
uiDis.displayArea(areas);


// when click on meal 

//disapper home page 
function showDetailsPage() {
    searchSection.classList.add('hidden');
    categoriesSection.classList.add('hidden');
    allRecipesSection.classList.add('hidden');
    mealDetailsSection.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    mealDetailsSection.innerHTML = ` `
}
//apper home page
function showHomePage() {
    mealDetailsSection.classList.add('hidden');
    searchSection.classList.remove('hidden');
    categoriesSection.classList.remove('hidden');
    allRecipesSection.classList.remove('hidden');
}
//meal detailes events 
mealDetailsSection.addEventListener('click', (e) => {
    const logMealModal = document.getElementById('log-meal-modal');
    logMealModal.addEventListener('click', (e) => {
        const isCancelBtn = e.target.closest('#cancel-log-meal');
        const isBackground = e.target === logMealModal;
        if (isCancelBtn || isBackground) {
            logMealModal.classList.add('hidden');
        }
        const increaseBtn = e.target.closest('#increase-servings');
        const decreaseBtn = e.target.closest('#decrease-servings');
        const servingsInput = document.getElementById('meal-servings');
        if (increaseBtn && servingsInput) {
            let currentValue = parseFloat(servingsInput.value);
            if (currentValue < 10) {
                servingsInput.value = currentValue + 0.5;
            }
        }

        if (decreaseBtn && servingsInput) {
            let currentValue = parseFloat(servingsInput.value);

            if (currentValue > 0.5) {
                servingsInput.value = currentValue - 0.5;
            }
        }
        let valueServings = servingsInput.value;
        const logMealBtn = e.target.closest('#confirm-log-meal')
        if (logMealBtn) {
            console.log("mm");

            const newLogEntry = {
                id: Date.now(),
                name: meal.name,
                type: 'Recipe',
                thumbnail: meal.thumbnail,
                servings: valueServings,
                calories: nut.perServing.calories.toFixed(1) * servingsInput.value,
                protein: nut.perServing.protein.toFixed(1) * servingsInput.value,
                carbs: nut.perServing.carbs.toFixed(1) * servingsInput.value,
                fat: nut.perServing.fat.toFixed(1) * servingsInput.value,
                date: new Date().toISOString().split('T')[0],
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };

            let currentLog = JSON.parse(localStorage.getItem('myFoodLog')) || []
            currentLog.push(newLogEntry);
            localStorage.setItem('myFoodLog', JSON.stringify(currentLog));
            Swal.fire({
                icon: "success",
                title: "Meal Logged!",
                html: `
        <div class="text-gray-600 mb-2">
            ${meal.name} (${valueServings} serving) has been added to your daily log.
        </div>
        <div class="text-emerald-600 font-bold text-lg">
            +${nut.perServing.calories.toFixed(1) * servingsInput.value} calories
        </div>
    `,
                showConfirmButton: false,
                timer: 2500,
                draggable: true,
                customClass: {
                    popup: 'rounded-2xl',
                    title: 'text-2xl font-bold text-gray-900'
                }
            });
            logMealModal.classList.add('hidden');
            updateFoodLogUI();
        }
    });
    const logBtn = e.target.closest('#log-meal-btn');
    if (logBtn) {
        uiDis.displayLogMeal(meal, nut)
    }
    const clickedBackBtn = e.target.closest('#back-to-meals-btn');
    if (clickedBackBtn) {
        showHomePage();
        meal = '';
        nut = '';
    }
})

//show detailes
recipesGrid.addEventListener('click', async (e) => {
    showDetailsPage();
    const clickedCard = e.target.closest('.recipe-card');
    if (clickedCard) {

        const mealId = clickedCard.getAttribute('data-meal-id');
        uiDis.showLoader(mealDetailsSection);
        const mealDetailesById = await api.fetch(`/meals/${mealId}`)
        const mealName = mealDetailesById.result.name;
        const mealIngredients = mealDetailesById.result.ingredients;
        const formattedIngredients = mealIngredients.map(item => {
            return `${item.measure} ${item.ingredient}`;
        })

        const nutritionData = await api.analyze(mealName, formattedIngredients);
        const dataNutrition = nutritionData.data;

        meal = mealDetailesById.result;
        nut = dataNutrition;
        uiDis.displayContentMeal(mealDetailesById.result, dataNutrition)
    }

})
//fillter by area
areaMeal.addEventListener('click', async (e) => {
    const clickedBtn = e.target.closest('button');
    const allButtons = areaMeal.querySelectorAll('button');
    allButtons.forEach(btn => {
        btn.classList.remove('bg-emerald-600', 'text-white');
        btn.classList.add('bg-gray-100', 'text-gray-700');
    });
    clickedBtn.classList.remove('bg-gray-100', 'text-gray-700');
    clickedBtn.classList.add('bg-emerald-600', 'text-white');
    const areaBtn = clickedBtn.textContent.trim();
    const dataSearchArea = await api.fetch(`/meals/filter?area=${areaBtn}&page=1&limit=25`);
    uiDis.displayMeals(dataSearchArea.results);


})
//fillter meal by categories
categoriesMeals.addEventListener('click', async (e) => {
    const categoryBtn = e.target.closest('.category-card').textContent.trim();
    const dataSearchCa = await api.fetch(`/meals/filter?category=${categoryBtn}&page=1&limit=25`)
    uiDis.displayMeals(dataSearchCa.results);
})
//search  
searchInput.addEventListener('input', async (e) => {
    let value = e.target.value.trim().toLowerCase();

    if (value !== "") {
        try {
            let firstLetter = value[0];

            const [response1, response2] = await Promise.all([
                api.fetch(`/meals/search?q=${value}&page=1&limit=25`),
                api.fetch(`/meals/search?f=${firstLetter}&page=1&limit=25`)
            ]);

            const results1 = response1?.results || [];
            const results2 = response2?.results || [];

            let combinedResults = [...results1, ...results2];

            combinedResults = combinedResults.filter((meal, index, self) =>
                index === self.findIndex((t) => t.id === meal.id)
            );


            uiDis.displayMeals(combinedResults);

        } catch (error) {
            console.log("Error searching:", error);
        }
    } else {

        uiDis.displayMeals(meals);
    }
})
//function hiden all page
function hideAllSections() {
    searchSection.classList.add('hidden');
    categoriesSection.classList.add('hidden');
    allRecipesSection.classList.add('hidden');
    mealDetailsSection.classList.add('hidden');
    productsSection.classList.add('hidden');
    foodlogSection.classList.add('hidden');
}
function updateActiveNav(activeBtn) {
    const allNavBtns = [navMealsBtn, navScannerBtn, navFoodlogBtn];

    allNavBtns.forEach(btn => {

        btn.classList.remove('bg-emerald-50', 'text-emerald-700');

        btn.classList.add('text-gray-600', 'hover:bg-gray-50');
    });


    activeBtn.classList.remove('text-gray-600', 'hover:bg-gray-50');
    activeBtn.classList.add('bg-emerald-50', 'text-emerald-700');
}
navMealsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    hideAllSections();
    searchSection.classList.remove('hidden');
    categoriesSection.classList.remove('hidden');
    allRecipesSection.classList.remove('hidden');

    updateActiveNav(navMealsBtn);

    history.pushState({}, '', '#meals');
});
navScannerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    hideAllSections();
    productsSection.classList.remove('hidden');

    updateActiveNav(navScannerBtn);
    history.pushState({}, '', '#scanner');
});
navFoodlogBtn.addEventListener('click', (e) => {
    e.preventDefault();
    hideAllSections();
    foodlogSection.classList.remove('hidden');
    updateFoodLogUI();
    updateActiveNav(navFoodlogBtn);
    history.pushState({}, '', '#foodlog');
});



// Product Scanner
const ProductScannerInput = document.getElementById('product-search-input');
const productSearchBtn = document.getElementById('search-product-btn');
const ProductBarcodeInput = document.getElementById('barcode-input');
const productBarcodeBtn = document.getElementById('lookup-barcode-btn');
const productsGrid = document.getElementById('products-grid');
const productDetailModal = document.getElementById('product-detail-modal');
let searchProduct;

// Product Scanner search
productSearchBtn.addEventListener('click', async () => {
    const value = ProductScannerInput.value.trim().toLowerCase();
    const dataProduct = await api.fetch(`/products/search?q=${value}&page=1&limit=15`);
    uiDis.displayProudcts(dataProduct.results);
    searchProduct = dataProduct.results;
})

//product by barcode
productBarcodeBtn.addEventListener('click', async () => {
    const valueBar = ProductBarcodeInput.value.trim();
    if (valueBar !== "") {
        const dataProductBar = await api.fetch(`/products/barcode/${valueBar}`);
        if (dataProductBar && dataProductBar.result) {
            uiDis.displayProudcts([dataProductBar.result]);
            console.log(dataProductBar);
        } else {
            uiDis.displayProudcts([]);
        }
    }
})

//displar category of products
const dataCategoryProducts = await api.fetch("/products/categories");
const categoriesPro = dataCategoryProducts.results;
uiDis.displayCategoryProducts(categoriesPro);

//fillter products by categories
categoryProduct.addEventListener('click', async (e) => {
    const categoryBtn = e.target.closest('.product-category-btn').dataset.category
    const dataSearchCa = await api.fetch(`/products/category/${categoryBtn}`)
    uiDis.displayProudcts(dataSearchCa.results);
    searchProduct = dataSearchCa.results;
})

//fillter products by Nutri-Score
nutriScore.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (!searchProduct || searchProduct.length === 0) return;

        const clickedBtn = e.target.closest('button');
        if (!clickedBtn) return;

        const gradeValue = clickedBtn.getAttribute('data-grade').toLowerCase();

        let productsAfterFilter;

        if (gradeValue === "") {
            productsAfterFilter = searchProduct;
        } else {
            productsAfterFilter = searchProduct.filter(product => {
                return product.nutritionGrade && product.nutritionGrade.toLowerCase() === gradeValue;
            });
        }
        uiDis.displayProudcts(productsAfterFilter);
    });
});

//when click on product 
productsGrid.addEventListener('click', async (e) => {
    const clickedCard = e.target.closest('.product-card');
    if (clickedCard) {
        const barcode = clickedCard.getAttribute('data-barcode');

        try {
            const dataProductBar = await api.fetch(`/products/barcode/${barcode}`);

            if (dataProductBar && dataProductBar.result) {
                uiDis.displayProductDetailes(dataProductBar.result);
            }
        } catch (error) {
            console.log("Error fetching product details:", error);
        }
    }
});

productDetailModal.addEventListener('click', (e) => {

    const isCloseBtn = e.target.closest('.close-product-modal');
    const isBackground = e.target === productDetailModal;

    if (isCloseBtn || isBackground) {

        productDetailModal.classList.add('hidden');
        productDetailModal.classList.remove('flex');
        productDetailModal.innerHTML = '';
    }
});

//food Log 

function updateFoodLogUI() {
    calculateWeeklyData();
    let currentLog = JSON.parse(localStorage.getItem('myFoodLog')) || [];
    let totals = { cal: 0, pro: 0, carb: 0, fat: 0 };
    currentLog.forEach(item => {
        totals.cal += parseFloat(item.calories || 0);
        totals.pro += parseFloat(item.protein || 0);
        totals.carb += parseFloat(item.carbs || 0);
        totals.fat += parseFloat(item.fat || 0);
    });
    const goals = { cal: 2000, pro: 50, carb: 250, fat: 65 };
    uiDis.updateNutritionBars(totals, goals);
    uiDis.displayLoggedItems(currentLog);
}
const loggedItemsList = document.getElementById('logged-items-list');

if (loggedItemsList) {
    loggedItemsList.addEventListener('click', (e) => {
        const deleteBtn = e.target.closest('.remove-foodlog-item');
        if (deleteBtn) {
            const itemId = deleteBtn.getAttribute('data-id');
            let currentLog = JSON.parse(localStorage.getItem('myFoodLog')) || [];

            currentLog = currentLog.filter(item => item.id != itemId);
            localStorage.setItem('myFoodLog', JSON.stringify(currentLog));
            updateFoodLogUI();
            Swal.fire({
                html: `item removed from log`,
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 3000,
                background: '#10b981',
                color: '#ffffff',
                customClass: {
                    popup: ' rounded-xl px-3 py-3' // 
                }
            });
        }
    });
}
document.addEventListener('click', (e) => {

    const logProductBtn = e.target.closest('#log-product-btn');

    if (logProductBtn) {
        try {

            const productName = document.getElementById('product-modal-name').textContent;
            const productImg = document.getElementById('product-modal-img').src;

            const cal = parseFloat(document.getElementById('product-modal-cal').textContent);
            const pro = parseFloat(document.getElementById('product-modal-protein').textContent);
            const carbs = parseFloat(document.getElementById('product-modal-carbs').textContent);
            const fat = parseFloat(document.getElementById('product-modal-fat').textContent);

            const newLogEntry = {
                id: Date.now(),
                name: productName,
                type: 'Product',
                thumbnail: productImg,
                servings: 1,
                calories: cal.toFixed(1),
                protein: pro.toFixed(1),
                carbs: carbs.toFixed(1),
                fat: fat.toFixed(1),
                date: new Date().toISOString().split('T')[0],
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };

            let currentLog = JSON.parse(localStorage.getItem('myFoodLog')) || [];
            currentLog.push(newLogEntry);
            localStorage.setItem('myFoodLog', JSON.stringify(currentLog));

            const productModal = document.getElementById('product-detail-modal');
            Swal.fire({
                html: `${productName} logged to your daily intake! <i class="fa-solid fa-clipboard-list"></i>`,
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 3000,
                background: '#10b981',
                color: '#ffffff',
                customClass: {
                    popup: ' rounded-xl px-3 py-3' // 
                }
            });
            if (productModal) productModal.classList.add('hidden');

            updateFoodLogUI();


        } catch (error) {
            console.error(error);
        }
    }
});

function calculateWeeklyData() {
    let currentLog = JSON.parse(localStorage.getItem('myFoodLog')) || [];

    const today = new Date();
    const currentDayOfWeek = today.getDay() || 7;
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDayOfWeek + 1);

    let weekDays = [];
    let summary = { totalItems: 0, totalCal: 0, daysOnGoal: 0, avg: 0 };
    const GOAL_CAL = 2000;

    for (let i = 0; i < 7; i++) {
        let currentLoopDate = new Date(startOfWeek);
        currentLoopDate.setDate(startOfWeek.getDate() + i);

        let dateString = currentLoopDate.toISOString().split('T')[0];
        let dayName = currentLoopDate.toLocaleDateString('en-US', { weekday: 'short' });
        let dayNum = currentLoopDate.getDate();

        let dayLogs = currentLog.filter(item => {

            let itemDate = item.date || new Date().toISOString().split('T')[0];
            return itemDate === dateString;
        });

        let dayCal = dayLogs.reduce((sum, item) => sum + parseFloat(item.calories), 0);
        let dayItems = dayLogs.length;

        summary.totalItems += dayItems;
        summary.totalCal += dayCal;
        if (dayCal > 0 && dayCal <= GOAL_CAL) summary.daysOnGoal++;

        let isToday = dateString === today.toISOString().split('T')[0];

        weekDays.push({ dayName, dayNum, calories: Math.round(dayCal), items: dayItems, isToday });
    }

    summary.avg = Math.round(summary.totalCal / 7);

    uiDis.renderWeeklyOverview(weekDays, summary);
}


// side Bar
const headerMenuBtn = document.getElementById('header-menu-btn');
const sidebar = document.getElementById('sidebar');
const sidebarCloseBtn = document.getElementById('sidebar-close-btn');

if (headerMenuBtn && sidebar) {
    headerMenuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('force-show-sidebar');
    });
}

if (sidebarCloseBtn && sidebar) {
    sidebarCloseBtn.addEventListener('click', () => {
        sidebar.classList.remove('force-show-sidebar');
    });
}
const sidebarLinks = sidebar.querySelectorAll('a, button:not(#sidebar-close-btn)');
sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 1024) {
            sidebar.classList.remove('force-show-sidebar');
        }
    });
});





const myDate = new Date(); 

const formattedDate = myDate.toLocaleDateString('en-US', {
    weekday: 'long',  
    month: 'short',   
    day: 'numeric'    
});
const datetoday = document.getElementById('foodlog-date');
datetoday.innerHTML = `${formattedDate}`;


document.addEventListener('click', (e) => {
    
   
    const emptyMealsBtn = e.target.closest('#empty-meals-btn');
    if (emptyMealsBtn) {
        e.preventDefault();
        
        navMealsBtn.click(); 
    }

    
    const emptyScannerBtn = e.target.closest('#empty-scanner-btn');
    if (emptyScannerBtn) {
        e.preventDefault();
        navScannerBtn.click(); 
    }
});


window.addEventListener('popstate', () => {
    const currentHash = window.location.hash;

    
    hideAllSections();

    
    if (currentHash === '#scanner') {
        productsSection.classList.remove('hidden');
        updateActiveNav(navScannerBtn);
        
    } else if (currentHash === '#foodlog') {
        foodlogSection.classList.remove('hidden');
        updateFoodLogUI(); 
        updateActiveNav(navFoodlogBtn);
        
    } else {
        searchSection.classList.remove('hidden');
        categoriesSection.classList.remove('hidden');
        allRecipesSection.classList.remove('hidden');
        updateActiveNav(navMealsBtn);
    }
});