import React from "react";
import { render, screen } from "@testing-library/react";
import { DisplaySemester } from "./SemesterTable";
import { course } from "./PlannerInterfaces/course";
import { plan } from "./PlannerInterfaces/plan";
import { semester } from "./PlannerInterfaces/semester";
const mockCourse: course = {
    id: "COURSE1",
    name: "Sample Course",
    credits: 3,
    courseID: "CS101",
    preReq: ""
};
const mockSemester: semester = {
    id: "Semester1",
    name: "Fall 2023",
    courses: [mockCourse],
    year: 0,
    season: ""
};

const mockPlan: plan = {
    id: "Plan1",
    semesters: [mockSemester],
    name: ""
};
const mockUpdatePlan = jest.fn();
test("renders DisplaySemester component with course and semester name", () => {
    render(
        <DisplaySemester
            semester={mockSemester}
            plan={mockPlan}
            updatePlan={mockUpdatePlan}
        />
    );
    // Check if semester name and course are rendered
    const semesterName = screen.getByText("Fall 2023");
    const courseName = screen.getByText("Sample Course");
    expect(semesterName).toBeInTheDocument();
    expect(courseName).toBeInTheDocument();
});
