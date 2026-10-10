"use client";

const TreeForm = ({ location, formData, setFormData, onSave }) => {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl transition-all">
      <div className="mb-4 flex items-center justify-between border-b pb-3">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          🌱 <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Plant a Tree</span>
        </h2>
        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
          Live Cloud
        </span>
      </div>

      <div className="space-y-4">
        {/* User Name Input */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Your Name
          </label>
          <input
            type="text"
            placeholder="e.g. Ali Khan"
            value={formData.userName}
            onChange={(e) =>
              setFormData({ ...formData, userName: e.target.value })
            }
            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-800 outline-none transition-all focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100"
          />
        </div>

        {/* Tree Name Input */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Tree Species / Name
          </label>
          <input
            type="text"
            placeholder="e.g. Neem, Banana, Pine"
            value={formData.treeName}
            onChange={(e) =>
              setFormData({ ...formData, treeName: e.target.value })
            }
            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-800 outline-none transition-all focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100"
          />
        </div>

        {/* Location Display Box */}
        <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
            📍 Selected Coordinates
          </p>
          {location ? (
            <div className="grid grid-cols-2 gap-2 text-xs font-mono text-gray-700">
              <div className="bg-white p-2 rounded-lg border border-emerald-200">
                <span className="text-gray-400 block">Lat:</span> {location.lat.toFixed(4)}
              </div>
              <div className="bg-white p-2 rounded-lg border border-emerald-200">
                <span className="text-gray-400 block">Lng:</span> {location.lng.toFixed(4)}
              </div>
            </div>
          ) : (
            <p className="text-xs italic text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-200">
              ⚠️ Click anywhere on the map to pick a planting spot.
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          onClick={onSave}
          disabled={!location || !formData.userName || !formData.treeName}
          className={`w-full rounded-xl py-3 font-semibold text-white shadow-lg transition-all duration-200 ${
            !location || !formData.userName || !formData.treeName
              ? "cursor-not-allowed bg-gray-300 shadow-none"
              : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 hover:shadow-green-200 active:scale-[0.98]"
          }`}
        >
          🌳 Plant Tree Now
        </button>
      </div>
    </div>
  );
};

export default TreeForm;