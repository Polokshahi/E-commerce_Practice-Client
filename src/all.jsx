 <div className="space-y-6">
            <div>
              <div className="flex gap-4 items-center">
                <label className=" font-semibold mb-1 text-right text-gray-700">Default image</label>
                <input type="file" className="block file-input text-sm text-gray-900 border" onChange={handleDefaultUpload} />
              </div>
              {uploadedUrls.default && (
                <p className="text-sm text-gray-600 mt-1">
                  Uploaded: <a href={uploadedUrls.default} className="text-blue-500 underline" target="_blank" rel="noreferrer">
                    <img className="" src={uploadedUrls.default} alt="" />
                  </a>
                </p>
              )}
            </div>
            <div className="mb-4">
              <div className="flex flex-col gap-4 mx-8">
                {images.map((_, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <label className="w-16 font-medium">Image {index + 1}</label>
                    <input type="file" className="file-input text-sm text-gray-900" onChange={(e) => handleDynamicUpload(e, index)} />
                    <button type="button" className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-1 px-3 rounded" onClick={addImageInput}>+</button>
                    <button type="button" className={`bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded ${images.length === 1 ? "opacity-50 cursor-not-allowed" : ""}`} onClick={() => removeImageInput(index)} disabled={images.length === 1}>−</button>
                    {uploadedUrls[index] && <img src={uploadedUrls[index]} alt={`Uploaded ${index}`} className="h-16 w-16 object-cover rounded" />}
                  </div>
                ))}
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
    videoLink: ""
  });