
import React, {useReducer, useEffect} from 'react'
import './style.scss'
import axios from 'axios' 
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
				error: 'Someting Went Wrong'
			}
		default: 
			return state
	}
}


function Whyanutama() {

	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		axios.get('https://studentportal.anutamaskillsacademy.com/wp-json/wp/v2/posts?categories=37&per_page=100&_embed')
		.then(response => {
			dispatch({type:'FETCH_SUCCESS', payload:response.data})
		})
		.catch(error => {
			dispatch({type:'FETCH_ERROR'})
		})

	}, [])

	return (
		<React.Fragment>
			<div className="row justify-content-center">
				{ 
					state.posts.map(post => (
						
						<div className="col col-12 col-md-9 col-lg-10 mb-4 mb-lg-4 px-2" key={post.id}>
							<div className="why-anutama-box">
								<div className="iconBox">
									<div className="icon">
										<img src={post._embedded['wp:featuredmedia']['0'].source_url} alt={post.title.rendered}/>
									</div>
								</div>
				
								<div className="textBox">
									<h3>{Parser(post.title.rendered)}</h3>
									{Parser(post.content.rendered)}
								</div>
								
							</div>	
						</div>

					))
				}

				{state.error ? state.error : null }
			</div>
		</React.Fragment>
	)
}

export default Whyanutama


