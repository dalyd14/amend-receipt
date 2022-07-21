import React, { useState, useEffect } from 'react'
import { Card, Col, Row, Form, Button, Offcanvas } from 'react-bootstrap'
import { MdDelete } from 'react-icons/md'
import { BsCloudCheckFill } from 'react-icons/bs'
import { ImCheckboxUnchecked, ImCheckboxChecked } from 'react-icons/im'

import { connect } from 'react-redux'
import { removeVessel, changeVesselDetails } from '../../../../redux/Cart/cart.actions'

import RefillProducts from './RefillProducts'

import './style.css'

const Vessel = ({removeOldVessel, appState, vessel, cartID, changeOldVesselDetails }) => {

    const [vesselDetails, setVesselDetails] = useState({
        vesselID: vessel.vesselID,
        vesselName: vessel.vesselName,
        tare: vessel.tare,
        product: vessel.product,
        finalWeight: vessel.finalWeight,
        productTotalOverride: vessel.productTotalOverride,
        isByob: vessel.isByob
    })

    const handleRemoveVessel = (data) => {
        removeOldVessel(data)
    }

    function handleVesselDetails(vesselID) {
        changeOldVesselDetails({
            cartID,
            vesselID,
            vessel: vesselDetails
        })
    }

    function handleBYO() {
        setVesselDetails({
            ...vesselDetails,
            isByob: !vesselDetails.isByob
        })
    }

    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [pickedProduct, updatePickedProduct] = useState(vessel.product)
    useEffect(() => {
        setVesselDetails({
            ...vesselDetails,
            product: pickedProduct
        })
    },[pickedProduct]) 

    useEffect(() => {
        handleVesselDetails(vesselDetails.vesselID)
    }, [vesselDetails])

    let vesselTotal = 0
    let vesselProductId
    if (pickedProduct !== vessel.product) {
        vesselProductId = pickedProduct
    } else {
        vesselProductId = vessel.product
    }
    const { products } = appState.products
    const vesselProd = products.find(prod => prod.id === vesselProductId)
    let vesselName
    if (vesselProd) {
        vesselTotal = vessel.productTotalOverride || ((vessel.finalWeight - vessel.tare) * vesselProd.price)
        vesselName = vesselProd.title
    }

    return (
        <>
        <Card className='mt-2'>
            <Card.Header>
                <Row>
                    <Col sm={2} className="d-flex align-items-center">
                        <h5 className='my-0'>{vessel.vesselType.charAt(0).toUpperCase() + vessel.vesselType.slice(1)}</h5>
                    </Col>
                    <Col sm={9}>
                        <Form.Control placeholder={vesselDetails.vesselName} defaultValue={vesselDetails.vesselName} 
                            onChange={(e) => {setVesselDetails({
                                ...vesselDetails,
                                vesselName: e.target.value
                            })}} />
                    </Col>
                    {/* <Col className='d-flex'>
                        <Button id="saveBtn" variant="success" className='d-flex w-100 justify-content-center align-items-center' style={{fontSize:'20px'}}
                            onClick={() => {handleVesselDetails(vessel.vesselID)}}>
                            <BsCloudCheckFill/>
                        </Button>
                    </Col> */}
                    <Col className='d-flex'>
                        <Button id="deleteBtn" variant="danger" className='d-flex w-100 justify-content-center align-items-center' style={{fontSize:'20px'}} 
                            onClick={() => {handleRemoveVessel({ vesselID: vessel.vesselID, cartID })}}>
                            <MdDelete/>
                        </Button>
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body>
                <Form>
                    <Row>
                        <Col sm={5} className="d-flex flex-column">
                            <span>Product:</span>
                            <Button onClick={handleShow} style={{border: '1px solid #ced4da', backgroundColor: 'white', color: '#212529'}}>
                                {vesselName || "Select Product"}
                            </Button>
                        </Col>
                        <Col sm={2}>Tare: <Form.Control type='number' placeholder={vessel.tare} defaultValue={vessel.tare} 
                            onChange={(e) => {setVesselDetails({
                                ...vesselDetails,
                                tare: e.target.value
                            })} }/>
                        </Col>
                        <Col sm={2}>Weight: <Form.Control type='number' placeholder={vessel.finalWeight} defaultValue={vessel.finalWeight} 
                            onChange={(e) => {
                                setVesselDetails({
                                    ...vesselDetails,
                                    finalWeight: e.target.value
                                })
                            } }/>
                        </Col>
                        <Col sm={2}>Total: <Form.Control type='number' 
                            placeholder={`$${vessel.productTotalOverride ? vessel.productTotalOverride.toFixed('2') : vesselTotal.toFixed('2')}`} 
                            defaultValue={`$${vessel.productTotalOverride ? vessel.productTotalOverride.toFixed('2') : vesselTotal.toFixed('2')}`} />
                        </Col>
                        <Col sm={1} className="d-flex flex-column" >BYOB: 
                            <Button style={{border: 'unset', backgroundColor: 'white', color: '#212529', outline: 'none' }} className='d-flex justify-content-start align-items-center h-100 p-0' onClick={handleBYO}>
                                {vesselDetails.isByob ? <ImCheckboxChecked style={{height: '30px', width: '30px'}}/> : <ImCheckboxUnchecked style={{height: '30px', width: '30px'}}/>}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
        <OffCanvasProducts placement='bottom' name='bottom' handleClose={handleClose} show={show} updatePickedProduct={updatePickedProduct}/>
        </>
    )
}

function OffCanvasProducts({ handleClose, show, updatePickedProduct, ...props }) {
    return (
        <Offcanvas show={show} onHide={handleClose} {...props} className="h-100">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Refill Products</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <RefillProducts updatePickedProduct={updatePickedProduct} handleClose={handleClose}/>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

const mapStateToProps = (state) => ({
    appState: state
})

const mapDispatchToProps = (dispatch) => ({
    removeOldVessel: (data) => dispatch(removeVessel(data)),
    changeOldVesselDetails: (data) => dispatch(changeVesselDetails(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Vessel)