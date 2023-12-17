/* eslint-disable no-extra-parens */
//Something was syntactically correct, but prettier was being annoying and clicking the fix button made it worse
import React, { useState } from "react";
import Modal from "react-modal";
import "./App.css";
import { plan } from "./PlannerInterfaces/plan";
import { Plan } from "./Plan";
import defaultPlans from "./Defaults.json";
import { Button, Form } from "react-bootstrap";

function App(): JSX.Element {
    const [modalIsOpen, setModalIsOpen] = useState(true);
    const [selectedPlan, setSelectedPlan] = useState<number>(0); //Selected plan, -1 if no plan selected
    let num = 0;
    const openModal = () => {
        setModalIsOpen(true);
    };
    const closeModal = () => {
        setModalIsOpen(false);
    };

    useState<number>(-1);
    const defaultPlan = defaultPlans.defaultPlans.map(
        (plan: plan): plan => ({ ...plan, id: makeID() })
    );
    function makeID(): string {
        num = num + 1;
        return num.toString();
    }
    function addPlan() {
        const newPlan = {
            id: makeID(),
            name: "New Plan",
            semesters: []
        };
        setDegreePlans([...degreePlans, newPlan]);
        setSelectedPlan(degreePlans.length);
    }
    function updateSelectedPlan(event: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedPlan(
            degreePlans.findIndex(
                (plan: plan) => plan.id === event.target.value
            )
        );
    }

    function deletePlan() {
        const newDegreePlans = [...degreePlans];
        newDegreePlans.splice(
            degreePlans.findIndex(
                (plan: plan) => plan.id === degreePlans[selectedPlan].id
            ),
            1
        );
        setDegreePlans(newDegreePlans);
        setSelectedPlan(-1);
    }
    const [degreePlans, setDegreePlans] = useState<plan[]>(defaultPlan);
    return (
        <div className="App">
            <header className="App-header">UD Course Planner</header>
            <p>
                James Lloyd, Kerry Ferguson, Matthew Conlon, Caleb Sachetti,
                Arnav Baliyan.
            </p>
            <div>
                <button
                    id="openModalBtn"
                    onClick={openModal}
                    title="Open Modal"
                >
                    Need Help?
                </button>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal"
                    className="custom-modal"
                    overlayClassName="custom-overlay"
                >
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>
                            &times;
                        </span>
                        <p>
                            <b>Getting Started:</b>
                        </p>
                        <p>
                            Click the button labeled <b>Add New Plan</b> to
                            create a plan. You can rename it by clicking the{" "}
                            <b>Edit Name</b> button. Use the <b>Stop Editing</b>{" "}
                            button to save whatever name you have. Use the{" "}
                            <b>Save Plan Changes</b> button to have the plan
                            show up in the dropdown that contains all plans
                            (including samples).
                        </p>
                        <p>
                            You can use the button labeled <b>Add Semester</b>{" "}
                            to (you guessed it) add a semester. Use the drop
                            down menus to select the season and year. You can
                            name the semester with the <b>Edit Semester Name</b>{" "}
                            button. To add a course, use the <b>Add Course</b>{" "}
                            button. To clear the semester, use the{" "}
                            <b>Remove All Courses</b> button.
                        </p>
                        <p>
                            When selecting a course, type your course code and
                            click on the course to confirm your selection. You
                            can then use the <b>Add Course</b> button to add it
                            to your semester. You can use the <b>Edit Course</b>{" "}
                            button at any point to change these courses. To save
                            your changes, use the <b>Save Plan Changes</b>{" "}
                            button.
                        </p>
                        <p>
                            To delete a course, semseter, or plan, click the
                            associated button. There will be a special delete
                            button for each associated element.
                        </p>
                        <p>
                            The website additionally features degree
                            requirements, which can be accessed from the{" "}
                            <b>Degree Requirements</b> button. This section
                            shows all required courses, as well as some breadth
                            requirements, for a standard bachelors in Computer
                            Science at UD. Courses already taken, including
                            breadths, will have a check mark next to them. Any
                            classes not taken will have an x next to them.
                        </p>
                        <p>
                            Never forget to save plans! Use the{" "}
                            <b>Save Plan Changes</b> button frequently. Feel
                            free to play around with the different tools
                            available as much as you deem necessary.
                        </p>
                    </div>
                </Modal>
            </div>
            <Form.Group controlId="userPlans">
                <Form.Label>Select Degree Plan:</Form.Label>
                <Form.Select
                    className="dropdownWidth"
                    value={
                        selectedPlan === -1
                            ? "-No Plan Selected-"
                            : degreePlans[selectedPlan].id
                    }
                    onChange={updateSelectedPlan}
                >
                    <option value={"Special"}>-No Plan Selected-</option>
                    {degreePlans.map((plan: plan) => (
                        <option key={plan.id} value={plan.id}>
                            {plan.name}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Plan
                degreePlans={degreePlans}
                setDegreePlans={setDegreePlans}
                currentPlan={degreePlans[0]}
            ></Plan>
            <Button onClick={addPlan} className="btnadd">
                Add New Plan
            </Button>
            <Button className="btncancel" onClick={deletePlan}>
                Delete Selected Plan
            </Button>
        </div>
    );
}
export default App;
