import { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";

import { FaTrash } from 'react-icons/fa';


const styles = {
  textCenter: { textAlign: "center" },
  textRight: { textAlign: "right" },
};



function GradeTable({ data, setDataItems }) {
  const [dataRows, setDataRows] = useState();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceDis, setTotalPriceDis] = useState(0);

  useEffect(() => {
    let sum = 0;
    let discountSum=0;
    
    const z = data.map((v, i) => {

      let discountPrice=v.dis*1;
      let total=v.qty * v.point;

      if(total>discountPrice){

        let total1=v.qty * v.point;
        discountSum+=discountPrice;
        let amount1 = total1-v.dis;
        sum += amount1;
        return (
          <tr key={i}>
            <td><FaTrash onClick={() => deleteClick(i)}/></td>
            <td style={styles.textCenter}>{v.code}</td>
            <td style={styles.textCenter}>{v.sub}</td>
            <td style={styles.textCenter}>{v.qty}</td>
            <td>{v.grade}</td>
            <td style={styles.textRight}>{numberWithCommas(v.point)}</td> 
          </tr>
        
        );
            
        
      }
      
      else{

        return (
          <tr key={i}>
            <td><FaTrash onClick={() => deleteClick(i)}/></td>
            <th colSpan={5} style={styles.textCenter}>Delete Record !</th>
          </tr>
          
          );

      }

     
    });

    setDataRows(z);
    setTotalPriceDis(discountSum);
    setTotalPrice(sum);
  }, [data]);

  const deleteClick = (i) => {
    data.splice(i,1)
    setDataItems([...data])
  }



  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const clearTable = () => {
    setDataItems([]);
    setDataRows([]);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Course Table</h1>
        </Col>
        <Col style={styles.textRight}>
          <Button onClick={clearTable} variant="dark">
            Clear
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr style={{ backgroundColor: "Black", color: "white" }}>
            <th></th>
            <th>Code</th>
            <th>Course</th>
            <th>Credits</th>
            <th>Grade</th>
            <th>GPA Point</th>
          </tr>
        </thead>
        <tbody>{dataRows}</tbody>
        <tfoot>
          <tr>
            <th colSpan={4}></th>
            <th style={styles.textCenter}>C GPA</th>
            <th style={styles.textRight}>{numberWithCommas(totalPrice)}</th>
          </tr>
        </tfoot>
      </Table>
      <Row>
        <Col>
          <h2>Semester Table</h2>
        </Col>
        <Col style={styles.textRight}>
          <Button onClick={clearTable} variant="dark">
            Clear
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default GradeTable;
