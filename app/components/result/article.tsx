import { emphasize } from "@/app/utils/emphasize";
import MDEditor from "@uiw/react-md-editor";

export default function Article({
  en,
  ko,
  words,
}: {
  en: string;
  ko: string;
  words: string[];
}) {
  return (
    <div className="w-full max-w-5xl rounded-xl bg-white border border-primary p-8 flex flex-col gap-4">
      <MDEditor.Markdown source={emphasize(en, words)} />
      <MDEditor.Markdown
        source={ko}
        style={{ fontSize: "12px", lineHeight: "15px" }}
      />
    </div>
  );
}
