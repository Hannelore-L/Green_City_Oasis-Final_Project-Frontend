//        -        -        -        R E A C T ' S   I M P O R T S        -        -        -
import React from 'react';
import Link from 'next/link';

//        -        -        -        L O C A L   I M P O R T S        -        -        -

//        -        -        -        E X P O R T   M E N U        -        -        -
export default function Menu() {
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
								Zoeken
							</a>
						</Link>
					</li>

					<li>
						<Link href="/over-ons">
							<a title="Ga naar de over ons pagina">Over ons</a>
						</Link>
					</li>
				</ul>
			</nav>
		</>
	);
}
