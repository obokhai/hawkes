const StepThreeUserDetails = ({ clientData, handleClientChange, userType, prevStep, handleSubmit }) => (
  <>
  <h2 className="text-xl font-semibold mb-4">Invite User</h2>

  {userType === "individual" ? (
    <div className="grid gap-4">
      <div className="grid grid-cols-2 gap-4">
        <input name="firstName" placeholder="First Name" value={clientData.firstName} onChange={handleClientChange} className="border p-2 rounded" />
        <input name="lastName" placeholder="Last Name" value={clientData.lastName} onChange={handleClientChange} className="border p-2 rounded" />
      </div>
      <input name="address" placeholder="Address" value={clientData.address} onChange={handleClientChange} className="border p-2 rounded" />
      <select name="state" value={clientData.state} onChange={handleClientChange} className="border p-2 rounded">
        <option value="">Select State</option>
        <option value="NY">New York</option>
        <option value="CA">California</option>
      </select>
      <div className="grid grid-cols-2 gap-4">
        <input name="phone" placeholder="Phone" value={clientData.phone} onChange={handleClientChange} className="border p-2 rounded" />
        <input name="email" placeholder="Email" value={clientData.email} onChange={handleClientChange} className="border p-2 rounded" />
      </div>
    </div>
  ) : (
    <div className="grid gap-4">
      <input name="companyName" placeholder="Company Name" value={clientData.companyName} onChange={handleClientChange} className="border p-2 rounded" />
      <input name="companyAddress" placeholder="Company Address" value={clientData.companyAddress} onChange={handleClientChange} className="border p-2 rounded" />
      <select name="companyState" value={clientData.companyState} onChange={handleClientChange} className="border p-2 rounded">
        <option value="">Select State</option>
        <option value="TX">Texas</option>
        <option value="FL">Florida</option>
      </select>
      <div>
        <label className="block text-sm font-medium mb-1">Upload Document</label>
        <input type="file" name="document" onChange={handleClientChange} className="border p-2 rounded w-full" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <input name="contactPhone" placeholder="Phone Number" value={clientData.contactPhone} onChange={handleClientChange} className="border p-2 rounded" />
        <input name="contactEmail" placeholder="Official Email" value={clientData.contactEmail} onChange={handleClientChange} className="border p-2 rounded" />
      </div>
    </div>
  )}

  <div className="flex justify-between mt-6">
    <button onClick={prevStep} className="px-6 py-2 rounded border">Back</button>
    <button onClick={handleSubmit} className="bg-[#2C1C92] text-white px-6 py-2 rounded">Assign & Submit</button>
  </div>
</>
  );
  
  export default StepThreeUserDetails;
  