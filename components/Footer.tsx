import React from 'react'

const Footer = () => {
  return (
	<footer>
	<ul>
		<li className='twitter'>
			<a href="http://twitter.com/vineapp" target="_blank" rel="noreferrer"><span className='icon-twitter'></span></a>
		</li>
		<li className='facebook'>
			<a href="https://www.facebook.com/vineapp" target="_blank" rel="noreferrer"><span className='icon-facebook'></span></a>
		</li>
		<li><a href="/p/help.html">Help</a></li>
		<li><a href="/p/contact.html">Contact</a></li>
		<li className='terms.html'><a href="/p/terms.html">Terms</a></li>
		<li className='privacy.html'><a href="/p/privacy.html">Privacy</a></li>
		<li><a href="/p/rules.html">Rules</a></li>
		<li className='copy'>© {new Date().getFullYear()} Vine Labs, Inc.</li>
	</ul>
	</footer>
  )
}

export default Footer