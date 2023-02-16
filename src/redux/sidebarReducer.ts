const initialState = {
  listNav: [
    {to: 'search', text: 'Поиск', key: 1},
    {to: 'featuredQueries', text: 'Избранное', key: 2},
  ],
}

const sidebarReducer = (state = initialState) => {
  return state
}

export default sidebarReducer
