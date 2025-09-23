<div>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-center">
                <label className="w-20 font-semibold text-gray-700 text-sm">Unit</label>
                <select className="border border-gray-300 rounded-md px-3 py-2 w-[120px] text-sm select" defaultValue="">
                  <option value="" disabled>Select Unit</option>
                  {commonProductUnits.map((unit, idx) => (
                    <option className="text-black" key={idx} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center">
                <label className="w-20 font-semibold text-gray-700 text-sm">Brand</label>
                <select className="border border-gray-300 rounded-md px-3 py-2 w-[120px] text-sm select" defaultValue="">
                  <option value="" disabled>Select Brand</option>
                  {popularBrands.map((brand, idx) => (
                    <option className="text-black" key={idx} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 mb-8 items-center">
              <div className="flex items-center gap-[50px]">
                <div className="block font-semibold text-gray-700 text-sm mb-1">Type</div>
                <input type="text" placeholder="Type" className="w-[400px] border rounded border-gray-300 px-3 py-2 text-sm" />
              </div>
              <div className="flex items-center gap-[60px]">
                <div className="block font-semibold text-gray-700 text-sm mb-1">Tag</div>
                <input type="text" placeholder="Tag" className="w-[400px] rounded border border-gray-300 px-3 py-2 text-sm" />
              </div>
              <div className="flex items-center">
                <label className="w-20 font-semibold text-gray-700 text-sm">Best Sale</label>
                <select className="border border-gray-300 rounded-md px-2 py-2 w-[120px] text-sm" defaultValue="">
                  <option value="" disabled>select option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold text-gray-700 text-sm mb-1">Review</label>
                <QuillEditor value={review} onChange={setReview} height="180px" />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 text-sm mb-1">Description</label>
                <QuillEditor value={description} onChange={setDescription} height="180px" />
              </div>
              <div className="col-span-2">
                <label className="block font-semibold text-gray-700 text-sm mb-1">Specifications</label>
                <QuillEditor value={specifications} onChange={setSpecifications} height="220px" />
              </div>
            </div>
          </div>








 const [formData, setFormData] = useState({
    itemInfo: "",
    category: "",
    filterType: "",
    warrantee: "",
    filterNames: "",
    barCode: "",
    invoiceDetails: "",
    details: ""
  });