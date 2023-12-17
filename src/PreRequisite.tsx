/* eslint-disable no-extra-parens */
//Prettier was just being annoying, even though the code was syntactically correct
import React from "react";
import { course } from "./PlannerInterfaces/course";
import { semester } from "./PlannerInterfaces/semester";

export function PreReqs({
    allSemesters,
    semester
}: {
    allSemesters: semester[];
    semester: semester;
}): JSX.Element {
    const failedPreReqs: string[] = [];
    function checkCoursePreReq(course: course) {
        if (course.preReq === "") {
            return;
        }
        let preReqSem = false;
        let foundPreReq = false;
        allSemesters.forEach((sem: semester) => {
            if (sem.id === semester.id) {
                preReqSem = true;
            }
            if (preReqSem) {
                return;
            }
            //Check each courseID in the semester to see if it matches the prereq
            sem.courses.forEach((prevCourse: course) => {
                if (course.preReq.search(prevCourse.courseID) !== -1) {
                    foundPreReq = true; //Becomes true if courseID matched the prereq
                }
            });
        });
        if (!foundPreReq) {
            failedPreReqs.push(course.courseID + " requires " + course.preReq);
        }
    }
    //Go through each course in the semester and see if prereqs are met
    semester.courses.forEach((currentCourse: course) =>
        checkCoursePreReq(currentCourse)
    );
    return (
        <div>
            {failedPreReqs.map((missingReq: string) => (
                <p key={missingReq}>{missingReq}</p>
            ))}
        </div>
    );
}
