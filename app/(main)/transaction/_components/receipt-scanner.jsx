"use client";

import useFetch from "@/hooks/use-fetch";
import { useEffect, useRef } from "react";
import { scanReceipt } from "@/actions/transaction";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { toast } from "sonner";

const ReceiptScanner = ({ onScanComplete }) => {
  const fileInputRef = useRef(null);
  const {
    loading: scanReceiptLoading,
    fn: scanReceiptFunc,
    data: scannedData,
  } = useFetch(scanReceipt);

  const handleReceiptScan = async (file) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds 5MB limit.");
      return;
    }

    const formData = new FormData();
    formData.append("receipt", file);

    await scanReceiptFunc(formData);
  };

  useEffect(() => {
    if (scannedData && !scanReceiptLoading) {
      onScanComplete(scannedData);
      toast.success("Receipt scanned successfully");
    }
  }, [scanReceiptLoading, scannedData]);

  return (
    <div>
       <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        capture="environment"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleReceiptScan(file);
        }}
      />
      <Button
        disabled={scanReceiptLoading}
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="
    relative overflow-hidden
    bg-[#7f78d2]
    hover:bg-[#1e195e]
    transition-all duration-300
    flex items-center gap-2
    px-5 py-2
    rounded-lg
    shadow-md
    hover:shadow-xl
    group
  "
      >
        {/* Glow effect */}
        <span
          className="
      absolute inset-0
      bg-gradient-to-r from-transparent via-white/20 to-transparent
      translate-x-[-100%]
      group-hover:translate-x-[100%]
      transition-transform duration-700
    "
        />

        {scanReceiptLoading ? (
          <>
            <Camera className="animate-pulse" size={18} />
            <span className="animate-pulse">Scanning...</span>
          </>
        ) : (
          <>
            <Camera
              size={18}
              className="
          transition-transform duration-300
          group-hover:scale-110
          group-hover:rotate-6
          animate-[pulse_2s_ease-in-out_infinite]
        "
            />
            <span className="font-medium tracking-wide">
              Scan Receipt with AI
            </span>
          </>
        )}
      </Button>
    </div>
  );
};

export default ReceiptScanner;
