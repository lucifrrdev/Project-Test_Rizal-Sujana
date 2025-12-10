

export default function ColoredTagline({ text }) {
  if (!text) return null;
  const words = text.split(" ");
  const chunk = Math.ceil(words.length / 3);
  return (
    <h1 className="text-xl md:text-4xl font-bold leading-tight">
      <span className="text-white">{words.slice(0, chunk).join(" ")} </span>
      <span className="text-yellow-300">
        {words.slice(chunk, chunk * 2).join(" ")}{" "}
      </span>
      <span className="text-white">{words.slice(chunk * 2).join(" ")}</span>
    </h1>
  );
}
