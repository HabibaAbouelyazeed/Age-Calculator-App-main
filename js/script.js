//Inputs
let inputDay = document.getElementById('inputDay');
let inputMonth = document.getElementById('inputMonth');
let inputYear = document.getElementById('inputYear');
let submitBtn = document.querySelector('.dateInput button');

let inputDateArray = [inputDay, inputMonth, inputYear];
let labels = document.querySelectorAll('.dateInput label');

//Results
let resultYearParag = document.querySelector('.outputDate .years .result-number');
let resultMonthsParag = document.querySelector('.outputDate .months .result-number');
let resultdaysParag = document.querySelector('.outputDate .days .result-number');
 
let resultParagArray = [resultYearParag, resultMonthsParag, resultdaysParag];


//Current Date
const date = new Date();
let currentYear= date.getFullYear(); 
//Adding 1 because the month index starts from 0 
let currentMonth= date.getMonth()+1; 
let currentDay= date.getDate(); 

//declare birthdate vars
let birthYear, birthMonth, birthDay;
let birthdate;

let DAYS_IN_MONTH = [
    31,
    28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31
];
// ****************  DECLERATIONS ==> END **************** 


//Submit button actions
submitBtn.addEventListener('click', function(e){
    //Stop form refreshing page on submit
    e.preventDefault();
    
    let flag = validateForm(inputDateArray);
    console.log(flag);
    if(flag == 0){
        resultParagArray.forEach(element =>{
            element.innerHTML = '--';
        })
        //add error color
        inputDateArray.forEach(element =>{
            element.classList.add("errorBorder");
        })

        labels.forEach(element =>{
            element.classList.add("errorText");
        })
        return;
    }
    
    birthYear = inputYear.value;
    birthMonth = inputMonth.value;
    birthDay = inputDay.value;
    birthdate = new Date(birthYear, birthMonth-1, birthDay);

    let [yearsDiff, monthsDiff, daysDiff] = calcAge(date, birthdate);

    resultYearParag.innerHTML = yearsDiff;
    resultMonthsParag.innerHTML  = monthsDiff;
    resultdaysParag.innerHTML  = daysDiff;


    //remove error color
    inputDateArray.forEach(element =>{
        element.classList.remove("errorBorder");
    })

    labels.forEach(element =>{
        element.classList.remove("errorText");
    })

});


// **** Validations ****
function validateForm(date){    
    // 0 = invalid , 1 = valid
    //each function returns 1 if validation passed
    if( (validateRequiredFeilds(date)) && (validateDay(date)) && (validateMonth(date)) && (validateYear(date)) ){
        return 1;
    }
    
    return 0;
}

function validateRequiredFeilds(date){
    let flag = 1;
    date.forEach(element => {
        if(element.value == ""){
            element.nextElementSibling.innerHTML = 'This field is required';
            flag = 0;
        }
        else{
            element.nextElementSibling.innerHTML = ''
        }
    });
    return flag;
}

function validateDay(date){
    let flag = 1;
    let day = date[0];
    //validate day <= 31
    if(day.value > 31 || day.value < 1){
        day.nextElementSibling.innerHTML = 'Must be a valid day';
        flag = 0;
        return flag;
    }
    let monthValue = date[1].value - 1;

    if(day.value > DAYS_IN_MONTH[monthValue]){
        day.nextElementSibling.innerHTML = 'Must be a valid date';
        flag = 0;
    }

    return flag;
}


function validateMonth(date){
    let flag = 1;
    let month = date[1];
    //validate day <= 12
    if(month.value > 12 || month.value < 1){
        month.nextElementSibling.innerHTML = 'Must be a valid month';
        flag = 0;
    }
    return flag;
}


function validateYear(date){
    let flag = 1;
    let year = date[2];
    let month = date[1];
    let day = date[0];
    //validate day <= current year
    if(year.value < 0){
        year.nextElementSibling.innerHTML = 'Must be a valid year';
        flag = 0;
    }else if(year.value > currentYear){
        year.nextElementSibling.innerHTML = 'Must be in the past';
        flag = 0;   
    }else if(month.value > currentMonth && year.value == currentYear){
        year.nextElementSibling.innerHTML = 'Must be in the past';
        flag = 0;   
    }else if(day.value > currentDay && month.value == currentMonth && year.value == currentYear){
        year.nextElementSibling.innerHTML = 'Must be in the past';
        flag = 0;   
    }
    return flag;
}




//Returns age diff in [years,months,days]
function calcAge(current, birth){
    let yearsDiff;
    let monthsDiff;
    let daysDiff;
    
    yearsDiff = current.getFullYear() - birth.getFullYear();
    monthsDiff = Math.abs(current.getMonth() - birth.getMonth());
    daysDiff = Math.abs(current.getDate() - birth.getDate());

    if(current.getMonth() < birth.getMonth()){
        yearsDiff --;
        monthsDiff = 12 - monthsDiff;
    }

    if(current.getDate() < birth.getDate()){
        monthsDiff --;
        daysDiff = DAYS_IN_MONTH[birth.getMonth()] - daysDiff;
    }

   //return format => [years,months,days]
    return [yearsDiff, monthsDiff, daysDiff];
}