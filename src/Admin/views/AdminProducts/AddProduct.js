import { faUpload } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import Icon from '../../../components/common/Icon';
import ProductService from '../../../services/ProductService';
import ImageUploaderService from '../../../services/ImageUploaderService';

const AddProduct = () => {
    const [productData, setProductData] = useState({});
    const [spinner, setSpinner] = useState(false);
    const [message, setMessage] = useState("");

    // For getting data from form
    const handleBlur = (e) => {
        const newData = { ...productData };
        newData[e.target.name] = e.target.value;
        setProductData(newData);
    }

    // For uploading image in imgbb website
    const handleImageUpload = event => {
        const imageData = new FormData();
        imageData.append('image', event.target.files[0]);
        // setProductData(newData);

        ImageUploaderService.uploadImage(imageData)
            .then((response) => {
                if (response.status) {
                    setProductData({ ...productData, imageURL: response.imageURL })
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // For uploading tour data to the database
    const handleSubmit = (e) => {

        if (productData.imageURL) {
            setSpinner(true);
            ProductService.addProduct(productData)
                .then(response => {
                    setMessage(response.message);
                    setSpinner(false);
                })
                .catch((error) => {
                    setMessage(error.message);
                    setSpinner(false);
                })

            e.preventDefault();
        } else {
            setMessage("Please upload product photo.");
        }
    }
    return (
        <Container>
            <h3 className="border-bottom text-center">Add Product</h3>
            <p className="text-center text-warning">{message}</p>
            {
                spinner && <div className="text-center mt-3"><Spinner animation="border" /></div>
            }
            <form className="bg-light p-3 rounded mb-3" onSubmit={handleSubmit}>
                <Row>
                    <Col lg={9}>
                        <Row>
                            <Col md={4}>
                                <b>Product Name</b><br />
                                <input name="pname" onBlur={handleBlur} type="text" className="form-control" id="title" placeholder="Enter product name" required />
                            </Col>
                            <Col md={4}>
                                <b>Category</b><br />
                                <Form.Group controlId="exampleForm.SelectCustom">
                                    <select name="category_id" onBlur={handleBlur} className="form-control">
                                        <option value="">-Select Category-</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </Form.Group>
                            </Col>
                            <Col md={4}>
                                <b>Weight/Pieces</b><br />
                                <input name="weight" onBlur={handleBlur} type="text" className="form-control" id="location" placeholder="Enter Weight/Pieces" required />
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col md={4}>
                                <b>Price</b><br />
                                <input name="price" onBlur={handleBlur} type="text" className="form-control" id="time" placeholder="Enter Price" required />
                            </Col>
                            <Col md={4}>
                                <b>Photo</b><br />
                                <input name="image" onChange={handleImageUpload} type="file" className="form-control" id="image" required />
                            </Col>
                            <Col md={4}>
                                <b>Status</b><br />
                                <input name="status" onBlur={handleBlur} type="text" className="form-control" id="time" placeholder="Enter Price" required />
                            </Col>

                        </Row>
                    </Col>
                    <Col lg={3}>
                        <b>Description</b><br />
                        <textarea name="description" onBlur={handleBlur} rows={4} className="form-control" id="description" placeholder="Enter description" required></textarea>
                    </Col>
                </Row>
                <hr />
                <div className="text-center"><button className="btn btn-primary" type="submit"><Icon icon={faUpload} /> Submit</button></div>
            </form>
        </Container>
    );
};

export default AddProduct;