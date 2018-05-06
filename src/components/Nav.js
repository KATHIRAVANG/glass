import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Logo from './Logo'
import LogoScroll from './LogoScroll'
import './Nav.css'
import {ICONLogin} from './Icons'


class Nav extends Component {

	state = {
		navActive: null
	}

	componentDidMount() {
		document.addEventListener('scroll', () => {
			if(window.pageYOffset > 20 && !this.state.navActive) {
				this.setState({
					navActive: true
				})
			} else if(window.pageYOffset < 20 && this.state.navActive) {
				this.setState({
					navActive: null
				})
			}
		})
	}

	render() {
		const { header, modelTypes=[] } = this.props

		return (
			<nav className={`nav ${this.state.navActive ? 'active' : ''}`}>
			 	<div className='nav--container container'>
			      	<a href='/'><Logo /></a>
			      	<a href='/'><LogoScroll /></a>
			      	<nav>
			      		<ul>
			      			<li><Link to='/about'>About</Link></li>
			      			<li className='menu-item-has-children'>Models &#x25BE;
			      				<ul className='subMenu'>
					      			{modelTypes.map(selectedModelType => {
					      				return <li key={selectedModelType.name}>
					      					<Link to={`/models/${selectedModelType.name}`}>{selectedModelType.name}</Link>
					      				</li>
					      			})}
				      			</ul>
			      			</li>
			      			<li><Link to='/blog'>Blog</Link></li>
			      			<li><Link to='/contact'>Contact</Link></li>
			      		</ul>
			      	</nav>
			      	<div className='client-nav'>
			      		<Link className='title' to='/join-us'><ICONLogin /> Join Us</Link>
			      		<a className='button' href={`${header.buttonUrl}`}>{header.buttonText}</a>
			      	</div>	
				   	<div id="mobile-menu">
	                    <span></span>
	                    <span></span>
	                    <span></span>
	                </div>
			  	</div>
			</nav> 
		)
	}
}

export default Nav
