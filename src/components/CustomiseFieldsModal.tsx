import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { Field } from "../types";

interface CustomiseFieldsModalProps {
  fields: Field[];
  onClose: () => void;
  onToggleField: (fieldId: string) => void;
  onReorderFields: (newFields: Field[]) => void;
}

const FieldItem: React.FC<{
  field: Field;
  onToggleField: (fieldId: string) => void;
  index: number;
}> = ({ field, onToggleField, index }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "FIELD",
    item: { id: field.id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  return (
    <div
      ref={drag}
      className="DRAG-ITEM flex justify-between p-2 border-b"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <input
        type="checkbox"
        checked={field.visible}
        onChange={() => onToggleField(field.id)}
      />
      <span>{field.label}</span>
      <div className="cursor-move" style={{ padding: "0 8px" }}>
        <span>⋮⋮</span>
      </div>
    </div>
  );
};

export const CustomiseFieldsModal: React.FC<CustomiseFieldsModalProps> = ({
  fields,
  onClose,
  onToggleField,
  onReorderFields
}) => {
  const [, drop] = useDrop({
    accept: "FIELD",
    hover(item: { id: string; index: number }, monitor) {
      const draggedIndex = item.index;

      // Get the hover index based on the mouse position relative to the drop area
      const hoverBoundingRect = monitor.getClientOffset();

      const hoverIndex = fields.findIndex((field, index) => {
        // Get the DOM element's bounding rectangle
        const rect = document
          .getElementsByClassName("DRAG-ITEM")
          [index]?.getBoundingClientRect();

        if (!rect) return false;
        if (!hoverBoundingRect) return false;

        // Determine if the mouse position is over the current item
        return (
          hoverBoundingRect.x >= rect.left &&
          hoverBoundingRect.x <= rect.right &&
          hoverBoundingRect.y >= rect.top &&
          hoverBoundingRect.y <= rect.bottom
        );
      });

      // Only proceed if the hoverIndex has changed
      if (hoverIndex !== -1 && draggedIndex !== hoverIndex) {
        item.index = hoverIndex; // Update item index for future use
      }
    },
    drop(item: { id: string; index: number }) {
      const destinedIndex = item.index;

      // Get the final hover index to reorder fields
      const originalIndex = fields.findIndex(field => field.id === item.id);

      // Only proceed if the indices are different
      if (destinedIndex !== originalIndex) {
        onReorderFields(prevFields => {
          const reorderedFields = [...prevFields];
          // Remove the element from the original index
          const [removedElement] = reorderedFields.splice(originalIndex, 1);

          // Insert the removed element at the destination index
          reorderedFields.splice(destinedIndex, 0, removedElement);
          console.log("reorderedFields", reorderedFields);
          return reorderedFields;
        });
      }
    }
  });

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Customise fields</h2>
        <div ref={drop}>
          {fields.map((field, index) => (
            <FieldItem
              key={field.id}
              field={field}
              onToggleField={onToggleField}
              index={index}
            />
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
