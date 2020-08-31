//        -        -        -        R E A C T ' S   I M P O R T S        -        -        -
import { parseCookies, destroyCookie } from 'nookies';
import Router from 'next/router';

//        -        -        -        E X P O R T   S L U G I F Y        -        -        -
export const slugify = function (text) {
	const from = 'ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;';
	const to = 'aaaaaeeeeeiiiiooooouuuunc------';

	const newText = text.split('').map((letter, i) => letter.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i)));

	return newText
		.toString() // Cast to string
		.toLowerCase() // Convert the string to lowercase letters
		.trim() // Remove whitespace from both sides of a string
		.replace(/\s+/g, '-') // Replace spaces with -
		.replace(/&/g, '-y-') // Replace & with 'and'
		.replace(/[^\w\-]+/g, '') // Remove all non-word chars
		.replace(/\-\-+/g, '-'); // Replace multiple - with single -
};

//        -        -        -        E X P O R T   I S   N O T   A U T H E N T I C A T E D        -        -        -
export const isNotAuthenticated = (ctx, url) => {
	const cookies = parseCookies(ctx);

	if (typeof cookies.jwtToken === 'undefined') {
		ctx.res.statusCode = 302;
		ctx.res.setHeader('Location', url);
	}
};

//        -        -        -        E X P O R T   I S   A U T H E N T I C A T E D        -        -        -
export const isAuthenticated = (ctx, url) => {
	const cookies = parseCookies(ctx);

	if (typeof cookies.jwtToken !== 'undefined') {
		ctx.res.statusCode = 302;
		ctx.res.setHeader('Location', url);
	}
};

//        -        -        -        E X P O R T   L O G O U T        -        -        -
export const logout = () => {
	destroyCookie(null, 'jwtToken');
	Router.push('/');
};
