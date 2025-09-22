import AddNewList from "@components/homePage/AddNewList";
import ShowLists from "@components/homePage/ShowLists";

export default function Home() {
  return (
    <div className="bg-stroke-primary h-100vh w-full overflow-hidden">
      <div className="w-11/12 mx-auto h-full overflow-x-auto overflow-y-hidden">
        <div className="flex gap-5 mt-10  py-5 min-w-max h-[calc(100vh-64px)] items-start">
          <AddNewList />
          <ShowLists />
        </div>
      </div>
    </div>
  );
}
