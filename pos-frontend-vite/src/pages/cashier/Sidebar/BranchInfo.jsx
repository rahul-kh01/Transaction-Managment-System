
import { useSelector } from "react-redux";

const BranchInfo = () => {
  const { branch, loading, error } = useSelector((state) => state.branch);


  if (loading) return <p>Loading branch info...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="mt-4 p-3 bg-secondary rounded-md text-sm">
      <h3 className="font-semibold mb-1">Branch Info:</h3>
      <p>
        <strong>Name:</strong> {branch.name}
      </p>
      <p>
        <strong>Address:</strong> {branch.address}
      </p>
      
    </div>
  );
};

export default BranchInfo;
