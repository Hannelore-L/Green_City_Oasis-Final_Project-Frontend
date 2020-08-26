//        -        -        -        R E A C T ' S   I M P O R T S        -        -        -
import React from 'react';

//        -        -        -        L O C A L   I M P O R T S        -        -        -

//        -        -        -        E X P O R T   M E N U        -        -        -
export default function Menu() {
	return (
		<>
			<nav className="nav">
				<ul>
					<li>
						<a href="/" alt="Ga naar de home pagina" id="gco">
							Green City Oasis
						</a>
					</li>

					<li>
						<a href="/" alt="Ga naar de home pagina">
							Home
						</a>
					</li>

					<li>
						<a href="/zoeken" alt="Ga naar de zoek pagina">
							Zoeken
						</a>
					</li>

					<li>
						<a href="/over-ons" alt="Ga naar de over ons pagina">
							Over ons
						</a>
					</li>
				</ul>
			</nav>
		</>
	);
}
