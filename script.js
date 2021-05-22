
let last_time;
let interval;

let hour = 0;
let minute = 0;
let second = 0;

let pill_last_time;
let pill_interval;

let pill_hour = 0;
let pill_minute = 0;
let pill_second = 0;

function startup() {
    add_listeners();
    get_time();
    pill_get_time();
    create_interval();
    pill_create_interval();
}

function add_listeners() {
    document.getElementById("dogs").addEventListener("click", send_time, false);
    document.getElementById("pill_dogs").addEventListener("click", pill_send_time, false);
}

function send_time() {
    let time = Date.now().toString()

    const data = { "time" : time };

    fetch("send_time.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
    .then(response => response.json())
    .then(function(){
        get_time();
    })
    .catch(err => console.error(err));
}

function get_time() {
    fetch("get_time.php", {
        method: 'GET',
        headers: { 'content-type': 'application/json' }
    })
    .then(response => response.json())
    .then(function(data){
        last_time = new Date(parseInt(data.time));
        
        let delta = (Date.now() - last_time.valueOf()) / 1000;

        hour = Math.floor(delta / 3600);
        minute = Math.floor((delta % 3600) / 60)
        second = Math.floor(delta % 60)
        
        format_time();
        update_time();
    })
    .catch(err => console.error(err));
}

function format_time() {
    if (hour < 10) {
        document.getElementById("hour").innerHTML = "0" + hour.toString();
    } else {
        document.getElementById("hour").innerHTML = hour.toString();
    }

    if (minute < 10) {
        document.getElementById("minute").innerHTML = "0" + minute.toString();
    } else {
        document.getElementById("minute").innerHTML = minute.toString();
    }

    if (second < 10) {
        document.getElementById("second").innerHTML = "0" + second.toString();
    } else {
        document.getElementById("second").innerHTML = second.toString();
    }
}

function create_interval() {
    interval = setInterval(function() {

        get_time();
        // console.log(hour + "|" + minute + "|" + second);
        if (hour >= 2) {
            $("#time").css("color", "red");
        } else {
            $("#time").css("color", "green");
        }

        second += 1;
        if (second >= 60) {
            second = 0;
            minute += 1;
        }
        if (minute >= 60) {
            minute = 0;
            hour += 1;
        }

        format_time();

    }, 1000);
}

function update_time() {
    clearInterval(interval);
    create_interval();
}

function pill_send_time() {
    let time = Date.now().toString()

    const data = { "time" : time };

    fetch("pill_send_time.php", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    })
    .then(response => response.json())
    .then(function(){
        pill_get_time();
    })
    .catch(err => console.error(err));
}

function pill_get_time() {
    fetch("pill_get_time.php", {
        method: 'GET',
        headers: { 'content-type': 'application/json' }
    })
    .then(response => response.json())
    .then(function(data){
        pill_last_time = new Date(parseInt(data.time));
        
        let delta = (Date.now() - pill_last_time.valueOf()) / 1000;

        pill_hour = Math.floor(delta / 3600);
        pill_minute = Math.floor((delta % 3600) / 60)
        pill_second = Math.floor(delta % 60)
        
        pill_format_time();
        pill_update_time();
    })
    .catch(err => console.error(err));
}

function pill_format_time() {
    if (pill_hour < 10) {
        document.getElementById("pill_hour").innerHTML = "0" + pill_hour.toString();
    } else {
        document.getElementById("pill_hour").innerHTML = pill_hour.toString();
    }

    if (pill_minute < 10) {
        document.getElementById("pill_minute").innerHTML = "0" + pill_minute.toString();
    } else {
        document.getElementById("pill_minute").innerHTML = pill_minute.toString();
    }

    if (pill_second < 10) {
        document.getElementById("pill_second").innerHTML = "0" + pill_second.toString();
    } else {
        document.getElementById("pill_second").innerHTML = pill_second.toString();
    }
}

function pill_create_interval() {
    pill_interval = setInterval(function() {

        pill_get_time();
        // console.log(pill_hour + "|" + pill_minute + "|" + pill_second);
        if (pill_hour >= 22) {
            $("#pill_time").css("color", "red");
        } else {
            $("#pill_time").css("color", "green");
        }

        pill_second += 1;
        if (pill_second >= 60) {
            pill_second = 0;
            pill_minute += 1;
        }
        if (pill_minute >= 60) {
            pill_minute = 0;
            pill_hour += 1;
        }

        pill_format_time();

    }, 1000);
}

function pill_update_time() {
    clearInterval(pill_interval);
    pill_create_interval();
}

$(document).ready(startup); //start everything