//        -        -        -        R E A C T ' S   I M P O R T S        -        -        -
import React from 'react';
import axios from 'axios';
// pages/posts/[id].js
import { useRouter } from 'next/router';

//        -        -        -        L O C A L   I M P O R T S        -        -        -
import Layout from '../../../components/Layout';
import { slugify } from '../../../helper';

//        -        -        -        E X P O R T   D E T A I L        -        -        -

function Detail(props) {
	return (
		<Layout title={`Green City Oasis || ${props.name}`} description={`Dit is de detail pagina van ${props.name}`}>
			<article className="detail">
				<section className="left_side">
					<section className="location_image"></section>

					<section className="location_info">
						<p>
							Unieke eigenschap: <span>{props.uniqueProperty}</span>
						</p>
						<p>
							Adres: <span>{props.addressText}</span>
						</p>
						<p>
							<span>Tags:</span>
							{props['tags'].map(({ id, name }) => (
								<span key={id}>{name}</span>
							))}
						</p>
					</section>
				</section>

				<section className="right_side">
					<section className="location_description">
						<h1>{props.name}</h1>
						<div dangerouslySetInnerHTML={{ __html: props.description }} />
					</section>
				</section>
			</article>
		</Layout>
	);

	const router = useRouter();
	// If the page is not yet generated, this will be displayed
	// initially until getStaticProps() finishes running
	if (router.isFallback) {
		return <div>Loading...</div>;
	}
	// Render post...
}

// This function gets called at build time
export async function getStaticPaths() {
	const res = await axios.get(`https://wdev.be/wdev_hannelore/eindwerk/api/locations`);
	return {
		paths: res.data['hydra:member'].map(({ name, id }) => {
			return { params: { name: slugify(name), id: id.toString() } };
		}),
		// Only `/posts/1` and `/posts/2` are generated at build time

		// Enable statically generating additional pages
		// For example: `/posts/3`
		fallback: true,
	};
}

// This also gets called at build time
export async function getStaticProps({ params }) {
	// params contains the post `id`.
	// If the route is like /posts/1, then params.id is 1
	const res = await axios.get(`https://wdev.be/wdev_hannelore/eindwerk/api/locations/${params.id}`);

	// Pass post data to the page via props
	return {
		props: res.data,
		// Re-generate the post at most once per second
		// if a request comes in
		// revalidate: 1,
	};
}

export default Detail;