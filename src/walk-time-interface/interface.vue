<template>
<div class="time-display" style="display: flex; align-items: center; gap: 10px;">
    <p v-if="displayTime()" style="margin: 0;">{{ displayTime() }}</p>
    <button v-if="displayTime()" type="clear" @click="reset">x</button>
</div>
	<form class="time-form">
        <input v-model="selectedDays" type="number" id="days" name="days" min="0" required><label for="days">Days</label>

        <input v-model="selectedHours" type="number" id="hrs" name="hrs" min="0" max="24" required>
       <label for="hrs">Hrs</label>

        <input v-model="selectedMinutes" type="number" id="mins" name="mins" min="0" max="60" required>
        <label for="mins">Mins</label>

        <button type="submit" @click="addTime">Add</button>
    </form>
</template>

<script>
export default {
	props: {
		value: {
			type: Array,
			default: ["0"],
		}
	},
  data() {
    return {
      selectedMinutes: null,
      selectedHours: null,
      selectedDays: null,
	  draggedTile: null,
	  localHoursArray: [],
    };
  },
  emits: ['input'],
  methods: {
	handleChange(value, index) {
		if (index == 0) {
			this.selectedMinutes = value;
		} else if (index == 1) {
			this.selectedHours = value;
		} else if (index == 2) {
			this.selectedDays = value;
		}
	},
	displayTime() {
		// loads, calculates and renders values when a save is loaded
		if (this.localHoursArray.length == 0 && this.$props.value != null) {
			this.localHoursArray = []; 
			Object.values(this.$props.value).forEach(element => {
				this.localHoursArray.push(element);
			})
			this.localHoursArray.sort((a,b) => a - b); 
		}

		var returnTimeString = "";
			for (var i = 0; i < this.localHoursArray.length; i++) { // Loops over times and converts them to updated format
				if (i == this.localHoursArray.length - 1 && this.localHoursArray.length > 1) { // Adds "to" between 2nd and 3rd time
					returnTimeString += " to ";
				} else if (this.localHoursArray.length > 2 && i != 0) {
					returnTimeString += ", "; // Adds ", " between 1st and 2nd time
				}
				
				returnTimeString += convertTime(this.localHoursArray[i]); // Converts time to updated format
			}
		return returnTimeString;
		
	},
	calculateTime() {
		var totalTime = 0;
		if (this.selectedMinutes != null) {
			totalTime += parseFloat(this.selectedMinutes) / 60;
		}
		if (this.selectedHours != null) {
			totalTime += parseFloat(this.selectedHours);
		}
		if (this.selectedDays != null) {
			totalTime += parseFloat(this.selectedDays) * 24;
		}
		if (totalTime == 0) {
			return "0";
		}
		this.localHoursArray.push(totalTime);
		this.localHoursArray.sort((a,b) => a - b); 
		return totalTime;
		
	},
	addTime() {
        this.calculateTime();
		var json = { ...this.localHoursArray };
		this.$emit('input', this.localHoursArray);
        this.clearSelections();
		
    },
	clearSelections() {
		this.selectedMinutes = null;
		this.selectedHours = null;
		this.selectedDays = null;
	},
	reset() {
		this.clearSelections();
		this.localHoursArray = [0];
		this.$emit('input', null);
		this.localHoursArray = [];
	}
  },
};

function convertTime(timeToConvert) {
	var returnString = "";
	var dayFlag = false;
	// Days
	if (timeToConvert >= 48) {
		dayFlag = true;
		returnString = Math.floor(timeToConvert/24) + " days";
		timeToConvert = timeToConvert % 24; // add .floor() if minutes arent wanted WITH DAYS
		if (timeToConvert > 0) { // Adds space if days AND hours
			returnString += " ";
		}
	} else if (timeToConvert >= 24) {
		dayFlag = true;
		returnString = Math.floor(timeToConvert/24) + " day";
		timeToConvert = Math.floor(timeToConvert % 24);
		if (timeToConvert > 0) {
			returnString += " ";
		}
	} // to display days and no hours, change below if to else if
	if (timeToConvert > 0 || dayFlag) {
		// Hours
		var hourFlag = false;
		if (timeToConvert >= 1 && timeToConvert < 2) {
			returnString += Math.floor(timeToConvert) + " h";
			hourFlag = true;
		} else if (timeToConvert >= 2) {
			returnString += Math.floor(timeToConvert) + " hrs";
			hourFlag = true;
		}

		// Minutes
		var mins = (timeToConvert - Math.floor(timeToConvert)) * 60;
		if (mins == 1) {
			if (hourFlag) {
				returnString += " ";
			}
			returnString += Math.round(mins) + " min";
		} else if (mins > 1) {
			if (hourFlag) {
				returnString += " ";
			}
			returnString += Math.round(mins) + " mins";
		}
	} else {
		// catch all if negative input 
		returnString = "Negative Input";
	}
	return returnString;
}
</script>

<style>
.time-form {
			flex-direction: row;
			display: flex;
            align-items: center;
         /*padding: 10px;*/
        }
        .time-form input[type="number"] {
            width: 40px;
          text-align: right;
        }
        .time-form label {
            margin-left: 2px;
            margin-right: 10px;
        }
        .time-form button[type="submit"] {
            background-color: green;
            color: white;
            padding: 8px 12px;
            border: none;
            cursor: pointer;
            border-radius: 6px;
        }
        .time-form button[type="submit"]:hover {
            background-color: darkgreen;
        }
		.time-display button[type="clear"] {
			background-color: #21262e;
			color: white;
			border: none;
			cursor: pointer;
			border-radius: 50%;
			width: 37px;
			height: 37px;
		}
		.time-display button[type="clear"]:hover {
			background-color: #30363d;
		}
</style>