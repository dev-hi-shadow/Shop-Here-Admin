/* eslint-disable react/prop-types */


const PriceTable = ({ attributes, values, setValues, RemovedCombinations, setRemovedCombinations }) => {

  const ProductTax = 12;
  const generateCombinations = (arr, i, result, current) => {
    if (i === arr.length) {
      result.push([...current]);
      return;
    }
    for (const value of arr[i].values) {
      current.push({ attribute: arr[i], value });
      generateCombinations(arr, i + 1, result, current);
      current.pop();
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const combinations = [];
  generateCombinations(attributes, 0, combinations, []);
 
  const handlePriceChange = (PriceIndex, data) => {
    const UpdatePrices = [...values.price]
    const manufacture_price = typeof data?.manufacture_price === "number" ? parseFloat(data?.manufacture_price) : (UpdatePrices[PriceIndex]?.manufacture_price || 0)
    const retail_price = typeof data?.retail_price === "number" ? parseFloat(data?.retail_price) : (UpdatePrices[PriceIndex]?.retail_price || 0)
    const tax = (retail_price * ProductTax) / 100;
    const company_cost = retail_price - tax;
    const margin = company_cost - (manufacture_price || 0);
    UpdatePrices[PriceIndex] = {
      attribute_ids: data?.attribute_ids,
      manufacture_price,
      retail_price,
      tax,
      company_cost,
      margin
    }
    setValues({ ...values, price: UpdatePrices })
  }
 


  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Model</th>
            <th>Manufacture Price </th>
            <th>Selling Price</th>
            <th>Tax (12% GST)</th>
            <th>CTC</th>
            <th>Margin </th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {combinations.map((combination, index) => {
            return combination.length > 0 ?
              !RemovedCombinations.includes(combination.map(({ value }) => value._id).sort().toString()) &&
              (
                <tr key={index}>
                  <td>
                    {combination.map(({ value }) => value.name).join(" - ")}
                  </td>
                  <td>
                    <div className="form-group">
                      <input
                        value={values.price[index]?.manufacture_price}
                        onChange={(event) =>
                          handlePriceChange(index, {
                            attribute_ids: combination.map(
                              ({ value }) => value._id
                            ),
                            manufacture_price: parseFloat(event.target.value),
                          })
                        }
                        id="name"
                        className={` form-control `}
                        name="name"
                        type="number"
                        required
                        placeholder={`Manufacture Price of ${combination
                          .map(({ value }) => value.name)
                          .join(" - ")} `}
                      />
                    </div>
                  </td>
                  <td>
                    <div className="form-group">
                      <input
                        value={values.price[index]?.retail_price}
                        onChange={(event) =>
                          handlePriceChange(index, {
                            attribute_ids: combination.map(
                              ({ value }) => value._id
                            ),
                            retail_price: parseFloat(event.target.value || 0),
                          })
                        }
                        id="name"
                        className={` form-control `}
                        name="name"
                        type="number"
                        required
                        placeholder={`Selling Price of ${combination
                          .map(({ value }) => value.name)
                          .join(" - ")} `}
                      />
                    </div>
                  </td>

                  <td>{values.price[index]?.tax || 0.00}</td>
                  <td>{values.price[index]?.company_cost || 0.00}</td>
                  <td>{values.price[index]?.margin || 0.00}</td>
                  <td className="text-center">
                    <i
                      className="fas fa-xmark text-red fs-3"
                      onClick={() => setRemovedCombinations([...RemovedCombinations, (combination.map(({ value }) => value._id).sort().toString())])}
                    ></i>
                  </td>
                </tr>
              ) :
              (
                <tr>
                  <td className="card-body" colSpan={4}>
                    <h5 className="card-title text-center">
                      Please kindly select atleast one attribute from the product
                    </h5>
                  </td>
                </tr>
              );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PriceTable;
