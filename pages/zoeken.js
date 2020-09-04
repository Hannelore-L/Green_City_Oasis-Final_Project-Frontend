//        -        -        -        R E A C T ' S   I M P O R T S        -        -        -
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

//        -        -        -        L O C A L   I M P O R T S        -        -        -
import Layout from '../components/Layout';

// //        -        -        -        E X P O R T   S E A R C H        -        -        -

export default function Search({ taglist }) {
	const [locations, setLocations] = useState([]);
	const [filteredLocations, setFilteredLocations] = useState([]);
	const [selectedFilters, setSelectedFilters] = useState([]);
	const [search, setSearch] = useState('');

	useEffect(() => {
		//   get an array of locations, locations remains unchanged while filteredLocations gets changed
		axios.get('https://wdev.be/wdev_hannelore/eindwerk/api/locations?isDeleted=false').then((response) => {
			setLocations(response.data['hydra:member']);
			setFilteredLocations(response.data['hydra:member']);
		});
	}, []); //   end of useEffect

	//   when filtered by the tags
	const tagFilter = (tagFilterId) => {
		const tagFilterIdNr = tagFilterId['id'];
		let selectedFiltersArray = selectedFilters;
		let indexOfTag = selectedFiltersArray.indexOf(tagFilterIdNr);

		if (indexOfTag == -1) {
			selectedFiltersArray.push(tagFilterIdNr);
			setSelectedFilters(selectedFiltersArray);
		} else {
			selectedFiltersArray.splice(indexOfTag, 1);
			setSelectedFilters(selectedFiltersArray);
		} //   end of if else

		const filteredLocationsArray = new Array();
		locations.map((location) => {
			const tagsArray = location['tags'].map((tag) => tag.id);
			const inArrayCheck = (id) => tagsArray.includes(id);
			if (selectedFilters.every(inArrayCheck)) {
				filteredLocationsArray.push(location);
			} //   end of if
		}); //   end of locations.map
		setFilteredLocations(filteredLocationsArray);
	}; //   end of tagFilter

	//   when filtered by the search bar
	const searchFilter = () => {
		if (search != '') {
			const filteredLocationsBySearch = filteredLocations.filter((location) => {
				// if the search string is not found in the name AND isn't found in the description, the location should not show, so return false
				if (location.name.search(search) == -1 && location.description.search(search) == -1) {
					return false;
				} else {
					return true;
				} //   end of if else
			}); //   end of filter
			setFilteredLocations(filteredLocationsBySearch);
		} // end ofif (search != '')
	}; //   end of searchFilter

	return (
		<Layout title="Green City Oasis || Locaties zoeken" description="U bent op de zoek pagina">
			<section className="search_desc">
				<h2>Search</h2>
				<p>
					Zoek je de ideale groene oase om wat tijd in door te brengen? Dan ben je hier op het juiste
					adres! Klik op de filters aan de linker zijde om de selectie te verkleinen! Zie je geen enkel
					resultaat meer? Probeer dan een filter weg te halen. Ben je naar iets specifiek op zoek? De
					zoek balk is je beste vriend!
				</p>
			</section>

			<section className="search_bar">
				<input
					type="text"
					value={search}
					onChange={(e) => {
						setSearch(e.target.value);
					}}
				/>
				<button
					type="button"
					onClick={() => {
						searchFilter();
					}}
				>
					Zoek
				</button>
			</section>

			<section className="filters">
				<h3>Filters:</h3>
				<h4>Natuur</h4>
				<ul>
					{taglist &&
						taglist
							.filter(({ category }) => category == 'Natuur')
							.map(({ id, name }) => (
								<li key={id}>
									<input
										type="checkbox"
										name={name}
										onClick={() => {
											tagFilter({ id });
										}}
									/>
									<label htmlFor={name}>{name}</label>
								</li>
							))}
				</ul>

				<h4>Bewegen</h4>
				<ul>
					{taglist &&
						taglist
							.filter(({ category }) => category == 'Bewegen')
							.map(({ id, name }) => (
								<li key={id}>
									<input
										type="checkbox"
										name={name}
										onClick={() => {
											tagFilter({ id });
										}}
									/>
									<label htmlFor={name}>{name}</label>
								</li>
							))}
				</ul>

				<h4>Infrastructuur</h4>
				<ul>
					{taglist &&
						taglist
							.filter(({ category }) => category == 'Infrastructuur')
							.map(({ id, name }) => (
								<li key={id}>
									<input
										type="checkbox"
										name={name}
										onClick={() => {
											tagFilter({ id });
										}}
									/>
									<label htmlFor={name}>{name}</label>
								</li>
							))}
				</ul>

				<h4>Bezienswaardigheden</h4>
				<ul>
					{taglist &&
						taglist
							.filter(({ category }) => category == 'Bezienswaardigheden')
							.map(({ id, name }) => (
								<li key={id}>
									<input
										type="checkbox"
										name={name}
										onClick={() => {
											tagFilter({ id });
										}}
									/>
									<label htmlFor={name}>{name}</label>
								</li>
							))}
				</ul>

				<h4>Verharde ondergrond</h4>
				<ul>
					{taglist &&
						taglist
							.filter(({ category }) => category == 'Verharde ondergrond')
							.map(({ id, name }) => (
								<li key={id}>
									<input
										type="checkbox"
										name={name}
										onClick={() => {
											tagFilter({ id });
										}}
									/>
									<label htmlFor={name}>{name}</label>
								</li>
							))}
				</ul>

				<h4>Populariteit</h4>
				<ul>
					{taglist &&
						taglist
							.filter(({ category }) => category == 'Populariteit')
							.map(({ id, name }) => (
								<li key={id}>
									<input
										type="checkbox"
										name={name}
										onClick={() => {
											tagFilter({ id });
										}}
									/>
									<label htmlFor={name}>{name}</label>
								</li>
							))}
				</ul>
			</section>

			<section className="filtered_locations">
				<ul>
					{filteredLocations &&
						filteredLocations.length > 0 &&
						filteredLocations.map((location) => <li key={location.id}>{location.name}</li>)}
				</ul>
			</section>
		</Layout>
	);
} //   end of export

//        -        -        -        S E R V E R   S I D E   P R O P S        -        -        -
export const getServerSideProps = async () => {
	const result = await axios.get('https://wdev.be/wdev_hannelore/eindwerk/api/tags');
	return {
		props: {
			taglist: result.data['hydra:member'],
		},
	}; //     end of return
}; // end of GetStaticProps
