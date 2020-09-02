//        -        -        -        R E A C T ' S   I M P O R T S        -        -        -
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { setCookie } from 'nookies';
import Link from 'next/link';
import jwt_decode from 'jwt-decode';

//        -        -        -        L O C A L   I M P O R T S        -        -        -
import Layout from '../../components/Layout';
import { isAuthenticated } from '../../helper';

//        -        -        -        E X P O R T   I N L O G G E N        -        -        -
export default () => {
	return (
		<>
			<Layout title="Green City Oasis || Inloggen" description="U bent op de inlog pagina">
				<section className="form ">
					<aside></aside>
					<article>
						<Formik
							// validation schema
							validationSchema={Yup.object({
								email: Yup.string()
									.email('Geef een geldig e-mailadres in, aub.')
									.required('U moet Uw e-mailadres opgeven'),

								password: Yup.string().required('U moet uw wachtwoord opgeven'),
							})}
							// initial values
							initialValues={{ email: '', password: '' }}
							// on submit
							onSubmit={(values) => {
								axios.post('https://wdev.be/wdev_hannelore/eindwerk/api/login', values)
									.then(function (response) {
										const jwtToken = response.data.token;
										const jwtDecoded = jwt_decode(jwtToken);
										setCookie(null, 'jwtToken', jwtToken, {
											maxAge: 60 * 60,
											path: '/',
										});
										window.location = '/';
									})
									.catch(function (error) {
										console.log(
											error,
											'Er is iets misgelopen. Kijk na of Uw e-mailadres en wachtwoord kloppen, aub.'
										);

										// setError(
										// 	'Er is iets misgelopen. Kijk na of Uw e-mailadres en wachtwoord kloppen, aub.'
										// );
									});
							}}
						>
							{({ isSubmitting }) => (
								<Form>
									<fieldset>
										<legend>Welkom terug! Log U in.</legend>
										<ul>
											<li>
												<label htmlFor="email">E-mailadres</label>
												<Field
													name="email"
													type="email"
													placeholder="E-mailadres"
												></Field>
												<ErrorMessage name="username" component="p"></ErrorMessage>
											</li>
											<li>
												<label htmlFor="password">Wachtwoord</label>
												<Field
													name="password"
													type="password"
													placeholder="Wachtwoord"
												></Field>
												<ErrorMessage name="password" component="p"></ErrorMessage>
											</li>
											<button type="submit" id="submit_button" disabled={isSubmitting}>
												Login
											</button>
										</ul>
									</fieldset>
								</Form>
							)}
						</Formik>
						<Link href="/gebruiker/registreren">
							<a>Nog geen account? Registreer je dan hier!</a>
						</Link>
					</article>
				</section>
			</Layout>
		</>
	);
};

export const getServerSideProps = async (ctx) => {
	isAuthenticated(ctx, '/');
	return { props: {} };
};
