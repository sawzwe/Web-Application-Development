import React, { useEffect, useState, useRef } from "react";
import {
  Row,
  Col,
  Form,
  Container,
  Table,
  Button,
  Modal,
} from "react-bootstrap";
import { FaTrashAlt, FaPencilAlt, FaPlus } from "react-icons/fa";
import style from "../mystyle.module.css";
import { useNavigate } from "react-router-dom";

export default function QuotationManagement() {
  const API_URL = process.env.REACT_APP_API_URL;

  const [products, setProducts] = useState([]);
  const [productRows, setProductRows] = useState([]);
  const [show, setShow] = useState(false);
  const [modeAdd, setModeAdd] = useState(false);
  const [total, setTotal] = useState(0);
  const [product, setProduct] = useState({
    item: "",
    priceperunit: 0,
    quantity: 0,
    amount:0,
    date:""
  });

  // Input references
  const refItem = useRef();
  const refPriceperunit = useRef();
  const refQuantity = useRef();


  //Get data from the quotation database
  useEffect(() => {
    let sum = 0;
    fetch(`${API_URL}/quotations`)
      .then((res) => res.json())
      .then((data) => {
        const rows = data.map((e, i) => {
          sum=sum+e.amount;
          return (
            <tr key={i}>
              <td>
                <FaTrashAlt
                  onClick={() => {
                    handleDelete(e);
                  }}
                />
              </td>
              <td>{e.item}</td>
              <td>{e.priceperunit}</td>
              <td>{e.quantity}</td>
              <td>{e.amount}</td>
              <td>{e.date}</td>
            </tr>
          );
        });

        setProducts(data);
        setProductRows(rows);
        setTotal(sum);
      });
  }, []);



  const handleClose = () => {
    setModeAdd(false);
    setShow(false);
  };

  const handleDelete = (product) => {
    console.log(product);
    if (window.confirm(`Are you sure to delete quotation [${product.item}]?`)) {
      fetch(`${API_URL}/quotations/${product._id}`, {
        method: "DELETE",
        mode: "cors",
      })
        .then((res) => res.json())
        .then((json) => {
          // Successfully deleted
          console.log("DELETE Result", json);
          for (let i = 0; i < products.length; i++) {
            if (products[i]._id === product._id) {
              products.splice(i,1);
              break;
            }
          }

          const rows = products.map((e, i) => {
            return (
              <tr key={i}>
                <td>
                  <FaPencilAlt
                    onClick={() => {
                      handleUpdate(e);
                    }}
                  />
                  &nbsp;
                  <FaTrashAlt
                    onClick={() => {
                      handleDelete(e);
                    }}
                  />
                </td>
                <td>{e.item}</td>
                <td>{e.priceperunit}</td>
                <td>{e.quantity}</td>
                <td>{e.amount}</td>
                <td>{e.date}</td>
              </tr>
            );
          });
  
          setProducts(products);
          setProductRows(rows);     
          handleClose();
        });
    }
  };





  //const handleShow = () => setShow(true);

  const handleUpdate = (product) => {
    console.log("Update Product", product);
    console.log(refItem);
    refItem.current = product.code;

    setShow(true);
    setProduct(product);
  };

  /* const handleShowAdd = () => {
    setModeAdd(true);
    setShow(true);
  };*/


  //To change the route to the quotation building page
  let navigate = useNavigate(); 
  const routeQuotation = () =>{ 
    let path = `/react-quotation/quotation`; 
    navigate(path);
  }

  const handleFormAction = () => {
    if (modeAdd) {

      // Add new product 

      const newProduct = {
        item: refItem.current.value,
        priceperunit: refPriceperunit.current.value,
        quantity: refQuantity.current.value,
        amount: refQuantity.current.value *refPriceperunit.current.value,
        date: new Date(),
        
      };
      console.log(newProduct);

      fetch(`${API_URL}/quotations`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(newProduct), // body data type must match "Content-Type" header
      })
        .then((res) => res.json())
        .then((json) => {
          // Successfully added the product
          console.log("POST Result", json);
          products.push(json);
          const rows = products.map((e, i) => {
            return (
              <tr key={i}>
                <td>
                  <FaTrashAlt
                    onClick={() => {
                      handleDelete(e);
                    }}
                  />
                </td>
                <td>{e.item}</td>
                <td>{e.priceperunit}</td>
                <td>{e.quantity}</td>
                <td>{e.amount}</td>
                <td>{e.date}</td> 
              </tr>
            );
          });

          setProducts(products);
          setProductRows(rows);
          handleClose();
        });
    } else {
      // Update product

      /*
      const updatedProduct = {
        _id: product._id,
        code: refCode.current.value,
        name: refName.current.value,
        price: refPrice.current.value,
      };
      console.log(updatedProduct);

      fetch(`${API_URL}/products`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(updatedProduct), // body data type must match "Content-Type" header
      })
        .then((res) => res.json())
        .then((json) => {
          // Successfully updated the product
          console.log("PUT Result", json);
          for (let i = 0; i < products.length; i++) {
            if (products[i]._id === updatedProduct._id) {
              console.log(products[i], updatedProduct);
              products[i] = updatedProduct;
              break;
            }
          }

          const rows = products.map((e, i) => {
            return (
              <tr key={i}>
                <td>
                  <FaPencilAlt
                    onClick={() => {
                      handleUpdate(e);
                    }}
                  />
                  &nbsp;
                  <FaTrashAlt
                    onClick={() => {
                      handleDelete(e);
                    }}
                  />
                </td>
                <td>{e.code}</td>
                <td>{e.name}</td>
                <td>{e.price}</td>
              </tr>
            );
          });

          setProducts(products);
          setProductRows(rows);
          handleClose();
        });*/
    }
  };


  //Calculate the total quotation
  const formatNumber = (x) => {
    x = Number.parseFloat(x)
    return x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };


  return (
    <>
      <Container>
        <h1>Quotation Management</h1>
          {/*API_URL: {API_URL}*/}
        {/*<Button variant="outline-dark" onClick={handleShowAdd}>
          <FaPlus /> Add
          </Button>*/}
        <Button variant="outline-dark" onClick={routeQuotation}>
          <FaPlus /> Add More Quotation
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ width: "60px" }}>&nbsp;</th>
              <th className={style.textCenter}>Item</th>
              <th className={style.textCenter}>Price/Unit</th>
              <th className={style.textCenter}>Quantity</th>
              <th className={style.textCenter}>Amount</th>
              <th className={style.textCenter}>Purchase Date</th>
              
            </tr>
          </thead>
          <tbody>{productRows}</tbody>
          <tfoot>
          <tr>
            <td colSpan={4} className={style.textRight}>
              Total
            </td>
            <td className={style.textRight}>
              {formatNumber(total)}
            </td>
          </tr>
        </tfoot>
        </Table>
      </Container>


      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {modeAdd ? "Add New Quotation" : "Update Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>Item</Col>
              <Col>
                <input type="text" ref={refItem} defaultValue={product.item} />
              </Col>
              
            </Row>
            <Row>
              <Col>Price/Unit</Col>
              <Col>
                <input type="number" ref={refPriceperunit} defaultValue={product.priceperunit} />
              </Col>
            </Row>
            <Row>
              <Col>Quantity</Col>
              <Col>
                <input
                  type="number"
                  ref={refQuantity}
                  defaultValue={product.quantity}
                />
              </Col>
            </Row>
          </Form>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFormAction}>
            {modeAdd ? "Add" : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
