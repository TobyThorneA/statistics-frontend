interface ChoosingDatesProps {
  startDate: string;
  endDate:string;
  setStartDate: (value: string) => void;
  setEndDate: (value: string) => void;
}

const ChoosingDates : React.FC<ChoosingDatesProps> = (
  { 
    startDate, 
    setStartDate, 
    endDate, 
    setEndDate 
  }
) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 w-full max-w-md">
      <label className="flex items-center gap-2 w-40">
        от
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.currentTarget.value)}
          className="flex-1 px-2 py-1 rounded bg-gray-100 border border-gray-300 text-center"
        />
      </label>
      <label className="flex items-center gap-2 w-40">
        до
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.currentTarget.value)}
          className="flex-1 px-2 py-1 rounded bg-gray-100 border border-gray-300 text-center"
        />
      </label>
    </div>
  )
}
export default ChoosingDates