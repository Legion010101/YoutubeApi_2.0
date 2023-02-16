const initialState = {
  listNav: [
    {to: 'YoutubeApi_2.0/search', text: 'Поиск', key: 1},
    {to: 'YoutubeApi_2.0/featuredQueries', text: 'Избранное', key: 2},
  ],
}

const sidebarReducer = (state = initialState) => {
  return state
}

export default sidebarReducer
