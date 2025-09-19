export default function NewList() {
    
  const handleChangeInput = (e) => {
    const value = e.target.value;
    console.log(value);
  };    

  return (
    <form className="w-full flex flex-col gap-6">
      <input
        type="text"
        placeholder="new list"
        className="w-full text-sm px-3  py-3 border border-stroke-primary rounded-md focus:outline-0 "
        onChange={handleChangeInput}
      />
      <button
        type="submit"
        className="w-full bg-green text-white py-1 rounded-md"
      >
        submit
      </button>
    </form>
  );
}
