import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import makeAnimated from "react-select/animated";
import collectionService from "../services/collectionService";
import "./components.css";

const animatedComponents = makeAnimated();

const CreateCollectionPage = () => {
  const [customFields, setCustomFields] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions([
      { value: "topic1", label: "Topic 1" },
      { value: "topic2", label: "Topic 2" },
      { value: "topic3", label: "Topic 3" },
    ]);
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const transformedData = {
        title: data.title,
        topicName: data.topic.value,
        description: data.description,
        customFields: data.customFields.map((field) => ({
          fieldName: field.fieldName,
          fieldType: field.fieldType,
        })),
      };

      const token = localStorage.getItem('jwtToken');

      const collectionId = await collectionService.createCollection(
        transformedData,
        token
      );

      console.log("Collection created:", collectionId);
      // Handle the successful creation of the collection
    } catch (error) {
      console.error("Error creating collection:", error);
      // Handle the error during collection creation
    }
  };
  

  const handleClick = () => {
    setCustomFields([...customFields, { fieldName: "", fieldType: "" }]);
  };

  const handleRemoveProperty = (index) => {
    const updatedFields = [...customFields];
    updatedFields.splice(index, 1);
    setCustomFields(updatedFields);
  };
  return (
    <div className="container">
      <div className="align-content-center pt-3">
        <a href="/">
          <i className="bi bi-flower1 fs-1 my-1 text-danger"></i>
        </a>
        <a className="navbar-brand" href="/">
          <p className="fs-2 d-inline text-danger mx-2">collecto </p>
        </a>
      </div>

      <form
        className="m-auto border border-0 col-lg-6 col-xl-6 col-12 p-1"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="fs-4 text-center">Collection creation form</div>
        <div className="row border-top">
          <div className="col-4 text-secondary border-end fs-6 fw-medium p-1">
            Title
          </div>
          <div className="col-8 p-0">
            <input
              type="text"
              className="border-0 w-100 p-1  collection-input"
              placeholder="Empty"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <span className="text-danger">Title is required</span> // Display error message if validation fails
            )}
          </div>
        </div>
        <div className="row border-top">
          <div className="col-4 text-secondary border-end fs-6 fw-medium p-1">
            Topic
          </div>
          <div className="col-8 p-0">
            <Controller
              control={control}
              name="topic"
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <CreatableSelect
                  className="border-0 w-100 p-1 collection-input"
                  isClearable
                  isSearchable
                  value={field.value}
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption);
                  }}
                  placeholder="Empty"
                  components={animatedComponents}
                  options={options}
                />
              )}
            />

            {errors.topic && (
              <span className="text-danger">Topic is required</span>
            )}
          </div>
        </div>
        <div className="row border-top">
          <div className="col-4 text-secondary border-end fs-6 fw-medium p-1">
            Description
          </div>
          <div className="col-8 p-0">
            <textarea
              className="border-0 w-100 p-1 collection-input"
              placeholder="Empty"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <span className="text-danger">Description is required</span> // Display error message if validation fails
            )}
          </div>
        </div>
        {customFields.map((field, i) => (
          <div className="row border-top" key={i}>
            <div className="col-4 text-secondary border-end fs-6 fw-medium p-0">
              <input
                type="text"
                className="w-100 border-0 p-1 collection-input"
                placeholder="Property Name..."
                {...register(`customFields[${i}].fieldName`, {
                  required: true,
                })}
              />
              {errors.customFields && errors.customFields[i]?.fieldName && (
                <span className="text-danger">Field Name is required</span>
              )}
            </div>
            <div className="col-8 p-0 d-flex justify-content-between">
              <select
                className="border-0 col-8 p-1 collection-input"
                aria-label="Default select example"
                placeholder="Empty"
                {...register(`customFields[${i}].fieldType`, {
                  required: true,
                })}
              >
                <option value="">Select property type</option>
                <option value="Number">Number</option>
                <option value="Date">Date</option>
                <option value="SingleLineText">Single line Text</option>
                <option value="MultiLineText">Multi line Text</option>
                <option value="Checkbox">Checkbox</option>
              </select>
              {errors.customFields && errors.customFields[i]?.fieldType && (
                <div className="text-danger">Field Type is required</div>
              )}
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => handleRemoveProperty(i)}
              ></button>
            </div>
          </div>
        ))}

        <div className="w-100 text-secondary fs-6 fw-medium p-1 border-top">
          <button
            className="btn btn-outline-none"
            type="button"
            onClick={handleClick}
          >
            <i className="bi bi-plus-circle"></i> Add Property
          </button>
        </div>

        <button type="submit" className="btn btn-primary p-1 m-0">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateCollectionPage;
