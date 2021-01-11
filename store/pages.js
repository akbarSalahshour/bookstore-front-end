

function defaultPage(id) {
	const page = {
		id,
		name: `صفحه ${id}`,
		text: 'متن صفحه',
		style: {
			background: 'white',
			fontSize: '3cm'
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
		'bg-white',
		'bg-dot',
		'bg-line',
		'bg-squre',
	]
});
export const getters = {
	getpages: (state) => state.pages,
	getLastPage: (state) => {
		const lastItem = state.pages.slice(state.pages.length - 1)[0];
		const id = lastItem ? lastItem.id : 0;
		return id;
	},
	getSelectedPage: (state) => state.pages.find(p => p.id === state.selectedId),
	getSelectId: (state) => state.selectedId,
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
	updatePages(state, itemUpdate) {
		const findIndex = state.pages.findIndex(p => p.id === state.selectedId);
		let newPages = { ...state.pages };
		if (itemUpdate.subKey)
			newPages[findIndex][itemUpdate.key][itemUpdate.subKey] = itemUpdate.value;
		else
			newPages[findIndex][itemUpdate.key] = itemUpdate.value;
	},
}
export const actions = {
	createPage({ commit, getters }) {
		const id = getters['getLastPage'] + 1;
		commit('createPage', defaultPage(id));
		commit('changeSelected', id);
	},
}