var update_time = 10;
var intervals = [];
var past_times = [];
var hundredth = 0;
var seconds = 0;
var minutes = 0;
var hours = 0;
var isStarted = 0;
var startTime = 0;


var keyboardHandler = function (e) {
    console.log(e.keyCode);
    if (e.keyCode == 32) {
         start();
    }
    if (e.keyCode == 83) {
        set_step();
    }
}

document.addEventListener('keyup', keyboardHandler, false);

window.onload = function(){
    document.body.style.background = config.background_color;
    document.getElementById("sessionName").innerHTML=config.session_name;
    document.getElementById("iframe").innerHTML = '<iframe width="560" height="120" src="https://www.youtube.com/embed/videoseries?list='+config.youtube_playlist+'" frameborder="0" allowfullscreen></iframe>'
}

function start(){
    isStarted = !isStarted;
    if (isStarted != 0){
       startTime = new Date().getTime();
       var intervalId = setInterval(function () {
           update();
       }
       , update_time);
       intervals.push(intervalId);
       document.getElementById("startButton").innerHTML="Stop Timer";
   }
   else {
       stop_timers();
       document.getElementById("startButton").innerHTML="Start Timer";
       past_times = [];
   }
}

function stop_timers(){
    for (i = 0; i < intervals.length; i++){
       clearInterval(intervals[i]);
   }
}

function get_time_string(){
    var now = new Date().getTime();
    var elapsed = new Date(now - startTime);
    var localHours = elapsed.getHours();
    var localMinutes = elapsed.getMinutes();
    var localSeconds = elapsed.getSeconds();
    var localHundredth = elapsed.getMilliseconds();
    
    if (localHours < 10)
       localHours = "0" + localHours;
   if (localMinutes < 10)
       localMinutes = "0" + localMinutes;
   if (localSeconds < 10)
       localSeconds = "0" + localSeconds;
   if (localHundredth < 10)
       localHundredth = "0" + localHundredth;
   return (localHours+":"+localMinutes+":"+localSeconds+":"+localHundredth);
}

function set_step(){
    past_times.push(get_time_string());
    update();
}

function update(){
    var innerHTML = "<b><thread><tr><th class='mdl-data-table__cell--non-numeric'>Time</th><th class='mdl-data-table__cell--non-numeric'>Section</th></tr></thread><tr>";
    if (config.steps[past_times.length] !== undefined){
        for (i = 0; i < past_times.length; i++)
           innerHTML += "<th class='mdl-data-table__cell--non-numeric'>" + 
       past_times[i] + 
       "</th><th class='mdl-data-table__cell--non-numeric'> " + 
       config.steps[i] + "</th></tr>"
       document.getElementById("past_times").innerHTML = innerHTML;
       innerHTML = "<b><font color='blue'>"+ get_time_string() + "</font></b>";
       document.getElementById("timer").innerHTML = innerHTML;
       var timerDiv = document.getElementsByClassName("table_container")[0];
       timerDiv.scrollTop = timerDiv.scrollHeight;
   }
}