/* eslint-disable react/prop-types */

import { useFormik } from "formik";
import { StockInitialState } from "../../Configurations/InitialStates";
import { StockSchema } from "../../Configurations/YupSchema";

const StockTable = ({
  attributes,
  setProductValues,
  ProductValues,
  RemovedCombinations,
  setRemovedCombinations,
}) => {
  const { setValues, values } = useFormik({
    initialValues: StockInitialState,
    validate: StockSchema,
    onSubmit: handleStockIn,
  });
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

  const handleRemove = (combination) => {
    setRemovedCombinations([
      ...RemovedCombinations,
      combination
        .map(({ value }) => value._id)
        .sort()
        .toString(),
    ]);
    const UpdatePrices = [...ProductValues.price];
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
      setProductValues({ ...values, price: UpdatePrices });
    }
    const UpdateStocks = [...values.stocks];
    const StockIndex = UpdateStocks?.findIndex((stock) => {
      const array1 = stock?.attribute_ids?.sort().toString();
      const array2 = combination
        .map(({ value }) => value._id)
        .sort()
        .toString();
      return array1 === array2;
    });

    if (StockIndex !== -1) {
      UpdateStocks.splice(StockIndex, 1);
      setValues({ ...ProductValues, price: UpdateStocks });
    }
  };

  const handleStockIn = () => {
  };

  return (
    <div className="card">
      <div className="card-body">
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
                            id="name"
                            className={` form-control `}
                            name="name"
                            type="number"
                            required
                            placeholder={`Enter New Stock of ${combination
                              .map(({ value }) => value.name)
                              .join(" - ")} `}
                          />
                        </div>
                      </td>
                      <td>
                        <div className="form-group">
                          <input
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
                        Please kindly select atleast one attribute from the
                        product
                      </h5>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StockTable;
