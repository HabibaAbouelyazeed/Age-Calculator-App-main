let inputDay = document.getElementById('inputDay');
let inputMonth = document.getElementById('inputMonth');
let inputYear = document.getElementById('inputYear');
let submitBtn = document.querySelector('.dateInput button');

let resultYearParag = document.querySelector('.outputDate .years .result-number');
let resultMonthsParag = document.querySelector('.outputDate .months .result-number');
let resultdaysParag = document.querySelector('.outputDate .days .result-number');



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



submitBtn.addEventListener('click', function(e){
    birthYear = inputYear.value;
    birthMonth = inputMonth.value;
    birthDay = inputDay.value;
    birthdate = new Date(birthYear, birthMonth-1, birthDay);

    let [yearsDiff, monthsDiff, daysDiff] = calcAge(date, birthdate);

    resultYearParag.innerHTML = yearsDiff;
    resultMonthsParag.innerHTML  = monthsDiff;
    resultdaysParag.innerHTML  = daysDiff;


    //Stop form refreshing page on submit
    e.preventDefault();
});








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

   //return [years,months,days]
    return [yearsDiff, monthsDiff, daysDiff];
}




