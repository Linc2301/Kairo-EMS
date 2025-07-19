"use client";

import { Stepper, Step, StepLabel } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";

const steps = ["Venue", "Floral Service", "Date & Time", "Receipt"];
const stepPaths = ["venue", "floral", "datetime", "deliveries"];

export default function StepNavigator({ eventId }) {
  const router = useRouter();
  const pathname = usePathname();

  // Determine which step is active based on URL
  const activeStep = stepPaths.findIndex((path) => pathname.includes(path));

  const handleBack = () => {
    if (activeStep > 0) {
      const prevPath = `/events/${eventId}/${stepPaths[activeStep - 1]}`;
      router.push(prevPath);
    }
  };

  return (
    <>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ my: 3 }}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              sx={{
                color: activeStep === index ? "orangered" : "inherit",
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep > 0 && (
        <button
          onClick={handleBack}
          style={{
            backgroundColor: "orangered",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "8px 16px",
            marginBottom: "20px",
            cursor: "pointer",
          }}
        >
          Back
        </button>
      )}
    </>
  );
}
