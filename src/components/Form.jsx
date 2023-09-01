import { useState, useEffect } from "react"
import Error from "./Error";
import Patients from "./Patients";

const Form = ({ patients, setPatients, patient, setPatient }) => {

  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
      if ( Object.keys(patient).length > 0 ) {
        setName(patient.name)
        setOwner(patient.owner)
        setEmail(patient.email)
        setDate(patient.date)
        setSymptoms(patient.symptoms)
      }
  }, [patient])

  const handleSubmit = (e) => {
    e.preventDefault();
  
  const idGenerate = () =>{
    const random = Math.random().toString(36).substring(2);
    const date = Date.now().toString(36);

    return random + date;
  }

    if( [ name, owner, email, date, symptoms ].includes('') ){
      setError(true);
      return;
    }
    setError(false);

    //patients Object
    const patientObject = {
      name,
      owner,
      email,
      date,
      symptoms
    }

    if(patient.id){
      //edit register
      patientObject.id = patient.id;

      const updatePatients = patients.map( statePatient => statePatient.id === patient.id ? patientObject : statePatient);

      setPatients(updatePatients);
      setPatient({});

    }else{
      //new register
      patientObject.id = idGenerate();
      setPatients([...patients, patientObject]);
    }


    //Restart the form
    setName('');
    setOwner('');
    setEmail('');
    setDate('');
    setSymptoms('');
  }

  return (
    <div className="md:w-1/2 lg:w-2/5">
      <h2 className="font-black text-3xl text-center">Monitoring Patients</h2>
      <p className="text-lg mt-5 text-center mb-10">Add Patients and {''}
        <span className="text-indigo-600 font-bold">Manage Them</span>
      </p>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg py-10 px-5 mb-10 mx-5">
        {error && <Error>Todos los Campos son obligatorios</Error>}
        <div className="mb-5">
          <label htmlFor="pet" className="block text-gray-700 uppercase">Pet Name</label>
          <input id="pet" type="text" placeholder="Pet Name" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="mb-5">
          <label htmlFor="owner" className="block text-gray-700 uppercase">Owner Name</label>
          <input id="owner" type="text" placeholder="Owner Name" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" value={owner} onChange={(e) => setOwner(e.target.value)}/>
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase">Email</label>
          <input id="email" type="email" placeholder="Contact Owner Email" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>

        <div className="mb-5">
          <label htmlFor="toDischarge" className="block text-gray-700 uppercase">Discharge Date</label>
          <input id="toDischarge" type="date" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"value={date} onChange={(e) => setDate(e.target.value)}/>
        </div>

        <div className="mb-5">
          <label htmlFor="toDischarge" className="block text-gray-700 uppercase">symptoms</label>
          <textarea id="symptoms" className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" placeholder="describe the symptoms" value={symptoms} onChange={(e) => setSymptoms(e.target.value)}/>
        </div>

        <input type="submit" className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors" value={patient.id ? "Edit Patient" : "Add Patient"} />

      </form>
    </div>
  )
}
export default Form
