import { useEffect, useState } from 'react';
import MovieVideo from '../components/MovieVideo';
import { useParams } from 'react-router-dom';

const MovieDetail = () => {
	const { id } = useParams();
	const [movieDetail, setMovieDetail] = useState(null);
	const [movieDetail2, setMovieDetail2] = useState(null);
	const [movieImages, setMovieImages] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		const options = {
			method: 'GET',
			headers: {
				accept: 'application/json',
				Authorization:
					'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOWZjNzg1MzNjNzdhZTIzNzU1ZjZmODgzZGNlOGM2YSIsInN1YiI6IjY0ZGFlMzlkMzcxMDk3MDExYzUxNGQ2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zSKBmg-rNbdwJALDluKUl6R2sIQMPNjv9DtiOfrM3Kc',
			},
		};

		const fetchMovieDetail = async () => {
			try {
				const res = await fetch(
					`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
					options
				);

				if (!res.ok) {
					throw new Error('Network response was not ok');
				}

				const data = await res.json();
				setMovieDetail(data.results[0]); // 假设你只需要第一个视频
			} catch (err) {
				if (err.name !== 'AbortError') {
					setError(err);
				}
			}
		};

		const fetchMovieDetail2 = async () => {
			try {
				const res = await fetch(
					`https://api.themoviedb.org/3/movie/${id}?language=en-US`,
					options
				);

				if (!res.ok) {
					throw new Error('Network response was not ok');
				}

				const data = await res.json();
				setMovieDetail2(data); // 获取详细信息
			} catch (err) {
				if (err.name !== 'AbortError') {
					setError(err);
				}
			}
		};

		const fetchMovieImages = async () => {
			try {
				const res = await fetch(
					`https://api.themoviedb.org/3/movie/${id}/images`,
					options
				);

				if (!res.ok) {
					throw new Error('Network response was not ok');
				}

				const data = await res.json();
				setMovieImages(data.backdrops.slice(0, 12)); // 只取前六张图片
			} catch (err) {
				if (err.name !== 'AbortError') {
					setError(err);
				}
			}
		};

		fetchMovieDetail();
		fetchMovieDetail2();
		fetchMovieImages();
	}, [id]);

	const videoData = movieDetail;

	return (
		<div className="bg-gray-50 rounded-md p-4 shadow mt-4">
			{videoData && movieDetail2 ? (
				<MovieVideo videoData={videoData} movieDetail2={movieDetail2} />
			) : (
				<p>Loading...</p>
			)}
			{error && <p>Error: {error.message}</p>}
			{movieImages.length > 0 && (
				<div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
					{movieImages.map((image, index) => (
						<div key={index} className="w-full h-64 overflow-hidden rounded-lg">
							<img
								src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
								alt={`Backdrop ${index + 1}`}
								className="object-cover w-full h-full"
							/>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default MovieDetail;
