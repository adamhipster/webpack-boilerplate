function log ( ) {
	if ( process.env.NODE_ENV == 'development' || window.location.href.indexOf( '?debug' ) != -1 ) {
		for (let i = 0; i < arguments.length; i++) {
			console.log( arguments[i] )
		}
	}
}

export default log