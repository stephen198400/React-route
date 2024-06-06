import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';

const Navbar = ({}) => {
	const [input, setInput] = useState('');
	const [searchMovies, setSearchMovies] = useState([]);
	const [showResults, setShowResults] = useState(false);
	const searchRef = useRef(null);
	const navigate = useNavigate();

	/* -------------------------- search bar useEffect -------------------------- */
	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;

		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization:
					'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWZjNzg1MzNjNzdhZTIzNzU1ZjZmODgzZGNlOGM2YSIsInN1YiI6IjY0ZGFlMzlkMzcxMDk3MDExYzUxNGQ2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zSKBmg-rNbdwJALDluKUl6R2sIQMPNjv9DtiOfrM3Kc',
			},
			signal,
		};

		const fetchData = async () => {
			if (input) {
				try {
					const res = await fetch(
						`https://api.themoviedb.org/3/search/movie?query=${input}`,
						options
					);
					const data = await res.json();
					setSearchMovies(data.results || []);
					setShowResults(true);
				} catch (error) {
					if (error.name === 'AbortError') {
						console.log('Fetch aborted');
					} else {
						console.error('Error fetching data:', error);
					}
				}
			} else {
				setSearchMovies([]);
				setShowResults(false);
			}
		};

		fetchData();

		// 清理函数，在组件卸载或 input 变化时调用
		return () => {
			controller.abort();
		};
	}, [input]);

	/* ---------------------------------- Funcs --------------------------------- */
	const handleInputOnChange = (e) => {
		setInput(e.target.value);
	};

	const handleClickOutside = (event) => {
		if (searchRef.current && !searchRef.current.contains(event.target)) {
			setShowResults(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleMovieClick = (movie) => {
		setShowResults(false);
		navigate(`/movie/${movie.id}`, { state: { movie } });
	};

	return (
		<nav className="flex items-center justify-center px-2 py-2 round bg-gray-50 gap-4 shadow-sm">
			<Link to="/">
				<img className="h-12" src={Logo} alt="Logo" />
			</Link>
			<div className="grow bg-red-200" ref={searchRef}>
				<input
					className="border w-full border-gray-600 rounded-md py-0 px-2 mx-auto"
					type="text"
					placeholder="Search movies"
					value={input}
					onChange={handleInputOnChange}
				/>
				{showResults && (
					<div>
						{searchMovies.length > 0 ? (
							<ul className="absolute bg-gray-50 w-full rounded-md shadow-md">
								{searchMovies.map((movie) => (
									<li
										className="p-2 hover:bg-gray-100 cursor-pointer border-b-[1px] mt-2 shadow"
										key={movie.id}
										onClick={() => handleMovieClick(movie)}
									>
										<div className="flex justify-start gap-2 items-center">
											<div className="w-10">
												<img
													className="w-full h-full"
													src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
													alt={movie.title}
												/>
											</div>
											<div>
												<h1 className="text-[16px] text-start">
													{movie.title}
												</h1>
												<h2 className="text-[12px] text-gray-500">
													{movie.release_date}
												</h2>
												<div className="flex justify-start items-center gap-1">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 24 24"
														fill="currentColor"
														className="size-3 text-yellow-400"
													>
														<path
															fillRule="evenodd"
															d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
															clipRule="evenodd"
														/>
													</svg>
													<p className="text-[12px] text-gray-500">
														{movie.vote_average}
													</p>
												</div>
											</div>
										</div>
									</li>
								))}
							</ul>
						) : (
							<div>No Data</div>
						)}
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
