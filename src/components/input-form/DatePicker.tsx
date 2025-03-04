export const DatePicker = ({
  departureDate,
  setDepartureDate,
  returnDate,
  setReturnDate,
  setInputBody,
}: any) => {


  const today = new Date().toISOString().split("T")[0];



  return (
    <>
      <label className="block text-gray-700 text-lg font-bold mt-6 text-left">
        <div className="lg:flex gap-5 mt-4">
          <div className="">
            <p>Departure Date</p>
            <input
              type="date"
              id="departureDate"
              className="border-2 rounded-lg p-2 mt-2"
              value={departureDate}
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => {
                const newDepartureDate = e.target.value;
                setDepartureDate(newDepartureDate);
                if(returnDate && departureDate > returnDate){
                  setReturnDate("");
                }
                setInputBody((prevInput: any) => {
                  return { ...prevInput, start_date: newDepartureDate };
                });
              }}
            />
          </div>
          <div className="mx-auto">
            <p>Return Date</p>
            <input
              type="date"
              id="returnDate"
              className="border-2 rounded-lg p-2 mt-2"
              value={returnDate}
              onChange={(e) => {
                const newReturnDate = e.target.value;
                setReturnDate(newReturnDate);
                setInputBody((prevInput: any) => {
                  return { ...prevInput, end_date: newReturnDate };
                });
              }}
            />
          </div>
        </div>
      </label>
    </>
  );
};
