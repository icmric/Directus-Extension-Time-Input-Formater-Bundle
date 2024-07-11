import DisplayComponent from './display.vue';

export default {
	id: 'formatHoursDisplay',
	name: 'Format Hours Display',
	icon: 'schedule',
	description: 'Converts a given Array JSON, or Comma-seperated string of hours into days, hours, and minutes which is displayed.',
	component: DisplayComponent,
	options: null,
	types: ['array', 'json'],
};
