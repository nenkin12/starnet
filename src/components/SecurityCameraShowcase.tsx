import { Camera, Wifi, Shield, HardDrive, MapPin, Clock } from "lucide-react";
import Link from "next/link";

const features = [
  { icon: Wifi, label: "Remote Monitoring" },
  { icon: Shield, label: "Theft Protection" },
  { icon: HardDrive, label: "NVR Setup" },
  { icon: Camera, label: "Network Integration" },
  { icon: MapPin, label: "Strategic Placement" },
  { icon: Clock, label: "24/7 Recording" },
];

export default function SecurityCameraShowcase() {
  return (
    <section className="py-16 sm:py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            className="rounded-2xl bg-gradient-to-br from-[#0A1628] to-blue-900 aspect-[4/3] flex items-center justify-center"
            data-placeholder="security-camera-showcase"
          >
            <Camera className="h-24 w-24 text-blue-400/20" />
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Commercial Security Camera Installation
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Protect your business with professionally installed surveillance
              systems. From retail loss prevention to warehouse monitoring, we
              design and install multi-camera systems with NVR recording, remote
              access, and smart alerts — fully integrated with your network.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              {features.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center gap-3 rounded-xl bg-white border border-gray-200 px-4 py-3"
                >
                  <f.icon className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-900">
                    {f.label}
                  </span>
                </div>
              ))}
            </div>
            <Link
              href="/services#security-camera-installation"
              className="inline-flex rounded-lg bg-blue-600 px-8 py-3.5 text-base font-semibold text-white hover:bg-blue-500 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
