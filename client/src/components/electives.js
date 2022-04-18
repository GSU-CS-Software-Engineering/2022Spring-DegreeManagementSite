import React, { useState, useEffect } from "react"
import axios from "axios";



function ElectivesTable() {
  
    const [course, setCourses] = useState([]);

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

    return (
        <div className="flex mb-10">
            <div className="bg-stone-800 items-center p-4 w-screen rounded-md">
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg text-left text-lg font-bold">
                    <div className="bg-stone-800 items-center p-4 w-full rounded-md font-bold">
                        Electives
                    </div>
                    <table class="w-full text-sm text-left text-white-500 dark:text-white-400">
                        <thead class="text-xs text-white-700 uppercase bg-white-50 dark:bg-white-700 dark:text-white-400">
                            <tr>
                                <th scope="col" class="px-1 py-3"></th>
                                <th scope="col" class="px-6 py-3">
                                    Course Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Course ID
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Credits
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Grade
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {course.map((courses) => (
                                <tr class="bg-gray border-b dark:bg-black-800 dark:border-white-700">
                                    <th className="w-6 h-6 dark:text-white">
                                    <svg class="w-6 h-6 dark:text-white" fill="none" stroke="#2BB673" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    </th>
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                        {courses.courseName}
                                    </th>
                                    <td class="px-6 py-4">
                                        {courses.courseRan}
                                    </td>
                                    <td class="px-6 py-4">
                                        {courses.credits}
                                    </td>
                                    <td class="px-6 py-4">
                                        hmm
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default ElectivesTable;
