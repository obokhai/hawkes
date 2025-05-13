const StepTwoUserRole = ({ clientData, handleClientChange, nextStep, prevStep }) => (
  <>
  <h2 className="text-xl font-semibold mb-4">Invite User</h2>
  <div className="grid gap-4">
    <select name="userRole" onChange={handleClientChange} value={clientData.userRole} className="border p-2 rounded w-full">
      <option value="">User Role</option>
      <option value="viewer">Viewer</option>
      <option value="editor">Editor</option>
    </select>
    <select name="userType" onChange={handleClientChange} value={clientData.userType} className="border p-2 rounded w-full">
      <option value="">User Type</option>
      <option value="individual">Individual</option>
      <option value="company">Company</option>
    </select>
  </div>

  <div className="flex justify-between mt-6">
    <button onClick={prevStep} className="px-6 py-2 rounded border">Back</button>
    <button onClick={nextStep} className="bg-[#2C1C92] text-white px-6 py-2 rounded">Next</button>
  </div>
</>
  );
  
  export default StepTwoUserRole;
  