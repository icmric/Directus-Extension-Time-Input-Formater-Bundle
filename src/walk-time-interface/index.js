import InterfaceComponent from './interface.vue';

export default {
	id: 'timeInputInterface',
	name: 'Time Input Interface',
	icon: 'more_time',
	description: 'Input fields for time in days, hours, and minutes, displays formated times in a human readable way. Times are passed back in hours as a JSON',
	component: InterfaceComponent,
	options: null,
	types: ['json'],
};
