var dob=document.querySelector("#dob");
var output=document.querySelector(".result");
var btn=document.querySelector("#check-btn");

function checkClickHandler(){
    var dateOfBirth=dob.value.split('-');
    var date={
        day:dateOfBirth[2],
        month:dateOfBirth[1],
        year:dateOfBirth[0]
    }
    //if-else statement to check input validation
    if(dob.value ==''){
        output.classList.add("result-err")
        output.innerText='Enter valid input to check palindrome date';
    }else{
        //if there is valid input call palindrome function
        //nested if-else used to display message according to the result
        if(isPalindrome(date)){
            output.classList.remove("result-err");
            output.innerText='Yippe your birthday is palindrome number';
        }
        else{
             var countNextDate=nextPalindromeDate(date);
             output.classList.remove("result-err");
             var nextdate=countNextDate[1].day+"/"+countNextDate[1].month+"/"+countNextDate[1].year;
             output.innerText="oopsie! your birthday is not palindrome number. Next Palindrome date is: "+nextdate+", "+countNextDate[0]+" days.";
            
        }
    }
    

}


function dateFormat(date){
    var yyyymmdd=date.year+date.month+date.day;
    var ddmmyyyy=date.day+date.month+date.year;
    var mmddyyyy=date.month+date.day+date.year;
    console.log(yyyymmdd,ddmmyyyy,mmddyyyy);
    return [yyyymmdd,ddmmyyyy,mmddyyyy];
    
    
}
//palindrome function //11 10 1000
function isPalindrome(date){
    var reverseStr;
    //calling date format function to store all date formated date value
    var formatedDateArray=dateFormat(date);
    //loop to go through all formated date and to check all formated is plaindrome
    for(var i=0;i<formatedDateArray.length;i++){
        //calling reverString function to store reverse value
        reverseStr=reverseString(formatedDateArray[i])
        if(reverseStr == formatedDateArray[i]){
            return true;//it will return true where palindrome function is called
        }
    }
    return false
}
//reverse string function used to reverse passed value
function reverseString(dateStr){

    var reverseStr=''
    console.log(dateStr);
    var splitstr=dateStr.split('');
    for(var i=splitstr.length-1;i>=0;i--){
        reverseStr+=splitstr[i];
    }
    return reverseStr;
}

function dateIncrementFunction(date){
    var day=Number(date.day)+1;
    var month=Number(date.month);
    var year=Number(date.year);
    console.log(typeof(day),day);


    var MaxdatesInMonths =[31,28,31,30,31,30,31,31,30,31,30,31];
    if(month == 2){
        if(day > 28){
            day=1;
            month++;
        }else if(leapyear(year)){
                if(day > 29){
                    day=1;
                    month++
                }
        }
    }else{
        if(day > MaxdatesInMonths[month-1]){
            day=01;
            month++;
        }
    }

    if(month>12){
        month=1;
        year++
    }

    if(day<10){
        day='0'+day;
    }
    if(month<10){
        month='0'+month;
    }

    date.day=day.toString();
    date.month=month.toString();
    date.year=year.toString();
    console.log("after adding day and changing to string",date)
    return date;
    
}





function nextPalindromeDate(date){
    var count=0;
    var nextdate=dateIncrementFunction(date);
    // console.log("nextdate",nextdate);//
    while(1){
        if(isPalindrome(nextdate)){
            break;
        }
        count++;
        nextdate=dateIncrementFunction(nextdate)
        // console.log("nextdate",nextdate,count);
    }
    console.log("nextdate",nextdate,count);
    return [count,nextdate];
}



function leapyear(year){
    if(year%400 == 0){
        return true;
    }
    if(year%100 == 0){
        return false;
    }
    if(year%4 == 0){
        return true;
    }
}


btn.addEventListener('click',checkClickHandler)