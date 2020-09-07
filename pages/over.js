//        -        -        -        R E A C T ' S   I M P O R T S        -        -        -
import React from 'react';
// import axios from 'axios';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import Modal from 'react-modal';

//        -        -        -        L O C A L   I M P O R T S        -        -        -
import Layout from '../components/Layout';

//        -        -        -        E X P O R T   I N D E X        -        -        -

export default function Index({ locations }) {
	return (
		<Layout title="Green City Oasis || Startpagina" description="U bent op de startpagina">
			<article className="over">
				<h2>De persoon achter de website.</h2>
				<section>
					<p>
						Hey daar! Ik hoop dat je al genoten hebt van Green City Oasis. Mijn naam is Hannelore
						Lamotte, studente Full Stack Developer, katten liefhebber en te perfectionistisch voor
						haar eigen goed. Ik heb deze website leven ingeblazen voor mijn eindwerk als Full Stack
						Developer, maar het is evengoed een passieproject om de goed, en wat minder goed,
						verborgen pareltjes van Leuven in kaart te brengen. Er is al veel verwezenlijkt, maar er
						is ook nog veel werk aan de winkel. Deze website is zoals de natuur die het omschrijft, ze
						is nooit klaar met groeien en bloeien. Bedankt om een kijkje te nemen in het groene hart
						van Leuven!
					</p>
					<img src="/images/me.png" alt="artistieke illustratie van de creator" />
				</section>
			</article>
		</Layout>
	); //     end of return
} //     end of export
