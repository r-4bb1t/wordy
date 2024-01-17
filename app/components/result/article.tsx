import MDEditor from "@uiw/react-md-editor";

export default function Article({
  ko,
  setKo,
}: {
  en: string;
  ko: string;
  words: string[];
  setKo: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="w-full max-w-5xl rounded-xl bg-white border border-primary p-8 flex flex-col gap-4">
      <MDEditor
        value={ko}
        // @ts-ignore
        onChange={setKo}
        preview="edit"
        visibleDragbar={false}
        height={400}
      />
    </div>
  );
}
