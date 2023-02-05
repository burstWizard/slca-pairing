import { PlusCircleIcon, CheckIcon, XMarkIcon, PlusSmallIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";


export default function Roster({section}){

    const [roster, setRoster] = useState();
    const [newSchoolName, setNewSchoolName] = useState("");
    const [addNew, setAddNew] = useState(false);

    async function fetchRoster(){
        
        
        await fetch("/api/roster?sectionId=" + section)
            .then((res)=>res.json())
            .then((data)=>{
                
                setRoster(data.roster)})
    }

    useEffect(()=>{
        
        fetchRoster();
    },[section])

    async function addNewSchool(){
        await fetch("/api/roster", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({school: newSchoolName, sectionId: section, setting: "school"}),
        })
        fetchRoster();
        setAddNew(false);
        setNewSchoolName("");
    }

    async function addNewStudent(name, school){
        //send request with name, school, section, tourney
        
        await fetch("/api/roster", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({schoolId: school.id, student: name, sectionId: section, setting: "student"}),
        })
        fetchRoster();

    }
    
    return(
        <div>
            {roster && roster.map((schoolPack, index)=>{
                return(<SchoolDisplay schoolPack={schoolPack} key={index} addNewStudent={addNewStudent} />)
            })}
            {roster && roster.length == 0 &&
                <div>
                    <p className="font-bold mb-2">No Schools Currently Added.</p>
                </div>
            }
            {addNew ? 
                <div>
                    <div className='flex items-center space-x-2'>
                        <input value = {newSchoolName} onChange = {(e)=>setNewSchoolName(e.target.value)} className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="New School Name" />
                        <button onClick={()=>addNewSchool()} className="bg-green-500 hover:bg-green-700 text-white font-bold rounded">
                            <CheckIcon className='h-8 w-8' />
                        </button>
                        <button onClick = {()=>setAddNew(false)} className="bg-red-500 hover:bg-red-700 text-white font-bold rounded">
                            <XMarkIcon className='h-8 w-8' />
                        </button>
                    </div>
                </div>
                :
                <div onClick={()=>setAddNew(true)} className='flex items-center space-x-2 font-bold py-2 px-2 pmb-4 bg-purple-500 hover:bg-purple-700 text-white transition ease-in-out cursor-pointer max-w-fit'>
                    <PlusCircleIcon className='h-6 w-6 '/>
                    <h1>Add New School</h1>
                </div>
            }
        </div>
    )
}

function SchoolDisplay({schoolPack, addNewStudent}){
    const [addNew, setAddNew] = useState(false)
    const [newStudentName, setNewStudentName] = useState("")

    return(
        <div>
            <h1 className='font-bold text-purple-500 '>{schoolPack[0].name}</h1>
            {schoolPack[1].map((student, index)=>
                <p key = {index}>{student.name}</p>
            )}
            {addNew ? 
                <div className='flex items-center space-x-2'>
                    <input value={newStudentName} onChange = {(e)=>setNewStudentName(e.target.value)} className="my-1 appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Player Name" />
                    <button onClick = {()=>{
                        addNewStudent(newStudentName, schoolPack[0]);
                        setNewStudentName("");
                        setAddNew(false)
                    }} className="bg-green-500 hover:bg-green-700 text-white font-bold  rounded">
                        <CheckIcon className='h-6 w-6' />
                    </button>
      
                    <button onClick = {()=>setAddNew(false)} className="bg-red-500 hover:bg-red-700 text-white font-bold  rounded">
                        <XMarkIcon className='h-6 w-6' />
                    </button>
                </div>
                :
                <div onClick = {()=>setAddNew(true)} className='flex items-center hover:bg-gray-200 rounded max-w-fit cursor-pointer transition ease-in-out'>
                    <PlusSmallIcon className='h-5 w-5'/>
                    <p className='mr-1 underline'>Add a New Player</p>
                </div>
            }
            <hr className="my-2"/>
        </div>
    )
}