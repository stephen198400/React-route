import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Navbar from './components/Navbar';
import MovieDetail from './Pages/MovieDetail';
/* ----------------------------------- App ---------------------------------- */
function App() {
	/* ---------------------------------- State --------------------------------- */
	const [popular, setPopular] = useState([]);
	const [loading, setLoading] = useState(true);

	/* -------------------------------- useEffect ------------------------------- */
	useEffect(() => {
		const abortController = new AbortController();
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization:
					'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWZjNzg1MzNjNzdhZTIzNzU1ZjZmODgzZGNlOGM2YSIsInN1YiI6IjY0ZGFlMzlkMzcxMDk3MDExYzUxNGQ2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zSKBmg-rNbdwJALDluKUl6R2sIQMPNjv9DtiOfrM3Kc',
			},
			signal: abortController.signal,
		};

		const fetchMovies = async () => {
			try {
				const response = await fetch(
					'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
					options
				);
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const data = await response.json();
				setPopular(data.results);
			} catch (err) {
				if (err.name !== 'AbortError') {
					setError(err);
				}
			} finally {
				setLoading(false);
			}
		};

		fetchMovies();

		// Cleanup function to abort fetch on component unmount
		return () => {
			abortController.abort();
		};
	}, []);

	/* --------------------------------- Return --------------------------------- */
	return (
		<div className="container mx-auto">
			<div className="">
				<Navbar />
				<Routes>
					<Route path="/" element={<Home popular={popular} />} />
					<Route path="about" element={<About />} />
					<Route path="movie/:id" element={<MovieDetail />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
