import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import BackgroundImage from './BackgroundImage'
import './SingleModel.css'


class AsNavFor extends Component {
	slideNavRef = null
	state = {
		activeModel: 0
	}

	handleSlideNav = (direction) => {
		const sliderNav = this.slideNavRef
		const sliderWidth = sliderNav.offsetWidth

		let scrollPos = direction 
			? sliderNav.scrollLeft + sliderWidth
			: sliderNav.scrollLeft - sliderWidth

		sliderNav.scroll({
		  top: 0, 
		  left: scrollPos, 
		  behavior: 'smooth' 
		})
	}
	

	render() {
		const { firstName, height, waist, bust, hips, size, shoeSize, hair, eyes, imagePortfolio, collection } = this.props

		console.log(collection)

	    return (		
		    <section className='section--model-profile'>
				<div className='container'>
					<div className='archive-link title'>
						<Link  to={`/models/${collection.toLowerCase()}`}><span>&larr;</span> Back to All</Link>
					</div>	
					<div className='section--model-profile-info'>
						{firstName && <h2>{firstName}</h2>}
						{collection && <p className='category title'>{collection}</p>}
						<div className='section--model-profile-spec-info'>
							<p className='spec-title title'>Height</p>
							{height && <p className='spec-content'>{height}</p>}
							<p className='spec-title title'>{['Women', 'Girls'].includes(collection) ? 'Bust' : 'Chest'}</p>
							{bust && <p className='spec-content'>{bust}</p>}
							<p className='spec-title title'>Waist</p>
							{waist && <p className='spec-content'>{waist}</p>}
							<p className='spec-title title'>Hips</p>
							{hips && <p className='spec-content'>{hips}</p>}
							<p className='spec-title title'>Size</p>
							{size && <p className='spec-content'>{size}</p>}
							<p className='spec-title title'>Shoe Size</p>
							{size && <p className='spec-content'>{shoeSize}</p>}
							<p className='spec-title title'>Hair</p>
							{hair && <p className='spec-content'>{hair}</p>}
							<p className='spec-title title'>Eyes</p>
							{eyes && <p className='spec-content'>{eyes}</p>}
						</div>
					</div>
					<div className='section--model-profile-images'>
						<div className='portfolio-images-slider'>
							{imagePortfolio.map((portfolioItem, index) => {
								return <div 
									key={`slider-nav-${index}`} 
									className={`section--model-profile-slide ${this.state.activeModel === index 
										? 'active'
										: ''
									}`}
								>
									{portfolioItem.image && <BackgroundImage src={portfolioItem.image} imageSize={900} />}
								</div>
							})}
						</div>
						<div className='profile-images-nav' ref={el => {this.slideNavRef = el}}>
							{imagePortfolio.map((portfolioItem, index) => {
								return <div 
									key={`slider-nav-${index}`} 
									className={`section--model-profile-nav-slide ${this.state.activeModel === index 
										? 'active'
										: ''
									}`}
									onClick={() => this.setState({activeModel: index})}
								>
									{portfolioItem.image && <BackgroundImage src={portfolioItem.image} imageSize={300} />}
								</div>
							})}
						</div>
						<div className='navigation'>
							<span className='nav-link' onClick={() => this.handleSlideNav(0)}>&#8592;</span>
							<span className='nav-link' onClick={() => this.handleSlideNav(1)}>&#8594;</span>
						</div>
					</div>
				</div>
			</section>
		)
	}
}

export default AsNavFor
