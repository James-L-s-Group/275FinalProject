import React, { useState } from "react";
import { plan } from "./PlannerInterfaces/plan";
import { course } from "./PlannerInterfaces/course";
import { semester } from "./PlannerInterfaces/semester";
import { Button } from "react-bootstrap";
import { CSVLink } from "react-csv";

export function ExportToCSV({ degreePlan }: { degreePlan: plan }): JSX.Element {
    const [planContent] = useState<plan>(degreePlan);
    function mapOutCourses() {
        const theCourses = planContent.semesters.map(
            (semester: semester): string => {
                return semester.courses
                    .map(
                        (course: course): string =>
                            `${course.id}, ${course.courseID}, ${course.credits}, ${course.name}, ${course.preReq}`
                    )
                    .join("$");
            }
        );
        return theCourses;
    }

    /*`"${course.id}, ${course.name}, ${course.credits}, ${course.courseId}, ${course.preReq}"`*/

    function download() {
        const exclusiveContent = planContent.semesters
            .map(
                (semesters): string =>
                    `${semesters.id},
                ${semesters.name},
                ${semesters.year},
                ${mapOutCourses()},
                ${semesters.season}`
            )
            .join("\n");
        const blobbed = new Blob([exclusiveContent], {
            type: "text/csv;charset=utf-8;"
        });
        const url = URL.createObjectURL(blobbed);
        const linkUp = document.createElement("a");
        linkUp.setAttribute("href", url);
        linkUp.setAttribute("download", exclusiveContent);
        linkUp.click();
    }
    function mapNDownload() {
        download();
    }
    return (
        <div>
            <CSVLink
                data={[degreePlan]}
                filename={"My-CSV-file.csv"}
                className="btn btn-primary"
                target="_blank"
            >
                Download this plan as well
            </CSVLink>
            <Button onClick={mapNDownload}>Export to CSV</Button>
        </div>
    );
}
