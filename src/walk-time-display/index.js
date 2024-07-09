import DisplayComponent from './display.vue';

export default {
	id: 'walk-time-display',
	name: 'Display walk times',
	icon: 'schedule',
	description: 'Converts a given Array or JSON of hours into days, hours, and minutes which is displayed.',
	component: DisplayComponent,
	options: null,
	types: ['array', 'json'],
};
