export const FILTERS = ['all', 'open', 'done'];

export const initialState = {
  issues: [],
  filter: 'all',
  nextId: 1,
};

// Pure and immutable: no mutation, no side effects, always returns a state object.
export function issueReducer(state, action) {
  switch (action.type) {
    case 'ADD_ISSUE': {
      const title = (action.payload?.title ?? '').trim();
      if (!title) return state; // ignore empty titles
      return {
        ...state,
        issues: [...state.issues, { id: state.nextId, title, done: false }],
        nextId: state.nextId + 1,
      };
    }
    case 'TOGGLE_ISSUE':
      return {
        ...state,
        issues: state.issues.map((issue) =>
          issue.id === action.payload.id ? { ...issue, done: !issue.done } : issue
        ),
      };
    case 'DELETE_ISSUE':
      return { ...state, issues: state.issues.filter((issue) => issue.id !== action.payload.id) };
    case 'SET_FILTER':
      if (!FILTERS.includes(action.payload.filter)) return state;
      return { ...state, filter: action.payload.filter };
    case 'CLEAR_DONE':
      return { ...state, issues: state.issues.filter((issue) => !issue.done) };
    default:
      return state; // unknown actions keep the existing state (never undefined)
  }
}

export function getVisibleIssues(state) {
  if (state.filter === 'open') return state.issues.filter((i) => !i.done);
  if (state.filter === 'done') return state.issues.filter((i) => i.done);
  return state.issues;
}

export function getCounts(state) {
  const done = state.issues.filter((i) => i.done).length;
  return { all: state.issues.length, open: state.issues.length - done, done };
}
