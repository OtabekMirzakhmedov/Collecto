import React from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";

const ItemCreation = ({ collectionId, customFields }) => {
  const { register, handleSubmit, setValue} = useForm();


  const onSubmit = (data) => {
    // Process the form data
    console.log(data);

    // Reset the form
    // ...
  };

  const handleTagsChange = (selectedOptions) => {
    const tags = selectedOptions ? selectedOptions.map((option) => option.value) : [];
    // Set the value of the "tags" field
    setValue("tags", tags);
  };

  return (
    <div>
      <h1>Item Creation</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Item Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter item name"
            {...register("itemName", { required: true })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Tags</label>
          <CreatableSelect
            isMulti
            onChange={handleTagsChange}
          />
        </div>

        {customFields.map((field) => (
          <div className="mb-3" key={field.customFieldId}>
            <label className="form-label">{field.fieldName}</label>
            {field.fieldType === "SingleLineText" || field.fieldType === "Number" ? (
              <input
                type={field.fieldType === "Number" ? "number" : "text"}
                className="form-control"
                placeholder={`Enter ${field.fieldName}`}
                {...register(`customField_${field.customFieldId}`)}
              />
            ) : field.fieldType === "Date" ? (
              <input
                type="date"
                className="form-control"
                {...register(`customField_${field.customFieldId}`)}
              />
            ) : field.fieldType === "Checkbox" ? (
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  {...register(`customField_${field.customFieldId}`)}
                />
                <label className="form-check-label">{`Check ${field.fieldName}`}</label>
              </div>
            ) : (
              <textarea
                className="form-control"
                rows={3}
                placeholder={`Enter ${field.fieldName}`}
                {...register(`customField_${field.customFieldId}`)}
              ></textarea>
            )}
          </div>
        ))}

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ItemCreation;
