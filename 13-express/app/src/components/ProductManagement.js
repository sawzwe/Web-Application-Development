import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import style from "../mystyle.module.css";

export default function ProductManagement() {
  const API_URL = process.env.REACT_APP_API_URL;

  const [products, setProducts] = useState([]);
  const [productRows, setProductRows] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((data) => {

        const rows = data.map((e) => {
          return (
            <tr>
              <td>####</td>
              <td>{e.code}</td>
              <td>{e.name}</td>
              <td>{e.price}</td>
            </tr>
          )
        })

        setProducts(data);
        setProductRows(rows);
      });
  }, []);

  return (
    <Container>
      <h1>Product Management</h1>
      API_URL: {API_URL}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ width: "20px" }}>&nbsp;</th>
            <th className={style.textCenter}>Code</th>
            <th className={style.textCenter}>Name</th>
            <th className={style.textCenter}>Price/Unit</th>
          </tr>
        </thead>
        <tbody>
          {productRows}
        </tbody>
      </Table>
    </Container>
  );
}
