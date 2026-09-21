export function AboutHeroStats() {
  return (
    <div className="relative flex justify-center">
      <img
        src="/TeamPicture.jpeg"
        alt="Xmart Team"
        className="rounded-2xl object-cover w-full max-w-md aspect-[4/3]  saturate-0 hover:saturate-100 transition duration-300"
        // style={{ borderColor: "hsl(var(--border), 0.1)" }}
      />
      <div
        className="absolute -bottom-7 -left-7 bg-white dark:bg-black rounded-2xl px-7 py-5 flex flex-col items-center shadow-xl"
        style={
          {
            //   background: "rgba(20,20,20,0.85)",
            //   borderColor: "hsl(var(--primary), 0.3)",
          }
        }
      >
        <div
          className="text-4xl font-bold font-['Space_Grotesk']"
          style={{ color: "hsl(var(--primary))" }}
        >
          10+
        </div>
        <div
          className="text-xs uppercase tracking-wider mt-1"
          style={{ color: "hsl(var(--foreground), 0.6)" }}
        >
          Years of Excellence
        </div>
      </div>
    </div>
  );
}
