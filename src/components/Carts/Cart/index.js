import React, { useState, useEffect } from 'react'
import { Card, Col, Row, Collapse, Form, InputGroup, FormControl, Button } from 'react-bootstrap'
import { MdDelete } from 'react-icons/md'
import { GiMasonJar, GiSquareBottle, GiPaperBagFolded, GiCardboardBoxClosed } from 'react-icons/gi'
import ShortUniqueId from 'short-unique-id';

import Vessel from './Vessel'

import { connect } from 'react-redux'
import { removeCart, addVessel, changeCartDetails } from '../../../redux/Cart/cart.actions'

const Cart = ({ removeOldCart, addNewVessel, changeOldCartDetails, cart, appState }) => {

    const [open, setOpen] = useState(false);
    const [cartDetails, setCartDetails] = useState({
        cartID: cart.cartID,
        cartName: cart.cartName,
        email: cart.email,
        customer: cart.customer
    })

    useEffect(() => {
        handleCartDetails(cartDetails.cartID)
    },[cartDetails]) 

    function handleRemoveCart(id) {
        removeOldCart(id)
    }

    function handleAddVessel(cartID, type) {
        const uid = new ShortUniqueId({ length: 16 });
        addNewVessel({
            cartID: cartID,
            vessel: {
                vesselName: null,
                tare: null,
                product: null,
                finalWeight: null,
                productTotalOverride: null,
                isEach: false,
                quantity: null,
                vesselType: type,
                vesselID: uid(),
                isByob: true
            }
        })
    }

    function handleCartDetails(id) {
        changeOldCartDetails({
            cartID: id,
            details: cartDetails
        })
    }

    const { products } = appState.products
    let cartTotal = 0
    if (cart.vessels.length) {
        cart.vessels.forEach(vessel => {
            if (vessel.product) {
                const vesselProd = products.find(prod => prod.id === vessel.product)
                if (vesselProd) {
                    cartTotal += vessel.productTotalOverride || ((vessel.finalWeight - vessel.tare) * vesselProd.price)
                }
            }
        })
    }

    return (
        <Card className='mt-5'>
            <Card.Header style={{cursor: 'pointer'}} onClick={(e) => {
                        if (e.target.closest("button")?.id != "deleteBtn") setOpen(!open)
                    }}>
                <Row>
                    <Col sm={10}>
                        <h3>{cart.cartName}</h3>
                    </Col>
                    <Col className='d-flex justify-content-end'>
                        <Button id="deleteBtn" variant="danger" className='d-flex align-items-center' style={{fontSize:'20px'}} 
                            onClick={() => handleRemoveCart(cart.cartID)}>
                            <MdDelete/>
                        </Button>
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col>
                        {cart.customer}
                    </Col>
                    <Col>
                        {cart.vessels.length} Vessels
                    </Col>
                    <Col>
                        {`$${cartTotal.toFixed('2')}`}
                    </Col>
                </Row>
                <Collapse in={open}>
                    <div>
                        <Form className='mt-3'>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>Cart Name</InputGroup.Text>
                                <FormControl 
                                    placeholder={cartDetails.cartName}
                                    defaultValue={cartDetails.cartName}
                                    onChange={e => {setCartDetails({
                                        ...cartDetails,
                                        cartName: e.target.value
                                    })}}>
                                </FormControl>
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>Customer</InputGroup.Text>
                                <FormControl 
                                    placeholder={cartDetails.customer}
                                    defaultValue={cartDetails.customer}
                                    onChange={e => {setCartDetails({
                                        ...cartDetails,
                                        customer: e.target.value
                                    })}}>
                                </FormControl>
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>Email</InputGroup.Text>
                                <FormControl 
                                    type='email'
                                    placeholder="name@gmail.com"
                                    defaultValue={cartDetails.email}
                                    onChange={e => {setCartDetails({
                                        ...cartDetails,
                                        email: e.target.value
                                    })}}>
                                </FormControl>
                            </InputGroup>
                            {/* <Button variant="primary" onClick={() => {
                                    handleCartDetails(cart.cartID)
                                }}>
                                Save Changes
                            </Button> */}
                        </Form>
                        <div>
                            <h4 className='my-3'>Add Vessel</h4>
                            <div style={{width:'100%'}} className="d-flex justify-content-space-evenly">
                                <Button style={{width:'100%'}} className="mx-2" variant="outline-primary"
                                    onClick={() => {handleAddVessel(cart.cartID, "jar")}}>
                                    <div className='d-flex flex-column align-items-center'>
                                        Jar
                                        <GiMasonJar size={50}/>
                                    </div>
                                </Button>
                                <Button style={{width:'100%'}} className="mx-2" variant="outline-primary"
                                    onClick={() => {handleAddVessel(cart.cartID, "bottle")}}>
                                    <div className='d-flex flex-column align-items-center'>
                                        Bottle
                                        <GiSquareBottle size={50}/>
                                    </div>
                                </Button>
                                <Button style={{width:'100%'}} className="mx-2" variant="outline-primary"
                                    onClick={() => {handleAddVessel(cart.cartID, "bag")}}>
                                    <div className='d-flex flex-column align-items-center'>
                                        Bag
                                        <GiPaperBagFolded size={50}/>
                                    </div>
                                </Button>
                                <Button style={{width:'100%'}} className="mx-2" variant="outline-primary"
                                    onClick={() => {handleAddVessel(cart.cartID, "other")}}>
                                    <div className='d-flex flex-column align-items-center'>
                                        Other
                                        <GiCardboardBoxClosed size={50}/>
                                    </div>
                                </Button>
                            </div>
                        </div>
                        {
                            cart.vessels.map((vessel) => {
                                return <Vessel key={vessel.vesselID} cartID={cart.cartID} vessel={vessel}/>
                            })
                        }
                    </div>
                </Collapse>
            </Card.Body>
        </Card>
    )
}

const mapStateToProps = (state) => ({
    appState: state
})

const mapDispatchToProps = (dispatch) => ({
    removeOldCart: (id) => dispatch(removeCart(id)),
    addNewVessel: (data) => dispatch(addVessel(data)),
    changeOldCartDetails: (data) => dispatch(changeCartDetails(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)