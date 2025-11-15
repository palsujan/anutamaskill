
import React, {useState, useReducer, useEffect} from 'react'
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


function FaqsList(props) {

	const [state, dispatch] = useReducer(reducer, initialState);
	const [faq, faqSet] = useState({faqToggle:false});

	useEffect(() => {
		axios.get('https://studentportal.anutamaskillsacademy.com/wp-json/wp/v2/posts?categories=34&per_page=100&_embed')
		.then(response => {
			dispatch({type:'FETCH_SUCCESS', payload:response.data})
		})
		.catch(error => {
			dispatch({type:'FETCH_ERROR'})
		})

	}, [])
	

	const faqContentFun = (event) => { 
		!faq.faqToggle ? faqSet({faqToggle:true}) : faqSet({faqToggle:false})
			
		event.target.parentElement.parentElement.classList.toggle('expend');
	
		event.target.textContent = !faq.faqToggle? '-' : '+'
		
	}

	return (
		<React.Fragment>

			{ 
				state.posts.map(post => (

					<div className="faqscol" key={post.id}>
						<div id={post.id} className="faqTitle">
							<h3>{Parser(post.title.rendered)}</h3>
							<span className="toggleBtn" onClick={faqContentFun.bind(this)}>+</span>
						</div>
						<div className="faqContent">

							{Parser(post.content.rendered)}

						</div>
					</div>

				))
			}

			{state.error ? state.error : null }
			
		</React.Fragment>
	)
}

export default FaqsList


