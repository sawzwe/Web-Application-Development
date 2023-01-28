import { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useLocalStorage } from "react-use";
import QuotationTable from "./QuotationTable";

// const dummyProducts = [
//   { code: "p001", name: "Product A", price: 100 },
//   { code: "p002", name: "Product B", price: 200 },
//   { code: "p003", name: "Product C", price: 150 },
//   { code: "p004", name: "Product D", price: 250 },
// ];
const API_URI = "http://localhost:3001/";

function App() {
  const itemRef = useRef();
  const priceRef = useRef();
  const qtyRef = useRef();

  const [localDataItems, setLocalDataItems, remove] = useLocalStorage(
    "data-items",
    JSON.stringify([])
  );
  // const [dataItems, setDataItems] = useState([]);
  const [dataItems, setDataItems] = useState(JSON.parse(localDataItems));

  const [products, setProducts] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    // let x = JSON.parse(products)
    // console.log(typeof(x),x)
    fetch(API_URI + "products")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const z = data.map((v) => (
          <option key={v.code} value={v.code}>
            {v.name}
          </option>
        ));
        setProducts(data);
        setProductOptions(z);
      });
  }, []);

  const addItem = () => {
    let item = products.find((v) => itemRef.current.value === v.code);
    console.log(item);
    var itemObj = {
      code: item.code,
      name: item.name,
      price: priceRef.current.value,
      qty: qtyRef.current.value,
    };

    dataItems.push(itemObj);
    setDataItems([...dataItems]);
    setLocalDataItems(JSON.stringify(dataItems));
    console.log("after", dataItems);
  };

  const updateDataItems = (dataItems) => {
    setDataItems([...dataItems]);
    setLocalDataItems(JSON.stringify(dataItems));
  }

  const clearDataItems = () => {
    setDataItems([]);
    setLocalDataItems(JSON.stringify([]));
  };

  const productChange = () => {
    console.log("productChange", itemRef.current.value);
    let item = products.find((v) => itemRef.current.value === v.code);
    console.log("productChange", item);
    priceRef.current.value = item.price;
    console.log(priceRef.current.value);
  };

  return (
    <Container>
      <Row>
        <Col md={4} style={{ backgroundColor: "#e4e4e4" }}>
          <Row>
            <Col>
              Item
              <Form.Select ref={itemRef} onChange={productChange}>
                {productOptions}
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Price Per Unit</Form.Label>
              <Form.Control
                type="number"
                ref={priceRef}
                value={price}
                onChange={(e) => setPrice(priceRef.current.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" ref={qtyRef} defaultValue={1} />
            </Col>
          </Row>
          <hr />
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={addItem}>
              Add
            </Button>
          </div>
          {/* {JSON.stringify(dataItems)} */}
        </Col>
        <Col md={8}>
          <QuotationTable
            data={dataItems}
            clearDataItems={clearDataItems}
            updateDataItems={updateDataItems}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
