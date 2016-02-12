/**
 * External dependencies
 */
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';

/**
 * Internal dependencies
 */
import application from './application/reducer';
import notices from './notices/reducer';
import posts from './posts/reducer';
import plugins from './plugins/reducer';
import sharing from './sharing/reducer';
import sites from './sites/reducer';
import siteSettings from './site-settings/reducer';
import support from './support/reducer';
import themes from './themes/reducer';
import users from './users/reducer';
import currentUser from './current-user/reducer';
import ui from './ui/reducer';
import connectionMiddleware from './connectionMiddleware/middleware';
import connectionMiddlewareReducer from './connectionMiddleware/reducer';

/**
 * Module variables
 */
export const reducer = combineReducers( {
	plugins,
	application,
	notices,
	posts,
	sharing,
	sites,
	siteSettings,
	support,
	themes,
	users,
	currentUser,
	ui,
	connectionMiddleware: connectionMiddlewareReducer
} );

let middleware = [ thunkMiddleware ];

// Analytics middleware currently only works in the browser
if ( typeof window === 'object' ) {
	middleware = [
		...middleware,
		require( './themes/middlewares.js' ).analyticsMiddleware
	];
}

middleware.push( connectionMiddleware );
let createStoreWithMiddleware = applyMiddleware.apply( null, middleware );

export function createReduxStore( initialState = {} ) {
	if (
		typeof window === 'object' &&
		window.app &&
		window.app.isDebug &&
		window.devToolsExtension
	) {
		createStoreWithMiddleware = compose( createStoreWithMiddleware, window.devToolsExtension() );
	}
	return createStoreWithMiddleware( createStore )( reducer, initialState );
}
