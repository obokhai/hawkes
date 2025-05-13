const StepOneAsset = ({ assetData, handleAssetChange, nextStep  }) => (
  <>
  <h2 className="text-xl font-semibold mb-4">Add Asset</h2>
  <div className="grid gap-4">
    <input name="assetName" onChange={handleAssetChange} value={assetData.assetName} placeholder="Asset Name" className="border p-2 rounded w-full" />
    <input name="address" onChange={handleAssetChange} value={assetData.address} placeholder="Address" className="border p-2 rounded w-full" />
    <input name="authorizedUse" onChange={handleAssetChange} value={assetData.authorizedUse} placeholder="Authorized Use" className="border p-2 rounded w-full" />
    <input name="size" onChange={handleAssetChange} value={assetData.size} placeholder="Size" className="border p-2 rounded w-full" />
    <div className="flex gap-x-6">
        <input name="dateAdded" type="date" onChange={handleAssetChange} value={assetData.dateAdded} className="border p-2 rounded w-full" />
        <select name="status" onChange={handleAssetChange} value={assetData.status} className="border p-2 rounded w-full">
          <option value="">Select Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
        </select>
    </div>
  </div>

  <div className="flex justify-end mt-6">
    <button onClick={nextStep} className="bg-[#2C1C92] text-white px-6 py-2 rounded">Next</button>
  </div>
</>
  );
  
  export default StepOneAsset;