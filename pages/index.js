//        -        -        -        R E A C T ' S   I M P O R T S        -        -        -
import React from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Modal from 'react-modal';

//        -        -        -        L O C A L   I M P O R T S        -        -        -
import Layout from '../components/Layout';
import { slugify } from '../helper';

Modal.setAppElement('#__next');

//        -        -        -        E X P O R T   I N D E X        -        -        -

export default ({ locations }) => {
	return (
		<Layout title="Green City Oasis || Startpagina" description="U bent op de startpagina">
			<section id="home_message">
				<article>
					<h2>Welkom op Green City Oasis!</h2>
					<p>
						Green City Oasis, dé place to be als je een groen stukje rust, sport of plezier zoekt in
						het hartje van Leuven. De stad lijkt soms een betonnen wildernis en daarom wil Green City
						Oasis het tegendeel bewijzen door Leuven’s groene wonderen voor U op te lijsten!
					</p>
				</article>
			</section>
			<section id="home_spotlight">
				<h3>Spotlight!</h3>
				<p>De meest recent toegevoegde locaties!</p>
				<div className="grid_container">
					{locations.map(({ id, name, addressText }) => (
						<article>
							<Link
								href={`/locatie/[id]/[name]?id=${id},name=${slugify(name)}`}
								as={`/locatie/${id}/${slugify(name)}`}
							>
								<a key={id}>
									<p>{name}</p>
									<p className="index_imgs">
										<img
											src={`https://wdev.be/wdev_hannelore/eindwerk/system/images/pleintje-paep-thoon-1-5f48e1b48e9b1086281535.jpg`}
											alt={`Foto van ${name}`}
										/>
										{/* <img
											src={`https://wdev.be/wdev_hannelore/eindwerk/system/images/${locations['images'][0].fileName}`}
											alt={`Foto van ${props.name}`}
										/> */}
									</p>
								</a>
							</Link>
							<Link href={`/`} as={`/`}>
								<a className="modal">Toon op de kaart</a>
							</Link>
						</article>
					))}
				</div>
			</section>

			<Modal isOpen={false}>
				<div>in the modal</div>
			</Modal>
		</Layout>
	); //     end of return
}; //     end of export

//        -        -        -        S E R V E R   S I D E   P R O P S        -        -        -
export const getServerSideProps = async () => {
	const result = await axios.get(
		'https://wdev.be/wdev_hannelore/eindwerk/api/locations?isDeleted=false&order%5BcreatedAt%5D=desc&page=1'
	);
	return {
		props: {
			locations: result.data['hydra:member'],
		},
	}; //     end of return
}; // end of GetStaticProps

// what was originally on this page

// import Head from 'next/head'
// import styles from '../styles/Home.module.css'

// export default function Home() {
// 	return (
// 		<div className={styles.container}>
// 			<Head>
// 				<title>Create Next App</title>
// 				<link rel="icon" href="/favicon.ico" />
// 			</Head>

// 			<main className={styles.main}>
// 				<h1 className={styles.title}>
// 					Welcome to <a href="https://nextjs.org">Next.js!</a>
// 				</h1>

// 				<p className={styles.description}>
// 					Get started by editing{' '}
// 					<code className={styles.code}>pages/index.js</code>
// 				</p>

// 				<div className={styles.grid}>
// 					<a href="https://nextjs.org/docs" className={styles.card}>
// 						<h3>Documentation &rarr;</h3>
// 						<p>Find in-depth information about Next.js features and API.</p>
// 					</a>

// 					<a href="https://nextjs.org/learn" className={styles.card}>
// 						<h3>Learn &rarr;</h3>
// 						<p>Learn about Next.js in an interactive course with quizzes!</p>
// 					</a>

// 					<a
// 						href="https://github.com/vercel/next.js/tree/master/examples"
// 						className={styles.card}
// 					>
// 						<h3>Examples &rarr;</h3>
// 						<p>Discover and deploy boilerplate example Next.js projects.</p>
// 					</a>

// 					<a
// 						href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
// 						className={styles.card}
// 					>
// 						<h3>Deploy &rarr;</h3>
// 						<p>
// 							Instantly deploy your Next.js site to a public URL with Vercel.
// 						</p>
// 					</a>
// 				</div>
// 			</main>

// 			<footer className={styles.footer}>
// 				<a
// 					href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
// 					target="_blank"
// 					rel="noopener noreferrer"
// 				>
// 					Powered by{' '}
// 					<img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
// 				</a>
// 			</footer>
// 		</div>
// 	)
// }
