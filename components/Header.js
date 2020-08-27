//        -        -        -        R E A C T ' S   I M P O R T S        -        -        -
import React from 'react';

//        -        -        -        L O C A L   I M P O R T S        -        -        -
import Menu from './Menu';

//        -        -        -        E X P O R T   H E A D E R        -        -        -
export default function Header() {
	return (
		<header>
			<Menu />
			<a href="/" alt="Ga naar de start pagina" id="logo">
				<img src="/images/logo.png" alt="Website logo" />
			</a>
		</header>
	); //   end of return
} //   end of export default Header
