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
			<nav className="main_nav">
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
						<Link href="/over">
							<a title="Ga naar de pagina over de maker van deze website">Over</a>
						</Link>
					</li>
				</ul>
			</nav>

			<nav className="user_nav">
				{(loggedin && (
					<div className="dropdown">
						<div className="fas fa-user"></div>

						<ul>
							<li>
								<Link href="/gebruiker/profiel">
									<a title="Ga naar je profiel pagina">Profiel</a>
								</Link>
							</li>
							<li>
								<Link href="/">
									<a onClick={logout}>Afmelden</a>
								</Link>
							</li>
						</ul>
					</div>
				)) || (
					<div className="dropdown">
						<div className="fas fa-bars"></div>

						<ul>
							<li>
								<Link href="/gebruiker/inloggen">
									<a title="Ga naar de login pagina">Inloggen</a>
								</Link>
							</li>

							<li>
								<Link href="/gebruiker/registreren">
									<a title="Ga naar de registratie pagina">Registreren</a>
								</Link>
							</li>
						</ul>
					</div>
				)}
			</nav>
		</>
	);
}
