import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CourseForm from "./CourseForm";
import courseStore from "../stores/courseStore";
import { getAuthors } from "../api/authorApi";
import { toast } from "react-toastify";
import * as courseActions from "../actions/courseActions";

const ManageCoursePage = props => {
  const [errors, setErrors] = useState({});
  const [authors, setAuthors] = useState([]);
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: ""
  });

  useEffect(() => {
    getAuthors().then(_authors => setAuthors(_authors));
  }, []);

  useEffect(() => {
    const slug = props.match.params.slug;
    if (slug) setCourse(courseStore.getCourseBySlug(slug));
  }, [props.match.params.slug]);

  function handleChange({ target }) {
    setCourse({ ...course, [target.name]: target.value });
  }

  function formIsValid() {
    const _errors = {};

    if (!course.title) _errors.title = "Title is required";
    if (!course.authorId) _errors.authorId = "Author ID is required";
    if (!course.category) _errors.category = "Category is required";

    setErrors(_errors);
    //form is valid if _errors has no properties;
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;

    courseActions.saveCourse(course).then(() => {
      props.history.push("/courses");
      if (course.id) toast.success("Course Updated.");
      else toast.success("Course Created");
    });
  }

  return (
    <>
      <h2>
        {props.match.params.slug === undefined ? "Add Course" : "Manage Course"}
      </h2>
      <CourseForm
        errors={errors}
        course={course}
        authors={authors}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      <p>
        <Link to="/courses">Back to Courses</Link>
      </p>
    </>
  );
};

export default ManageCoursePage;
