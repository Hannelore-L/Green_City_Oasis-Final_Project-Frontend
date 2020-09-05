//        -        -        -        R E A C T ' S   I M P O R T S        -        -        -
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

//        -        -        -        L O C A L   I M P O R T S        -        -        -
import Layout from '../../../components/Layout';
import { slugify } from '../../../helper';

//        -        -        -        E X P O R T   T A G   L I S T        -        -        -

export default function TagList({ tags }) {
	console.log(tags);
	return (
		<Layout title={`Green City Oasis || ${tags.name}`} description={`Dit is de detail pagina van ${tags.name}`}>
			<section className="location_cards">
				<h3>Locaties met het label "{tags[0].name}"</h3>
				<div className="grid_container">
					{tags[0]['locations'] &&
						tags[0]['locations'].map((location) => (
							<article>
								<Link
									href={`/locatie/[id]/[name]?id=${location.id},name=${slugify(
										location.name
									)}`}
									as={`/locatie/${location.id}/${slugify(location.name)}`}
								>
									<a key={location.id}>
										<p> {location.name}</p>
										<p className="card_imgs">
											{location['images'] && location['images'][0] ? (
												<img
													src={`http://wdev.be/wdev_hannelore/eindwerk/system/image.php/green-city-oasis-${slugify(
														location.name
													)}-${
														location['images'][0].id
													}.jpg?width=200&height=200&cropratio=1:1&image=/wdev_hannelore/eindwerk/system/images/${
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
							</article>
						))}
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
	const tagResults = await axios.get(`https://wdev.be/wdev_hannelore/eindwerk/api/tags?name=${params.name}`);

	return {
		props: {
			tags: tagResults.data['hydra:member'],
		},
	};
}
