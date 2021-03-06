import axios from "axios";
import React, { useEffect, useState } from "react"
import Cookies from "js-cookie";
import CheckMark from "./checkmark";
import GradeCard from "./grade";

function CoreTable() {
    const [course, setCourses] = useState([]);
    var user;

    const get_courses = async () => {
        try{
            const response = await axios.get(`/course/list`);
            const jsonData = await response.data;

            console.log(jsonData);

            setCourses(jsonData);
        }catch (err){
            console.error(err.message);
        }
    };

    useEffect(() => {
        get_courses();
    }, []);

    let grades = course.map((cor) => {
    return <GradeCard id={cor._id} /> 
    })

    

   
    

    return (
        <div className="flex mb-10">
            
            <div className="bg-stone-800 items-center p-4 w-screen rounded-md">
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg text-left text-lg font-bold">
                    <div className="bg-stone-800 items-center p-4 w-full rounded-md font-bold">
                        Courses
                    </div>
                    <table class="w-full text-sm text-left text-white-500 dark:text-white-400">
                       
                            <thead class="text-xs text-white-700 uppercase bg-white-50 dark:bg-white-700 dark:text-white-400">
                            
                            <tr>
                                <th scope="col" class="px-1 py-3"></th>
                                <th scope="col" class="px-6 py-4">
                                    Course Name
                                </th>
                                <th scope="col" class="px-6 py-4">
                                    Course ID
                                </th>
                                <th scope="col" class="px-6 py-4">
                                    Credits
                                </th>
                                <th scope="col" class="px-6 py-4">
                                    Grade
                                </th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {course.map((courses) => (
                            
                                <tr class="bg-gray border-b dark:bg-black-800 dark:border-white-700">
                                    <th className="w-6 h-6 dark:text-white">
                                    <CheckMark id={courses._id} />
                                    </th>
                                    <th scope="row" class="px-6 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                        {courses.courseName}
                                    </th>
                                    <td class="px-6 py-3">
                                        {courses.courseRan}
                                    </td>
                                    <td class="px-6 py-3">
                                        {courses.credits}
                                    </td>
                                        <GradeCard id={courses._id} />
                                </tr>
                            ))}    
                       </tbody>
                     </table>
                </div>
            </div>
            
        </div>
    )
}
export default CoreTable;
