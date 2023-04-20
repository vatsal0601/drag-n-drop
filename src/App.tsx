import { DnDV1 } from "./drag-n-drop-v1";
import { DnDV2 } from "./drag-n-drop-v2";

export const items = [
  {
    id: "1a",
    text: "Text 1",
  },
  {
    id: "2b",
    text: "Text 2",
  },
  {
    id: "3c",
    text: "Text 3",
  },
  {
    id: "4d",
    text: "Text 4",
  },
  {
    id: "5e",
    text: "Text 5",
  },
  // {
  //   id: "6f",
  //   text: "Text 6",
  // },
  // {
  //   id: "7g",
  //   text: "Text 7",
  // },
];

const App = () => {
  return (
    <main className="min-h-screen grid place-content-center gap-20">
      <DnDV1 />
      <DnDV2 />
    </main>
  );
};

export default App;
