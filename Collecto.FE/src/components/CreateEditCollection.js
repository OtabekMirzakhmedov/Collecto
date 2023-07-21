import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import ReactMarkdown from "react-markdown";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import makeAnimated from "react-select/animated";
import collectionService from "../services/collectionService";
import { useSelector } from "react-redux";
import translations from "../translations";
import "./components.css";

const animatedComponents = makeAnimated();

const CreateEditCollection = ({ collection }) => {
  const [customFields, setCustomFields] = useState([]);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState(null);
  const [description, setDescription] = useState("");
  const language = useSelector((state) => state.language.language);
  const translation = translations[language]["Collection"];

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

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error(translation.TitleRequired);
      return;
    }
    if (!topic) {
      toast.error(translation.TopicRequired);
      return;
    }
    if (!description.trim()) {
      toast.error(translation.DescriptionRequired);
      return;
    }
    if (customFields.some((field) => !field.fieldName || !field.fieldType)) {
      toast.error(translation.CustomFieldRequired);
      return;
    }
    const fieldNames = customFields.map((field) => field.fieldName);
    const hasDuplicates = new Set(fieldNames).size !== fieldNames.length;

    if (hasDuplicates) {
      toast.error("Field names must be unique");
      return;
    }

    try {
      setLoading(true);
      const transformedData = {
        title,
        topicName: topic.value,
        description,
        customFields: customFields.map((field) => ({
          customFieldId: field.customFieldId || 0,
          fieldName: field.fieldName,
          fieldType: field.fieldType,
        })),
      };

      const token = sessionStorage.getItem("jwtToken");
      console.log("transformedData", transformedData);

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

  const handleAddProperty = () => {
    setCustomFields([...customFields, { fieldName: "", fieldType: "" }]);
  };

  useEffect(() => {
    if (collection) {
      setTitle(collection.title);
      setTopic({ value: collection.topicName, label: collection.topicName });
      setDescription(collection.description);
      setCustomFields(collection.customFields || []);
    }
  }, [collection]);

  const handleRemoveProperty = (index) => {
    setCustomFields((prevFields) => {
      const updatedFields = [...prevFields];
      updatedFields.splice(index, 1);
      return updatedFields;
    });
  };

  return (
    <div className="container mt-5">
      <form
        className="m-auto border border-0 col-lg-6 col-xl-6 col-12 p-1"
        onSubmit={onSubmit}
      >
        <div className="display-6 text-center mb-5 ">
          {collection ? translation.EditCollection : translation.CreateCollection}
        </div>
        <div className="row border-top">
          <div className="col-4 text-secondary border-end fs-6 fw-medium p-1 mt-2">
            {translation.Title}
          </div>
          <div className="col-8 p-0">
            <input
              type="text"
              className="border-0 w-100 p-1  collection-input"
              placeholder={translation.Empty}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </div>

        <div className="row border-top">
          <div className="col-4 text-secondary border-end fs-6 fw-medium p-1">
            {translation.Topic}
          </div>
          <div className="col-8 p-0">
            <CreatableSelect
              className="border-0 w-100 p-1 collection-input"
              isClearable
              isSearchable
              value={topic}
              onChange={(selectedOption) => setTopic(selectedOption)}
              placeholder={translation.Empty}
              components={animatedComponents}
              options={options}
            />
          </div>
        </div>

        <div className="row border-top">
          <div className="col-12 text-secondary  fs-6 fw-medium p-1">
            {translation.Description}
          </div>
        </div>
        <div className="col-12">
          <Tabs>
            <TabList>
              <Tab>{translation.EditTab}</Tab>
              <Tab>{translation.PreviewTab}</Tab>
            </TabList>

            <TabPanel>
              <textarea
                className="border-0 w-100 p-1 collection-input"
                placeholder={translation.SupportsMarkdown}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </TabPanel>

            <TabPanel>
              <ReactMarkdown>{description}</ReactMarkdown>
            </TabPanel>
          </Tabs>
        </div>

        {customFields.map((field, i) => (
          <div className="row border-top" key={i}>
            <div className="col-4 text-secondary border-end fs-6 fw-medium p-0">
              <input
                type="text"
                className="w-100 border-0 p-2 collection-input"
                placeholder={translation.PropertyName}
                value={field.fieldName}
                onChange={(e) => {
                  const updatedFields = [...customFields];
                  updatedFields[i].fieldName = e.target.value;
                  setCustomFields(updatedFields);
                }}
              />
            </div>
            <div className="col-8 p-0 d-flex justify-content-between align-items-center">
              <select
                className="border-0 col-8 p-1 collection-input"
                aria-label="Default select example"
                value={field.fieldType}
                onChange={(e) => {
                  const updatedFields = [...customFields];
                  updatedFields[i].fieldType = e.target.value;
                  setCustomFields(updatedFields);
                }}
              >
                <option value="">{translation.SelectPropertyType}</option>
                <option value="Number">{translation.NumberType}</option>
                <option value="Date">{translation.DateType}</option>
                <option value="SingleLineText">{translation.SingleLineText}</option>
                <option value="MultiLineText">{translation.MultiLineText}</option>
                <option value="Checkbox">{translation.Checkbox}</option>
              </select>

              <i
                className="bi bi-x fs-3 text-danger p-0"
                onClick={() => handleRemoveProperty(i)}
              ></i>
            </div>
          </div>
        ))}

        <div className="w-100 text-secondary fs-6 fw-medium p-1 border-top">
          <button
            className="btn btn-outline-none"
            type="button"
            onClick={handleAddProperty}
          >
            <i className="bi bi-plus-lg me-1"></i>
            {translation.AddProperty}
          </button>
        </div>

        <div className="text-center my-4">
          <button
            type="submit"
            className="btn btn-success rounded-0"
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <span className="ms-2">
                  {collection ? translation.UpdateButtonSpinner : translation.CreateButtonSpinner}
                </span>
              </>
            ) : collection ? (
              translation.UpdateButton
            ) : (
              translation.CreateButton
            )}
          </button>
        </div>
      </form>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default CreateEditCollection;
