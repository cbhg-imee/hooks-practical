import { describe, it, expect } from 'vitest';
import { issueReducer, initialState } from './reducer.js';

function deepFreeze(obj) {
  Object.values(obj).forEach((v) => typeof v === 'object' && v !== null && deepFreeze(v));
  return Object.freeze(obj);
}

describe('issueReducer', () => {
  it('ADD_ISSUE appends a new open issue and increments nextId without mutating', () => {
    const before = deepFreeze({ ...initialState });
    const after = issueReducer(before, { type: 'ADD_ISSUE', payload: { title: '  Fix login  ' } });
    expect(after.issues).toEqual([{ id: 1, title: 'Fix login', done: false }]);
    expect(after.nextId).toBe(2);
    expect(before.issues).toHaveLength(0);
  });

  it('TOGGLE_ISSUE flips only the matching issue and creates a new issue object', () => {
    const before = deepFreeze({
      issues: [
        { id: 1, title: 'A', done: false },
        { id: 2, title: 'B', done: false },
      ],
      filter: 'all',
      nextId: 3,
    });
    const after = issueReducer(before, { type: 'TOGGLE_ISSUE', payload: { id: 2 } });
    expect(after.issues[1].done).toBe(true);
    expect(after.issues[0]).toBe(before.issues[0]);
    expect(after.issues[1]).not.toBe(before.issues[1]);
  });

  it('CLEAR_DONE removes completed issues and keeps open ones', () => {
    const before = deepFreeze({
      issues: [
        { id: 1, title: 'A', done: true },
        { id: 2, title: 'B', done: false },
      ],
      filter: 'all',
      nextId: 3,
    });
    const after = issueReducer(before, { type: 'CLEAR_DONE' });
    expect(after.issues).toEqual([{ id: 2, title: 'B', done: false }]);
  });

  it('returns the same state for unknown actions', () => {
    expect(issueReducer(initialState, { type: 'NOPE' })).toBe(initialState);
  });
});
