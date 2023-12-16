export default function Article({ en, ko }: { en: string; ko: string }) {
  return (
    <div className="w-full max-w-6xl">
      <div>{en}</div>
      <div>{ko}</div>
    </div>
  );
}
