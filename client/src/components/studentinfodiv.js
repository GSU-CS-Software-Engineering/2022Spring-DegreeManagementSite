import React, { useState, useEffect } from "react"
import data from "./mock-studentdata.json"
import Cookies from "js-cookie";
import axios from "axios";




function StudentInfoDiv() {
  var user;
  const [students, setStudents] = useState([]);//

  //Getting document list from database
  const getStudent = async () => {
    try {
      const response = await axios.get(`/user/detail/:${user.id}`);
      const jsonData = await response.data;

      console.log(jsonData);

      setStudents(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getStudent();
  }, []);

  let student = students.map((stud) => {
    return (
      <div
        lName={stud.lName}
        isThesis={stud.isThesis}
        studentId={stud.studentId}
        pathway={stud.pathway}
        gpa={stud.gpa}
        isGoodStanding={stud.isGoodStanding}
        isAppliedToGrad={stud.isAppliedToGrad}
      />
    )
  }
  )

  if (Cookies.get('userCookie')) {
    user = JSON.parse(Cookies.get('userCookie'));
  }



  return (

    <div className="flex items-center mt-5 mb-10">

      <div className="bg-stone-800 items-center p-4 w-screen rounded-md border-t-8 border-[#2BB673] whitespace-pre">
        <div class="h- p-3">
          <div class="grid grid-cols-3 gap-4 mt-2">
            <div class="h-8 bg-stone-600 rounded border-2 border-stone-400 text-white text-center">{user.fName}, {user.lName}</div>
            <div class="h-8 bg-stone-600 rounded border-2 border-stone-400 text-white text-center">{user.studentId}</div>
            <div class="h-8 bg-stone-600 rounded border-2 border-stone-400 text-white text-center">{user.id}</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-3 font-bold">
          {student}
        </div>
      </div>
    </div>
  )
}
export default StudentInfoDiv;