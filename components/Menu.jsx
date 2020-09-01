//        -        -        -        R E A C T ' S   I M P O R T S        -        -        -
import React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { parseCookies } from 'nookies';

//        -        -        -        L O C A L   I M P O R T S        -        -        -
import { logout } from '../helper';

//        -        -        -        E X P O R T   M E N U        -        -        -
export default function Menu() {
	const [loggedin, setLoggedin] = useState(false);
	useEffect(() => {
		const cookies = parseCookies();
		typeof cookies.jwtToken !== 'undefined' ? setLoggedin(true) : setLoggedin(false);
	});

	return (
		<>
			<nav className="nav">
				<ul>
					<li>
						<Link href="/">
							<a title="Ga naar de start pagina" id="gco">
								Green City Oasis
							</a>
						</Link>
					</li>

					<li>
						<Link href="/">
							<a title="Ga naar de start pagina">Home</a>
						</Link>
					</li>

					<li>
						<Link href="/zoeken">
							<a href="/zoeken" title="Ga naar de zoek pagina">
								Alle locaties
							</a>
						</Link>
					</li>

					<li>
						<Link href="/over-ons">
							<a title="Ga naar de over ons pagina">Over ons</a>
						</Link>
					</li>
				</ul>

				<ul className="nav-profile">
					{(loggedin && (
						<>
							<li>
								<Link href="/profile">
									<a title="profiel">Profiel</a>
								</Link>
							</li>
							<li>
								<Link href="/">
									<a onClick={logout}>Afmelden</a>
								</Link>{' '}
							</li>
						</>
					)) || (
						<li className="nav-loggedin">
							<Link href="/gebruiker/inloggen">
								<a title="login">Inloggen</a>
							</Link>
						</li>
					)}
				</ul>
			</nav>
		</>
	);
}
