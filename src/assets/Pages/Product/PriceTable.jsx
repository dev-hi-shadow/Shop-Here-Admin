/* eslint-disable react/prop-types */

const PriceTable = ({ attributes, setValues, values, RemovedCombinations, setRemovedCombinations }) => {
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


  const handlePriceChange = (data) => {
    const UpdatePrices = [...values.price];
    const PriceIndex = UpdatePrices?.findIndex((price) => {
      const array1 = price?.attribute_ids?.sort().toString();
      const array2 = data?.attribute_ids?.sort().toString();
      return array1 === array2;
    });

    if (PriceIndex === -1) {
      UpdatePrices?.push(data);      
    }else{
      if (typeof data.mfg === "number") {
        UpdatePrices[PriceIndex].mfg = Number(data.mfg)?.toFixed(2);
        const selling =  Number(UpdatePrices[PriceIndex].selling || 0)
        const tax = (selling * ProductTax?.toFixed(2)) / 100;
        const ctc = selling - tax;
        const margin = ctc - Number(data.mfg)?.toFixed(2);
        UpdatePrices[PriceIndex].selling = Number(selling)?.toFixed(2);
        UpdatePrices[PriceIndex].margin = margin?.toFixed(2);
        UpdatePrices[PriceIndex].ctc = ctc?.toFixed(2);
        UpdatePrices[PriceIndex].tax = tax?.toFixed(2);
  
      }
      if (typeof data.selling === "number") {
  
        const selling = Number(data.selling);
        const tax = (selling * ProductTax) / 100;
        const ctc = selling - tax;
        const margin = ctc - (UpdatePrices[PriceIndex]?.mfg || 0);
        UpdatePrices[PriceIndex].selling = Number(selling)?.toFixed(2);
        UpdatePrices[PriceIndex].margin = margin?.toFixed(2);
        UpdatePrices[PriceIndex].ctc = ctc?.toFixed(2);
        UpdatePrices[PriceIndex].tax = tax?.toFixed(2);
      }
    }

    setValues({ ...values, price: UpdatePrices });
  };



  const PriceFind = (combination) => {
    return (
      values.price &&
      values.price.find((value) => {
        return (
          value.attribute_ids.sort().toString() ===
          combination
            .map(({ value }) => value._id)
            .sort()
            .toString()
        );
      })
    );
  };

  const handleRemove = (combination) => {
    setRemovedCombinations([
      ...RemovedCombinations,
      combination
        .map(({ value }) => value._id)
        .sort()
        .toString(),
    ]);
    const UpdatePrices = [...values.price];
    const PriceIndex = UpdatePrices?.findIndex((price) => {
      const array1 = price?.attribute_ids?.sort().toString();
      const array2 = combination
        .map(({ value }) => value._id)
        .sort()
        .toString();
      return array1 === array2;
    });
    if (PriceIndex !== -1) {
      UpdatePrices.splice(PriceIndex, 1);
      setValues({ ...values, price: UpdatePrices });
    }
  };

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
            return combination.length > 0 ? (
              !RemovedCombinations.includes(
                combination
                  .map(({ value }) => value._id)
                  .sort()
                  .toString()
              ) && (
                <tr key={index}>
                  <td>
                    {combination.map(({ value }) => value.name).join(" - ")}
                  </td>
                  <td>
                    <div className="form-group">
                      <input
                        onChange={(event) =>
                          handlePriceChange({
                            attribute_ids: combination.map(
                              ({ value }) => value._id
                            ),
                            mfg: Number(event.target.value),
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
                        onChange={(event) =>
                          handlePriceChange({
                            attribute_ids: combination.map(
                              ({ value }) => value._id
                            ),
                            selling: Number(event.target.value),
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
                  <td>{PriceFind(combination)?.tax || 0}</td>
                  <td>{PriceFind(combination)?.ctc || 0}</td>
                  <td>{PriceFind(combination)?.margin || 0}</td>
                  <td className="text-center">
                    <i
                      className="fas fa-xmark text-red fs-3"
                      onClick={() => handleRemove(combination)}
                    ></i>
                  </td>
                </tr>
              )
            ) : (
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
