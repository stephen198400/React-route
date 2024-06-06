import React from 'react';

const VideoComponent = ({ videoData, movieDetail2 }) => {
	const videoUrl =
		videoData.site === 'YouTube'
			? `https://www.youtube.com/embed/${videoData.key}`
			: '';

	return (
		<div className="video-container">
			{movieDetail2 && (
				<div className="space-y-0">
					<h1 className="text-[20px] font-medium text-start leading-6 ">
						{movieDetail2.title}
					</h1>
					<p className="text-start">
						Published on:{' '}
						{new Date(videoData.published_at).toLocaleDateString()}
					</p>
					<h2 className="text-start">{`Language: ${movieDetail2.original_language}`}</h2>
					<h2 className="text-start">
						Status:
						<span className="bg-green-100 px-2 rounded-md">
							{movieDetail2.status}
						</span>
					</h2>
				</div>
			)}
			{videoUrl && (
				<div className="aspect-w-16 aspect-h-9">
					<iframe
						width="560"
						height="315"
						src={videoUrl} // 使用 videoUrl 变量
						title={videoData.name}
						frameBorder="0"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					></iframe>
				</div>
			)}
		</div>
	);
};

export default VideoComponent;
