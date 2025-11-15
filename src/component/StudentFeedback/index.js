import React, {useReducer, useEffect} from 'react'
import axios from 'axios' 
import './style.scss'
import Moment from 'react-moment';
import Parser from 'html-react-parser'

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ReviewStar from '../../assets/review.png'


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


function StudentFeedback() {
	
	const [state, dispatch] = useReducer(reducer, initialState)

	const responsive = {
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 3,
			slidesToSlide: 3 // optional, default to 1.
		},
		tablet: {
			breakpoint: { max: 1024, min: 767 },
			items: 2,
			slidesToSlide: 2 // optional, default to 1.
		},
		mobile: {
			breakpoint: { max: 767, min: 0 },
			items: 1,
			slidesToSlide: 1 // optional, default to 1.
		}
	};


	useEffect(() => {

		axios.get('https://studentportal.anutamaskillsacademy.com/wp-json/wp/v2/posts?categories=33&per_page=100&_embed')
		.then(response => {
			dispatch({type:'FETCH_SUCCESS', payload:response.data})
		})
		.catch(error => {
			dispatch({type: 'FETCH_ERROR'})
		})

	}, [])

	const container = document.querySelector('.thumbnail-container');
	// const allBox = container.children;
	console.log(container)
	
	return (
		<React.Fragment>
		
		{/* {console.log(state.posts.length)} */}

		{state.posts.length > 1 ? 
		<React.Fragment>

		<h2 className="sec-heading"> <span>Students</span> Feedback</h2>	
		
		<div className="feedback-slider mt-5">

		<Carousel
			additionalTransfrom={0}
			arrows
			autoPlay
			autoPlaySpeed={5000}
			centerMode={false}
			className=""
			containerClass="container-with-dots"
			dotListClass=""
			draggable
			focusOnSelect={false}
			infinite
			itemClass=""
			keyBoardControl
			minimumTouchDrag={80}
			renderButtonGroupOutside={false}
			renderDotsOutside={false}
			dotListClass="custom-dot-list-style"
			responsive={responsive}
		>

				{state.loading ? <h3 className="container py-4 py-md-5" style={{fontSize:'16px', textAlign:'center'}}>Loading...</h3> : 
					state.posts.map(post => (

						<div className="item feedbackBox" key={post.id}>
							<div className="reviewStar">
								<span><img src={ReviewStar}/></span>
								<span><img src={ReviewStar}/></span>
								<span><img src={ReviewStar}/></span>
								<span><img src={ReviewStar}/></span>
								<span><img src={ReviewStar}/></span>
							</div>
							
							<h3>{Parser(post.title.rendered)}</h3>
							{Parser(post.content.rendered)}

							<div className="name-day">
								<span>{post._embedded.author[0].name} ,</span>
								<span><Moment fromNow>{post.date}</Moment></span>
							</div>
						</div>

					))
				}
			
			</Carousel>

			{state.error ? state.error : null }

		</div> </React.Fragment> : null}

	</React.Fragment>
	);
}

export default StudentFeedback


