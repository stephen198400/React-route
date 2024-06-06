import { Link } from 'react-router-dom';
const Home = ({ popular }) => {
	return (
		<div className="">
			<h1 className="text-start text-2xl font-semibold mt-4">
				Top 10 on IMDb this week
			</h1>
			<div className="cards grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4  mt-8">
				{popular.length > 0 ? (
					popular.map((movie) => {
						return (
							<div className="card  rounded-md shadow p-0" key={movie.id}>
								<div className="sm:h-52 ">
									<Link
										to={{ pathname: `/movie/${movie.id}`, state: { movie } }}
										key={movie.id}
									>
										<img
											className="rounded-t-md w-full h-full object-cover"
											src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
											alt=""
										/>
									</Link>
								</div>
								<div className="p-2 flex flex-col items-start gap-0 ">
									<h2 className="text-[16px] lg:text-[14px] leading-5  sm:leading-4 text-start font-medium h-16 sm:h-12 ">
										{movie.title}
									</h2>
									<p className="text-[12px]">{movie.release_date}</p>
									<div className="flex justify-start items-center gap-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="currentColor"
											className="size-5 text-yellow-400"
										>
											<path
												fillRule="evenodd"
												d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
												clipRule="evenodd"
											/>
										</svg>
										<span className="text-[12px]">{movie.vote_average}</span>
									</div>
								</div>
							</div>
						);
					})
				) : (
					<div>Loading...</div>
				)}
			</div>
		</div>
	);
};

export default Home;
