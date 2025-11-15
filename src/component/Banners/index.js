
import React, {useState, useReducer, useEffect} from 'react'
import axios from 'axios' 
import Carousel from 'react-bootstrap/Carousel'
import './style.scss'
import Moment from 'react-moment';
import Parser from 'html-react-parser'


const initialState = {
	loading: true,
	error: '',
	posts: []
}

const reducer = (state, action) => {
	switch (action.type) {
		case 'FETCH_SUCCESS':
			return {
				loading: false,
				posts: action.payload,
				error: ''
			}
		case 'FETCH_ERROR':
			return{
				loading: false,
				posts: [],
				error: 'Something went wrong!'
			}
		default :
			return state 
	}
}


export function HomeSlideBanner() {
	
		const [index, setIndex] = useState(0);

		const handleSelect = (selectedIndex, e) => {
			setIndex(selectedIndex);
		};

		const [state, dispatch] = useReducer(reducer, initialState)

		useEffect(() => {

			axios.get('https://studentportal.anutamaskillsacademy.com/wp-json/wp/v2/posts?categories=2&per_page=100&_embed')
			.then(response => {
				dispatch({type:'FETCH_SUCCESS', payload:response.data})
			})
			.catch(error => {
				dispatch({type: 'FETCH_ERROR'})
			})

		}, [])
		

		return (
			<Carousel activeIndex={index} onSelect={handleSelect}>
				
			
				{state.loading ? <h2 className="container py-4 py-md-5" style={{fontSize:'30px', textAlign:'center'}}>Loading...</h2> : 
					state.posts.map(post => (
						
						<Carousel.Item key={post.id} style={{backgroundImage: `url(${post._embedded['wp:featuredmedia']['0'].source_url})`}}>
							<Carousel.Caption>
								<h3 className="banner_title">{post.title.rendered}</h3>
								{/* {Parser(post.content.rendered)} */}
								
							</Carousel.Caption>
						</Carousel.Item>

					))
				}

				{state.error ? state.error : null }

			</Carousel>
		);
	}
	
//  render(<ControlledCarousel />);


export function StudentReviewes(props) {
	
	const [index, setIndex] = useState(0);

	const handleSelect = (selectedIndex, e) => {
		setIndex(selectedIndex);
	};
	
	const [state, dispatch] = useReducer(reducer, initialState)
	const [review, setReview] = useState('');

	const {reviewTag} = props;
	
	useEffect(() => {

		axios.get(`https://studentportal.anutamaskillsacademy.com/wp-json/wp/v2/posts?tags=${reviewTag}&_embed`)
		.then(response => {
			dispatch({type:'FETCH_SUCCESS', payload:response.data})
			setReview(reviewTag)
		})
		.catch(error => {
			dispatch({type: 'FETCH_ERROR'})
		})

	}, [state])
	
	// const postss = state.posts;
	// let ppss = postss.splice(-1, 1);
	// console.log();
	  
	return (
		<React.Fragment>
		
		{/* {console.log(state.posts.length)} */}

		{state.posts.length > 1 ? 
		<React.Fragment>

		<h2 className="studentsReviewH">Students Review</h2>
		
		<Carousel activeIndex={index} onSelect={handleSelect}>
		
			{state.loading ? <h3 className="container py-4 py-md-5" style={{fontSize:'16px', textAlign:'center'}}>Loading...</h3> : 
				state.posts.map(post => (

					<Carousel.Item key={post.id}>
						<h3>{Parser(post.title.rendered)}</h3>
						{Parser(post.content.rendered)}

						<div className="name-day">
							<span>{post._embedded.author[0].name} ,</span>
							<span><Moment fromNow>{post.date}</Moment></span>
						</div>
					</Carousel.Item>

				))
			}

			{state.error ? state.error : null }

		</Carousel> </React.Fragment> : null}

	</React.Fragment>
	);
}





