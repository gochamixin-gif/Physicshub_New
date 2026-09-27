// ============================================================
// СОСТОЯНИЕ ПРИЛОЖЕНИЯ
// ============================================================

export const state = {
    view: 'hero',          // 'hero' | 'results' | 'article'
    query: '',
    currentArticleId: null
};

export function setView(view) {
    state.view = view;
}

export function setQuery(query) {
    state.query = query;
}

export function setArticle(id) {
    state.currentArticleId = id;
}