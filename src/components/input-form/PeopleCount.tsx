export const PeopleCount = ({
  peopleCount,
  setPeopleCount,
  setInputBody,
}: any) => {
  return (
    <label className="block text-gray-700 text-lg font-bold mt-6 text-left">
      <div className="lg:flex gap-5 mt-4">
        <div className="">
          <p>How many travellers</p>
          <input
            type="number"
            id="departureDate"
            className="px-4 py-2 rounded-lg focus:outline-none border-2 focus:border-blue-500 border-black"
            value={peopleCount}
            onChange={(e) => {
              const newPeopleCount = e.target.value;
              setPeopleCount(newPeopleCount);
              setInputBody((prevInput: any) => {
                return { ...prevInput, people_count: Number(newPeopleCount) };
              });
            }}
          />
        </div>
      </div>
    </label>
  );
};
