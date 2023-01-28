import React, {useState} from 'react'
import AddGpa from '../components/dashboard/AddGpa';
import '../components/dashboard/dash.css'

function Landing() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [allResults, setAllResults] = useState([])
  const [commulativeGpa, setCommulativeGpa] = useState(null);


const addResultHandler = (result) => {
  console.log(result);
  setAllResults([...allResults, result]);
}

const calculateTotalGpa = () => {
  let total = 0;
  allResults.map((result) => {
    total += parseFloat(result.score);
    return null
  });
  console.log(total, allResults?.length);
  setCommulativeGpa(total / allResults?.length);
}

  return (
    <div className='dashboard'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12 col-lg-12 '>
            <h1 className='display-9'>GPA Dashboard</h1>
          </div>
          <button
            className='btn btn-danger mt-4'
            onClick={() => setShowAddForm(!showAddForm)}
          >
            Add a gpa
          </button>
        </div>
        {showAddForm && (
          <div>
            <AddGpa
              allResults={allResults}
              onAddResult={addResultHandler}
              calculateTotalGpa={calculateTotalGpa}
            />
          </div>
        )}

        <div className='list_cont'>
          {commulativeGpa && <h3>CGPA: {Number(commulativeGpa)?.toFixed(2)}</h3>}
          {allResults?.map((r, i) => (
            <div className='note' key={i}>
              <div className='left'>
                <div className='title'>
                  Sem: {r?.semester} / {r?.year}
                </div>
                <div className='desc'>
                  {r?.subject?.code} {r?.subject?.name}
                </div>
              </div>
              <div className='right'>
                <div className='title'>Gpa: {r?.score}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default (Landing)
