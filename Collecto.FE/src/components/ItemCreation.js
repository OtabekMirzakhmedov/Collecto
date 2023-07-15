import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import itemService from "../services/itemService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ItemCreation = ({ collectionId, customFields, onClose, selectedItem }) => {
  const { register, handleSubmit, setValue } = useForm();
  const [tagOptions, setTagOptions] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
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

  useEffect(() => {
    if (selectedItem) {
      setValue("itemName", selectedItem.name);
      setSelectedTags(
        selectedItem.itemTags.map((tag) => ({
          value: tag,
          label: tag,
        }))
      );
      selectedItem.customFieldValues.forEach((customFieldValue) => {
        const fieldName = `customField_${customFieldValue.customFieldId}`;
        setValue(fieldName, customFieldValue.value);
      });
    }
  }, [selectedItem, setValue]);

  const onSubmit = async (data) => {
    const { itemName, ...customFields } = data;

    const customFieldValues = Object.entries(customFields).map(
      ([key, value]) => {
        const customFieldId = key.replace("customField_", "");
        const processedValue =
          typeof value === "boolean" ? JSON.stringify(value) : value || "";

        return {
          customFieldId,
          value: processedValue,
        };
      }
    );

    const itemData = {
      name: itemName,
      itemTags: selectedTags.map((tag) => tag.value),
      customFieldValues,
    };

    setIsAddingItem(true);

    try {
      if (selectedItem) {

        
        const updatedItem = await itemService.editItem(
          selectedItem.id,
          itemData,
          token
        );
        console.log(updatedItem);
        toast.success("Item updated successfully");
      } else {
        const createdItem = await itemService.createItem(
          itemData,
          collectionId,
          token
        );
        console.log(createdItem);
        toast.success("Item added successfully");
      }

      setIsAddingItem(false);
      onClose();
    } catch (error) {
      setIsAddingItem(false);
      toast.error("Failed to save item");
    }
  };

  const handleTagsChange = (selectedOptions) => {
    setSelectedTags(selectedOptions);
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
            value={selectedTags}
          />
        </div>
        {selectedItem.customFieldValues.map((field) => (
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
          {isAddingItem ? "Saving..." : "Save Item"}
        </button>
      </form>
    </div>
  );
};

export default ItemCreation;
