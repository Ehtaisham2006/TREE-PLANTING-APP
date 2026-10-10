"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import TreeForm from "../components/TreeForm";
import { subscribeToTrees, addTreeToFirebase } from "../lib/treeService";

const Map = dynamic(
  () => import("../components/Map"),
  { ssr: false }
);

export default function Home() {
  const [trees, setTrees] = useState([]);
  const [location, setLocation] = useState(null);
  const [formData, setFormData] = useState({
    userName: "",
    treeName: "",
  });

  // Firebase se Real-time Syncing
  useEffect(() => {
    const unsubscribe = subscribeToTrees((data) => {
      setTrees(data);
    });

    return () => unsubscribe();
  }, []);

  const handleMapClick = (loc) => {
    setLocation(loc);
  };

  const handleSaveTree = async () => {
    if (!location) return;

    const newTree = {
      userName: formData.userName,
      treeName: formData.treeName,
      lat: location.lat,
      lng: location.lng,
      date: new Date().toLocaleDateString(),
    };

    try {
      await addTreeToFirebase(newTree);

      // Form reset aur location clear
      setFormData({
        userName: "",
        treeName: "",
      });
      setLocation(null);
    } catch (error) {
      alert("Failed to save tree to Firebase. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-gray-100 p-6 lg:p-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-2xl">
                🌳
              </span>
              Tree Planting Eco Map
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Click on the interactive map, fill out the details, and contribute to a greener planet in real-time.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 px-4 py-2 rounded-xl text-sm font-medium">
            <span className="h-2.5 w-2.5 rounded-full bg-green-600 animate-pulse"></span>
            Firebase Cloud Connected
          </div>
        </div>

        {/* Grid Content */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Map Container with Shadow & Rounded corners */}
          <div className="lg:col-span-2 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
            <Map trees={trees} onMapClick={handleMapClick} />
          </div>

          {/* Sidebar Form & Stats */}
          <div className="space-y-6">
            <TreeForm
              location={location}
              formData={formData}
              setFormData={setFormData}
              onSave={handleSaveTree}
            />

            {/* Stats Card */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xl flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                  Total Trees Planted
                </h2>
                <p className="mt-1 text-4xl font-extrabold text-green-600">
                  {trees.length}
                </p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-3xl">
                🌲
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}