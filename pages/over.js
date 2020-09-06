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
	// console.log(locations);
	return (
		<Layout title="Green City Oasis || Startpagina" description="U bent op de startpagina">
			<article className="over">
				<h2>De persoon achter de website.</h2>
				<section>
					<p>
						Dit is text dit is text dit is text dit is text dit is text dit is text dit is text dit is
						text dit is text dit is text dit is text dit is text dit is text dit is text dit is text
						dit is text dit is text dit is text dit is text dit is text dit is text dit is text dit is
						text dit is text dit is text dit is text dit is text dit is text dit is text dit is text
						dit is text dit is text dit is text dit is text dit is text dit is text dit is text dit is
						text dit is text dit is text dit is text dit is text dit is text dit is text dit is text
						dit is text dit is text dit is text dit is text dit is text dit is text dit is text dit is
						text dit is text dit is text dit is text dit is text dit is text dit is text dit is text
						dit is text dit is text dit is text dit is text dit is text dit is text dit is text dit is
						text.
					</p>
					<img src="/images/me.png" alt="artistieke illustratie van de creator" />
				</section>
			</article>
		</Layout>
	); //     end of return
} //     end of export
