//        -        -        -        R E A C T ' S   I M P O R T S        -        -        -
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

//        -        -        -        L O C A L   I M P O R T S        -        -        -
import Layout from '../../../components/Layout';
import { slugify } from '../../../helper';

//        -        -        -        E X P O R T   D E T A I L        -        -        -

export default function Detail(props) {
	return (
		<Layout title={`Green City Oasis || ${props.name}`} description={`Dit is de detail pagina van ${props.name}`}>
			<article className="detail">
				<section className="left_side">
					<section className="location_image">
						{props['images'] && props['images'][0] ? (
							<img
								src={`http://wdev.be/wdev_hannelore/eindwerk/system/image.php/green-city-oasis-${slugify(
									props.name
								)}-${
									props['images'][0].id
								}.jpg?width=350&height=350&cropratio=1:1&image=/wdev_hannelore/eindwerk/system/images/${
									props['images'][0].fileName
								}`}
								alt={`Foto van ${props.name}`}
							/>
						) : (
							<img src={`/images/logo_placeholder.jpg`} alt={`placeholder`} />
						)}
					</section>

					<section className="location_info">
						<p className="info">Unieke eigenschap: </p>
						<p>{props.uniqueProperty}</p>

						<p className="info">Adres: </p>
						<p>{props.addressText}</p>

						<p className="info">Tags:</p>
						{props['tags'] &&
							props['tags'].map(({ id, name }) => (
								<p className="tag" key={id}>
									{name}
								</p>
							))}
					</section>
				</section>

				<section className="right_side">
					<section className="location_description">
						<h1>{props.name}</h1>
						<div className="text" dangerouslySetInnerHTML={{ __html: props.description }} />
					</section>
				</section>
			</article>
		</Layout>
	);

	const router = useRouter();
	if (router.isFallback) {
		return <div>Loading...</div>;
	}
}

export async function getStaticPaths() {
	const res = await axios.get(`https://wdev.be/wdev_hannelore/eindwerk/api/locations`);
	return {
		paths: res.data['hydra:member'].map(({ name, id }) => {
			return { params: { name: slugify(name), id: id.toString() } };
		}),
		fallback: true,
	};
}

export async function getStaticProps({ params }) {
	const res = await axios.get(`https://wdev.be/wdev_hannelore/eindwerk/api/locations/${params.id}`);

	return {
		props: res.data,
	};
}
