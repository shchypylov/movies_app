import * as React from 'react';


interface IResponse {
	results: []
}

interface IItem {
	backdrop_path: string,
	title: string,
	overview: string,
	poster_path: string
}

class Home extends React.Component {
	
	public state = {
		movies: []
	}
	
	public componentDidMount() {
		this.fetchMovies()
	}
	
	public fetchMovies = async () => {
		const req: any = await fetch("https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&api_key=f17d60f29acb1594b178c1ba26b67623", {
			method: "GET",
			mode: "cors"
		});
		const json: IResponse = await req.json();
		this.setState({
			movies: json.results
		})
	}
	
	public render() {
		const {movies} = this.state;
		return (
				<div>
					<h1>Movies app</h1>
					{movies.length && (
							movies.map((item:IItem) => {
								console.log(`item --- `, item);
								return (
										<div key={item.backdrop_path}>
											<h2>{item.title}</h2>
											<img src={`https://image.tmdb.org/t/p/w185/${item.poster_path}`} alt=""/>
											<i>{item.overview}</i>
										</div>
								)
							})
					)}
				</div>
		);
	}
}

export default Home
