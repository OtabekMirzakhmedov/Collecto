import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import ReactMarkdown from "react-markdown";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import makeAnimated from "react-select/animated";
import collectionService from "../services/collectionService";
import "./components.css";

const animatedComponents = makeAnimated();

const CreateEditCollection = ({ collection }) => {
  const [customFields, setCustomFields] = useState([]);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const topics = await collectionService.fetchTopics();
        const topicOptions = topics.map((topic) => ({
          value: topic,
          label: topic,
        }));
        setOptions(topicOptions);
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    fetchTopics();
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
    setValue,
  } = useForm();

  const validateDescription = (value) => {
    if (!value.trim()) {
      return "Description is required";
    }
    return true;
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const transformedData = {
        title: data.title,
        topicName: data.topic.value,
        description: data.description,
        customFields: data.customFields
          ? data.customFields.map((field) => ({
              customFieldId: 0,
              fieldName: field.fieldName,
              fieldType: field.fieldType,
            }))
          : [],
      };

      const token = localStorage.getItem("jwtToken");

      if (collection) {
        console.log(collection);
        console.log("editing ", collection.collectionId);
        await collectionService.editCollection(
          collection.collectionId,
          transformedData,
          token
        );

        toast.success("Collection updated");
        navigate(`/collections/${collection.collectionId}`);
      } else {
        const collectionId = await collectionService.createCollection(
          transformedData,
          token
        );
        navigate(`/collections/${collectionId}`);
        toast.success("Collection created");
      }
    } catch (error) {
      console.error("Error saving collection:", error);
      toast.error("Failed to save collection");
    } finally {
      setLoading(false);
    }
  };

  const handleClick = () => {
    setCustomFields([...customFields, { fieldName: "", fieldType: "" }]);
  };

  const handleRemoveProperty = (index) => {
    console.log(index);
    const updatedFields = [...customFields];
    console.log(updatedFields);
    updatedFields.splice(index, 1);
    setCustomFields(updatedFields);
  };

  useEffect(() => {
    if (collection) {
      setValue("title", collection.title);
      setValue("topic", {
        value: collection.topicName,
        label: collection.topicName,
      });
      setValue("description", collection.description);

      if (collection.customFields) {
        setCustomFields(collection.customFields);
        collection.customFields.forEach((field, index) => {
          setValue(`customFields[${index}].fieldName`, field.fieldName);
          setValue(`customFields[${index}].fieldType`, field.fieldType);
        });
      }
    }
  }, [collection, setValue]);

  return (
    <div className="container mt-5">
      <form
        className="m-auto border border-0 col-lg-6 col-xl-6 col-12 p-1"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="display-6 text-center mb-5 ">
          {collection ? "Edit Collection" : "Create Collection"}
        </div>
        <div className="row border-top">
          <div className="col-4 text-secondary border-end fs-6 fw-medium p-1 mt-2">
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
              <span className="text-danger">Title is required</span>
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
          <div className="col-12 text-secondary  fs-6 fw-medium p-1">
            Description
          </div>
        </div>
        <div className="col-12 ">
          <Tabs>
            <TabList>
              <Tab>Edit</Tab>
              <Tab>md Preview</Tab>
            </TabList>

            <TabPanel>
              <textarea
                className="border-0 w-100 p-1 collection-input "
                placeholder="Supports Markdown"
                {...register("description", {
                  required: true,
                  validate: validateDescription,
                })}
              />
            </TabPanel>

            <TabPanel>
              <ReactMarkdown>{watch("description")}</ReactMarkdown>
            </TabPanel>
          </Tabs>
          {errors.description && (
            <span className="text-danger">Description is required</span>
          )}
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

        <button
          type="submit"
          className="btn btn-success rounded-0 p-1 m-0"
          disabled={loading}
        >
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>{" "}
              {collection ? "Updating..." : "Creating..."}
            </>
          ) : collection ? (
            "Update"
          ) : (
            "Create"
          )}
        </button>
      </form>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default CreateEditCollection;
