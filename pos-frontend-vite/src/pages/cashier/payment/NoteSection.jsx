import React from "react";
import { useDispatch } from "react-redux";
import { selectNote, setNote } from "../../../Redux Toolkit/features/cart/cartSlice";
import { useSelector } from "react-redux";
import { FileText } from "lucide-react";

const NoteSection = () => {
  const dispatch = useDispatch();
  const note=useSelector(selectNote)

  const handleSetNote = (e) => {
    dispatch(setNote(e.target.value));
  };
  return (
    <div className="p-4 border-b">
      <h2 className="text-lg font-semibold mb-3 flex items-center">
        <FileText className="w-5 h-5 mr-2" />
        Order Note
      </h2>
      <textarea
        className="w-full p-2 border rounded-md text-sm resize-none"
        rows="3"
        placeholder="Add order note..."
        value={note}
        onChange={handleSetNote}
      />
    </div>
  );
};

export default NoteSection;
