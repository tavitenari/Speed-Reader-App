//Ioane "Tavi" Tenari
//1/28/16
//CSE154
//speedreader.js

(function() {
	"use strict";
	
	/*
	Limited Global Variables
	*/
	var timer = null;
	var count = 0;
	var repeat = false;
	var spd = 171;

	/*
	Anonymous function for the initial load
		-"Stop" is disabled
		-Buttons are connected to onclick/onchange
	*/
	window.onload = function(){
		var sizeSelect = document.getElementById("size");
		var speedSelect = document.getElementById("speed");
		var startButton = document.getElementById("start");
		var stopButton = document.getElementById("stop");
		
		stopButton.disabled = true;
		startButton.onclick = go;
		stopButton.onclick = stop;
		speedSelect.onchange = changeSpeed;
		sizeSelect.onchange = changeSize;
	};
	
	/*
	Initializes the counting sequence
		-Enables "Stop"
		-Disables "Start" and text area
	*/
	function go(){
		document.getElementById("stop").disabled = false;
		document.getElementById("start").disabled = true;
		document.getElementById("textin").disabled = true;
		if(!timer){
			timer = setInterval(start, spd);
		}
	}
	  
	/*
	Starts the speedreading sequence
		-Filters out white spaces and punctuation
		-Interval is cleared when all words are displayed
	*/
	function start(){
		var tex = document.getElementById("textin").value;
		var txtfinal = tex.split(/[ \t\n]+/);
		for (var i = 0; i < txtfinal.length; i++){
			var check = (txtfinal[count].charCodeAt(txtfinal[count].length-1));
			if ( (check == 44) || (check == 46) || (check == 33) || 
			(check == 63) || (check == 58) || (check == 59) ){
				txtfinal[count] = txtfinal[count].slice(0, -1);
				if(repeat === false){
					repeat = true;
				}
				else{
					repeat = false;
				}
			}
		}
		document.getElementById("word").innerHTML = txtfinal[count];
		if(repeat === false){
			count++;
		}
		if(count == (txtfinal.length)){
			clearInterval(timer);
			timer = null;
			count = 0;
			document.getElementById("word").innerHTML = "";
		}
	}
	
	/*
	Stops the speedreader
		-disables "stop"
		-enables "start" and the textbox
	*/
	function stop(){
		document.getElementById("stop").disabled = true;
		document.getElementById("start").disabled = false;
		document.getElementById("textin").disabled = false;
		document.getElementById("word").innerHTML = "";
		clearInterval(timer);
		timer = null;
		count = 0;
	}
	
	/*
	Changes the speedreader's speed
		-starts a new interval which finshes cycling through the text
	*/
	function changeSpeed(){
		var speedOpt = document.getElementById("speedopt");
		spd = ((speedOpt.options[speedOpt.selectedIndex].value));
		if (timer){
			clearInterval(timer);
			timer = setInterval(start, spd);
		}
	}
	
	/*
	Changes the font size
		-assigns display to different classes to change font size
	*/
	function changeSize(){
		var sizer = document.querySelectorAll("input");
		for (var i = 0; i < sizer.length; i++){
			if (sizer[i].checked){
				document.getElementById("word").className = sizer[i].value;
			}
		}
	}
})();