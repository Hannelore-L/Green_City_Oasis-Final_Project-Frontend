//        -        -        -        R E A C T ' S   I M P O R T S        -        -        -
import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Modal from 'react-modal';

//        -        -        -        L O C A L   I M P O R T S        -        -        -
import Layout from '../components/Layout';
import { slugify } from '../helper';

Modal.setAppElement('#__next');

//        -        -        -        E X P O R T   I N D E X        -        -        -

export default function Index({ locations }) {
	// console.log(locations);
	return (
		<Layout title="Green City Oasis || Startpagina" description="U bent op de startpagina">
			<section id="home_message">
				<article>
					<h2>Welkom op Green City Oasis!</h2>
					<p>
						Green City Oasis, dé place to be als je een groen stukje rust, sport of plezier zoekt in
						het hartje van Leuven. De stad lijkt soms een betonnen wildernis en daarom wil Green City
						Oasis het tegendeel bewijzen door Leuven’s groene wonderen voor U op te lijsten!
					</p>
				</article>
			</section>
			<section className="location_cards">
				<h3>Spotlight!</h3>
				<p>De meest recent toegevoegde locaties!</p>
				<div className="grid_container">
					{locations &&
						locations.slice(0, 6).map((location) => (
							<article>
								<Link
									href={`/locatie/[id]/[name]?id=${location.id},name=${slugify(
										location.name
									)}`}
									as={`/locatie/${location.id}/${slugify(location.name)}`}
								>
									<a key={location.id}>
										<p>{location.name}</p>
										<p className="card_imgs">
											{location['images'] && location['images'][0] ? (
												<img
													src={`http://wdev.be/wdev_hannelore/eindwerk/system/image.php/green-city-oasis-${slugify(
														location.name
													)}-${
														location['images'][0].id
													}.jpg?width=400&height=400&cropratio=1:1&image=/wdev_hannelore/eindwerk/system/images/${
														location['images'][0].fileName
													}`}
													alt={`Foto van ${location.name}`}
												/>
											) : (
												<img
													src={`/images/logo_placeholder_1_1.jpg`}
													alt={`placeholder`}
												/>
											)}
										</p>
									</a>
								</Link>
								<Link href={`/`} as={`/`}>
									<a className="modal">Toon op de kaart</a>
								</Link>
							</article>
						))}
				</div>
			</section>

			<Modal isOpen={false}>
				<div>in the modal</div>
			</Modal>
		</Layout>
	); //     end of return
} //     end of export

//        -        -        -        S E R V E R   S I D E   P R O P S        -        -        -
export const getServerSideProps = async () => {
	const result = await axios.get(
		'https://wdev.be/wdev_hannelore/eindwerk/api/locations?isDeleted=false&order%5BcreatedAt%5D=desc'
	);
	return {
		props: {
			locations: result.data['hydra:member'],
		},
	}; //     end of return
}; // end of GetStaticProps
