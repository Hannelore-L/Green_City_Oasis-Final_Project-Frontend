//        -        -        -        R E A C T ' S   I M P O R T S        -        -        -
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import jwt_decode from 'jwt-decode';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

//        -        -        -        L O C A L   I M P O R T S        -        -        -
import Layout from '../../../components/Layout';
import { slugify } from '../../../helper';

//        -        -        -        E X P O R T   D E T A I L        -        -        -

export default function Detail({ location, tags, images, users }) {
	const [loggedin, setLoggedin] = useState(false);
	// const [error, setError] = useState('');
	const [locationReviews, setLocationReviews] = useState('');
	const [reviews, setReviews] = useState('');

	// const cookies = parseCookies(ctx);
	// const decode = jwt_decode(cookies.jwtToken);
	// const id = decode.id;
	// const userId = `api/users/${id}`;

	useEffect(() => {
		const cookies = parseCookies();
		typeof cookies.jwtToken !== 'undefined' ? setLoggedin(true) : setLoggedin(false);

		axios.get(`https://wdev.be/wdev_hannelore/eindwerk/api/locations/${location.id}`).then((response) => {
			setLocationReviews(response.data['reviews']);
		});

		axios.get(`https://wdev.be/wdev_hannelore/eindwerk/api/reviews`).then((response) => {
			setReviews(response.data['hydra:member']);
		});
	}, []);

	return (
		<Layout
			title={`Green City Oasis || ${location && location.name}`}
			description={`Dit is de detail pagina van ${location && location.name}`}
		>
			<article className="detail">
				<section className="left_side">
					<section className="location_image">
						{images &&
						images.find(
							(image) => image.location == `/wdev_hannelore/eindwerk/api/locations/${location.id}`
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
								}.jpg?width=350&height=350&cropratio=1:1&image=/wdev_hannelore/eindwerk/system/images/${
									images.find(
										(image) =>
											image.location ==
											`/wdev_hannelore/eindwerk/api/locations/${location.id}`
									).fileName
								}`}
								alt={`Foto van ${location.name}`}
							/>
						) : (
							<img src={`/images/logo_placeholder_1_1.jpg`} alt={`placeholder`} />
						)}
					</section>

					<section className="location_info">
						<p className="info">Unieke eigenschap: </p>
						<p>{location.uniqueProperty}</p>

						<p className="info">Adres: </p>
						<p>{location.addressText}</p>

						<p className="info">Tags:</p>
						{tags &&
							tags.map(
								(tag) =>
									tag['locations'] &&
									tag['locations'].map(
										(loc) =>
											parseInt(loc.slice(39), 10) &&
											parseInt(loc.slice(39), 10) == location.id && (
												<Link
													key={tag.id}
													href={`/labels/[id]/[name]?id=${tag.id},name=${tag.name}`}
													as={`/labels/${tag.id}/${tag.name}`}
												>
													<a title="Ga naar een lijst van parken met deze tags">
														<p className="tag" key={tag.id}>
															{tag.name}
														</p>
													</a>
												</Link>
											)
									)
							)}
					</section>
				</section>

				<section className="right_side">
					<section className="location_description">
						<h1>{location.name}</h1>
						<div className="text" dangerouslySetInnerHTML={{ __html: location.description }} />
					</section>

					<section className="location_review">
						<h3>Reviews</h3>
						<section className="read_reviews">
							<ul>
								{(locationReviews && locationReviews.isDeleted) || !locationReviews.length ? (
									<p>
										Deze locatie heeft nog geen reviews. Wees de eerste om je ervaring te
										delen!
									</p>
								) : (
									reviews &&
									reviews.map(
										(review) =>
											locationReviews &&
											locationReviews.map(
												(locrev) =>
													locrev &&
													locrev ==
														`/wdev_hannelore/eindwerk/api/reviews/${review.id}` && (
														<li key={review.id}>
															{users &&
																users.map(
																	(user) =>
																		review.user ==
																			`/wdev_hannelore/eindwerk/api/users/${user.id}` && (
																			<p
																				key={user.id}
																				className="review_user"
																			>
																				{user.displayName}
																				{user.city &&
																				user.city ==
																					'/wdev_hannelore/eindwerk/api/cities/429' ? (
																					<span>
																						Bewoner
																					</span>
																				) : (
																					<span>
																						Bezoeker
																					</span>
																				)}
																			</p>
																		)
																)}
															<p>{review.description}</p>
															<p>
																<span>{review.createdAt}</span>
															</p>
														</li>
													)
											)
									)
								)}
							</ul>
						</section>

						{(!loggedin && (
							<p>
								Wilt U ook Uw menig delen over {location.name}?
								<Link href="/gebruiker/inloggen">
									<a title="Ga naar de inlog pagina"> Log U dan in </a>
								</Link>
								of
								<Link href="/gebruiker/registreren">
									<a title="Ga naar de registreer pagina"> registreer U</a>
								</Link>
								!
							</p>
						)) || (
							<>
								<Formik
									// validation schema
									validationSchema={Yup.object({
										description: Yup.string()
											.required('U moet Hier iets schrijven.')
											.min(2, 'Schrijf meer dan 2 tekens, aub.')
											.max(1000, 'Hou het onder de 1000 tekens, aub'),
									})}
									// initial values
									initialValues={{
										location: `api/locations/${location.id}`,
										// user: `${userId}`,
										user: `api/users/1`,
										rating: 0,
										isDeleted: false,
										description: '',
									}}
									// on submit
									onSubmit={(values) => {
										axios.post(
											'https://wdev.be/wdev_hannelore/eindwerk/api/reviews',
											values
										)
											.then(function (response) {
												console.log(response, 'Bedankt voor Uw review!');
												window.location = `/locatie/${location.id}/${slugify(
													location.name
												)}`;
											})
											.catch(function (error) {
												console.log('Onze excuses, Er is iets misgelopen.');
											});
									}}
								>
									{({ isSubmitting }) => (
										<Form>
											<fieldset>
												<legend>
													Schrijf je eigen review. Deel je mening, ervaring en
													herinneringen!
												</legend>
												<ul>
													<li>
														<Field
															name="description"
															type="text"
															placeholder="Wat wil jij delen?"
															component="textarea"
														></Field>
														<ErrorMessage
															name="description"
															component="p"
															className="error"
														></ErrorMessage>
													</li>

													<button
														type="submit"
														id="submit_button"
														disabled={isSubmitting}
													>
														Deel!
													</button>
												</ul>
											</fieldset>
										</Form>
									)}
								</Formik>
							</>
						)}
						<section></section>
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
	const resultLocation = await axios.get(`https://wdev.be/wdev_hannelore/eindwerk/api/locations/${params.id}`);

	const resultTags = await axios.get(`https://wdev.be/wdev_hannelore/eindwerk/api/tags`);

	const resultImages = await axios.get(`https://wdev.be/wdev_hannelore/eindwerk/api/images`);

	const resultUsers = await axios.get(`https://wdev.be/wdev_hannelore/eindwerk/api/users`);

	return {
		props: {
			location: resultLocation.data,
			tags: resultTags.data['hydra:member'],
			images: resultImages.data['hydra:member'],
			users: resultUsers.data['hydra:member'],
		},
	};
}
