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
	const [locationtags, setLocationTags] = useState([]);
	const [selectedFilters, setSelectedFilters] = useState([]);
	const [search, setSearch] = useState('');

	useEffect(() => {
		//   get an array of locations, locations remains unchanged while filteredLocations gets changed
		axios.get('https://wdev.be/wdev_hannelore/eindwerk/api/locations?isDeleted=false').then((response) => {
			setLocations(response.data['hydra:member']);
			setFilteredLocations(response.data['hydra:member']);
		});

		// //   get an array of tags
		// axios.get('https://wdev.be/wdev_hannelore/eindwerk/api/tags').then((response) => {
		// 	setTags(response.data['hydra:member']);
		// });
	}, []);

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
		}

		const filteredLocationsArray = new Array();
		locations.map((location) => {
			// locationTagIds[`${location.id}`] = location['tags'].map((tag) => tag.id);
			const tagsArray = location['tags'].map((tag) => tag.id);
			const inArrayCheck = (id) => tagsArray.includes(id);
			if (selectedFilters.every(inArrayCheck)) {
				filteredLocationsArray.push(location);
			}
		});
		setFilteredLocations(filteredLocationsArray);

		// console.log(selectedFilters);

		// const locationTagIds = locations;

		// locations.map((location) => {
		// 	location['tags'].map((tag) => {
		// 		locationTagIds[{ location }] = tag.id;
		// 	});
		// });
		// console.log(locations);
	};

	//   when filtered by the search bar
	// const searchFilter = () => {
	// 	const filteredLocationsBySearch = locations.filter((location) => {
	// 		if (search == '') {
	// 			return false;
	// 		} else {
	// 			return true;
	// 		}
	// 	});
	// 	setFilteredLocations(filteredLocationsBySearch);
	// };

	// console.log(locations);
	// console.log(filteredLocations);
	// console.log(tags);
	// console.log(search);

	return (
		<Layout title="Green City Oasis || Locaties zoeken" description="U bent op de zoek pagina">
			<p className="search_thingy">Search</p>

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
									<Link href="#" as="">
										<a
											onClick={(e) => {
												e.preventDefault();
												tagFilter({ id });
											}}
										>
											{name}
										</a>
									</Link>
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
									<Link href="#" as="">
										<a
											onClick={(e) => {
												e.preventDefault();
												tagFilter({ id });
											}}
										>
											{name}
										</a>
									</Link>
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
									<Link href="#" as="">
										<a
											onClick={(e) => {
												e.preventDefault();
												tagFilter({ id });
											}}
										>
											{name}
										</a>
									</Link>
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
									<Link href="#" as="">
										<a
											onClick={(e) => {
												e.preventDefault();
												tagFilter({ id });
											}}
										>
											{name}
										</a>
									</Link>
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
									<Link href="#" as="">
										<a
											onClick={(e) => {
												e.preventDefault();
												tagFilter({ id });
											}}
										>
											{name}
										</a>
									</Link>
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
									<Link href="#" as="">
										<a
											onClick={(e) => {
												e.preventDefault();
												tagFilter({ id });
											}}
										>
											{name}
										</a>
									</Link>
								</li>
							))}
				</ul>
			</section>

			<section>
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
