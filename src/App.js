import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function App() {
  return (
    const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost/Campus-Mart-Server/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'userToken ' + btoa('password')
      },
      body: JSON.stringify({ product: 'HELLO' })
    })
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])
  return (
    <Container>
      <Row>
        {
          products?.map((product) =>
            <Col sm={6} lg={4} xl={3} className="p-2" key={product.id}>
              <div className="rounded shadow bg-white">
                <Link to={`/product/${product.id}`}>
                  <div className="text-center">
                    <img src={product.imageURL} width="150" height="140" alt="" />

                    <h5 className="mt-1">{product.product_name}</h5>
                    <h4>&#2547; {product.price}</h4>
                  </div>
                </Link>
                <div className="p-2 text-center">
                  <select name="" id="" className="w-75 my-2">
                    <option value="1">1 Kg</option>
                    <option value=".5">0.5 Kg</option>
                  </select>
                </div>
              </div>
            </Col>
          )
        }
      </Row>
    </Container>
  );
  );
}

export default App;
