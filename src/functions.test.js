import functions from './functions';
import { createMemoryHistory } from 'history'

const redirectIfLoggedIn = functions.authFunctions.redirectIfLoggedIn;

const props = jest.spyOn(history, 'push');

test('should allow access', () => {
    expect(redirectIfLoggedIn(props, true)).toBe(true)
})