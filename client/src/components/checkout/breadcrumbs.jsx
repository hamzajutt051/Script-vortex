import { Fragment } from "react";
import { BsChevronRight } from "react-icons/bs";

const BreadCrumb = ({ steps, currentStep }) => {
  return (
    <div className="flex flex-wrap items-center gap-1 text-sm mb-5">
      {steps.map((step, index) => {
        return (
          <Fragment key={index}>
            <button
              disabled={
                (index !== 0 && !currentStep) ||
                step.step === currentStep ||
                step.dependent?.includes(currentStep)
              }
              className={`${
                step.step === currentStep
                  ? "text-gray-900 font-bold"
                  : (index !== 0 && !currentStep) ||
                    step.dependent?.includes(currentStep)
                  ? "text-gray-600"
                  : "font-medium text-slate-900"
              }`}
              onClick={step.action}
            >
              {step.title}
            </button>
            {index !== steps.length - 1 && (
              <BsChevronRight className="h-4 w-4" />
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default BreadCrumb;
