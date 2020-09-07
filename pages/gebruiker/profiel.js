//        -        -        -        R E A C T ' S   I M P O R T S        -        -        -
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { parseCookies } from 'nookies';
import jwt_decode from 'jwt-decode';
import { confirmAlert } from 'react-confirm-alert';

//        -        -        -        L O C A L   I M P O R T S        -        -        -
import Layout from '../../components/Layout';
import { isNotAuthenticated, logout } from '../../helper';

//        -        -        -        E X P O R T   P R O F I L E        -        -        -
export default function Profile({ user, id }) {
	const handleDelete = (e) => {
		e.preventDefault();
		confirmAlert({
			title: 'Uw profiel wordt definitief verwijdert.',
			message:
				'U staat op het punt Uw profiel te verwijderen. Dit is definitief en onomkeerbaar. Druk "Ja" om Uw profiel te verwijderen. Druk Neen om Uw profiel niet te verwijderen en terug te keren naar het vorige scherm.',
			buttons: [
				{
					label: 'Ja, verwijder.',
					className: 'error-yes',
					onClick: () => deleteAccount(),
				},
				{
					label: 'Neen, breng mij terug!',
				},
			],
		});
	};

	const deleteAccount = () => {
		axios.delete(`https://wdev.be/wdev_hannelore/eindwerk/api/users/${id}`)
			.then((response) => {
				logout();
			})
			.catch((error) => {
				console.log(error.response);
			});
	};

	return (
		<Layout
			title={`Green City Oasis || Profiel || ${user.displayName}`}
			description={`Dit is de detail pagina van `}
		>
			<section className="profile">
				<aside className="profile_header_img"></aside>
				<article>
					<h2>
						Welkom op jouw profiel, <span>{user.displayName}</span> !
					</h2>
					<ul>
						<li>
							<label>Gebruikersnaam</label>
							<p>{user.displayName}</p>
						</li>
						<li>
							<label>Volledige naam</label>
							<p>
								{user.firstName} {user.lastName}
							</p>
						</li>
						<li>
							<label>E-mail</label>
							<p>{user.email}</p>
						</li>
						{/* <li>
							<label>Woont in</label>
							{user.city.id == 2766 ? (
								<p> {user.country.name}</p>
							) : (
								<p>
									{user.city.zip} {user.city.name}, {user.country.name}
								</p>
							)}
						</li> */}
						<li>
							<label>Lid geworden op</label>
							<p>
								{user.createdAt}, {user.createdAtAgo}
							</p>
						</li>

						{/* {user['images'].length > 0 && (
							<li>
								<label>Gepostte foto's</label>
								<p>Gallerij</p>
							</li>
						)} */}

						{/* {user['reviews'].length > 0 && (
							<li>
								<label>Reviews</label>
								<p>rev</p>
							</li>
						)} */}
					</ul>

					<aside>
						<button className="delete-profile" onClick={handleDelete}>
							Profiel verwijderen
						</button>
					</aside>
				</article>
			</section>
		</Layout>
	);
}

//        -        -        -        S E R V E R   S I D E   P R O P S        -        -        -
export const getServerSideProps = async (ctx) => {
	isNotAuthenticated(ctx, '/gebruiker/inloggen');

	const cookies = parseCookies(ctx);
	const decode = jwt_decode(cookies.jwtToken);
	const id = decode.id;

	const request = await axios.get(`https://wdev.be/wdev_hannelore/eindwerk/api/users/${id}`);
	const user = request.data;

	return {
		props: {
			user,
			id,
		},
	};
};
