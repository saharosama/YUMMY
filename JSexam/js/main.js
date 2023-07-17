let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");
let Btn;

$(document).ready(() => {
    searchName("").then(() => {
        $("body").css({"overflow":"visible"})

    })
})

function openNav() {
    $(".side-nav").animate({
        left: 0
    }, 300)

    $(".fa-ellipsis").addClass("fa-x");


    for (let index = 0; index < 5; index++) {
        $(".links li").eq(index).animate({
            top: 0
        }, (index + 5) * 100)
    }
}

function closeNav() {
    let boxWidth = $(".side-nav .nav-tab").outerWidth()
    $(".side-nav").animate({
        left: -boxWidth
    }, 300)

    $(".fa-ellipsis").addClass("fa-align-justify");
    $(".fa-ellipsis").removeClass("fa-x");


    $(".links li").animate({
        top: 300
    }, 300)
}

closeNav()
$(".side-nav i.fa-ellipsis").click(() => {
    if ($(".side-nav").css("left") == "0px") {
        closeNav()
    } else {
        openNav()
    }
})




function displayMeals(arr) {
    let showitems  = "";

    for (let i = 0; i < arr.length; i++) {
        showitems  += `
        <div class="col-md-3 cur-pointer">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 ">
                    <img class="w-100" src="${arr[i].strMealThumb}" >
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2 ">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = showitems 
}



async function getCategories() {
    rowData.innerHTML = ""
    
    searchContainer.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()

    displayCategories(response.categories)
   

}

function displayCategories(arr) {
    let showitems  = "";

    for (let i = 0; i < arr.length; i++) {
        showitems  += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 border border-1 border-dark bg-light bg-opacity-25">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" >
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p class="text-truncate">${arr[i].strCategoryDescription.split(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = showitems 
}


async function getArea() {
    rowData.innerHTML = ""
    

    searchContainer.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    console.log(respone.meals);

    displayArea(respone.meals)
    

}


function displayArea(arr) {
    let showitems = "";

    for (let i = 0; i < arr.length; i++) {
        showitems  += `
        <div class="col-md-4 p-3 mt-3 ">
                <div onclick="getAreaMeals('${arr[i].strArea}')" class=" text-center cur-pointer border border-1  p-2 mt-3 rounded-3">
                <i class="fa-solid fa-location-dot fs-1 text-warning"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `
    }

    rowData.innerHTML = showitems 
}


async function getIngredients() {
    rowData.innerHTML = ""
   

    searchContainer.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    console.log(respone.meals);

    displayIngredients(respone.meals.slice(0, 10))
    

}


function displayIngredients(arr) {
    let showitems  = "";

    for (let i = 0; i < arr.length; i++) {
        showitems  += `
        <div class="col-md-3 p-3">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cur-pointer border border-1 p-2">
                        <i class="fa-solid fa-utensils fs-3 mt-2"></i> 
                        <h3 class="text-warning">${arr[i].strIngredient}</h3>
                        <p class="text-truncate">${arr[i].strDescription.split(" ")}</p>
                </div>
        </div>
        `
    }

    rowData.innerHTML = showitems 
}


async function getCategoryMeals(category) {
    rowData.innerHTML = ""
   

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 10))
   

}



async function getAreaMeals(area) {
    rowData.innerHTML = ""
    

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 10))
   

}


async function getIngredientsMeals(ingredients) {
    rowData.innerHTML = ""
   

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 10))
    

}

async function getMealDetails(mealID) {
    closeNav()
    rowData.innerHTML = ""
   

    searchContainer.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();

    displayMealDetails(respone.meals[0])
   

}


function displayMealDetails(meal) {
    
    searchContainer.innerHTML = "";


    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="badge border border-1 border-info text-white m-2 p-3">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    if (!tags) tags = []
    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="badge border border-1 border-danger text-white m-2 p-3">${tags[i]}</li>`
    }



    let showitems  = `
    <div class="col-md-3">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2 >${meal.strMeal}</h2>
            </div>
            <div class="col-md-9">
                <h2 class="text-warning">Instructions :</h2>
                <p>${meal.strInstructions}</p>
                <h3><i class="fa-solid fa-location-dot fs-3 text-success me-2">:</i>  ${meal.strArea}</h3>
                <h3><i class="fa-solid fa-utensils fs-3 text-warning me-2"> :</i>  ${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>
                <h3>Links :</h3>
                <a target="_blank" href="${meal.strSource}" class="text-success fs-2"><i class="fa-solid fa-link"></i></a>
                <a target="_blank" href="${meal.strYoutube}" class="text-danger fs-2"><i class="fa-brands fa-youtube"></i></a>
            </div>`

    rowData.innerHTML = showitems 
}


function showSearch() {
    searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`

    rowData.innerHTML = ""
}

async function searchName(term) {
    closeNav()
    rowData.innerHTML = ""
   

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    

}

async function searchLetter(term) {
    closeNav()
    rowData.innerHTML = ""
    

    term == "" ? term = "" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
   

}


function showContacts() {
    rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
    <h2 class="text-capitalize text-warning mb-3"> contact us </h2>
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control bg-transparent text-white" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                <i class="fa-solid fa-triangle-exclamation pe-1"></i> Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control bg-transparent text-white " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                <i class="fa-solid fa-triangle-exclamation pe-1"></i> Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control bg-transparent text-white" placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                <i class="fa-solid fa-triangle-exclamation pe-1"></i> Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control bg-transparent text-white" placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                <i class="fa-solid fa-triangle-exclamation pe-1"></i> Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control bg-transparent text-white" placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                <i class="fa-solid fa-triangle-exclamation pe-1"></i> Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control bg-transparent text-white " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                <i class="fa-solid fa-triangle-exclamation pe-1"></i> Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="Btn" disabled class="btn form-control btn-outline-warning p-2 mt-3">Submit</button>
    </div>
</div> `
    Btn = document.getElementById("Btn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })
}

let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let repasswordInputTouched = false;




function inputsValidation() {
    if (nameInputTouched) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputTouched) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputTouched) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputTouched) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputTouched) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputTouched) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        Btn.removeAttribute("disabled")
    } else {
        Btn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}