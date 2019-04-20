var navigate = (function() {
  $('.dd').toggle();
  $('.dd_btn').click(function() {
    var dataName = $(this).attr('data-name');
    $('.dd').hide();
    $('.' + dataName).toggle();
  });
})();

$(document).ready(function() {
  drawDate();
});
var today = new Date();
var currentDay = today.toString().split(" ");
var dd = today.getDate();
var yyyy = today.getFullYear();
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var mm = months[today.getMonth()];
getLocalStorage();

function changeDate(val) {
  if (val === 0) {
    today = new Date();
    currentDay = today.toString().split(" ");
    $(".today").hide();
    getLocalStorage();
  } else {
    today.setDate(today.getDate() + val);
    currentDay = today.toString().split(" ");
    checkIfToday(val);
    getLocalStorage();
  }
  dd = today.getDate();
  yyyy = today.getFullYear();
  mm = months[today.getMonth()];
  drawDate();
}

function checkIfToday(val) {
  var checkArr = (today.getDate() + val).toString().split(" ");
  var todayArr = today.getDate().toString().split(" ");
  var todayStr = chopDate(todayArr);
  var checkStr = chopDate(checkArr);
  if (checkStr != todayStr) {
    $(".today").show();
  }
}

function chopDate(day) {
  var arr = [];
  for (var i = 0; i < 4; i++) {
    arr.push(day[i]);
  }
  var str = arr.join("");
  return str;
}

function drawDate() {
  getLocalStorage();
  var str = dd.toString();
  str = parseInt(str[str.length - 1]);
  var supArr = ["th", "st", "nd", "rd"]
  if (str != 1 && str != 2 && str != 3) {
    str = 0;
  }
  var sup = supArr[str];

  $("#month").text(mm);
  $("#day").text(dd);
  $("#super").text(sup);
  $("#year").text(yyyy);
}
/*  var template = ``;
  for(var i = 1; i <= 24; i++){
    var amPm = (i < 12) ? "AM":"PM";
    var hour = (i < 13) ? i : i - 12;
    template += `<div class="hour" id="${i}"><sub class="left">${hour}:00 ${amPm}</sub><div class="hour-input" id="hour${i}"></div></div>`;
  }
  $("#time").html(template)

  $(".hour").click(function(e){
    textWrite(e);
  });
  $(".hour-input").click(function(e){
    var val = e.target.id[e.target.id.length -1];
    var result = {target: {id: val}}
    textWrite(result);
  });
  function textWrite(val){
    var id = val.target.id;
    var text = $(`#hour${id}`).text();
    $(`#hour${id}`).html(`<input id="input${id}" value="${text}">`)
    $(`#input${id}`).focus();
    currentInput = id;
    $(`#hour${id}`).focusout(function(){
      var val = $(`#input${id}`).val();
      $(`#hour${id}`).text(val)
    });
  }
  var currentInput = "";

    $(document).on('keydown', 'input', function(e) {
      var keyCode = e.keyCode || e.which;
      if (keyCode == 9 && currentInput != 24) {
        e.preventDefault();
        var num = parseInt(currentInput);
        num++
        currentInput = num;
          var result = {target: {id: currentInput}}
          textWrite(result);
      }
    });
  $(".save").click(function(){
    var arr = getValues();
    var day = chopDate(currentDay);
    localStorage.setItem(day,JSON.stringify(arr));
  });
  function getValues(){
    var hourArr = [];
    for(var i = 1; i < 25; i++){
      hourArr.push($("#hour" + i).text());
    }
    console.log("Get values",hourArr);
    return hourArr;
  }
  function getLocalStorage(){
    var hourArr = [];
    hourArr = JSON.parse(localStorage.getItem(chopDate(currentDay)));
    console.log(hourArr);
    if(hourArr != null){
      //console.log(chopDate(currentDay)+":",hourArr);
      for(var i = 1; i < 25; i++){
        if(hourArr[i] != null && hourArr[i] != undefined){
          //console.log(hourArr[i]);
          $("#hour" + i).text( hourArr[i]);
        }
        else{
          $("#hour" + i).text("");
        }
      }
    }
    else {
      //console.log(chopDate(currentDay)+":",hourArr);
      for(var i = 1; i < 25; i++){
        $("#hour" + i).text("");
      }
    }
  }
