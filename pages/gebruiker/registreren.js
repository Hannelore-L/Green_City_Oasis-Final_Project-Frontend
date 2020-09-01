//        -        -        -        R E A C T ' S   I M P O R T S        -        -        -
import React, { useState } from 'react';
import Select from 'react-select';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
// import Link from 'next/link';
// import { useRouter } from 'next/router';

//        -        -        -        L O C A L   I M P O R T S        -        -        -
import Layout from '../../components/Layout';
import { InputField } from '../../components/fields/InputField';
import { isAuthenticated } from '../../helper';

//        -        -        -        E X P O R T   R E G I S T R E R E N        -        -        -
export default function Register({ countries, cities }) {
	const [foreign, setForeign] = useState('');

	const countryList = countries.map((country) => {
		return { value: `api/countries/${country.id}`, label: `${country.name} ` };
	});

	// const cityList = countries['cities'].map((city) => {
	const cityList = cities.map((city) => {
		return { value: `api/cities/${city.id}`, label: `${city.name} ` };
	});

	return (
		<>
			<Layout title="Green City Oasis || Registreren" description="U bent op de registratie pagina">
				<section className="register">
					<aside></aside>
					<article>
						<Formik
							// validation schema
							validationSchema={Yup.object({
								email: Yup.string()
									.email('Geef een geldig e-mailadres in, aub.')
									.required('U moet een e-mailadres opgeven'),

								password: Yup.string()
									.min(8, 'Wachtwoord moet uit minstens 8 tekens bestaan')
									.required('Dit veld is verplicht'),

								displayName: Yup.string()
									.required('U moet een gebruikersnaam opgeven')
									.min(2, 'Gebruikersnaam moet uit minstens 2 tekens bestaan')
									.max(30, 'Gebruikersnaam mag uit maximaal 30 tekens bestaan'),

								firstName: Yup.string()
									.required('U moet uw voornaam opgeven')
									.min(2, 'Voornaam moet uit minstens 2 tekens bestaan')
									.max(30, 'Voornaam mag uit maximaal 30 tekens bestaan'),

								lastName: Yup.string()
									.required('U moet uw achternaam opgeven')
									.min(2, 'Achternaam moet uit minstens 2 tekens bestaan')
									.max(30, 'Achternaam mag uit maximaal 30 tekens bestaan'),

								country: Yup.string().required('U moet uw land opgeven'),

								city: Yup.string().required('U moet uw stad opgeven'),
							})}
							// initial values
							initialValues={{
								email: '',
								password: '',
								displayName: '',
								firstName: '',
								lastName: '',
								country: 'api/countries/15',
								city: 'api/cities/2766',
							}}
							onSubmit={(values) => {
								console.log(`------------${values}`);
								axios.post('https://wdev.be/wdev_hannelore/eindwerk/api/users', values)
									.then(function (response) {
										console.log(response, 'Bedankt om te registreren!');
										window.location = '/gebruiker/inloggen';
									})
									.catch(function (error) {
										console.log(error, 'Onze excuses. Er is iets misgelopen.');
									});
							}}
						>
							{({ setFieldValue, isSubmitting }) => (
								<Form>
									<fieldset>
										<legend>Registreer U!</legend>
										<ul>
											<li>
												<label htmlFor="email">E-mailadres</label>
												<Field
													name="email"
													type="email"
													placeholder="E-mailadres"
													component={InputField}
												></Field>
												<div className="error_message">
													<ErrorMessage name="email" />
												</div>
											</li>

											<li>
												<label htmlFor="password">Wachtwoord</label>
												<Field
													name="password"
													type="password"
													placeholder="Wachtwoord"
													component={InputField}
												></Field>
												<div className="error_message">
													<ErrorMessage name="password" />
												</div>
											</li>

											<li>
												<label htmlFor="displayName">Gebruikersnaam</label>
												<Field
													name="displayName"
													type="text"
													placeholder="Gebruikersnaam"
													component={InputField}
												></Field>
												<div className="error_message">
													<ErrorMessage
														className="error_message"
														name="displayName"
													/>
												</div>
											</li>

											<li>
												<label htmlFor="firstName">Voornaam</label>
												<Field
													name="firstName"
													type="text"
													placeholder="Voornaam"
													component={InputField}
												></Field>
												<div className="error_message">
													<ErrorMessage name="firstName" />
												</div>
											</li>

											<li>
												<label htmlFor="lastName">Achternaam</label>
												<Field
													name="lastName"
													type="text"
													placeholder="Achternaam"
													component={InputField}
												></Field>
												<div className="error_message">
													<ErrorMessage name="lastName" />
												</div>
											</li>

											<li>
												<p>Woont U in België?</p>
												<button
													type="button"
													id="yes"
													onClick={() => setForeign('no')}
												>
													Ja
												</button>
												<button
													type="button"
													id="no"
													onClick={() => setForeign('yes')}
												>
													Neen
												</button>
											</li>

											{foreign == 'yes' && countryList && (
												<li className="select_box">
													<label htmlFor="country">
														In welk land woont U dan?
													</label>
													<Select
														options={countryList}
														name="country"
														placeholder={'Land'}
														onChange={(value) => {
															setFieldValue('country', value.value);
														}}
													/>
													<div className="error_message">
														<ErrorMessage name="countries"></ErrorMessage>
													</div>
												</li>
											)}

											{foreign == 'no' && cityList && (
												<li className="select_box">
													<label htmlFor="city">
														In welke stad woont U dan?
													</label>
													<Select
														options={cityList}
														name="city"
														placeholder={'Stad'}
														onChange={(value) => {
															setFieldValue('city', value.value);
														}}
													/>
													<div className="error_message">
														<ErrorMessage name="cities"></ErrorMessage>
													</div>
												</li>
											)}

											<button type="submit" id="submit_button" disabled={isSubmitting}>
												Verzenden
											</button>
										</ul>
									</fieldset>
								</Form>
							)}
						</Formik>
					</article>
				</section>
			</Layout>
		</>
	);
}

export const getStaticProps = async (ctx) => {
	//   is user already logged in
	isAuthenticated(ctx, '/');

	const countryResult = await axios.get('https://wdev.be/wdev_hannelore/eindwerk/api/countries');
	const countries = countryResult.data['hydra:member'];
	const cityResult = await axios.get('https://wdev.be/wdev_hannelore/eindwerk/api/cities');
	const cities = cityResult.data['hydra:member'];
	return {
		props: {
			countries,
			cities,
		},
	};
};
