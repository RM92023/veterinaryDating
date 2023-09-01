import { useState, useEffect } from 'react'
import PatientList from "./components/PatientList"
import Form from "./components/Form"
import Header from "./components/Header"

function App() {

  const [patients, setPatients] = useState(JSON.parse(localStorage.getItem('patients')) ?? [])//cambié [] por ese código
  const [patient, setPatient] = useState({})

  // useEffect(() => {
  //   const getLocalStorage = () => {
  //     const patientsLocalStorage = JSON.parse(localStorage.getItem('patients')) ?? [];
  //     setPatients(patientsLocalStorage);
  //   }
  //   getLocalStorage();
  // }, []);//arreglo vacío ejecuta una vez

  useEffect(() => {
    localStorage.setItem("patients", JSON.stringify(patients));
  }, [patients])

  const deletePatients = (id) => {
    const updatePatients = patients.filter(patient => patient.id !== id);
    setPatients(updatePatients);
  }

  return (
    <div className="container mx-auto mt-20">
      <Header />
      <div className="mt-12 md:flex">
        <Form  patients={patients} setPatients={setPatients} patient={patient}  setPatient={setPatient} />
        <PatientList patients={patients} setPatient={setPatient} deletePatients={deletePatients} />
      </div>
    </div>
  )
}

export default App
