

function defaultLayer(id) {
	const layer = {
		id,
		name: `لایه ${id}`,
		type: 'text',
		value: 'لایه جدید',
		style: [
			{
				name: 'width',
				value: 5,
				unit: 'cm'
			},
			{
				name: 'flex',
				value: '0 0 11cm'
			},
			{
				name: 'height',
				value: 1,
				unit: 'cm'
			},
			{
				name: 'top',
				value: 0,
				unit: 'px'
			},
			{
				name: 'left',
				value: 0,
				unit: 'px'
			},
			{
				name: 'fontSize',
				value: 16,
				unit: 'px'
			},
			{
				name: 'textAlign',
				value: 'center'
			},
			{
				name: 'fontWeight',
				value: 'normal'
			},
			{
				name: 'borderRadius',
				value: 3,
				unit: 'px'
			},
			{
				name: 'color',
				value: '#000000'
			},
			{
				name: 'backgroundImage',
				value: ''
			},
			{
				name: 'backgroundSize',
				value: '100% 100%'
			},
			{
				name: 'backgroundColor',
				value: '#ffffff'
			},
			{
				name: 'zIndex',
				value: id
			},
		]
	}
	return layer;
}

//------------------------------------------------------------------//


export const state = () => ({
	layers: [],
	selectedId: 0,
	setting: {
		id: 0,
		style: [
			{
				name: 'width',
				value: 11,
				unit: 'cm'
			},
			{
				name: 'flex',
				value: '0 0 11cm'
			},
			{
				name: 'height',
				value: 14,
				unit: 'cm'
			},
			{
				name: 'backgroundImage',
				value: ''
			},
			{
				name: 'backgroundColor',
				value: '#ffffff'
			},
			{
				name: 'backgroundSize',
				value: '100% 100%'
			},
		]
	},
	fontWeightes: [
		{
			value: 'lighter',
			text: 'خیلی باریک'
		},
		{
			value: 'light',
			text: 'باریک'
		},
		{
			value: 'normal',
			text: 'معمولی'
		},
		{
			value: 'bold',
			text: 'ضخیم'
		},
		{
			value: 'bolder',
			text: 'خیلی ضخیم'
		},
	],
	textAlignes: [
		{
			value: 'right',
			text: 'راست'
		},
		{
			value: 'center',
			text: 'وسط'
		},
		{
			value: 'left',
			text: 'چپ'
		},
	]
});
export const getters = {
	getlayers: (state) => state.layers,
	getLastLayer: (state) => {
		const lastItem = state.layers.slice(state.layers.length - 1)[0];
		const id = lastItem ? lastItem.id : 0;
		return id;
	},
	getSelectedLayer: (state) => {
		if (state.selectedId == 0)
			return state.setting;
		else
			return state.layers.find(p => p.id === state.selectedId)
	},
	getSelectId: (state) => state.selectedId,
	getSetting: (state) => state.setting,
	getFontWeightes: (state) => state.fontWeightes,
	getTextAlignes: (state) => state.textAlignes,
};
export const mutations = {
	createLayer(state, layer) {
		state.layers.push(layer);
	},
	changeSelected(state, id) {
		state.selectedId = id;
	},
	updateLayers(state, itemUpdate) {
		if (state.selectedId > 0) {
			const findIndex = state.layers.findIndex(p => p.id === state.selectedId);
			let newLayers = { ...state.layers };
			itemUpdate.map(item => {
				if (item.subKey) {
					const findIndexStyle = newLayers[findIndex][item.key].findIndex(p => p.name === item.subKey);
					newLayers[findIndex][item.key][findIndexStyle].value = item.value;
				}
				else
					newLayers[findIndex][item.key] = item.value;
			})
		} else {
			let newSetting = { ...state.setting };
			itemUpdate.map(item => {
				if (item.subKey) {
					const findIndexStyle = newSetting['style'].findIndex(p => p.name === item.subKey);
					newSetting['style'][findIndexStyle].value = item.value;
				}
			});
		}
	},
	deleteLayer(state, id) {
		const layerIndex = state.layers.findIndex(item => item.id == id);
		state.layers.splice(layerIndex, 1);
	}
}
export const actions = {
	createLayer({ commit, getters }) {
		const id = getters['getLastLayer'] + 1;
		commit('createLayer', defaultLayer(id));
		commit('changeSelected', id);
	},
}