import { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import QuotationTable from "./QuotationTable";

import { Container, Row, Col, Form, Button } from "react-bootstrap";

import useLocalStorage from 'react-localstorage-hook'
function App() {
  const itemRef = useRef();
  const ppuRef = useRef();
  const qtyRef = useRef();
  const discountRef = useRef();

  const [dataItems, setDataItems] = useLocalStorage("dataItems",[]);

  const dummyProductList = [
    { id: "p001", name: 'AK-47 Bloodline',price: 50 },
    { id: "p002", name: "Zeus Arcana" ,price: 30 },
    { id: "p003", name: "Operation Riptide Case" ,price: 10 },
    { id: "p004", name: "Stockholm Sticker Capsule" ,price: 0.25 },
    { id: "p005", name: "Dota 2 Battle Pass" ,price: 100 },
    { id: "p006", name: "Steam Wallet" ,price: 200 },
    { id: "p007", name: "Zeus Arcana" ,price: 30 }
  ];

  const addItem = () => {
    if (itemRef.current.value == "") {
      alert("Item name is empty");
      return;
    }

    const pid = itemRef.current.value
    const product = dummyProductList.find(e => e.id === pid)
    
    var itemObj = {
      item: product.name,
      ppu: ppuRef.current.value,
      qty: qtyRef.current.value,
      dis: discountRef.current.value,
    };

    dataItems.push(itemObj);
    setDataItems([...dataItems]);
    // setDataItems(dataItems)
    console.log("after", dataItems);
  };

  const productChange = (e) => {
    const pid = itemRef.current.value;
    const product = dummyProductList.find((e) => e.id === pid);
    ppuRef.current.value = product.price
  }

  const options = dummyProductList.map(v => {
    return <option value={v.id}>{v.name}</option>
  })

  return (
    <Container>
      <Row>
        <Col xs={5} style={{ backgroundColor: "#eaeaea" }}>
          <Form>
            <Form.Group className="mb-3" controlId="formItem">
              <Form.Label>Item</Form.Label>
              <Form.Select
                aria-label="Default select example"
                ref={itemRef}
                onChange={productChange}
              >
                {options}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price Per Unit"
                ref={ppuRef}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formQauntity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" placeholder="Quantity" ref={qtyRef} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDiscount">
              <Form.Label>Discount</Form.Label>
              <Form.Control type="number" placeholder="Discount" ref={discountRef} />
            </Form.Group>

            <Button variant="outline-dark" onClick={addItem}>
              Add
            </Button>
          </Form>
        </Col>
        <Col>
          <QuotationTable data={dataItems} setDataItems={setDataItems} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
