/** The purpose of this script is to determine if the user is entering valid information,
 * and then using that information to determine whether or not they are eligable to sign up to the Seek A Geek dating web app */

/** This function adds <p> elements into a div that assists the user with entering the correct information */
function addErrorMessages(message, elementId){
    var div = document.getElementById(elementId);
    var p = document.createElement("p");
    p.textContent = message;
    div.appendChild(p);
}

/** This function clears the <p> elements added by the previous function */
function clearErrors(elementId){
    document.getElementById(elementId).innerHTML = "";
}

/** This function validates the Seek A Geek sign up form */
function validateGeekInfo(e){
    e.preventDefault();
    clearErrors("error2");
    let valid = true;

    // Check name is valid
    let name = document.getElementById("name").value;
    if(name.length < 2 || name.length > 100){
        valid =  false;
        addErrorMessages("Your name must contain between 2 and 100 characters","error2");
    }
    if(!(/^[A-Za-z\s\'\-]+$/.test(name))){
        valid = false;
        addErrorMessages("Your name may only contain: characters Aa-Zz, space characters, hyphens, or apostrophes","error2");
    }

    // Check age is valid
    let age = document.getElementById("age").value;
    if(age.length < 1){
        valid = false;
        addErrorMessages("You must enter your age","error2");
    }
    if(!(parseInt(age))){
        valid = false;
        addErrorMessages("Your age must be a valid integer","error2");
    }else{
        if(parseInt(age) < 18 || parseInt(age) > 130){
            valid = false;
            addErrorMessages("Your age must be between 18yo and 130yo","error2");
        }
    }

    // Check age is valid
    let email = document.getElementById("email").value;
    if(email.length < 1){
        valid = false;
        addErrorMessages("You must enter your email address","error2");
    }
    if(!(/^[a-zA-Z-]([\w-.]+)?@([\w-]+\.)+[\w]+$/.test(email))){
        valid = false;
        addErrorMessages("You must enter a valid email address", "error2");
    }

    // Check phone number is valid (if entered)
    let mobile = document.getElementById("mobile").value;
    if(mobile.length > 0){
        if(mobile.length > 10 || mobile.length < 10){
            valid = false;
            addErrorMessages("Your mobile number must be 10 digits","error2");
        }
        if(!(/^[0-9]+$/.test(mobile))){
            valid = false;
            addErrorMessages("Your mobile number must contain numbers only","error2");
        }
        if(!(mobile.slice(0,2) == "04")){
            valid = false;
            addErrorMessages("Your mobile number must begin with '04'","errors2");
        }
    }

    // Display success message to user once sign up is complete
    if(valid){
        document.getElementById("column_two").style.display = "none";
        document.getElementById("column_three").style.display = "block";
        setTimeout(() => {  location.reload(); }, 10000);
    }
}

/** Assess whether or not the user qualifies to sign up for Seek A Geek based on their answers */
function geekWorthiness(){
    let geekScore = 0;

    let yesGlasses = document.getElementById("yes_glasses").checked;
    if(yesGlasses){
        geekScore = geekScore+10
    }

    let drink = document.getElementById("drinks").value;
    if(drink == "blue_V"){
        geekScore = geekScore+10
    }
    if(drink == "coffee"){
        geekScore = geekScore+5
    }
    if(drink == "tea"){
        geekScore = geekScore+3
    }

    let romanticOuting = document.getElementById("romantic_outing").value;
    switch(romanticOuting){
        case "star_wars_convention":
            geekScore = geekScore+9
            break;
        case "apple_store":
            geekScore = geekScore+7
            break;
        case "subway_meal":
            geekScore = geekScore+5
            break;
        case "cinema":
            geekScore = geekScore+1
            break;
        default:
            geekScore = geekScore+0;
    }
      
    let idsInOrder = $("#sortable").sortable("toArray");
    let id=0;
    let points=0;
    for(let i=5; i>0; i--){
        points = points + idsInOrder[id]*i;
        id++;
    }
    geekScore = geekScore+points;

    let count = $('#watched_tv_shows option:selected').length;
    geekScore = geekScore+(count*5);

    // Displays super geek image and promps sign up
   if(geekScore == 100){
    document.getElementById("column_one").style.display = "none";
    $(window).scrollTop(0);
    $('#super_geek').show().animate({
        width: "10%",
        height: "10%", 
         }, 1500 );
    $('#super_geek').show().animate({
        width: "100%",
        height: "100%",
        }, 1500, function() {
            $(this).removeAttr('style').fadeIn('fast');
        } );
    addErrorMessages(`Your score was 100 out of 100`,"super_geek_score");
    setTimeout(() => {
        document.getElementById("super_geek").style.display = "none";
        document.getElementById("column_two").style.display = "block";
    }, 10000);
    document.removeEventListener("submit", validateGeekEvaluation);
    document.addEventListener("submit",validateGeekInfo);
   }
   // Displays welcome geek image and prompts sign up
   if(geekScore > 50 && geekScore < 100){
    document.getElementById("column_one").style.display = "none";
    $(window).scrollTop(0);
    $('#Welcome_geek').slideToggle("slow");
    addErrorMessages(`Your score was ${geekScore} out of 100`,"Welcome_geek_score");
    setTimeout(() => {
        document.getElementById("Welcome_geek").style.display = "none";
        document.getElementById("column_two").style.display = "block";
    }, 10000);
    document.removeEventListener("submit", validateGeekEvaluation);
    document.addEventListener("submit",validateGeekInfo);
   }
   // Displays not geeky enough image and reloads to evaluation
   if(geekScore < 50){
    document.getElementById("column_one").style.display = "none";
    $(window).scrollTop(0);
    $('#not_geeky_enough').fadeIn("slow");
    addErrorMessages(`Your score was only ${geekScore} out of 100`,"not_geeky_enough_score");
    setTimeout(() => {  location.reload(); }, 10000);
   }
}

/** This function checks that the user is entering valid infomration into their evaluation */
function validateGeekEvaluation(e){
    e.preventDefault();
    clearErrors("error");
    let valid = true;

    // Check radio button has at least one true value
    let yesGlasses = document.getElementById("yes_glasses").checked;
    let noGlasses = document.getElementById("no_glasses").checked;
    if(!yesGlasses && ! noGlasses){
        valid = false;
        addErrorMessages("You must input whether or not you wear glasses","error");
    }

    // Drinks does not need to be error checked as a value of none is an acceptable answer

    // Check that a romantic outing has been selected
    let romanticOuting = document.getElementById("romantic_outing").value;
    if(romanticOuting == "none"){
        valid = false;
        addErrorMessages("You must select a romantic outing","error");
    }

    // Ranking of dream attributes does not need to be error checked order can only be effected by dragging

    // TV shows multiselect does not need to be checked for errors as none is an acceptable answer

    // Once the input is valid the evaluation will be assessed by the above function
    if(valid){
        geekWorthiness();
    }
}

// Add an event listener immediatley
document.addEventListener("submit", validateGeekEvaluation);

// Make the ranking dream attributes sortable with a drag and drop
$( function() {
    $( "#sortable" ).sortable();
  } );
