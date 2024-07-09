import InterfaceComponent from './interface.vue';

export default {
	id: 'walkTimeInterface',
	name: 'Walk Time Interface',
	icon: 'box',
	description: 'Input mins, hours, days, Outputs times in human readable format, returns Array with all times in hours',
	component: InterfaceComponent,
	options: null,
	types: ['json'],
};
