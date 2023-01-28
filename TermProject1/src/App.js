import { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import GradeTable from "./GradeTable";

import { Container, Row, Col, Form, Button } from "react-bootstrap";

import useLocalStorage from 'react-localstorage-hook'
function App() {
  const gradeRef = useRef();
  const pointRef = useRef();
  const qtyRef = useRef();
  const subcodeRef = useRef();
  const subnameRef= useRef();
  const discountRef = useRef();

  const [dataItems, setDataItems] = useLocalStorage("dataItems",[]);

  const dummyProduct1List = [
    { id: "p001", name: 'AK-47 Bloodline',price: 50 },
    { id: "p002", name: "Zeus Arcana" ,price: 30 },
    { id: "p003", name: "Operation Riptide Case" ,price: 10 },
    { id: "p004", name: "Stockholm Sticker Capsule" ,price: 0.25 },
    { id: "p005", name: "Dota 2 Battle Pass" ,price: 100 },
    { id: "p006", name: "Steam Wallet" ,price: 200 },
    { id: "p007", name: "Zeus Arcana" ,price: 30 }
  ];
  const dummyGradeList = [
    { id: "g001", name: 'A' ,point:4},
    { id: "g002", name: 'A-' ,point:3.75},
    { id: "g003", name: 'B+' ,point:3.25},
    { id: "g004", name: 'B' ,point:3},
    { id: "g005", name: 'B-' ,point:2.75},
    { id: "g006", name: 'C+' ,point:2.25},
    { id: "g007", name: 'C' ,point:2},
    { id: "g008", name: 'C-' ,point:1.75},
    { id: "g009", name: 'D' ,point:1},
    { id: "g0010", name: 'F' ,point:0},
    { id: "g0011", name: 'W,I,S,U,R,TR' ,point:null},
  ]

  const addItem = () => {
    if (gradeRef.current.value == "") {
      alert("Item name is empty");
      return;
    }

    const gid = gradeRef.current.value
    const grade = dummyGradeList.find(e => e.id === gid)
    
    var itemObj = {
      code: subcodeRef.current.value,
      sub: subnameRef.current.value,
      grade: grade.name,
      point: pointRef.current.value,
      qty: qtyRef.current.value,
      dis: discountRef.current.value,
    };

    dataItems.push(itemObj);
    setDataItems([...dataItems]);
    // setDataItems(dataItems)
    console.log("after", dataItems);
  };

  const productChange = (e) => {
    const gid = gradeRef.current.value;
    const product = dummyGradeList.find((e) => e.id === gid);
    pointRef.current.value = product.point
  }

  const options = dummyGradeList.map(v => {
    return <option value={v.id}>{v.name}</option>
  })

  return (
    <Container>
      <Row>
        <Col xs={5} style={{ backgroundColor: "#eaeaea" }}>
          <Form>
          <Form.Group style={{ width: 120 }} className="mb-3" controlId="formSubjectCode">
              <Form.Label>Code</Form.Label>
              <Form.Control type="string" placeholder="Subject Code" ref={subcodeRef} />
              
            </Form.Group>

            <Form.Group  className="mb-3" controlId="formSubjectName">
              <Form.Label>Course</Form.Label>
              <Form.Control type="string" placeholder="Subject Name" ref={subnameRef} />
            </Form.Group>


            <Form.Group style={{ width: 120 }} className="mb-3" controlId="formGrade">
              <Form.Label>Grades</Form.Label>
              <Form.Select
                aria-label="Default select example"
                ref={gradeRef}
                onChange={productChange}
              >
                {options}
              </Form.Select>
              
              <Form.Group style={{ width: 120 }} className="mb-3" controlId="formPoints">
              <Form.Label>Points</Form.Label>
              <Form.Control
                type="number"
                placeholder="GPA Points"
                ref={pointRef}
              />
            </Form.Group>
            </Form.Group>


            <Form.Group style={{ width: 120 }} className="mb-3" controlId="formCredits">
              <Form.Label>Credits</Form.Label>
              <Form.Control type="number" placeholder="Credit Per Subject" ref={qtyRef} />
            </Form.Group>


            <Button variant="outline-dark" onClick={addItem}>
              Add
            </Button>
            
          </Form>
        </Col>
        <Col>
          <GradeTable data={dataItems} setDataItems={setDataItems} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
