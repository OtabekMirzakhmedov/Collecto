import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import itemService from "../services/itemService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ItemCreation = ({ collectionId, customFields, onClose }) => {
  const { register, handleSubmit, setValue } = useForm();
  const [tagOptions, setTagOptions] = useState([]);
  const [isAddingItem, setIsAddingItem] = useState(false);

  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tags = await itemService.fetchTags();
        const options = tags.map((tag) => ({
          value: tag,
          label: tag,
        }));
        setTagOptions(options);
      } catch (error) {
        console.error("Failed to fetch tags:", error);
      }
    };

    fetchTags();
  }, []);

  const onSubmit = async (data) => {
    // Extract the values from the form data
    const { itemName, tags, ...customFields } = data;

    // Create an array of custom field values
    const customFieldValues = Object.entries(customFields).map(
      ([key, value]) => {
        const customFieldId = key.replace("customField_", "");

        // Stringify boolean values
        const processedValue =
          typeof value === "boolean" ? JSON.stringify(value) : value || "";

        return {
          customFieldId,
          value: processedValue,
        };
      }
    );

    // Construct the final data object
    const itemData = {
      name: itemName,
      itemTags: tags || [],
      customFieldValues,
    };

    setIsAddingItem(true);

    try {
      const itemCreated = await itemService.createItem(itemData, collectionId, token);
      console.log(itemCreated);
      setIsAddingItem(false);

      toast.success("Item added successfully");

      onClose();
      // Process the item data as needed (e.g., send it to an API, update the state, etc.)

      // Reset the form
      // ...
    } catch (error) {
      setIsAddingItem(false);
      toast.error("Failed to add item");
    }
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
            options={tagOptions}
            onChange={handleTagsChange}
          />
        </div>

        {customFields.map((field) => (
          <div className="mb-3" key={field.customFieldId}>
            <label className="form-label">{field.fieldName}</label>
            {field.fieldType === "SingleLineText" ||
            field.fieldType === "Number" ? (
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

        <button type="submit" className="btn btn-primary" disabled={isAddingItem}>
          {isAddingItem ? "Adding..." : "Add Item"}
        </button>
      </form>

      
    </div>
  );
};

export default ItemCreation;
