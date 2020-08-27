//        -        -        -        R E A C T ' S   I M P O R T S        -        -        -
import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

//        -        -        -        L O C A L   I M P O R T S        -        -        -
import Header from './Header';
import Footer from './Footer';

//        -        -        -        E X P O R T   L A Y O U T        -        -        -

export default function Layout({ children, title, description, footer }) {
	return (
		<>
			<Head>
				<title>{title}</title>
				<link rel="icon" href="/favicon.ico" />
				<meta name="description" content={description} />
				<meta name="author" content="Hannelore Lamotte" />
			</Head>

			<Header />
			<div className="maindiv">
				<main>{children}</main>
			</div>
			<Footer />
		</>
	); //   end of return
} //   end of export default Layout
