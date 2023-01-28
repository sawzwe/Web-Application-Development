import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Navbar extends Component {
  onLogoutClick(event) {
    event.preventDefault()

    this.props.logoutUser()
  }
  render() {
    return (
      <nav
        className='navbar navbar-expand-sm navbar-light   mb-4'
        style={{ backgroundColor: '#e3f2fd' }}
      >
        <div className='container'>
          <Link className='navbar-brand' to='/'>
            {' '}
            <img
              className='img-fluid rounded'
              width={70}
              height={70}
              alt='Revision'
              src={require('../assets/Logo1.png')}
            ></img>
          </Link>

          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#mobile-nav'
          >
            <span className='navbar-toggler-icon'></span>
          </button>

          <div className='collapse navbar-collapse' id='mobile-nav'>
            <ul className='navbar-nav mr-auto'></ul>
            <ul className='navbar-nav ml-auto'></ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navbar
