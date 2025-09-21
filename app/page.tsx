import AddNewList from "@components/homePage/AddNewList";
import ShowLists from "@components/homePage/ShowLists";

export default function Home() {
  return (
   <div className="bg-stroke-primary h-[calc(100vh-64px)] w-full overflow-hidden">
      <div className="h-full overflow-x-auto overflow-y-hidden">
        <div className="flex gap-5 mt-10 px-10 py-5 min-w-fit h-full items-start">
          <AddNewList />
          <ShowLists />
        </div>
      </div>
    </div>
  );
}
