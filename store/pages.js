

function defaultPage(id) {
	const page = {
		id,
		name: `صفحه ${id}`,
		text: 'متن صفحه',
		style: {
			background: 'white',
			font_size: '3cm'
		}
	}
	return page;
}

//------------------------------------------------------------------//


export const state = () => ({
	pages: [],
	selectedId: 0,
	setting: {
		width: '25cm',
		flex: '0 0 25cm',
		height: '10cm',
		fontSize: '14px',
	},
	backgroundImage: [
		'white',
		'dot',
		'line',
		'squre',
	]
});
export const getters = {
	getpages: (state) => state.pages,
	getLength: (state) => state.pages.length,
	getLastPage: (state) => {
		const lastItem = state.pages.slice(state.pages.length - 1)[0];
		const id = lastItem ? lastItem.id : 0;
		return id;
	},
	getSelectedPage: (state) => state.pages.find(p => p.id === state.selectedId),
	getSetting: (state) => state.setting,
	getBackgroundImage: (state) => state.backgroundImage
};
export const mutations = {
	createPage(state, page) {
		state.pages.push(page);
	},
	changeSelected(state, id) {
		state.selectedId = id;
	},
	updateBI(state, backgroundImage) {
		const findIndex=state.pages.findIndex(p => p.id === state.selectedId);
		let newPages={...state.pages};
		newPages[findIndex].style.background = backgroundImage;
	},
	updateText(state, text) {
		const findIndex=state.pages.findIndex(p => p.id === state.selectedId);
		let newPages={...state.pages};
		newPages[findIndex].text = text;
	}
}
export const actions = {
	createPage({ commit, getters }) {
		const id = getters['getLastPage'] + 1;
		commit('createPage', defaultPage(id));
		commit('changeSelected', id);
		return id;
	},
}