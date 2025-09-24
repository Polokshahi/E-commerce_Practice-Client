  const [formData, setFormData] = useState({
    itemInfo: "",
    category: "",
    filterType: "",
    warrantee: "",
    filterNames: "",
    barCode: "",
    invoiceDetails: "",
    details: "",
    unit: "",
    brand: "",
    type: "",
    tag: "",
    bestSale: "",
    review: "",
    description: "",
    specifications: "",
    sellPrice: "",
    supplierPrice: "",
    offer: "",
    itemCode: "",
    supplier: "",
    varient: "",
    defaultVarient: "",
    color: "",
    videoLink: "",
    defaultImage: "",   // Default image
    images: [""]        // Dynamic images
  });






    <div className="space-y-6">
            {blocks.map((block, index) => (
              <div key={block.id} className="border p-4 rounded-md space-y-4 relative">
                {/* Language selector + add/remove */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 gap-2">
                  <label className="font-semibold text-gray-700 text-sm">Language</label>
                  <select
                    className="border border-gray-300 rounded px-3 py-2 w-full sm:w-64 text-sm"
                    value={block.language}
                    onChange={(e) => handleChange(block.id, "language", e.target.value)}
                  >
                    <option value="" disabled>Select language</option>
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="es">Spanish</option>
                  </select>

                  {/* First block gets + button, rest get - button */}
                  {index === 0 ? (
                    <button
                      type="button"
                      onClick={addBlock}
                      className="ml-2 text-green-600 font-bold text-xl"
                    >
                      +
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => removeBlock(block.id)}
                      className="ml-2 text-red-600 font-bold text-xl"
                    >
                      −
                    </button>
                  )}
                </div>

                {/* Full-width Details Editor */}
                <div>
                  <label className="block font-semibold text-gray-700 text-sm mb-1">Details</label>
                  <QuillEditor
                    value={block.details}
                    onChange={(value) => handleChange(block.id, "details", value)}
                    height="200px"
                  />
                </div>

                {/* Side-by-side Editors */}
                <div className="flex flex-col gap-6 md:flex-row">
                  <div className="w-full md:flex-1">
                    <label className="block font-semibold text-gray-700 text-sm mb-1">Description</label>
                    <QuillEditor
                      value={block.description}
                      onChange={(value) => handleChange(block.id, "description", value)}
                      height="180px"
                    />
                  </div>
                  <div className="w-full md:flex-1">
                    <label className="block font-semibold text-gray-700 text-sm mb-1">Specifications</label>
                    <QuillEditor
                      value={block.specifications}
                      onChange={(value) => handleChange(block.id, "specifications", value)}
                      height="180px"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>