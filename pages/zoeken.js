//        -        -        -        R E A C T ' S   I M P O R T S        -        -        -
import React from 'react';
import axios from 'axios';

//        -        -        -        L O C A L   I M P O R T S        -        -        -
import Layout from '../components/Layout';

//        -        -        -        E X P O R T   I N D E X        -        -        -

// export default ({ locations }) => {
// 	return (
// 		<Layout title="Green City Oasis || Zoeken" description="U bent op de zoekpagina">
// 			{locations.map(({ id, name, addressText }) => (
// 				<p key={id}>
// 					{name} {addressText}
// 				</p>
// 			))}
// 		</Layout>
// 	); //     end of return
// }; //     end of export

// //        -        -        -        S E R V E R   S I D E   P R O P S        -        -        -
// export const getServerSideProps = async () => {
// 	const result = await axios.get('https://wdev.be/wdev_hannelore/eindwerk/api/locations?page=1');
// 	return {
// 		props: {
// 			locations: result.data['hydra:member'],
// 		},
// 	}; //     end of return
// }; // end of GetStaticProps
