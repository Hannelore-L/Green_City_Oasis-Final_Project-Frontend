//        -        -        -        R E A C T ' S   I M P O R T S        -        -        -
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

//        -        -        -        L O C A L   I M P O R T S        -        -        -
import Layout from '../../../components/Layout';
import { slugify } from '../../../helper';

//        -        -        -        E X P O R T   T A G   L I S T        -        -        -

export default function TagList({ tags, locations, images }) {
	return (
		<Layout
			title={`Green City Oasis || ${tags && tags[0] && tags[0].name}`}
			description={`Dit is de detail pagina van ${tags && tags[0].name}`}
		>
			<section className="location_cards">
				<h3>Locaties met het label "{tags && tags[0].name}"</h3>
				<div className="grid_container">
					{tags &&
						tags[0]['locations'] &&
						tags[0]['locations'].map(
							(tagloc) =>
								locations &&
								locations.map(
									(location) =>
										location &&
										parseInt(tagloc.slice(39), 10) == location.id && (
											<article key={location.id}>
												<Link
													href={`/locatie/[id]/[name]?id=${
														location.id
													},name=${slugify(location.name)}`}
													as={`/locatie/${location.id}/${slugify(
														location.name
													)}`}
												>
													<a key={location.id}>
														<p> {location.name}</p>
														<p className="card_imgs">
															{images &&
															images.find(
																(image) =>
																	image.location ==
																	`/wdev_hannelore/eindwerk/api/locations/${location.id}`
															) ? (
																<img
																	src={`http://wdev.be/wdev_hannelore/eindwerk/system/image.php/green-city-oasis-${slugify(
																		location.name
																	)}-${
																		images.find(
																			(image) =>
																				image.location ==
																				`/wdev_hannelore/eindwerk/api/locations/${location.id}`
																		).id
																	}.jpg?width=200&height=200&cropratio=1:1&image=/wdev_hannelore/eindwerk/system/images/${
																		images.find(
																			(image) =>
																				image.location ==
																				`/wdev_hannelore/eindwerk/api/locations/${location.id}`
																		).fileName
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
											</article>
										)
								)
						)}
				</div>
			</section>
		</Layout>
	);

	const router = useRouter();
	if (router.isFallback) {
		return <div>Loading...</div>;
	}
}

export async function getStaticPaths() {
	const res = await axios.get(`https://wdev.be/wdev_hannelore/eindwerk/api/tags`);
	return {
		paths: res.data['hydra:member'].map(({ name, id }) => {
			return { params: { name: name, id: id.toString() } };
		}),
		fallback: true,
	};
}

export async function getStaticProps({ params }) {
	const resultTags = await axios.get(`https://wdev.be/wdev_hannelore/eindwerk/api/tags?name=${params.name}`);

	const resultLocations = await axios.get(`https://wdev.be/wdev_hannelore/eindwerk/api/locations`);

	const resultImages = await axios.get(`https://wdev.be/wdev_hannelore/eindwerk/api/images`);

	return {
		props: {
			tags: resultTags.data['hydra:member'],
			locations: resultLocations.data['hydra:member'],
			images: resultImages.data['hydra:member'],
		},
	};
}
