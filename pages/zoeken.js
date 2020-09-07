//        -        -        -        R E A C T ' S   I M P O R T S        -        -        -
import React, { useState, useEffect } from 'react';
import {
	Accordion,
	AccordionItem,
	AccordionItemHeading,
	AccordionItemButton,
	AccordionItemPanel,
} from 'react-accessible-accordion';
import axios from 'axios';
import Link from 'next/link';

//        -        -        -        L O C A L   I M P O R T S        -        -        -
import Layout from '../components/Layout';
import { slugify } from '../helper';

// //        -        -        -        E X P O R T   S E A R C H        -        -        -

export default function Search({ taglist, images }) {
	const [locations, setLocations] = useState([]);
	const [filteredLocations, setFilteredLocations] = useState([]);
	const [selectedFilters, setSelectedFilters] = useState([]);
	const [search, setSearch] = useState('');

	const categories = [
		'Natuur',
		'Bewegen',
		'Infrastructuur',
		'Bezienswaardigheden',
		'Verharde ondergrond',
		'Populariteit',
	];

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
			const tagsArray = location['tags'].map((tag) => parseInt(tag.slice(34), 10));
			const inArrayCheck = (id) => tagsArray.includes(id);
			console.log('tagsArray');
			console.log(tagsArray);
			console.log('selectedFilters');
			console.log(selectedFilters);
			if (selectedFilters.every(inArrayCheck)) {
				filteredLocationsArray.push(location);
			} //   end of if
		}); //   end of locations.map
		setFilteredLocations(filteredLocationsArray);
	}; //   end of tagFilter

	//   when filtered by the search bar
	const searchFilter = () => {
		if (search != '') {
			const filteredLocationsBySearch = locations.filter((location) => {
				if (
					location.name.search(search) != -1 ||
					location.name.search(search.charAt(0).toUpperCase() + search.slice(1)) != -1 ||
					location.addressText.search(search) != -1 ||
					location.addressText.search(search.charAt(0).toUpperCase() + search.slice(1)) != -1 ||
					location.description.search(search) != -1 ||
					location.description.search(search.charAt(0).toUpperCase() + search.slice(1)) != -1
				) {
					return true;
				} else {
					return false;
				} //   end of if else
			}); //   end of filter
			setFilteredLocations(filteredLocationsBySearch);
		} // end of if (search != '')
	}; //   end of searchFilter

	// const handleKeypress = (e) => {
	// 	if (e.keyCode === 13) {
	// 		() => {
	// 			searchFilter();
	// 		};
	// 	}
	// };

	const classToggle = (id) => {
		const element = document.getElementById(id);
		element.classList.toggle('fa-square');
		element.classList.toggle('fa-check-square');
	};

	return (
		<Layout title="Green City Oasis || Locaties zoeken" description="U bent op de zoek pagina">
			<article className="search_page">
				<section className="search_desc">
					<h2>Vind de perfecte oase!</h2>
					<p>
						Zoek je de ideale groene oase om wat tijd in door te brengen? Dan ben je hier op het
						juiste adres! Klik op de filters aan de linker zijde om de selectie te verkleinen! Zie je
						geen enkel resultaat meer? Probeer dan een filter weg te halen. Ben je naar iets specifiek
						op zoek? De zoek balk is je beste vriend!
					</p>
				</section>

				<section className="search_bar">
					<input
						type="text"
						value={search}
						placeholder="Typ hier je zoekterm!"
						onChange={(e) => {
							setSearch(e.target.value);
						}}
						// onKeyPress={handleKeypress}
					/>
					<button
						type="button"
						onClick={() => {
							searchFilter();
						}}
					>
						<span className="fas fa-search"></span>
					</button>
				</section>

				<section className="search_filters">
					<h3>Filters:</h3>

					{categories.map((cat) => (
						<Accordion allowMultipleExpanded allowZeroExpanded preExpanded={categories}>
							<AccordionItem uuid={cat}>
								<AccordionItemHeading>
									<AccordionItemButton>{cat}</AccordionItemButton>
								</AccordionItemHeading>
								<AccordionItemPanel>
									<ul>
										{taglist &&
											taglist
												.filter(({ category }) => category == cat)
												.map(({ id, name }) => (
													<li key={id}>
														<input
															type="checkbox"
															id={'check_' + id}
															onClick={() => {
																tagFilter({ id });
															}}
														/>
														<label
															htmlFor={'check_' + id}
															// className="far fa-square fa-check-square"
															onClick={() => classToggle(`checkbox_${id}`)}
														>
															<span
																id={`checkbox_${id}`}
																className="far fa-square"
															></span>

															{name}
														</label>
													</li>
												))}
									</ul>
								</AccordionItemPanel>
							</AccordionItem>
						</Accordion>
					))}
				</section>

				<section className="filtered_locations">
					<ul>
						{filteredLocations && filteredLocations.length > 0 ? (
							filteredLocations.map((location) => (
								// <li key={location.id}>{location.name}</li>)
								<Link
									href={`/locatie/[id]/[name]?id=${location.id},name=${slugify(
										location.name
									)}`}
									as={`/locatie/${location.id}/${slugify(location.name)}`}
								>
									<a key={location.id}>
										<li>
											<p>{location.name}</p>
											{images &&
											images.find(
												(image) =>
													image.location ==
													`/wdev_hannelore/eindwerk/api/locations/${location.id}`
											) != undefined ? (
												<img
													src={`http://wdev.be/wdev_hannelore/eindwerk/system/image.php/green-city-oasis-${slugify(
														location.name
													)}-${
														images.find(
															(image) =>
																image.location ==
																`/wdev_hannelore/eindwerk/api/locations/${location.id}`
														).id
													}.jpg?width=300&height=300&cropratio=3:2&image=/wdev_hannelore/eindwerk/system/images/${
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
													src={`/images/logo_placeholder_3_2.jpg`}
													alt={`placeholder`}
												/>
											)}
										</li>
									</a>
								</Link>
							))
						) : (
							<p className="no_loc">Er zijn geen locaties gevonden...</p>
						)}
					</ul>
				</section>
			</article>
		</Layout>
	);
} //   end of export

//        -        -        -        S E R V E R   S I D E   P R O P S        -        -        -
export const getServerSideProps = async () => {
	const resultTags = await axios.get('https://wdev.be/wdev_hannelore/eindwerk/api/tags');
	const resultImages = await axios.get('https://wdev.be/wdev_hannelore/eindwerk/api/images');

	return {
		props: {
			taglist: resultTags.data['hydra:member'],
			images: resultImages.data['hydra:member'],
		},
	}; //     end of return
}; // end of GetServerSideProps
