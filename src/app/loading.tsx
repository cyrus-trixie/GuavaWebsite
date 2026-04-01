export default function Loading() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="relative">
        <div className="w-16 h-16 border-t-2 border-r-2 border-[#DB3246] rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-[#DB3246] rounded-full animate-ping opacity-75"></div>
        </div>
      </div>
    </div>
  );
}