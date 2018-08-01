// =========== model ===========
var model = (function() {

	var item = function(id, task){
	
		this.id = id;
		this.content = task;
	
	};


	var data = {

		allTasks: [],
		doneTasks: [],

	};


	return {
		angle: function() {

			// get current time from system
			const now = new Date()
			const hours = now.getHours();
			const minutes = now.getMinutes();
			const seconds = now.getSeconds();

			// hand angle calculator
			var hourAngle = (hours * 30) + (minutes / 2);
			var minAngle = (minutes * 6);
			var secAngle = (seconds * 6);


			return {
				hourAngle,
				minAngle,
				secAngle,

			}

		},

		addTask: function(task) {

			var ID;

			if(data.allTasks.length > 0) {

				/* "data.allTasks.length - 1" is to find the index of last element in array
					and we plus 1 to be index of new element */
				ID = data.allTasks[data.allTasks.length - 1].id + 1;   

			} else {

				ID = 0;

			}

			var newTask = new item(ID, task);
			data.allTasks.push(newTask);

			return newTask;

		},

		doneTask: function(id) {



			data.doneTasks.push(id);

			return data.doneTasks;


			// get id array of alltasks
			// var ids = data.allTasks.map(function(currentVal) {

			// 	return currentVal.id;

			// });


			// id is not index of task, we need to get real index of the task
			// convert id form string to decimal integer
			// var index = ids.indexOf(parseInt(id, 10));


			// check index exist or not
			// if(index >= 0) {

			// 	data.allTasks.splice(index, 1);
			
			// }

		},

		// to check the content of data
		test: function() {
			console.log(data);

		},


	}

})();


// ======== view ===========
var view = (function(){

	var DOMstrings = {
	
		hour: '.hours',
		minute: '.minutes',
		second: '.seconds',
		clock: '.clock',
		question: '.question',
		intro: '.introduction',
		introMask: '.introduction-mask',
		close: '.close',
		enter: '.enter',
		addBtn: '.add-button',
		list: '.list',
		container: '.container',

	};




	return {

		getInfo: function() {

			return {
				task: document.querySelector('.enter').value,

			};

		},

		getDOMstrings: function() {

			return DOMstrings;

		},

		setupTime: function(hourAngle, minuteAngle, secAngle) {


			// current time on screen
			document.querySelector(DOMstrings.hour).style.transform = 'rotateZ(' + hourAngle + 'deg)';
			document.querySelector(DOMstrings.minute).style.transform = 'rotateZ(' + minuteAngle + 'deg)';
			document.querySelector(DOMstrings.second).style.transform = 'rotateZ(' + secAngle + 'deg)';

		},

		showIntroduction: function() {

			// display introduction
			document.querySelector(DOMstrings.intro).style.opacity = 0;
			document.querySelector(DOMstrings.intro).style.display = 'block';
			document.querySelector(DOMstrings.introMask).style.display = 'block';
			window.setTimeout(function(){

				document.querySelector(DOMstrings.intro).style.opacity = 1;

			}, 10);

		},

		closeIntroduction: function() {

			document.querySelector(DOMstrings.intro).style.display = 'none';
			document.querySelector(DOMstrings.introMask).style.display = 'none';

		},

		pinkColor: function() {
			document.body.style.background = 'url(background.jpg)';
			document.body.style.backgroundRepeat = 'no-repeat';
			document.body.style.backgroundSize = 'cover';
			document.body.style.backgroundAttachment = 'fixed';
			document.querySelector(DOMstrings.clock).style.borderColor = '#FF7070';
		},

		greenColor: function() {
			document.body.style.background = 'url(background-2.jpg)';
			document.body.style.backgroundRepeat = 'no-repeat';
			document.body.style.backgroundSize = 'cover';
			document.body.style.backgroundAttachment = 'fixed';
			document.querySelector(DOMstrings.clock).style.borderColor = '#49C55B';
		},

		originalColor: function() {
			document.body.style.background = '#F2F2F2 no-repeat fixed';
			document.body.style.backgroundRepeat = 'no-repeat';
			document.body.style.backgroundSize = 'cover';
			document.querySelector(DOMstrings.clock).style.borderColor = '#A2A2A2';
		},

		clearInput: function() {

			document.querySelector(DOMstrings.enter).value = '';
			document.querySelector(DOMstrings.enter).focus();

		},

		addListTask: function(object) {

			// console.log(object);

			var element = DOMstrings.list;
			var html = '<div class="item" id = "%id%"><div class="task">%task%<div class="delete"><div class="delete-btn">X</div></div></div></div>';

			// update id of html
			var newHTML = html.replace('%id%', object.id);
			// again, this time we update task of "newHTML"
			newHTML = newHTML.replace('%task%', object.content);


			document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);

		},

		doneListTask: function(id, doneList) {

			// get DOM item
			var element = document.getElementById(id);
			console.log(element);
			console.log(doneList);
			
			console.log(doneList.indexOf(id));

			if(doneList.indexOf(id) >= 0) {

				element.parentNode.removeChild(element);

			} else {

				element.style.textDecoration = 'line-through';

			}
			


		},

	}

})();

// ============ controller ===============
var controller = (function(m, v) {

	// get DOMstrings form view
	var DOMstrings = view.getDOMstrings();
	// judge if it was working time
	var colorSelector = 1; 
	// for function 'doneList'
	var doneList = [];

	// set current time 
	var setupTime = function() {

		var hourAngle = model.angle().hourAngle;
		var minuteAngle = model.angle().minAngle;
		var secondAngle = model.angle().secAngle;
		view.setupTime(hourAngle, minuteAngle, secondAngle);
	};

	// setup all EventListener
	var setupEventListener = function() {
		document.querySelector(DOMstrings.clock).addEventListener('click', function() {

			if(colorSelector === 1) {
				colorSelector++;
				view.pinkColor();
				
			} else if(colorSelector === 2 ) {
				colorSelector++;
				view.greenColor();

			} else if(colorSelector === 3) {
				colorSelector = 1;
				view.originalColor();
			}

		});
		// show intro
		document.querySelector(DOMstrings.question).addEventListener('click', view.showIntroduction);
		//close intro
		document.querySelector(DOMstrings.introMask).addEventListener('click', view.closeIntroduction);
		document.querySelector(DOMstrings.close).addEventListener('click', view.closeIntroduction);

		// button to add task
		document.querySelector(DOMstrings.addBtn).addEventListener('click', addTask);
		document.addEventListener('keypress', function(event) {

			if(event.keycode === 13 || event.which === 13) {  // "event.which" is to fit more browsers
				addTask();
			}
		});


		// delete task
		document.querySelector(DOMstrings.container).addEventListener('click', doneTask);


	};

	var addTask = function() {

		var input = view.getInfo();

		if(input.task !== '') {
			console.log(input);
			var newTask = model.addTask(input.task);

			view.addListTask(newTask);

			view.clearInput();

		} else {

			window.alert('請在對話框中輸入代辦事項');

		}

	};

	var doneTask = function(event) {

		// get the id of task wanted to delete 
		var taskID = event.target.parentNode.parentNode.parentNode.id;
		// console.log(taskID);

		

		view.doneListTask(taskID, doneList);

		doneList = model.doneTask(taskID);
		console.log(doneList);

	};


	return {

		init: function() {
			
			setupTime();
			setupEventListener();

		},


	}



})(model, view);


controller.init();
