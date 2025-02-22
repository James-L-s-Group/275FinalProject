/* eslint-disable no-extra-parens */
//Something was syntactically correct, but prettier was being annoying and clicking the fix button made it worse
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { plan } from "./PlannerInterfaces/plan";
import { semester } from "./PlannerInterfaces/semester";
import { DisplaySemester } from "./SemesterTable";
import { DegreeRequirements } from "./DegreeReqs";
import { ExportToCSV } from "./ExportToCSV";

export function Plan({
    degreePlans,
    setDegreePlans,
    currentPlan
}: {
    degreePlans: plan[];
    setDegreePlans: (newDegreePlans: plan[]) => void;
    currentPlan: plan;
}): JSX.Element {
    //AAAAAAAAAAAAHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH
    const [degreeReqView, toggleDegreeReqView] = useState(false);
    const [plan, setPlan] = useState<plan>({ ...currentPlan });
    const [edit, setEdit] = useState<boolean>(false);

    function insertSemester(id: string) {
        const newSemesters = [...plan.semesters];
        const insertIndex =
            newSemesters.findIndex((semester: semester) => semester.id === id) +
            1;
        newSemesters.splice(insertIndex, 0, {
            id: "",
            name: "New " + plan.semesters[insertIndex - 1].name,
            year: plan.semesters[insertIndex - 1].year,
            courses: [],
            season: ""
        }); //Add new semester
        setPlan({ ...plan, semesters: newSemesters }); //Update plan
    }
    //Delete a semester
    function deleteSemester(id: string) {
        const newSemesters = [...plan.semesters];
        newSemesters.splice(
            newSemesters.findIndex((semester: semester) => semester.id === id),
            1
        ); // Find a remove plan by id
        setPlan({ ...plan, semesters: newSemesters }); //Update plan
    }
    function saveChanges() {
        const replaceIndex = degreePlans.findIndex(
            (current: plan) => current.id === plan.id
        );
        const newDegreePlans = [...degreePlans]; //Makes a copy of the old list of plans
        newDegreePlans.splice(replaceIndex, 1, plan); //Replaces the old plan in the list with our local version
        setDegreePlans(newDegreePlans);
    }

    function clearAllSemesters() {
        setPlan({ ...plan, semesters: [] });
    }

    function addSemester() {
        setPlan({
            ...plan,
            semesters: [
                ...plan.semesters,
                {
                    id: "",
                    name: "New Semester",
                    year: 2023,
                    courses: [],
                    season: ""
                }
            ]
        });
    }
    function editPlanName(event: React.ChangeEvent<HTMLInputElement>) {
        setPlan({ ...plan, name: event.target.value });
    }
    return (
        <div>
            {edit ? (
                <div>
                    <Form.Group className="dropdownWidth" controlId="planName">
                        <Form.Label>Name of Plan: </Form.Label>
                        <Form.Control
                            value={plan.name}
                            onChange={editPlanName}
                        />
                    </Form.Group>
                    <Button onClick={() => setEdit(false)} className="btn">
                        Stop Editing
                    </Button>
                </div>
            ) : (
                <div>
                    <h1>
                        {plan.name}{" "}
                        <Button
                            onClick={() => setEdit(true)}
                            className="btntransparent"
                        >
                            Edit Name
                        </Button>
                    </h1>
                </div>
            )}
            {plan.semesters.map((semester: semester) => (
                <div key={semester.id}>
                    <DegreeRequirements
                        show={degreeReqView}
                        setShow={toggleDegreeReqView}
                        userSemesters={plan.semesters}
                    ></DegreeRequirements>
                    <DisplaySemester
                        semester={semester}
                        plan={plan}
                        updatePlan={setPlan}
                    ></DisplaySemester>
                    <Button
                        className="btnadd"
                        onClick={() => insertSemester(semester.id)}
                    >
                        Insert New Semester
                    </Button>
                    <Button
                        className="btncancel"
                        onClick={() => deleteSemester(semester.id)}
                    >
                        Delete This Semester
                    </Button>
                </div>
            ))}
            <Button className="btnadd" onClick={() => addSemester()}>
                Add Semester
            </Button>
            <Button className="btnadd" onClick={() => saveChanges()}>
                Save Changes
            </Button>
            <Button className="btncancel" onClick={() => clearAllSemesters()}>
                Delete All Semesters
            </Button>
            <br></br>
            <span></span>
            <div>
                <Button
                    className="btnsave"
                    onClick={() => ExportToCSV({ degreePlan: currentPlan })}
                >
                    Export plan as CSV
                </Button>
            </div>
        </div>
    );
}
