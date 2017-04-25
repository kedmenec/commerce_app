import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import PropTypes from 'prop-types';
import { Card, Icon, Image, Button } from 'semantic-ui-react'

class Cart extends Component {


  removeFromCart = (product) => {
    this.props.dispatch({
      type: 'REMOVE_FROM_CART_REQUEST',
      payload: product
    })
  }


  checkout = () => {
    this.props.dispatch({
      type: 'CHECKOUT_REQUEST',
    })
  }

  render () {


    if (this.props.cart.length === 0) {
      return <h1 style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        Your cart is empty.
      </h1>
    }

    // Calculate the total price of the cart.
    var total = this.props.cart.reduce((total, product) =>
      total + product.price,
      0
    )

    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <h1>Cart</h1>
        <div style={{display: 'flex', flexDirection: 'row'}}>

          { this.props.cart.map((product, i) => (
            <Card style={{width: 250, margin: 20}} key={i}>
              <Card.Content header={product.title} />
              <Card.Content description={'Colour: ' + product.colour} />
              <Card.Content description={'Category: ' + product.category} />
              <Card.Content description={'Price: ' + product.price} />
              <Card.Content extra>
                <Button basic color='red' style={{width: '100%'}} onClick={this.removeFromCart.bind(this, product)}>Remove from Cart</Button>
              </Card.Content>
            </Card>
            ))
          }
        </div>

        <div style={{margin: 20}}>
        <Card fluid>
          <h3 style={{padding: 20, textAlign: 'center'}}>Total: {total}</h3>
          <Button basic color='blue' onClick={this.checkout}>Checkout</Button>
        </Card>
        </div>

      </div>
    )
  }
}

// Pass the correct proptypes in for validation
Cart.propTypes = {
    cart: PropTypes.array
}

// Grab only the piece of state we need
const mapStateToProps = state => ({
  cart: state.cart.cart
})

const connected = connect(mapStateToProps)(Cart)

export default connected